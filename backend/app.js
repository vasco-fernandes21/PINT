const express = require('express');
const port = 3001;

const app = express();
const cors = require('cors'); 
const pool = require('./src/utils/database');

app.use(cors({
  origin: ['http://localhost:3000'], // Especificar a origem do frontend
  methods: ['GET', 'POST'], // Permitir métodos GET e POST
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir cabeçalhos específicos
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

// Importação do módulo de roteamento para o login
const loginRoutes = require('./src/routes/loginRoute');
const registarRoutes = require('./src/routes/registarRoute');

// Rotas da API
app.use('/login', loginRoutes);
app.use('/registar', registarRoutes);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});