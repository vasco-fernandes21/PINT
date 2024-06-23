const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');
const Posto = require('./postoModel');

const Utilizador = sequelize.define('Utilizador', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: DataTypes.STRING,
  descricao: DataTypes.STRING(1000),
  nif: DataTypes.STRING,
  localidade: DataTypes.STRING,
  telemovel: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  palavra_passe: DataTypes.STRING,
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  foto: DataTypes.STRING,
  id_google: DataTypes.STRING,
  id_facebook: DataTypes.STRING,
  cargo: DataTypes.STRING,
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isPrimeiroLogin: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  recoveryToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adminId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Utilizador', 
      key: 'id',
      defaultValue: null
    }
  },
  idPosto : {
    type: DataTypes.INTEGER,
    references: {
      model: 'Posto',
      key: 'id',
      defaultValue: null
    }
  }
}, 
{
  freezeTableName: true,
  timestamps: false
});

Utilizador.belongsTo(Posto, {foreignKey: 'idPosto'});

module.exports = Utilizador;