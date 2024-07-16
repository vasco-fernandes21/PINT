import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import api from '../api/api';

const AlbumDetails = () => {
  const { albumId } = useParams(); 
  const [album, setAlbum] = useState(null);
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await api.get(`/album/${albumId}`);
        setAlbum(response.data.data);
      } catch (error) {
        console.error('Error fetching album details:', error);
      }
    };

    const fetchAlbumFotos = async () => {
      try {
        const response = await api.get(`/album/${albumId}/fotos`);
        setFotos(response.data.data);
      } catch (error) {
        console.error('Error fetching album photos:', error);
      }
    };

    fetchAlbumDetails();
    fetchAlbumFotos();
  }, [albumId]);

  if (!album) {
    return <Typography variant="h6">Carregando...</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {album.nome}
      </Typography>
      <Typography variant="body1" paragraph>
        {album.descricao}
      </Typography>
      <Grid container spacing={2}>
        {fotos.map((foto) => (
          <Grid item xs={12} sm={6} md={4} key={foto.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`${process.env.REACT_APP_API_URL}/uploads/albuns/${foto.foto}`}
                alt={foto.descricao}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {foto.descricao}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AlbumDetails;