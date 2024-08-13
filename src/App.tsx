import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teste from "./views/Test";
import Auth from "./views/Auth";
import "./styles/reset.css";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/teste" element={<Teste />} />
        <Route path="/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}
