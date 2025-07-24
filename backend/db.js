require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }

});

sequelize.authenticate()
    .then(() => console.log('Conexión exitosa con PostgreSQL'))
    .catch(err => console.error('Error de conexión:', err));


const Usuario = sequelize.define('Usuario',{
    id_usuario:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: { 
        type: DataTypes.ENUM('cliente', 'recepcionista'),
        allowNull: false,
        defaultValue: 'cliente'
    }

}, {
    tableName: 'usuarios',
    timestamps: false
});

const Empleado = sequelize.define('Empleado', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    usuario_id: { 
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        },
        allowNull: true,
        unique: true 
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    especialidad: { type: DataTypes.STRING, allowNull: false } // Ej: masajista, estilista, etc.
}, {
    tableName: 'empleados',
    timestamps: false
});


const Servicio = sequelize.define('Servicio', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    duracion: { type: DataTypes.INTEGER, allowNull: false } // Duración en minutos
}, {
    tableName: 'servicios',
    timestamps: false
});

const SolicitudCita = sequelize.define('SolicitudCita', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER, // Referencia al usuario
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    franja_horaria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada'),
        defaultValue: 'pendiente'
    },
    servicio_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'servicios',
            key: 'id'
        }
    }
}, {
    tableName: 'solicitudes_cita',
    timestamps: false
});

const Cita = sequelize.define('Cita', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    solicitud_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'solicitudes_cita',
            key: 'id'
        }
    },
    empleado_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'empleados',
            key: 'id'
        }
    },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    hora: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'citas',
    timestamps: false
});

Usuario.hasMany(SolicitudCita, { foreignKey: 'usuario_id', as: 'solicitudes' });
SolicitudCita.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

Servicio.hasMany(SolicitudCita, { foreignKey: 'servicio_id', as: 'solicitudes' });
SolicitudCita.belongsTo(Servicio, { foreignKey: 'servicio_id', as: 'servicio' });

SolicitudCita.hasOne(Cita, { foreignKey: 'solicitud_id', as: 'cita' });
Cita.belongsTo(SolicitudCita, { foreignKey: 'solicitud_id', as: 'solicitud' });

Empleado.hasMany(Cita, { foreignKey: 'empleado_id', as: 'citas' });
Cita.belongsTo(Empleado, { foreignKey: 'empleado_id', as: 'empleado' });

Usuario.hasOne(Empleado, { foreignKey: 'usuario_id', as: 'empleado' });
Empleado.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });


module.exports = { sequelize, Usuario, SolicitudCita, Servicio, Empleado, Cita};
