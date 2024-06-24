import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const DashboardValidacoes = () => {
  const navigate = useNavigate();
  const [numEventosParaValidar, setNumEventosParaValidar] = useState(0);

  useEffect(() => {
    // Simula a busca de dados e atualiza o estado
    // Substitua este código para buscar os dados reais de sua aplicação
    const fetchEventosParaValidar = async () => {
      // Simulação: substitua por sua lógica de busca de dados
      const numEventos = 10; // Exemplo: número fixo de eventos para validar
      setNumEventosParaValidar(numEventos);
    };

    fetchEventosParaValidar();
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
        <Typography variant="body2">Estabelecimentos para validar</Typography>
      </CardContent>
    </StyledCard>
  );
};

export default DashboardValidacoes;