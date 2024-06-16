import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Avatar, Typography, Card, CardContent, Button, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Comentarios from '../avaliacao/comentarios';
import api from '../api/api';

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
        const response = await api.get('/utilizador');
        setUtilizador(response.data);
      } catch (error) {
        console.error('Erro ao encontrar utilizador:', error);
      }
    };
    fetchUtilizador();
  }, []);
  
  useEffect(() => {
    if (utilizador) {
      console.log(utilizador.id);
    }
  }, [utilizador]);


  const StyledCard = styled(Card)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  });

  const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
  });

  const StyledTypography = styled(Typography)({
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 600,
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

const fetchAvaliacoesEstabelecimentos = async () => {
  if (utilizador) {
    try {
      const response = await api.get(`/avaliacao/utilizador/${utilizador.id}`);
      setAvaliacoes(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching Avaliações:', error.response || error.message);
    }
  }
};

useEffect(() => {
  fetchAvaliacoesEstabelecimentos();
}, [id, utilizador]);

useEffect(() => {
  console.log(avaliacoes);
}, [avaliacoes]);
  
const handleChange = (event, value) => {
  setPage(value);
};

  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 2 }}>
      {/* Profile Section */}
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
          <Avatar sx={{ width: 100, height: 100 }}>JW</Avatar>
          <Button variant="contained" sx={{ backgroundColor: '#1D324F' }} onClick={() => navigate('/perfil/editar')}>
            Editar Perfil
          </Button>
        </Box>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          User
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Sobre:
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          Pequena descrição do user.
        </Typography>
      </Box>

      {/* Tabs for Avaliações and Imagens */}
      <Tabs value={selectedTab} onChange={handleTabChange} sx={{ marginBottom: 2 }}>
        <Tab label="Avaliações" />
        <Tab label="Imagens" />
      </Tabs>

      {/* Content based on selected tab */}
      {selectedTab === 0 && (
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Avaliações:
          </Typography>
          <Comentarios 
            fetchAvaliacoes={fetchAvaliacoesEstabelecimentos} 
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
          <Grid container spacing={2}>
            {[
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
            ].map((image, index) => (
              <Grid item xs={2} key={index}>
                <StyledCard>
                  <Box component="img" src={image.img} alt={image.description} sx={{ width: '100%', height: 'auto' }} />
                  <StyledCardContent>
                    <Typography variant="body2" color="text.secondary">
                      {image.description}
                    </Typography>
                  </StyledCardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Perfil;
