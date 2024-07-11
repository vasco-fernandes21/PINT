import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import ValidacaoEventos from './validacaoEvento';
import ValidacaoEstabelecimentos from './validacaoEstabelecimento';

const Validacao = () => {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

  const handleChange = (event) => {
    setOpcaoSelecionada(event.target.value);
  };

  const renderGrelha = () => {
    switch (opcaoSelecionada) {
      case 'eventos':
        return <ValidacaoEventos />;
      case 'estabelecimentos':
        return <ValidacaoEstabelecimentos />;
      default:
        return <Typography variant="h6">Selecione uma opção para moderação</Typography>;
    }
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1D324F', marginBottom: 4, fontWeight: 'bold' }}>
        Moderação
      </Typography>
      <FormControl fullWidth margin="dense">
        <InputLabel>Selecione a validação</InputLabel>
        <Select value={opcaoSelecionada} onChange={handleChange}>
          <MenuItem value="eventos">Eventos</MenuItem>
          <MenuItem value="estabelecimentos">Estabelecimentos</MenuItem>
        </Select>
      </FormControl>
      {renderGrelha()}
    </div>
  );
};

export default Validacao;
