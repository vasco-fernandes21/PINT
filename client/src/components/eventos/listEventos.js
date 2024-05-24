import * as React from "react";
import { useEffect } from "react";
import { Grid, Card, CardContent, Typography, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import api from "../api/api";

function ListEventos() {
  const [eventos, setEventos] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
  const [subareas, setSubareas] = React.useState([]);
  const [areaId, setAreaId] = React.useState("");
  const [subareaId, setSubareaId] = React.useState("");

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
        setSubareaId(""); 
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

  const StyledSelect = styled(Select)({
    marginBottom: 2,
    minWidth: 200,
  });

  const StyledCard = styled(Card)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  });

  const StyledCardContent = styled(CardContent)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });

  const StyledTypography = styled(Typography)({
    marginBottom: 1,
    fontSize: 20,
    fontWeight: 600,
  });

  return (
    <div>
      <h1>Eventos</h1>
      <StyledSelect value={areaId} onChange={handleAreaChange} displayEmpty>
        <MenuItem value="">Todas</MenuItem>
        {areas.map((area) => (
          <MenuItem value={area.id} key={area.id}>{area.nome}</MenuItem>
        ))}
      </StyledSelect>
      <StyledSelect value={subareaId} onChange={handleSubareaChange} displayEmpty disabled={!areaId}>
        <MenuItem value="">Selecione uma subárea</MenuItem>
        {subareas.map((subarea) => (
          <MenuItem value={subarea.id} key={subarea.id}>{subarea.nome}</MenuItem>
        ))}
      </StyledSelect>
      <Grid container spacing={2}>
        {eventos.map((evento) => (
          <Grid item xs={12} sm={6} key={evento.id}>
            <StyledCard>
              <StyledCardContent>
                <StyledTypography variant="h5" component="h2">
                  {evento.titulo}
                </StyledTypography>
                <Typography variant="body2" color="text.secondary">
                  Data: {evento.data}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Local: {evento.local}
                </Typography>
                {/* Adicione mais detalhes conforme necessário */}
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ListEventos;
