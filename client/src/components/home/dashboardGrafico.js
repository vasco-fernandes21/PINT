import React, { useState, useEffect } from 'react';
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

const Grafico = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get('/eventos');
        setEventos(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error.response || error.message);
      }
    };

    fetchEventos();
  }, []);

  useEffect(() => {
    // Load the Google Charts library
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.async = true;
    script.onload = () => {
      // Once the library is loaded, set up the chart
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(drawVisualization);
    };
    document.body.appendChild(script);

    // Function to draw the chart
    const drawVisualization = () => {
      // Calcular a contagem de eventos por mês
      const eventosPorMes = calcularEventosPorMes(eventos);

      const data = new window.google.visualization.DataTable();
      data.addColumn('string', 'Mês');
      data.addColumn('number', 'Eventos');

      // Preencher os dados do gráfico com os eventos por mês
      eventosPorMes.forEach(item => {
        data.addRow([item.mes, item.total]);
      });

      const options = {
        title: 'Quantidade de Eventos por Mês',
        vAxis: { title: 'Eventos' },
        hAxis: { title: 'Mês' },
        legend: 'none',
        bar: { groupWidth: '90%' },
        colors: ['#1b9e77'], // Cor das colunas
      };

      const chart = new window.google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    };
  }, [eventos]); // Executar sempre que eventos mudar

  // Função para calcular eventos por mês
  const calcularEventosPorMes = (eventos) => {
    const eventosPorMes = {};

    eventos.forEach(evento => {
      const mesAno = new Date(evento.data).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
      if (!eventosPorMes[mesAno]) {
        eventosPorMes[mesAno] = { mes: mesAno, total: 0 };
      }
      eventosPorMes[mesAno].total++;
    });

    return Object.values(eventosPorMes);
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">Eventos por Mês</Typography>
        <div id="chart_div" style={{ width: '100%', height: '400px' }}></div>
      </CardContent>
    </StyledCard>
  );
};

export default Grafico;
