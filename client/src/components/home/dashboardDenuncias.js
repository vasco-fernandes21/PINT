import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ReportIcon from '@mui/icons-material/Report'; // Importando um ícone de exemplo do MUI

const BoxContainer = styled(Card)({
  height: '100%', // Garantindo que o componente ocupe toda a altura disponível
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  margin: '10px 0',
  backgroundColor: '#fff',
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  },
});

const Icon = styled('div')({
  fontSize: 50,
  color: '#1D324F',
  marginRight: 16,
});

const DashboardDenuncias = () => {
  const [numDenuncias, setNumDenuncias] = useState(0);

  useEffect(() => {
    setNumDenuncias(8);
  }, []);

  return (
    <BoxContainer>
      <Icon>
        <ReportIcon />
      </Icon>
      <div>
        <Typography variant="subtitle2">Denúncias</Typography>
        <Typography variant="h5" sx={{ color: '#1D324F', fontWeight: 'bold' }}>
          {numDenuncias}
        </Typography>
      </div>
    </BoxContainer>
  );
};

export default DashboardDenuncias;
