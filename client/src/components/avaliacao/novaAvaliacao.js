import React, { useState } from "react";
import { TextField, Button, Rating, Typography, Box } from "@mui/material";
import Swal from "sweetalert2";
import api from "../api/api";

function NovaAvaliacao({ idEstabelecimento, idUtilizador, avaliacoes, setAvaliacoes }) {
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState('');

  const handleSubmitAvaliacao = async () => {
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
      const resposta = await api.post(`/avaliacao/estabelecimento/criar/${idEstabelecimento}`, {
        idUtilizador: idUtilizador,
        classificacao: rating,
        comentario: comentario
      });

      if (resposta.data.success) {
        setAvaliacoes([...avaliacoes, resposta.data.data]);
        setRating(0);
        setComentario('');
      } else {
        alert('Erro ao enviar avaliação');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Adicionar Avaliação</Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
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