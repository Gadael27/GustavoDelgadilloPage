const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

let db;
try {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
  db = getFirestore();
  console.log("🔥 [SYSTEM] Conexión establecida con éxito a Google Firebase Firestore");
} catch (error) {
  console.error("❌ [ERROR] Falló la inicialización de Firebase:", error.message);
}

module.exports = { db };
