const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = 3000;

app.use(cors());

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: "ale",
  host: "localhost",
  database: "gestion_productos",
  password: "",
  port: 5432,
});

app.use(express.json());

// Ruta para obtener todos los productos
app.get("/api/productos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener productos", error);
    res.status(500).send("Error del servidor");
  }
});

// Ruta para crear un nuevo producto
app.post("/api/productos", async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *",
      [nombre, descripcion, precio]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear un producto", error);
    res.status(500).send("Error del servidor");
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
