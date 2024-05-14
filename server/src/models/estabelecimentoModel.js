const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');
const Area = require('./areaModel');
const Subarea = require('./subareaModel');
const Posto = require('./postoModel');

const Estabelecimento = sequelize.define('Estabelecimento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idArea: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Area',
      key: 'id'
    }
  },
  idSubarea: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Subarea',
      key: 'id'
    }
  },
  idPosto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Posto',
      key: 'id'
    }
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },

  },
  {
    freezeTableName: true,
    timestamps: false
  });

Estabelecimento.belongsTo(Area, {foreignKey: 'idArea'});
Estabelecimento.belongsTo(Subarea, {foreignKey: 'idSubarea'});
Estabelecimento.belongsTo(Posto, {foreignKey: 'idPosto'});

module.exports = Estabelecimento;