import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import api from '../api/api';
import { IconButton, Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ValidacaoFotoAlbum = () => {
  const [fotos, setFotos] = useState([]);
  const [open, setOpen] = useState(false); // Estado para controlar a abertura do diálogo
  const [fotoSelecionada, setFotoSelecionada] = useState(null); // Estado para armazenar a foto selecionada

  useEffect(() => {
    fetchFotos();
  }, []);

  const fetchFotos = async () => {
    try {
      const response = await api.get('/fotos/validar');
      if (response.data.success && Array.isArray(response.data.data)) {
        setFotos(response.data.data);
      } else {
        console.error('Erro: a resposta da API não é um array');
      }
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
    }
  };

  const handleClickOpen = (row) => {
    setFotoSelecionada(row); // Armazena a foto selecionada
    setOpen(true); // Abre o diálogo
  };

  const handleClose = () => {
    setOpen(false); // Fecha o diálogo
  };

  const handleValidar = () => {
    handleClose(); // Fecha o diálogo
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente validar esta foto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1d324f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, validar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const id = fotoSelecionada.id; 
          await api.put(`/fotos/${id}/validar`);
          fetchFotos(); // Atualiza a lista de fotos após a alteração
          Swal.fire({
            title: 'Validado!',
            text: 'A foto foi validada com sucesso.',
            icon: 'success',
            confirmButtonColor: '#1d324f',
          });
        } catch (error) {
          console.error('Erro ao validar a foto:', error);
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao validar a foto. Por favor, tente novamente.',
            icon: 'error',
            confirmButtonColor: '#1d324f',
          });
        }
      }
    });
  };

  const handleRecusar = () => {
    handleClose(); // Fecha o diálogo
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente recusar esta foto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1d324f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, Recusar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const id = fotoSelecionada.id; 
          await api.delete(`/fotos/${id}`);
          fetchFotos();
          Swal.fire({
            title: 'Recusado!',
            text: 'A foto foi recusada com sucesso.',
            icon: 'success',
            confirmButtonColor: '#1d324f',
          });
        } catch (error) {
          console.error('Erro ao recusar a foto:', error);
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao recusar a foto. Por favor, tente novamente.',
            icon: 'error',
            confirmButtonColor: '#1d324f',
          });
        }
      }
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'albumTitulo',
      headerName: 'Álbum',
      width: 200,
      renderCell: (params) => (
        <Link to={`/albuns/${params.row.albumId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {params.row.albumTitulo || 'Título não disponível'}
        </Link>
      ),
    },
    {
      field: 'foto',
      headerName: 'Foto',
      width: 200,
      renderCell: (params) => (
        <a href={`${process.env.REACT_APP_API_URL}/uploads/fotos/${params.row.foto}`} target="_blank" rel="noopener noreferrer">
          <img src={`${process.env.REACT_APP_API_URL}/uploads/fotos/${params.row.foto}`} alt="Foto" style={{ width: 100, height: 100, objectFit: 'cover' }} />
        </a>
      ),
    },
    {
      field: 'descricao',
      headerName: 'Descrição',
      width: 250,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 100,
      type: 'boolean',
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleClickOpen(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const rows = fotos.map((foto) => ({
    id: foto.id,
    albumId: foto.albumId,
    albumTitulo: foto.albumTitulo,
    foto: foto.foto,
    descricao: foto.descricao,
    estado: foto.estado,
  }));

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Validar Foto</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleRecusar} color="error">
            Recusar
          </Button>
          <Button onClick={handleValidar} color="primary">
            Validar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ValidacaoFotoAlbum;
