import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; 
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api/api';
import { Link, useParams } from 'react-router-dom';

function EditarEstabelecimento() {
  const { register, handleSubmit, watch, control, setValue } = useForm();
  const [areas, setAreas] = useState([]);
  const [subareas, setSubareas] = useState([]);
  const selectedArea = watch('area');
  const { id } = useParams(); // get the id from the URL

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/estabelecimentos/${id}`);
        const estabelecimento = response.data.data;
        Object.keys(estabelecimento).forEach((key) => {
          setValue(key, estabelecimento[key]);
        });
      } catch (error) {
        console.error('Erro ao buscar estabelecimento:', error);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado.');
      }

      const response = await api.put(`/estabelecimentos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      Swal.fire({
        title: "Sucesso",
        text: "Estabelecimento atualizado com sucesso!",
        icon: "success",
        confirmButtonColor: '#1D324F',
      });

      console.log('Estabelecimento atualizado:', response.data);
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "Erro ao atualizar estabelecimento, tente mais tarde.",
        icon: "error",
        confirmButtonColor: '#1D324F',
      });

      console.error('Erro ao atualizar estabelecimento:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: '1000px'}}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1D324F', textAlign: 'center' }}>
        Editar Estabelecimento
      </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1}}
        >
        <InputLabel htmlFor="nome">Nome do Estabelecimento</InputLabel>
          <TextField 
            {...register('nome')} 
            fullWidth 
            sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }} 
          />
          <InputLabel htmlFor="descricao">Descrição</InputLabel>
          <TextField 
            {...register('descricao')} 
            fullWidth 
            multiline
            rows={4}
            sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }} 
          />
          <InputLabel htmlFor="morada">Morada</InputLabel>
          <TextField 
            {...register('morada')} 
            fullWidth 
            sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }} 
          />
          <InputLabel htmlFor="latitude">Latitude</InputLabel>
          <TextField 
            {...register('latitude')} 
            fullWidth 
            multiline
            rows={4}
            sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }} 
          />
          <InputLabel htmlFor="longitude">Longitude</InputLabel>
          <TextField 
            {...register('longitude')} 
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
          <Button   
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ backgroundColor: '#1D324F', color: '#ffffff', borderRadius: 1 }}
            >
            Editar Estabelecimento
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
export default EditarEstabelecimento;