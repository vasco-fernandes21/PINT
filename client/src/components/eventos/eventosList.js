import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Select, MenuItem, CardMedia, Box } from "@mui/material";
import { styled } from "@mui/system";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";

function EventosList() {
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
      let token = localStorage.getItem('token');
      if (!token) {
        token = sessionStorage.getItem('token');
      }
      const decodedToken = jwtDecode(token);
      const idPosto = decodedToken.idPosto;

      const params = { idPosto };
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
    marginBottom: 20,
    minWidth: 200,
  });

  const StyledCard = styled(Card)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  });

  const StyledCardContent = styled(CardContent)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });

  const StyledTypography = styled(Typography)({
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 600,
  });

  const StyledCardMedia = styled(CardMedia)({
    height: 140,
    objectFit: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>Eventos</Typography>
      <Box sx={{ marginBottom: 3, display: 'flex', gap: 2 }}>
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
      </Box>
      <Grid container spacing={3}>
        {eventos.map((evento) => (
          <Grid item xs={12} sm={6} md={4} key={evento.id}>
            <StyledCard>
              <StyledCardMedia
                component="img"
                image={process.env.REACT_APP_API_URL + '/uploads/eventos/' + evento.foto}
                alt={evento.titulo}
              />
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
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <Link to="/eventos/criar">
        <Fab aria-label="add" style={{ position: 'fixed', bottom: 35, right: 20, backgroundColor: '#1D324F' }}>
          <AddIcon style={{ color: '#fff' }} />
        </Fab>
    </Link>
      
    </Box>
  );
}

export default EventosList;
