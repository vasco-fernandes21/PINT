import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Menu, MenuItem, IconButton, Grid, Typography, InputAdornment } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api/api';
import * as Icons from '@mui/icons-material';

const FormArea = () => {
  const { register, handleSubmit } = useForm();
  const [icons, setIcons] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const iconList = [
      'AddOutlined',
      'DeleteOutlined',
      'EditOutlined',
      'SearchOutlined',
      'ArrowForwardOutlined',
      'HomeOutlined',
      'InfoOutlined',
      'SettingsOutlined',
      'HelpOutlineOutlined',
      'AccountCircleOutlined'
    ].map(iconName => ({
      id: iconName,
      name: iconName,
      component: Icons[iconName],
    }));
    setIcons(iconList);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon.id);
    handleMenuClose();
  };

  const filteredIcons = icons.filter(icon => 
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado.');
      }

      console.log('Dados enviados:', { ...data, icone: selectedIcon });

      const response = await api.post('/areas', {
        ...data,
        icone: selectedIcon,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      Swal.fire({
        title: 'Sucesso',
        text: `Área criada com sucesso!`,
        icon: 'success',
        confirmButtonColor: '#1D324F',
      });

      console.log('Área criada:', response.data);
    } catch (error) {
      let errorMessage = 'Erro ao criar Área, tente mais tarde.';
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }

      Swal.fire({
        title: 'Erro',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#1D324F',
      });

      console.error('Erro ao criar Área:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Informações da Área
      </Typography>
      <TextField
        {...register('nome')}
        label="Nome da Área"
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Escolher Ícone"
        fullWidth
        value={selectedIcon ? Icons[selectedIcon] ? selectedIcon.replace('Outlined', '') : 'Ícone inválido' : 'Nenhum ícone selecionado'}
        onClick={handleMenuOpen}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {selectedIcon ? (
                React.createElement(Icons[selectedIcon], { sx: { fontSize: 24 } })
              ) : (
                <Icons.AddCircleOutlineOutlined sx={{ fontSize: 24 }} />
              )}
            </InputAdornment>
          ),
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: '250px',
          },
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          label="Pesquisar Ícones"
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icons.SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
        <Grid container spacing={1} sx={{ p: 1 }}>
          {filteredIcons.map(icon => (
            <Grid item xs={4} key={icon.id}>
              <IconButton
                color={selectedIcon === icon.id ? 'primary' : 'default'}
                onClick={() => handleIconSelect(icon)}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {React.createElement(icon.component, { sx: { fontSize: 24 } })}
                <Typography variant="caption">{icon.name.replace('Outlined', '')}</Typography>
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Menu>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {selectedIcon ? `Ícone selecionado: ${Icons[selectedIcon] ? selectedIcon.replace('Outlined', '') : 'Ícone inválido'}` : 'Nenhum ícone selecionado'}
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        disabled={!selectedIcon}
      >
        Criar Área
      </Button>
    </Box>
  );
};

export default FormArea;
