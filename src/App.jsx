import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import './assets/css/main.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Blog from "./pages/Blog";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import DetalleBlog1 from "./pages/DetalleBlog1";
import DetalleBlog2 from "./pages/DetalleBlog2";

function App() {
  return (
    <Router basename="/heartz-web">
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Nosotros" element={<Nosotros />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/Contacto" element={<Contacto />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/DetalleBlog1" element={<DetalleBlog1 />} />
            <Route path="/DetalleBlog2" element={<DetalleBlog2 />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
