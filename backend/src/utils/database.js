const sql = require('mssql');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '../../.env' });

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, 
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }, 
};


async function connect() {
  try {
    await sql.connect(config);
    console.log('Conectado ao MSSQL');
  } catch (err) {
    console.error('Erro ao conectar ao MSSQL:', err);
  }
}

module.exports = { sql, connect };