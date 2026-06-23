const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../servicios/firebase');

const login = async (req, res) => {
  const { email, password } = req.body;
  const passwordValido = await bcrypt.compare(password, process.env.ADMIN_HASH);

  if (email === process.env.ADMIN_EMAIL && passwordValido) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: 'Credenciales inválidas.' });
  }
};

const bloquearFecha = async (req, res) => {
  try {
    const { fecha, horaInicio, horasTotales, notas } = req.body;
    const bloqueo = {
      tipoItem: 'Bloqueo Manual',
      logistica: { fecha, horaInicio, horasTotales: Number(horasTotales) },
      notas: notas || '',
      fechaRegistro: new Date().getTime()
    };
    const docRef = await db.collection('reservaciones').add(bloqueo);
    res.status(201).json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al bloquear fecha.' });
  }
};

const getVentas = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || '';
    const lastId = req.query.lastId || null;
    
    let queryRef = db.collection('reservaciones');

    if (search) {
      // Búsqueda por prefijo estricto en Firestore
      queryRef = queryRef.where('cliente.nombre', '>=', search)
                         .where('cliente.nombre', '<=', search + '\uf8ff')
                         .orderBy('cliente.nombre');
    } else {
      queryRef = queryRef.orderBy('fechaRegistro', 'desc');
    }

    if (lastId) {
      const lastDoc = await db.collection('reservaciones').doc(lastId).get();
      if (lastDoc.exists) {
        queryRef = queryRef.startAfter(lastDoc);
      }
    }

    queryRef = queryRef.limit(limit);
    const snapshot = await queryRef.get();
      
    const ventas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, data: ventas, hasMore: snapshot.docs.length === limit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'No se pudo extraer el historial.' });
  }
};

const addBlogPost = async (req, res) => {
  try {
    const { titulo, contenido, imagenUrl } = req.body;
    const nuevoPost = { 
      titulo, 
      autor: 'Gustavo Delgadillo', 
      contenido, 
      imagenUrl, 
      fechaPublicacion: new Date().getTime() 
    };
    const docRef = await db.collection('blog').add(nuevoPost);
    res.status(201).json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al registrar la nota.' });
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    await db.collection('blog').doc(req.params.id).delete();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al eliminar.' });
  }
};

module.exports = {
  login,
  bloquearFecha,
  getVentas,
  addBlogPost,
  deleteBlogPost
};
