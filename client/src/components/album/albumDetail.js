import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Fab,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import api from '../api/api';
import Swal from 'sweetalert2';
import EditarAlbum from './albumEditar'; 

const AlbumDetails = () => {
  const { albumId } = useParams(); 
  const [album, setAlbum] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    fetchAlbumDetails();
    fetchAlbumFotos();
  }, [albumId]);

  const handleDelete = async (fotoId) => {
    try {
      const result = await Swal.fire({
        title: 'Você tem certeza?',
        text: 'Esta ação não pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1D324F',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim, apagar!',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        await api.delete(`/album/${fotoId}/fotos`);
        setFotos(fotos.filter(foto => foto.id !== fotoId));
        Swal.fire({
          title: 'Foto apagada!',
          icon: 'success',
          confirmButtonColor: '#1D324F',
        });
      }
    } catch (error) {
      console.error('Erro ao apagar foto:', error);
      Swal.fire(
        'Erro!',
        'Ocorreu um erro ao apagar a foto. Tente novamente.',
        'error'
      );
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPhoto(file);
      await handleUploadPhoto(file);
    }
  };

  const handleUploadPhoto = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('foto', file);

    try {
      await api.post(`/album/${albumId}/fotos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewPhoto(null);
      fetchAlbumFotos(); // Refetch the album photos
    } catch (error) {
      console.error('Erro ao enviar foto:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  if (!album) {
    return <Typography variant="h6">A carregar...</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 0 }}>
          {album.nome}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          sx={{ mb: 2 }}
          onClick={() => setOpenEditDialog(true)} // Abre o modal de edição
        >
          Editar Álbum
        </Button>
      </Box>
      <Typography variant="body1" paragraph>
       {album.descricao}
      </Typography>
      <Grid container spacing={2}>
        {fotos.map((foto) => (
          <Grid item xs={12} sm={6} md={4} key={foto.id}>
            <Card sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="300"
                image={`${process.env.REACT_APP_API_URL}/uploads/albuns/${foto.foto}`}
                alt={foto.descricao}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Enviada por: {foto.criador.nome}
                </Typography>
              </CardContent>
              <IconButton 
                onClick={() => handleDelete(foto.id)} 
                sx={{ 
                  position: 'absolute', 
                  bottom: 8, 
                  right: 8, 
                  color: 'gray' 
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      <EditarAlbum
        open={openEditDialog}
        handleClose={() => setOpenEditDialog(false)}
        album={album} 
        aoEnviar={fetchAlbumDetails}
      />

      {/* Floating Action Button for uploading photos */}
      <Fab
        aria-label="add"
        onClick={handleFileInputClick}
        style={{ position: 'fixed', bottom: 35, right: 20, backgroundColor: '#1D324F' }}
      >
        <AddIcon style={{ color: '#fff' }} />
      </Fab>

      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />

      {uploading && (
        <Box sx={{ mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default AlbumDetails;
