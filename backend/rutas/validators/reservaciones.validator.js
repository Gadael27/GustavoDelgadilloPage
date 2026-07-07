const { body, validationResult } = require('express-validator');

const validateReservacion = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 2 }).withMessage('Mínimo 2 caracteres'),
  body('apellido').optional().trim(),
  body('telefono').notEmpty().withMessage('El teléfono es obligatorio').matches(/^\d{10}$/).withMessage('Debe tener 10 dígitos'),
  body('correo').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('Correo inválido'),
  body('fecha')
    .notEmpty().withMessage('La fecha es obligatoria')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Formato de fecha inválido. (Use YYYY-MM-DD)')
    .custom(value => {
      const inputDate = new Date(`${value}T00:00:00`); // Asegurar que toma la fecha localmente bien
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (inputDate < today) {
        throw new Error('No se pueden hacer reservaciones en fechas pasadas.');
      }
      return true;
    }),
  body('horaInicio').notEmpty().withMessage('La hora de inicio es obligatoria'),
  body('direccion').trim().notEmpty().withMessage('La dirección es obligatoria'),
  body('peopleRange').notEmpty().withMessage('El rango de personas es obligatorio'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }
    next();
  }
];

module.exports = { validateReservacion };
