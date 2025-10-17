import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vinilos } from "../Data/vinilos";
import { artistas } from "../Data/artistas";
import { generos } from "../Data/generos";
import {
  getArtista,
  getGenero,
  filtrarPorGenero,
  ordenarPorPrecio,
} from "../util/Validaciones.js";

const Productos = () => {
  const navigate = useNavigate();
  const [filtroGenero, setFiltroGenero] = useState("todos");
  const [ordenPrecio, setOrdenPrecio] = useState("ninguno");

  const handleVer = (vinilo) => {
    const card = document.getElementById(`vinilo-${vinilo.id_vin}`);
    card.classList.add("fade-out");
    setTimeout(() => navigate(`/productos/${vinilo.id_vin}`), 300);
  };

  const handleAñadir = (vinilo) => {
    alert(`Añadido al carrito: ${vinilo.titulo}`);
  };

  let vinilosFiltrados = filtrarPorGenero(vinilos, filtroGenero);
  vinilosFiltrados = ordenarPorPrecio(vinilosFiltrados, ordenPrecio);


  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Nuestros Vinilos</h2>

      {/* 🔹 Barra de filtros superior */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 p-3 rounded bg-dark text-white shadow-sm">
        <div className="d-flex gap-2 align-items-center">
          <span className="fw-semibold">Género:</span>
          <select
            className="form-select form-select-sm bg-secondary text-white border-0"
            style={{ width: "160px" }}
            value={filtroGenero}
            onChange={(e) => setFiltroGenero(e.target.value)}
          >
            <option value="todos">Todos</option>
            {generos.map((g) => (
              <option key={g.id_gen} value={g.id_gen}>
                {g.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2 align-items-center">
          <span className="fw-semibold">Ordenar:</span>
          <select
            className="form-select form-select-sm bg-secondary text-white border-0"
            style={{ width: "160px" }}
            value={ordenPrecio}
            onChange={(e) => setOrdenPrecio(e.target.value)}
          >
            <option value="ninguno">Sin orden</option>
            <option value="asc">Menor a mayor</option>
            <option value="desc">Mayor a menor</option>
          </select>
        </div>
      </div>


      <div className="row">
        {vinilosFiltrados.map((vinilo) => (
          <div
            key={vinilo.id_vin}
            id={`vinilo-${vinilo.id_vin}`}
            className="col-md-4 mb-4"
          >
            <div className="card h-100 shadow-sm border-0">
              <img
                src={vinilo.img[0]}
                className="card-img-top"
                alt={vinilo.titulo}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onClick={() => handleVer(vinilo)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{vinilo.titulo}</h5>
                <p className="card-text text-muted mb-1">
                  {getArtista(vinilo.id_art)}
                </p>
                <p className="card-text text-muted mb-1">
                  {getGenero(vinilo.id_gen)}
                </p>
                <p className="card-text text-muted mb-1">
                  Formato: {vinilo.formato}
                </p>
                <p className="fw-bold text-success">
                  ${vinilo.precio.toLocaleString("es-CL")}
                </p>

              </div>
              <div className="card-footer bg-transparent border-0 d-flex justify-content-center gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleVer(vinilo)}
                >
                  Ver
                </button>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => handleAñadir(vinilo)}
                >
                  Añadir al carro
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
