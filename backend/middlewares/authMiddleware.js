const jwt = require('jsonwebtoken');
const { Usuario, Empleado } = require('../db');

const verificarToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error al verificar token:', error);
        res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};

const verificarRecepcionista = async (req, res, next) => {
    try {
        console.log('Datos del usuario:', req.user); 
        if (!req.user || req.user.rol !== 'recepcionista') {
            return res.status(403).json({ message: 'Acceso denegado. Solo empleados pueden acceder.' });
        }

        next();
    } catch (error) {
        console.error('Error interno al verificar rol:', error);
        res.status(500).json({ message: 'Error interno al verificar rol.' });
    }

};

module.exports = { verificarToken, verificarRecepcionista };