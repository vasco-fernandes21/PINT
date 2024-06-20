const Evento = require('../models/eventoModel');
const Area = require('../models/areaModel');
const Subarea = require('../models/subareaModel');
const Utilizador = require('../models/utilizadorModel');
const Posto = require('../models/postoModel');
const FotoEvento = require('../models/fotoEventoModel');
const Inscricao = require('../models/inscricaoModel');
const notificacaoController = require('./notificacaoController');
const AvaliacaoEvento = require('../models/avaliacaoEventoModel');

exports.listarEventos = async (req, res) => {
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



exports.getEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Evento.findOne({
            where: { id: id },
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
                message: 'O evento com o ID ' + id + ' não foi encontrado!',
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

exports.CriarEvento = async (req, res) => {
    const {
        titulo,
        descricao,
        data,
        hora,
        morada,
        idArea,
        idSubarea,
        idCriador,
        latitude, 
        longitude
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
            idPosto,
            latitude,
            longitude
        });

        // Criar notificação após a criação do evento
        const mockRes = {
            status: () => mockRes,
            json: (data) => { return data; }
        };

        const notificacao = await notificacaoController.criarNotificacao({
            body: {
                titulo: 'Evento criado',
                descricao: `O seu evento ${titulo} foi criado e enviado para validação!`
            },
            user: {
                id: idCriador
            }
        }, mockRes);

        res.status(200).json({
            success: true,
            message: 'Evento criado com sucesso!',
            data: newEvento,
            notificacao: notificacao // Adicione esta linha para enviar a notificação como resposta
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({ success: false, message: "Erro ao criar o evento!" });
    }
};



exports.editarEvento = async (req, res) => {
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
        latitude, 
        longitude
    } = req.body;

    const foto = req.file ? req.file.filename : null; 

    let updateData = {};

    if (titulo) updateData.titulo = titulo;
    if (descricao) updateData.descricao = descricao;
    if (data) updateData.data = data;
    if (hora) updateData.hora = hora;
    if (morada) updateData.morada = morada;
    if (idArea) updateData.idArea = idArea;
    if (idSubarea) updateData.idSubarea = idSubarea;
    if (idCriador) updateData.idCriador = idCriador;
    if (idAdmin) updateData.idAdmin = idAdmin;
    if (foto) updateData.foto = foto;
    if (latitude) updateData.latitude = latitude;
    if (longitude) updateData.longitude = longitude;

    try {
        const [updated] = await Evento.update(updateData, {
            where: { id: id }
        });

        if (updated) {
            const updatedEvento = await Evento.findOne({ where: { id: id } });
            res.status(200).json({ success: true, message: 'Evento atualizado com sucesso!', data: updatedEvento });
        } else {
            res.status(404).json({ success: false, message: 'Não foi possível atualizar o evento.' });
        }
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({ success: false, message: "Erro ao atualizar o evento!" });
    }
};


exports.apagarEvento = async (req, res) => {
    const { id } = req.params;
    try {
        // Apagar todas as avaliações associadas ao evento
        await AvaliacaoEvento.destroy({
            where: { idEvento: id }
        });

        // Apagar todas as inscrições associadas ao evento
        await Inscricao.destroy({
            where: { idEvento: id }
        });

        // Apagar todas as fotos associadas ao evento
        await FotoEvento.destroy({
            where: { idEvento: id }
        });

        // Apagar o evento
        const evento = await Evento.destroy({
            where: { id: id }
        });

        if (evento) {
            res.status(200).json({ success: true, message: 'Evento apagado com sucesso!' });
        } else {
            res.status(404).json({ success: false, message: 'Evento não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao apagar evento:', error); 
        res.status(500).json({ success: false, message: "Erro ao apagar o evento!" });
    }
};

    exports.getFotoEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const fotos = await FotoEvento.findAll({
            where: { 
                idEvento: id,
                estado: true, 
            },
        });

        if (fotos.length > 0) {
            res.status(200).json({
                success: true,
                data: fotos,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Nenhuma foto encontrada para o evento com o ID ' + id,
            });
        }
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}


exports.deleteFotoEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const [evento] = await FotoEvento.update({
            estado: false,
        }, {
            where: { id: id }
        });

        if (evento) {
            res.status(200).json({ success: true, message: 'Foto removida com sucesso!' });
        } else {
            res.status(404).json({ success: false, message: 'Foto não encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao remover foto:', error); // Adicione essa linha para registrar o erro no console
        res.status(500).json({ success: false, message: "Erro ao remover a foto!" });
    }
};

exports.uploadFotoEvento = async (req, res) => {
    const { id } = req.params;
    const { idUtilizador } = req.body;
    const foto = req.file ? req.file.filename : null;

    try {
        const newFoto = await FotoEvento.create({
            foto,
            idEvento: id,
            idCriador: idUtilizador,
            estado: true,
        });

        res.status(200).json({
            success: true,
            message: 'Foto adicionada com sucesso!',
            data: newFoto
        });
    } catch (error) {
        console.error('Erro ao criar nova foto:', error); // Adicione essa linha para registrar o erro no console
        res.status(500).json({ success: false, message: "Erro ao adicionar a foto!" });
    }
};

exports.getInscricaoEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const inscricoes = await Inscricao.findAll({
            where: { 
                idEvento: id,
            },
            include: [
                { model: Utilizador, as: 'utilizador', attributes: ['nome'] },
                { model: Utilizador, as: 'admin', attributes: ['nome'] },
            ]
        });

        if (inscricoes.length > 0) {
            res.status(200).json({
                success: true,
                data: inscricoes,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Nenhuma inscrição encontrada para o evento com o ID ' + id,
            });
        }
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}

exports.InscricaoEvento = async (req, res) => {
    const { id } = req.params;
    const { idUtilizador } = req.body;

    try {
        const novaInscricao = await Inscricao.create({
            idEvento: id,
            idUtilizador: idUtilizador,
            estado: 'pendente',
        });

        res.status(200).json({
            success: true,
            message: 'Inscrição realizada com sucesso!',
            data: novaInscricao
        });
    } catch (error) {
        console.error('Erro ao realizar inscrição:', error); 
        res.status(500).json({ success: false, message: "Erro ao realizar a inscrição!" });
    }
}