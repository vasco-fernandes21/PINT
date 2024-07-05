import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Paper, Pagination } from '@mui/material';
import api from '../api/api';
import AvatarImagem from "../utils/avatarImagem";
import BotaoUpload from "../utils/botaoUpload";
import ComentariosPerfil from "./comentariosPerfil";
import EditarPerfil from './utilizadorEditar'; 
import moment from 'moment';

const Perfil = () => {
  const [utilizador, setUtilizador] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const noOfPages = Math.ceil(avaliacoes.length / itemsPerPage);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

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
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: 2 }}>
            <AvatarImagem 
              src={utilizador && utilizador.id_google != null ? utilizador.foto : `${process.env.REACT_APP_API_URL}/uploads/utilizador/${utilizador ? utilizador.foto : ''}`}
              alt={utilizador?.nome} 
              sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }} 
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {utilizador?.nome}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              {utilizador?.cargo}
            </Typography>
            {utilizador && (
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Última vez online: {moment(utilizador.ultimoLogin).subtract(1, 'hours').fromNow()}
              </Typography>
            )}
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Inscrições ativas</Typography>
            <Typography variant="h4">24</Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Avaliações feitas</Typography>
            <Typography variant="h4">11</Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Áreas de preferência</Typography>
            <Typography variant="h4">2</Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: '#1D324F' }} onClick={handleDialogOpen}>
              Edit Profile
            </Button>
            {utilizador && <BotaoUpload tipo="utilizador" id={utilizador.id} idUtilizador={utilizador.id} updateFotos={updateFotoPerfil} />}
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