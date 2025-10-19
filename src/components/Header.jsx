import { buscarViniloPorTitulo, buscarArtistaPorNombre } from "../util/Validaciones.js";
import { vinilos } from "../Data/vinilos";
import { artistas } from "../data/artistas";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const viniloEncontrado = buscarViniloPorTitulo(vinilos, busqueda);
    const artistaEncontrado = buscarArtistaPorNombre(artistas, busqueda);

    if (viniloEncontrado) {
      navigate(`/productos/${viniloEncontrado.id_vin}`);
    } else if (artistaEncontrado) {
      navigate(`/productos?artista=${artistaEncontrado.id_art}`);
    } else {
      alert("No se encontró ningún vinilo o artista con ese nombre.");
    }

    setBusqueda("");
  };

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
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

          <form className="d-flex me-3" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar vinilo o artista..."
              aria-label="Buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">Buscar</button>
          </form>



          <div className="header-buttons me-3">
                        {/* Botón de carrito */}
            <button className="btn btn-outline-light m-3e-2 me-2" onClick={() => navigate("/carrito")}>
              🛒 Carrito
            </button>
            <Link to="/Login" className="btn btn-outline-light me-2">Iniciar Sesión</Link>
            <Link to="/Registro" className="btn btn-light me-2">Registrarse</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
