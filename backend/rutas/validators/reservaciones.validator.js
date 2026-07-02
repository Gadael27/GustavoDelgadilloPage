const { body, validationResult } = require('express-validator');

const validateReservacion = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 2 }).withMessage('Mínimo 2 caracteres'),
  body('apellido').optional().trim(),
  body('telefono').notEmpty().withMessage('El teléfono es obligatorio').matches(/^\d{10}$/).withMessage('Debe tener 10 dígitos'),
  body('correo').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('Correo inválido'),
  body('fecha').notEmpty().withMessage('La fecha es obligatoria').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Formato de fecha inválido. (Use YYYY-MM-DD)'),
  body('horaInicio').notEmpty().withMessage('La hora de inicio es obligatoria'),
  body('direccion').trim().notEmpty().withMessage('La dirección es obligatoria'),
  body('peopleRange').notEmpty().custom(value => {
    if (value === '300+') {
      throw new Error('Para eventos de más de 300 personas, comunícate directamente por WhatsApp para una atención personalizada.');
    }
    return true;
  }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }
    next();
  }
];

module.exports = { validateReservacion };
