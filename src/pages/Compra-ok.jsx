
import React from "react";
import { useLocation } from "react-router-dom";

const Compraok = () => {
  const location = useLocation();
  const formData = location.state || {}; // Fallback si no hay datos

  const handleMensaje = (mensaje) => {
    alert(mensaje);
  };

  return (
    <div className="container my-5 compraok-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <section id="productos-comprados" className="py-3">
                <div className="container">
                  <div className="text-end">
                    <small>Código orden: ORDER12345</small>
                  </div>
                  <h3 className="card-title">
                    <i className="bi bi-check-circle text-success" />{" "}
                    Se ha realizado la compra. nro #1
                  </h3>
                  <div className="row">
                    <p className="card-text">Datos del cliente:</p>
                    <div className="col-6 mb-3 col-md-4">
                      <label className="form-label">Nombre</label>
                      <input type="text" className="form-control" value={formData.nombre || ""} disabled />
                    </div>
                    <div className="col-6 mb-3 col-md-4">
                      <label className="form-label">Apellidos</label>
                      <input type="text" className="form-control" value={formData.apellidos || ""} disabled />
                    </div>
                    <div className="mb-3 col-6 col-md-4">
                      <label className="form-label">Correo</label>
                      <input type="email" className="form-control" value={formData.correo || ""} disabled />
                    </div>

                    <h5 className="card-title mt-3">Dirección de entrega</h5>
                    <div className="mb-3 col-12 col-md-6">
                      <label className="form-label">Calle</label>
                      <input type="text" className="form-control" value={formData.calle || ""} disabled />
                    </div>
                    <div className="mb-3 col-12 col-md-6">
                      <label className="form-label">Departamento (opcional)</label>
                      <input type="text" className="form-control" value={formData.departamento || ""} disabled />
                    </div>
                    <div className="mb-3 col-6 col-md-6">
                      <label className="form-label">Región</label>
                      <input type="text" className="form-control" value={formData.region || ""} disabled />
                    </div>
                    <div className="mb-3 col-6 col-md-6">
                      <label className="form-label">Comuna</label>
                      <input type="text" className="form-control" value={formData.comuna || ""} disabled />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Indicaciones (opcional)</label>
                      <textarea className="form-control" rows={3} disabled value={formData.indicaciones || ""} />
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover table-sm">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>

                  <div className="text-center mb-3">
                    <div className="card bg-white">
                      <div className="card-body">
                        <h4>Total pagado: <strong>${(formData.total || 0).toLocaleString("es-CL")}</strong></h4>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleMensaje("Boleta descargada")}
                    >
                      Imprimir boleta en PDF
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleMensaje("Se ha enviado la boleta por correo")}
                    >
                      Enviar boleta por email
                    </button>
                  </div>

                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compraok;
