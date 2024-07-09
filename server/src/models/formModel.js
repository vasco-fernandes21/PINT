const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');
const Evento = require('./eventoModel');

const Formulario = sequelize.define('Formulario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    campos: {
        type: DataTypes.JSONB, // Mantido para definir a estrutura inicial dos campos do formulário
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    textoAuxiliar: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    idEvento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Evento,
            key: 'id',
        },
    },
    respostas: {
        type: DataTypes.JSONB, 
        allowNull: true, 
    },
}, {
    tableName: 'Formulario',
    timestamps: false,
    freezeTableName: true,
});

Formulario.belongsTo(Evento, { foreignKey: 'idEvento' });

module.exports = Formulario;
