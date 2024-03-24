import { createTheme } from '@mui/material';
import React from 'react';

declare module '@mui/material/styles' {
  interface Palette {
    custom?: {
      primaryBkg: string;
      greyBkg: {
        input: string;
        tag: string;
        category: string;
        comment: {
          button: string;
          bkg: string;
        };
      };
      selectedCategory: {
        lost: {
          light: string;
          dark: string;
        };
        found: {
          light: string;
          dark: string;
        };
        sighting: string;
        petType: string;
        view: string;
      };
    };
  }
  interface PaletteOptions {
    custom?: {
      primaryBkg: string;
      greyBkg: {
        input: string;
        tag: string;
        category: string;
        comment: {
          button: string;
          bkg: string;
        };
      };
      selectedCategory: {
        lost: {
          light: string;
          dark: string;
        };
        found: {
          light: string;
          dark: string;
        };
        sighting: string;
        petType: string;
        view: string;
      };
    };
  }
  interface TypographyVariants {
    h7: React.CSSProperties;
    h8: React.CSSProperties;
    h9: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h7?: React.CSSProperties;
    h8?: React.CSSProperties;
    h9?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h7: true;
    h8: true;
    h9: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#3DA9FC'
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
          bkg: '#F5F5F5'
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
    fontFamily: 'Inter, Roboto, sans-serif',
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
    }
  }
});

export default theme;