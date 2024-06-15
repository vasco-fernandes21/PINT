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

exports.CriarAvaliacaoEstabelecimento = async (req, res) => {
    try {
        const { idUtilizador, classificacao, comentario } = req.body;
        const idEstabelecimento = req.params.id; 

        console.log(idUtilizador)

        if (!classificacao && !comentario) {
            return res.status(400).json({
                success: false,
                error: 'Por favor, forneça uma classificação ou comentário.',
            });
        }

        const user = await Utilizador.findByPk(idUtilizador);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Utilizador não encontrado.',
            });
        }

        const avaliacao = await AvaliacaoEstabelecimento.create({
            idUtilizador,
            idEstabelecimento,
            classificacao,
            comentario,
            estado: 'pendente'
        });

        res.json({
            success: true,
            data: avaliacao,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}

exports.editarAvaliacaoEstabelecimento = async (req, res) => {
    try {
        const { classificacao, comentario } = req.body;
        const idAvaliacao = req.params.id;

        const avaliacao = await AvaliacaoEstabelecimento.findByPk(idAvaliacao);
        if (!avaliacao) {
            return res.status(404).json({
                success: false,
                error: 'Avaliação não encontrada.',
            });
        }

        if (classificacao) {
            avaliacao.classificacao = classificacao;
        }

        if (comentario) {
            avaliacao.comentario = comentario;
        }

        await avaliacao.save();

        res.json({
            success: true,
            data: avaliacao,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}