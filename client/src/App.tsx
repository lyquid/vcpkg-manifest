import { Route, Routes } from "react-router-dom";
import MainForm from "./components/mainForm";

const App = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<MainForm/>}/>
        {/* <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/create" element={<Create/>}/> */}
      </Routes>
    </div>
  );
};

export default App;
