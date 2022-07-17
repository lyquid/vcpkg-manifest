import { Suspense } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useTranslation } from 'react-i18next';
import MainForm from "./components/MainForm";

const appTheme = createTheme({
  palette: {
    mode: 'light',
    // background: {
    //   default: 'black',
    // }
  }
});

const lngs = {
  ca: { nativeName: 'Català' },
  de: { nativeName: 'Deutsch' },
  en: { nativeName: 'English' },
  es: { nativeName: 'Español' }
};

const App = () => {
  const { t, i18n } = useTranslation();
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline/>
      <main>
        <div>
          {Object.keys(lngs).map((lng) => (
            <button
              key={lng}
              style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
              type="submit"
              onClick={() => i18n.changeLanguage(lng)}>
                {lngs[lng as keyof typeof lngs].nativeName}
            </button>
          ))}
        </div>
        {/* <Trans i18nKey="description.part1">
          Edit <code>src/App.js</code> and save to reload.
        </Trans> */}
        <MainForm/>
      </main>
    </ThemeProvider>
  );
};

export default function WrappedApp() {
  return (
    <Suspense fallback="Loading">
      <App/>
    </Suspense>
  );
}
