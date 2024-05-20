const Estabelecimento = require('../models/estabelecimentoModel');
const Area = require('../models/areaModel');
const Subarea = require('../models/subareaModel');
const Posto = require('../models/postoModel');

exports.listarEstabelecimentos = async (req, res) => {
    const { areaId, subareaId, postoId } = req.query;

    let whereClause = {};
    if (areaId) {
        whereClause.idArea = areaId;
    }
    if (subareaId) {
        whereClause.idSubarea = subareaId;
    }
    if (postoId) {
        whereClause.idPosto = postoId;
    }
    try {
        const data = await Estabelecimento.findAll({
            where: whereClause,
            include: [
                { model: Area, attributes: ['nome'] },
                { model: Subarea, attributes: ['nome'] },
                { model: Posto, attributes: ['nome'] },
            ],
        });
        res.json({
            success: true,
            data: data,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}