import { Route, Routes } from "react-router-dom";
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
        <Routes>
          <Route path="/" element={<MainForm/>}/>
        </Routes>
      </main>
    </ThemeProvider>
  );
};

export default App;
