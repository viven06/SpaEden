const express = require('express');
const router = express.Router();
const { verificarToken, verificarRecepcionista } = require('../middlewares/authMiddleware');
const { Cita, SolicitudCita, Empleado, Usuario, Servicio } = require('../db');

router.use(express.json());

// Obtener todas las citas asignadas a un empleado (solo recepcionista)
router.get('/:empleado_id', verificarToken, verificarRecepcionista, async (req, res) => {
    const { empleado_id } = req.params;

    try {
        const citas = await Cita.findAll({
            where: { empleado_id },
            include: [
                { model: SolicitudCita, as: 'solicitud', include: [
                    { model: Usuario, as: 'usuario', attributes: ['nombre', 'apellido', 'email'] },
                    { model: Servicio, as: 'servicio', attributes: ['nombre', 'precio'] }
                ]}
            ]
        });

        res.status(200).json(citas);
    } catch (error) {
        console.error('Error al obtener citas:', error);
        res.status(500).json({ message: 'Error interno al obtener las citas.' });
    }
});

// Obtener detalles de una cita específica
router.get('/detalle/:id', verificarToken, async (req, res) => {
    const { id } = req.params;

    try {
        const cita = await Cita.findByPk(id, {
            include: [
                { model: SolicitudCita, as: 'solicitud', include: [
                    { model: Usuario, as: 'usuario', attributes: ['nombre', 'apellido', 'email'] },
                    { model: Servicio, as: 'servicio', attributes: ['nombre', 'precio'] }
                ]},
                { model: Empleado, as: 'empleado', attributes: ['nombre', 'especialidad'] }
            ]
        });

        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada.' });
        }

        res.status(200).json(cita);
    } catch (error) {
        console.error('Error al obtener detalles de la cita:', error);
        res.status(500).json({ message: 'Error interno al obtener la cita.' });
    }
});

// Obtener todas las citas de un usuario
router.get('/usuario/:usuario_id', verificarToken, async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const citas = await Cita.findAll({
            include: [
                { model: SolicitudCita, as: 'solicitud', where: { usuario_id }, include: [
                    { model: Servicio, as: 'servicio', attributes: ['nombre', 'precio'] }
                ]},
                { model: Empleado, as: 'empleado', attributes: ['nombre', 'especialidad'] }
            ],
            order: [['fecha', 'ASC']]
        });

        res.status(200).json(citas);
    } catch (error) {
        console.error('Error al obtener citas del usuario:', error);
        res.status(500).json({ message: 'Error interno al obtener citas.' });
    }
});

module.exports = router;