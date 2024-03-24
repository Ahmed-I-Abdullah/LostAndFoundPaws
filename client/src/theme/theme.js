import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#3DA9FC',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#3DA9FC',
    },
    primaryBkg: '#000000',
  },
});

export default theme;
