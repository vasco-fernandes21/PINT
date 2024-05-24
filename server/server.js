const express = require('express');
const port = 3001;
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); 
require ('dotenv').config();
app.use(cors({
  origin: ['http://localhost:3000', 'https://pint-softinsa.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

{ /* Carregar automaticamente as tabelas com dados pré-feitos, apenas retirar comentário para ativar e adicionar comentário outra vez depois 
const carregarTabelas = require('./src/utils/carregarTabelas'); 
carregarTabelas(); */ }


// Importação do módulo de roteamento para o login
const upload = require('./src/config/multer');
const authRoutes = require('./src/routes/authRoutes'); 
const eventoRoutes = require('./src/routes/eventoRoutes');
const areaRoutes = require('./src/routes/areaRoutes');
const estabelecimentoRoutes = require('./src/routes/estabelecimentoRoutes');
// Rotas da API
app.use('/', authRoutes);
app.use('/eventos', eventoRoutes);
app.use('/areas', areaRoutes);
app.use('/estabelecimentos', estabelecimentoRoutes);

app.post('/uploads', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.send('File uploaded successfully');
});


app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});