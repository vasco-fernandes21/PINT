import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const PerfilEditar = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Editar Perfil
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nome" variant="outlined" />
        <TextField label="Descrição" variant="outlined" multiline rows={4} />
        <TextField label="Email" variant="outlined" />
        <TextField label="Telefone" variant="outlined" />
        <Button variant="contained" sx={{ backgroundColor: '#1D324F' }}>
          Salvar Alterações
        </Button>
      </Box>
    </Box>
  );
};

export default PerfilEditar;
