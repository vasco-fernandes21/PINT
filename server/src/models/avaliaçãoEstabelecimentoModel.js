const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');
const Estabelecimento = require('./estabelecimentoModel');
const Utilizador = require('./utilizadorModel');

class AvaliacaoEstabelecimento extends Model {}

AvaliacaoEstabelecimento.init({
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
}, {
    sequelize,
    modelName: 'AvaliacaoEstabelecimento',
    freezeTableName: true,
    timestamps: false
});

AvaliacaoEstabelecimento.belongsTo(Utilizador, { foreignKey: 'idUtilizador', as: 'utilizador' });
AvaliacaoEstabelecimento.belongsTo(Estabelecimento, { foreignKey: 'idEstabelecimento', as: 'estabelecimento' });
