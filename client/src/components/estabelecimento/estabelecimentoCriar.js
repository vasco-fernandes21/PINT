import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; 
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api/api';

function CriarEstabelecimento({ handleClose }) {
  const { register, handleSubmit, watch, control } = useForm();
  const [areas, setAreas] = useState([]);
  const [subareas, setSubareas] = useState([]);
  const selectedArea = watch('area');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/areas');
        setAreas(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar áreas:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [selectedArea]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === 'latitude' || key === 'longitude') {
        formData.append(key, data[key] || null);
      } else {
        formData.append(key, data[key]);
      }
    });

      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado.');
      }

      // Get user data
      const userResponse = await api.get('/utilizador', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      formData.append('estado', false);
      formData.append('idArea', selectedArea);
      formData.append('idSubarea', data.subarea);
      formData.append('idCriador', userResponse.data.id);
      formData.append('idPosto', userResponse.data.idPosto)

      const response = await api.post('/estabelecimentos/criar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      Swal.fire({
        title: "Sucesso",
        text: "Estabelecimento criado com sucesso!",
        icon: "success",
        confirmButtonColor: '#1D324F',
      });

      console.log('Estabelecimento criado:', response.data);
      handleClose();  // Close the dialog on successful submission
    } catch (error) {
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
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
        {...register('morada')} 
        label="Morada" 
        fullWidth 
        sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }} 
      />
      <TextField 
        {...register('latitude')} 
        label="Latitude" 
        fullWidth 
        multiline
        rows={4}
        sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }} 
      />
      <TextField 
        {...register('longitude')} 
        label="Longitude" 
        fullWidth 
        multiline
        rows={4}
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button type="submit" color="primary">
          Criar Estabelecimento
        </Button>
      </Box>
    </Box>
  );
}

export default CriarEstabelecimento;
