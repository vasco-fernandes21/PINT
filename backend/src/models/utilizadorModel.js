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
  token_google: DataTypes.STRING,
  id_facebook: DataTypes.STRING,
  token_facebook: DataTypes.STRING,
  cargo: DataTypes.STRING,
  tipo_utilizador: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  areas_interesse: DataTypes.TEXT
}, 
{
  freezeTableName: true
});

Utilizador.sync({ force: false })
  .then(() => console.log('Tabela "Utilizador" criada ou já existente'))
  .catch(error => console.error('Erro ao criar a tabela "Utilizador":', error));

module.exports = Utilizador;