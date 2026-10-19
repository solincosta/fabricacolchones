require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();

// CORS: encabezados explícitos (deben ir ANTES de las rutas)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Respuesta inmediata a la petición preflight del navegador
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const isDigits = (v) => v !== undefined && v !== null && /^\d+$/.test(String(v));

// GET /getallcolchones -> todos los colchones
app.get('/getallcolchones', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, nombre, imagen, precio, medidas FROM colchon ORDER BY id'
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar los colchones' });
  }
});

// POST /buycolchon
// Body JSON: { "id_colchon": 1, "documento_cliente": 1083444555 }
app.post('/buycolchon', async (req, res) => {
  const { id_colchon, documento_cliente } = req.body;

  if (!isDigits(id_colchon) || !isDigits(documento_cliente)) {
    return res.status(400).json({
      error: 'id_colchon y documento_cliente son obligatorios y deben ser numéricos',
    });
  }

  try {
    await pool.query(
      'INSERT INTO colchonxcliente (documento_cliente, id_colchon) VALUES ($1, $2)',
      [documento_cliente, id_colchon]
    );
    res.status(201).json({ message: 'El registro se insertó correctamente' });
  } catch (err) {
    // 23503 = violación de llave foránea (el cliente o el colchón no existen)
    if (err.code === '23503') {
      return res.status(404).json({ error: 'El cliente o el colchón no existen' });
    }
    console.error(err);
    res.status(500).json({ error: 'Error al registrar la compra' });
  }
});

// GET /getcolchonescomprados?documento_cliente=1083444555
app.get('/getcolchonescomprados', async (req, res) => {
  const { documento_cliente } = req.query;

  if (!isDigits(documento_cliente)) {
    return res.status(400).json({
      error: 'documento_cliente es obligatorio y debe ser numérico',
    });
  }

  try {
    const { rows } = await pool.query(
      `SELECT cc.id AS id_compra, c.id AS id_colchon, c.nombre, c.imagen, c.precio, c.medidas
         FROM colchonxcliente cc
         JOIN colchon c ON c.id = cc.id_colchon
        WHERE cc.documento_cliente = $1
        ORDER BY cc.id`,
      [documento_cliente]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar los colchones comprados' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
