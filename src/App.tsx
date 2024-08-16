import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teste from "./views/Test";
import Auth from "./views/Auth";
import "./styles/reset.css";
import "./styles/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/teste" element={<Teste />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
