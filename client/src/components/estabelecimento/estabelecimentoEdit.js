import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'; 
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper, Dialog, DialogContent, DialogTitle } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api/api';
import { useParams } from 'react-router-dom';

function EditarEstabelecimento() {
  const { id } = useParams(); // Obtém o ID do estabelecimento da URL
  const { register, handleSubmit, watch, control, setValue } = useForm();
  const [areas, setAreas] = useState([]);
  const [subareas, setSubareas] = useState([]);
  const [open, setOpen] = useState(false); // Estado para controlar a abertura do diálogo

  const selectedArea = watch('area');

  // Busca das áreas disponíveis
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await api.get('/areas');
        setAreas(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar áreas:', error);
      }
    };

    fetchAreas();
  }, []);

  // Busca das subáreas baseadas na área selecionada
  useEffect(() => {
    const fetchSubareas = async () => {
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

    fetchSubareas();
  }, [selectedArea]);

  // Busca dos dados do estabelecimento para pré-preenchimento do formulário
  useEffect(() => {
    const fetchEstabelecimento = async () => {
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

    fetchEstabelecimento();
  }, [id, setValue]);

  // Função para lidar com o envio do formulário de edição
  const onSubmit = async (data) => {
    try {
      const response = await api.put(`/estabelecimentos/${id}`, data);

      Swal.fire({
        title: "Sucesso",
        text: "Estabelecimento atualizado com sucesso!",
        icon: "success",
        confirmButtonColor: '#1D324F',
      });

      console.log('Estabelecimento atualizado:', response.data);
      handleClose(); // Fecha o diálogo após o sucesso
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

  // Funções para controlar a abertura e o fechamento do diálogo
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }} 
          />
          <InputLabel htmlFor="longitude">Longitude</InputLabel>
          <TextField 
            {...register('longitude')} 
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
            onClick={handleClose} 
            fullWidth 
            sx={{ mt: 2, borderRadius: 1, color: '#1D324F', borderColor: '#1D324F' }}
          >
            Cancelar
          </Button>
        </Box>
      </Paper>

      {/* Diálogo para editar estabelecimento */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Estabelecimento</DialogTitle>
        <DialogContent>
          <Box>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Editar Estabelecimento
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default EditarEstabelecimento;
