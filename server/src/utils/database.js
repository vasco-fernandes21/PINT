const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  logging: false,
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o PostgreSQL estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao PostgreSQL:', error);
  }
}

module.exports = { sequelize, connect };
