
const gerarToken = require('../middlewares/gerarToken');
const Utilizador = require('../models/utilizadorModel');
const Posto = require('../models/postoModel');
require('dotenv').config();

exports.getUtilizador = (req, res) => {
    res.send(req.user);
  };

exports.getUtilizadorCompleto = async (req, res) => {
  const { id } = req.user;

  try {
    const utilizador = await Utilizador.findByPk(id, {
      include: [{
        model: Posto,
        attributes: ['nome'] 
      }]
    });
    if (!utilizador) {
      return res.status(404).send({ message: 'Utilizador não encontrado' });
    }

    res.send(utilizador);
  } catch (error) {
    console.error('Erro ao procurar utilizador:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};

exports.getUtilizadores = async (req, res) => {
  const { idPosto } = req.query;

  try {
    let utilizadores;
    if (idPosto) {
      utilizadores = await Utilizador.findAll({ where: { idPosto } });
    } else {
      utilizadores = await Utilizador.findAll();
    }
    res.send(utilizadores);
  } catch (error) {
    console.error('Erro ao listar utilizadores:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};

exports.utilizadorPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const utilizador = await Utilizador.findByPk(id);
    if (!utilizador) {
      return res.status(404).send({ message: 'Utilizador não encontrado' });
    }

    res.send(utilizador);
  } catch (error) {
    console.error('Erro ao procurar utilizador:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
}

exports.criarUtilizador = async (req, res) => {
  const { nome, email, estado, isAdmin, idPosto } = req.body;

  try {
    const newUtilizador = await Utilizador.create({ nome, email, estado, isAdmin, idPosto });
    res.status(201).send({ message: 'Utilizador criado com sucesso', data: newUtilizador });
  } catch (error) {
    console.error('Erro ao criar utilizador:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};

exports.apagarUtilizador = async (req, res) => {
  const { id } = req.params;

  try {
    const utilizador = await Utilizador.findByPk(id);

    if (!utilizador) {
      return res.status(404).send({ message: 'Utilizador não encontrado' });
    }

    await utilizador.destroy();
    res.status(200).send({ message: 'Utilizador apagado com sucesso' });
  } catch (error) {
    console.error('Erro ao apagar utilizador:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};


exports.atualizarUtilizador = async (req, res) => {
  const { id } = req.params;
  const { nome, email, estado, isAdmin, idPosto } = req.body;

  try {
    const utilizador = await Utilizador.findByPk(id);

    if (!utilizador) {
      return res.status(404).send({ message: 'Utilizador não encontrado' });
    }

    if (nome !== undefined) utilizador.nome = nome;
    if (email !== undefined) utilizador.email = email;
    if (estado !== undefined) utilizador.estado = estado;
    if (isAdmin !== undefined) utilizador.isAdmin = isAdmin;
    if (idPosto !== undefined) utilizador.idPosto = idPosto;

    await utilizador.save();

    res.status(200).send({ message: 'Utilizador atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar utilizador:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};


exports.associarPosto = async (req, res) => {
  const { id, idPosto } = req.body;

  try {
    const user = await Utilizador.findByPk(id);
    const posto = await Posto.findByPk(idPosto);

    if (!user) {
      return res.status(404).send({ message: 'Utilizador não encontrado' });
    }

    if (!posto) {
      return res.status(404).send({ message: 'Posto não encontrado' });
    }

    user.idPosto = posto.id;
    await user.save();

    const token = gerarToken(user); 

    return res.status(200).send({ message: 'Utilizador associado ao posto com sucesso', token });
  } catch (error) {
    console.log(error); 
    return res.status(500).send({ message: 'Erro ao associar utilizador ao posto', error });
  }
};

exports.uploadFotoUtilizador = async (req, res) => {
  const { id } = req.params;
  const foto = req.file ? req.file.filename : null; 

  try {
    const utilizador = await Utilizador.findByPk(id);

    if (!utilizador) {
      return res.status(404).send({ message: 'Utilizador não encontrado' });
    }

    utilizador.foto = foto; 
    await utilizador.save();

    res.status(200).send({ message: 'Foto do utilizador atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar foto do utilizador:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};

exports.deleteFotoUtilizador = async (req, res) => {
  const { id } = req.params;

  try {
    const utilizador = await Utilizador.findByPk(id);

    if (!utilizador) {
      return res.status(404).send({ message: 'Utilizador não encontrado' });
    }

    utilizador.foto = null;
    await utilizador.save();

    res.status(200).send({ message: 'Foto do utilizador apagada com sucesso' });
  } catch (error) {
    console.error('Erro ao apagar foto do utilizador:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
}

exports.getFotoUtilizador = async (req, res) => {
  const { id } = req.params;

  try {
    const utilizador = await Utilizador.findByPk(id);

    if (!utilizador) {
      return res.status(404).send({ message: 'Utilizador não encontrado' });
    }

    if (!utilizador.foto) {
      return res.status(404).send({ message: 'Foto não encontrada' });
    }

    res.sendFile(utilizador.foto, { root: './uploads/utilizador' });
  } catch (error) {
    console.error('Erro ao encontrar foto do utilizador:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
}