const express = require('express');
const router = express.Router();
const { verificarToken, verificarRecepcionista } = require('../middlewares/authMiddleware');
const { Empleado } = require('../db');

router.use(express.json());

// Registrar un nuevo empleado (solo recepcionista)
router.post('/', verificarToken, verificarRecepcionista, async (req, res) => {
    const { nombre, especialidad } = req.body;

    if (!nombre || !especialidad) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        const nuevoEmpleado = await Empleado.create({ nombre, especialidad });
        res.status(201).json({ message: 'Empleado registrado exitosamente!', empleado: nuevoEmpleado });
    } catch (error) {
        console.error('Error al registrar empleado:', error);
        res.status(500).json({ message: 'Error interno al registrar el empleado.' });
    }
});

// Obtener la lista de empleados (solo recepcionista)
router.get('/', verificarToken, verificarRecepcionista, async (req, res) => {
    try {
        const empleados = await Empleado.findAll({ attributes: ['id', 'nombre', 'especialidad'] });
        res.status(200).json(empleados);
    } catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ message: 'Error interno al obtener empleados.' });
    }
});

// Actualizar información de un empleado (solo recepcionista)
router.patch('/:id', verificarToken, verificarRecepcionista, async (req, res) => {
    const { id } = req.params;
    const { nombre, especialidad } = req.body;

    try {
        const empleado = await Empleado.findByPk(id);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado.' });
        }

        if (nombre) empleado.nombre = nombre;
        if (especialidad) empleado.especialidad = especialidad;

        await empleado.save();
        res.status(200).json({ message: 'Empleado actualizado correctamente!', empleado });
    } catch (error) {
        console.error('Error al actualizar empleado:', error);
        res.status(500).json({ message: 'Error interno al actualizar empleado.' });
    }
});

// Eliminar un empleado
router.delete('/:id', verificarToken, verificarRecepcionista,  async (req, res) => {
    const { id } = req.params;

    try {
        const empleado = await Empleado.findByPk(id);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado.' });
        }

        await empleado.destroy();
        res.status(200).json({ message: 'Empleado eliminado exitosamente!' });
    } catch (error) {
        console.error('Error al eliminar empleado:', error);
        res.status(500).json({ message: 'Error interno al eliminar empleado.' });
    }
});

module.exports = router;