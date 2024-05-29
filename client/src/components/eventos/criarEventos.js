import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import api from '../api/api';

function CriarEvento() {
  const { register, handleSubmit, watch } = useForm();
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
      // Handle form submission
      const response = await api.post('/eventos/criar', {
        ...data,
        foto: data.foto[0], // assuming that 'foto' is a File object
        estado: false,
        idArea: selectedArea,
        idSubarea: data.subarea,
        // idCriador and idAdmin should be set according to your application's logic
      });
      console.log('Evento criado:', response.data);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <TextField {...register('titulo')} label="Título" fullWidth sx={{ marginBottom: '20px' }} />
      <TextField {...register('descricao')} label="Descrição" fullWidth sx={{ marginBottom: '20px' }} />
      <TextField {...register('data')} type="date" inputProps={{ shrink: true }} fullWidth sx={{ marginBottom: '20px' }} />
      <TextField {...register('hora')} type="time" inputProps={{ shrink: true }} fullWidth sx={{ marginBottom: '20px' }} />
      <TextField {...register('local')} label="Local" fullWidth sx={{ marginBottom: '20px' }} />
      <FormControl fullWidth sx={{ marginBottom: '20px' }}>
        <InputLabel id="area-label">Área</InputLabel>
        <Select {...register('area')} labelId="area-label">
          {Array.isArray(areas) && areas.map((area) => (
            <MenuItem key={area.id} value={area.id}>
              {area.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '20px' }}>
        <InputLabel id="subarea-label">Subárea</InputLabel>
        <Select {...register('subarea')} labelId="subarea-label">
          {Array.isArray(subareas) && subareas.map((subarea) => (
            <MenuItem key={subarea.id} value={subarea.id}>
              {subarea.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField {...register('foto')} type="file" fullWidth sx={{ marginBottom: '20px' }} />
      <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: '20px' }}>
        Criar Evento
      </Button>
    </Box>
  );
}

export default CriarEvento;
