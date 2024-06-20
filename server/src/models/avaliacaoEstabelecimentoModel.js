  const { DataTypes } = require('sequelize');
  const {sequelize} = require('../utils/database');
  const Estabelecimento = require('./estabelecimentoModel');
  const Utilizador = require('./utilizadorModel');

  const AvaliacaoEstabelecimento = sequelize.define('AvaliacaoEstabelecimento', {
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
      allowNull: true,
      references: {
        model: 'Utilizador',
        key: 'id'
      }
    },
    idEstabelecimento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Estabelecimento',
        key: 'id'
      }
    },
    classificacao: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comentario: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM('pendente', 'aceite', 'recusada'),
      allowNull: false,
      defaultValue: 'pendente'
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });

  AvaliacaoEstabelecimento.belongsTo(Utilizador, { foreignKey: 'idUtilizador', as: 'utilizador' });
  AvaliacaoEstabelecimento.belongsTo(Utilizador, { foreignKey: 'idAdmin', as: 'admin' });
  AvaliacaoEstabelecimento.belongsTo(Estabelecimento, { foreignKey: 'idEstabelecimento', as: 'estabelecimento' });

  module.exports = AvaliacaoEstabelecimento;