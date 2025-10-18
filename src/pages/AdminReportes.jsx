import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BarraLateralAdmin from "../components/BarraLateralAdmin";

function AdminReportes() {
  // Datos falsos de reportes
  const reportes = [
    {
      id: 1,
      titulo: "Venta de vinilos - Octubre",
      fecha: "15/10/2025",
      descripcion: "Resumen de ventas de vinilos del mes de octubre.",
      estado: "Completado",
    },
    {
      id: 2,
      titulo: "Stock bajo en vinilos",
      fecha: "10/10/2025",
      descripcion: "Se detectaron vinilos con stock menor a 5 unidades.",
      estado: "Pendiente",
    },
    {
      id: 3,
      titulo: "Nuevos artistas agregados",
      fecha: "08/10/2025",
      descripcion: "Revisión de los artistas recientemente añadidos.",
      estado: "Completado",
    },
    {
      id: 4,
      titulo: "Errores en precios",
      fecha: "05/10/2025",
      descripcion: "Se encontraron precios inconsistentes en algunos productos.",
      estado: "En revisión",
    },
    {
      id: 5,
      titulo: "Usuarios nuevos registrados",
      fecha: "01/10/2025",
      descripcion: "Informe de nuevos usuarios registrados en octubre.",
      estado: "Completado",
    },
  ];

  return (
    <>
      <Header />

      <div className="d-flex">
        <BarraLateralAdmin />

        {/* Contenido principal */}
        <div className="flex-grow-1 p-4 text-light" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
          <div
            className="p-4 rounded-4 shadow-lg"
            style={{
              background: "linear-gradient(145deg, #1e1e1e, #0f0f0f)",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <h2 className="mb-4 text-center">📊 Reportes del Sistema</h2>

            <table className="table table-dark table-striped table-hover text-center align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {reportes.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.titulo}</td>
                    <td>{r.fecha}</td>
                    <td>{r.descripcion}</td>
                    <td>
                      <span
                        className={`badge ${
                          r.estado === "Completado"
                            ? "bg-success"
                            : r.estado === "Pendiente"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {r.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminReportes;
