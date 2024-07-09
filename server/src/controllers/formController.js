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
  
      const formulario = await Formulario.findAll({
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

  exports.editarFormulario = async (req, res) => {
    try {
      const { campos, titulo, textoAuxiliar, estado} = req.body;
      const { id } = req.params;
  
      const formulario = await Formulario.findByPk(id);
  
      if (!formulario) {
        return res.status(404).json({ error: 'Formulário não encontrado' });
      }
  
      await formulario.update({
        campos,
        titulo,
        textoAuxiliar,
        estado,
      });
  
      res.json({ formulario });
    } catch (error) {
      console.error('Erro ao editar formulário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

exports.apagarFormulario = async (req, res) => {
    try {
      const { id } = req.params;
  
      const formulario = await Formulario.findByPk(id);
  
      if (!formulario) {
        return res.status(404).json({ error: 'Formulário não encontrado' });
      }
  
      await formulario.destroy();
  
      res.json({ message: 'Formulário apagado com sucesso' });
    } catch (error) {
      console.error('Erro ao apagar formulário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }