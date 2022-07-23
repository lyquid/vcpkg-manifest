import { Suspense } from "react";
import { useTranslation } from 'react-i18next';
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import MainForm from "./components/MainForm";
import TopBar from "./components/TopBar";

const appTheme = createTheme({
  palette: {
    mode: 'light',
    // background: {
    //   default: 'black',
    // }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline/>
      <main>
        <Box>
          <TopBar/>
          <MainForm/>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default function WrappedApp() {
  const { t } = useTranslation();
  return (
    <Suspense fallback={t('app.loading')}>
      <App/>
    </Suspense>
  );
}
