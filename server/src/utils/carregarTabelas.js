const Utilizador = require('../models/utilizadorModel');
const Area = require('../models/areaModel');
const Subarea = require('../models/subareaModel');
const Posto = require('../models/postoModel');
const Evento = require('../models/eventoModel');
const Estabelecimento = require('../models/estabelecimentoModel');
const { sequelize } = require('./database');

const utilizadores = [
  {
    nome: 'Artur Oliveira',
    nif: '123456789',
    localidade: 'Viseu',
    telemovel: '912345678',
    email: 'artur@email.com',
    estado: false,
    isAdmin: true,
    cargo: 'Lider de Marketing',
  },
  {
    nome: 'Vasco Fernandes',
    nif: '987654321',
    localidade: 'Porto',
    telemovel: '987654321',
    email: 'vasco@email.com',
    estado: true,
    isAdmin: false,
    cargo: 'IT',
  },
  {
    nome: 'Pedro Figueiredo',
    nif: '123456789',
    localidade: 'Viseu',
    telemovel: '912345678',
    email: 'pedro@email.com',
    estado: false,
    isAdmin: false,
    cargo: 'Marketing',
  },
  {
    nome: 'Mateus Vasconcelos',
    nif: '987654321',
    localidade: 'Viseu',
    telemovel: '987654321',
    email: 'mateus@email.com',
    estado: true,
    isAdmin: false,
    cargo: 'Gestor de Dados',
  },
  {
    nome: 'Simão Ramos',
    nif: '123456789',
    localidade: 'Viseu',
    telemovel: '912345678',
    email: 'simao@email.com',
    estado: false,
    isAdmin: false,
    cargo: 'Gestor de Dados',
  },
  {
    nome: 'Teste',
    email: 'teste@email.com',
    palavra_passe: '$2a$10$uD0hKNj4bXFQMtmB4XCNe.7scC5pkgddQvdYySm22nAPV0voT3ozO',
  },
];

const areas = [
  {nome: 'Saúde'},
  {nome: 'Desporto'},
  {nome: 'Formação'},
  {nome: 'Gastronomia'},
  {nome: 'Alojamento'},
  {nome: 'Transportes'},
  {nome: 'Lazer'}
];

const subareas = [
  {idArea: 1, nome: 'Clinicas medicas e hospitais'},
  {idArea: 1, nome: 'Clinicas dentárias'},
  {idArea: 2, nome: 'Ginásios'},
  {idArea: 2, nome: 'Atividades ao Ar Livre'},
  {idArea: 3, nome: 'Centros de Formação'},
  {idArea: 3, nome: 'Escolas'},
  {idArea: 4, nome: 'Restaurantes'},
  {idArea: 4, nome: 'Shoppings'},
  {idArea: 5, nome: 'Quartos para arrendar'},
  {idArea: 5, nome: 'Casas para alugar'},
  {idArea: 6, nome: 'Boleias'},
  {idArea: 6, nome: 'Transportes públicos'},
  {idArea: 7, nome: 'Cinema'},
  {idArea: 7, nome: 'Parques'},
];

  const postos = [
    {nome: 'Viseu'},
    {nome: 'Tomar'},
    {nome: 'Fundão'},
    {nome: 'Portalegre'},
    {nome: 'Vila Real'},
  ];

const eventos = [
  {idArea: 1, idSubarea: 1, idCriador: 1, idAdmin: 1, titulo: 'Maratona de Saúde', descricao: 'Maratona de Saúde na cidade de Viseu', data: '2024-03-01', hora: '10:00:00', local: 'Viseu', estado: true},
  {idArea: 1, idSubarea: 2, idCriador: 2, idAdmin: 2, titulo: 'Feira de Saúde', descricao: 'Feira de Saúde na cidade de Tomar', data: '2024-04-01', hora: '11:00:00', local: 'Tomar', estado: true},
  {idArea: 2, idSubarea: 3, idCriador: 3, idAdmin: 3, titulo: 'Torneio de Futebol', descricao: 'Torneio de Futebol na cidade de Fundão', data: '2024-05-01', hora: '12:00:00', local: 'Fundão', estado: true},
  {idArea: 2, idSubarea: 4, idCriador: 4, idAdmin: 4, titulo: 'Corrida de Bicicleta', descricao: 'Corrida de Bicicleta na cidade de Portalegre', data: '2024-06-01', hora: '13:00:00', local: 'Portalegre', estado: true},
  {idArea: 3, idSubarea: 5, idCriador: 5, idAdmin: 5, titulo: 'Workshop de Programação', descricao: 'Workshop de Programação na cidade de Vila Real', data: '2024-07-01', hora: '14:00:00', local: 'Vila Real', estado: true}
];

const estabelecimentos = [
  {
    nome: 'Restaurante A Tasquinha',
    idArea: 4,
    idSubarea: 4,
    idPosto: 1,
    local: 'Rua da Liberdade, 123 - Viseu',
    descricao: 'Restaurante tradicional com pratos portugueses deliciosos.'
  },
  {
    nome: 'Padaria do Sr. Manuel',
    idArea: 4,
    idSubarea: 4,
    idPosto: 5,
    local: 'Avenida dos Combatentes, 456 - Tomar',
    descricao: 'Padaria artesanal com pães frescos e bolos caseiros.'
  },
  {
    nome: 'Clínica Médica Dr. Silva',
    idArea: 1,
    idSubarea: 1,
    idPosto: 3,
    local: 'Rua Central, 789 - Fundão',
    descricao: 'Clínica médica com atendimento geral e especialidades.'
  },
  {
    nome: 'Loja de Desporto Sport Life',
    idArea: 2,
    idSubarea: 3,
    idPosto: 2,
    local: 'Centro Comercial ABC, Loja 10 - Portalegre',
    descricao: 'Loja de artigos esportivos com as melhores marcas.'
  },
  {
    nome: 'Escola de Informática TecnoStart',
    idArea: 3,
    idSubarea: 5,
    idPosto: 4,
    local: 'Praça da República, 234 - Vila Real',
    descricao: 'Cursos de informática para todos os níveis e públicos.'
  },
  {
    nome: 'Hotel Sol Nascente',
    idArea: 5,
    idSubarea: 5,
    idPosto: 1,
    local: 'Rua da Praia, 567 - Viseu',
    descricao: 'Hotel com vista para o mar e piscina ao ar livre.'
  },
  {
    nome: 'Táxi Rápido',
    idArea: 6,
    idSubarea: 6,
    idPosto: 5,
    local: 'Rua das Flores, 890 - Tomar',
    descricao: 'Serviço de táxi rápido e confiável.'
  },
  {
    nome: 'Cinema Sétimo Art',
    idArea: 7,
    idSubarea: 7,
    idPosto: 2,
    local: 'Avenida da Liberdade, 321 - Fundão',
    descricao: 'Cinema com programação diversificada e preços acessíveis.'
  },
  {
    nome: 'Museu de História Local',
    idArea: 7,
    idSubarea: 1,
    idPosto: 3,
    local: 'Praça da Matriz, 123 - Portalegre',
    descricao: 'Museu com acervo sobre a história da região.'
  },
  {
    nome: 'Livraria Bertrand',
    idArea: 7,
    idSubarea: 10,
    idPosto: 4,
    local: 'Rua dos Livros, 456 - Vila Real',
    descricao: 'Livraria com grande variedade de livros e outros produtos culturais.'
  }
];

const carregarTabelas = () => {
  sequelize.sync({ force: true })
    .then(() => {
      console.log('Tabelas recriadas com sucesso');

      return Utilizador.bulkCreate(utilizadores);
    })
    .then(() => {
      console.log('Utilizadores inseridos com sucesso');
      return Area.bulkCreate(areas);
    })
    .then(() => {
      console.log('Áreas inseridas com sucesso');
      return Subarea.bulkCreate(subareas);
    })
    .then(() => {
      console.log('Subáreas inseridas com sucesso');
      return Posto.bulkCreate(postos);
    })
    .then(() => {
      console.log('Postos inseridos com sucesso');
      return Evento.bulkCreate(eventos);
    })
    .then(() => {
      console.log('Eventos inseridos com sucesso');
      return Estabelecimento.bulkCreate(estabelecimentos);
    })
    .then(() => {
      console.log('Estabelecimentos inseridos com sucesso');
      console.log('Dados carregados com sucesso');
    })
    .catch((error) => {
      console.error('Erro ao recriar tabelas e inserir dados:', error);
    });
  };

module.exports = carregarTabelas;