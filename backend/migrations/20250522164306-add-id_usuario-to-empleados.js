'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('empleados', 'usuario_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,  // ✅ Cada recepcionista debe tener un único usuario
          references: {
              model: 'usuarios',
              key: 'id_usuario'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('empleados', 'usuario_id');
  }
};
