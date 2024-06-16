-- Inner Join para obter o nome do utilizador, o nome do posto e o título do evento
-- Esta consulta é útil para apresentar informações detalhadas sobre eventos associados a utilizadores e os respetivos postos.
SELECT 
    U.nome AS NomeUtilizador, 
    P.nome AS NomePosto,
    E.titulo AS Evento
FROM 
    Utilizador U
INNER JOIN 
    Posto P ON U.idPosto = P.id
INNER JOIN 
    Evento E ON U.id = E.idCriador;

-- Left Join para obter o nome do estabelecimento, a área e a subárea
-- Esta consulta é útil para listar os estabelecimentos juntamente com as respetivas áreas e subáreas, mesmo que algumas delas possam estar em falta.
SELECT 
    E.nome AS Estabelecimento, 
    A.nome AS Area, 
    S.nome AS SubArea
FROM 
    Estabelecimento E
LEFT JOIN 
    Area A ON E.idArea = A.id
LEFT JOIN 
    Subarea S ON E.idSubarea = S.id;

-- União de Tabelas para obter uma lista de contactos de utilizadores e estabelecimentos
-- Esta consulta é útil para agregar informações de contactos de utilizadores e estabelecimentos numa única lista.
SELECT 
    nome AS Nome, 
    email AS Contato 
FROM 
    Utilizador
UNION
SELECT 
    nome AS Nome, 
    morada AS Contato 
FROM 
    Estabelecimento;

-- Agrupamento e sumário de dados com cláusula HAVING para filtrar os postos com mais de um utilizador
-- Esta consulta é útil para identificar os postos que possuem mais de um utilizador associado.
SELECT 
    idPosto, 
    COUNT(id) AS NumeroUtilizadores
FROM 
    Utilizador
GROUP BY 
    idPosto
HAVING 
    COUNT(id) > 1;

-- Funções de agregação para calcular estatísticas de eventos por área
-- Esta consulta é útil para calcular o número de eventos, a data do evento mais recente e a data do evento mais antigo por área.
SELECT
    A.nome,
    COUNT(E.id) AS NumeroEventos,
    MAX(E.data) AS DataEventoMaisRecente,
    MIN(E.data) AS DataEventoMaisAntigo
FROM
    Evento E
INNER JOIN
    Area A ON E.idArea = A.id
GROUP BY
    A.nome;

