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

const FormDinamico = ({ idEvento, campos }) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    console.log(campos);

    useEffect(() => {
        setLoading(false);  
    }, [campos]);

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
            {loading ? (
                <Typography variant="body1">Carregando campos do formulário...</Typography>
            ) : (
                campos && campos.length > 0 ? (
                    campos.map((field) => (
                        <div key={field.id}>
                            {field.title && (
                                <Typography variant="h6" gutterBottom>
                                    {field.title}
                                </Typography>
                            )}
                            {field.type === 'texto' && (
                                <TextField
                                    label={field.label}
                                    fullWidth
                                    margin="normal"
                                    helperText={field.helperText}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
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
                                />
                            )}
                            {field.type === 'checkbox' && (
                                <FormControlLabel
                                    control={<Checkbox onChange={(e) => handleChange(field.id, e.target.checked)} />}
                                    label={field.label}
                                />
                            )}
                            {field.type === 'select' && (
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>{field.label}</InputLabel>
                                    <Select onChange={(e) => handleChange(field.id, e.target.value)}>
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
                )
            )}
            {!loading && (
                <Button type="submit" variant="contained">Submit</Button>
            )}
        </form>
    );
};

export default FormDinamico;
