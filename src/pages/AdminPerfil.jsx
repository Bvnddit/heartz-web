import React, { useContext } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../components/Footer";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import { AuthContext } from "../context/AuthContext";

function AdminPerfil() {
  const { user } = useContext(AuthContext);

  // Debug: ver qué datos tiene el usuario
  console.log("Datos del usuario en AdminPerfil:", user);

  // Imagen por defecto
  const imagenPerfil = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  // Obtener el nombre del rol (puede venir como string o como objeto)
  const obtenerNombreRol = (rol) => {
    if (typeof rol === 'object' && rol !== null) {
      return rol.nombre || rol;
    }
    return rol || "Usuario";
  };

  return (
    <>
      <HeaderAdmin />

      <div className="d-flex">
        <BarraLateralAdmin />

        {/* Contenido principal */}
        <div className="flex-grow-1 p-4 text-light" style={{ background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)', minHeight: "100vh" }}>
          <div
            className="p-4 rounded-4 shadow-lg"
            style={{
              background: "linear-gradient(145deg, #1e1e1e, #0f0f0f)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            <div className="text-center mb-4">
              <img
                src={imagenPerfil}
                alt="Perfil"
                className="rounded-circle shadow"
                width="130"
                height="130"
              />
              <h3 className="mt-3">{user?.nombre || "Usuario"}</h3>
              <p className="text-secondary mb-1">{user?.email || user?.correo || "No disponible"}</p>
              <span className="badge bg-success">{obtenerNombreRol(user?.rol)}</span>
            </div>

            <hr className="border-secondary" />

            <div className="mt-4">
              <p><strong>Nombre:</strong> {user?.nombre || "No disponible"}</p>
              <p><strong>Correo:</strong> {user?.email || user?.correo || "No disponible"}</p>
              <p><strong>Rol:</strong> {obtenerNombreRol(user?.rol)}</p>
              <p><strong>RUT:</strong> {user?.rut || "No disponible"}</p>
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-outline-light px-4" disabled>
                Editar perfil
              </button>
              <small className="d-block text-secondary mt-2">Funcionalidad próximamente</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPerfil;
