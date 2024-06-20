const Evento = require('../models/eventoModel');
const Estabelecimento = require('../models/estabelecimentoModel');
const Posto = require('../models/postoModel');
const Area = require ('../models/areaModel');
const Sequelize = require('sequelize');

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