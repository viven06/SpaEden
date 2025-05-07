const express = require('express');
const router = express.Router();
const { Juego } = require('../db'); 

// Ruta para obtener detalles del juego por su nombre en la pagina de cada juego
router.get('/:gameName', async (req, res) => {
    const { gameName } = req.params;

    try {
        const juego = await Juego.findOne({ where: { titulo: gameName } });
        if (!juego) {
            return res.status(404).json({ message: 'Game not Found' });
        }
        res.json(juego);
    } catch (error) {
        console.error('Error al obtener los detalles del juego:', error);
        res.status(500).json({ message: 'Error al obtener los detalles del juego' });
    }
});

module.exports = router;
