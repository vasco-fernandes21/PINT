-- Inserção de dados na tabela Posto
INSERT INTO Posto (nome) VALUES 
('Viseu'),
('Tomar'),
('Fundão'),
('Portalegre'),
('Vila Real');

-- Inserção de dados na tabela Utilizador
INSERT INTO Utilizador (nome, nif, localidade, telemovel, email, estado, isAdmin, cargo, idPosto) VALUES
('Artur Oliveira', '123456789', 'Viseu', '912345678', 'artur@email.com', 0, 1, 'Lider de Marketing', 1),
('Vasco Fernandes', '987654321', 'Porto', '987654321', 'vasco@email.com', 1, 0, 'IT', 2),
('Pedro Figueiredo', '123456789', 'Viseu', '912345678', 'pedro@email.com', 0, 0, 'Marketing', 1),
('Mateus Vasconcelos', '987654321', 'Viseu', '987654321', 'mateus@email.com', 1, 0, 'Gestor de Dados', 1),
('Simão Ramos', '123456789', 'Viseu', '912345678', 'simao@email.com', 0, 0, 'Gestor de Dados', 1);

-- Inserção de dados na tabela Area
INSERT INTO Area (nome) VALUES 
('Saúde'),
('Desporto'),
('Formação'),
('Gastronomia'),
('Alojamento'),
('Transportes'),
('Lazer');

-- Inserção de dados na tabela Subarea
INSERT INTO Subarea (idArea, nome) VALUES 
(1, 'Clinicas medicas e hospitais'),
(1, 'Clinicas dentárias'),
(2, 'Ginásios'),
(2, 'Atividades ao Ar Livre'),
(3, 'Centros de Formação'),
(3, 'Escolas'),
(4, 'Restaurantes'),
(4, 'Shoppings'),
(5, 'Quartos para arrendar'),
(5, 'Casas para alugar'),
(6, 'Boleias'),
(6, 'Transportes públicos'),
(7, 'Cinema'),
(7, 'Parques');

-- Inserção de dados na tabela Evento
INSERT INTO Evento (idArea, idSubarea, idCriador, idAdmin, idPosto, titulo, descricao, data, hora, morada, estado) VALUES
(1, 1, 1, 1, 1, 'Campanha de Saúde', 'Campanha de Saúde na cidade de Viseu', '2024-03-01', '10:00:00', 'Viseu', 1),
(1, 2, 2, 2, 2, 'Check-up Dentário', 'Check-up Dentário na cidade de Tomar', '2024-04-01', '11:00:00', 'Tomar', 1),
(1, 1, 3, 3, 3, 'Feira de Saúde', 'Feira de Saúde na cidade de Fundão', '2024-05-01', '12:00:00', 'Fundão', 1),
(2, 3, 4, 4, 4, 'Competição de Ginástica', 'Competição de Ginástica na cidade de Portalegre', '2024-03-01', '10:00:00', 'Portalegre', 1),
(2, 4, 5, 5, 5, 'Atividades ao Ar Livre', 'Atividades ao Ar Livre na cidade de Vila Real', '2024-04-01', '11:00:00', 'Vila Real', 1),
(2, 3, 1, 2, 1, 'Torneio de Futebol', 'Torneio de Futebol na cidade de Viseu', '2024-05-01', '12:00:00', 'Viseu', 1),
(3, 5, 2, 3, 2, 'Workshop de Programação', 'Workshop de Programação na cidade de Tomar', '2024-03-01', '10:00:00', 'Tomar', 1),
(3, 6, 3, 4, 3, 'Feira Educacional', 'Feira Educacional na cidade de Fundão', '2024-04-01', '11:00:00', 'Fundão', 1),
(3, 5, 4, 5, 4, 'Seminário de Educação', 'Seminário de Educação na cidade de Portalegre', '2024-05-01', '12:00:00', 'Portalegre', 1),
(4, 7, 5, 1, 5, 'Festival de Gastronomia', 'Festival de Gastronomia na cidade de Vila Real', '2024-03-01', '10:00:00', 'Vila Real', 1),
(4, 8, 1, 2, 1, 'Feira de Shoppings', 'Feira de Shoppings na cidade de Viseu', '2024-04-01', '11:00:00', 'Viseu', 1),
(4, 7, 2, 3, 2, 'Degustação de Pratos', 'Degustação de Pratos na cidade de Tomar', '2024-05-01', '12:00:00', 'Tomar', 1),
(5, 9, 3, 4, 3, 'Feira de Quartos', 'Feira de Quartos na cidade de Fundão', '2024-03-01', '10:00:00', 'Fundão', 1),
(5, 10, 4, 5, 4, 'Mostra de Casas para Alugar', 'Mostra de Casas para Alugar na cidade de Portalegre', '2024-04-01', '11:00:00', 'Portalegre', 1),
(5, 9, 5, 1, 5, 'Exposição de Alojamento', 'Exposição de Alojamento na cidade de Vila Real', '2024-05-01', '12:00:00', 'Vila Real', 1),
(6, 11, 1, 2, 1, 'Feira de Boleias', 'Feira de Boleias na cidade de Viseu', '2024-03-01', '10:00:00', 'Viseu', 1),
(6, 12, 2, 3, 2, 'Exposição de Transportes Públicos', 'Exposição de Transportes Públicos na cidade de Tomar', '2024-04-01', '11:00:00', 'Tomar', 1),
(6, 11, 3, 4, 3, 'Carpooling Meetup', 'Carpooling Meetup na cidade de Fundão', '2024-05-01', '12:00:00', 'Fundão', 1),
(7, 13, 4, 5, 4, 'Festival de Cinema', 'Festival de Cinema na cidade de Portalegre', '2024-03-01', '10:00:00', 'Portalegre', 1),
(7, 14, 5, 1, 5, 'Passeio no Parque', 'Passeio no Parque na cidade de Vila Real', '2024-04-01', '11:00:00', 'Vila Real', 1),
(7, 13, 1, 2, 1, 'Noite de Cinema ao Ar Livre', 'Noite de Cinema ao Ar Livre na cidade de Viseu', '2024-05-01', '12:00:00', 'Viseu', 1);

-- Inserção de dados na tabela Estabelecimento
INSERT INTO Estabelecimento (idArea, idSubarea, idCriador, idAdmin, idPosto, nome, descricao, morada, estado, foto) VALUES
(1, 1, 1, 1, 1, 'Clínica de Viseu', 'Clínica de Viseu, especializada em várias áreas médicas', 'Viseu', 1, 'foto-1717335916152-hospital.jpg'),
(1, 2, 2, 2, 2, 'Clínica Dentária Tomar', 'Clínica Dentária Tomar, com atendimento especializado', 'Tomar', 1, NULL),
(1, 1, 3, 3, 3, 'Hospital do Fundão', 'Hospital do Fundão, oferecendo serviços de emergência', 'Fundão', 1, NULL),
(2, 3, 4, 4, 4, 'Ginásio Portalegre', 'Ginásio Portalegre, equipado com as melhores máquinas', 'Portalegre', 1, NULL),
(2, 4, 5, 5, 5, 'Centro de Atividades Vila Real', 'Centro de Atividades ao Ar Livre em Vila Real', 'Vila Real', 1, NULL),
(2, 3, 1, 2, 1, 'Ginásio de Viseu', 'Ginásio de Viseu, com aulas de fitness e musculação', 'Viseu', 1, NULL),
(3, 5, 2, 3, 2, 'Centro de Formação Tomar', 'Centro de Formação Tomar, oferecendo cursos variados', 'Tomar', 1, NULL),
(3, 6, 3, 4, 3, 'Escola do Fundão', 'Escola do Fundão, com ensino de qualidade', 'Fundão', 1, NULL),
(3, 5, 4, 5, 4, 'Instituto de Educação Portalegre', 'Instituto de Educação Portalegre, referência na região', 'Portalegre', 1, NULL),
(4, 7, 5, 1, 5, 'Restaurante Vila Real', 'Restaurante Vila Real, com pratos típicos da região', 'Vila Real', 1, NULL),
(4, 8, 1, 2, 1, 'Shopping Viseu', 'Shopping Viseu, com lojas de várias marcas', 'Viseu', 1, NULL),
(4, 7, 2, 3, 2, 'Restaurante Tomar', 'Restaurante Tomar, especializado em gastronomia local', 'Tomar', 1, NULL),
(5, 9, 3, 4, 3, 'Aluguel de Quartos Fundão', 'Aluguel de Quartos na cidade de Fundão', 'Fundão', 1, NULL),
(5, 10, 4, 5, 4, 'Casas para Alugar Portalegre', 'Casas para Alugar na cidade de Portalegre', 'Portalegre', 1, NULL),
(5, 9, 5, 1, 5, 'Quartos para Arrendar Vila Real', 'Quartos para Arrendar em Vila Real', 'Vila Real', 1, NULL),
(6, 11, 1, 2, 1, 'Boleias Viseu', 'Boleias na cidade de Viseu', 'Viseu', 1, NULL),
(6, 12, 2, 3, 2, 'Transportes Públicos Tomar', 'Serviço de Transportes Públicos em Tomar', 'Tomar', 1, NULL),
(6, 11, 3, 4, 3, 'Carpooling Fundão', 'Carpooling na cidade de Fundão', 'Fundão', 1, NULL),
(7, 13, 4, 5, 4, 'Cinema Portalegre', 'Cinema na cidade de Portalegre', 'Portalegre', 1, NULL),
(7, 14, 5, 1, 5, 'Parque de Vila Real', 'Parque para lazer em Vila Real', 'Vila Real', 1, NULL),
(7, 13, 1, 2, 1, 'Cinema ao Ar Livre Viseu', 'Cinema ao Ar Livre na cidade de Viseu', 'Viseu', 1, NULL);


-- Inserir dados na tabela Preferencia
INSERT INTO Preferencia (idUtilizador, idArea, idSubarea)
VALUES
    (1, 1, 1),  -- Utilizador 1 prefere eventos na área 1, subárea 1
    (2, 1, 1),  -- Utilizador 2 prefere eventos na área 1, subárea 1
    (3, 2, 2),  -- Utilizador 3 prefere eventos na área 2, subárea 2
    (4, 3, 3),  -- Utilizador 4 prefere eventos na área 3, subárea 3
    (5, 1, 2);  -- Utilizador 5 prefere eventos na área 1, subárea 2
GO
