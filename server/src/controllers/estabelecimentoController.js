const Estabelecimento = require('../models/estabelecimentoModel');
const Area = require('../models/areaModel');
const Subarea = require('../models/subareaModel');
const Posto = require('../models/postoModel');

exports.listarEstabelecimentos = async (req, res) => {
    const { areaId, subareaId } = req.query;
    let idPosto;
    if (req.user) {
        idPosto = req.user.idPosto;
    }

    let whereClause = {};
    if (areaId) {
        whereClause.idArea = areaId;
    }
    if (subareaId) {
        whereClause.idSubarea = subareaId;
    }
    if (idPosto) {
        whereClause.idPosto = idPosto;
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
        console.error('Erro ao listar estabelecimentos:', err.message); // Adicionado log de erro detalhado
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}

exports.create = async (req, res) => {
    const {
      nome,
      idArea,
      idSubarea,
      idPosto,
      local,
      descricao,
      idAdmin,
      idCriador
    } = req.body;

    const foto = req.file ? req.file.filename : null; 

    try {
      const newEstabelecimento = await Estabelecimento.create({
        nome,
        idArea,
        idSubarea,
        idPosto,
        local,
        descricao,
        idAdmin,
        idCriador,
        foto 
      });
  
      res.status(200).json({
        success: true,
        message: 'Estabelecimento criado com sucesso!',
        data: newEstabelecimento
      });
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ success: false, message: "Erro ao criar o estabelecimento!" });
    }
};