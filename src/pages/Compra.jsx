import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { useNavigate } from "react-router-dom";
import { useFormularioCompra } from "../util/Validaciones.js";

const Compra = () => {
  const { carrito, total } = useContext(CarritoContext);
  const navigate = useNavigate();

  const { formData, errores, handleChange, handleCompra } = useFormularioCompra(navigate, total);

  return (
    <div className="container my-5 compraok-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <section id="productos-comprados" className="py-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="card-title text" >Carrito de compra</h4>
                    <p className="card-text text">Completa la siguiente información</p>
                  </div>
                  <div className="btn btn-primary py-2 px-3" style={{ fontWeight: "bold" }}>
                    Total a pagar: ${total.toLocaleString("es-CL")}
                  </div>
                </div>

                <div className="table-responsive mt-3">
                  <table className="table table-hover table-sm">
                    <thead className="table-light">
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carrito.map((p) => (
                        <tr key={p.id_vin}>
                          <td>
                            <img
                              src={p.img[0]}
                              alt={p.titulo}
                              style={{ height: "50px", objectFit: "cover", borderRadius: "3px" }}
                            />
                          </td>
                          <td>{p.titulo}</td>
                          <td>${p.precio.toLocaleString("es-CL")}</td>
                          <td>{p.cantidad}</td>
                          <td>${(p.precio * p.cantidad).toLocaleString("es-CL")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="row mt-4">
                <h4 className="card-title">Información del cliente</h4>
                <div className="col-6 mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre<small className="text-danger">*</small></label>
                  <input
                    type="text"
                    className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                  {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="apellidos" className="form-label">Apellidos<small className="text-danger">*</small></label>
                  <input
                    type="text"
                    className={`form-control ${errores.apellidos ? "is-invalid" : ""}`}
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                  />
                  {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="correo" className="form-label">Correo<small className="text-danger">*</small></label>
                  <input
                    type="email"
                    className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                  />
                  {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                </div>

                <h4 className="card-title mt-3">Dirección de entrega</h4>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="calle" className="form-label">Calle<small className="text-danger">*</small></label>
                  <input
                    type="text"
                    className={`form-control ${errores.calle ? "is-invalid" : ""}`}
                    id="calle"
                    name="calle"
                    value={formData.calle}
                    onChange={handleChange}
                    required
                  />
                  {errores.calle && <div className="invalid-feedback">{errores.calle}</div>}
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="departamento" className="form-label">Departamento (opcional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="departamento"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleChange}
                    placeholder="Ej: 603"
                  />
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="region" className="form-label">Región<small className="text-danger">*</small></label>
                  <select
                    className={`form-select ${errores.region ? "is-invalid" : ""}`}
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="Metropolitana">Metropolitana</option>
                    <option value="Valparaíso">Valparaíso</option>
                    <option value="Biobío">Biobío</option>
                  </select>
                  {errores.region && <div className="invalid-feedback">{errores.region}</div>}
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="comuna" className="form-label">Comuna<small className="text-danger">*</small></label>
                  <select
                    className={`form-select ${errores.comuna ? "is-invalid" : ""}`}
                    id="comuna"
                    name="comuna"
                    value={formData.comuna}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="Santiago">Santiago</option>
                    <option value="Providencia">Providencia</option>
                    <option value="Viña del Mar">Viña del Mar</option>
                    <option value="Concepción">Concepción</option>
                  </select>
                  {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="indicaciones" className="form-label">Indicaciones (opcional)</label>
                  <textarea
                    className="form-control"
                    id="indicaciones"
                    name="indicaciones"
                    value={formData.indicaciones}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Ej.: Entre calles, color del edificio, no tiene timbre."
                  />
                </div>

                <div className="text-end">
                  <button
                    className="btn btn-success btn-lg"
                    onClick={handleCompra}
                  >
                    Pagar ahora <strong>${total.toLocaleString("es-CL")}</strong>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compra;
