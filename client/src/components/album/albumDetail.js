import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Fab,
  TextField,
  CircularProgress
} from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import api from "../api/api";

function AlbumDetail() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await api.get(`/album/${albumId}`);
        setAlbum(response.data);
      } catch (error) {
        console.error('Error fetching album details:', error);
      }
    };

    fetchAlbum();
  }, [albumId]);

  const handleFileChange = (event) => {
    setNewPhoto(event.target.files[0]);
  };

  const handleUploadPhoto = async () => {
    if (newPhoto) {
      setUploading(true);
      const formData = new FormData();
      formData.append('foto', newPhoto);

      try {
        await api.post(`/album/${albumId}/fotos`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setOpen(false);
        setNewPhoto(null);
        setUploading(false);
        // Refetch the album details to show the new photo
        const response = await api.get(`/album/${albumId}`);
        setAlbum(response.data);
      } catch (error) {
        console.error('Error uploading photo:', error);
        setUploading(false);
      }
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {album ? (
        <Card>
          <CardMedia
            component="img"
            image={`${process.env.REACT_APP_API_URL}/uploads/albuns/${album.foto}`}
            alt={album.nome}
            sx={{ height: 300, objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="h5">{album.nome}</Typography>
            <Typography variant="body2" color="text.secondary">{album.descricao}</Typography>
          </CardContent>
        </Card>
      ) : (
        <CircularProgress />
      )}

      <Fab
        aria-label="add"
        onClick={() => setOpen(true)}
        style={{ position: 'fixed', bottom: 35, right: 20, backgroundColor: '#1D324F' }}
      >
        <AddIcon style={{ color: '#fff' }} />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Upload de Foto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione uma foto para adicionar ao álbum.
          </DialogContentText>
          <Box component="form" noValidate>
            <TextField
              type="file"
              onChange={handleFileChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleUploadPhoto}
              color="primary"
              disabled={uploading}
              fullWidth
            >
              {uploading ? <CircularProgress size={24} /> : 'Upload Foto'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default AlbumDetail;
