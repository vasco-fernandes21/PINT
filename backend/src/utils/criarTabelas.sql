-- Inserindo registros na tabela TABELA_POSTO
INSERT INTO TABELA_POSTO (NOME_POSTO) VALUES 
('Viseu'),
('Tomar'),
('Fundão'),
('Portalegre'),
('Vila Real'),


-- Inserindo registros na tabela TABELA_AREA
INSERT INTO TABELA_AREA (NOME_AREA) VALUES 
('Saúde'),
('Desporto'),
('Formação'),
('Gastronomia'),
('Habitação/Alojamento'),
('Transportes'),
('Lazer'),
('Tecnologia'),
('Arte'),
('Negócios');

-- Inserindo registros na tabela TABELA_SUBAREA
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (1, 'Clinicas medicas e hospitais');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (1, 'Clinicas dentárias');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (2, 'Ginásios');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (2, 'Atividades ao Ar Livre');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (3, 'Centros de Formação');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (3, 'Escolas');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (4, 'Restaurantes');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (4, 'Shoppings');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (5, 'Quartos para arrendar');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (5, 'Casas para alugar');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (6, 'Boleias');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (6, 'Transportes públicos');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (7, 'Cinema');
INSERT INTO TABELA_SUBAREA (ID_AREA, NOME_SUBAREA) VALUES (7, 'Parques');


-- Inserindo registros na tabela TABELA_UTILIZADOR
INSERT INTO TABELA_UTILIZADOR (NOME, NIF, ID_POSTO, TELEMOVEL, EMAIL, PALAVRA_PASSE, CARGO) 
VALUES 
('Maria Sousa', '987654321', 3, '912345678', 'maria@email.com', 'passe789', 'Funcionário'),
('José Silva', '123456789', 1, '923456789', 'jose@email.com', 'passe456', 'Gerente'),
('Carlos Santos', '543216789', 5, '934567890', 'carlos@email.com', 'passe321', 'Funcionário'),
('Sofia Oliveira', '456789123', 2, '945678901', 'sofia@email.com', 'passe654', 'Gerente'),
('Rita Pereira', '321654987', 4, '956789012', 'rita@email.com', 'passe987', 'Funcionário'),
('André Fernandes', '654789321', 1, '967890123', 'andre@email.com', 'passe210', 'Gerente'),
('Marta Lopes', '987123654', 3, '978901234', 'marta@email.com', 'passe543', 'Funcionário'),
('Hugo Costa', '456321789', 2, '989012345', 'hugo@email.com', 'passe876', 'Gerente'),
('Ana Santos', '789123456', 4, '990123456', 'ana@email.com', 'passe109', 'Funcionário'),
('Pedro Pereira', '321789654', 5, '901234567', 'pedro@email.com', 'passe432', 'Gerente');

-- Inserindo registros na tabela TABELA_EVENTO
INSERT INTO TABELA_EVENTO (ID_AREA, ID_SUBAREA, ID_COLAB, ID_POSTO, TITULO_EVENTO, DESCRICAO_EVENTO, DATA_EVENTO, LOCALIZACAO, ID_ADMIN) 
VALUES 
(1, 1, 1, 1, 'Maratona de Saúde', 'Maratona de Saúde na cidade de Viseu', '2022-03-01', 'Viseu', 1),
(1, 2, 2, 2, 'Feira de Saúde', 'Feira de Saúde na cidade de Tomar', '2022-04-01', 'Tomar', 2),
(2, 3, 3, 3, 'Torneio de Futebol', 'Torneio de Futebol na cidade de Fundão', '2022-05-01', 'Fundão', 3),
(2, 4, 4, 4, 'Corrida de Bicicleta', 'Corrida de Bicicleta na cidade de Portalegre', '2022-06-01', 'Portalegre', 4),
(3, 5, 5, 5, 'Workshop de Programação', 'Workshop de Programação na cidade de Vila Real', '2022-07-01', 'Vila Real', 5);

INSERT INTO TABELA_ADMIN (ID_ADMIN, ID_UTILIZADOR) VALUES
(1, 1),
(2, 6),
(3, 5);

INSERT INTO TABELA_COLABORADOR (ID_COLAB, ID_ADMIN, ID_UTILIZADOR) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5);

INSERT INTO Estabelecimentos (NOME, ID_AREA, ID_SUBAREA, ID_POSTO, LOCALIZACAO, DESCRICAO) VALUES
(
  'Restaurante A Tasquinha', 4, 4, 1, 'Rua da Liberdade, 123 - Viseu', 'Restaurante tradicional com pratos portugueses deliciosos.'),
  ('Padaria do Sr. Manuel', 4, 4, 5, 'Avenida dos Combatentes, 456 - Tomar', 'Padaria artesanal com pães frescos e bolos caseiros.'),
  ('Clínica Médica Dr. Silva', 1, 1, 3, 'Rua Central, 789 - Fundão', 'Clínica médica com atendimento geral e especialidades.'),
  ('Loja de Desporto Sport Life', 2, 2, 2, 'Centro Comercial ABC, Loja 10 - Portalegre', 'Loja de artigos esportivos com as melhores marcas.'),
  ('Escola de Informática TecnoStart', 3, 5, 4, 'Praça da República, 234 - Vila Real', 'Cursos de informática para todos os níveis e públicos.'),
  ('Hotel Sol Nascente', 5, 5, 1, 'Rua da Praia, 567 - Viseu', 'Hotel com vista para o mar e piscina ao ar livre.'),
  ('Táxi Rápido', 6, 6, 5, 'Rua das Flores, 890 - Tomar', 'Serviço de táxi rápido e confiável.'),
  ('Cinema Sétimo Art', 7, 7, 2, 'Avenida da Liberdade, 321 - Fundão', 'Cinema com programação diversificada e preços acessíveis.'),
  ('Museu de História Local', 9, 9, 3, 'Praça da Matriz, 123 - Portalegre', 'Museu com acervo sobre a história da região.'),
  ('Livraria Bertrand', 10, 10, 4, 'Rua dos Livros, 456 - Vila Real', 'Livraria com grande variedade de livros e outros produtos culturais.')
);


