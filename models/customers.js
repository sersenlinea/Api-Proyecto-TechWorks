'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customers.init({
    genero: DataTypes.STRING,
    pais: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    ciudad: DataTypes.STRING,
    habitos: DataTypes.INTEGER,
    productos: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customers',
  });
  return customers;
};