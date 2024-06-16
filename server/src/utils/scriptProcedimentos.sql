-- ================================
-- Procedimento Armazenado: NotificarUtilizadoresPorPreferencias
-- Este procedimento notifica utilizadores com base nas suas preferências
-- quando um novo evento é criado.
-- ================================
CREATE PROCEDURE NotificarUtilizadoresPorPreferencias
    @idEvento INT
AS
BEGIN
    DECLARE @idArea INT, @idSubarea INT, @mensagem VARCHAR(255)

    -- Obter a área e subárea do evento
    SELECT @idArea = idArea, @idSubarea = idSubarea
    FROM Evento
    WHERE id = @idEvento

    -- Mensagem de notificação
    SELECT @mensagem = 'Novo evento na sua área de interesse!'

    -- Inserir notificações para utilizadores que têm preferência por essa área e subárea
    INSERT INTO Notificacao (idUtilizador, mensagem)
    SELECT p.idUtilizador, @mensagem
    FROM Preferencia p
    WHERE p.idArea = @idArea AND p.idSubarea = @idSubarea
END
GO

-- ================================
-- Testar Procedimento Armazenado
-- ================================
-- Inserir um novo evento para testar o procedimento
INSERT INTO Evento (idArea, idSubarea, idCriador, idAdmin, idPosto, titulo, descricao, data, hora, morada, estado, foto)
VALUES (1, 1, 1, 1, 1, 'Teste Evento', 'Descrição do Evento', '2024-06-15', '12:00', 'Rua ABC', 0, 'foto.jpg')

-- Obter o ID do evento inserido
DECLARE @novoEventoID INT
SELECT @novoEventoID = SCOPE_IDENTITY()

-- Executar o procedimento armazenado
EXEC NotificarUtilizadoresPorPreferencias @novoEventoID
GO

-- Verificar notificações criadas
SELECT * FROM Notificacao WHERE mensagem = 'Novo evento na sua área de interesse!'
GO

-- ================================
-- Função: ContarEventosPorUtilizador
-- Esta função retorna a contagem de eventos criados por um utilizador específico.
-- ================================
CREATE FUNCTION sc23_138.ContarEventosPorUtilizador (@idUtilizador INT)
RETURNS INT
AS
BEGIN
    DECLARE @contagem INT;

    SELECT @contagem = COUNT(*)
    FROM Evento
    WHERE idCriador = @idUtilizador;

    RETURN @contagem;
END;
GO

-- ================================
-- Testar Função
-- ================================
-- Selecionar a contagem de eventos para um utilizador específico
SELECT sc23_138.ContarEventosPorUtilizador(1) AS ContagemEventos;
GO

-- ================================
-- Trigger: tr_Evento_Cancelado
-- Este trigger é executado após a atualização do estado de um evento para cancelado,
-- alterando o estado das inscrições associadas a esse evento.
-- ================================

CREATE TRIGGER tr_Evento_Cancelado
ON Evento
AFTER UPDATE
AS
BEGIN
    IF UPDATE(estado)
    BEGIN
        DECLARE @idEvento INT;
        SELECT @idEvento = id FROM inserted;

        UPDATE Inscricao
        SET estado = 0
        WHERE idEvento = @idEvento;
    END
END;
GO

-- Testar Trigger: tr_Evento_Cancelado
DECLARE @eventoTesteID TABLE (ID INT);

INSERT INTO Evento (idArea, idSubarea, idCriador, idAdmin, idPosto, titulo, descricao, data, hora, morada, estado, foto)
OUTPUT inserted.id INTO @eventoTesteID
VALUES (5, 5, 5, 5, 5, 'Evento para Teste de Trigger', 'Descrição do Evento', '2024-07-01', '16:00', 'Rua XYZ', 1, 'foto5.jpg');

DECLARE @ID INT;
SELECT @ID = ID FROM @eventoTesteID;

INSERT INTO Inscricao (idEvento, idUtilizador, estado)
VALUES (@ID, 1, 1);

UPDATE Evento
SET estado = 0
WHERE id = @ID;

SELECT * FROM Inscricao WHERE idEvento = @ID AND estado = 0;


-- ================================
-- Cursor: Cursor_EventosProximos
-- Este cursor percorre os eventos programados para os próximos 7 dias
-- e cria uma notificação para os seus criadores.
-- ================================
DECLARE Cursor_EventosProximos CURSOR FOR
SELECT id, idCriador, titulo FROM Evento WHERE data BETWEEN GETDATE() AND DATEADD(DAY, 7, GETDATE())

DECLARE @idEvento INT, @idCriador INT, @titulo VARCHAR(255), @mensagem VARCHAR(255)

OPEN Cursor_EventosProximos

FETCH NEXT FROM Cursor_EventosProximos INTO @idEvento, @idCriador, @titulo

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Mensagem de notificação personalizada
    SET @mensagem = 'Olá! O seu evento "' + @titulo + '" está programado para ocorrer em breve!'

    -- Inserir notificação
    INSERT INTO Notificacao (idUtilizador, mensagem)
    VALUES (@idCriador, @mensagem)

    FETCH NEXT FROM Cursor_EventosProximos INTO @idEvento, @idCriador, @titulo
END

CLOSE Cursor_EventosProximos
DEALLOCATE Cursor_EventosProximos
GO

-- ================================
-- Testar Cursor
-- ================================
-- Inserir eventos para testar o cursor
INSERT INTO Evento (idArea, idSubarea, idCriador, idAdmin, idPosto, titulo, descricao, data, hora, morada, estado, foto)
VALUES (3, 3, 3, 3, 3, 'Evento Próximo 1', 'Descrição do Evento', GETDATE() + 2, '10:00', 'Rua GHI', 0, 'foto3.jpg'),
       (4, 4, 4, 4, 4, 'Evento Próximo 2', 'Descrição do Evento', GETDATE() + 5, '14:00', 'Rua JKL', 0, 'foto4.jpg')
GO

-- Verificar notificações criadas pelo cursor
SELECT * FROM Notificacao WHERE mensagem LIKE 'Olá! O seu evento "%" está programado para ocorrer em breve!'
GO
