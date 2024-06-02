import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, MenuItem, CardMedia, Box } from "@mui/material";
import { styled } from "@mui/system";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Select from "@mui/material/Select";
import api from "../api/api";

function EstabelecimentoList() {
  const [estabelecimentos, setEstabelecimentos] = React.useState([]);
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
  const getEstabelecimentos = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
      token = sessionStorage.getItem('token');
    }

    const params = { idPosto: token };
    if (areaId) {
      params.areaId = areaId;
    }
    if (subareaId) {
      params.subareaId = subareaId;
    }
    const response = await api.get(`/estabelecimentos`, { params });
    setEstabelecimentos(response.data.data);
  };

  getEstabelecimentos();
}, [areaId, subareaId]);

  const handleAreaChange = (event) => {
    setAreaId(event.target.value);
    if (event.target.value === "") {
      setSubareaId("");
      setEstabelecimentos([]);
    }
  };

  const handleSubareaChange = (event) => {
    setSubareaId(event.target.value);
  };

  const StyledSelectArea = styled(Select)({
    marginBottom: 20,
    minWidth: 200,
    borderRadius: 20,
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
    minWidth: 200,
    borderRadius: 20,
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
    borderRadius: 10,
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
    height: 200,  
    objectFit: 'cover',  
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  });

  return (
    <Box sx={{ padding: 2, paddingTop: 0 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold' }}>Estabelecimentos</Typography>
      <Grid container spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <Grid container spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{marginBottom: 2}}>
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
        {estabelecimentos.map((estabelecimento) => (
          <Grid item xs={12} sm={6} md={4} key={estabelecimento.id}>
            <StyledCard>
              <StyledCardMedia
                component="img"
                image={`${process.env.REACT_APP_API_URL}/uploads/estabelecimentos/${estabelecimento.foto}`}
                alt={estabelecimento.nome}
              />
              <StyledCardContent>
                <StyledTypography variant="h5" component="h2">
                  {estabelecimento.nome}
                </StyledTypography>
                <Typography variant="body2" color="text.secondary">
                  Local: {estabelecimento.local}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Descrição: {estabelecimento.descricao}
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <Link to="/estabelecimentos/criar">
        <Fab aria-label="add" style={{ position: 'fixed', bottom: 35, right: 20, backgroundColor: '#1D324F' }}>
          <AddIcon style={{ color: '#fff' }} />
        </Fab>
      </Link>
    </Box>
  );
}

export default EstabelecimentoList;
