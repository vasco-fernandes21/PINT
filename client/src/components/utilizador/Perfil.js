import React, { useState } from 'react';
import { Box, Grid, Avatar, Typography, Card, CardContent, Button, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const StyledCard = styled(Card)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  });

  const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
  });

  const StyledTypography = styled(Typography)({
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 600,
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 2 }}>
      {/* Profile Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Avatar sx={{ width: 100, height: 100 }}>JW</Avatar>
          <Button variant="contained" sx={{ backgroundColor: '#1D324F' }} onClick={() => navigate('/perfil/editar')}>
            Editar Perfil
          </Button>
        </Box>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          User
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Sobre:
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          Pequena descrição do user.
        </Typography>
      </Box>

      {/* Tabs for Avaliações and Imagens */}
      <Tabs value={selectedTab} onChange={handleTabChange} sx={{ marginBottom: 2 }}>
        <Tab label="Avaliações" />
        <Tab label="Imagens" />
      </Tabs>

      {/* Content based on selected tab */}
      {selectedTab === 0 && (
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Avaliações:
          </Typography>
          <Grid container spacing={2}>
            {[
              { title: 'teste6', projects: 'teste7' },
              { title: 'teste8', projects: 'teste9' },
              { title: 'teste10', projects: 'teste11' },
              { title: 'teste12', projects: 'teste13' },
              { title: 'teste14', projects: 'teste15' },
              { title: 'teste16', projects: 'teste17' },
              { title: 'teste18', projects: 'teste19' },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StyledCard>
                  <StyledCardContent>
                    <StyledTypography variant="h6" component="h2">
                      {item.title}
                    </StyledTypography>
                    <Typography variant="body2" color="text.secondary">
                      {item.projects}
                    </Typography>
                  </StyledCardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {selectedTab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Imagens:
          </Typography>
          <Grid container spacing={2}>
            {[
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
              { img: 'https://via.placeholder.com/150', description: 'Imagem' },
            ].map((image, index) => (
              <Grid item xs={2} key={index}>
                <StyledCard>
                  <Box component="img" src={image.img} alt={image.description} sx={{ width: '100%', height: 'auto' }} />
                  <StyledCardContent>
                    <Typography variant="body2" color="text.secondary">
                      {image.description}
                    </Typography>
                  </StyledCardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Perfil;
