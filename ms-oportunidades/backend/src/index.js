require('dotenv').config({
  path: require('path').resolve(__dirname, '../../.env'),
});

const express = require('express');
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'ms-oportunidades' });
});

app.listen(PORT, async () => {
  console.log(`MS-Oportunidades escuchando en el puerto ${PORT}`);
  try {
    await pool.query('SELECT 1');
    console.log('Conexión a PostgreSQL correcta');
  } catch (err) {
    console.error('No se pudo conectar a PostgreSQL:', err.message);
  }
});