const express = require('express');
const router = express.Router();

// Controladores
const { guardarContacto } = require('../controladores/contacto.controller');
const { crearReservacion, getFechasOcupadas } = require('../controladores/reservaciones.controller');
const { comprarCabina } = require('../controladores/cabinas.controller');
const { getBlogPosts } = require('../controladores/blog.controller');
const { login, bloquearFecha, getVentas, addBlogPost, deleteBlogPost } = require('../controladores/admin.controller');

// Middlewares
const { verificarToken } = require('../seguridad/auth');
const { formLimiter } = require('../seguridad/security');
const { db } = require('../servicios/firebase');

// ==========================================
// 📝 RUTAS PÚBLICAS
// ==========================================
const { validateReservacion } = require('./validators/reservaciones.validator');
router.post('/contacto', formLimiter, guardarContacto);
router.post('/reservaciones', formLimiter, validateReservacion, crearReservacion);
router.post('/comprar-cabina', comprarCabina);
router.get('/fechas-ocupadas', getFechasOcupadas);
router.get('/blog', getBlogPosts);

// ==========================================
// 🛒 WEBHOOK MERCADOPAGO
// ==========================================
router.post('/mercadopago/webhook', async (req, res) => {
  try {
    const { query } = req;
    const topic = query.topic || query.type;
    if (topic === "payment") {
      const paymentId = query.id || query['data.id'];
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      if (response.ok) {
        const paymentData = await response.json();
        if (paymentData.status === "approved") {
          await db.collection('reservaciones').doc(paymentData.external_reference).update({
            'financiero.estatus': 'Apartado Confirmado'
          });
        }
      }
    }
    res.status(200).send('OK');
  } catch (error) {
    res.status(500).send('Error');
  }
});

// ==========================================
// 🔐 RUTAS DE ADMINISTRACIÓN
// ==========================================
router.post('/admin/login', login);
router.post('/admin/bloquear-fecha', verificarToken, bloquearFecha);
router.get('/admin/ventas', verificarToken, getVentas);
router.post('/admin/blog', verificarToken, addBlogPost);
router.delete('/admin/blog/:id', verificarToken, deleteBlogPost);

module.exports = router;
