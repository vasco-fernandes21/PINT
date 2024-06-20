import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Topicos = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">Tópicos</Typography>
        <Typography variant="body2">Eventos</Typography>
        <Typography variant="body2">Saúde</Typography>
        <Typography variant="body2">Desporto</Typography>
        <Typography variant="body2">Formação</Typography>
        <Typography variant="body2">Gastronomia</Typography>
        <Typography variant="body2">Alojamento</Typography>
        <Typography variant="body2">Transportes</Typography>
        <Typography variant="body2">Lazer</Typography>
      </CardContent>
    </StyledCard>
  );
};

export default Topicos;
