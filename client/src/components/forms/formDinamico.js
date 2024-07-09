import React, { useState, useEffect } from 'react';
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import api from '../api/api';
import EditarForm from './formEditar';

const FormDinamico = ({ idEvento, formulario }) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editData, setEditData] = useState({ campos: [], titulo: '', textoAuxiliar: '' });
    const [selectedFormIndex, setSelectedFormIndex] = useState(null);

    useEffect(() => {
        setLoading(false);
    }, [formulario]);

    console.log('Formulários:', formulario);

    const handleChange = (id, value) => {
        setFormData({ ...formData, [id]: value });
    };

    const onSubmit = async (formularioId, respostas) => {
        try {
            const response = await api.post(`/formulario/responder/${formularioId}`, { respostas });
            if (response.status === 200) {
                console.log('Formulário enviado com sucesso!');
                setFormData({});
            } else {
                console.error('Erro ao enviar formulário:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error.message);
        }
    };

    const handleSubmit = async (e, formularioId) => {
        e.preventDefault();
        await onSubmit(formularioId, formData);
    };

    const handleOpenEditDialog = (index) => {
        setEditData(formulario[index]);
        setSelectedFormIndex(index);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    return (
        <form>
            {!loading && formulario && formulario.length > 0 ? (
                formulario.map((form, index) => (
                    <div key={form.id}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <Typography variant="h4" style={{ fontWeight: '700', flexGrow: 1 }}>{form.titulo}</Typography>
                            <IconButton onClick={() => handleOpenEditDialog(index)} color="primary" aria-label="Editar formulário">
                                <Edit />
                            </IconButton>
                        </div>
                        <Typography variant="body1">{form.textoAuxiliar}</Typography>
                        {form.campos && form.campos.length > 0 ? (
                            form.campos.map((field) => (
                                <div key={field.id}>
                                    {field.type === 'texto' && (
                                        <TextField
                                            label={field.label}
                                            fullWidth
                                            margin="normal"
                                            helperText={field.helperText}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                            disabled={!form.estado}
                                        />
                                    )}
                                    {field.type === 'numero' && (
                                        <TextField
                                            label={field.label}
                                            type="number"
                                            fullWidth
                                            margin="normal"
                                            helperText={field.helperText}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                            disabled={!form.estado}
                                        />
                                    )}
                                    {field.type === 'checkbox' && (
                                        <FormControlLabel
                                            control={<Checkbox onChange={(e) => handleChange(field.id, e.target.checked)} />}
                                            label={field.label}
                                            disabled={!form.estado}
                                        />
                                    )}
                                    {field.type === 'select' && (
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>{field.label}</InputLabel>
                                            <Select
                                                onChange={(e) => handleChange(field.id, e.target.value)}
                                                disabled={!form.estado}
                                            >
                                                {field.options.split(',').map((option, index) => (
                                                    <MenuItem key={index} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </div>
                            ))
                        ) : (
                            <Typography variant="body1">Nenhum campo encontrado.</Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ ml: 0, minWidth: '10%' }}
                            disabled={!form.estado}
                            onClick={(e) => handleSubmit(e, form.id)}
                        >
                            {form.estado ? 'Enviar' : 'O formulário já não se encontra disponível no momento'}
                        </Button>
                    </div>
                ))
            ) : (
                <Typography variant="body1">Carregando campos do formulário...</Typography>
            )}

            {selectedFormIndex !== null && (
                <EditarForm
                    open={openEditDialog}
                    handleClose={handleCloseEditDialog}
                    formulario={editData}
                />
            )}
        </form>
    );
};

export default FormDinamico;
