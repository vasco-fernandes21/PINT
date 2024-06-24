const AvaliacaoEstabelecimento = require('../models/avaliacaoEstabelecimentoModel');
const AvaliacaoEvento = require('../models/avaliacaoEventoModel');
const Evento = require('../models/eventoModel');
const Estabelecimento = require('../models/estabelecimentoModel');
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
                estado: true,
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
                {
                    model: Estabelecimento,
                    as: 'estabelecimento',
                    attributes: ['nome','idPosto']
                }
            ],
        });

        
        const media = await AvaliacaoEstabelecimento.findOne({
            where: { 
                idEstabelecimento: idEstabelecimento,
                estado: true,
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
            estado: false
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
        const { classificacao, comentario, estado } = req.body;
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

        // Verifica se o estado foi fornecido e atualiza
        if (estado !== undefined) { // Verifica se estado foi fornecido
            avaliacao.estado = estado;
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
                estado: true,
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
                {
                    model: Evento,
                    as: 'evento',
                    attributes: ['titulo','idPosto']
                }
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
            estado: false,
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
        const { classificacao, comentario, estado } = req.body; 
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

        // Verifica se o estado foi fornecido e atualiza
        if (estado !== undefined) { // Verifica se estado foi fornecido
            avaliacao.estado = estado;
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
            where: { idUtilizador, estado: true, },
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
                { 
                    model: Estabelecimento, 
                    as: 'estabelecimento', 
                    attributes: ['nome'] 
                },
            ],
        });

        const avaliacoesEvento = await AvaliacaoEvento.findAll({
            where: { idUtilizador, estado: true, },
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
                { 
                    model: Evento, 
                    as: 'evento', 
                    attributes: ['titulo'] 
                },
            ],
        });

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


exports.AvaliacaoEventoPorValidar = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Utilizador não autenticado." });
    }

    const idPosto = req.user.idPosto;

    try {
        const avaliacoesEvento = await AvaliacaoEvento.findAll({
            include: [{
                model: Evento,
                as: 'evento',
                where: { idPosto: idPosto }, 
            }, {
                model: Utilizador,
                as: 'utilizador',
                attributes: ['id', 'nome', 'email']
            }],
            where: { estado: false }
        });

        res.json({ success: true, data: avaliacoesEvento });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao procurar avaliações: " + error.message });
    }
};

exports.AvaliacaoEstabelecimentoPorValidar = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Utilizador não autenticado." });
    }

    const idPosto = req.user.idPosto;

    try {
        const avaliacoesEstabelecimento = await AvaliacaoEstabelecimento.findAll({
            include: [{
                model: Estabelecimento,
                as: 'estabelecimento',
                where: { idPosto: idPosto }, 
            }, {
                model: Utilizador,
                as: 'utilizador',
                attributes: ['id', 'nome', 'email']
            }],
            where: { estado: false }
        });

        res.json({ success: true, data: avaliacoesEstabelecimento });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao procurar avaliações: " + error.message });
    }
};

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
                nomeEventoMaisAvaliado = evento.nome;
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
