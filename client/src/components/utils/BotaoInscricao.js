import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import api from '../api/api';

const BotaoInscricaoEvento = ({ idEvento, inscricaoAberta }) => {
    const [inscrito, setInscrito] = useState(false);

    useEffect(() => {
        verificarInscricao();
    }, []);

    const verificarInscricao = async () => {
        try {
            const response = await api.get(`/eventos/${idEvento}/inscricao/verificar`); // Ajuste o endpoint conforme necessário
            setInscrito(response.data.inscrito);
        } catch (error) {
            console.error('Erro ao verificar inscrição:', error);
        }
    };

    const toggleInscricao = async () => {
        if (inscrito) {
            console.log('Já está inscrito no evento.');
            return; // Prevenir ação se já estiver inscrito
        }
        try {
            await api.post(`/eventos/inscrever/${idEvento}`);
            console.log('Inscrição realizada com sucesso');
            setInscrito(true); // Atualiza o estado para refletir a inscrição
        } catch (error) {
            console.error('Erro ao alterar inscrição:', error.message);
        }
    };

    return (
        <Button
            variant="contained"
            onClick={toggleInscricao}
            disabled={!inscricaoAberta || inscrito} // Desabilita o botão se inscrições estiverem fechadas ou se já estiver inscrito
            style={{
                backgroundColor: !inscricaoAberta ? '#6c757d' : (inscrito ? '#ccc' : '#1d324f'),
                color: '#fff',
                marginLeft: 0,
                marginTop: 25,
            }}
        >
            {!inscricaoAberta ? 'Inscrições desativadas' : (inscrito ? 'Inscrito' : 'Inscrever-se no Evento')}
        </Button>
    );
};

export default BotaoInscricaoEvento;