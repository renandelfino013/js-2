import { BrowserRouter, Routes, Route } from "react-router-dom";  
import Home from "./tarefas";
import Login from "./login";
import Register from "./register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;