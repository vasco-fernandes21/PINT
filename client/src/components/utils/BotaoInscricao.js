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
            const response = await api.get(`/eventos/${idEvento}/inscricao`);
            setInscrito(response.data.inscrito);
        } catch (error) {
            console.error('Erro ao verificar inscrição:', error);
        }
    };

    const toggleInscricao = async () => {
        try {
            if (inscrito) {
                // Se já estiver inscrito, remove a inscrição
                await api.delete(`/eventos/inscrever/${idEvento}`);
                console.log('Inscrição removida com sucesso');
            } else {
                // Se não estiver inscrito, faz a inscrição
                await api.post(`/eventos/inscrever/${idEvento}`);
                console.log('Inscrição realizada com sucesso');
            }
            // Após a ação ser concluída com sucesso, atualiza o estado de inscrito
            setInscrito(!inscrito);
        } catch (error) {
            console.error('Erro ao alterar inscrição:', error.message);
        }
    };

    return (
        <Button
            variant="contained"
            onClick={toggleInscricao}
            disabled={!inscricaoAberta}
            style={{
                backgroundColor: !inscricaoAberta ? '#6c757d' : (inscrito ? '#ccc' : '#1d324f'),
                color: '#fff',
                marginLeft: 0,
                marginTop: 25,
            }}
        >
            {!inscricaoAberta ? 'Inscrições desativadas' : (inscrito ? 'Remover Inscrição' : 'Inscrever-se no Evento')}
        </Button>
    );
};

export default BotaoInscricaoEvento;
