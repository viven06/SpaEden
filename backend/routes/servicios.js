const express = require('express');
const router = express.Router();
const { verificarToken, verificarRecepcionista } = require('../middlewares/authMiddleware');
const { Servicio } = require('../db');

router.use(express.json());

// Crear un nuevo servicio (Solo Recepcionista)
router.post('/', verificarToken, verificarRecepcionista, async (req, res) => {
    const { nombre, precio, duracion } = req.body;

    if (!nombre || !precio || !duracion) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        const nuevoServicio = await Servicio.create({ nombre, precio, duracion });
        res.status(201).json({ message: 'Servicio creado exitosamente!', servicio: nuevoServicio });
    } catch (error) {
        console.error('Error al crear servicio:', error);
        res.status(500).json({ message: 'Error interno al crear el servicio.' });
    }
});

// Obtener la lista de servicios disponibles
router.get('/', async (req, res) => {
    try {
        const servicios = await Servicio.findAll({ attributes: ['id', 'nombre', 'precio', 'duracion'] });
        res.status(200).json(servicios);
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        res.status(500).json({ message: 'Error interno al obtener servicios.' });
    }
});

// Actualizar un servicio (Solo Recepcionista)
router.patch('/:id', verificarToken, verificarRecepcionista, async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, duracion } = req.body;

    try {
        const servicio = await Servicio.findByPk(id);
        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado.' });
        }

        if (nombre) servicio.nombre = nombre;
        if (precio) servicio.precio = precio;
        if (duracion) servicio.duracion = duracion;

        await servicio.save();
        res.status(200).json({ message: 'Servicio actualizado correctamente!', servicio });
    } catch (error) {
        console.error('Error al actualizar servicio:', error);
        res.status(500).json({ message: 'Error interno al actualizar servicio.' });
    }
});

// Eliminar un servicio (Solo Recepcionista)
router.delete('/:id', verificarToken, verificarRecepcionista, async (req, res) => {
    const { id } = req.params;

    try {
        const servicio = await Servicio.findByPk(id);
        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado.' });
        }

        await servicio.destroy();
        res.status(200).json({ message: 'Servicio eliminado exitosamente!' });
    } catch (error) {
        console.error('Error al eliminar servicio:', error);
        res.status(500).json({ message: 'Error interno al eliminar servicio.' });
    }
});

module.exports = router;