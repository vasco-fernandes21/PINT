import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import EventIcon from '@mui/icons-material/Event';
import StoreIcon from '@mui/icons-material/Store';

const BoxContainer = styled(Card)({
  height: '100%', // Garantindo a mesma altura do Vista
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  margin: '10px 0',
  backgroundColor: '#fff', // Cor de fundo consistente
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  },
});

// Estilo para o ícone
const Icon = styled('div')({
  fontSize: 50,
  color: '#1D324F',
  marginRight: 16,
});

const DashboardValidacoes = () => {
  const navigate = useNavigate();
  const [numEventosParaValidar, setNumEventosParaValidar] = useState(0);
  const [numEstabelecimentosParaValidar, setNumEstabelecimentosParaValidar] = useState(0);

  useEffect(() => {
    const fetchEventosParaValidar = async () => {
      try {
        const response = await api.get('/eventos/validar');
        if (response.data.success && Array.isArray(response.data.data)) {
          setNumEventosParaValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao buscar eventos para validar:', error);
      }
    };

    const fetchEstabelecimentosParaValidar = async () => {
      try {
        const response = await api.get('/estabelecimentos/validar');
        if (response.data.success && Array.isArray(response.data.data)) {
          setNumEstabelecimentosParaValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao buscar estabelecimentos para validar:', error);
      }
    };

    fetchEventosParaValidar();
    fetchEstabelecimentosParaValidar();
  }, []);

  const handleNavigation = (type) => {
    if (type === 'eventos') {
      navigate('/validacao');
    } else if (type === 'estabelecimentos') {
      navigate('/validacao');
    }
  };

  return (
    <Grid container spacing={2} sx={{ height: '100%' }}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <BoxContainer onClick={() => handleNavigation('estabelecimentos')}>
          <Icon><StoreIcon /></Icon>
          <div>
            <Typography variant="subtitle2">
              Estabelecimentos para validar
            </Typography>
            <Typography variant="h5" sx={{ color: '#1D324F', fontWeight: 'bold' }}>
              {numEstabelecimentosParaValidar}
            </Typography>
          </div>
        </BoxContainer>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <BoxContainer onClick={() => handleNavigation('eventos')}>
          <Icon><EventIcon /></Icon>
          <div>
            <Typography variant="subtitle2">
              Eventos para validar
            </Typography>
            <Typography variant="h5" sx={{ color: '#1D324F', fontWeight: 'bold' }}>
              {numEventosParaValidar}
            </Typography>
          </div>
        </BoxContainer>
      </Grid>
    </Grid>
  );
};

export default DashboardValidacoes;
