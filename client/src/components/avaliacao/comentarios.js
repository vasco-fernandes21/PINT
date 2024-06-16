import React, { useState } from 'react';
import { Box, Typography, Rating, Avatar, Stack, Pagination, Menu, MenuItem, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import api from '../api/api';
import Swal from 'sweetalert2';

function Comentarios({ avaliacoes, page, itemsPerPage, noOfPages, handleChange, fetchAvaliacoes, tipo }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAvaliacao, setSelectedAvaliacao] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, avaliacao) => {
    console.log('handleClick', avaliacao);
    setAnchorEl(event.currentTarget);
    setSelectedAvaliacao(avaliacao);
  };

  const handleClose = () => {
    setAnchorEl(null);  
  };

  const handleEdit = () => {
    setOpenDialog(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    try {
      await api.put(`/avaliacao/${tipo}/${selectedAvaliacao.id}`, selectedAvaliacao);
      setOpenDialog(false);
      await fetchAvaliacoes(); // Atualiza a lista de avaliações
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedAvaliacao) {
      console.error('Nenhuma avaliação selecionada para excluir');
      return;
    }

    const result = await Swal.fire({
      title: 'Pretende apagar o comentário?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
      confirmButtonColor: '#1D324F',
      denyButtonColor: '#6c757d',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/avaliacao/${tipo}/${selectedAvaliacao.id}`);
        handleClose();
        await fetchAvaliacoes(); // Atualiza a lista de avaliações

        Swal.fire({
          icon: 'success',
          title: 'Operação concluída',
          text: 'O comentário foi apagado com sucesso.',
          confirmButtonColor: '#1D324F',
        });
      } catch (error) {
        console.error('Error deleting comment:', error);

        Swal.fire({
          icon: 'error',
          title: 'Operação Cancelada',
          text: 'Ocorreu um erro ao apagar o comentário.',
          confirmButtonColor: '#1D324F',
        });
      }
    } else if (result.isDenied) {
      Swal.fire('Operação Cancelada', '', 'info');
    }
  };

  return (
    <div>
      {avaliacoes.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((avaliacao, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {avaliacao.utilizador && avaliacao.utilizador.foto && (
                <Avatar 
                  src={`/uploads/utilizador/${avaliacao.utilizador.foto}`} 
                  alt={avaliacao.utilizador.nome} 
                  sx={{ marginRight: 2 }}
                />
              )}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{avaliacao.utilizador ? avaliacao.utilizador.nome : ''}</Typography>
                <Rating value={avaliacao.classificacao} readOnly />
                <Typography variant="body2" color="text.secondary">Há {avaliacao.tempo}</Typography>
              </Box>
            </Box>
            <IconButton onClick={(event) => handleClick(event, avaliacao)}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleEdit}>Editar Comentário</MenuItem>
              <MenuItem onClick={handleDelete}>Apagar Comentário</MenuItem>
            </Menu>
          </Box>
          <Typography variant="body1" sx={{ marginTop: 1}}>{avaliacao.comentario}</Typography>
          <Box sx={{ width: '100%', height: '1px', backgroundColor: 'lightgray', marginTop: 2, marginBottom: 2 }} />
        </Box>
      ))}
      <Stack spacing={2}>
        <Pagination count={noOfPages} page={page} onChange={handleChange} shape="rounded" />
      </Stack>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Editar Comentário</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="comentario"
            label="Comentário"
            type="text"
            fullWidth
            value={selectedAvaliacao ? selectedAvaliacao.comentario : ''}
            onChange={(e) => setSelectedAvaliacao({ ...selectedAvaliacao, comentario: e.target.value })}
          />
          <Rating
            name="classificacao"
            value={selectedAvaliacao ? selectedAvaliacao.classificacao : 0}
            onChange={(event, newValue) => {
              setSelectedAvaliacao({ ...selectedAvaliacao, classificacao: newValue });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Comentarios;
