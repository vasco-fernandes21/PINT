import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Avatar, Typography, Button, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ComentariosPerfil from "./comentariosPerfil";
import api from '../api/api';
import AvatarImagem from "../utils/avatarImagem";

const Perfil = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [utilizador, setUtilizador] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const noOfPages = Math.ceil(avaliacoes.length / itemsPerPage);

  useEffect(() => {
    const fetchUtilizador = async () => {
      try {
        const response = await api.get('/utilizador/completo');
        setUtilizador(response.data);
      } catch (error) {
        console.error('Erro ao encontrar utilizador:', error);
      }
    };
    fetchUtilizador();
  }, []);

  const fetchAvaliacoes = async () => {
    if (utilizador) {
      try {
        const response = await api.get(`/avaliacao/utilizador/${utilizador.id}`);
        setAvaliacoes(response.data.data);
      } catch (error) {
        console.error('Error fetching Avaliações:', error.response || error.message);
      }
    }
  };

  useEffect(() => {
    fetchAvaliacoes();
  }, [utilizador]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <AvatarImagem 
            src={utilizador && utilizador.id_google != null ? utilizador.foto : `${process.env.REACT_APP_API_URL}/uploads/utilizador/${utilizador ? utilizador.foto : ''}`}
            alt={utilizador?.nome} sx={{ width: 100, height: 100 }} />
          <Button variant="contained" sx={{ backgroundColor: '#1D324F' }} onClick={() => navigate('/perfil/editar')}>
            Editar Perfil
          </Button>
        </Box>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {utilizador?.nome}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Sobre:
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          Pequena descrição do user.
        </Typography>
      </Box>

      <Tabs value={selectedTab} onChange={handleTabChange} sx={{ marginBottom: 2 }}>
        <Tab label="Avaliações" />
        <Tab label="Imagens" />
      </Tabs>

      {selectedTab === 0 && (
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Avaliações:
          </Typography>
          <ComentariosPerfil 
            fetchAvaliacoes={fetchAvaliacoes}
            avaliacoes={avaliacoes} 
            page={page} 
            itemsPerPage={itemsPerPage} 
            noOfPages={noOfPages} 
            handleChange={handleChange} 
            tipo="estabelecimentos"
          />
        </Box>
      )}

      {selectedTab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Imagens:
          </Typography>
          {/* Adicione aqui o código para exibir as imagens */}
        </Box>
      )}
    </Box>
  );
};

export default Perfil;
