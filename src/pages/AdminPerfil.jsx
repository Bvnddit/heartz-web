import React from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../components/Footer";
import BarraLateralAdmin from "../components/BarraLateralAdmin";

function AdminPerfil() {
  // Datos falsos simulados
  const perfil = {
    nombre: "Francisco Pereira",
    correo: "admin@heartz.cl",
    rol: "Administrador",
    telefono: "+56 9 8765 4321",
    fechaIngreso: "12 de marzo de 2024",
    direccion: "Santiago, Chile",
    imagen: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  return (
    <>
      <HeaderAdmin />

      <div className="d-flex">
        <BarraLateralAdmin />

        {/* Contenido principal */}
        <div className="flex-grow-1 p-4 text-light" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
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
                src={perfil.imagen}
                alt="Perfil"
                className="rounded-circle shadow"
                width="130"
                height="130"
              />
              <h3 className="mt-3">{perfil.nombre}</h3>
              <p className="text-secondary mb-1">{perfil.correo}</p>
              <span className="badge bg-success">{perfil.rol}</span>
            </div>

            <hr className="border-secondary" />

            <div className="mt-4">
              <p><strong>📧 Correo:</strong> {perfil.correo}</p>
              <p><strong>📱 Teléfono:</strong> {perfil.telefono}</p>
              <p><strong>📍 Dirección:</strong> {perfil.direccion}</p>
              <p><strong>🗓️ Fecha de ingreso:</strong> {perfil.fechaIngreso}</p>
              <p><strong>🔐 Rol:</strong> {perfil.rol}</p>
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-outline-light px-4">Editar perfil</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminPerfil;
