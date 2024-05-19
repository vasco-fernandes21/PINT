const express = require('express');
const port = 3001;
require ('dotenv').config();

const app = express();
const cors = require('cors'); 
const {connect} = require('./src/utils/database');

app.use(cors({
  origin: ['http://localhost:3000', 'https://pint-softinsa.vercel.app'], // Adicione a URL do Vercel aqui
  methods: ['GET', 'POST'], // Permitir métodos GET e POST
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir cabeçalhos específicos
}));

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

{ /* Carregar automaticamente as tabelas com dados pré-feitos, apenas retirar comentário para ativar e adicionar comentário outra vez depois 
const carregarTabelas = require('./src/utils/carregarTabelas');
carregarTabelas(); */ }


// Importação do módulo de roteamento para o login
const authRoutes = require('./src/routes/authRoutes'); 
const eventoRoutes = require('./src/routes/eventoRoutes');
const areaRoutes = require('./src/routes/areaRoutes');
// Rotas da API
app.use('/', authRoutes);
app.use('/eventos', eventoRoutes);
app.use('/areas', areaRoutes);


app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});