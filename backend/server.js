require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {sequelize}=require('./db');
const path= require('path');

// Importar rutas
const usersRouter=require('./routes/users');
const solicitudesRouter = require('./routes/solicitudes');
const citasRouter = require('./routes/citas');
const empleadosRouter = require('./routes/empleados');
const serviciosRouter = require('./routes/servicios');

const app = express();
const port = process.env.PORT || 8000;

// Middleware global
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Verificar conexión con la base de datos
sequelize.authenticate()
    .then(()=>{
        console.log('Conexion a la BD y sincronizacion Completada');
    })
    .catch(err =>{
        console.error('Error al sincronizar la BD',err);
    });

// Rutas
app.use('/users',usersRouter);
app.use('/solicitudes', solicitudesRouter);
app.use('/citas', citasRouter);
app.use('/empleados', empleadosRouter);
app.use('/servicios', serviciosRouter);

// Middleware para manejar errores globales
app.use((err, req, res, next) => {
    console.error('⚠️ Error global:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});