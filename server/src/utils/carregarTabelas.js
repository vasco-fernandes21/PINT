const Utilizador = require('../models/utilizadorModel');
const Area = require('../models/areaModel');
const Subarea = require('../models/subareaModel');
const Posto = require('../models/postoModel');
const Evento = require('../models/eventoModel');
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
  }
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
    })
    .catch((error) => {
      console.error('Erro ao recriar tabelas e inserir dados:', error);
    });
  };

module.exports = carregarTabelas;
