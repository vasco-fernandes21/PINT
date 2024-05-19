const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pint', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

async function ligarLocal() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o PostgreSQL estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao PostgreSQL:', error);
  }
}

module.exports = { sequelize, ligarLocal };