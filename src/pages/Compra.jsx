import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { useNavigate } from "react-router-dom";

const Compra = () => {
  const { carrito, total } = useContext(CarritoContext);
  const navigate = useNavigate();

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
                  <input type="text" className="form-control" id="nombre" name="nombre" required />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="apellidos" className="form-label">Apellidos<small className="text-danger">*</small></label>
                  <input type="text" className="form-control" id="apellidos" name="apellidos" required />
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="correo" className="form-label">Correo<small className="text-danger">*</small></label>
                  <input type="email" className="form-control" id="correo" name="correo" required />
                </div>

                <h4 className="card-title mt-3">Dirección de entrega</h4>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="calle" className="form-label">Calle<small className="text-danger">*</small></label>
                  <input type="text" className="form-control" id="calle" name="calle" required />
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="departamento" className="form-label">Departamento (opcional)</label>
                  <input type="text" className="form-control" id="departamento" name="departamento" placeholder="Ej: 603" />
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="region" className="form-label">Región<small className="text-danger">*</small></label>
                  <select className="form-select" id="region" required></select>
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="comuna" className="form-label">Comuna<small className="text-danger">*</small></label>
                  <select className="form-select" id="comuna" required></select>
                </div>
                <div className="mb-3">
                  <label htmlFor="indicaciones" className="form-label">Indicaciones (opcional)</label>
                  <textarea
                    className="form-control"
                    id="indicaciones"
                    rows={3}
                    placeholder="Ej.: Entre calles, color del edificio, no tiene timbre."
                  />
                </div>

                <div className="text-end">
                  <button
                    className="btn btn-success btn-lg"
                    onClick={() => navigate("/compra-ok")}
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
