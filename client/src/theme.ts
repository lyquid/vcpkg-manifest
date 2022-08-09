import { PaletteMode } from "@mui/material";
import { amber, blueGrey, deepOrange, grey, lightBlue } from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface TypographyVariants {
    libraryDescription: React.CSSProperties;
    libraryTitle: React.CSSProperties;
    libraryVersion: React.CSSProperties;
  }
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    libraryDescription?: React.CSSProperties;
    libraryTitle?: React.CSSProperties;
    libraryVersion?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    libraryDescription: true;
    libraryTitle: true;
    libraryVersion: true;
  }
}

export const getThemeOptions = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          background: {
            default: blueGrey[50],
            paper: blueGrey[100],
          },
          primary: {
            main: lightBlue[400],
            light: lightBlue[200],
            dark: lightBlue[700]
          },
          secondary: {
            main: deepOrange[400],
            light: deepOrange[200],
            dark: deepOrange[700]
          },
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          background: {
            default: '#303030',
            paper: '#424242',
          },
          text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)'
          },
          primary: {
            main: '#e1bee7',
            light: '#E7CBEB',
            dark: '#9D85A1',
            contrastText:'rgba(0, 0, 0, 0.87)'
          },
          secondary: {
            main: '#32da5b',
            light: '#5BE17B',
            dark: '#23983F',
            contrastText: 'rgba(0, 0, 0, 0.87)'
          },
          error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
            contrastText: '#fff'
          },
          warning: {
            main: '#ff9800',
            light: '#ffb74d',
            dark: '#f57c00',
            contrastText: 'rgba(0, 0, 0, 0.87)'
          },
          info: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
            contrastText: '#fff'
          },
          success: {
            main: '#4caf50',
            light: '#81c784',
            dark: '#388e3c',
            contrastText: 'rgba(0, 0, 0, 0.87)'
          },
          divider: 'rgba(255, 255, 255, 0.12)'
        }),
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Roboto Condensed',
      'Inconsolata'
    ].join(','),
    libraryDescription: {
      fontFamily: 'Roboto Condensed'
    },
    libraryTitle: {
      fontFamily: 'Inconsolata',
      fontSize: '30px'
    },
    libraryVersion: {
      fontFamily: 'Inconsolata',
      fontSize: '15px'
    }
  }
});
