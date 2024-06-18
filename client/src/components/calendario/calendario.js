import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../api/api';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import 'moment/locale/pt';

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate(); // Use o hook useNavigate

  useEffect(() => {
    const fetchEventosCalendario = async () => {
      try {
        const response = await api.get('/eventos');
        const eventosFormatados = response.data.data.map(evento => ({
          id: evento.id, // Adicione o id do evento para navegação
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

  const handleSelectEvent = (event) => {
    navigate(`/eventos/${event.id}`); // Navegue para a página do evento usando o id
  };

  return (
    <div style={{ height: '80vh' }}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={handleSelectEvent} // Adicione o manipulador de evento
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
