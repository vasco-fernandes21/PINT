import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form'; 
import { TextField, Button, Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api/api';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'; 

function EditarAlbum({ open, handleClose, album, aoEnviar }) {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate(); 
  const [foto, setFoto] = useState(album?.foto || ''); // Estado para foto do álbum
  const [newPhoto, setNewPhoto] = useState(null); // Estado para a nova foto
  const inputFileRef = useRef(null);

  useEffect(() => {
    if (album) {
      setValue('nome', album.nome);
      setValue('descricao', album.descricao);
      setFoto(album.foto); // Atualiza o estado com a foto do álbum atual
    }
  }, [album, setValue]);

  const onSubmit = async (data) => {
    handleClose();
  
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você deseja editar este álbum?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d324f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, editar!',
      cancelButtonText: 'Não, cancelar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const formData = new FormData();
          formData.append('nome', data.nome);
          formData.append('descricao', data.descricao);
          if (newPhoto) {
            formData.append('foto', newPhoto);
          }

          const response = await api.put(`/album/${album.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          aoEnviar();
          Swal.fire({
            title: 'Sucesso',
            text: 'Álbum atualizado com sucesso!',
            icon: 'success',
            confirmButtonColor: '#1D324F',
          }).then((result) => {
            if (result.isConfirmed) {
              console.log('Álbum atualizado:', response.data);
              handleClose();
              navigate(`/albuns/${album.id}`); // Navega para a página do álbum atualizado
            }
          });
        } catch (error) {
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao atualizar álbum, tente mais tarde.',
            icon: 'error',
            confirmButtonColor: '#1D324F',
          });
  
          console.error('Erro ao atualizar álbum:', error);
        }
      } else {
        Swal.fire({
          title: 'Cancelado',
          text: 'A edição do álbum foi cancelada',
          icon: 'error',
          confirmButtonColor: '#1d324f',
        });
      }
    });
  };

  const apagarAlbum = async (id) => {
    handleClose();

    Swal.fire({
      title: 'Tem certeza?',
      text: "Você deseja apagar este álbum?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d324f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Não, cancelar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/album/${id}`);
          if (response.status === 200) {
            Swal.fire({
              title: "Sucesso",
              text: "Álbum apagado com sucesso!",
              icon: "success",
              confirmButtonColor: '#1D324F',
            });
            navigate('/albuns'); // Navega para a lista de álbuns após apagar
          } else {
            Swal.fire({
              title: "Erro",
              text: "Erro ao apagar álbum, tente mais tarde.",
              icon: "error",
              confirmButtonColor: '#1D324F',
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Erro",
            text: "Erro ao apagar álbum, tente mais tarde.",
            icon: "error",
            confirmButtonColor: '#1D324F',
          });
          console.error('Erro ao apagar álbum:', error);
        }
      } else {
        Swal.fire({
          title: 'Cancelado',
          text: 'A operação de apagar o álbum foi cancelada',
          icon: 'error',
          confirmButtonColor: '#1d324f',
        });
      }
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPhoto(file);
      setFoto(URL.createObjectURL(file)); // Atualiza a visualização da foto
    }
  };

  const handleFileClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          height: 'auto', 
          width: '80vw', 
          position: 'relative' 
        },
      }}
    >
      <DialogTitle>Editar Álbum</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1, position: 'relative' }}
        >
          <TextField
            {...register('nome')}
            label="Nome do Álbum"
            fullWidth
            sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }}
          />
          <TextField
            {...register('descricao')}
            label="Descrição"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2, backgroundColor: '#f2f2f2', borderRadius: 1 }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#1D324F',
              '&:hover': { backgroundColor: '#1d324f' },
              borderRadius: 1,
              mb: 1, 
              ml: 0
            }}
            type="submit"
          >
            Editar Álbum
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            fullWidth
            sx={{ borderRadius: 1, color: '#1D324F', borderColor: '#1D324F', ml: 0}}
          >
            Cancelar
          </Button>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={handleFileClick}
              sx={{ mt: 2 }}
            >
              Editar Foto do Álbum
            </Button>
            <IconButton
            color="default"
            onClick={() => apagarAlbum(album.id)}
            style={{ position: 'absolute', bottom: 4, right: 10 }} // Posiciona o ícone no canto inferior direito
          >
            <DeleteIcon sx={{ color: '#6c757d', fontSize: '30px'}} /> 
          </IconButton>
          </Box>
        </Box>
      </DialogContent>

      {/* Input de arquivo oculto */}
      <input
        type="file"
        ref={inputFileRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Dialog>
  );
}

export default EditarAlbum;
