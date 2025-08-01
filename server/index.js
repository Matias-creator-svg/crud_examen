const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'empleados_crud'
});

app.post('/create', (req, res) => {
  const { nombre, edad, pais, ocupacion, anios } = req.body;

  const consulta = `INSERT INTO empleados (nombre, edad, pais, ocupacion, anios) VALUES (?, ?, ?, ?, ?)`;
  db.query(consulta, [nombre, edad, pais, ocupacion, anios], (err, result) => {
    if (err) {
      console.log('Error al insertar:', err);
      res.status(500).send('Error al crear el empleado');
    } else {
      res.send('Empleado creado correctamente');
    }
  });
});

//Actualizar BD

app.put('/update', (req, res) => {
  const { id, nombre, edad, pais, ocupacion, anios } = req.body;
  console.log('Datos recibidos para actualizar:', req.body); 

  const consulta = `UPDATE empleados SET nombre=?, edad=?, pais=?, ocupacion=?, anios=? WHERE id=?`;
  db.query(consulta, [nombre, edad, pais, ocupacion, anios, id], (err, result) => {
    if (err) {
      console.log('Error al insertar:', err);
      res.status(500).send('Error al actualizar el empleado');
    } else {
      res.send('Empleado actualizado correctamente');
    }
  });
});

// Eliminar empleado
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const consulta = `DELETE FROM empleados WHERE id = ?`;
  db.query(consulta, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar empleado:', err);
      res.status(500).send('Error al eliminar empleado');
    } else {
      res.send('Empleado eliminado correctamente');
    }
  });
});

app.get('/empleados', (req, res) => {
  db.query('SELECT * FROM empleados', (err, result) => {
    if (err) {
      console.log('Error al obtener empleados:', err);
      res.status(500).send('Error al obtener empleados');
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
