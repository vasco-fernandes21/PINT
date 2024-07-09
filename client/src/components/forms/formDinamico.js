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
} from '@mui/material';
import api from '../api/api';

const FormDinamico = ({ idEvento, formulario }) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    console.log(formulario);

    useEffect(() => {
        setLoading(false);
    }, [formulario]);

    const handleChange = (id, value) => {
        setFormData({ ...formData, [id]: value });
    };

    const onSubmit = async (data) => {
        try {
            const response = await api.post(`/formulario/${idEvento}`, data);
            if (response.status === 201) {
                console.log('Formulário enviado com sucesso!');
            } else {
                console.error('Erro ao enviar formulário:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {!loading && formulario.map((form) => (
                <div key={form.id}>
                    <Typography variant="h4" style={{ fontWeight: '700' }}>{form.titulo}</Typography>
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
                                        disabled={!form.estado} // Desabilita se form.estado for false
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
                                        disabled={!form.estado} // Desabilita se form.estado for false
                                    />
                                )}
                                {field.type === 'checkbox' && (
                                    <FormControlLabel
                                        control={<Checkbox onChange={(e) => handleChange(field.id, e.target.checked)} />}
                                        label={field.label}
                                        disabled={!form.estado} // Desabilita se form.estado for false
                                    />
                                )}
                                {field.type === 'select' && (
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>{field.label}</InputLabel>
                                        <Select
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                            disabled={!form.estado} // Desabilita se form.estado for false
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
                        disabled={!form.estado} // Desabilita se form.estado for false
                    >
                        {form.estado ? 'Enviar' : 'O formulário já não se encontra disponível no momento'}
                    </Button>
                </div>
            ))}
            {loading && (
                <Typography variant="body1">Carregando campos do formulário...</Typography>
            )}
        </form>
    );
};

export default FormDinamico;
