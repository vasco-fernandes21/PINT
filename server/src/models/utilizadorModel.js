const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Utilizador = sequelize.define('Utilizador', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: DataTypes.STRING,
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
  id_google: DataTypes.STRING,
  id_facebook: DataTypes.STRING,
  cargo: DataTypes.STRING,
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
}, 
{
  freezeTableName: true,
  timestamps: false
});

module.exports = Utilizador;