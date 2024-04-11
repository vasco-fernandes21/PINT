const express = require('express');
const port = 3000;

const app = express();
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3001'], // Especificar a origem do frontend
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
const usersRoutes = require('./src/routes/users');
const registarRoutes = require('./src/routes/registar');
console.log(usersRoutes);

// Rotas da API
app.use('/login', loginRoutes);
app.use('/users', usersRoutes)
app.use('/registar', registarRoutes);

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});