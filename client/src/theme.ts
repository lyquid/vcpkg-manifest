import { PaletteMode } from "@mui/material";
import { amber, blueGrey, cyan, grey, orange } from "@mui/material/colors";

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
            default: blueGrey[100],
            paper: blueGrey[50],
          },
          text: {
            primary: grey[800],
            secondary: grey[600],
          },
          primary: {
            main: cyan[500],
            light: cyan[200],
            dark: cyan[700]
          },
          secondary: {
            main: orange[500],
            light: orange[200],
            dark: orange[700]
          },
          divider: orange[400],
        }
      : {
          // palette values for dark mode
          background: {
            default: blueGrey[800],
            paper: blueGrey[700],
          },
          text: {
            primary: grey[200],
            secondary: grey[400],
          },
          primary: {
            main: cyan[500],
            light: cyan[200],
            dark: cyan[700]
          },
          secondary: {
            main: amber[500],
            light: amber[200],
            dark: amber[700]
          },
          divider: amber[400]
        })
  },
  typography: {
    fontFamily: [
      'Roboto Flex',
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
