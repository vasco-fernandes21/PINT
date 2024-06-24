import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import api from '../api/api';
import { IconButton, Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const ValidacaoAvaliacaoEvento = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [open, setOpen] = useState(false);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState(null);

  useEffect(() => {
    fetchAvaliacoes();
  }, []);

  const fetchAvaliacoes = async () => {
    try {
      const response = await api.get('/avaliacao/validar/eventos');
      if (response.data.success && Array.isArray(response.data.data)) {
        setAvaliacoes(response.data.data);
      } else {
        console.error('Erro: a resposta da API não é um array');
      }
    } catch (error) {
      console.error('Erro ao procurar avaliações:', error);
    }
  };

  const handleClickOpen = (row) => {
    setAvaliacaoSelecionada(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAceitar = async () => {
    handleClose();
    try {
      const id = avaliacaoSelecionada.id;
      await api.put(`/avaliacao/eventos/${id}`, { estado: true });
      fetchAvaliacoes();
      Swal.fire('Aceite!', 'A avaliação foi aceite com sucesso.', 'success');
    } catch (error) {
      console.error('Erro ao aceitar a avaliação:', error);
      Swal.fire('Erro', 'Erro ao aceitar a avaliação. Por favor, tente novamente.', 'error');
    }
  };

  const handleRecusar = async () => {
    handleClose();
    try {
        const id = avaliacaoSelecionada.id;
        await api.delete(`/avaliacao/eventos/${id}`);
        fetchAvaliacoes();
        Swal.fire('Recusado!', 'A avaliação foi recusada com sucesso.', 'success');
    } catch (error) {
        console.error('Erro ao recusar a avaliação:', error);
        Swal.fire('Erro', 'Erro ao recusar a avaliação. Por favor, tente novamente.', 'error');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'titulo',
      headerName: 'Nome do Evento',
      width: 200,
      renderCell: (params) => (
        <Link to={`/eventos/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {params.value}
        </Link>
      ),
    },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'classificacao', headerName: 'Classificação', width: 150 },
    { field: 'comentario', headerName: 'Comentário', width: 300 },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleClickOpen(params.row)}>
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];
  

  const rows = avaliacoes.map((avaliacao) => ({
    id: avaliacao.id,
    titulo: avaliacao.evento.titulo,
    nome: avaliacao.utilizador.nome,
    classificacao: avaliacao.classificacao,
    comentario: avaliacao.comentario,
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
        <DialogTitle>Validar Avaliação</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleRecusar} color="error">
            Recusar
          </Button>
          <Button onClick={handleAceitar} color="primary">
            Aceitar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ValidacaoAvaliacaoEvento;