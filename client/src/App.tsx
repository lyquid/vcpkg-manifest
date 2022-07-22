import { Suspense } from "react";
import { useTranslation } from 'react-i18next';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import MainForm from "./components/MainForm";

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
        <MainForm/>
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
