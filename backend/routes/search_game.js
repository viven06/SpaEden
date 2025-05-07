
const express = require('express');
const { Juego } = require('../db'); 
const router = express.Router();
const { Op } = require('sequelize');

//Ruta para buscar juegos en la barra de busqueda
router.get('/search', async (req, res) => {
    const searchValue = req.query.query;
    try {
        const juegos = await Juego.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${searchValue}%`
                }
            }
        });
        res.json(juegos);
    } catch (error) {
        console.error('Error fetching games', error);
        res.status(500).send('Error fetching games');
    }
});

module.exports = router;
