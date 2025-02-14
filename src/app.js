require('dotenv').config(); // Asegúrate de que esta línea esté al inicio
const express = require('express');
const connectDB = require('./config/db');
const alumnoRoutes = require('./routes/alumno');
const path = require('path');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/alumno', alumnoRoutes);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));