import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import 'moment/locale/pt';

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventosCalendario = async () => {
      try {
        const response = await api.get('/eventos');
        const eventosFormatados = response.data.data.map(evento => ({
          id: evento.id,
          title: evento.titulo,
          start: new Date(`${evento.data}T${evento.hora}`),
          end: new Date(`${evento.data}T${evento.hora}`),
          description: evento.descricao,
        }));
        setEventos(eventosFormatados);
      } catch (error) {
        console.error('Erro ao procurar eventos:', error.response || error.message);
      }
    };

    fetchEventosCalendario();
  }, []);

  const handleSelectEvent = (event) => {
    navigate(`/eventos/${event.id}`);
  };

  return (
    <div style={{ height: '80vh' }}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={handleSelectEvent} 
        messages={{
          next: "Seguinte",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
        }}
      />
    </div>
  );
};

export default Calendario;
