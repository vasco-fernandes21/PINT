const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Area = sequelize.define('Area', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: DataTypes.STRING,
  iconeId: DataTypes.INTEGER,
}, 
  
  
{
  freezeTableName: true,
  timestamps: false
});


module.exports = Area;

