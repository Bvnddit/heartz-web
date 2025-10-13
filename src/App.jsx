import { useState } from 'react';
import './assets/css/main.css'
import Home from './pages/Home.jsx';
import Header from './components/Header.jsx'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

  function App() {
    return (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            

          </Routes>

        </Router>
      );
    }

export default App;