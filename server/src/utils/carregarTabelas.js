const Utilizador = require('../models/utilizadorModel');
const Area = require('../models/areaModel');
const Subarea = require('../models/subareaModel');
const Posto = require('../models/postoModel');
const Evento = require('../models/eventoModel');
const Estabelecimento = require('../models/estabelecimentoModel');
const AvaliacaoEstabelecimento = require('../models/avaliacaoEstabelecimentoModel');
const AvaliacaoEvento = require('../models/avaliacaoEventoModel');
const FotoEstabelecimento = require('../models/fotoEstabelecimentoModel');
const FotoEvento = require('../models/fotoEventoModel');
const Inscricao = require('../models/inscricaoModel');
const Notificacao = require('../models/notificacaoModel');
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
    nome: 'Utilizador Teste',
    email: 'teste@email.com',
    palavra_passe: '$2a$10$uD0hKNj4bXFQMtmB4XCNe.7scC5pkgddQvdYySm22nAPV0voT3ozO',
    estado: true,
    isAdmin: true,
    isPrimeiroLogin: false,
    idPosto: 1,
    cargo: 'Gestor de Dados',
    descricao: 'Utilizador de teste',
  },
];

const areas = [
  { nome: 'Saúde' },
  { nome: 'Desporto' },
  { nome: 'Formação' },
  { nome: 'Gastronomia' },
  { nome: 'Alojamento' },
  { nome: 'Transportes' },
  { nome: 'Lazer' }
];

const subareas = [
  { idArea: 1, nome: 'Clinicas medicas e hospitais' },
  { idArea: 1, nome: 'Clinicas dentárias' },
  { idArea: 2, nome: 'Ginásios' },
  { idArea: 2, nome: 'Atividades ao Ar Livre' },
  { idArea: 3, nome: 'Centros de Formação' },
  { idArea: 3, nome: 'Escolas' },
  { idArea: 4, nome: 'Restaurantes' },
  { idArea: 4, nome: 'Shoppings' },
  { idArea: 5, nome: 'Quartos para arrendar' },
  { idArea: 5, nome: 'Casas para alugar' },
  { idArea: 6, nome: 'Boleias' },
  { idArea: 6, nome: 'Transportes públicos' },
  { idArea: 7, nome: 'Cinema' },
  { idArea: 7, nome: 'Parques' },
];

const postos = [
  { nome: 'Viseu' },
  { nome: 'Tomar' },
  { nome: 'Fundão' },
  { nome: 'Portalegre' },
  { nome: 'Vila Real' },
];

const eventos = [
  // Saúde
  { idArea: 1, idSubarea: 1, idCriador: 1, idAdmin: 1, idPosto: 1, titulo: 'Campanha de Saúde', descricao: 'Campanha de Saúde na cidade de Viseu', data: '2024-03-01', hora: '10:00:00', morada: 'Viseu', estado: true, foto: 'cufViseu.jpg' },
  { idArea: 1, idSubarea: 2, idCriador: 2, idAdmin: 2, idPosto: 2, titulo: 'Check-up Dentário', descricao: 'Check-up Dentário na cidade de Tomar', data: '2024-07-01', hora: '11:00:00', morada: 'Tomar', estado: true },
  { idArea: 1, idSubarea: 1, idCriador: 3, idAdmin: 3, idPosto: 3, titulo: 'Feira de Saúde', descricao: 'Feira de Saúde na cidade de Fundão', data: '2024-05-01', hora: '12:00:00', morada: 'Fundão', estado: true },

  // Desporto
  { idArea: 2, idSubarea: 3, idCriador: 4, idAdmin: 4, idPosto: 4, titulo: 'Competição de Ginástica', descricao: 'Competição de Ginástica na cidade de Portalegre', data: '2024-03-01', hora: '10:00:00', morada: 'Portalegre', estado: true },
  { idArea: 2, idSubarea: 4, idCriador: 5, idAdmin: 5, idPosto: 5, titulo: 'Atividades ao Ar Livre', descricao: 'Atividades ao Ar Livre na cidade de Vila Real', data: '2024-07-01', hora: '11:00:00', morada: 'Vila Real', estado: true },
  { idArea: 2, idSubarea: 3, idCriador: 1, idAdmin: 2, idPosto: 1, titulo: 'Torneio de Futebol', descricao: 'Torneio de Futebol na cidade de Viseu', data: '2024-05-01', hora: '12:00:00', morada: 'Viseu', estado: true, foto: 'campode7.jpg' },

  // Formação
  { idArea: 3, idSubarea: 5, idCriador: 2, idAdmin: 3, idPosto: 2, titulo: 'Workshop de Programação', descricao: 'Workshop de Programação na cidade de Tomar', data: '2024-03-01', hora: '10:00:00', morada: 'Tomar', estado: true },
  { idArea: 3, idSubarea: 6, idCriador: 3, idAdmin: 4, idPosto: 3, titulo: 'Feira Educacional', descricao: 'Feira Educacional na cidade de Fundão', data: '2024-07-01', hora: '11:00:00', morada: 'Fundão', estado: true },
  { idArea: 3, idSubarea: 5, idCriador: 4, idAdmin: 5, idPosto: 4, titulo: 'Seminário de Educação', descricao: 'Seminário de Educação na cidade de Portalegre', data: '2024-05-01', hora: '12:00:00', morada: 'Portalegre', estado: true },

  // Gastronomia
  { idArea: 4, idSubarea: 7, idCriador: 5, idAdmin: 1, idPosto: 5, titulo: 'Festival de Gastronomia', descricao: 'Festival de Gastronomia na cidade de Vila Real', data: '2024-03-01', hora: '10:00:00', morada: 'Vila Real', estado: true },
  { idArea: 4, idSubarea: 8, idCriador: 1, idAdmin: 2, idPosto: 1, titulo: 'Feira de Vinhos', descricao: 'Venha testar o seu paladar na 24ª Feira de Vinhos da cidade de Viseu. Preparámos uma grande tarde que não pode perder!', data: '2024-07-01', hora: '11:00:00', morada: 'Parque de estacionamento da feira semanal, Viseu', estado: true, foto: 'vinho.jpg'},
  { idArea: 4, idSubarea: 7, idCriador: 2, idAdmin: 3, idPosto: 2, titulo: 'Degustação de Pratos', descricao: 'Degustação de Pratos na cidade de Tomar', data: '2024-05-01', hora: '12:00:00', morada: 'Tomar', estado: true },

  // Alojamento
  { idArea: 5, idSubarea: 9, idCriador: 3, idAdmin: 4, idPosto: 3, titulo: 'Feira de Quartos', descricao: 'Feira de Quartos na cidade de Fundão', data: '2024-03-01', hora: '10:00:00', morada: 'Fundão', estado: true },
  { idArea: 5, idSubarea: 10, idCriador: 4, idAdmin: 5, idPosto: 4, titulo: 'Mostra de Casas para Alugar', descricao: 'Mostra de Casas para Alugar na cidade de Portalegre', data: '2024-07-01', hora: '11:00:00', morada: 'Portalegre', estado: true },
  { idArea: 5, idSubarea: 9, idCriador: 5, idAdmin: 1, idPosto: 5, titulo: 'Exposição de Alojamento', descricao: 'Exposição de Alojamento na cidade de Vila Real', data: '2024-05-01', hora: '12:00:00', morada: 'Vila Real', estado: true },

  // Transportes
  { idArea: 6, idSubarea: 12, idCriador: 2, idAdmin: 3, idPosto: 2, titulo: 'Exposição de Transportes Públicos', descricao: 'Exposição de Transportes Públicos na cidade de Tomar', data: '2024-07-01', hora: '11:00:00', morada: 'Tomar', estado: true },
  { idArea: 6, idSubarea: 11, idCriador: 3, idAdmin: 4, idPosto: 3, titulo: 'Carpooling Meetup', descricao: 'Carpooling Meetup na cidade de Fundão', data: '2024-05-01', hora: '12:00:00', morada: 'Fundão', estado: true },

  // Lazer
  { idArea: 7, idSubarea: 13, idCriador: 4, idAdmin: 5, idPosto: 4, titulo: 'Festival de Cinema', descricao: 'Festival de Cinema na cidade de Portalegre', data: '2024-03-01', hora: '10:00:00', morada: 'Portalegre', estado: true },
  { idArea: 7, idSubarea: 14, idCriador: 5, idAdmin: 1, idPosto: 5, titulo: 'Passeio no Parque', descricao: 'Passeio no Parque na cidade de Vila Real', data: '2024-07-01', hora: '11:00:00', morada: 'Vila Real', estado: true },
  { idArea: 7, idSubarea: 13, idCriador: 1, idAdmin: 2, idPosto: 1, titulo: 'Noite de Cinema ao Ar Livre', descricao: 'Noite de Cinema ao Ar Livre na cidade de Viseu', data: '2024-05-01', hora: '12:00:00', morada: 'Viseu', estado: true, foto: 'cinemaPg.jpg' },
  { idArea: 7, idSubarea: 14, idCriador: 5, idAdmin: 6, idPosto: 1, titulo: 'Verão no Parque', descricao: 'Em contagem decrescente para o verão na Cidade-Jardim, está tudo a postos para mais uma edição de sucesso da iniciativa municipal “Verão no Parque”, que regressa ao Parque Aquilino Ribeiro entre os dias 29 de maio e 28 de julho.', data: '2024-06-25', hora: '12:00:00', morada: 'Parque Aquilino Ribeiro, Viseu', estado: true, foto: 'viseuverao.jpg' },
  { idArea: 7, idSubarea: 14, idCriador: 5, idAdmin: 6, idPosto: 1, titulo: 'Feira de São Mateus', descricao: 'A Feira de São Mateus é a mais antiga feira popular de Portugal, e uma das mais antigas do mundo. Realiza-se anualmente em Viseu, Portugal, desde 1394.', data: '2024-08-08', hora: '12:00:00', morada: 'Pavilhão Multiusos de Viseu, Viseu', estado: true, foto: 'feirasaomateus.jpg' },
];

const estabelecimentos = [
  // Saúde
  {
    idArea: 1,
    idSubarea: 1,
    idCriador: 1,
    idAdmin: 1,
    idPosto: 1,
    nome: 'CUF Viseu',
    descricao: 'O Hospital CUF Viseu é a primeira unidade CUF na zona Centro do país, possibilitando o acesso a serviços de saúde de excelência por parte dos viseenses.\n\nEste hospital disponibiliza a tecnologia mais avançada para poder prestar um serviço de excelência aos seus clientes. Uma resposta global em termos de prestação de cuidados de saúde, incluindo uma gama de equipamentos que permitem responder a todas as necessidades, desde a prevenção, passando pelo diagnóstico e até ao tratamento.',
    morada: 'CUF Viseu, Rua do Belo Horizonte, nº 12 e 14, 3500-612 Viseu',
    estado: true,
    foto: 'cufViseu.jpg',
  },
  {
    idArea: 1,
    idSubarea: 1,
    idCriador: 1,
    idAdmin: 3,
    idPosto: 1,
    nome: 'Clínica Médica Dentária de Viseu',
    descricao: 'Clinica dentária.',
    morada: 'Av. Dr. António José de Almeida nº 267 1ºesq, 3510-047 Viseu',
    estado: true,
    foto: 'clinicaDentaria.jpg',
  },

  {
    idArea: 1,
    idSubarea: 1,
    idCriador: 3,
    idAdmin: 3,
    idPosto: 1,
    nome: 'Hospital São Teotónio',
    descricao: 'Hospital de Viseu, oferecendo serviços de emergência',
    morada: 'Av. Rei Dom Duarte, 3504-509 Viseu',
    estado: true,
    foto: 'saoTeotoneo.jpg',
  },

  // Desporto
  {
    idArea: 2,
    idSubarea: 3,
    idCriador: 3,
    idAdmin: 2,
    idPosto: 1,
    nome: 'FFitness Health Club Viseu',
    descricao: 'O seu espaço de Saúde . Um espaço distinto, Bar, Musculação, Aulas de grupo, Piscina...',
    morada: 'Rua Dr. Nascimento Ferreira, Urbanização Val Rio L. 1, 3510-431 Viseu',
    estado: true,
    foto: 'ffitness.jpg',
  },
  {
    idArea: 2,
    idSubarea: 3,
    idCriador: 3,
    idAdmin: 2,
    idPosto: 1,
    nome: 'Element Gym Repeses',
    descricao: 'A revolução do fitness chegou finalmente a Viseu',
    morada: 'Ginásio Element Viseu',
    estado: true,
    foto: 'element.jpg',
  },

  {
    idArea: 2,
    idSubarea: 4,
    idCriador: 4,
    idAdmin: 1,
    idPosto: 1,
    nome: 'Campo de futebol de 7',
    descricao: 'Campo de futebol',
    morada: 'Av. José Relvas, Viseu',
    estado: true,
    foto: 'campode7.jpg',
  },



  // Formação
  {
    idArea: 3,
    idSubarea: 6,
    idCriador: 5,
    idAdmin: 3,
    idPosto: 1,
    nome: 'Escola Secundária Alves Martins',
    descricao: 'escola em Viseu 7º-12º ano',
    morada: 'Escola Secundária Alves Martins',
    estado: true,
    foto: 'alvesMartins.jpg',
  },

  {
    idArea: 3,
    idSubarea: 5,
    idCriador: 4,
    idAdmin: 1,
    idPosto: 1,
    nome: 'SchoolCenter',
    descricao: 'A SchoolCenter é um Centro de Formação Profissional, localizado em Viseu, que está certificado pela DGERT e oferece inúmeros cursos',
    morada: 'Rua Santa Isabel 2, R/C Direito Repeses, 3500-726 Viseu',
    estado: true,
    foto: 'schoolCenter.jpg',
  },

  {
    idArea: 3,
    idSubarea: 6,
    idCriador: 5,
    idAdmin: 2,
    idPosto: 1,
    nome: 'Escola Superior de Tecnologia e Gestão de Viseu',
    descricao: 'Escola Superior de Tecnologia e Gestão de Viseu',
    morada: 'Av. Cidade Politécnica, Viseu',
    estado: true,
    foto: 'estgv.jpg',
  },





  // Gastronomia

  {
    idArea: 4,
    idSubarea: 7,
    idCriador: 1,
    idAdmin: 3,
    idPosto: 1,
    nome: 'Restaurante Santa Luzia',
    descricao: 'Santa Luzia · Cozinha regional Beirã no seu melhor! · Há mais de 40 anos a marcar a gastronomia da região de Viseu',
    morada: 'Igreja de Moure de Madalena, Estrada Nacional 2, 3515-331 Viseu',
    estado: true,
    foto: 'santaLuzia.jpg',
  },
  {
    idArea: 4,
    idSubarea: 8,
    idCriador: 1,
    idAdmin: 4,
    idPosto: 1,
    nome: 'Palacio do Gelo',
    descricao: 'Inaugurado em 2008, destaca-se pelas suas características arquitetónicas únicas, com mais de 150 lojas, incluindo 30 restaurantes, cafés, pastelarias e gelatarias, 6 salas de cinema, um dos maiores Health Clubs do país e uma Pista de Gelo, aberta todo o ano.',
    morada: 'R. do Palacio do Gelo 3, 3504-526 Viseu',
    estado: true,
    foto: 'PG.jpg',
  },



  // Alojamento


  {
    idArea: 5,
    idSubarea: 10,
    idCriador: 5,
    idAdmin: 5,
    idPosto: 1,
    nome: 'Arrendamento de Apartamento',
    descricao: 'Apartamento T3 , quinta da Ramalhosa, 1.200 €/mês , 157 m² área bruta, com generoso terraço, localizado na Colina Verde, em Viseu.',
    morada: 'Viseu',
    estado: true,
    foto: 'casa1.jpg',
  },



  // Transportes

  {
    idArea: 6,
    idSubarea: 12,
    idCriador: 2,
    idAdmin: 2,
    idPosto: 1,
    nome: 'Central de Camionagem MUV',
    descricao: ' Central de Transportes públicos em Viseu',
    morada: 'Estação Rodoviária de Viseu, Viseu',
    estado: true,
    foto: 'centralViseu.jpg',
  },


  { idArea: 6, idSubarea: 12, idCriador: 2, idAdmin: 3, idPosto: 2, nome: 'Transportes Tomar', descricao: 'Transportes públicos na cidade de Tomar', morada: 'Tomar', estado: true },
  { idArea: 6, idSubarea: 11, idCriador: 3, idAdmin: 4, idPosto: 3, nome: 'Carpooling Fundão', descricao: 'Serviço de carpooling na cidade de Fundão', morada: 'Fundão', estado: true },

  // Lazer

  {
    idArea: 7,
    idSubarea: 13,
    idCriador: 4,
    idAdmin: 5,
    idPosto: 1,
    nome: 'Cinema NOS',
    descricao: 'Cinemas NOS Palácio do Gelo',
    morada: 'Palácio do Gelo, Viseu',
    estado: true,
    foto: 'cinemaPg.jpg',
  },

  {
    idArea: 7,
    idSubarea: 14,
    idCriador: 5,
    idAdmin: 1,
    idPosto: 1,
    nome: 'Parque Da Cidade',
    descricao: 'O Parque Aquilino Ribeiro (também chamado Parque da Cidade de Viseu) é um parque público localizado na cidade de Viseu',
    morada: 'Parque Aquilino Ribeiro,',
    estado: true,
    foto: 'parqueCidade.jpg',
  },
  {
    idArea: 7,
    idSubarea: 14,
    idCriador: 3,
    idAdmin: 5,
    idPosto: 1,
    nome: 'Parque de Santiago',
    descricao: 'Parque urbano na cidade de Viseu, venha e traga a sua famílias para deliciosos piqueniques e passeios!',
    morada: 'Parque de Santiago, Viseu',
    estado: true,
    foto: 'parqueSaoTiago.jpg',
  },
];

const AvaliacoesEstabelecimento = [
  { idUtilizador: 1, idAdmin: 1, idEstabelecimento: 1, classificacao: 5, comentario: 'Serviço bastante rápido e de qualidade, o meu sítio de eleição para todo o tipo de consultas', estado: true },
  { idUtilizador: 2, idAdmin: 2, idEstabelecimento: 1, classificacao: 4, estado: true },
  { idUtilizador: 3, idAdmin: 3, idEstabelecimento: 1, classificacao: 3, estado: true },
  { idUtilizador: 4, idAdmin: 4, idEstabelecimento: 1, classificacao: 2, estado: true },
  { idUtilizador: 5, idAdmin: 5, idEstabelecimento: 1, classificacao: 1, estado: true },
  { idUtilizador: 1, idAdmin: 1, idEstabelecimento: 1, classificacao: 5, estado: true },
  { idUtilizador: 2, idAdmin: 2, idEstabelecimento: 1, classificacao: 4, estado: true },
  { idUtilizador: 6, idAdmin: 1, idEstabelecimento: 1, classificacao: 5, comentario: 'O meu sítio de eleição para cuidar da minha saúde, sempre fui bastante bem recebido', estado: true },

];

// Gerar novas avaliações para estabelecimentos de 2 a 20
for (let estabelecimentoIndex = 2; estabelecimentoIndex <= 18; estabelecimentoIndex++) {
  for (let utilizadorIndex = 1; utilizadorIndex <= 5; utilizadorIndex++) {
    AvaliacoesEstabelecimento.push({
      idUtilizador: utilizadorIndex,
      idAdmin: utilizadorIndex, // Supondo que idAdmin corresponde ao idUtilizador
      idEstabelecimento: estabelecimentoIndex,
      classificacao: Math.floor(Math.random() * 5) + 1, // Gera uma classificação aleatória entre 1 e 5
      estado: true
    });
  }
}


const FotosEvento = [
  { idEvento: 1, foto: 'cufViseu.jpg', idAdmin: 1, idCriador: 1, estado: 1 },
  { idEvento: 21, foto: 'viseuverao.jpg', idAdmin: 1, idCriador: 1, estado: 1 },
  { idEvento: 11, foto: 'vinho.jpg', idAdmin: 1, idCriador: 1, estado: 1 },
  { idEvento: 22, foto: 'feirasaomateus.jpg', idAdmin: 1, idCriador: 1, estado: 1 },
];

const FotosEstabelecimento = [
  { idEstabelecimento: 1, foto: 'cufViseu.jpg', idAdmin: 1, idCriador: 1, estado: 1 },
];

// Avaliações existentes para o evento 1
const AvaliacoesEvento = [
  { idUtilizador: 1, idAdmin: 1, idEvento: 1, classificacao: 5, estado: true },
  { idUtilizador: 2, idAdmin: 2, idEvento: 1, classificacao: 4, estado: true },
  { idUtilizador: 3, idAdmin: 3, idEvento: 1, classificacao: 3, estado: true },
  { idUtilizador: 4, idAdmin: 4, idEvento: 1, classificacao: 2, estado: true },
  { idUtilizador: 5, idAdmin: 5, idEvento: 1, classificacao: 1, estado: true },
  { idUtilizador: 1, idAdmin: 1, idEvento: 1, classificacao: 5, estado: true },
  { idUtilizador: 2, idAdmin: 2, idEvento: 1, classificacao: 4, estado: true },
  { idUtilizador: 6, idAdmin: 1, idEvento: 21, classificacao: 5, comentario: 'Perfeito para levar a família e amigos, especialmente com este calor que temos sentido nos últimos dias', estado: true },
];

// Gerar novas avaliações para eventos de 2 a 20
for (let eventoIndex = 2; eventoIndex <= 22; eventoIndex++) {
  for (let utilizadorIndex = 1; utilizadorIndex <= 5; utilizadorIndex++) {
    AvaliacoesEvento.push({
      idUtilizador: utilizadorIndex,
      idAdmin: utilizadorIndex, // Supondo que idAdmin corresponde ao idUtilizador
      idEvento: eventoIndex,
      classificacao: Math.floor(Math.random() * 5) + 1, // Gera uma classificação aleatória entre 1 e 5
      estado: true
    });
  }
}

const Inscricoes = [];

for (let eventoIndex = 1; eventoIndex <= 22; eventoIndex++) {
  for (let utilizadorIndex = 1; utilizadorIndex <= 6; utilizadorIndex++) {
    Inscricoes.push({
      idUtilizador: utilizadorIndex,
      idEvento: eventoIndex,
      estado: true,
    });
  }
}

const Notificacoes = [
  { idUtilizador: 6, titulo: "Nova avaliação!", descricao: 'Tem uma nova avaliação no evento "Campanha de Saúde"', estado: false },
  { idUtilizador: 6, titulo: "Nova inscrição no seu evento!", descricao: 'Tem uma nova inscrição no evento "Campanha de Saúde"', estado: true },
  { idUtilizador: 6, titulo: "Quase a chegar!", descricao: 'Falta menos de uma semana para "Campanha de Saúde"!', estado: false },
]

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
      return AvaliacaoEstabelecimento.bulkCreate(AvaliacoesEstabelecimento);
    })
    .then(() => {
      return AvaliacaoEvento.bulkCreate(AvaliacoesEvento);
    })
    .then(() => {
      return FotoEvento.bulkCreate(FotosEvento);
    })
    .then(() => {
      return FotoEstabelecimento.bulkCreate(FotosEstabelecimento);
    })
    .then(() => {
      return Inscricao.bulkCreate(Inscricoes);
    })
    .then(() => {
      return Notificacao.bulkCreate(Notificacoes);
    })
    .catch((error) => {
      console.error('Erro ao carregar tabelas:', error);
    });
}

module.exports = carregarTabelas;
