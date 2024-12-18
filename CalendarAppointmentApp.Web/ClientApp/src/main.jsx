import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import RoutePage from './RoutePage';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5c6bc0', // Indigo
    },
    secondary: {
      main: '#ff7043', // Deep Orange
    },
    background: {
      default: '#fafafa', // Light grey
      paper: '#ffffff', // White
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoutePage />
    </ThemeProvider>
  </BrowserRouter>
)
