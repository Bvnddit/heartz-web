import React, { useContext, useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../components/Footer";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import { AuthContext } from "../context/AuthContext";
import { getUsuarioById } from "../api/usuarios";

function AdminPerfil() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener datos frescos del usuario desde el backend
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userId = user.idUsuario || user.id;

          if (userId) {
            const response = await getUsuarioById(userId);
            setUserData(response.data);
            console.log("Datos del usuario obtenidos del backend:", response.data);
          } else {
            // Fallback: usar datos del contexto
            setUserData(user);
            console.log("Usando datos del contexto (no se encontró ID):", user);
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
          // Fallback: usar datos del contexto
          setUserData(user);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

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
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
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
                <h3 className="mt-3">{userData?.nombre || "Usuario"}</h3>
                <p className="text-secondary mb-1">{userData?.correo || userData?.email || "No disponible"}</p>
                <span className="badge bg-success">{obtenerNombreRol(userData?.rol)}</span>
              </div>

              <hr className="border-secondary" />

              <div className="mt-4">
                <p><strong>ID Usuario:</strong> {userData?.idUsuario || userData?.id || "No disponible"}</p>
                <p><strong>Nombre:</strong> {userData?.nombre || "No disponible"}</p>
                <p><strong>Correo:</strong> {userData?.correo || userData?.email || "No disponible"}</p>
                <p><strong>Rol:</strong> {obtenerNombreRol(userData?.rol)}</p>
                <p><strong>RUT:</strong> {userData?.rut || "No disponible"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminPerfil;
