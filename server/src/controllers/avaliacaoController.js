const AvaliacaoEstabelecimento = require('../models/avaliacaoEstabelecimentoModel');
const AvaliacaoEvento = require('../models/avaliacaoEventoModel');
const Utilizador = require('../models/utilizadorModel');
const Sequelize = require('sequelize');
const Estabelecimento = require('../models/estabelecimentoModel');
const Evento = require('../models/eventoModel');

exports.listarAvaliacoesEstabelecimento = async (req, res) => {
    try {
        const idEstabelecimento = req.params.id || req.query.idEstabelecimento;

        const data = await AvaliacaoEstabelecimento.findAll({
            where: { 
                idEstabelecimento: idEstabelecimento,
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

        
        const media = await AvaliacaoEstabelecimento.findOne({
            where: { 
                idEstabelecimento: idEstabelecimento,
                estado: 'aceite'
            },
            attributes: [[Sequelize.fn('avg', Sequelize.col('classificacao')), 'media']]
        });

        res.json({
            success: true,
            data,
            media: media.get('media')
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
};

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

exports.apagarAvaliacaoEstabelecimento = async (req, res) => {
    try {
        const idAvaliacao = req.params.id;

        const avaliacao = await AvaliacaoEstabelecimento.findByPk(idAvaliacao);
        if (!avaliacao) {
            return res.status(404).json({
                success: false,
                error: 'Avaliação não encontrada.',
            });
        }

        await avaliacao.destroy();

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

exports.listarAvaliacoesEvento = async (req, res) => {
    try {
        const idEvento = req.params.id || req.query.idEvento;

        const data = await AvaliacaoEvento.findAll({
            where: { 
                idEvento,
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

exports.CriarAvaliacaoEvento = async (req, res) => {
    try {
        const { idUtilizador, classificacao, comentario } = req.body;
        const idEvento = req.params.id; 

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

        const avaliacao = await AvaliacaoEvento.create({
            idUtilizador,
            idEvento,
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

exports.editarAvaliacaoEvento = async (req, res) => {
    try {
        const { classificacao, comentario } = req.body;
        const idAvaliacao = req.params.id;

        const avaliacao = await AvaliacaoEvento.findByPk(idAvaliacao);
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

exports.apagarAvaliacaoEvento = async (req, res) => {
    try {
        const idAvaliacao = req.params.id;

        const avaliacao = await AvaliacaoEvento.findByPk(idAvaliacao);
        if (!avaliacao) {
            return res.status(404).json({
                success: false,
                error: 'Avaliação não encontrada.',
            });
        }

        await avaliacao.destroy();

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

exports.listarAvaliacoesUtilizador = async (req, res) => {
    try {
        const idUtilizador = req.params.idUtilizador;
        
        const avaliacoesEstabelecimento = await AvaliacaoEstabelecimento.findAll({
            where: { idUtilizador },
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

        // Buscar avaliações de eventos
        const avaliacoesEvento = await AvaliacaoEvento.findAll({
            where: { idUtilizador },
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

        // Combinar os resultados
        const data = [...avaliacoesEstabelecimento, ...avaliacoesEvento];

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

exports.obterMaisAvaliacoes = async (req, res) => {
    try {
        // Buscar o estabelecimento com mais avaliações
        const estabelecimentoMaisAvaliado = await AvaliacaoEstabelecimento.findOne({
            attributes: [
                'idEstabelecimento', 
                [Sequelize.fn('count', Sequelize.col('AvaliacaoEstabelecimento.id')), 'totalAvaliacoes']
            ],
            group: ['idEstabelecimento'],
            order: [[Sequelize.fn('count', Sequelize.col('AvaliacaoEstabelecimento.id')), 'DESC']],
            limit: 1
        });

        // Buscar o evento com mais avaliações
        const eventoMaisAvaliado = await AvaliacaoEvento.findOne({
            attributes: [
                'idEvento', 
                [Sequelize.fn('count', Sequelize.col('AvaliacaoEvento.id')), 'totalAvaliacoes']
            ],
            group: ['idEvento'],
            order: [[Sequelize.fn('count', Sequelize.col('AvaliacaoEvento.id')), 'DESC']],
            limit: 1
        });

        // Buscar o nome do estabelecimento mais avaliado
        let nomeEstabelecimentoMaisAvaliado = null;
        if (estabelecimentoMaisAvaliado) {
            const estabelecimento = await Estabelecimento.findByPk(estabelecimentoMaisAvaliado.idEstabelecimento);
            if (estabelecimento) {
                nomeEstabelecimentoMaisAvaliado = estabelecimento.nome;
            }
        }

        // Buscar o nome do evento mais avaliado
        let nomeEventoMaisAvaliado = null;
        if (eventoMaisAvaliado) {
            const evento = await Evento.findByPk(eventoMaisAvaliado.idEvento);
            if (evento) {
                nomeEventoMaisAvaliado = evento.titulo;
            }
        }

        res.json({
            success: true,
            estabelecimentoMaisAvaliado: {
                idEstabelecimento: estabelecimentoMaisAvaliado ? estabelecimentoMaisAvaliado.idEstabelecimento : null,
                nome: nomeEstabelecimentoMaisAvaliado,
                totalAvaliacoes: estabelecimentoMaisAvaliado ? estabelecimentoMaisAvaliado.dataValues.totalAvaliacoes : 0
            },
            eventoMaisAvaliado: {
                idEvento: eventoMaisAvaliado ? eventoMaisAvaliado.idEvento : null,
                nome: nomeEventoMaisAvaliado,
                totalAvaliacoes: eventoMaisAvaliado ? eventoMaisAvaliado.dataValues.totalAvaliacoes : 0
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
};
