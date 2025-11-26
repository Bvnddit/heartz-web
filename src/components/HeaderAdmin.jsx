import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function HeaderAdmin() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#1c1c1c",
        color: "white",
      }}
    >
      <h1 style={{ margin: 0 }}>
        Panel Administrador Heartz
        {user && <span style={{ fontSize: "0.8em", marginLeft: "10px" }}>
          ({user.email})
        </span>}
      </h1>
      <div>
        <button
          onClick={cerrarSesion}
          style={{
            backgroundColor: "#e63946",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}

export default HeaderAdmin;
