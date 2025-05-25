'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('citas', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        primaryKey: true
      },
      solicitud_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'solicitudes_cita', // Relación con la solicitud
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      empleado_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'empleados', // Relación con el empleado asignado
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('citas');
  }
};
