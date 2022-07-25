import { Suspense, useState } from "react";
import { useTranslation } from 'react-i18next';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import generateJSON from "./generateJSON";
import GeneratingAlert from "./components/GeneratingAlert";
import MainForm from "./components/MainForm";
import TopBar from "./components/TopBar";
import { VCPKGManifest } from "./types";

const appTheme = createTheme({
  palette: {
    mode: 'light',
    // background: {
    //   default: 'black',
    // }
  }
});

const App = () => {
  // hook to show the generating alert
  const [generating, setGenerating] = useState(false);

  const generateFile = (form_data: VCPKGManifest): void => {
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
    <ThemeProvider theme={appTheme}>
      <CssBaseline/>
      <main>
        <TopBar/>
        {generating && <GeneratingAlert/>}
        <MainForm generateFile={generateFile} generating={generating}/>
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
