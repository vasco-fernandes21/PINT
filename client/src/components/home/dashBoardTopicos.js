import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import api from '../api/api';

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  padding: '20px',
  overflow: 'hidden',
});

const columns = [
  { field: 'name', headerName: 'Área', width: 150 },
  { field: 'eventos', headerName: 'Eventos', type: 'number', width: 100 },
  { field: 'estabelecimentos', headerName: 'Estabelecimentos', type: 'number', width: 150 },
];


const Topicos = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        const areas = [
          { id: 1, name: 'Saúde' },
          { id: 2, name: 'Desporto' },
          { id: 3, name: 'Formação' },
          { id: 4, name: 'Gastronomia' },
          { id: 5, name: 'Alojamento' },
          { id: 6, name: 'Transportes' },
          { id: 7, name: 'Lazer' },
        ];

        const mergedData = areas.map((area) => ({
          id: area.id,
          name: area.name,
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
    <StyledCard>
      <CardContent>
        <div style={{ height: 'auto', width: '100%', overflow: 'hidden' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            hideFooter
            checkboxSelection={false}
          />
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default Topicos;
