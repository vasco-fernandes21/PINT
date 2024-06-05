import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import api from "../api/api";

function DetailEstabelecimento() {
  const { id } = useParams();
  const [estabelecimento, setEstabelecimento] = useState(null);
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    const fetchEstabelecimento = async () => {
      try {
        const response = await api.get(`/estabelecimentos/${id}`);
        setEstabelecimento(response.data.data);
      } catch (error) {
        console.error('Error fetching estabelecimento:', error.response || error.message);
      }
    };

    fetchEstabelecimento();
  }, [id]);

  useEffect(() => {
    const fetchFotos = async () => {
      try {
        const response = await api.get(`/estabelecimentos/${id}/fotos`);
        const fotoPaths = response.data.data.map(foto => `${process.env.REACT_APP_API_URL}/uploads/estabelecimentos/${foto.nome}`);
        setFotos(fotoPaths);
      } catch (error) {
        console.error('Error fetching fotos:', error.response || error.message);
      }
    };

    fetchFotos();
  }, [id]);

  if (!estabelecimento) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: 30, paddingTop: 0 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold' }}>{estabelecimento.nome}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
        {fotos.map((foto, index) => (
          <Card key={index} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              image={foto}
              alt={estabelecimento.nome}
            />
          </Card>
        ))}
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Descrição: {estabelecimento.descricao}
        </Typography>
        {/* Aqui você pode adicionar a seção de comentários e outras informações que você precisa */}
      </CardContent>
    </Box>
  );
}

export default DetailEstabelecimento;
