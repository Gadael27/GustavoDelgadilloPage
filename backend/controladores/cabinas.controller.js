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
    const precioNumerico = Number(String(precioStr).replace(/,/g, ''));

    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      return res.status(400).json({ success: false, error: 'Precio inválido.' });
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
