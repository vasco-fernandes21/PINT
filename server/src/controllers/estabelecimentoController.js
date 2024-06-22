const Estabelecimento = require('../models/estabelecimentoModel');
const Area = require('../models/areaModel');
const Subarea = require('../models/subareaModel');
const Posto = require('../models/postoModel');
const FotoEstabelecimento = require('../models/fotoEstabelecimentoModel');
const Utilizador = require('../models/utilizadorModel');
const notificacaoController = require('./notificacaoController');
const AvaliacaoEstabelecimento = require('../models/avaliacaoEstabelecimentoModel');



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

exports.estabelecimentosMobile = async (req, res) => {
    const areaId = req.body.areaId || req.params.areaId || req.query.areaId;
    const subareaId = req.body.subareaId || req.params.subareaId || req.query.subareaId;
    const idPosto = req.body.idPosto || req.params.idPosto || req.query.idPosto;

    let whereClause = { estado: true };
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
        console.error('Erro ao listar estabelecimentos:', err.message);
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}


exports.criarEstabelecimento = async (req, res) => {
    const {
      nome,
      idArea,
      idSubarea,
      morada,
      descricao,
      telemovel,
      email,
      idAdmin
    } = req.body;

    const foto = req.file ? req.file.filename : null; 
    const idCriador = req.user.id;
    const idPosto = req.user.idPosto;

    try {
      const newEstabelecimento = await Estabelecimento.create({
        nome,
        idArea,
        idSubarea,
        idPosto,
        morada,
        descricao,
        telemovel,
        email,
        idAdmin,
        idCriador,
        foto
      });

      // Criar notificação após a criação do estabelecimento
      const mockRes = {
          status: () => mockRes,
          json: (data) => { return data; }
      };

      const notificacao = await notificacaoController.criarNotificacao({
          body: {
              titulo: 'Estabelecimento criado',
              descricao: `O seu estabelecimento ${nome} foi criado com sucesso!`
          },
          user: {
              id: idCriador
          }
      }, mockRes);

      res.status(200).json({
        success: true,
        message: 'Estabelecimento criado com sucesso!',
        data: newEstabelecimento,
        notificacao: notificacao // Adicione esta linha para enviar a notificação como resposta
      });
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ success: false, message: "Erro ao criar o estabelecimento!" });
    }
};

exports.criarEstabelecimentoMobile = async (req, res) => {
    const {
      nome,
      idArea,
      idSubarea,
      morada,
      idPosto,
      descricao,
      telemovel,
      email,
      idAdmin
    } = req.body;

    const foto = req.file ? req.file.filename : null; 
    const idCriador = req.user.id;

    try {
      const newEstabelecimento = await Estabelecimento.create({
        nome,
        idArea,
        idSubarea,
        idPosto,
        morada,
        descricao,
        telemovel,
        email,
        idAdmin,
        idCriador,
        foto
      });

      // Criar notificação após a criação do estabelecimento
      const mockRes = {
          status: () => mockRes,
          json: (data) => { return data; }
      };

      const notificacao = await notificacaoController.criarNotificacao({
          body: {
              titulo: 'Estabelecimento criado',
              descricao: `O seu estabelecimento ${nome} foi criado com sucesso!`
          },
          user: {
              id: idCriador
          }
      }, mockRes);

      res.status(200).json({
        success: true,
        message: 'Estabelecimento criado com sucesso!',
        data: newEstabelecimento,
        notificacao: notificacao // Adicione esta linha para enviar a notificação como resposta
      });
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ success: false, message: "Erro ao criar o estabelecimento!" });
    }
};

exports.estabelecimento_id = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Estabelecimento.findOne({
            where: { id: id },
            include: [
                { model: Area, attributes: ['nome'] },
                { model: Subarea, attributes: ['nome'] },
                { model: Posto, attributes: ['nome'] },
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
                message: 'O estabelecimento com o ID ' + id + ' não foi encontrado!',
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

exports.getFotoEstabelecimento = async (req, res) => {
    const { id } = req.params;
    try {
        const fotos = await FotoEstabelecimento.findAll({
            where: { 
                idEstabelecimento: id,
                estado: true, 
            },
            include: [
                {
                    model: Utilizador,
                    as: 'criador',
                    attributes: ['nome'],
                },
                {
                    model: Utilizador,
                    as: 'admin',
                    attributes: ['nome'],
                },
            ],
        });

        if (fotos.length > 0) {
            res.status(200).json({
                success: true,
                data: fotos,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Nenhuma foto encontrada para o estabelecimento com o ID ' + id,
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

exports.editarEstabelecimento = async (req, res) => {
    const { id } = req.params;
    const {
        nome,
        idArea,
        idSubarea,
        idPosto,
        morada,
        descricao,
        telemovel,
        email,
        idAdmin,
        idCriador,
    } = req.body;

    const foto = req.file ? req.file.filename : null; 

    let updateData = {};

    if (nome) updateData.nome = nome;
    if (idArea) updateData.idArea = idArea;
    if (idSubarea) updateData.idSubarea = idSubarea;
    if (idPosto) updateData.idPosto = idPosto;
    if (morada) updateData.morada = morada;
    if (descricao) updateData.descricao = descricao;
    if (telemovel) updateData.telemovel = telemovel;
    if (email) updateData.email = email;
    if (idAdmin) updateData.idAdmin = idAdmin;
    if (idCriador) updateData.idCriador = idCriador;
    if (foto) updateData.foto = foto


    try {
        const [updated] = await Estabelecimento.update(updateData, {
            where: { id: id }
        });

        if (updated) {
            const updatedEstabelecimento = await Estabelecimento.findOne({ where: { id: id } });
            res.status(200).json({ success: true, message: 'Estabelecimento atualizado com sucesso!', data: updatedEstabelecimento });
        } else {
            res.status(404).json({ success: false, message: 'Não foi possível atualizar o estabelecimento.' });
        }
    } catch (error) {
        co
        nsole.log('Error: ', error);
        res.status(500).json({ success: false, message: "Erro ao atualizar o estabelecimento!" });
    }
};

exports.uploadFotoEstabelecimento = async (req, res) => {
    const { id } = req.params;
    const { idUtilizador } = req.body;
    const foto = req.file ? req.file.filename : null;

    try {
        const newFoto = await FotoEstabelecimento.create({
            foto,
            idEstabelecimento: id,
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

exports.deleteFotoEstabelecimento = async (req, res) => {
    const { id } = req.params;
    try {
        const [apagado] = await FotoEstabelecimento.update({
            estado: false,
        }, {
            where: { id: id }
        });

        if (apagado) {
            res.status(200).json({ success: true, message: 'Foto removida com sucesso!' });
        } else {
            res.status(404).json({ success: false, message: 'Foto não encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao remover foto:', error); // Adicione essa linha para registrar o erro no console
        res.status(500).json({ success: false, message: "Erro ao remover a foto!" });
    }
};

exports.apagarEstabelecimento = async (req, res) => {
    const { id } = req.params;
    try {
        // Apagar todas as avaliações associadas ao estabelecimento
        await AvaliacaoEstabelecimento.destroy({
            where: { idEstabelecimento: id }
        });

        // Apagar todas as fotos associadas ao estabelecimento
        await FotoEstabelecimento.destroy({
            where: { idEstabelecimento: id }
        });

        // Apagar o estabelecimento
        const apagado = await Estabelecimento.destroy({
            where: { id: id }
        });

        if (apagado) {
            res.status(200).json({ success: true, message: 'Estabelecimento apagado com sucesso!' });
        } else {
            res.status(404).json({ success: false, message: 'Estabelecimento não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao apagar estabelecimento:', error);
        res.status(500).json({ success: false, message: "Erro ao apagar o estabelecimento!" });
    }
};

exports.EstabelecimentosPorValidar = async (req, res) => {
    let idPosto;
    if (req.user) {
        idPosto = req.user.idPosto;
    }

    let whereClause = { estado: false };

    if (idPosto) {
        whereClause.idPosto = idPosto;
    }

    try {
        const data = await Estabelecimento.findAll({
            where: whereClause,
            include: [
                { model: Utilizador, as: 'criador', attributes: ['nome'] },
            ]
        });

        res.json({
            success: true,
            data: data,
        });
    } catch (err) {
        console.error('Erro ao listar estabelecimentos:', err.message);
        res.status(500).json({
            success: false,
            error: 'Erro: ' + err.message,
        });
    }
}