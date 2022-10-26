import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './views/Home';
import Pizza from "./views/Pizza";
import Carrito from "./views/Carrito";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Context from "./context/context";

function App() {
  const [listadocompra, setCompra] = useState([]);
  const globalState = { listadocompra, setCompra };
  return (
    <>
      <Context.Provider value={ globalState }>
        <BrowserRouter>
          <Navbar />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
