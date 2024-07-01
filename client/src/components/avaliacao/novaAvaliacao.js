import React, { useState } from "react";
import { TextField, Button, Rating, Typography, Box } from "@mui/material";
import Swal from "sweetalert2";
import api from "../api/api";

function NovaAvaliacao({ tipo, id, idUtilizador, handleUpdateAvaliacoes }) {
  const [rating, setRating] = useState(1);
  const [comentario, setComentario] = useState('');

  const handleSubmitAvaliacao = async () => {
    const result = await Swal.fire({
      title: 'Pretende enviar o comentário?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
      confirmButtonColor: '#1d234f',
      denyButtonColor: '#6c757d',
    });

    if (result.isConfirmed) {
      if (!idUtilizador) {
        Swal.fire({
          text: "Utilizador não encontrado, por favor tente mais tarde.",
          icon: "warning",
          confirmButtonColor: "#1d324f"
        });
        return;
      }

      if (!rating && !comentario) {
        Swal.fire({
          text: "Por favor, forneça uma classificação ou comentário.",
          icon: "warning",
          confirmButtonColor: "#1d324f"
        });
        return;
      }

      try {
        const resposta = await api.post(`/avaliacao/${tipo}/criar/${id}`, {
          idUtilizador: idUtilizador,
          classificacao: rating,
          comentario: comentario
        });

        if (resposta.data.success) {
          handleUpdateAvaliacoes(); // Chama a função para atualizar as avaliações no componente pai
          setRating(0);
          setComentario('');

          Swal.fire({
            icon: 'success',
            title: 'Operação concluída',
            text: 'O comentário foi enviado com sucesso.',
            confirmButtonColor: '#1d234f',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao enviar avaliação',
            text: 'Ocorreu um erro ao enviar a avaliação.',
            confirmButtonColor: '#1d234f',
          });
        }
      } catch (error) {
        console.error('Error submitting review:', error);

        Swal.fire({
          icon: 'error',
          title: 'Erro ao enviar avaliação',
          text: 'Ocorreu um erro ao enviar a avaliação.',
          confirmButtonColor: '#1d234f',
        });
      }
    } else if (result.isDenied) {
      Swal.fire('Operação Cancelada', '', 'info');
    }
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Adicionar Avaliação</Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => {
          setRating(Math.max(1, newValue)); 
        }}
      />
      <TextField
        label="Comentário"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={comentario}
        onChange={(event) => setComentario(event.target.value)}
        sx={{ marginTop: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitAvaliacao}
        sx={{ marginTop: 2, padding: 1, marginLeft: 0}}
      >
        Enviar Avaliação
      </Button>
    </Box>
  );
}

export default NovaAvaliacao;
