'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('empleados', 'usuario_id', {
            type: Sequelize.INTEGER,
            allowNull: true, 
            unique: true,
            references: {
                model: 'usuarios',
                key: 'id_usuario'
            }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('empleados', 'usuario_id', {
            type: Sequelize.INTEGER,
            allowNull: false,  
            unique: true,
            references: {
                model: 'usuarios',
                key: 'id_usuario'
            }
        });

  }
};
