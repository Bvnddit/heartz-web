import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './assets/css/main.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductosDetalles from "./pages/ProductosDetalles";
import Nosotros from "./pages/Nosotros";
import Blog from "./pages/Blog";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import DetalleBlog1 from "./pages/DetalleBlog1";
import DetalleBlog2 from "./pages/DetalleBlog2";
import Admin from "./pages/Admin";
import AdminArtistas from "./pages/AdminArtistas";
import AdminVinilos from "./pages/AdminVinilos";
import AdminGeneros from "./pages/AdminGeneros";
import Carrito from "./pages/Carrito";
import Compra from "./pages/Compra.jsx";
import Compraok from "./pages/Compra-ok.jsx";
import AdminPerfil from "./pages/AdminPerfil.jsx";
import AdminReportes from "./pages/AdminReportes.jsx";
import AdminUsuarios from "./pages/AdminUsuarios.jsx";

function AppContent() {
  const location = useLocation();

  const hideHeaderRoutes = ['/admin'];
  const shouldHideHeader = hideHeaderRoutes.some(path => location.pathname.startsWith(path));

  return (
    <div className="app-container">
      {!shouldHideHeader && <Header />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id_vin" element={<ProductosDetalles />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/detalleBlog1" element={<DetalleBlog1 />} />
          <Route path="/detalleBlog2" element={<DetalleBlog2 />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/compra" element={<Compra />} />
          <Route path="/compra-ok" element={<Compraok />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-artistas" element={<AdminArtistas />} />
          <Route path="/admin-vinilos" element={<AdminVinilos />} />
          <Route path="/admin-generos" element={<AdminGeneros />} />
          <Route path="/admin-perfil" element={<AdminPerfil />} />
          <Route path="/admin-reportes" element={<AdminReportes />} />
          <Route path="/admin-usuarios" element={<AdminUsuarios />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
