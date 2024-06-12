import { createTheme } from '@mui/material/styles';

const tema = createTheme({
  palette: {
    primary: {
      main: '#1D324F',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '10px',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffff',
          color: '#1D324F',
          borderRadius: '10px',
        },
        cell: {
          color: '#00000',
        },
        columnHeaders: {  
          backgroundColor: '#FFFF',
          color: '#1D324F',
        },
        footerContainer: {
          backgroundColor: '#FFFF',
        },
      },
    },
  },
});

export default tema;
