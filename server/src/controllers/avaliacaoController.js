const AvaliacaoEstabelecimento = require('../models/avaliacaoEstabelecimentoModel');
const Utilizador = require('../models/utilizadorModel');

exports.listarAvaliacoesEstabelecimento = async (req, res) => {
    try {
       const idEstabelecimento = req.params.id || req.query.idEstabelecimento;
       
        const data = await AvaliacaoEstabelecimento.findAll({
                where: { 
                    idEstabelecimento,
                    estado: 'aceite'
                },
                include: [
                    { 
                        model: Utilizador, 
                        as: 'utilizador', 
                        attributes: ['nome', 'foto'] 
                    },
                    { 
                        model: Utilizador, 
                        as: 'admin', 
                        attributes: ['nome'] 
                    },
                ],
            });
        res.json({
            success: true,
            data,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}