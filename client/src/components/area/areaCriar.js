import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AddCircle, Delete, Home, Info } from '@mui/icons-material'; // Importe os ícones que você deseja usar
import api from '../api/api';

const icons = {
  AddCircle,
  Delete,
  Home,
  Info
};

const CreateAreaForm = () => {
  const [nome, setNome] = useState('');
  const [icone, setIcone] = useState('');

  const handleCreateArea = async () => {
    try {
      const response = await api.post('/areas', { nome, icone });
      console.log('Nova área criada:', response.data.data);
      // Lógica adicional após a criação da área, se necessário
    } catch (error) {
      console.error('Erro ao criar área:', error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleCreateArea}>
      <TextField
        label="Nome da área"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        required
      />
      <FormControl fullWidth>
        <InputLabel>Ícone da área</InputLabel>
        <Select
          value={icone}
          onChange={(e) => setIcone(e.target.value)}
          fullWidth
          required
        >
          {Object.keys(icons).map((icon) => (
            <MenuItem value={icon} key={icon}>
              {React.createElement(icons[icon])} {icon}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">Criar Área</Button>
    </form>
  );
};

export default CreateAreaForm;