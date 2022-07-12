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

export default App;
