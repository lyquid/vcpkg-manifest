import { createContext, Suspense, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import generateJSON from './generateJSON';
import GeneratingAlert from './components/GeneratingAlert';
import MainForm from './components/main_form/MainForm';
import TopBar from './components/header/TopBar';
import { VCPKGManifest } from './types';
import { getThemeOptions } from './theme';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  // hook to show the generating alert
  const [generating, setGenerating] = useState(false);

  const generateFile = (form_data: VCPKGManifest) => {
    // disable fields
    setGenerating(true);
    // create file, link & download
    const fileName = 'vcpkg.json';
    const link = document.createElement("a");
		link.href = URL.createObjectURL(generateJSON(form_data));
		link.download = fileName;
		link.click();
    // re-enable fields after x time
    setTimeout(() => { setGenerating(false); }, 1000);
  }

  return (
    <main>
      <TopBar/>
      {generating && <GeneratingAlert/>}
      <MainForm generateFile={generateFile} generating={generating}/>
    </main>
  );
};

function ToggleColorMode() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
    }
  }), []);

  const theme = useMemo(() => createTheme(getThemeOptions(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default function WrappedApp() {
  const { t } = useTranslation();
  return (
    <Suspense fallback={t('app.loading')}>
      <ToggleColorMode/>
    </Suspense>
  );
}
