import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  MenuItem,
  CardMedia,
  Box,
  Dialog,
  Fab,
  Select,
  DialogContent,
  DialogTitle,
  DialogContentText
} from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import api from "../api/api";
import CriarAlbum from "./albumCriar"; // Atualize o caminho se necessário

function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [areas, setAreas] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [idPosto, setIdPosto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getAreas = async () => {
      const response = await api.get('/areas');
      setAreas(response.data.data);
    };

    getAreas();
  }, []);

  useEffect(() => {
    const getIdPosto = async () => {
      const response = await api.get('/utilizador');
      setIdPosto(response.data.idPosto);
    };

    getIdPosto();
  }, []);

  const getAlbums = async () => {
    const params = {};
    if (areaId) {
      params.areaId = areaId;
    }
    if (idPosto) {
      params.idPosto = idPosto;
    }
    console.log('Sending request with params:', params);
    try {
      const response = await api.get(`/album`, { params });
      console.log('Received response:', response);
      setAlbums(response.data.data);
    } catch (error) {
      console.error('Error fetching albums:', error.response || error.message);
    }
  };

  useEffect(() => {
    if (idPosto !== null) {
      getAlbums();
    }
  }, [areaId, idPosto]);

  const handleAreaChange = (event) => {
    setAreaId(event.target.value);
  };

  const handleAlbumCreated = () => {
    setOpen(false);
    getAlbums(); 

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

  const StyledCard = styled(Card)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 4,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  });

  const StyledCardContent = styled(CardContent)({
    textAlign: 'center',
  });

  const StyledTypography = styled(Typography)({
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 600,
  });

  const StyledCardMedia = styled(CardMedia)({
    height: 200,
    objectFit: 'cover',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  });

  return (
    <Box sx={{ padding: 1, paddingTop: 0 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold'}}>Álbuns</Typography>
      <Grid container spacing={1} direction={{ xs: 'column', sm: 'row' }} alignItems="center">
        <Grid container spacing={1} direction={{ xs: 'column', sm: 'row' }} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={2}>
            <StyledSelectArea value={areaId} onChange={handleAreaChange} displayEmpty fullWidth>
              <MenuItem value="">Todas</MenuItem>
              {areas.map((area) => (
                <MenuItem value={area.id} key={area.id}>{area.nome}</MenuItem>
              ))}
            </StyledSelectArea>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {albums.map((album) => {
          const imageUrl = process.env.REACT_APP_API_URL + '/uploads/albuns/' + album.foto;
          return (
            <Grid item xs={12} sm={6} md={4} key={album.id}>
              <StyledCard>
                <StyledCardMedia
                  component="img"
                  image={imageUrl}
                  alt={album.nome}
                />
                <StyledCardContent>
                  <Link to={`/albuns/${album.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <StyledTypography variant="h5" component="h2">
                      {album.nome}
                    </StyledTypography>
                    <Typography variant="body2" color="text.secondary">
                      {album.descricao}
                    </Typography>
                  </Link>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
      <Fab aria-label="add" onClick={() => setOpen(true)} style={{ position: 'fixed', bottom: 35, right: 20, backgroundColor: '#1D324F' }}>
        <AddIcon style={{ color: '#fff' }} />
      </Fab>
      <Dialog open={open} handleAlbumCreated onClose={() => setOpen(false)}  maxWidth="md" fullWidth>
        <DialogTitle>Criar Álbum</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha os campos abaixo para criar um novo álbum.
          </DialogContentText>
          <CriarAlbum open={open} handleClose={() => setOpen(false)} handleAlbumCreated={handleAlbumCreated} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default AlbumList;