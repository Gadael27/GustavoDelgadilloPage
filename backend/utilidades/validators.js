const validator = require('validator');
const dns = require('dns').promises;
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const disposableDomains = require('disposable-email-domains');

const allowedEventTypes = ['Boda', 'XV Años', 'Corporativo', 'Cumpleaños', 'Bautizo', 'Otro'];

// Validar y limpiar email (Sintaxis, Dominio MX, Desechables)
const validateEmail = async (email) => {
  if (!email) return { valid: false, error: 'El correo es obligatorio.' };
  
  const cleanEmail = validator.normalizeEmail(validator.trim(String(email)));
  if (!validator.isEmail(cleanEmail)) return { valid: false, error: 'Sintaxis de correo inválida.' };

  const domain = cleanEmail.split('@')[1];
  
  // Verificar si es un dominio desechable
  if (disposableDomains.includes(domain)) {
    return { valid: false, error: 'Por favor, utiliza un correo real, no se aceptan correos temporales/desechables.' };
  }

  // Verificar si el dominio tiene registros MX (si el servidor de correo existe)
  try {
    const mxRecords = await dns.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return { valid: false, error: 'El servidor de correo no existe (Dominio inválido).' };
    }
  } catch (error) {
    return { valid: false, error: 'No se pudo verificar la existencia del dominio del correo.' };
  }

  return { valid: true, email: cleanEmail };
};

// Validar teléfono (Nacional e Internacional) usando libphonenumber-js
const validatePhone = (phoneStr) => {
  if (!phoneStr) return { valid: false, error: 'El teléfono es obligatorio.' };
  
  // Parseamos asumiendo MX por defecto, pero si viene con +Código, lo agarra automático.
  const phoneNumber = parsePhoneNumberFromString(String(phoneStr), 'MX');
  
  if (!phoneNumber || !phoneNumber.isValid()) {
    return { valid: false, error: 'Número de teléfono inválido. Asegúrate de incluir la lada correcta.' };
  }

  // Devolvemos el número en formato E.164 (ej. +525512345678)
  return { valid: true, phone: phoneNumber.format('E.164') };
};

// Validar Tipo de Evento
const validateEventType = (eventType) => {
  const cleanType = validator.escape(validator.trim(String(eventType || '')));
  if (allowedEventTypes.includes(cleanType)) {
    return cleanType;
  }
  return null; // Si no viene especificado o es raro, le quitamos el valor (lo dejamos null)
};

// Sanitizador General de Inputs
const sanitizeText = (text) => {
  if (!text) return '';
  return validator.escape(validator.trim(String(text)));
};

// Comprobar colisión de horarios
const checkTimeOverlap = (hora1, duracion1, hora2, duracion2) => {
  const getMinutes = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + (m || 0);
  };
  
  const start1 = getMinutes(hora1);
  const end1 = start1 + Number(duracion1) * 60;
  
  const start2 = getMinutes(hora2);
  const end2 = start2 + Number(duracion2) * 60;
  
  // Hay solapamiento si start1 < end2 Y start2 < end1
  return start1 < end2 && start2 < end1;
};

module.exports = {
  validateEmail,
  validatePhone,
  validateEventType,
  sanitizeText,
  allowedEventTypes,
  checkTimeOverlap
};
