const Evento = require('../models/eventoModel');
const Area = require('../models/areaModel');
const Subarea = require('../models/subareaModel');
const Utilizador = require('../models/utilizadorModel');

exports.listarEventos = async (req, res) => {
    const { areaId, subareaId } = req.query;

    let whereClause = {};
    if (areaId) {
        whereClause.idArea = areaId;
    }
    if (subareaId) {
        whereClause.idSubarea = subareaId;
    }

    try {
        const data = await Evento.findAll({
            where: whereClause,
            include: [
                { model: Area, as: 'area', attributes: ['nome'] },
                { model: Subarea, as: 'subarea', attributes: ['nome'] },
                { model: Utilizador, as: 'criador', attributes: ['nome'] },
                { model: Utilizador, as: 'admin', attributes: ['nome'] }
            ]
        });
        res.json({
            success: true,
            data: data,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
};


exports.get = async (req, res) => {
    const { eventoId } = req.params;
    try {
        const data = await Evento.findOne({
            where: { id: eventoId },
            include: [
                { model: Area, as: 'area', attributes: ['nome'] },
                { model: Subarea, as: 'subarea', attributes: ['nome'] },
                { model: Utilizador, as: 'criador', attributes: ['nome'] },
                { model: Utilizador, as: 'admin', attributes: ['nome'] }
            ]
        });

        if (data) {
            res.status(200).json({
                success: true,
                data: data,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'O evento com o ID ' + eventoId + ' não foi encontrado!',
            });
        }
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
};

exports.create = async (req, res) => {
    const {
        titulo,
        descricao,
        data,
        hora,
        local,
        idArea,
        idSubarea,
        idCriador,
        idAdmin
    } = req.body;

    try {
        const newEvento = await Evento.create({
            titulo,
            descricao,
            data,
            hora,
            local,
            estado: false, // assumindo que o evento é inicialmente inativo
            idArea,
            idSubarea,
            idCriador,
            idAdmin
        });

        res.status(200).json({
            success: true,
            message: 'Evento criado com sucesso!',
            data: newEvento
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({ success: false, message: "Erro ao criar o evento!" });
    }
};
exports.update = async (req, res) => {
    const { id } = req.params;
    const {
        titulo,
        descricao,
        data,
        hora,
        local,
        idArea,
        idSubarea,
        idCriador,
        idAdmin,
        estado
    } = req.body;

    try {
        const existingEvento = await Evento.findOne({ where: { id: id } });
        if (!existingEvento) {
            return res.status(404).json({
                success: false,
                message: "Evento não encontrado!"
            });
        }

        const data = await Evento.update({
            titulo,
            descricao,
            data,
            hora,
            local,
            idArea,
            idSubarea,
            idCriador,
            idAdmin,
            estado
        }, { where: { id: id } });

        if (data[0] === 0) {
            return res.status(404).json({
                success: false,
                message: "Evento não encontrado!"
            });
        }

        res.status(200).json({
            success: true,
            data: data,
            message: "Evento atualizado com sucesso!"
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Erro ao efetuar a atualização do evento!"
        });
    }
};
exports.delete = async (req, res) => {
    const { eventoId } = req.body;

    try {
        const del = await Evento.destroy({ where: { id: eventoId } });

        if (del > 0) {
            res.status(200).json({
                success: true,
                deleted: del,
                message: 'Evento removido!'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Nenhum evento encontrado com o ID fornecido!',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Erro ao eliminar o evento!'
        });
    }
};

