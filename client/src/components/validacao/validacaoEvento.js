import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import api from '../api/api';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ValidacaoEventos = () => {
  const [eventos, setEventos] = useState([]); // Inicializa como um array vazio

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await api.get('/eventos');
      if (Array.isArray(response.data)) {
        setEventos(response.data);
      } else {
        console.error('Erro: a resposta da API não é um array');
      }
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  const handleClickOpen = (row) => {
    console.log("Row clicked: ", row);
    // Adicione sua lógica aqui
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'titulo', headerName: 'Título', width: 200 },
    { field: 'descricao', headerName: 'Descrição', width: 250 },
    { field: 'data', headerName: 'Data', width: 150 },
    { field: 'estado', headerName: 'Estado', width: 100, type: 'boolean' },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleClickOpen(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const rows = eventos.map((evento) => ({
    ...evento,
    data: new Date(evento.data).toLocaleDateString('pt-PT'),
  }));

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default ValidacaoEventos;
