import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Typography,
  Menu,
  MenuItem,
  Box,
  Grid,
  Paper,
  Divider,
  Checkbox,
  ListItemIcon,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import api from '../api/api';

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const response = await api.get('/notificacao');
        if (response.data.status === 'success') {
          setNotificacoes(response.data.data.notificacoes);
        } else {
          console.error('Erro ao obter notificações:', response.data.message);
        }
      } catch (error) {
        console.error('Erro ao encontrar notificações:', error);
      }
    };

    fetchNotificacoes();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (notificacaoId) => {
    if (selectedIds.includes(notificacaoId)) {
      setSelectedIds(selectedIds.filter((id) => id !== notificacaoId));
    } else {
      setSelectedIds([...selectedIds, notificacaoId]);
    }
  };

  const handleMarkSelectedRead = async () => {
    try {
      await api.put('/notificacao/marcar-como-lidas', { ids: selectedIds });
      const updatedNotificacoes = notificacoes.map((notificacao) => ({
        ...notificacao,
        estado: selectedIds.includes(notificacao.id) ? true : notificacao.estado,
      }));
      setNotificacoes(updatedNotificacoes);
      setSelectedIds([]);
      handleClose();
    } catch (error) {
      console.error('Erro ao marcar selecionadas como lidas:', error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await api.delete('/notificacao', { data: { ids: selectedIds } });
      const updatedNotificacoes = notificacoes.filter((notificacao) => !selectedIds.includes(notificacao.id));
      setNotificacoes(updatedNotificacoes);
      setSelectedIds([]);
      handleClose();
    } catch (error) {
      console.error('Erro ao apagar selecionadas:', error);
    }
  };

  const isRead = (notificacao) => {
    return notificacao.estado;
  };

  const isSelected = (notificacaoId) => {
    return selectedIds.includes(notificacaoId);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Notificações</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            disabled={selectedIds.length === 0}
            startIcon={<MoreVertIcon />}
          >
            Opções
          </Button>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: 200,
                marginTop: 4,
              },
            }}
          >
            <MenuItem onClick={handleMarkSelectedRead}>Marcar selecionadas como lidas</MenuItem>
            <MenuItem onClick={handleDeleteSelected}>Apagar selecionadas</MenuItem>
          </Menu>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={0}>
          <List>
            {notificacoes.map((notificacao) => (
              <React.Fragment key={notificacao.id}>
                <ListItem
                  button
                  onClick={() => handleToggle(notificacao.id)}
                  sx={{
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: isSelected(notificacao.id) ? '#f0f0f0' : '#ffffff',
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isSelected(notificacao.id)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': notificacao.id }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={notificacao.titulo}
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary">
                          {notificacao.descricao}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {new Date(notificacao.data).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="more" onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}
