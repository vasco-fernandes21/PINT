import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Select, MenuItem, makeStyles } from "@material-ui/core";
import api from "../api/api";

function ListEventos() {
  const [eventos, setEventos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [subareas, setSubareas] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [subareaId, setSubareaId] = useState("");

  useEffect(() => {
    const getAreas = async () => {
      const response = await api.get('/areas');
      setAreas(response.data.data);
    };

    getAreas();
  }, []);

  useEffect(() => {
    const getSubareas = async () => {
      if (areaId) {
        const response = await api.get(`/areas/${areaId}`);
        setSubareas(response.data.data);
        setSubareaId(""); // Reset subareaId when areaId changes
      } else {
        setSubareas([]);
      }
    };

    getSubareas();
  }, [areaId]);

  useEffect(() => {
    const getEventos = async () => {
      const params = {};
      if (areaId) {
        params.areaId = areaId;
      }
      if (subareaId) {
        params.subareaId = subareaId;
      }
      const response = await api.get(`/eventos`, { params });
      setEventos(response.data.data);
    };

    getEventos();
  }, [areaId, subareaId]);

  const handleAreaChange = (event) => {
    setAreaId(event.target.value);
    if (event.target.value === "") {
      setSubareaId("");
      setEventos([]);
    }
  };

  const handleSubareaChange = (event) => {
    setSubareaId(event.target.value);
  };

  const useStyles = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(2),
    },
    select: {
      marginBottom: theme.spacing(2),
      minWidth: 200,
    },
    card: {
      height: "100%",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      marginBottom: theme.spacing(1),
      fontSize: 20,
      fontWeight: 600,
    },
  }));


  return (
    <div>
      <h1>Eventos</h1>
      <Select value={areaId} onChange={handleAreaChange} displayEmpty>
        <MenuItem value="">Todas</MenuItem>
        {areas.map((area) => (
          <MenuItem value={area.id} key={area.id}>{area.nome}</MenuItem>
        ))}
      </Select>
      <Select value={subareaId} onChange={handleSubareaChange} displayEmpty disabled={!areaId}>
        <MenuItem value="">Selecione uma subárea</MenuItem>
        {subareas.map((subarea) => (
          <MenuItem value={subarea.id} key={subarea.id}>{subarea.nome}</MenuItem>
        ))}
      </Select>
      <Grid container spacing={2}>
        {eventos.map((evento) => (
          <Grid item xs={12} sm={6} md={6} key={evento.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {evento.titulo}
                </Typography>
                {/* Add more details about the event */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ListEventos;
