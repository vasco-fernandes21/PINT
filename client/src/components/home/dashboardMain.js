import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Validacoes from './dashboardValidacoes';
import Comentadas from './dashboardComentada';
import Vista from './dashboardVista';
import Grafico from './dashboardGrafico';
import Topicos from './dashBoardTopicos';
import api from '../api/api'; 

const DashboardMain = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [greeting, setGreeting] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState(''); 

  useEffect(() => {
    const fetchUtilizador = async () => {
      try {
        const response = await api.get('/utilizador');
        setNomeUsuario(response.data.nome); 
      } catch (error) {
        console.error('Erro ao encontrar utilizador:', error);
      }
    };

    fetchUtilizador();
  }, []); 

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 13) {
      setGreeting('Bom dia,');
    } else if (currentHour >= 13 && currentHour < 20) {
      setGreeting('Boa tarde,');
    } else {
      setGreeting('Boa noite,');
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>

      <Typography variant="h4" sx={{ marginBottom: 2 }}>
       {greeting}  <strong>{nomeUsuario}</strong>
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        {selectedTab === 0 && (
          <Grid container spacing={2} sx={{ height: '110%' }}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Validacoes sx={{ flexGrow: 1 }} />
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Comentadas sx={{ flexGrow: 1 }} />
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Vista sx={{ flexGrow: 1 }} />
            </Grid>
            <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Grafico sx={{ flexGrow: 1 }} />
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Topicos sx={{ flexGrow: 1 }} />
            </Grid>
          </Grid>
        )}

        {selectedTab === 1 && (
          <Box>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Detalhes:
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DashboardMain;
