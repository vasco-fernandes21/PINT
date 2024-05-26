const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');
const Area = require('./areaModel');
const Subarea = require('./subareaModel');
const Utilizador = require('./utilizadorModel');

const Evento = sequelize.define('Evento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
  idCriador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Utilizador',
      key: 'id'
    }
  },
  idAdmin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Utilizador',
      key: 'id'
    }
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

},
{
  freezeTableName: true,
  timestamps: false
});

Evento.belongsTo(Area, { as: 'area', foreignKey: 'idArea' });
Evento.belongsTo(Subarea, { as: 'subarea', foreignKey: 'idSubarea' });
Evento.belongsTo(Utilizador, { as: 'criador', foreignKey: 'idCriador' });
Evento.belongsTo(Utilizador, { as: 'admin', foreignKey: 'idAdmin' });

module.exports = Evento;
