'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      genero: {
        type: Sequelize.STRING
      },
      pais: {
        type: Sequelize.STRING
      },
      edad: {
        type: Sequelize.INTEGER
      },
      ciudad: {
        type: Sequelize.STRING
      },
      habitos: {
        type: Sequelize.INTEGER
      },
      productos: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};