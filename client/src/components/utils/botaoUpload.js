import React from 'react';
import { Button } from '@mui/material';
import api from '../api/api';

const BotaoUpload = ({ tipo, id, onUpload, idUtilizador }) => {
    const handleFileChange = async (event) => {
        const foto = event.target.files[0];
        if (foto) {
            const formData = new FormData();
            formData.append('foto', foto);
            formData.append('idUtilizador', idUtilizador); 

            try {
                const response = await api.post(`/foto/${tipo}/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200) {
                    console.log('Foto enviada com sucesso:', response.data);
                    onUpload(); 
                    window.location.reload(); // Adicionado para recarregar a página
                } else {
                    throw new Error('Falha ao enviar foto');
                }
            } catch (error) {
                console.error('Erro ao enviar foto:', error.message);
                // Trate o erro de forma apropriada
            }
        }
    };

    return (
        <Button variant="contained" component="label">
            Inserir Foto
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
        </Button>
    );
};

export default BotaoUpload;