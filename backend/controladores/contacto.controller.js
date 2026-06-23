const { db } = require('../servicios/firebase');
const { findOrCreateCliente } = require('../servicios/clientes.service');
const { validateEmail, validatePhone, validateEventType, sanitizeText } = require('../utilidades/validators');

const guardarContacto = async (req, res) => {
  try {
    const { nombre, email, telefono, tipoEvento, fecha, mensaje } = req.body;
    
    if (!nombre || !telefono || !mensaje) {
      return res.status(400).json({ success: false, error: 'Faltan campos obligatorios' });
    }

    const cleanNombre = sanitizeText(nombre);
    const cleanMensaje = sanitizeText(mensaje);
    const cleanFecha = sanitizeText(fecha);
    const validEventType = validateEventType(tipoEvento);

    const emailValidation = await validateEmail(email);
    if (email && !emailValidation.valid) {
      return res.status(400).json({ success: false, error: emailValidation.error });
    }

    const phoneValidation = validatePhone(telefono);
    if (!phoneValidation.valid) {
      return res.status(400).json({ success: false, error: phoneValidation.error });
    }

    // Gestionar Cliente en DB de forma abstraída
    let clienteRef = null;
    if (emailValidation.valid) {
      clienteRef = await findOrCreateCliente(emailValidation.email, cleanNombre, phoneValidation.phone, 'Formulario Contacto');
    }

    const nuevoContacto = {
      clienteId: clienteRef,
      nombre: cleanNombre,
      email: emailValidation.email || '',
      telefono: phoneValidation.phone,
      tipoEvento: validEventType,
      fecha: cleanFecha,
      mensaje: cleanMensaje,
      status: 'Pendiente',
      fechaRegistro: new Date().getTime() // Epoch
    };

    const docRef = await db.collection('mensajes_contacto').add(nuevoContacto);
    res.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error al guardar contacto:", error);
    res.status(500).json({ success: false, error: 'Error del servidor al procesar el contacto' });
  }
};

module.exports = {
  guardarContacto
};
