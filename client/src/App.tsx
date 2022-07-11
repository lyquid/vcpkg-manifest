import { Route, Routes } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import MainForm from "./components/MainForm";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // background: {
    //   default: 'black',
    // }
  }
});

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
});

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
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
