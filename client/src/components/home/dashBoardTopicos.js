import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import api from '../api/api';

const StyledDataGrid = styled(DataGrid)({
  height: '30vh',
  padding: '10px',
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '1px',
  '& .MuiDataGrid-root': {
    border: 'none',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  },
});

const columns = [
  { field: 'name', headerName: 'Área', width: 100, align: 'left' },
  { field: 'eventos', headerName: 'Eventos', headerAlign: 'center', type: 'number', width: 200, align: 'center' },
  { field: 'estabelecimentos', headerName: 'Estabelecimentos', headerAlign: 'center', type: 'number', width: 200, align: 'center' },
];

const Topicos = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const areasResponse = await api.get('/areas');
        const eventosResponse = await api.get('/estatistica/eventos');
        const estabelecimentosResponse = await api.get('/estatistica/estabelecimentos');

        const eventosData = eventosResponse.data.data.reduce((acc, item) => {
          acc[item.idArea] = item.contador;
          return acc;
        }, {});

        const estabelecimentosData = estabelecimentosResponse.data.data.reduce((acc, item) => {
          acc[item.idArea] = item.contador;
          return acc;
        }, {});

        const areasData = areasResponse.data.data;

        const mergedData = areasData.map((area) => ({
          id: area.id,
          name: area.nome,
          eventos: eventosData[area.id] || 0,
          estabelecimentos: estabelecimentosData[area.id] || 0,
        }));

        setRows(mergedData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 610, width: '100%' }}>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        disableSelectionOnClick
        hideFooter={true}
      />
    </div>
  );
};

export default Topicos;