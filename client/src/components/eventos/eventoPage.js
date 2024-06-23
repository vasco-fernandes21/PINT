import React, { useState, useEffect, useCallback } from "react";
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
import BotaoInscricaoEvento from "../utils/BotaoInscricao";
import EditarEvento from "./eventoEdit";
import InscricoesGrelha from "./eventoInscricoes";

function EventoPage() {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [fotos, setFotos] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [utilizador, setUtilizador] = useState(null);
    const [inscricoes, setInscricoes] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const noOfPages = Math.ceil(avaliacoes.length / itemsPerPage);
    const [open, setOpen] = useState(false);

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
        const fetchEvento = async () => {
            try {
                const response = await api.get(`/eventos/${id}`);
                setEvento(response.data.data);
            } catch (error) {
                console.error('Error fetching evento:', error.response || error.message);
            }
        };
        fetchEvento();
    }, [id]);

    const fetchAvaliacoes = useCallback(async () => {
        try {
            const response = await api.get(`/avaliacao/eventos/${id}`);
            setAvaliacoes(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching Avaliações:', error.response || error.message);
        }
    }, [id]);

    useEffect(() => {
        fetchAvaliacoes();
    }, [fetchAvaliacoes]);

    const fetchInscricoes = useCallback(async () => {
        try {
            const response = await api.get(`/eventos/${id}/inscricao`);
            setInscricoes(response.data.data);
        } catch (error) {
            console.error('Error fetching inscrições:', error.response || error.message);
        }
    }, [id]);

    useEffect(() => {
        fetchInscricoes();
    }, [fetchInscricoes]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateFotos = async () => {
        try {
            const response = await api.get(`foto/eventos/${id}`);
            const fotoPaths = response.data.data.map(foto => ({
                id: foto.id,
                url: `${process.env.REACT_APP_API_URL}/uploads/eventos/${foto.foto}`,
                carregadaPor: foto.criador ? foto.criador.nome : 'Desconhecido',
                validadaPor: foto.admin ? foto.admin.nome : 'Desconhecido',
            }));
            setFotos(fotoPaths);
        } catch (error) {
            console.error('Error fetching fotos:', error.response || error.message);
        }
    };

    const handleChange = (event, value) => {
        setPage(value);
    };

    if (!evento) {
        return <div>A carregar...</div>;
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={10} md={11} lg={10} xl={10}>
                <Box sx={{ padding: 0, paddingTop: 0 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 0 }}>{evento.titulo}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', flexWrap: 'wrap', marginTop: -6, marginBottom: 3 }}>
                        {utilizador && (
                            <>
                                <BotaoUpload tipo="eventos" id={id} fotos={fotos} setFotos={setFotos} idUtilizador={utilizador.id} updateFotos={updateFotos} />
                                <Button variant="contained" color="secondary" onClick={handleOpen}>
                                    Editar evento
                                </Button>
                                <EditarEvento open={open} handleClose={handleClose} />
                            </>
                        )}
                    </Box>
                    <FotoSlider fotos={fotos} descricao={evento.titulo} tipo="eventos" id={id} updateFotos={updateFotos} />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CardContent sx={{ padding: 0, marginTop: 10 }}>
                                <Typography variant="h4" sx={{ marginBottom: 1, fontWeight: 'bold' }}>Descrição</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {evento.descricao}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item xs={12} sx={{ marginBottom: 4 }}>
                                <Typography variant="h5" sx={{ marginTop: 3, fontWeight: 'bold', marginBottom: 2 }}>Avaliações</Typography>
                                <AvaliacoesDetalhadas avaliacoes={avaliacoes} />
                            </Grid>
                            <Comentarios
                                fetchAvaliacoes={fetchAvaliacoes}
                                avaliacoes={avaliacoes}
                                page={page}
                                itemsPerPage={itemsPerPage}
                                noOfPages={noOfPages}
                                handleChange={handleChange}
                                tipo="eventos"
                            />
                            {utilizador && (
                                <NovaAvaliacao
                                    handleUpdateAvaliacoes={fetchAvaliacoes}
                                    id={id}
                                    idUtilizador={utilizador.id}
                                    avaliacoes={avaliacoes}
                                    setAvaliacoes={setAvaliacoes}
                                    tipo="eventos"
                                />
                            )}
                        </Grid>
                       <Grid item xs={12}>
                            <InscricoesGrelha inscricoes={inscricoes} />
                            <Grid item xs={12} sx={{ position: 'relative' }}>
                                <BotaoInscricaoEvento sx={{ position: 'absolute', marginLeft: 0, marginTop: 2 }} idEvento={id} idUtilizador={utilizador?.id} inscricaoAberta={evento.inscricaoAberta}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 2, p: 3, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Informações de Contacto</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Morada: {evento.morada}
                                    </Typography>
                                    <Divider orientation="vertical" flexItem />
                                    <Typography variant="body2" color="text.secondary">
                                        Telemovel: {evento.telemovel}
                                    </Typography>
                                    <Divider orientation="vertical" flexItem />
                                    <Typography variant="body2" color="text.secondary">
                                        Email: {evento.email}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ maxWidth: '100%', height: '300px', marginTop: 2 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Localização</Typography>
                                <Mapa morada={evento.morada} />
                                <Box sx={{ height: '50px' }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}

export default EventoPage;
