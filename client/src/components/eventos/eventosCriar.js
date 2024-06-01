import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import api from '../api/api';

function CriarEvento() {
  const { register, handleSubmit, watch, control } = useForm();
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
      formData.append('estado', false);
      formData.append('idArea', selectedArea);
      formData.append('idSubarea', data.subarea);
      formData.append('idCriador', idCriador);
      formData.append('idPosto', idPosto);

      const response = await api.post('/eventos/criar', formData);

      // Exibir alerta de sucesso
     Swal("Sucesso", "Evento criado com sucesso!", "success");
  
      console.log('Evento criado:', response.data);
    } catch (error) {
      // Exibir alerta de erro
      Swal("Erro", "Erro ao criar evento, tente mais tarde.", "error");
  
      console.error('Erro ao criar evento:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: '1000px'}}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1D324F', textAlign: 'center' }}>
          Criar Evento
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1}}
        >
          <TextField 
            {...register('titulo')} 
            label="Nome do Evento" 
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
          <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
            <TextField 
              {...register('data')} 
              type="date" 
              label="Data" 
              InputLabelProps={{ shrink: true }} 
              sx={{ backgroundColor: '#f2f2f2', borderRadius: 1, width: '48%' }} 
            />
            <TextField 
              {...register('hora')} 
              type="time" 
              label="Hora" 
              InputLabelProps={{ shrink: true }} 
              sx={{ backgroundColor: '#f2f2f2', borderRadius: 1, width: '48%' }} 
            />
          </Box>
          <TextField 
            {...register('local')} 
            label="Local" 
            fullWidth 
            sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }} 
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="area-label">Tipo de Evento</InputLabel>
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
            <InputLabel id="subarea-label">Subtipo</InputLabel>
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
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              sx={{ backgroundColor: '#1D324F', color: '#ffffff', borderRadius: 1 }}
            >
              Criar Evento
            </Button>
            <Button 
              variant="outlined" 
              sx={{ 
                borderRadius: 1, 
                color: '#1D324F', 
                backgroundColor: '#ffffff',
                fontWeight: 'bold',
                borderColor: '#1D324F', // Adicione esta linha
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              Cancelar
</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default CriarEvento;
