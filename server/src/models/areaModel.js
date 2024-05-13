const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Area = sequelize.define('Area', {
  id_area: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome_area: DataTypes.STRING
}, 
{
  freezeTableName: true
});

export.module = Area;