import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Slider from "react-slick";
import api from "../api/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: 16, paddingTop: 0 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold' }}>{estabelecimento.nome}</Typography>
      <Box sx={{ marginBottom: 4 }}>
        <Slider {...settings}>
        {fotos.map((foto, index) => (
          <Card key={index} sx={{ padding: 1, margin: 1, boxSizing: 'border-box'}}>
            <CardMedia
              component="img"
              image={foto}
              alt={estabelecimento.nome}
              sx={{ height: 250}}
            />
          </Card>
        ))}
      </Slider>
      </Box>
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="h4" sx={{ marginBottom: 1, fontWeight: 'bold' }}>Descrição</Typography>
        <Typography variant="body2" color="text.secondary">
          {estabelecimento.descricao}
        </Typography>
        {/* Aqui você pode adicionar a seção de comentários e outras informações que você precisa */}
      </CardContent>
    </Box>
  );
}


export default DetailEstabelecimento;
