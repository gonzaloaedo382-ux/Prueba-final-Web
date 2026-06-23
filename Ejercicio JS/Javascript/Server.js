const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// implementacion del servidor Express
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));


// la conexion con la base de datos creada en el laragon
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Registro_Db",
  port: 3306
});

// guarda los datos que se ingresa en el registro guardados en la base de datos 
app.post("/guardar", (req, res) => {
  const { nombre, correo, edad } = req.body;
  const SQL = "INSERT INTO Registro (nombre, correo, edad) VALUES (?, ?, ?)";
  connection.query(SQL, [nombre, correo, edad], (err) => {
    if (err) {
      console.log(err);
      res.json({ mensaje: "Error al guardar" });
    } else {
      res.json({ mensaje: "Datos guardados correctamente" });
    }
  });
});

app.get("/ultimo", (req, res) => {
  const SQL = "SELECT * FROM Registro ORDER BY id DESC LIMIT 1";
  connection.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      res.json(null);
    } else {
      res.json(result[0]);
    }
  });
});
app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:" + port);
});
