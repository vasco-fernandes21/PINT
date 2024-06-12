import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Card, CardContent, Typography, CardMedia, Box, Avatar, Rating } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Slider from "react-slick";
import api from "../api/api";
import Mapa from "../utils/mapa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DetailEstabelecimento() {
  const { id } = useParams();
  const [estabelecimento, setEstabelecimento] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;
  const noOfPages = Math.ceil(avaliacoes.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const avgRating = avaliacoes.reduce((prev, curr) => prev + curr.classificacao, 0) / avaliacoes.length;

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
            <Grid item xs={12}>
              <CardContent sx={{ padding: 0 }}>
                <Typography variant="h4" sx={{ marginBottom: 1, fontWeight: 'bold' }}>Descrição</Typography>
                <Typography variant="body2" color="text.secondary">
                  {estabelecimento.descricao}
                </Typography>
              </CardContent>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: 4 }}>
            <Grid item xs={12} sm={4}>
                <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 2, p: 3, width: '80%', height:'100%'}}>
                  <CardContent sx={{ padding: 0, marginLeft: 2,}}>
                  <Typography variant="h5" sx={{ marginBottom: 4, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between'}}>
                    Avaliações ({avaliacoes.length})
                    <Box>
                      <Rating value={avgRating} readOnly sx={{}}/>
                    </Box>
                  </Typography>
                    {avaliacoes.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((avaliacao, index) => (
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
                  <Stack spacing={2}>
                    <Pagination count={noOfPages} page={page} onChange={handleChange} shape="rounded" />
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 2, p: 3, width: '90%', height: '100%'}}>
                  <CardContent sx={{ padding: 0 }}>
                    <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign:'center'}}>Informações de Contato</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {/* Adicione aqui as informações de contato */}
                      Morada: {estabelecimento.morada}<br />
                      Telefone: {estabelecimento.telefone}<br />
                      Email: {estabelecimento.email}
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
               <CardContent sx={{ padding: 0 }}>
                  <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Localização</Typography>
                  {estabelecimento.latitude && estabelecimento.longitude ? (
                    <div style={{ maxWidth: '500px', maxHeight: '500px' }}>
                      <Mapa latitude={estabelecimento.latitude} longitude={estabelecimento.longitude} />
                    </div>
                  ) : (
                    <Typography variant="body1">Localização não disponível</Typography>
                  )}
                </CardContent>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DetailEstabelecimento;
