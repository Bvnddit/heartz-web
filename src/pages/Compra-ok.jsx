import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { CarritoContext } from "../context/CarritoContext";

const Compraok = () => {
  const location = useLocation();
  const formData = location.state || {}; // Fallback si no hay datos
  const { ordenId, items } = formData;
  const { limpiarCarrito } = useContext(CarritoContext);

  // Limpiar el carrito al cargar la página de éxito
  useEffect(() => {
    limpiarCarrito();
  }, []);

  // Estado para Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleMensaje = (mensaje) => {
    showSnackbar(mensaje, "success");
  };

  // Cálculos de IVA
  const total = formData.total || 0;
  const neto = Math.round(total / 1.19);
  const iva = total - neto;

  return (
    <div className="container my-5 compraok-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-white text-dark border-0 shadow">
            <div className="card-body">
              <section id="productos-comprados" className="py-3">
                <div className="container">
                  <div className="text-end text-muted">
                    <small>Código orden: {ordenId || "N/A"}</small>
                  </div>
                  <h3 className="card-title text-center mb-4 text-success">
                    <i className="bi bi-check-circle-fill me-2" />
                    ¡Compra exitosa!
                  </h3>
                  <p className="text-center text-muted mb-4">
                    Tu pedido <strong>#{ordenId || "N/A"}</strong> ha sido procesado correctamente.
                  </p>

                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <h5 className="border-bottom pb-2 text-primary">Datos del cliente</h5>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Nombre</label>
                      <div className="form-control bg-light text-dark border-0">{formData.nombre || ""}</div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Correo</label>
                      <div className="form-control bg-light text-dark border-0">{formData.correo || ""}</div>
                    </div>

                    <div className="col-12 mt-4">
                      <h5 className="border-bottom pb-2 text-primary">Dirección de entrega</h5>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Calle</label>
                      <div className="form-control bg-light text-dark border-0">{formData.calle || ""}</div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Departamento</label>
                      <div className="form-control bg-light text-dark border-0">{formData.departamento || "-"}</div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Región</label>
                      <div className="form-control bg-light text-dark border-0">{formData.region || ""}</div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Comuna</label>
                      <div className="form-control bg-light text-dark border-0">{formData.comuna || ""}</div>
                    </div>
                  </div>

                  <h5 className="border-bottom pb-2 text-primary mt-4">Resumen de productos</h5>
                  <div className="table-responsive mb-4">
                    <table className="table table-hover table-sm align-middle">
                      <thead>
                        <tr className="text-muted">
                          <th>Producto</th>
                          <th className="text-center">Cant.</th>
                          <th className="text-end">Precio</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items && items.map((item) => (
                          <tr key={item.id_vin}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={item.img && item.img[0]}
                                  alt={item.titulo}
                                  style={{ height: "40px", width: "40px", objectFit: "cover", borderRadius: "4px" }}
                                />
                                <span className="small fw-bold">{item.titulo}</span>
                              </div>
                            </td>
                            <td className="text-center">{item.cantidad}</td>
                            <td className="text-end text-muted">${item.precio.toLocaleString("es-CL")}</td>
                            <td className="text-end fw-bold">${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="row justify-content-end">
                    <div className="col-md-6">
                      <div className="card bg-light border-0">
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-1 text-muted">
                            <span>Neto:</span>
                            <span>${neto.toLocaleString("es-CL")}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2 text-muted">
                            <span>IVA (19%):</span>
                            <span>${iva.toLocaleString("es-CL")}</span>
                          </div>
                          <div className="d-flex justify-content-between border-top pt-2">
                            <span className="h5 text-dark">Total Pagado:</span>
                            <span className="h5 text-success fw-bold">${total.toLocaleString("es-CL")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-5 d-flex justify-content-center gap-3">
                    <button
                      className="btn btn-outline-danger d-flex align-items-center gap-2"
                      onClick={() => handleMensaje("Boleta descargada")}
                    >
                      <i className="bi bi-file-earmark-pdf"></i> Descargar Boleta
                    </button>
                    <button
                      className="btn btn-outline-success d-flex align-items-center gap-2"
                      onClick={() => handleMensaje("Se ha enviado la boleta por correo")}
                    >
                      <i className="bi bi-envelope"></i> Enviar por Email
                    </button>
                  </div>

                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Compraok;
