const { db } = require('./firebase');

/**
 * Busca o crea un cliente en la base de datos basado en su correo electrónico.
 * @param {string} email - Correo validado del cliente.
 * @param {string} nombre - Nombre sanitizado del cliente.
 * @param {string} telefono - Teléfono validado del cliente.
 * @param {string} origen - Origen del registro (ej. 'Contacto', 'Reservacion').
 * @returns {Promise<string>} - Retorna el ID (referencia) del documento del cliente.
 */
const findOrCreateCliente = async (email, nombre, telefono, origen) => {
  if (!email) return null; // Si no hay email, no podemos crear perfil único seguro.

  const clienteQuery = await db.collection('clientes').where('correo', '==', email).get();
  
  if (clienteQuery.empty) {
    const nuevoClienteRef = await db.collection('clientes').add({
      nombre,
      correo: email,
      telefono,
      fechaRegistro: new Date().getTime(),
      origen
    });
    return nuevoClienteRef.id;
  }
  
  return clienteQuery.docs[0].id;
};

module.exports = {
  findOrCreateCliente
};
