const Denuncia = require('../models/denunciaModel');
const Utilizador = require('../models/utilizadorModel');
const AvaliacaoEvento = require('../models/avaliacaoEventoModel');
const AvaliacaoEstabelecimento = require('../models/avaliacaoEstabelecimentoModel');

exports.criarDenuncia = async (req, res) => {
    const id = req.user.id;
    const { idAvaliacaoEvento, idAvaliacaoEstabelecimento } = req.body;
    
    let dadosDenuncia = {
        utilizador: id
    };
    
    if (idAvaliacaoEvento) {
        dadosDenuncia.avaliacaoEvento = idAvaliacaoEvento;
    }
    
    if (idAvaliacaoEstabelecimento) {
        dadosDenuncia.avaliacaoEstabelecimento = idAvaliacaoEstabelecimento;
    }

    try {
        const denuncia = await Denuncia.create(dadosDenuncia);

        res.status(201).json({
            success: true,
            data: denuncia
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erro ao criar denúncia'
        });
    }
}

exports.listarDenuncias = async (req, res) => {
    try {
        const denuncias = await Denuncia.findAll({
            include: [
                { model: Utilizador, as: 'criador', attributes: ['nome'] },
                { model: AvaliacaoEvento, as: 'avaliacaoEvento' },
                { model: AvaliacaoEstabelecimento, as: 'avaliacaoEstabelecimento' }
            ]
        });

        console.log('Denúncias encontradas:', denuncias); 

        res.json({
            success: true,
            data: denuncias
        });
    } catch (error) {
        console.error('Erro ao listar denúncias:', error); 
        res.status(500).json({
            success: false,
            error: 'Erro ao listar denúncias'
        });
    }
};

exports.apagarDenuncia = async (req, res) => {
    const { id } = req.params;

    try {
        const denuncia = await Denuncia.findByPk(id);
        if (!denuncia) {
            return res.status(404).json({
                success: false,
                error: 'Denúncia não encontrada'
            });
        }

        await denuncia.destroy();

        res.json({
            success: true,
            data: denuncia
        });
    } catch (error) {
        console.error('Erro ao apagar denúncia:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao apagar denúncia'
        });
    }
}