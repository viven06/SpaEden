const express = require('express');
const router = express.Router();
const { SolicitudCita, Usuario, Servicio, Cita } = require('../db');
const { verificarToken, verificarRecepcionista } = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');


router.use(express.json());

// Crear una nueva solicitud de cita
router.post('/', async (req, res) => {
    const { usuario_id, fecha, franja_horaria, servicio_id } = req.body;

    if (!usuario_id || !fecha || !franja_horaria || !servicio_id) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        const nuevaSolicitud = await SolicitudCita.create({
            usuario_id,
            fecha,
            franja_horaria,
            servicio_id,
            estado: 'pendiente'
        });

        res.status(201).json({ message: 'Solicitud de cita creada exitosamente!', solicitud: nuevaSolicitud });
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        res.status(500).json({ message: 'Error interno al crear la solicitud de cita.' });
    }
});

// Obtener todas las solicitudes de cita (para el recepcionista)
router.get('/', verificarToken, verificarRecepcionista, async (req, res) => {
    try {
        const solicitudes = await SolicitudCita.findAll({
            include: [
                { model: Usuario, as: 'usuario', attributes: ['nombre', 'apellido', 'email'] },
                { model: Servicio, as: 'servicio', attributes: ['nombre', 'precio'] }
            ],
            order: [['fecha', 'ASC']]
        });

        res.status(200).json(solicitudes);
    } catch (error) {
        console.error('Error al obtener todas las solicitudes:', error);
        res.status(500).json({ message: 'Error interno al obtener solicitudes.' });
    }
});

// Obtener todas las solicitudes de un usuario
router.get('/:usuario_id', verificarToken, async (req, res) => {
    try {
        const { usuario_id } = req.params;

        const solicitudes = await SolicitudCita.findAll({
            where: { usuario_id },
            include: [
                { model: Servicio, as: 'servicio', attributes: ['nombre', 'precio'] }
            ]
        });

        if (!solicitudes.length) {
            return res.status(404).json({ message: 'No hay solicitudes registradas para este usuario.' });
        }

        res.status(200).json(solicitudes);
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        res.status(500).json({ message: 'Error interno al obtener las solicitudes de cita.' });
    }

});

// Actualizar el estado de una solicitud y generar cita (para el recepcionista)
router.patch('/:id', verificarToken, verificarRecepcionista, async (req, res) => {
    const { id } = req.params;
    const { estado, empleado_id, hora } = req.body;

    if (!estado || !['aceptada', 'rechazada'].includes(estado)) {
        return res.status(400).json({ message: 'Estado inválido. Debe ser "aceptada" o "rechazada".' });
    }

    try {
        const solicitud = await SolicitudCita.findByPk(id);
        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud no encontrada.' });
        }

        solicitud.estado = estado;
        await solicitud.save();

        if (estado === 'aceptada') {
            // Validar que se pase el empleado y la hora
            if (!empleado_id || !hora) {
                return res.status(400).json({ message: 'Debe asignar un empleado y una hora para confirmar la cita.' });
            }

            // Crear automáticamente la cita
            const nuevaCita = await Cita.create({
                solicitud_id: solicitud.id,
                empleado_id,
                fecha: solicitud.fecha, // Fecha de la solicitud
                hora
            });

            return res.status(200).json({ message: 'Solicitud aceptada y cita creada!', cita: nuevaCita });
        }

        res.status(200).json({ message: 'Solicitud actualizada correctamente!' });
    } catch (error) {
        console.error('Error al actualizar solicitud:', error);
        res.status(500).json({ message: 'Error interno al actualizar la solicitud.' });
    }
});


module.exports = router;