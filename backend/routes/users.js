const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Usuario, Lista } = require('../db');
const jwt= require('jsonwebtoken');


router.use(bodyParser.json());
router.use(express.json());

console.log('JWT_SECRET:', process.env.JWT_SECRET);

router.post('/register', async (req, res) => {
    const { nombre, apellido, usuario, email, contraseña } = req.body;

    try{
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(contraseña,saltRounds);

      const nuevoUsuario = await Usuario.create({
        nombre,
        apellido,
        usuario,
        email,
        contraseña: hashedPassword
      });

      const listas = ['Completed','Playing','Plan to Play'];
      for (const listType of listas){
        await Lista.create({tipo: listType, id_usuario: nuevoUsuario.id_usuario});
      }

      res.status(201).json({ message: 'Usuario registrado exitosamente!' });
    } 
    catch(error){
      console.error('Error al registrar usuario:', error);
      res.status(500).json({message: 'Error al registrar ussuario.'});
    }
});

router.post('/login', async (req,res)=>{
    const {email, contraseña}=req.body;

    if(!email || !contraseña){
      return res.status(400).json({message:'Email y Contraseña son requeridos.'});
    }

    try{
      const usuario = await Usuario.findOne({where: {email}});

      console.log('Usuario encontrado:', usuario);

      if (!usuario){
        console.log('Usuario no encontrado.');
        return res.status(401).json({message: 'Correo o Contraseña Incorrectos.'})
      }

      const isMatch= await bcrypt.compare(contraseña, usuario.contraseña);

      console.log('Contraseña coincide:', isMatch);

      if (!isMatch) {
        console.log('Contraseña incorrecta.');
        return res.status(401).json({message: 'Correo o Contraseña Incorrectos.'})
      }

      const token= jwt.sign({id: usuario.id_usuario, email: usuario.email}, process.env.JWT_SECRET, {expiresIn: '30m'});

      console.log('Token generado:', token);

      res.status(200).json({message:'inicio de Sesion exitoso!',token, id_usuario: usuario.id_usuario});
    }
    catch(error){
      console.error('Error al iniciar sesion,',error);
      res.status(500).json({message: 'Error al iniciar sesion.'});
    }
});

module.exports = router;
