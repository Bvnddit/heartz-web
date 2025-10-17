import { Link, useNavigate } from "react-router-dom";

function HeaderAdmin() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
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
      <h1 style={{ margin: 0 }}>Panel Administrador Heartz</h1>
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
