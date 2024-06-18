import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../api/api'; // Certifique-se de que o caminho para o módulo 'api' está correto

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventosCalendario = async () => {
      try {
        const response = await api.get('/eventos');
        const eventosFormatados = response.data.data.map(evento => ({
          title: evento.titulo,
          start: new Date(`${evento.data}T${evento.hora}`),
          end: new Date(`${evento.data}T${evento.hora}`),
          description: evento.descricao,
        }));
        setEventos(eventosFormatados);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error.response || error.message);
      }
    };

    fetchEventosCalendario();
  }, []);

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default Calendario;
