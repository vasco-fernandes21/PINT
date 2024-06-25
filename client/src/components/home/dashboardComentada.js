import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import api from '../api/api';

const DashboardComentadas = () => {
  const [maisAvaliados, setMaisAvaliados] = useState({
    estabelecimento: null,
    evento: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/estatistica/mais-avaliados');
        const { estabelecimentoMaisAvaliado, eventoMaisAvaliado } = response.data;
        setMaisAvaliados({
          estabelecimento: estabelecimentoMaisAvaliado,
          evento: eventoMaisAvaliado,
        });
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const StyledCard = styled(Card)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  });

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">Atividades mais avaliadas</Typography>
        {maisAvaliados.estabelecimento ? (
          <Typography variant="body2">
            Estabelecimento mais avaliado:{" "}
            <Link to={`/estabelecimentos/${maisAvaliados.estabelecimento.idEstabelecimento}`}>
              {maisAvaliados.estabelecimento.nome}
            </Link>{" "}
            ({maisAvaliados.estabelecimento.totalAvaliacoes} avaliações)
          </Typography>
        ) : (
          <Typography variant="body2">Nenhum estabelecimento encontrado.</Typography>
        )}
        {maisAvaliados.evento ? (
          <Typography variant="body2">
            Evento mais avaliado:{" "}
            <Link to={`/eventos/${maisAvaliados.evento.idEvento}`}>
              {maisAvaliados.evento.nome}
            </Link>{" "}
            ({maisAvaliados.evento.totalAvaliacoes} avaliações)
          </Typography>
        ) : (
          <Typography variant="body2">Nenhum evento encontrado.</Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default DashboardComentadas;
