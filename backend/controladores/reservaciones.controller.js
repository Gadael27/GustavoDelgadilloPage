const { db } = require('../servicios/firebase');
const { crearPreferenciaPago } = require('../servicios/mercadopago');
const { findOrCreateCliente } = require('../servicios/clientes.service');
const { validateEmail, validatePhone, validateEventType, sanitizeText } = require('../utilidades/validators');

const crearReservacion = async (req, res) => {
  try {
    const { nombre, apellido, telefono, correo, fecha, horaInicio, tipoEvento, locacion, direccion, paymentType, packageType, extraHours, peopleRange } = req.body;

    if (!nombre || !telefono || !correo || !fecha || !horaInicio || !direccion) {
      return res.status(400).json({ success: false, error: 'Faltan campos obligatorios para agendar.' });
    }

    // Límite estricto de personas
    if (peopleRange === '300+') {
      return res.status(400).json({ success: false, error: 'Para eventos de más de 300 personas, comunícate directamente por WhatsApp para una atención personalizada.' });
    }

    const cleanNombre = sanitizeText(nombre);
    const cleanApellido = sanitizeText(apellido);
    const cleanDireccion = sanitizeText(direccion);
    const cleanLocacion = sanitizeText(locacion);
    const validEventType = validateEventType(tipoEvento);

    // Validar formato de fecha YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(fecha)) {
      return res.status(400).json({ success: false, error: 'Formato de fecha inválido. (Use YYYY-MM-DD)' });
    }

    const emailValidation = await validateEmail(correo);
    if (!emailValidation.valid) return res.status(400).json({ success: false, error: emailValidation.error });

    const phoneValidation = validatePhone(telefono);
    if (!phoneValidation.valid) return res.status(400).json({ success: false, error: phoneValidation.error });

    const horasDuracionNueva = 5 + Number(extraHours || 0);

    // 🛡️ ESCUDO ANTI-CHOQUES (DOUBLE BOOKING)
    const eventosMismoDia = await db.collection('reservaciones')
      .where('logistica.fecha', '==', fecha)
      .get();
      
    for (let doc of eventosMismoDia.docs) {
      const evento = doc.data();
      const isConfirmed = evento.financiero?.estatus === 'Apartado Confirmado';
      const isManual = evento.tipoItem === 'Bloqueo Manual';
      
      if (isConfirmed || isManual) {
        const horaExistente = evento.logistica.horaInicio;
        const duracionExistente = evento.logistica.horasTotales || (5 + Number(evento.logistica.extraHours || 0));
        
        const { checkTimeOverlap } = require('../utilidades/validators');
        const choca = checkTimeOverlap(horaInicio, horasDuracionNueva, horaExistente, duracionExistente);
        
        if (choca) {
          return res.status(409).json({ 
            success: false, 
            error: `Lo sentimos, ya hay un evento confirmado en ese horario. Por favor selecciona otra hora u otro día.` 
          });
        }
      }
    }

    // Gestión de Cliente
    let clienteRef = await findOrCreateCliente(emailValidation.email, cleanNombre + ' ' + cleanApellido, phoneValidation.phone, 'Reservacion');

    let serviceBasePrice = packageType === 'Premium' ? 7500 : 5500;
    const extraHoursCost = Number(extraHours || 0) * 1200;

    let peopleAdditionalCost = 0;
    if (peopleRange === '100-200') peopleAdditionalCost = 3000;
    else if (peopleRange === '200-300') peopleAdditionalCost = 5500;

    const totalCalculado = serviceBasePrice + extraHoursCost + peopleAdditionalCost;
    const anticipoCalculado = 1500;
    const montoPagarCalculado = paymentType === 'completo' ? totalCalculado : anticipoCalculado;

    const nuevaReservacion = {
      clienteId: clienteRef,
      tipoItem: 'Servicio DJ',
      cliente: { nombre: cleanNombre + ' ' + cleanApellido, telefono: phoneValidation.phone, correo: emailValidation.email },
      logistica: { 
        fecha, horaInicio, tipoEvento: validEventType, locacion: cleanLocacion, 
        direccion: cleanDireccion, packageType, extraHours, peopleRange 
      },
      financiero: { totalEvent: totalCalculado, montoCobradoOnline: montoPagarCalculado, tipoPago: paymentType, estatus: 'Pendiente de Pago' },
      fechaRegistro: new Date().getTime() // Epoch timestamp
    };

    const docRef = await db.collection('reservaciones').add(nuevaReservacion);

    const mpTitle = paymentType === 'completo' ? `Pago Completo Show DJ - ${validEventType || 'Evento'}` : `Anticipo Fecha Show DJ - ${validEventType || 'Evento'}`;
    
    // Abstracted MercadoPago Logic
    const init_point = await crearPreferenciaPago(docRef.id, mpTitle, montoPagarCalculado, '/reserva-exitosa');

    res.status(201).json({ success: true, message: 'Lead guardado.', id: docRef.id, init_point });
  } catch (error) {
    console.error("❌ Error en servidor:", error);
    res.status(500).json({ success: false, error: 'Error interno en el servidor.' });
  }
};

const getFechasOcupadas = async (req, res) => {
  try {
    // 🚀 Optimización: Extraer SOLO lo que necesitamos en lugar de todo el historial
    const confirmadosReq = db.collection('reservaciones').where('financiero.estatus', '==', 'Apartado Confirmado').get();
    const bloqueosReq = db.collection('reservaciones').where('tipoItem', '==', 'Bloqueo Manual').get();
    
    const [confirmadosSnap, bloqueosSnap] = await Promise.all([confirmadosReq, bloqueosReq]);
    
    const ocupadas = [];
    const procesarDoc = (doc) => {
      const data = doc.data();
      if (data.logistica && data.logistica.fecha && data.logistica.horaInicio) {
        ocupadas.push({
          fecha: data.logistica.fecha,
          horaInicio: data.logistica.horaInicio,
          horasTotales: data.logistica.horasTotales || (5 + Number(data.logistica.extraHours || 0))
        });
      }
    };

    confirmadosSnap.forEach(procesarDoc);
    bloqueosSnap.forEach(procesarDoc);

    res.status(200).json({ success: true, data: ocupadas });
  } catch (error) {
    console.error('Error al obtener fechas ocupadas:', error);
    res.status(500).json({ success: false, error: 'Error al obtener fechas' });
  }
};

module.exports = {
  crearReservacion,
  getFechasOcupadas
};
