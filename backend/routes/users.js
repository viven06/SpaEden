const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { Usuario, Lista } = require('../db');
const jwt= require('jsonwebtoken');


router.use(bodyParser.json());
router.use(express.json());

console.log('JWT_SECRET:', process.env.JWT_SECRET);

router.post('/register', async (req, res) => {
    const { nombre, apellido, email, contraseña } = req.body;

    if (!nombre || !apellido || !email || !contraseña) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try{
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(contraseña,saltRounds);

      const nuevoUsuario = await Usuario.create({
        nombre,
        apellido,
        email,
        contraseña: hashedPassword
      });

      res.status(201).json({ message: 'Usuario registrado exitosamente!' });
    } 
    catch(error){
      console.error('Error al registrar usuario:', error);

      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({message: 'El correo ya está en uso.'});
      }

      res.status(500).json({message: 'Error al registrar usuario.'});
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

      const token= jwt.sign({id: usuario.id_usuario, email: usuario.email, rol: usuario.rol}, process.env.JWT_SECRET, {expiresIn: '30m'});

      console.log('Token generado:', token);

      res.status(200).json({message:'inicio de Sesion exitoso!',token, id_usuario: usuario.id_usuario, rol: usuario.rol, nombre: usuario.nombre});
    }
    catch(error){
      console.error('Error al iniciar sesion,',error);
      res.status(500).json({message: 'Error al iniciar sesion.'});
    }
});

router.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findByPk(decoded.id_usuario);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

module.exports = router;
