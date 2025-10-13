import { Link } from "react-router-dom";


function Header() {
  return (
    <header className="p-0 bg-black border-bottom fixed-top">
      <nav className="container d-flex align-items-center gap-4">
        {/* Título a la izquierda */}
        <h1 className="m-0">
          <Link to="/" className="text-white text-decoration-none">Heartz</Link>
        </h1>

        {/* Links de navegación */}
        <ul className="d-flex list-unstyled m-0 gap-3">
          <li>
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li>
            <Link className="nav-link" to="/Productos">Productos</Link>
          </li>
          <li>
            <Link className="nav-link" to="/Nosotros">Nosotros</Link>
          </li>
          <li>
            <Link className="nav-link" to="/Blog">Blog</Link>
          </li>
          <li>
            <Link className="nav-link" to="/Contacto">Contacto</Link>
          </li>
        </ul>

        {/* Íconos sociales + botones de login */}
        <div className="d-flex align-items-center gap-3 ms-auto">
          <a href="#" className="social-link"><i className="bi bi-twitter"></i></a>
          <a href="#" className="social-link"><i className="bi bi-facebook"></i></a>
          <a href="#" className="social-link"><i className="bi bi-instagram"></i></a>

          {/* Botones de iniciar sesión y registrarse */}
          <Link to="/Login" className="btn btn-outline-light btn-sm">Iniciar Sesión</Link>
          <Link to="/Register" className="btn btn-light btn-sm text-dark">Registrarse</Link>
        </div>
      </nav>


    </header>
  );
}

export default Header;
