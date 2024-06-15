const Notificacao = require('../models/notificacaoModel');

exports.NotificacoesId = async (req, res) => {
    try
    {
        const idUtilizador = req.params.id;
        const data = await Notificacao.findAll({
            where: {
                idUtilizador,
            },
        });
        res.json({
            success: true,
            data,
        });
    }
    catch (err)
    {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}

exports.Notificacoes = async (req, res) => {
    try
    {
        const data = await Notificacao.findAll();
        res.json({
            success: true,
            data,
        });
    }
    catch (err)
    {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}