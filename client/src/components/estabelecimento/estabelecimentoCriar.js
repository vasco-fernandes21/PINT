import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; 
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import api from '../api/api';
import { Link } from 'react-router-dom';

function CriarEstabelecimento() {
  const { register, handleSubmit, watch, control} = useForm();
  const [areas, setAreas] = useState([]);
  const [subareas, setSubareas] = useState([]);
  const selectedArea = watch('area');

  useEffect(() => {
    const getAreas = async () => {
      try {
        const response = await api.get('/areas');
        setAreas(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar áreas:', error);
      }
    };

    getAreas();
  }, []);

  useEffect(() => {
    const getSubareas = async () => {
      if (selectedArea) {
        try {
          const response = await api.get(`/areas/${selectedArea}`);
          setSubareas(response.data.data);
        } catch (error) {
          console.error('Erro ao buscar subáreas:', error);
        }
      } else {
        setSubareas([]);
      }
    };

    getSubareas();
  }, [selectedArea]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const idCriador = decodedToken.id;
      const idPosto = decodedToken.idPosto;

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Append additional fields to formData
      formData.append('idCriador', idCriador);
      formData.append('idPosto', idPosto);
    formData.append('idArea', data.area);
    formData.append('idSubarea', data.subarea);

      // Append the file to formData
      if (data.foto) {
        formData.append('foto', data.foto[0]);
      }

      const response = await api.post('/estabelecimentos/criar', formData);

      // Exibir alerta de sucesso
      Swal.fire({
        title: "Sucesso",
        text: "Estabelecimento criado com sucesso!",
        icon: "success",
        confirmButtonColor: '#1D324F',
      });
  
      console.log('Estabelecimento criado:', response.data);
    } catch (error) {
      // Exibir alerta de erro
      Swal.fire({
        title: "Erro",
        text: "Erro ao criar estabelecimento, tente mais tarde.",
        icon: "error",
        confirmButtonColor: '#1D324F',
      });
  
      console.error('Erro ao criar estabelecimento:', error);
    }
  };

 return (
  <Box display="flex" justifyContent="center" mt={3}>
    <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: '1000px'}}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1D324F', textAlign: 'center' }}>
        Criar Estabelecimento
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1}}
      >
        <TextField 
          {...register('nome')} 
          label="Nome do Estabelecimento" 
          fullWidth 
          sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }} 
        />
        <TextField 
          {...register('descricao')} 
          label="Descrição" 
          fullWidth 
          multiline
          rows={4}
          sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }} 
        />
        <TextField 
          {...register('local')} 
          label="Local" 
          fullWidth 
          sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }} 
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="area-label">Área</InputLabel>
          <Select 
            {...register('area')} 
            labelId="area-label" 
            sx={{ backgroundColor: '#f2f2f2', borderRadius: 1 }}
          >
            {areas.map((area) => (
              <MenuItem key={area.id} value={area.id}>
                {area.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="subarea-label">Subárea</InputLabel>
          <Select 
            {...register('subarea')} 
            labelId="subarea-label" 
            sx={{ backgroundColor: '#f2f2f2', borderRadius: 1 }}
          >
            {subareas.map((subarea) => (
              <MenuItem key={subarea.id} value={subarea.id}>
                {subarea.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Controller
          name="foto"
          control={control}
          render={({ field }) => (
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ 
                mb: 2, 
                backgroundColor: '#1D324F', 
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#0b1a2d',
                },
              }}
            >
              Inserir Anexo
              <input
                type="file"
                hidden
                onChange={(e) => field.onChange(e.target.files[0])}
              />
            </Button>
          )}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ backgroundColor: '#1D324F', color: '#ffffff', borderRadius: 1 }}
        >
          Criar Estabelecimento
        </Button>
        <Button 
          variant="outlined" 
          component={Link} 
          to="/estabelecimentos"
          fullWidth 
          sx={{ 
            mt: 2, 
            borderRadius: 1, 
            color: '#1D324F', 
            backgroundColor: '#ffffff',
            borderColor: '#1D324F', 
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Paper>
  </Box>
);
}

export default CriarEstabelecimento;