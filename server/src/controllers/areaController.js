const Area = require('../models/areaModel');
const Subarea = require('../models/subareaModel');

exports.listarAreas = async (req, res) => {
    try {
        const data = await Area.findAll();
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
}

exports.listarSubareas = async (req, res) => {
    try {
        const { areaId } = req.params;
        const data = await Subarea.findAll({
            where: { idArea: areaId },
            include : [
                { model: Area,
                  attributes: ['nome'] 
                } ]
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
}

exports.criarArea = async (req, res) => {
    try {
        const data = await Area.create(req.body);
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
}
