const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Configuración de Helmet para proteger cabeceras HTTP
const configureHelmet = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://sdk.mercadopago.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        connectSrc: ["'self'", "https://*.mercadopago.com"],
        frameSrc: ["'self'", "https://*.mercadopago.com"],
        imgSrc: ["'self'", "data:", "blob:", "https://*"],
        mediaSrc: ["'self'", "data:", "blob:", "https://*"]
      }
    },
    crossOriginEmbedderPolicy: false
  });
};

// Rate limiter general para evitar ataques de fuerza bruta o DDoS básicos
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por IP cada 15 minutos
  message: { success: false, error: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo en 15 minutos.' }
});

// Rate limiter estricto para formularios públicos (contacto, reservaciones)
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // Límite de 10 peticiones por hora por IP para evitar spam
  message: { success: false, error: 'Has enviado demasiados formularios. Por favor, comunícate directamente por WhatsApp.' }
});

module.exports = {
  configureHelmet,
  generalLimiter,
  formLimiter
};
