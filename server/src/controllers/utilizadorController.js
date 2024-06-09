
const gerarToken = require('../middlewares/gerarToken');
const Utilizador = require('../models/utilizadorModel');
const Posto = require('../models/postoModel');
require('dotenv').config();

exports.getUtilizador = (req, res) => {
    res.send(req.user);
  };

exports.getUtilizadores = async (req, res) => {
    try {
      const utilizadores = await Utilizador.findAll();
      res.send(utilizadores);
    } catch (error) {
      console.error('Erro ao listar utilizadores:', error);
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
    console.log(error); // Adicione esta linha
    return res.status(500).send({ message: 'Erro ao associar utilizador ao posto', error });
  }
};