-- Criação da tabela de áreas de atuação
CREATE TABLE TABELA_AREA (
    ID_AREA INT PRIMARY KEY,
    NOME_AREA VARCHAR(255) NOT NULL
);

-- Criação da tabela de utilizadores
CREATE TABLE TABELA_UTILIZADOR (
    ID_UTILIZADOR INT PRIMARY KEY IDENTITY(1,1),
    NOME VARCHAR(255),
    NIF VARCHAR(20),
    LOCALIDADE VARCHAR(255),
    TELEMOVEL VARCHAR(20),
    EMAIL VARCHAR(255) UNIQUE,
    PALAVRA_PASSE VARCHAR(255),
    ESTADO BOOLEAN DEFAULT 0,
    ID_GOOGLE VARCHAR(255),
    TOKEN_GOOGLE VARCHAR(255),
    ID_FACEBOOK VARCHAR(255),
    TOKEN_FACEBOOK VARCHAR(255),
    CARGO VARCHAR(255),
    TIPO_UTILIZADOR BIT DEFAULT 0,
    AREAS_INTERESSE VARCHAR(MAX)
);

-- Criação da tabela de administradores
CREATE TABLE TABELA_ADMIN (
    ID_ADMIN INT PRIMARY KEY,
    ID_UTILIZADOR INT FOREIGN KEY REFERENCES TABELA_UTILIZADOR(ID_UTILIZADOR)
);

-- Criação da tabela de colaboradores
CREATE TABLE TABELA_COLABORADOR (
    ID_COLAB INT PRIMARY KEY,
    ID_ADMIN INT FOREIGN KEY REFERENCES TABELA_ADMIN(ID_ADMIN),
    ID_UTILIZADOR INT FOREIGN KEY REFERENCES TABELA_UTILIZADOR(ID_UTILIZADOR)
);

-- Criação da tabela de subáreas
CREATE TABLE TABELA_SUBAREA (
    ID_SUBAREA INT PRIMARY KEY,
    ID_AREA INT FOREIGN KEY REFERENCES TABELA_AREA(ID_AREA),
    NOME_SUBAREA VARCHAR(255) NOT NULL
);


-- Criação da tabela de eventos
CREATE TABLE TABELA_EVENTO (
    ID_EVENTO INT PRIMARY KEY,
    ID_AREA INT FOREIGN KEY REFERENCES TABELA_AREA(ID_AREA),
    ID_SUBAREA INT FOREIGN KEY REFERENCES TABELA_SUBAREA(ID_SUBAREA),
    ID_COLAB INT FOREIGN KEY REFERENCES TABELA_COLABORADOR(ID_COLAB),
    TITULO_EVENTO VARCHAR(255) NOT NULL,
    DESCRICAO_EVENTO TEXT NOT NULL,
    DATA_EVENTO DATE NOT NULL,
    ID_ADMIN INT FOREIGN KEY REFERENCES TABELA_ADMIN(ID_ADMIN)
);

-- Criação da tabela de fóruns
CREATE TABLE TABELA_FORUM (
    ID_FORUM INT PRIMARY KEY,
    ID_EVENTO INT FOREIGN KEY REFERENCES TABELA_EVENTO(ID_EVENTO),
    TITULO_FORUM VARCHAR(255) NOT NULL,
    DESCRICAO_FORUM TEXT NOT NULL
);

-- Criação da tabela de comentários de eventos
CREATE TABLE TABELA_COMENTARIO (
    ID_COMENTARIO SERIAL PRIMARY KEY,
    ID_FORUM INT REFERENCES TABELA_FORUM(ID_FORUM),
    ID_UTILIZADOR INT REFERENCES TABELA_UTILIZADOR(ID_UTILIZADOR),
    TEXTO_COMENTARIO TEXT NOT NULL,
    DATA_COMENTARIO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ID_ADMIN INT FOREIGN KEY REFERENCES TABELA_ADMIN(ID_ADMIN)
);

-- Criação da tabela de inscrições em eventos
CREATE TABLE TABELA_INSCRICAO_EVENTO (
    ID_INSCRICAO SERIAL PRIMARY KEY,
    ID_EVENTO INT REFERENCES TABELA_EVENTO(ID_EVENTO),
    ID_UTILIZADOR INT REFERENCES TABELA_UTILIZADOR(ID_UTILIZADOR),
    DATA_INSCRICAO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ESTADO_INSCRICAO VARCHAR(255) NOT NULL
);


-- Criação da tabela de classificações de eventos
CREATE TABLE TABELA_CLASSIFICACAO_EVENTO (
    ID_CLASSIFICACAO SERIAL PRIMARY KEY,
    ID_EVENTO INT REFERENCES TABELA_EVENTO(ID_EVENTO),
    ID_UTILIZADOR INT REFERENCES TABELA_UTILIZADOR(ID_UTILIZADOR),
    CLASSIFICACAO INT CHECK (CLASSIFICACAO > 0 AND CLASSIFICACAO <= 5) NOT NULL,
    DATA_CLASSIFICACAO TIMESTAMP NOT NULL
);


-- Criação da tabela de formulários
CREATE TABLE TABELA_FORMULARIO (
    ID_FORMULARIO INT PRIMARY KEY,
    TITULO_FORMULARIO VARCHAR(255) NOT NULL,
    ID_EVENTO INT FOREIGN KEY REFERENCES TABELA_EVENTO(ID_EVENTO),
    DESCRICAO_FORMULARIO TEXT NOT NULL,
    DATA_CRIACAO DATE NOT NULL,
    ESTADO BOOLEAN DEFAULT 0
);

-- Criação da tabela de perguntas
CREATE TABLE TABELA_PERGUNTA (
    ID_PERGUNTA INT PRIMARY KEY,
    ID_FORMULARIO INT FOREIGN KEY REFERENCES TABELA_FORMULARIO(ID_FORMULARIO),
    TIPO_PERGUNTA VARCHAR(20) NOT NULL,
    TEXTO_PERGUNTA VARCHAR(255) NOT NULL,
    ORDEM_PERGUNTA INT NOT NULL
);

-- Criação da tabela de respostas
CREATE TABLE TABELA_RESPOSTA (
    ID_RESPOSTA INT PRIMARY KEY,
    ID_PERGUNTA INT FOREIGN KEY REFERENCES TABELA_PERGUNTA(ID_PERGUNTA),
    ID_INSCRICAO INT FOREIGN KEY REFERENCES TABELA_INSCRICAO_ATIVIDADE(ID_INSCRICAO),
    TEXTO_RESPOSTA TEXT
);

-- Criação da tabela de opções de resposta
CREATE TABLE TABELA_OPCAO_RESPOSTA (
    ID_OPCAO INT PRIMARY KEY,
    ID_PERGUNTA INT FOREIGN KEY REFERENCES TABELA_PERGUNTA(ID_PERGUNTA),
    TEXTO_OPCAO VARCHAR(255) NOT NULL,
    ORDEM_OPCAO INT NOT NULL
);

-- Criação da tabela de álbuns
CREATE TABLE TABELA_ALBUM (
  ID_ALBUM INT PRIMARY KEY,
  ID_EVENTO INT FOREIGN KEY REFERENCES TABELA_EVENTO(ID_EVENTO),
  TITULO_ALBUM VARCHAR(255) NOT NULL,
  DESCRICAO_ALBUM TEXT NOT NULL,
  DATA_CRIACAO DATE NOT NULL
);

-- Criação da tabela de fotos
CREATE TABLE TABELA_FOTO (
  ID_FOTO INT PRIMARY KEY,
  ID_ALBUM INT FOREIGN KEY REFERENCES TABELA_ALBUM(ID_ALBUM),
  ID_UTILIZADOR INT FOREIGN KEY REFERENCES TABELA_UTILIZADOR(ID_UTILIZADOR),
  TITULO_FOTO VARCHAR(255) NOT NULL,
  DESCRICAO_FOTO TEXT NOT NULL,
  DATA_UPLOAD DATE NOT NULL
);




