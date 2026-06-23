const { db } = require('../servicios/firebase');

const getBlogPosts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const snapshot = await db.collection('blog')
      .orderBy('fechaPublicacion', 'desc')
      .limit(limit)
      .get();
      
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'No se pudo obtener el blog.' });
  }
};

module.exports = {
  getBlogPosts
};
