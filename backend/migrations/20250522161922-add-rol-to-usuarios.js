'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'rol', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'cliente'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'rol');
  }
};
