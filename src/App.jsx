import { useState } from 'react';
import './assets/css/main.css'
import Home from './pages/Home.jsx';
import Productos from './pages/Productos.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Blog from './pages/Blog.jsx';
import Contacto from './pages/Contacto.jsx';
import Header from './components/Header.jsx'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

  function App() {
    return (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Nosotros" element={<Nosotros />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/Contacto" element={<Contacto />} />

          </Routes>

        </Router>
      );
    }

export default App;