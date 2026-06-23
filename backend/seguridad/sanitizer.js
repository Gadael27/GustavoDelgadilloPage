const xss = require('xss');

/**
 * Middleware para desinfectar cualquier HTML/Script malicioso del body.
 * Aplica recursivamente xss() a todos los campos tipo string.
 */
const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    });
  }
  next();
};

module.exports = {
  sanitizeBody
};
