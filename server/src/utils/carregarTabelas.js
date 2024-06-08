const Utilizador = require('../models/utilizadorModel');
const Area = require('../models/areaModel');
const Subarea = require('../models/subareaModel');
const Posto = require('../models/postoModel');
const Evento = require('../models/eventoModel');
const Estabelecimento = require('../models/estabelecimentoModel');
const AvaliacaoEstabelecimento = require('../models/avaliacaoEstabelecimentoModel');
const FotoEstabelecimento = require('../models/fotoEstabelecimentoModel');
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
    estado: true,
    isAdmin: true,
    idPosto: 1,
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
  // Saúde
  {idArea: 1, idSubarea: 1, idCriador: 1, idAdmin: 1, idPosto: 1, titulo: 'Campanha de Saúde', descricao: 'Campanha de Saúde na cidade de Viseu', data: '2024-03-01', hora: '10:00:00', morada: 'Viseu', estado: true},
  {idArea: 1, idSubarea: 2, idCriador: 2, idAdmin: 2, idPosto: 2, titulo: 'Check-up Dentário', descricao: 'Check-up Dentário na cidade de Tomar', data: '2024-04-01', hora: '11:00:00', morada: 'Tomar', estado: true},
  {idArea: 1, idSubarea: 1, idCriador: 3, idAdmin: 3, idPosto: 3, titulo: 'Feira de Saúde', descricao: 'Feira de Saúde na cidade de Fundão', data: '2024-05-01', hora: '12:00:00', morada: 'Fundão', estado: true},

  // Desporto
  {idArea: 2, idSubarea: 3, idCriador: 4, idAdmin: 4, idPosto: 4, titulo: 'Competição de Ginástica', descricao: 'Competição de Ginástica na cidade de Portalegre', data: '2024-03-01', hora: '10:00:00', morada: 'Portalegre', estado: true},
  {idArea: 2, idSubarea: 4, idCriador: 5, idAdmin: 5, idPosto: 5, titulo: 'Atividades ao Ar Livre', descricao: 'Atividades ao Ar Livre na cidade de Vila Real', data: '2024-04-01', hora: '11:00:00', morada: 'Vila Real', estado: true},
  {idArea: 2, idSubarea: 3, idCriador: 1, idAdmin: 2, idPosto: 1, titulo: 'Torneio de Futebol', descricao: 'Torneio de Futebol na cidade de Viseu', data: '2024-05-01', hora: '12:00:00', morada: 'Viseu', estado: true},

  // Formação
  {idArea: 3, idSubarea: 5, idCriador: 2, idAdmin: 3, idPosto: 2, titulo: 'Workshop de Programação', descricao: 'Workshop de Programação na cidade de Tomar', data: '2024-03-01', hora: '10:00:00', morada: 'Tomar', estado: true},
  {idArea: 3, idSubarea: 6, idCriador: 3, idAdmin: 4, idPosto: 3, titulo: 'Feira Educacional', descricao: 'Feira Educacional na cidade de Fundão', data: '2024-04-01', hora: '11:00:00', morada: 'Fundão', estado: true},
  {idArea: 3, idSubarea: 5, idCriador: 4, idAdmin: 5, idPosto: 4, titulo: 'Seminário de Educação', descricao: 'Seminário de Educação na cidade de Portalegre', data: '2024-05-01', hora: '12:00:00', morada: 'Portalegre', estado: true},

  // Gastronomia
  {idArea: 4, idSubarea: 7, idCriador: 5, idAdmin: 1, idPosto: 5, titulo: 'Festival de Gastronomia', descricao: 'Festival de Gastronomia na cidade de Vila Real', data: '2024-03-01', hora: '10:00:00', morada: 'Vila Real', estado: true},
  {idArea: 4, idSubarea: 8, idCriador: 1, idAdmin: 2, idPosto: 1, titulo: 'Feira de Shoppings', descricao: 'Feira de Shoppings na cidade de Viseu', data: '2024-04-01', hora: '11:00:00', morada: 'Viseu', estado: true},
  {idArea: 4, idSubarea: 7, idCriador: 2, idAdmin: 3, idPosto: 2, titulo: 'Degustação de Pratos', descricao: 'Degustação de Pratos na cidade de Tomar', data: '2024-05-01', hora: '12:00:00', morada: 'Tomar', estado: true},

  // Alojamento
  {idArea: 5, idSubarea: 9, idCriador: 3, idAdmin: 4, idPosto: 3, titulo: 'Feira de Quartos', descricao: 'Feira de Quartos na cidade de Fundão', data: '2024-03-01', hora: '10:00:00', morada: 'Fundão', estado: true},
  {idArea: 5, idSubarea: 10, idCriador: 4, idAdmin: 5, idPosto: 4, titulo: 'Mostra de Casas para Alugar', descricao: 'Mostra de Casas para Alugar na cidade de Portalegre', data: '2024-04-01', hora: '11:00:00', morada: 'Portalegre', estado: true},
  {idArea: 5, idSubarea: 9, idCriador: 5, idAdmin: 1, idPosto: 5, titulo: 'Exposição de Alojamento', descricao: 'Exposição de Alojamento na cidade de Vila Real', data: '2024-05-01', hora: '12:00:00', morada: 'Vila Real', estado: true},

  // Transportes
  {idArea: 6, idSubarea: 11, idCriador: 1, idAdmin: 2, idPosto: 1, titulo: 'Feira de Boleias', descricao: 'Feira de Boleias na cidade de Viseu', data: '2024-03-01', hora: '10:00:00', morada: 'Viseu', estado: true},
  {idArea: 6, idSubarea: 12, idCriador: 2, idAdmin: 3, idPosto: 2, titulo: 'Exposição de Transportes Públicos', descricao: 'Exposição de Transportes Públicos na cidade de Tomar', data: '2024-04-01', hora: '11:00:00', morada: 'Tomar', estado: true},
  {idArea: 6, idSubarea: 11, idCriador: 3, idAdmin: 4, idPosto: 3, titulo: 'Carpooling Meetup', descricao: 'Carpooling Meetup na cidade de Fundão', data: '2024-05-01', hora: '12:00:00', morada: 'Fundão', estado: true},

  // Lazer
  {idArea: 7, idSubarea: 13, idCriador: 4, idAdmin: 5, idPosto: 4, titulo: 'Festival de Cinema', descricao: 'Festival de Cinema na cidade de Portalegre', data: '2024-03-01', hora: '10:00:00', morada: 'Portalegre', estado: true},
  {idArea: 7, idSubarea: 14, idCriador: 5, idAdmin: 1, idPosto: 5, titulo: 'Passeio no Parque', descricao: 'Passeio no Parque na cidade de Vila Real', data: '2024-04-01', hora: '11:00:00', morada: 'Vila Real', estado: true},
  {idArea: 7, idSubarea: 13, idCriador: 1, idAdmin: 2, idPosto: 1, titulo: 'Noite de Cinema ao Ar Livre', descricao: 'Noite de Cinema ao Ar Livre na cidade de Viseu', data: '2024-05-01', hora: '12:00:00', morada: 'Viseu', estado: true},
];

const estabelecimentos = [
  // Saúde
  {idArea: 1, idSubarea: 1, idCriador: 1, idAdmin: 1, idPosto: 1, nome: 'Clínica de Viseu', descricao: 'Clínica de Viseu, especializada em várias áreas médicas', morada: 'Viseu', estado: true, foto: 'foto-1717335916152-hospital.jpg'},
  {idArea: 1, idSubarea: 2, idCriador: 2, idAdmin: 2, idPosto: 2, nome: 'Clínica Dentária Tomar', descricao: 'Clínica Dentária Tomar, com atendimento especializado', morada: 'Tomar', estado: true},
  {idArea: 1, idSubarea: 1, idCriador: 3, idAdmin: 3, idPosto: 3, nome: 'Hospital do Fundão', descricao: 'Hospital do Fundão, oferecendo serviços de emergência', morada: 'Fundão', estado: true},

  // Desporto
  {idArea: 2, idSubarea: 3, idCriador: 4, idAdmin: 4, idPosto: 4, nome: 'Ginásio Portalegre', descricao: 'Ginásio Portalegre, equipado com as melhores máquinas', morada: 'Portalegre', estado: true},
  {idArea: 2, idSubarea: 4, idCriador: 5, idAdmin: 5, idPosto: 5, nome: 'Centro de Atividades Vila Real', descricao: 'Centro de Atividades ao Ar Livre em Vila Real', morada: 'Vila Real', estado: true},
  {idArea: 2, idSubarea: 3, idCriador: 1, idAdmin: 2, idPosto: 1, nome: 'Fitness Club Viseu', descricao: 'Fitness Club Viseu, para um treino completo', morada: 'Viseu', estado: true, foto:'ginasio.jpg'},

  // Formação
  {idArea: 3, idSubarea: 5, idCriador: 2, idAdmin: 3, idPosto: 2, nome: 'Centro de Formação Tomar', descricao: 'Centro de Formação Profissional em Tomar', morada: 'Tomar', estado: true},
  {idArea: 3, idSubarea: 6, idCriador: 3, idAdmin: 4, idPosto: 3, nome: 'Escola Secundária Fundão', descricao: 'Escola Secundária na cidade do Fundão', morada: 'Fundão', estado: true},
  {idArea: 3, idSubarea: 5, idCriador: 4, idAdmin: 5, idPosto: 4, nome: 'Centro Educacional Portalegre', descricao: 'Centro Educacional na cidade de Portalegre', morada: 'Portalegre', estado: true},

  // Gastronomia
  {idArea: 4, idSubarea: 7, idCriador: 5, idAdmin: 1, idPosto: 5, nome: 'Restaurante Vila Real', descricao: 'Restaurante com pratos típicos em Vila Real', morada: 'Vila Real', estado: true},
  {idArea: 4, idSubarea: 8, idCriador: 1, idAdmin: 2, idPosto: 1, nome: 'Shopping Viseu', descricao: 'Shopping em Viseu com diversas lojas', morada: 'Viseu', estado: true, foto:'palacio.jpg'},
  {idArea: 4, idSubarea: 7, idCriador: 2, idAdmin: 3, idPosto: 2, nome: 'Gastronomia Tomar', descricao: 'Restaurante gourmet em Tomar', morada: 'Tomar', estado: true},

  // Alojamento
  {idArea: 5, idSubarea: 9, idCriador: 3, idAdmin: 4, idPosto: 3, nome: 'Quartos Fundão', descricao: 'Quartos para arrendar na cidade de Fundão', morada: 'Fundão', estado: true},
  {idArea: 5, idSubarea: 10, idCriador: 4, idAdmin: 5, idPosto: 4, nome: 'Casas Portalegre', descricao: 'Casas para alugar na cidade de Portalegre', morada: 'Portalegre', estado: true},
  {idArea: 5, idSubarea: 9, idCriador: 5, idAdmin: 1, idPosto: 5, nome: 'Alojamento Vila Real', descricao: 'Quartos e alojamento na cidade de Vila Real', morada: 'Vila Real', estado: true},

  // Transportes
  {idArea: 6, idSubarea: 11, idCriador: 1, idAdmin: 2, idPosto: 1, nome: 'Boleias Viseu', descricao: 'Serviço de boleias na cidade de Viseu', morada: 'Viseu', estado: true},
  {idArea: 6, idSubarea: 12, idCriador: 2, idAdmin: 3, idPosto: 2, nome: 'Transportes Tomar', descricao: 'Transportes públicos na cidade de Tomar', morada: 'Tomar', estado: true},
  {idArea: 6, idSubarea: 11, idCriador: 3, idAdmin: 4, idPosto: 3, nome: 'Carpooling Fundão', descricao: 'Serviço de carpooling na cidade de Fundão', morada: 'Fundão', estado: true},

  // Lazer
  {idArea: 7, idSubarea: 13, idCriador: 4, idAdmin: 5, idPosto: 4, nome: 'Cinema Portalegre', descricao: 'Cinema na cidade de Portalegre', morada: 'Portalegre', estado: true},
  {idArea: 7, idSubarea: 14, idCriador: 5, idAdmin: 1, idPosto: 5, nome: 'Parque Vila Real', descricao: 'Parque de lazer em Vila Real', morada: 'Vila Real', estado: true},
  {idArea: 7, idSubarea: 13, idCriador: 1, idAdmin: 2, idPosto: 1, nome: 'Cinema Viseu', descricao: 'Cinema ao ar livre em Viseu', morada: 'Viseu', estado: true},
];

const AvaliacoesEstabelecimento = [
  {idUtilizador: 1, idAdmin: 1, idEstabelecimento: 1, classificacao: 5},
  {idUtilizador: 2, idAdmin: 2, idEstabelecimento: 1, classificacao: 4},
  {idUtilizador: 3, idAdmin: 3, idEstabelecimento: 1, classificacao: 3},
  {idUtilizador: 4, idAdmin: 4, idEstabelecimento: 1, classificacao: 2},
  {idUtilizador: 5, idAdmin: 5, idEstabelecimento: 1, classificacao: 1},
];

const FotosEstabelecimento = [
  {idEstabelecimento: 1, foto: 'foto-1717335916152-hospital.jpg', idAdmin: 1, idCriador: 1},
  {idEstabelecimento: 1, foto: 'ginasio.jpg', idAdmin: 1, idCriador: 1},
  {idEstabelecimento: 1, foto: 'palacio.jpg', idAdmin: 1, idCriador: 1},
];

const carregarTabelas = () => {
  sequelize.sync({ force: true })
    .then(() => {
      return Posto.bulkCreate(postos);
    })
    .then(() => {
      return Utilizador.bulkCreate(utilizadores);
    })
    .then(() => {
      return Area.bulkCreate(areas);
    })
    .then(() => {
      return Subarea.bulkCreate(subareas);
    })
    .then(() => {
      return Evento.bulkCreate(eventos);
    })
    .then(() => {
      return Estabelecimento.bulkCreate(estabelecimentos);
    })
    .then(() => {
      return Estabelecimento.bulkCreate(estabelecimentos);
    })
    .then(() => {
      return AvaliacaoEstabelecimento.bulkCreate(AvaliacoesEstabelecimento);
    })
    .then(() => {
      return FotoEstabelecimento.bulkCreate(FotosEstabelecimento);
    })
    .catch((error) => {
      console.error('Erro ao carregar tabelas:', error);
    });
}

module.exports = carregarTabelas;
