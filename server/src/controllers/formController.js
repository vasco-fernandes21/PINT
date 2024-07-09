const { Op } = require('sequelize');
const Formulario = require('../models/formModel');

exports.criarFormulario = async (req, res) => {
    try {
      const { campos, titulo, textoAuxiliar} = req.body;
      const { idEvento } = req.params;
  
      const formulario = await Formulario.create({
        campos,
        titulo,
        textoAuxiliar,
        idEvento,
      });
  
      res.status(201).json({ formulario });
    } catch (error) {
      console.error('Erro ao criar formulário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

  exports.getFormularioEvento = async (req, res) => {
    try {
      const { idEvento } = req.params;
  
      const formulario = await Formulario.findOne({
        where: {
          idEvento,
        },
      });
  
      res.json({ formulario });
    } catch (error) {
      console.error('Erro ao buscar formulário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }