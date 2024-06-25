import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import api from '../api/api';

const DashboardValidacoes = () => {
  const navigate = useNavigate();
  const [numEventosParaValidar, setNumEventosParaValidar] = useState(0);
  const [numEstabelecimentosParaValidar, setNumEstabelecimentosParaValidar] = useState(0);
  const [numAvaliacoesEventosParaValidar, setNumAvaliacoesEventosParaValidar] = useState(0);
  const [numAvaliacoesEstabelecimentosParaValidar, setNumAvaliacoesEstabelecimentosParaValidar] = useState(0);

  useEffect(() => {
    const fetchEventosParaValidar = async () => {
      try {
        const response = await api.get('/eventos/validar');
        if (response.data.success && Array.isArray(response.data.data)) {
          setNumEventosParaValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao buscar eventos para validar:', error);
      }
    };

    const fetchEstabelecimentosParaValidar = async () => {
      try {
        const response = await api.get('/estabelecimentos/validar');
        if (response.data.success && Array.isArray(response.data.data)) {
          setNumEstabelecimentosParaValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao buscar estabelecimentos para validar:', error);
      }
    };

    const fetchAvaliacoesEventosParaValidar = async () => {
      try {
        const response = await api.get('/avaliacao/validar/eventos');
        if (response.data.success && Array.isArray(response.data.data)) {
          setNumAvaliacoesEventosParaValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao buscar avaliações de eventos para validar:', error);
      }
    };

    const fetchAvaliacoesEstabelecimentosParaValidar = async () => {
      try {
        const response = await api.get('/avaliacao/validar/estabelecimentos');
        if (response.data.success && Array.isArray(response.data.data)) {
          setNumAvaliacoesEstabelecimentosParaValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao buscar avaliações de estabelecimentos para validar:', error);
      }
    };

    fetchEventosParaValidar();
    fetchEstabelecimentosParaValidar();
    fetchAvaliacoesEventosParaValidar();
    fetchAvaliacoesEstabelecimentosParaValidar();
  }, []);

  const handleOpen = () => {
    navigate("/validacao");
  };

  const StyledCard = styled(Card)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  });

  return (
    <StyledCard onClick={handleOpen}>
      <CardContent>
        <Typography variant="h6">Validações</Typography>
        <Typography variant="body2">Eventos para validar: {numEventosParaValidar}</Typography>
        <Typography variant="body2">Estabelecimentos para validar: {numEstabelecimentosParaValidar}</Typography>
        <Typography variant="body2">Avaliações de eventos para validar: {numAvaliacoesEventosParaValidar}</Typography>
        <Typography variant="body2">Avaliações de estabelecimentos para validar: {numAvaliacoesEstabelecimentosParaValidar}</Typography>
      </CardContent>
    </StyledCard>
  );
};

export default DashboardValidacoes;
