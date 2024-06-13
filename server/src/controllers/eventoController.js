const Evento = require('../models/eventoModel');
const Area = require('../models/areaModel');
const Subarea = require('../models/subareaModel');
const Utilizador = require('../models/utilizadorModel');
const Posto = require('../models/postoModel');

exports.listarEventos = async (req, res) => {
    console.log('Query Params:', req.query); 
    console.log('User:', req.user); 

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
        const data = await Evento.findAll({
            where: whereClause,
            include: [
                { model: Area, as: 'area', attributes: ['nome'] },
                { model: Subarea, as: 'subarea', attributes: ['nome'] },
                { model: Utilizador, as: 'criador', attributes: ['nome'] },
                { model: Utilizador, as: 'admin', attributes: ['nome'] },
                { model: Posto, as: 'posto', attributes: ['nome'] }
            ]
        });
        res.json({
            success: true,
            data: data,
        });
    } catch (err) {
        console.error('Erro ao listar eventos:', err.message); // Adicionado log de erro detalhado
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
    morada,
    idArea,
    idSubarea,
    idCriador,
  } = req.body;

  const idPosto = req.user.idPosto; // Use idPosto from req.user

  const foto = req.file ? req.file.filename : null; // Aqui você obtém apenas o nome do arquivo

  try {
    const newEvento = await Evento.create({
      titulo,
      descricao,
      data,
      hora,
      morada,
      foto,
      estado: false, // Estado inicial definido como falso
      idArea,
      idSubarea,
      idCriador,
      idPosto
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
        morada,
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
            morada,
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

exports.porVerificar = async (req, res) => {
    try {
        const idPosto = req.user.idPosto; 
        const data = await Evento.findAll({
            where: { 
                estado: false,
                idPosto: idPosto 
            },
            include: [
                { model: Area, as: 'area', attributes: ['nome'] },
                { model: Subarea, as: 'subarea', attributes: ['nome'] },
                { model: Utilizador, as: 'criador', attributes: ['nome'] },
                { model: Utilizador, as: 'admin', attributes: ['nome'] }
            ]
        });

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.countPorVerificar = async (req, res) => {
    try {
        const idPosto = req.user.idPosto; // Use idPosto from req.user
        const count = await Evento.count({ 
            where: { 
                estado: false,
                idPosto: idPosto // Use idPosto in the where clause
            } 
        });

        res.status(200).json({
            success: true,
            count: count
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.aprovar = async (req, res) => {
    const { eventoId } = req.body;
    try {
        const evento = await Evento.findOne({ where: { id: eventoId } });
        if (!evento) {
            return res.status(404).json({
                success: false,
                message: 'Evento não encontrado!'
            });
        }

        evento.estado = true;
        await evento.save();

        res.status(200).json({
            success: true,
            message: 'Evento aprovado com sucesso!'
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.rejeitar = async (req, res) => {
    const { eventoId } = req.body;
    try {
        const evento = await Evento.findOne({ where: { id: eventoId } });
        if (!evento) {
            return res.status(404).json({
                success: false,
                message: 'Evento não encontrado!'
            });
        }

        await evento.destroy();

        res.status(200).json({
            success: true,
            message: 'Evento rejeitado com sucesso!'
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.proximosEventos = async (req, res) => {
    const { inicio, fim } = req.body;
    const nestabelecimento = req.params.nestabelecimento;

    try {

        const eventos = await Evento.find({
            nestabelecimento: nestabelecimento,
            data: {
                $gte: new Date(inicio),
                $lte: new Date(fim)
            }
        });

        res.json({ data: eventos });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};