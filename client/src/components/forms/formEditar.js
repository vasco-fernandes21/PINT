import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import api from '../api/api';

const EditarForm = ({ open, handleClose, formulario }) => {
  const [editData, setEditData] = useState(formulario);

  useEffect(() => {
    setEditData(formulario);
  }, [formulario]);

  const handleEditForm = async () => {
    try {
      const response = await api.put(`/formulario/${formulario.id}`, editData);
      if (response.status === 200) {
        console.log('Formulário editado com sucesso!');
        handleClose();
      } else {
        console.error('Erro ao editar formulário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao editar formulário:', error.message);
    }
  };

  const handleDeleteForm = async () => {
    try {
      const response = await api.delete(`/formulario/${formulario.id}`);
      if (response.status === 204) {
        console.log('Formulário excluído com sucesso!');
        handleClose();
      } else {
        console.error('Erro ao excluir formulário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir formulário:', error.message);
    }
  };

  const addField = () => {
    setEditData({
      ...editData,
      campos: [...editData.campos, { id: Date.now(), type: 'texto', label: '', options: '', helperText: '' }],
    });
  };

  const removeField = (index) => {
    const newCampos = [...editData.campos];
    newCampos.splice(index, 1);
    setEditData({ ...editData, campos: newCampos });
  };

  const handleChangeField = (index, fieldKey, value) => {
    const newCampos = [...editData.campos];
    newCampos[index][fieldKey] = value;
    setEditData({ ...editData, campos: newCampos });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Formulário</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="Título"
          fullWidth
          value={editData.titulo}
          onChange={(e) => setEditData({ ...editData, titulo: e.target.value })}
        />
        <TextField
          margin="normal"
          label="Texto Auxiliar"
          fullWidth
          value={editData.textoAuxiliar}
          onChange={(e) => setEditData({ ...editData, textoAuxiliar: e.target.value })}
        />
        {editData.campos && Array.isArray(editData.campos) ? editData.campos.map((field, index) => (
          <div key={field.id} style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FormControl fullWidth margin="normal" style={{ flex: 1, marginRight: '8px' }}>
                <InputLabel>Tipo de Campo</InputLabel>
                <Select
                  value={field.type}
                  onChange={(e) => handleChangeField(index, 'type', e.target.value)}
                >
                  <MenuItem value="texto">Texto</MenuItem>
                  <MenuItem value="numero">Número</MenuItem>
                  <MenuItem value="checkbox">Checkbox</MenuItem>
                  <MenuItem value="select">Select</MenuItem>
                </Select>
              </FormControl>
              <IconButton onClick={() => removeField(index)} color="primary" aria-label="Remover campo">
                <Delete />
              </IconButton>
            </div>
            <TextField
              margin="normal"
              label="Rótulo"
              fullWidth
              value={field.label}
              onChange={(e) => handleChangeField(index, 'label', e.target.value)}
            />
            {field.type === 'select' && (
              <TextField
                margin="normal"
                label="Opções (separadas por vírgulas)"
                fullWidth
                value={field.options}
                onChange={(e) => handleChangeField(index, 'options', e.target.value)}
              />
            )}
            <TextField
              margin="normal"
              label="Texto de Ajuda"
              fullWidth
              value={field.helperText}
              onChange={(e) => handleChangeField(index, 'helperText', e.target.value)}
            />
          </div>
        )) : null}
        <Button onClick={addField} variant="contained" sx={{ mt: 2 }}>Adicionar Campo</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleEditForm} variant="contained">Salvar Alterações</Button>
        <Button onClick={handleDeleteForm} variant="contained" color="secondary" startIcon={<Delete />}>
          Excluir Formulário
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarForm;
