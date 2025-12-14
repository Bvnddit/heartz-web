import { useContext, useState, useEffect } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFormularioCompra, validarFormularioCompra } from "../util/Validaciones.js";
import { registrarVenta } from "../api/ventas";
import { getUsuarioById } from "../api/usuarios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import comunasRegionesData from "../data/comunas-regiones.json";

const Compra = () => {
  const { carrito, total } = useContext(CarritoContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const { formData, errores, setErrores, handleChange: originalHandleChange, setFormData } = useFormularioCompra(navigate, total);

  // Cargar datos del usuario autenticado desde el backend
  useEffect(() => {
    const fetchUserData = async () => {
      if (user && isAuthenticated) {
        try {
          // Obtener el ID del usuario
          const userId = user.idUsuario || user.id;

          if (userId) {
            // Hacer petición al backend para obtener datos frescos
            const response = await getUsuarioById(userId);
            const userData = response.data;

            // Actualizar el formulario con los datos del backend
            setFormData(prev => ({
              ...prev,
              nombre: userData.nombre || "",
              correo: userData.correo || ""
            }));
          } else {
            // Fallback: usar datos del contexto si no hay ID
            setFormData(prev => ({
              ...prev,
              nombre: user.nombre || "",
              correo: user.correo || ""
            }));
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
          // Fallback: usar datos del contexto si falla la petición
          setFormData(prev => ({
            ...prev,
            nombre: user.nombre || "",
            correo: user.correo || ""
          }));
        }
      }
    };

    fetchUserData();
  }, [user, isAuthenticated, setFormData]);

  // Derivar regiones y comunas
  const regiones = comunasRegionesData.regiones || [];

  // Custom handleChange para manejar la lógica de comunas dependientes de la región
  const handleChangeWithRegionLogic = (e) => {
    const { name, value } = e.target;

    // Si cambia la región, reiniciamos la comuna
    if (name === "region") {
      setFormData(prev => ({
        ...prev,
        region: value,
        comuna: "" // Reset comuna
      }));
    } else {
      // Para otros campos usamos el handler original
      if (originalHandleChange) {
        originalHandleChange(e);
      } else {
        // Fallback por si originalHandleChange no está disponible como se espera (depende de la implementación del hook)
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    }
  };

  // Obtener comunas de la región seleccionada
  const comunasDisponibles = regiones.find(r => r.region === formData.region)?.comunas || [];

  // Estado para el diálogo
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: null
  });

  const closeDialog = () => {
    setDialog({ ...dialog, open: false });
    if (dialog.onConfirm) {
      dialog.onConfirm();
    }
  };

  const handleFinalizarCompra = async () => {
    // 1. Validar formulario
    const nuevosErrores = validarFormularioCompra(formData);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return; // Hay errores, no continuar
    }

    setLoading(true);

    try {
      // Debug: Ver datos del usuario
      console.log("Usuario logueado (Contexto):", user);
      console.log("Keys del usuario:", Object.keys(user || {}));
      console.log("ID del usuario (idUsuario):", user?.idUsuario);
      console.log("ID del usuario (id):", user?.id);

      // Calcular total sumando todos los items del carrito
      const totalCalculado = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
      console.log("Total calculado:", totalCalculado);

      // Validar que el usuario tenga ID
      const userId = user?.idUsuario || user?.id;
      if (!userId) {
        setDialog({
          open: true,
          title: 'Error de sesión',
          content: 'No se pudo identificar al usuario. Por favor, cierra sesión e ingresa nuevamente.',
          onConfirm: null
        });
        setLoading(false);
        return;
      }

      // 2. Preparar payload según el modelo VentaDTO del backend
      const ventaData = {
        idUsuario: userId, // Backend espera idUsuario
        total: totalCalculado,
        direccion: formData.calle,
        departamento: formData.departamento || "",
        region: formData.region,
        comuna: formData.comuna,
        indicaciones: formData.indicaciones || "",

        // Detalles de la venta (List<DetalleVentaDTO>)
        detalles: carrito.map(item => ({
          idVinilo: item.id_vin, // Backend espera idVinilo
          cantidad: item.cantidad,
          precio: item.precio    // Backend espera precio
        }))
      };

      console.log("Enviando venta:", ventaData);

      // 3. Llamar a la API
      const response = await registrarVenta(ventaData);
      console.log("Respuesta del backend:", response.data);

      // 4. Mostrar mensaje de éxito y redirigir
      setDialog({
        open: true,
        title: '¡Compra exitosa!',
        content: response.data.message || 'Tu pedido ha sido procesado correctamente',
        onConfirm: () => {
          navigate("/compra-ok", {
            state: {
              ...formData,
              total: totalCalculado,
              ordenId: response.data.idVenta || response.data.id || "PENDIENTE",
              items: carrito
            }
          });
        }
      });

    } catch (error) {
      console.error("Error al procesar la compra:", error);
      console.error("Error response:", error.response);

      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        "Hubo un error al procesar tu compra. Por favor, intenta nuevamente.";

      setDialog({
        open: true,
        title: 'Error en la compra',
        content: errorMessage,
        onConfirm: null
      });
    } finally {
      setLoading(false);
    }
  };

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
                  <div className="text-end">
                    <div className="small text-muted">
                      Neto: ${Math.round(total / 1.19).toLocaleString("es-CL")} | IVA: ${(total - Math.round(total / 1.19)).toLocaleString("es-CL")}
                    </div>
                    <div className="btn btn-primary py-2 px-3 mt-1" style={{ fontWeight: "bold" }}>
                      Total a pagar: ${total.toLocaleString("es-CL")}
                    </div>
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
                <div className="col-12 col-md-6 mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre completo<small className="text-danger">*</small></label>
                  <input
                    type="text"
                    className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChangeWithRegionLogic}
                    disabled
                    required
                  />
                  {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="correo" className="form-label">Correo<small className="text-danger">*</small></label>
                  <input
                    type="email"
                    className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChangeWithRegionLogic}
                    disabled
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
                    onChange={handleChangeWithRegionLogic}
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
                    onChange={handleChangeWithRegionLogic}
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
                    onChange={handleChangeWithRegionLogic}
                    required
                  >
                    <option value="">Seleccione...</option>
                    {regiones.map((reg, index) => (
                      <option key={index} value={reg.region}>
                        {reg.region}
                      </option>
                    ))}
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
                    onChange={handleChangeWithRegionLogic}
                    required
                    disabled={!formData.region}
                  >
                    <option value="">Seleccione...</option>
                    {comunasDisponibles.map((com, index) => (
                      <option key={index} value={com}>
                        {com}
                      </option>
                    ))}
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
                    onChange={handleChangeWithRegionLogic}
                    rows={3}
                    placeholder="Ej.: Entre calles, color del edificio, no tiene timbre."
                  />
                </div>

                <div className="text-end">
                  <button
                    className="btn btn-success btn-lg"
                    onClick={handleFinalizarCompra}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Procesando...
                      </>
                    ) : (
                      <>Pagar ahora <strong>${total.toLocaleString("es-CL")}</strong></>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Diálogo de información/confirmación */}
      <Dialog
        open={dialog.open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialog.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Compra;
