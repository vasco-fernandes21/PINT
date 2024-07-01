import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Paper, Pagination } from '@mui/material';
import api from '../api/api';
import AvatarImagem from "../utils/avatarImagem";
import BotaoUpload from "../utils/botaoUpload";
import ComentariosPerfil from "./comentariosPerfil";
import EditarPerfil from './utilizadorEditar'; 

const Perfil = () => {
  const [utilizador, setUtilizador] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const noOfPages = Math.ceil(avaliacoes.length / itemsPerPage);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

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

  const updateFotoPerfil = (novaFoto) => {
    setUtilizador({ ...utilizador, foto: novaFoto });
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleUpdate = (updatedUtilizador) => {
    setUtilizador(updatedUtilizador);
  };

  return (
    <Box sx={{ padding: 2, maxWidth: { xl: '10' } }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pl: 1 }}>
            <AvatarImagem 
              src={utilizador && utilizador.id_google != null ? utilizador.foto : `${process.env.REACT_APP_API_URL}/uploads/utilizador/${utilizador ? utilizador.foto : ''}`}
              alt={utilizador?.nome} sx={{ width: 200, height: 200, mb: 2 }} 
            />
            <Button variant="contained" sx={{ mb: 2, backgroundColor: '#1D324F' }} onClick={handleDialogOpen}>
              Editar Perfil
            </Button>
            {utilizador && <BotaoUpload tipo="utilizador" id={utilizador.id} idUtilizador={utilizador.id} updateFotos={updateFotoPerfil} />}
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ padding: 2, backgroundColor: '#f0f0f0', minHeight: '30vh' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {utilizador?.nome}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Sobre:
              </Typography>
              {utilizador?.descricao && (
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Descrição:</strong> {utilizador.descricao}
                </Typography>
              )}
              {utilizador?.nif && (
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>NIF:</strong> {utilizador.nif}
                </Typography>
              )}
              {utilizador?.localidade && (
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  <strong>Localidade:</strong> {utilizador.localidade}
                </Typography>
              )}
              {utilizador?.telemovel && (
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  <strong>Telemóvel:</strong> {utilizador.telemovel}
                </Typography>
              )}
              {utilizador?.email && (
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  <strong>Email:</strong> {utilizador.email}
                </Typography>
              )}
              {utilizador?.cargo && (
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  <strong>Cargo:</strong> {utilizador.cargo}
                </Typography>
              )}
              {utilizador?.Posto?.nome && (
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  <strong>Posto:</strong> {utilizador.Posto.nome}
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 2 }}>
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
        {avaliacoes.length > itemsPerPage && (
          <Pagination
            count={noOfPages}
            page={page}
            onChange={handleChange}
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
          />
        )}
      </Paper>
      <EditarPerfil
        open={isDialogOpen}
        onClose={handleDialogClose}
        utilizador={utilizador}
        onUpdate={handleUpdate}
      />
    </Box>
  );
};

export default Perfil;
