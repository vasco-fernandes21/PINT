import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, MenuItem, CardMedia, Box, Dialog, Fab, Select, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import api from "../api/api";
import CriarEvento from "./eventoCriar";

function EventoList() {
  const [eventos, setEventos] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
  const [subareas, setSubareas] = React.useState([]);
  const [areaId, setAreaId] = React.useState("");
  const [subareaId, setSubareaId] = React.useState("");
  const [idPosto, setIdPosto] = React.useState(null);
  const [open, setOpen] = useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getIdPosto = async () => {
      const response = await api.get('/utilizador');
      setIdPosto(response.data.idPosto);
    };
  
    getIdPosto();
  }, []);

  useEffect(() => {
    const getEventos = async () => {
      const params = {};
      if (areaId) {
        params.areaId = areaId;
      }
      if (subareaId) {
        params.subareaId = subareaId;
      }
      if (idPosto) {
        params.idPosto = idPosto;
      }
      console.log('Sending request with params:', params);
      try {
        const response = await api.get(`/eventos`, { params });
        console.log('Received response:', response);
        setEventos(response.data.data);
      } catch (error) {
        console.error('Error fetching eventos:', error.response || error.message);
      }
    };

    if (idPosto !== null) {
      getEventos();
    }
  }, [areaId, subareaId, idPosto]);

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

  const StyledSelectArea = styled(Select)({
    marginBottom: 20,
    marginLeft: 10,
    minWidth: 200,
    borderRadius: 10,
    backgroundColor: '#1D324F',
    color: '#fff',
    '& .MuiSelect-icon': {
      color: '#fff',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1D324F',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1D324F',
    },
  });

  const StyledSelectSubarea = styled(Select)({
    marginBottom: 20,
    marginLeft: 10,
    minWidth: 200,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#1D324F',
    '& .MuiSelect-icon': {
      color: '#1D324F',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1D324F',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1D324F',
    },
  });   

  const StyledCard = styled(Card)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 4,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  });

  const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
  });

  const StyledTypography = styled(Typography)({
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 600,
  });

  const StyledCardMedia = styled(CardMedia)({
    height: 200,  // Fix the height of the image
    objectFit: 'cover',  // Ensure the image covers the area
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  });

  return (
    <Box sx={{ padding: 1, paddingTop: 0 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Eventos</Typography>
      <Grid container spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Grid container spacing={1} direction={{ xs: 'column', sm: 'row' }} sx={{marginBottom: 2}}>
          <Grid item xs={12} sm={2}>
            <StyledSelectArea value={areaId} onChange={handleAreaChange} displayEmpty fullWidth>
              <MenuItem value="">Todas</MenuItem>
              {areas.map((area) => (
                <MenuItem value={area.id} key={area.id}>{area.nome}</MenuItem>
              ))}
            </StyledSelectArea>
          </Grid>
          <Grid item xs={12} sm={2}>
            <StyledSelectSubarea value={subareaId} onChange={handleSubareaChange} displayEmpty disabled={!areaId} fullWidth>
              <MenuItem value="">Todas</MenuItem>
              {subareas.map((subarea) => (
                <MenuItem value={subarea.id} key={subarea.id}>{subarea.nome}</MenuItem>
              ))}
            </StyledSelectSubarea>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {eventos.map((evento) => {
          const imageUrl = process.env.REACT_APP_API_URL + '/uploads/eventos/' + evento.foto;
          return (
            <Grid item xs={12} sm={6} md={4} key={evento.id}>
              <StyledCard>
                <StyledCardMedia
                  component="img"
                  image={imageUrl}
                  alt={evento.titulo}
                />
                <StyledCardContent>
                  <Link to={`/eventos/${evento.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <StyledTypography variant="h5" component="h2">
                    {evento.titulo}
                  </StyledTypography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    Data: {new Date(evento.data).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hora: {evento.hora.split(':').slice(0, 2).join(':')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Morada: {evento.morada}
                  </Typography>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
      <Fab aria-label="add" onClick={handleClickOpen} style={{ position: 'fixed', bottom: 35, right: 20, backgroundColor: '#1D324F' }}>
        <AddIcon style={{ color: '#fff' }} />
      </Fab>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Criar Evento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha os campos abaixo para criar um novo evento.
          </DialogContentText>
          <CriarEvento open={open} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default EventoList;
