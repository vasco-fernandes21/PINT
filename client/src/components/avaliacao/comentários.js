import { Box, Typography, Rating, Avatar, Stack, Pagination, Menu, MenuItem, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';

function Comentarios({ avaliacoes, page, itemsPerPage, noOfPages, handleChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAvaliacao, setSelectedAvaliacao] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (avaliacao) => {
    setSelectedAvaliacao(avaliacao);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    // Add your update logic here
    setOpenDialog(false);
  };

  return (
    <div>
      {avaliacoes.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((avaliacao, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {avaliacao.utilizador && avaliacao.utilizador.foto && (
                <Avatar 
                  src={`${process.env.REACT_APP_API_URL}/uploads/utilizador/${avaliacao.utilizador.foto}`} 
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
            <IconButton onClick={handleClick}>
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
              <MenuItem onClick={() => handleEdit(avaliacao)}>Editar Comentário</MenuItem>
              <MenuItem onClick={handleClose}>Apagar Comentário</MenuItem>
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
          <Button onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Comentarios;