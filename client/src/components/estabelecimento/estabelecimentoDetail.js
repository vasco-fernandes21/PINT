import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Card, CardContent, Typography, CardMedia, Box, Avatar, Rating } from "@mui/material";
import Slider from "react-slick";
import api from "../api/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DetailEstabelecimento() {
  const { id } = useParams();
  const [estabelecimento, setEstabelecimento] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);

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
        const fotoPaths = response.data.data.map(foto => `${process.env.REACT_APP_API_URL}/uploads/estabelecimentos/${foto.foto}`);
        setFotos(fotoPaths);
      } catch (error) {
        console.error('Error fetching fotos:', error.response || error.message);
      }
    };

    fetchFotos();
  }, [id]);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await api.get(`/avaliacao/estabelecimento/${id}`);
        setAvaliacoes(response.data.data);
      } catch (error) {
        console.error('Error fetching Avaliações:', error.response || error.message);
      }
    };

    fetchAvaliacoes();
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
    <Grid container spacing={2} justifyContent="center" alignItems='center'>
      <Grid item xs={12} sm={12} md={12} lg={11} xl={10}>
        <Box sx={{ padding: 1, paddingTop: 0 }}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CardContent sx={{ padding: 0 }}>
                <Typography variant="h4" sx={{ marginBottom: 1, fontWeight: 'bold' }}>Descrição</Typography>
                <Typography variant="body2" color="text.secondary">
                  {estabelecimento.descricao}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Conteúdo adicional */}
            </Grid>
          </Grid>
          <CardContent sx={{ padding: 0, marginTop: 4 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Avaliações</Typography>
            {avaliacoes.map((avaliacao, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Avatar 
                  src={`${process.env.REACT_APP_API_URL}/uploads/utilizador/${avaliacao.utilizador.foto}`} 
                  alt={avaliacao.utilizador.nome} 
                  sx={{ marginRight: 2 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{avaliacao.utilizador.nome}</Typography>
                  <Rating value={avaliacao.classificacao} readOnly />
                  {/* Adicione aqui o campo de comentário, se existir */}
                </Box>
              </Box>
            ))}
          </CardContent>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DetailEstabelecimento;
