import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Select, MenuItem } from "@material-ui/core";
import api from "../api/api";

function ListEventos() {
  const [eventos, setEventos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [subareas, setSubareas] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [subareaId, setSubareaId] = useState("");

  useEffect(() => {
    const fetchEventos = async () => {
      const response = await api.get(`/eventos?areaId=${areaId}&subareaId=${subareaId}`);
      setEventos(response.data.data);
    };

    const fetchAreas = async () => {
      const response = await api.get('/areas');
      setAreas(response.data.data);
    };

    const fetchSubareas = async () => {
      if (areaId) {
        const response = await api.get(`/subareas/${areaId}`);
        setSubareas(response.data.data);
      } else {
        setSubareas([]);
      }
    };

    fetchEventos();
    fetchAreas();
    fetchSubareas();
  }, [areaId, subareaId]);

  const handleAreaChange = (event) => {
    setAreaId(event.target.value);
  };

  const handleSubareaChange = (event) => {
    setSubareaId(event.target.value);
  };

  return (
    <div>
      <h1>Eventos</h1>
      <Select value={areaId} onChange={handleAreaChange}>
        {areas.map((area) => (
          <MenuItem value={area.id} key={area.id}>{area.nome}</MenuItem>
        ))}
      </Select>
      <Select value={subareaId} onChange={handleSubareaChange}>
        {subareas.map((subarea) => (
          <MenuItem value={subarea.id} key={subarea.id}>{subarea.nome}</MenuItem>
        ))}
      </Select>
      <Grid container spacing={3}>
        {eventos.map((evento) => (
          <Grid item xs={12} sm={6} md={4} key={evento.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {evento.titulo}
                </Typography>
                {/* Add more details about the evento */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ListEventos;