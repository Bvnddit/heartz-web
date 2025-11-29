import React, { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../components/Footer";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import { obtenerTodasLasVentas } from "../api/ventas";

function AdminReportes() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await obtenerTodasLasVentas();
        // La respuesta viene en response.data.body según el formato proporcionado
        const data = response.data.body || response.data;

        // Ordenar por idVenta descendente (más recientes primero)
        const ventasOrdenadas = [...data].sort((a, b) => b.idVenta - a.idVenta);

        setVentas(ventasOrdenadas);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, []);

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
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <h2 className="mb-4 text-center">📊 Reporte de Ventas</h2>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : ventas.length === 0 ? (
              <div className="alert alert-info text-center">No hay ventas registradas.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-striped table-hover text-center align-middle">
                  <thead>
                    <tr>
                      <th>ID Venta</th>
                      <th>Fecha</th>
                      <th>Dirección</th>
                      <th>Total</th>
                      <th>Detalles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ventas.map((venta) => (
                      <tr key={venta.idVenta}>
                        <td className="fw-bold text-primary">#{venta.idVenta}</td>
                        <td>
                          <div className="fw-bold">{new Date(venta.fecha).toLocaleDateString()}</div>
                          <small style={{ color: '#aaa' }}>{new Date(venta.fecha).toLocaleTimeString()}</small>
                        </td>
                        <td className="text-start">
                          <div>{venta.direccion}</div>
                          <small style={{ color: '#aaa' }}>{venta.comuna}, {venta.region}</small>
                          {venta.indicaciones && (
                            <div className="text-warning small mt-1">
                              <i className="bi bi-info-circle me-1"></i>{venta.indicaciones}
                            </div>
                          )}
                        </td>
                        <td className="fw-bold text-success fs-5">
                          ${venta.total.toLocaleString('es-CL')}
                        </td>
                        <td className="text-start">
                          <ul className="list-unstyled mb-0 small">
                            {venta.detalles.map((detalle, idx) => (
                              <li key={idx} className="mb-2 p-2 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="fw-bold text-white">
                                    <span className="badge bg-primary me-2">{detalle.cantidad}</span>
                                    {detalle.vinilo?.nombre || 'Producto'}
                                  </span>
                                  <span className="text-info fst-italic ms-2">
                                    {detalle.vinilo?.artista}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminReportes;
