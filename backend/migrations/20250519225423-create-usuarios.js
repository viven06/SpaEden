'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      contraseña: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
