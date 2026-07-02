const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

// Middlewares
const { configureHelmet, generalLimiter } = require('./seguridad/security');
const { sanitizeBody } = require('./seguridad/sanitizer');

// Rutas
const routes = require('./rutas');

const app = express();

// ==========================================
// 🛡️ CONFIGURACIÓN DE PROXY
// ==========================================
app.set('trust proxy', 1);

// ==========================================
// 🛡️ MIDDLEWARES GLOBALES
// ==========================================
app.use(configureHelmet());
app.use(generalLimiter); // Evitar ataques de fuerza bruta generales

// CORS Estricto (Lista Blanca)
const whitelist = [
  'http://localhost:5173', 
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10kb' })); // Límite de 10kb por petición para evitar que tumben la RAM
app.use(sanitizeBody); // Sanitización Global Anti-XSS

// ==========================================
// 🛣️ MONTAJE DE RUTAS API
// ==========================================
app.use('/api', routes);

// ==========================================
// 🌐 SERVIR FRONTEND (PRODUCCIÓN)
// ==========================================
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get(/(.*)/, (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  }
});

// ==========================================
// 🛑 MANEJADOR GLOBAL DE ERRORES (CATCH-ALL)
// ==========================================
app.use((err, req, res, next) => {
  console.error("🔥 Error Global:", err.message || err);
  res.status(500).json({ success: false, error: 'Ocurrió un error inesperado en el servidor.' });
});

// ==========================================
// 🚀 ARRANQUE DEL SERVIDOR
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 [SERVER] Seguro, modular y corriendo en puerto ${PORT}`));