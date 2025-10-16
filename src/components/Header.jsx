import { Link } from "react-router-dom";

function Header() {
  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
          {/* Si quieres usar un logo en imagen */}
          {/* <img src="assets/img/logo.png" alt="Heartz" /> */}
          <i className="bi bi-camera" />
          <h1 className="sitename">Heartz</h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list" />
        </nav>

        <div className="d-flex align-items-center">
          <div className="header-social-links me-3">
            <a href="#" className="twitter"><i className="bi bi-twitter-x" /></a>
            <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
            <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
          </div>

          {/* Buscador */}
          <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar productos..."
              aria-label="Buscar"
            />
            <button className="btn btn-outline-light" type="submit">Buscar</button>
          </form>

          {/* Botones de Inicio de Sesión y Registrarse */}
          <div className="header-buttons">
            <Link to="/Login" className="btn btn-outline-light me-2">Iniciar Sesión</Link>
            <Link to="/Registro" className="btn btn-light">Registrarse</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
