const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

/**
 * Crea una preferencia de pago en MercadoPago.
 * @param {string} id - ID interno de referencia (ej. ID de reservación).
 * @param {string} title - Título que aparecerá en MercadoPago.
 * @param {number} unitPrice - Monto numérico exacto a cobrar.
 * @param {string} successPath - Ruta del frontend para redireccionar tras pago exitoso.
 * @returns {Promise<string>} - Retorna el `init_point` (URL de pago).
 */
const crearPreferenciaPago = async (id, title, unitPrice, successPath) => {
  const preference = new Preference(client);
  const result = await preference.create({
    body: {
      items: [{
        id: id,
        title: title,
        quantity: 1,
        unit_price: Number(unitPrice),
        currency_id: 'MXN'
      }],
      back_urls: {
        success: `${process.env.FRONTEND_URL || 'http://localhost:5173'}${successPath}`,
        failure: `${process.env.FRONTEND_URL || 'http://localhost:5173'}${successPath}`,
        pending: `${process.env.FRONTEND_URL || 'http://localhost:5173'}${successPath}`
      },
      external_reference: id
    }
  });
  return result.init_point;
};

module.exports = {
  client,
  Preference,
  crearPreferenciaPago
};
