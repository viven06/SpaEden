'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('servicios', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      precio: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      duracion: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('servicios');
  }
};
