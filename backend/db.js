const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mygamelogpc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Juego = sequelize.define('Juego', {
    juego_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plataforma: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_lanzamiento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sinopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'juegos',
    timestamps: false
});

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
    usuario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    contraseña:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

const Lista = sequelize.define('List', {
    id_lista: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    tipo:{
        type:DataTypes.ENUM('Completed','Playing','Plan to Play'),
        allowNull:false
    },
    id_usuario:{
        type:DataTypes.INTEGER,
        references:{
            model:Usuario,
            key:'id_usuario'
        }
    }
},{
    tableName:'listas',
    timestamps:false
});

const JuegoLista = sequelize.define('JuegoLista',{
    id_relacion:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    id_lista:{
        type:DataTypes.INTEGER,
        references:{
            model:Lista,
            key:'id_lista'
        }
    },
    juego_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Juego,
            key:'juego_id'
        }
    },
    puntuacion:{
        type:DataTypes.DECIMAL(4,2),
        allowNull:true
    }

},{
    tableName:'juegos_en_listas',
    timestamps:false
})

Usuario.hasMany(Lista, {foreignKey: 'id_usuario'});
Lista.belongsTo(Usuario, {foreignKey: 'id_usuario'});

Juego.belongsToMany(Lista, {through: JuegoLista, foreignKey:'juego_id'});
Lista.belongsToMany(Juego, {through: JuegoLista, foreignKey:'id_lista'});

JuegoLista.belongsTo(Lista, {foreignKey: 'id_lista'});
JuegoLista.belongsTo(Juego,{foreignKey:'juego_id'});

Lista.hasMany(JuegoLista, {foreignKey:'id_lista'});
Juego.hasMany(JuegoLista, {foreignKey:'juego_id'});

module.exports = { sequelize, Juego, Usuario, Lista, JuegoLista};
