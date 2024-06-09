import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/softinsa.svg'; // Import the logo
import api from '../api/api';
import { Select, MenuItem, FormControl, Button, Box } from '@mui/material';

function SelectPosto() {
  const navigate = useNavigate();
  const location = useLocation();
  const [postos, setPostos] = React.useState([]);
  const [selectedPosto, setSelectedPosto] = React.useState('');
  const [nome, setNome] = React.useState(''); // Add a new state variable [1/2

  React.useEffect(() => {
    const fetchPostos = async () => {
      try {
        const response = await api.get('/postos');
        setPostos(response.data.data);
      } catch (error) {
        console.error('Error fetching postos:', error);
      }
    }
    fetchPostos();
  }, []);

  React.useEffect(() => {
    const fetchNome = async () => {
      try {
        const response = await api.get('/utilizador');
        setNome(response.data.nome); 
      } catch (error) {
        console.error('Error fetching nome:', error);
      }
    }
    fetchNome();
  }, []);

  const handlePostoSelection = async () => {
  try {
    const userResponse = await api.get('/utilizador');
    const userId = userResponse.data.id;
    console.log('User ID:', userId);
    const response = await api.post('/utilizador/associar-posto', { id: userId, idPosto: selectedPosto });

    const rememberUser = localStorage.getItem('rememberUser') === 'true';
    const token = response.data.token; 
    console.log('Token:', token);

    if (rememberUser) {
      if (localStorage) {
      localStorage.clear();
      localStorage.setItem('token', token);
      }
    } else {
      if (sessionStorage) {
      sessionStorage.clear();
      sessionStorage.setItem('token', token);
      }
    }

    navigate('/');
  } catch (error) {
    console.error('Error associating posto:', error);
  }
};

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="75vh"
    >
      <header className="header mb-1">
        <img src={logo} alt="Logo" className="logo" /> {/* Display the logo */}
      </header>
      <h1>Bem vindo {nome}, <br />por favor selecione o seu posto de atuação</h1>
      <FormControl variant="outlined" sx={{ minWidth: 200, marginBottom: '1rem' }}>
        <Select
          labelId="posto-select-label"
          value={selectedPosto}
          onChange={(e) => setSelectedPosto(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Selecione um posto
          </MenuItem>
          {postos.map((posto) => (
            <MenuItem key={posto.id} value={posto.id}>
              {posto.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     <Button 
        variant="contained" 
        color="primary" 
        onClick={handlePostoSelection}
        disabled={!selectedPosto} // Button is disabled if no posto is selected
      >
        Confirmar
      </Button>
    </Box>
  );
}

export default SelectPosto;
