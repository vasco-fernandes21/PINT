const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');
const Utilizador = require('./utilizadorModel');
const Evento = require('./eventoModel');

const AvaliacaoEvento = sequelize.define('AvaliacaoEvento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idUtilizador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Utilizador',
      key: 'id'
    }
  },
  idAdmin: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Utilizador',
      key: 'id'
    }
  },
  idEvento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Evento',
      key: 'id'
    }
  },
  comentario: DataTypes.TEXT
}, 
{
  freezeTableName: true,
  timestamps: false
});

AvaliacaoEvento.belongsTo(Evento, { foreignKey: 'idEvento', as: 'evento' });
AvaliacaoEvento.belongsTo(Utilizador, { foreignKey: 'idUtilizador', as: 'utilizador' });
AvaliacaoEvento.belongsTo(Utilizador, { foreignKey: 'idAdmin', as: 'admin' });

module.exports = AvaliacaoEvento;