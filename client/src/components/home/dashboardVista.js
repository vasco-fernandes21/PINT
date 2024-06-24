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

const Vista = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">Atividade mais vista</Typography>
        <Typography variant="body2">Conteúdo da Vista</Typography>
      </CardContent>
    </StyledCard>
  );
};

export default Vista;
