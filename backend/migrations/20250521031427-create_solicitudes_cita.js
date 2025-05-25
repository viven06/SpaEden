'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('solicitudes_cita', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        primaryKey: true
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios', // Asegúrate de que coincide con la tabla Usuarios
          key: 'id_usuario'
        },
        onDelete: 'CASCADE'
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      franja_horaria: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estado: {
        type: Sequelize.ENUM('pendiente', 'aceptada', 'rechazada'),
        defaultValue: 'pendiente'
      },
      servicio_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'servicios', // Conectar con la tabla Servicios
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('solicitudes_cita');
  }
};
