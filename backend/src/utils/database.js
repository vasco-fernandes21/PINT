const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'postgres',
  port: 5432,
  database: "pint"
});

async function connect() {
  try {
    await pool.connect();
    console.log('Conectado ao PostgreSQL');
  } catch (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err);
  }
}

module.exports = { pool, connect };
