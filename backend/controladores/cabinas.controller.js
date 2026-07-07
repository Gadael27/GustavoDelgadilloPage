const { db } = require('../servicios/firebase');
const { crearPreferenciaPago } = require('../servicios/mercadopago');
const { sanitizeText } = require('../utilidades/validators');

const comprarCabina = async (req, res) => {
  try {
    const { cabinaId, nombre, precioStr } = req.body;
    if (!cabinaId || !nombre || !precioStr) {
      return res.status(400).json({ success: false, error: 'Faltan datos de la cabina.' });
    }

    const cleanNombre = sanitizeText(nombre);
    // DICCIONARIO DE PRECIOS SEGURO (Mapeo por ID)
    const preciosCabinas = {
      1: 8500, // Cabina Negra Diamante Premium
      2: 8900, // Cabina Blanca Diamante Luxury
      3: 11200, // Cabina Diamante Espejo Oro
      4: 10800, // Cabina Diamante Espejo Plata
      5: 7900, // Cabina Negra Triángulos Rave
      6: 8200, // Cabina Negra Minimal Rayado
      7: 8400  // Cabina Blanca Triángulos
    };

    const precioNumerico = preciosCabinas[cabinaId];

    if (!precioNumerico) {
      return res.status(400).json({ success: false, error: 'Cabina no válida o precio no encontrado.' });
    }


    const docRef = await db.collection('ventas_cabinas').add({
      cabinaId,
      nombre: cleanNombre,
      precio: precioNumerico,
      fechaRegistro: new Date().getTime(),
      estatus: 'Pendiente de Pago'
    });

    const init_point = await crearPreferenciaPago(
      docRef.id,
      `Compra de ${cleanNombre}`,
      precioNumerico,
      '/compra-tu-cabina'
    );

    res.status(201).json({ success: true, init_point });
  } catch (error) {
    console.error("❌ Error en compra de cabina:", error);
    res.status(500).json({ success: false, error: 'Error interno en el servidor.' });
  }
};

module.exports = {
  comprarCabina
};
