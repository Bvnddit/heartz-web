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
import DetalleBlog from "./pages/DetalleBlog";
import Admin from "./pages/Admin";
import AdminVinilos from "./pages/AdminVinilos";
import AdminBlog from "./pages/AdminBlog";
import Carrito from "./pages/Carrito";
import Compra from "./pages/Compra.jsx";
import Compraok from "./pages/Compra-ok.jsx";
import AdminPerfil from "./pages/AdminPerfil.jsx";
import AdminReportes from "./pages/AdminReportes.jsx";
import AdminUsuarios from "./pages/AdminUsuarios.jsx";
import UsuarioPerfil from "./pages/UsuarioPerfil.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const location = useLocation();

  const hideHeaderRoutes = ['/admin'];
  const shouldHideHeader = hideHeaderRoutes.some(path => location.pathname.startsWith(path));

  // Rutas donde NO se debe mostrar el footer
  const hideFooterRoutes = ['/login', '/registro'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname.toLowerCase()) || location.pathname.startsWith('/admin');

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
          <Route path="/blog/:id" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/compra" element={<Compra />} />
          <Route path="/compra-ok" element={<Compraok />} />

          {/* Rutas protegidas para todos los usuarios autenticados */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'EMPLEADO', 'CLIENTE']} />}>
            <Route path="/perfil" element={<UsuarioPerfil />} />
          </Route>

          {/* Rutas protegidas para ADMIN y EMPLEADO */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'EMPLEADO']} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-vinilos" element={<AdminVinilos />} />
            <Route path="/admin-blogs" element={<AdminBlog />} />
            <Route path="/admin-perfil" element={<AdminPerfil />} />
            <Route path="/admin-reportes" element={<AdminReportes />} />
          </Route>

          {/* Rutas protegidas solo para ADMIN */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin-usuarios" element={<AdminUsuarios />} />
          </Route>
        </Routes>
      </div>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

import ScrollToTop from "./components/ScrollToTop";

// ... existing imports

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
