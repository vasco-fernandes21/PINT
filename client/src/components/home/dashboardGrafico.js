import React, { useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Grafico = () => {
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
      var data = window.google.visualization.arrayToDataTable([
        ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
        ['2004/05',  165,      938,         522,             998,           450,      614.6],
        ['2005/06',  135,      1120,        599,             1268,          288,      682],
        ['2006/07',  157,      1167,        587,             807,           397,      623],
        ['2007/08',  139,      1110,        615,             968,           215,      609.4],
        ['2008/09',  136,      691,         629,             1026,          366,      569.6]
      ]);

      var options = {
        title : 'Monthly Coffee Production by Country',
        vAxis: { title: 'Cups' },
        hAxis: { title: 'Month' },
        seriesType: 'bars',
        series: { 5: { type: 'line' } }
      };

      var chart = new window.google.visualization.ComboChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    };
  }, []);

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">Gráfico</Typography>
        <div id="chart_div" style={{ width: '100%', height: '400px' }}></div>
      </CardContent>
    </StyledCard>
  );
};

export default Grafico;
