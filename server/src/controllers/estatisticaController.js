const Evento = require('../models/eventoModel');
const Estabelecimento = require('../models/estabelecimentoModel');
const Posto = require('../models/postoModel');
const Area = require ('../models/areaModel');
const Sequelize = require('sequelize');
const AvaliacaoEstabelecimento = require('../models/avaliacaoEstabelecimentoModel');
const AvaliacaoEvento = require('../models/avaliacaoEventoModel');

exports.contadorEventosPorArea = async (req, res) => {
    try {
        const data = await Evento.findAll({
            attributes: ['idArea', [Sequelize.fn('COUNT', Sequelize.col('idArea')), 'contador']],
            group: ['Evento.idArea', 'area.id'],
            include: [
                { 
                    model: Area,
                    as: 'area', 
                    attributes: ['id', 'nome'] 
                } 
            ]
        });
        res.json({
            success: true,
            data: data
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}

exports.contadorEstabelecimentosPorArea = async (req, res) => {
    try {
        const data = await Estabelecimento.findAll({
            attributes: ['idArea', [Sequelize.fn('COUNT', Sequelize.col('idArea')), 'contador']],
            group: ['Estabelecimento.idArea', 'Area.id'],
            include: [
                { 
                    model: Area,
                    as: 'Area', 
                    attributes: ['id', 'nome'] 
                } 
            ]
        });
        res.json({
            success: true,
            data: data
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}

exports.eventosPorAreaPosto = async (req, res) => {
    try {
        const { areaId } = req.params;
        let idPosto;
        if (req.user) {
            idPosto = req.user.idPosto;
        }
        const data = await Evento.findAll({
            where: { 
                idArea: areaId,
                idPosto: idPosto 
            },
            include: [
                { 
                    model: Posto,
                    as: 'posto', 
                    attributes: ['nome'] 
                } 
            ]
        });
        const contador = data.length; 
        res.json({
            success: true,
            data: data,
            contador: contador 
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}

exports.estabelecimentosPorAreaPosto = async (req, res) => {
    try {
        const { areaId } = req.params;
        let idPosto;
        if (req.user) {
            idPosto = req.user.idPosto;
        }
        const data = await Estabelecimento.findAll({
            where: { 
                idArea: areaId,
                idPosto: idPosto 
            },
            include: [
                { 
                    model: Posto,
                    as: 'posto', 
                    attributes: ['nome'] 
                } 
            ]
        });
        const contador = data.length; 
        res.json({
            success: true,
            data: data,
            contador: contador 
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}

exports.maisAvaliados = async (req, res) => {
    try {
        const estabelecimentoMaisAvaliado = await AvaliacaoEstabelecimento.findOne({
            attributes: [
                'idEstabelecimento', 
                [Sequelize.fn('count', Sequelize.col('AvaliacaoEstabelecimento.id')), 'totalAvaliacoes']
            ],
            group: ['idEstabelecimento'],
            order: [[Sequelize.fn('count', Sequelize.col('AvaliacaoEstabelecimento.id')), 'DESC']],
            limit: 1
        });

        const eventoMaisAvaliado = await AvaliacaoEvento.findOne({
            attributes: [
                'idEvento', 
                [Sequelize.fn('count', Sequelize.col('AvaliacaoEvento.id')), 'totalAvaliacoes']
            ],
            group: ['idEvento'],
            order: [[Sequelize.fn('count', Sequelize.col('AvaliacaoEvento.id')), 'DESC']],
            limit: 1
        });

        let nomeEstabelecimentoMaisAvaliado = null;
        if (estabelecimentoMaisAvaliado) {
            const estabelecimento = await Estabelecimento.findByPk(estabelecimentoMaisAvaliado.idEstabelecimento);
            if (estabelecimento) {
                nomeEstabelecimentoMaisAvaliado = estabelecimento.nome;
            }
        }

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