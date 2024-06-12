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
import { alpha } from '@mui/material/styles';

function DetailEstabelecimento() {
  const { id } = useParams();
  const [estabelecimento, setEstabelecimento] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [page, setPage] = useState(1);
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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '73%', 
          backgroundColor: alpha('#808080', 0.06),
          zIndex: -1 
      }}>

  

      </Box>
      <Grid item xs={12} sm={10} md={8} lg={6} xl={10}>
        <Box sx={{ padding: 1, paddingTop: 0 }}>
          <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold' }}>{estabelecimento.nome}</Typography>
          <Box sx={{ marginBottom: { xs: 4, sm: 0 }, height: { xs: '300px', sm: '400px', md: '400px', lg: '400px', xl: '500px' } }}> {/* Adjust the height for different breakpoints */}
            <Slider {...settings} style={{ width: '100%', height: { xs: '300px', sm: '400px', md: '400px', lg: '400px', xl: '500px' }}}>
              {fotos.map((foto, index) => (
                <Card key={index} sx={{ boxSizing: 'border-box', height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={foto}
                    alt={estabelecimento.nome}
                    sx={{ width: '100%', height: { xs: '300px', sm: '400px', md: '400px', lg: '400px', xl: '500px' } ,objectFit: 'cover' }}
                  />
                </Card>
              ))}
            </Slider>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CardContent sx={{ padding: 0, marginTop: 10}}>
                <Typography variant="h4" sx={{ marginBottom: 1, fontWeight: 'bold' }}>Descrição</Typography>
                <Typography variant="body2" color="text.secondary">
                  {estabelecimento.descricao}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ marginTop: 4, fontWeight: 'bold' }}>Avaliações ({avaliacoes.length})</Typography>
              <Rating value={avgRating} readOnly sx={{ marginBottom: 2 }} />
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
              <Stack spacing={2}>
                <Pagination count={noOfPages} page={page} onChange={handleChange} shape="rounded" />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 2, p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Informações de Contato</Typography>
                <Typography variant="body2" color="text.secondary">
                  Morada: {estabelecimento.morada}<br />
                  Telefone: {estabelecimento.telefone}<br />
                  Email: {estabelecimento.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 2, p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Localização</Typography>
                {estabelecimento.latitude && estabelecimento.longitude ? (
                  <div style={{ maxWidth: '100%', height: '300px' }}>
                    <Mapa latitude={estabelecimento.latitude} longitude={estabelecimento.longitude} />
                  </div>
                ) : (
                  <Typography variant="body1">Localização não disponível</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DetailEstabelecimento;
