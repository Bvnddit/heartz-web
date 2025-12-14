import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { AuthContext } from "../context/AuthContext";
import { Snackbar, Alert } from "@mui/material";

const Carrito = () => {
  const { carrito, agregarProducto, quitarProducto, eliminarProducto, total } = useContext(CarritoContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);

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

  // Calcular subtotal (sin descuento)
  const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  // Costo de envío (gratuito si supera $50.000)
  const costoEnvio = subtotal >= 50000 ? 0 : 5000;

  // Total final con descuento y envío
  const totalFinal = subtotal - descuentoAplicado + costoEnvio;

  const aplicarDescuento = () => {
    if (codigoDescuento.toLowerCase() === "heartz10") {
      setDescuentoAplicado(subtotal * 0.1);
      showSnackbar("¡Código aplicado! 10% de descuento.", "success");
    } else {
      setDescuentoAplicado(0);
      showSnackbar("El código de descuento ingresado no es válido", "error");
    }
  };

  return (
    <div
      className="container-fluid py-5 text-light"
      style={{ background: "var(--background-color)", minHeight: "100vh" }}
    >
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/productos" className="text-secondary text-decoration-none">Productos</Link></li>
            <li className="breadcrumb-item active text-white" aria-current="page">Carrito</li>
          </ol>
        </nav>

        <div className="row mb-5">
          <div className="col-12">
            <h1 className="display-5 fw-bold mb-2">Tu Carrito de Compras</h1>
            <p className="text-secondary">
              Tienes {carrito.reduce((acc, item) => acc + item.cantidad, 0)} artículos en tu carrito
            </p>
          </div>
        </div>

        {carrito.length === 0 ? (
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="text-center py-5 bg-dark rounded-4 shadow-sm border border-secondary border-opacity-25">
                <div className="mb-4">
                  <div className="bg-black d-inline-flex p-4 rounded-circle">
                    <i className="bi bi-cart-x display-4 text-secondary"></i>
                  </div>
                </div>
                <h2 className="mb-3 fw-bold">Tu carrito está vacío</h2>
                <p className="lead mb-4 text-secondary px-5">
                  ¡Parece que aún no has añadido ningún vinilo a tu colección!
                  Explora nuestro catálogo y encuentra tu próximo tesoro musical.
                </p>
                <button className="btn btn-primary-custom btn-lg px-5" onClick={() => navigate("/productos")}>
                  <i className="bi bi-disc me-2"></i>Explorar Catálogo
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-5">
            {/* Lista de productos */}
            <div className="col-lg-8">
              {/* Header de tabla para desktop */}
              <div className="d-none d-md-flex justify-content-between text-secondary mb-3 px-3 small text-uppercase fw-bold">
                <div style={{ width: "45%" }}>Producto</div>
                <div style={{ width: "20%" }} className="text-center">Cantidad</div>
                <div style={{ width: "20%" }} className="text-end">Precio</div>
                <div style={{ width: "15%" }} className="text-end">Total</div>
              </div>

              <div className="d-flex flex-column gap-3">
                {carrito.map((producto) => (
                  <div key={producto.id_vin} className="card border-0 bg-dark shadow-sm rounded-3 overflow-hidden">
                    <div className="card-body p-3 p-md-4">
                      <div className="row align-items-center">
                        {/* Imagen y Título */}
                        <div className="col-md-5 d-flex align-items-center gap-3">
                          <img
                            src={producto.img[0]}
                            alt={producto.titulo}
                            className="rounded-3 object-fit-cover"
                            style={{ width: "80px", height: "80px", cursor: "pointer" }}
                            onClick={() => navigate(`/productos/${producto.id_vin}`)}
                          />
                          <div>
                            <h6 className="mb-1 fw-bold text-white text-truncate" style={{ maxWidth: "200px" }}>
                              {producto.titulo}
                            </h6>
                            <button
                              className="btn btn-link text-danger p-0 text-decoration-none small mt-1"
                              onClick={() => eliminarProducto(producto.id_vin)}
                            >
                              <i className="bi bi-trash me-1"></i>Eliminar
                            </button>
                          </div>
                        </div>

                        {/* Cantidad (Móvil y Desktop) */}
                        <div className="col-md-3 col-6 mt-3 mt-md-0 d-flex justify-content-md-center">
                          <div className="d-flex flex-column align-items-center gap-2">
                            <div className="d-flex align-items-center gap-2">
                              <button
                                className="btn btn-sm btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: '32px', height: '32px', fontSize: '18px', padding: 0 }}
                                onClick={() => quitarProducto(producto.id_vin)}
                                disabled={producto.cantidad <= 1}
                              >
                                −
                              </button>
                              <span className="text-white fw-bold px-3" style={{ minWidth: '40px', textAlign: 'center' }}>
                                {producto.cantidad}
                              </span>
                              <button
                                className="btn btn-sm btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: '32px', height: '32px', fontSize: '18px', padding: 0 }}
                                onClick={() => {
                                  const resultado = agregarProducto(producto);
                                  if (!resultado.agregado && resultado.mensaje) {
                                    showSnackbar(resultado.mensaje, "warning");
                                  }
                                }}
                                disabled={producto.cantidad >= producto.stock}
                              >
                                +
                              </button>
                            </div>
                            <small className="text-secondary" style={{ fontSize: '0.7rem' }}>
                              Stock disponible: {producto.stock}
                            </small>
                          </div>
                        </div>

                        {/* Precio Unitario (Oculto en móvil pequeño si se prefiere, pero útil) */}
                        <div className="col-md-2 d-none d-md-block text-end text-secondary">
                          ${producto.precio.toLocaleString("es-CL")}
                        </div>

                        {/* Total por producto */}
                        <div className="col-md-2 col-6 mt-3 mt-md-0 text-end">
                          <span className="fw-bold text-white">
                            ${(producto.precio * producto.cantidad).toLocaleString("es-CL")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button className="btn btn-outline-light" onClick={() => navigate("/productos")}>
                  <i className="bi bi-arrow-left me-2"></i>Continuar Comprando
                </button>
              </div>
            </div>

            {/* Resumen de compra */}
            <div className="col-lg-4">
              <div className="card border-0 bg-dark shadow-lg rounded-4 sticky-top" style={{ top: "100px" }}>
                <div className="card-body p-4">
                  <h4 className="card-title fw-bold mb-4 text-white">Resumen del Pedido</h4>

                  <div className="d-flex justify-content-between mb-2 text-secondary">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString("es-CL")}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2 text-secondary">
                    <span>Envío estimado</span>
                    <span className={costoEnvio === 0 ? "text-success fw-bold" : ""}>
                      {costoEnvio === 0 ? "Gratis" : `$${costoEnvio.toLocaleString("es-CL")}`}
                    </span>
                  </div>

                  {descuentoAplicado > 0 && (
                    <div className="d-flex justify-content-between mb-2 text-success">
                      <span>Descuento aplicado</span>
                      <span>-${descuentoAplicado.toLocaleString("es-CL")}</span>
                    </div>
                  )}

                  <hr className="my-4 border-secondary opacity-25" />

                  <div className="d-flex justify-content-between mb-2 text-secondary small">
                    <span>Neto</span>
                    <span>${Math.round(totalFinal / 1.19).toLocaleString("es-CL")}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4 text-secondary small">
                    <span>IVA (19%)</span>
                    <span>${(totalFinal - Math.round(totalFinal / 1.19)).toLocaleString("es-CL")}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-4 align-items-center">
                    <span className="h5 mb-0">Total a Pagar</span>
                    <span className="h3 mb-0 fw-bold text-white">${totalFinal.toLocaleString("es-CL")}</span>
                  </div>

                  {/* Código de descuento */}
                  <div className="mb-4">
                    <label className="form-label small text-secondary">¿Tienes un código promocional?</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-black text-light border-secondary border-opacity-50"
                        placeholder="Ingresa tu código"
                        value={codigoDescuento}
                        onChange={(e) => setCodigoDescuento(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-light"
                        type="button"
                        onClick={aplicarDescuento}
                        disabled={!codigoDescuento}
                      >
                        Aplicar
                      </button>
                    </div>
                    {/* Hint temporal para demo */}
                    <small className="text-secondary mt-1 d-block fst-italic" style={{ fontSize: '0.75rem' }}>
                      Tip: Usa "HEARTZ10"
                    </small>
                  </div>

                  <button
                    className="btn btn-success w-100 py-3 mb-3 fw-bold shadow-sm"
                    onClick={() => {
                      if (!isAuthenticated) {
                        showSnackbar("Debes iniciar sesión para continuar con la compra", "warning");
                        setTimeout(() => navigate("/login"), 1500);
                      } else {
                        navigate("/compra");
                      }
                    }}
                  >
                    PROCEDER AL PAGO
                  </button>

                  {/* Métodos de pago */}
                  <div className="text-center mt-4">
                    <p className="small text-secondary mb-2">Aceptamos</p>
                    <div className="d-flex justify-content-center gap-3 fs-4 text-secondary opacity-75">
                      <i className="bi bi-credit-card-2-front" title="Crédito/Débito"></i>
                      <i className="bi bi-paypal" title="PayPal"></i>
                      <i className="bi bi-bank" title="Transferencia"></i>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 text-center">
                    <small className="text-secondary d-flex align-items-center justify-content-center gap-1">
                      <i className="bi bi-shield-lock-fill text-success"></i>
                      Checkout Seguro SSL
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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

export default Carrito;
