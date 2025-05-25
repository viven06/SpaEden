'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('empleados', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      especialidad: {
        type: Sequelize.STRING,
        allowNull: false // Ej: Masajista, Esteticista, etc.
      },
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('empleados');
  }
};
