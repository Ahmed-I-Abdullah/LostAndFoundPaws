import { createTheme } from '@mui/material';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3DA9FC',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#B50300'
    },
    text: {
      primary: '#000000'
    },
    custom: {
      primaryBkg: '#FFFFFF',
      greyBkg: {
        input: '#F5F5F5',
        tag: '#D9D9D9',
        category: '#E6E7EC',
        comment: {
          button: '#979797',
          bkg: '#F5F5F5',
          content: '#585858'
        }
      },
      selectedCategory: {
        lost: {
          light: '#FDC0C0',
          dark: '#EB442C'
        },
        found: {
          light: '#8DFD8D',
          dark: '#5A9F68'
        },
        sighting: '#FDFD8D',
        petType: '#DADADA',
        view: '#C0E7FD'
      }
    },

  },
  typography: {
    fontFamily: [
      'Inter',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '28px',
      fontWeight: 600,
      letterSpacing: '0.75px'
    },
    h2: {
      fontSize: '22px',
      fontWeight: 600,
      letterSpacing: '0.75px'
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      letterSpacing: '0.75px'
    },
    h4: {
      fontSize: '19px',
      fontWeight: 'bold',
      letterSpacing: '0.75px'
    },
    h7: {
      fontSize: '18px',
      letterSpacing: '0.75px',
      fontWeight: 'bold'
    },
    h8: {
      fontSize: '15px',
      letterSpacing: '0.75px',
      fontWeight: 'bold'
    },
    h9: {
      fontSize: '14px',
      letterSpacing: '0.75px'
    },
    body2: {
      color: '#585858',
      fontSize: '0.95rem'
    },
  }
});

export default theme;