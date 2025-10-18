import { Link } from "react-router-dom";

function BarraLateralAdmin() {
  return (
    <div
      className="vh-100 p-3"
      style={{
        background: "linear-gradient(135deg, #1c1c1c, #121213ff)",
        color: "white",
      }}
    >
      <h5>Menú</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin" className="nav-link" style={{ color: "white", margin: "5px 0" }}>Panel</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin-usuarios" className="nav-link" style={{ color: "white", margin: "5px 0" }}>Usuarios</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin-vinilos" className="nav-link" style={{ color: "white", margin: "5px 0" }}>Vinilos</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin-artistas" className="nav-link" style={{ color: "white", margin: "5px 0" }}>Artistas</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin-generos" className="nav-link" style={{ color: "white", margin: "5px 0" }}>Generos</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin-reportes" className="nav-link" style={{ color: "white", margin: "5px 0" }}>Reportes</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin-perfil" className="nav-link" style={{ color: "white", margin: "5px 0" }}>Perfil</Link>
        </li>
      </ul>
    </div>
  );
}

export default BarraLateralAdmin;
