import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import api from '../api/api';
import { IconButton, Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ValidacaoAlbum = () => {
  const [albuns, setAlbuns] = useState([]);
  const [open, setOpen] = useState(false); // Estado para controlar a abertura do diálogo
  const [albumSelecionado, setAlbumSelecionado] = useState(null); // Estado para armazenar o álbum selecionado

  useEffect(() => {
    fetchAlbuns();
  }, []);

  const fetchAlbuns = async () => {
    try {
      const response = await api.get('/album/validar');
      if (response.data.success && Array.isArray(response.data.data)) {
        setAlbuns(response.data.data);
      } else {
        console.error('Erro: a resposta da API não é um array');
      }
    } catch (error) {
      console.error('Erro ao buscar álbuns:', error);
    }
  };

  const handleClickOpen = (row) => {
    setAlbumSelecionado(row); // Armazena o álbum selecionado
    setOpen(true); // Abre o diálogo
  };

  const handleClose = () => {
    setOpen(false); // Fecha o diálogo
  };

  const handleValidar = () => {
    handleClose(); // fecha o diálogo para vermos o alerta
    // Exibe um diálogo de confirmação
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente validar este álbum?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1d324f', 
      cancelButtonColor: '#6c757d', 
      confirmButtonText: 'Sim, validar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const id = albumSelecionado.id; 
          await api.put(`/album/validar/${id}`);
          handleClose();
          fetchAlbuns(); // Atualiza a lista de álbuns após a alteração
          Swal.fire({
            title: 'Validado!',
            text: 'O álbum foi validado com sucesso.',
            icon: 'success',
            confirmButtonColor: '#1d324f',
          });
        } catch (error) {
          console.error('Erro ao validar o álbum:', error);
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao validar o álbum. Por favor, tente novamente.',
            icon: 'error',
            confirmButtonColor: '#1d324f',
          });
        }
      }
    });
  };

  const handleRecusar = () => {
    handleClose(); // fecha o diálogo para vermos o alerta
    // Exibe um diálogo de confirmação
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente recusar este álbum?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1d324f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, Recusar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const id = albumSelecionado.id; 
          await api.delete(`/album/${id}`);
          handleClose();
          fetchAlbuns();
          Swal.fire({
            title: 'Recusado!',
            text: 'O álbum foi recusado com sucesso.',
            icon: 'success',
            confirmButtonColor: '#1d324f',
          });
        } catch (error) {
          console.error('Erro ao recusar o álbum:', error);
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao recusar o álbum. Por favor, tente novamente.',
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
      field: 'titulo',
      headerName: 'Título',
      width: 200,
      renderCell: (params) => (
        <Link to={`/albuns/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {params.value}
        </Link>
      ),
    },
    {
      field: 'fotoPrincipal',
      headerName: 'Foto Principal',
      width: 200,
      renderCell: (params) => (
        <a href={`${process.env.REACT_APP_API_URL}/uploads/albuns/${params.value}`} target="_blank" rel="noopener noreferrer">
          Ver Foto
        </a>
      ),
    },
    {
      field: 'descricao',
      headerName: 'Descrição',
      width: 250,
    },
    {
      field: 'dataCriacao',
      headerName: 'Data de Criação',
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString('pt-PT'),
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
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleClickOpen(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const rows = albuns.map((album) => ({
    ...album,
    id: album.id,
    titulo: album?.titulo,
    fotoPrincipal: album.fotoPrincipal,
    descricao: album.descricao,
    dataCriacao: album.dataCriacao,
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
        <DialogTitle>Validar Álbum</DialogTitle>
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

export default ValidacaoAlbum;
