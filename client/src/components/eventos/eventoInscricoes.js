import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const InscricoesGrelha = ({ inscricoes }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome do Utilizador</TableCell> 
            <TableCell>Nome do Admin</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inscricoes.map((inscricao) => (
            <TableRow key={inscricao.id}>
              <TableCell>{inscricao.id}</TableCell>
              <TableCell>{inscricao.utilizador?.nome}</TableCell> 
              <TableCell>{inscricao.admin?.nome}</TableCell> 
              <TableCell>{new Date(inscricao.data).toLocaleDateString()}</TableCell>
              <TableCell>{inscricao.estado}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InscricoesGrelha;