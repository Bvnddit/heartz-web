import { buscarViniloPorTitulo, buscarArtistaPorNombre } from "../util/Validaciones.js";
import { vinilos } from "../Data/vinilos";
import { artistas } from "../data/artistas";
import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const [busqueda, setBusqueda] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('#navmenu') && !event.target.closest('.mobile-nav-toggle')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (busqueda.trim() === "") {
      alert("Por favor, introduce un término de búsqueda.");
      return;
    }

    const viniloEncontrado = buscarViniloPorTitulo(vinilos, busqueda);
    const artistaEncontrado = buscarArtistaPorNombre(artistas, busqueda);

    if (viniloEncontrado) {
      navigate(`/productos/${viniloEncontrado.id_vin}`);
    } else if (artistaEncontrado) {
      navigate(`/productos?artista=${artistaEncontrado.id_art}`);
    } else {
      navigate("/productos");
    }

    setBusqueda("");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between px-4">
        {/* Logo */}
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0 text-decoration-none">
          <i className="bi bi-disc-fill me-2 fs-3 text-white"></i>
          <h1 className="sitename">Heartz</h1>
        </Link>

        {/* Navegación principal */}
        <nav id="navmenu" className={`navmenu ${mobileMenuOpen ? 'navmenu-mobile-open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/nosotros" onClick={() => setMobileMenuOpen(false)}>Nosotros</Link></li>
            <li><Link to="/productos" onClick={() => setMobileMenuOpen(false)}>Productos</Link></li>
            <li><Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link></li>
            <li><Link to="/contacto" onClick={() => setMobileMenuOpen(false)}>Contacto</Link></li>
          </ul>

          {/* Elementos móviles: búsqueda, carrito y auth */}
          <div className="navmenu-mobile-content d-xl-none mt-4">
            {/* Buscador móvil */}
            <form className="d-flex mb-4" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2 bg-dark text-light border-secondary"
                type="search"
                placeholder="Buscar vinilo..."
                aria-label="Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit"><i className="bi bi-search"></i></button>
            </form>

            {/* Botón de carrito móvil */}
            <button className="btn btn-outline-light w-100 mb-3 d-flex align-items-center justify-content-center gap-2" onClick={() => { navigate("/carrito"); setMobileMenuOpen(false); }}>
              <i className="bi bi-cart3"></i> Carrito
            </button>

            {/* Auth móvil */}
            {isAuthenticated ? (
              <div className="d-flex flex-column gap-2">
                <div className="text-light mb-2 small opacity-75">
                  <i className="bi bi-person-circle me-2"></i>
                  {user.email}
                </div>
                {isAdmin() && (
                  <Link to="/admin" className="btn btn-warning w-100" onClick={() => setMobileMenuOpen(false)}>Panel Admin</Link>
                )}
                <button
                  className="btn btn-danger w-100"
                  onClick={() => {
                    logout();
                    navigate("/");
                    setMobileMenuOpen(false);
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2">
                <Link to="/Login" className="btn btn-outline-light w-100" onClick={() => setMobileMenuOpen(false)}>Iniciar Sesión</Link>
                <Link to="/Registro" className="btn btn-light w-100" onClick={() => setMobileMenuOpen(false)}>Registrarse</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Icons (Cart + Toggle) */}
        <div className="d-xl-none d-flex align-items-center gap-3">
          <button
            className="btn btn-link text-light p-0 position-relative"
            onClick={() => navigate("/carrito")}
            aria-label="Ver carrito"
          >
            <i className="bi bi-cart3 fs-4"></i>
          </button>

          <i
            className={`mobile-nav-toggle bi ${mobileMenuOpen ? 'bi-x' : 'bi-list'}`}
            onClick={toggleMobileMenu}
            style={{ fontSize: '28px', cursor: 'pointer' }}
          />
        </div>

        {/* Elementos desktop */}
        <div className="d-none d-xl-flex align-items-center gap-3">
          {/* Buscador desktop */}
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-secondary text-light border-end-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                className="form-control bg-transparent border-secondary text-light border-start-0 ps-0"
                type="search"
                placeholder="Buscar..."
                aria-label="Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ maxWidth: '200px' }}
              />
            </div>
            {/* Se agrega un botón de submit oculto. Presionar Enter en el input activará el submit del formulario. */}
            <button type="submit" style={{ display: 'none' }} aria-label="Buscar"></button>
          </form>

          {/* Botones desktop */}
          <div className="header-buttons d-flex align-items-center gap-3">
            {/* Botón de carrito */}
            <button className="btn btn-outline-light d-flex align-items-center gap-2" onClick={() => navigate("/carrito")}>
              <i className="bi bi-cart3"></i>
              <span>Carrito</span>
            </button>

            <div className="vr bg-secondary opacity-50" style={{ height: '24px' }}></div>

            {isAuthenticated ? (
              <div className="dropdown">
                <button className="btn btn-link text-light text-decoration-none dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                    <i className="bi bi-person-fill text-white"></i>
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow-lg border-0 mt-2">
                  <li><span className="dropdown-item-text text-white small">{user.email}</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link to="/perfil" className="dropdown-item"><i className="bi bi-person-badge me-2"></i>Mi Perfil</Link></li>
                  {isAdmin() && (
                    <li><Link to="/admin" className="dropdown-item"><i className="bi bi-speedometer2 me-2"></i>Panel Admin</Link></li>
                  )}
                  <li><button className="dropdown-item text-danger" onClick={() => { logout(); navigate("/"); }}><i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión</button></li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/Login" className="btn btn-outline-light btn-sm px-3 rounded-pill">Ingresar</Link>
                <Link to="/Registro" className="btn btn-light btn-sm px-3 rounded-pill fw-semibold">Registro</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;