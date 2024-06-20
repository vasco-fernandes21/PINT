import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const Validacoes = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">Validações das atividades</Typography>
        <Typography variant="body2">Conteúdo das Validações</Typography>
      </CardContent>
    </StyledCard>
  );
};

export default Validacoes;
