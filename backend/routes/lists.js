const express = require('express');
const router = express.Router();
const { Lista, JuegoLista, Juego, Usuario } = require('../db'); 

// Ruta para obtener las listas del usuario autenticado
router.get('/user-lists' ,async (req, res) => {
    const {id_usuario}= req.query; 

    try{

        const usuario=await Usuario.findByPk(id_usuario,{
            attributes:['usuario']
        });

        const listas = await Lista.findAll({
            where: {id_usuario},
            include:{
                model:Juego,
                through:{
                    attributes:['puntuacion']
                }
            }
        });

        res.json({listas,usuario});
    
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error al obtener las listas de juegos del usuario');
    }

});

router.post('/addgame', async (req,res)=>{
    const {juego_id, tipo, id_usuario}=req.body;
    try{
        // Encontrar la lista específica del usuario por tipo y id_usuario
        const lista= await Lista.findOne({
            where:{tipo:tipo, id_usuario: id_usuario},
        });
        if (!lista) {
            return res.status(404).json({message: 'Lista no encontrada'});
        }

        const juegoEnOtraLista = await JuegoLista.findOne({
            where: {juego_id:juego_id},
            include:[{
                model: Lista,
                where: {id_usuario: id_usuario}
            }]
        });

        if (juegoEnOtraLista){
            return res.status(400).json({message:'El juego ya esta en otra lista'});
        }

        // Agregar el juego a la lista encontrada
        await JuegoLista.create({juego_id: juego_id, id_lista: lista.id_lista});

        res.status(201).json({ message: 'Juego agregado a la lista exitosamente.'});
    }
    catch(error){
        console.error('Error al agregar juego a la lista:', error);
        res.status(500).json({message:'Error al agregar juego a la lista'});
    }
});

router.delete('/delete-game-from-list', async (req,res)=>{
    const {juego_id, id_lista}=req.body;
    try{
        const juegoEnLista= await JuegoLista.findOne({
            where:{
                id_lista,juego_id
            }
        });
        if(!juegoEnLista){
            return res.status(404).send('Juego no Encontrado en la Lista')
        }

        await juegoEnLista.destroy();
        res.sendStatus(200);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error al eliminar el juego de la lista');
    }
});

router.put('/update-score', async (req,res)=>{
    const {id_usuario, juego_id, puntuacion} =req.body;

    try{
        const juegoEnLista = await JuegoLista.findOne({
            include: [{
                model: Lista,
                where:{id_usuario}
            }],
            where: {juego_id}
        }); 
        
        if(!juegoEnLista){
            return res.status(404).send('Juego no encontrado en la lsita del usuario');
        }

        juegoEnLista.puntuacion = puntuacion;
        await juegoEnLista.save();
        res.sendStatus(200);
    }
    catch(error){
        console.error('Error al actualizar la puntuacion del juego',error);
        res.status(500).json({error:'Error al actualiar la puntuacion del juego', details: error.message});
    }
});

module.exports = router;
