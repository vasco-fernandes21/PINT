import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, CardContent, Typography, Box, Divider, Button } from "@mui/material";
import api from "../api/api";
import Mapa from "../utils/mapa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AvaliacoesDetalhadas from "../avaliacao/avaliacoes";
import FotoSlider from "../utils/fotoSlider";
import Comentarios from "../avaliacao/comentarios";
import NovaAvaliacao from "../avaliacao/novaAvaliacao";
import BotaoUpload from "../utils/botaoUpload";

function EstabelecimentoPage() {
    const { id } = useParams();
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [fotos, setFotos] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [utilizador, setUtilizador] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const noOfPages = Math.ceil(avaliacoes.length / itemsPerPage);
  
  
    useEffect(() => {
      const fetchUtilizador = async () => {
        try {
          const response = await api.get('/utilizador');
          setUtilizador(response.data); 
        } catch (error) {
          console.error('Erro ao encontrar utilizador:', error);
        }
      };
      fetchUtilizador();
    }, []);
  
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
  
    const fetchAvaliacoes = async () => {
      try {
        const response = await api.get(`/avaliacao/estabelecimentos/${id}`);
        setAvaliacoes(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching Avaliações:', error.response || error.message);
      }
    };
  
    useEffect(() => {
      fetchAvaliacoes();
    }, [id]);

    const handleChange = (event, value) => {
        setPage(value);
    };
  
    if (!estabelecimento) {
      return <div>A carregar...</div>;
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={10} md={8} lg={10} xl={10}>
            <Box sx={{ padding: 1, paddingTop: 0}}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{estabelecimento.nome}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>Botão 1</Button>
                <Button variant="contained" color="secondary">Botão 2</Button>
              </Box>
              <Box sx={{ marginBottom: { xs: 4, sm: 0 }, height: { xs: '300px', sm: '400px', md: '400px', lg: '400px', xl: '500px' } }}> 
                <FotoSlider fotos={fotos} descricao={estabelecimento.nome} tipo = "estabelecimentos" id={id}/>
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
                  <Grid item xs={12} sx={{ marginBottom: 4 }}>
                    <Typography variant="h5" sx={{ marginTop: 3, fontWeight: 'bold', marginBottom: 2}}>Avaliações</Typography>
                    <AvaliacoesDetalhadas avaliacoes={avaliacoes} />
                  </Grid >
                  <Comentarios 
                    fetchAvaliacoes={fetchAvaliacoes} 
                    avaliacoes={avaliacoes} 
                    page={page} 
                    itemsPerPage={itemsPerPage} 
                    noOfPages={noOfPages} 
                    handleChange={handleChange} 
                    tipo = "estabelecimentos"
                    />
                  <NovaAvaliacao 
                    handleUpdateAvaliacoes={fetchAvaliacoes}
                    id={id} 
                    idUtilizador={utilizador ? utilizador.id : null} 
                    avaliacoes={avaliacoes} 
                    setAvaliacoes={setAvaliacoes} 
                    tipo = "estabelecimentos"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 2, p: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Informações de Contacto</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography variant="body2" color="text.secondary">
                        Morada: {estabelecimento.morada}  
                      </Typography>
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="body2" color="text.secondary">
                        Telefone: {estabelecimento.telefone}
                      </Typography>
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="body2" color="text.secondary">
                        Email: {estabelecimento.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              <Grid item xs={12}>
                <Box sx={{ maxWidth: '100%', height: '300px', marginTop: 2}}>
                  {estabelecimento.latitude && estabelecimento.longitude ? (
                    <>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Localização</Typography>
                      <Mapa latitude={estabelecimento.latitude} longitude={estabelecimento.longitude} />
                      <Box sx={{ height: '50px' }} /> 
                    </>
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
    
    export default EstabelecimentoPage;