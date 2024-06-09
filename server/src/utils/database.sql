-- ================================
-- Tabela: Posto
-- ================================
CREATE TABLE Posto (
    id INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(255) NOT NULL
);

-- ================================
-- Tabela: Area
-- ================================
CREATE TABLE Area (
    id INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(255)
);

-- ================================
-- Tabela: Utilizador
-- ================================
CREATE TABLE Utilizador (
    id INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(255),
    nif VARCHAR(255),
    localidade VARCHAR(255),
    telemovel VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    palavra_passe VARCHAR(255),
    estado BIT DEFAULT 0,
    foto VARCHAR(255),
    id_google VARCHAR(255),
    id_facebook VARCHAR(255),
    cargo VARCHAR(255),
    isAdmin BIT DEFAULT 0,
    isPrimeiroLogin BIT DEFAULT 1,
    verificationToken VARCHAR(255),
    recoveryToken VARCHAR(255),
    adminId INT FOREIGN KEY REFERENCES Utilizador(id),
    idPosto INT FOREIGN KEY REFERENCES Posto(id)
);

-- ================================
-- Tabela: Subarea
-- ================================
CREATE TABLE Subarea (
    id INT PRIMARY KEY IDENTITY(1,1),
    idArea INT NOT NULL FOREIGN KEY REFERENCES Area(id),
    nome VARCHAR(255) NOT NULL
);

-- ================================
-- Tabela: Evento
-- ================================
CREATE TABLE Evento (
    id INT PRIMARY KEY IDENTITY(1,1),
    idArea INT NOT NULL FOREIGN KEY REFERENCES Area(id),
    idSubarea INT NOT NULL FOREIGN KEY REFERENCES Subarea(id),
    idCriador INT NOT NULL FOREIGN KEY REFERENCES Utilizador(id),
    idAdmin INT FOREIGN KEY REFERENCES Utilizador(id),
    idPosto INT NOT NULL FOREIGN KEY REFERENCES Posto(id),
    titulo VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    morada VARCHAR(255) NOT NULL,
    estado BIT DEFAULT 0,
    foto VARCHAR(255)
);

-- ================================
-- Tabela: Estabelecimento
-- ================================
CREATE TABLE Estabelecimento (
    id INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(255) NOT NULL,
    idArea INT NOT NULL FOREIGN KEY REFERENCES Area(id),
    idSubarea INT NOT NULL FOREIGN KEY REFERENCES Subarea(id),
    idPosto INT NOT NULL FOREIGN KEY REFERENCES Posto(id),
    morada VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    foto VARCHAR(255),
    idAdmin INT FOREIGN KEY REFERENCES Utilizador(id),
    idCriador INT NOT NULL FOREIGN KEY REFERENCES Utilizador(id),
    estado BIT DEFAULT 0
);

-- ================================
-- Tabela: AvaliacaoEstabelecimento
-- ================================
CREATE TABLE AvaliacaoEstabelecimento (
    id INT PRIMARY KEY IDENTITY(1,1),
    idUtilizador INT NOT NULL FOREIGN KEY REFERENCES Utilizador(id),
    idAdmin INT FOREIGN KEY REFERENCES Utilizador(id),
    idEstabelecimento INT NOT NULL FOREIGN KEY REFERENCES Estabelecimento(id),
    classificacao INT NOT NULL
);

-- ================================
-- Tabela: Inscricao
-- ================================
CREATE TABLE Inscricao (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idEvento INT NOT NULL,
    idUtilizador INT NOT NULL,
    data DATETIME DEFAULT GETDATE(),
    estado BIT DEFAULT 0,
    FOREIGN KEY (idEvento) REFERENCES Evento(id),
    FOREIGN KEY (idUtilizador) REFERENCES Utilizador(id)
);

-- ================================
-- Tabela: AvaliacaoEvento
-- ================================
CREATE TABLE AvaliacaoEvento (
    id INT PRIMARY KEY IDENTITY(1,1),
    idUtilizador INT NOT NULL FOREIGN KEY REFERENCES Utilizador(id),
    idAdmin INT FOREIGN KEY REFERENCES Utilizador(id),
    idEvento INT NOT NULL FOREIGN KEY REFERENCES Evento(id),
    comentario VARCHAR(MAX)
);

-- ================================
-- Tabela: FotoEstabelecimento
-- ================================
CREATE TABLE FotoEstabelecimento (
    id INT PRIMARY KEY IDENTITY(1,1),
    idEstabelecimento INT NOT NULL FOREIGN KEY REFERENCES Estabelecimento(id),
    idCriador INT NOT NULL FOREIGN KEY REFERENCES Utilizador(id),
    idAdmin INT FOREIGN KEY REFERENCES Utilizador(id),
    foto VARCHAR(MAX) NOT NULL
);

-- ================================
-- Tabela: FotoEvento
-- ================================
CREATE TABLE FotoEvento (
    id INT PRIMARY KEY IDENTITY(1,1),
    idEvento INT NOT NULL FOREIGN KEY REFERENCES Evento(id),
    idCriador INT NOT NULL FOREIGN KEY REFERENCES Utilizador(id),
    idAdmin INT FOREIGN KEY REFERENCES Utilizador(id),
    foto VARCHAR(MAX) NOT NULL
);

-- ================================
-- Tabela: Denuncia
-- ================================
CREATE TABLE Denuncia (
    id INT PRIMARY KEY IDENTITY(1,1),
    idCriador INT NOT NULL FOREIGN KEY REFERENCES Utilizador(id),
    idAvaliacaoEvento INT NOT NULL FOREIGN KEY REFERENCES AvaliacaoEvento(id),
    idAdmin INT FOREIGN KEY REFERENCES Utilizador(id),
    estado BIT DEFAULT 0
);

-- ================================
-- Tabela: Preferencia
-- ================================
CREATE TABLE Preferencia (
    id INT PRIMARY KEY IDENTITY(1,1),
    idUtilizador INT NOT NULL FOREIGN KEY REFERENCES Utilizador(id),
    idArea INT FOREIGN KEY REFERENCES Area(id),
    idSubarea INT FOREIGN KEY REFERENCES Subarea(id),
    CONSTRAINT UC_Preferencia UNIQUE (idUtilizador, idArea, idSubarea)
);

-- ================================
-- Tabela: Notificacao
-- ================================
CREATE TABLE Notificacao (
    id INT PRIMARY KEY IDENTITY(1,1),
    idUtilizador INT NOT NULL FOREIGN KEY REFERENCES Utilizador(id),
    mensagem VARCHAR(255) NOT NULL,
    data DATETIME DEFAULT GETDATE(),
    estado BIT DEFAULT 0
);

-- Apagar tabelas
DROP TABLE IF EXISTS Denuncia;
DROP TABLE IF EXISTS FotoEvento;
DROP TABLE IF EXISTS FotoEstabelecimento;
DROP TABLE IF EXISTS AvaliacaoEvento;
DROP TABLE IF EXISTS Inscricao;
DROP TABLE IF EXISTS AvaliacaoEstabelecimento;
DROP TABLE IF EXISTS Estabelecimento;
DROP TABLE IF EXISTS Evento;
DROP TABLE IF EXISTS Subarea;
DROP TABLE IF EXISTS Utilizador;
DROP TABLE IF EXISTS Area;
DROP TABLE IF EXISTS Posto;
DROP TABLE IF EXISTS Preferencia;
DROP TABLE IF EXISTS Notificacao;