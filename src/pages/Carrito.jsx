import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext.jsx";

const Carrito = () => {
  const { carrito, agregarProducto, quitarProducto, eliminarProducto, total } = useContext(CarritoContext);
  const navigate = useNavigate();

  if (carrito.length === 0) {
    return (
      <div
        className="container mt-5 text-light d-flex flex-column align-items-center justify-content-center"
        style={{ background: "linear-gradient(135deg, #1c1c1c, #2a1c3b)", minHeight: "80vh", padding: "2rem" }}
      >
        <h1 className="mb-4 text-center">Carrito de Compras</h1>
        <p className="lead text-center">Tu carrito está vacío.</p>
        <button className="btn btn-outline-light mt-3" onClick={() => navigate("/productos")}>
          Ver Productos
        </button>
      </div>
    );
  }

  return (
    <div
      className="container mt-5 text-light"
      style={{ background: "linear-gradient(135deg, #1c1c1c, #2a1c3b)", minHeight: "80vh", padding: "2rem" }}
    >
      <h1 className="mb-5 text-center">Carrito de Compras</h1>

      <div className="list-group mb-4">
        {carrito.map((p) => (
          <div
            key={p.id_vin}
            className="list-group-item list-group-item-dark d-flex align-items-center justify-content-between mb-3 shadow-sm"
            style={{ borderRadius: "0", transition: "transform 0.2s", cursor: "pointer" }}
          >
            <img
              src={p.img[0]}
              alt={p.titulo}
              style={{ width: "120px", height: "120px", objectFit: "cover", marginRight: "1rem", transition: "transform 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div className="flex-grow-1 px-3">
              <h5>{p.titulo}</h5>
              <p className="mb-1">Cantidad: {p.cantidad}</p>
              <p className="mb-0">Precio: ${(p.precio * p.cantidad).toLocaleString("es-CL")}</p>
            </div>
            <div className="d-flex flex-column gap-2">
              <button className="btn btn-success btn-sm" onClick={() => agregarProducto(p)}>+</button>
              <button className="btn btn-warning btn-sm" onClick={() => quitarProducto(p.id_vin)} disabled={p.cantidad === 0}>-</button>
              <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(p.id_vin)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center p-3" style={{ borderTop: "1px solid #444" }}>
        <h3>
          Total: <span className="text-success">${total.toLocaleString("es-CL")}</span>
        </h3>
        <button className="btn btn-primary btn-lg" onClick={() => navigate("/compra")}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Carrito;
