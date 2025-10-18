import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { vinilos as vinilosBase } from "../data/vinilos";
import { artistas as artistasBase } from "../data/artistas";
import { generos as generosBase } from "../data/generos";

const Productos = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const artistaParam = params.get("artista");

  const [filtroGenero, setFiltroGenero] = useState("todos");
  const [filtroArtista, setFiltroArtista] = useState(artistaParam || "todos");
  const [ordenPrecio, setOrdenPrecio] = useState("ninguno");

  const [vinilos, setVinilos] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [generos, setGeneros] = useState([]);

  // Cargar datos desde localStorage + base
  useEffect(() => {
    const vinilosGuardados = JSON.parse(localStorage.getItem("vinilos")) || [];
    const artistasGuardados = JSON.parse(localStorage.getItem("artistas")) || [];
    const generosGuardados = JSON.parse(localStorage.getItem("generos")) || [];

    setVinilos([...vinilosBase, ...vinilosGuardados]);
    setArtistas([...artistasBase, ...artistasGuardados]);
    setGeneros([...generosBase, ...generosGuardados]);
  }, []);

  const getArtista = (id_art) =>
    artistas.find((a) => a.id_art === id_art)?.nombre || "Desconocido";

  const getGenero = (id_gen) =>
    generos.find((g) => g.id_gen === id_gen)?.nombre || "Sin género";

  const handleVer = (vinilo) => {
    const card = document.getElementById(`vinilo-${vinilo.id_vin}`);
    card?.classList.add("fade-out");
    setTimeout(() => navigate(`/productos/${vinilo.id_vin}`), 300);
  };

  const handleAñadir = (vinilo) => {
    alert(`Añadido al carrito: ${vinilo.titulo}`);
  };

  // Filtrado por género y artista
  let vinilosFiltrados = vinilos.filter((v) =>
    filtroGenero === "todos" ? true : v.id_gen.toString() === filtroGenero
  );
  vinilosFiltrados = vinilosFiltrados.filter((v) =>
    filtroArtista === "todos" ? true : v.id_art.toString() === filtroArtista
  );

  // Ordenar por precio
  vinilosFiltrados.sort((a, b) => {
    if (ordenPrecio === "asc") return a.precio - b.precio;
    if (ordenPrecio === "desc") return b.precio - a.precio;
    return 0;
  });

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Nuestros Vinilos</h2>

      {/* Barra de filtros */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 p-3 rounded bg-dark text-white shadow-sm">
        {/* Filtro por género */}
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

        {/* Filtro por artista */}
        <div className="d-flex gap-2 align-items-center">
          <span className="fw-semibold">Artista:</span>
          <select
            className="form-select form-select-sm bg-secondary text-white border-0"
            style={{ width: "160px" }}
            value={filtroArtista}
            onChange={(e) => setFiltroArtista(e.target.value)}
          >
            <option value="todos">Todos</option>
            {artistas.map((a) => (
              <option key={a.id_art} value={a.id_art}>
                {a.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Ordenar por precio */}
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

      {/* Tarjetas de vinilos */}
      <div className="row">
        {vinilosFiltrados.length > 0 ? (
          vinilosFiltrados.map((vinilo) => (
            <div key={vinilo.id_vin} id={`vinilo-${vinilo.id_vin}`} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                {vinilo.img.length > 0 ? (
                  <img
                    src={vinilo.img[0]}
                    className="card-img-top"
                    alt={vinilo.titulo}
                    style={{ cursor: "pointer", transition: "transform 0.3s ease" }}
                    onClick={() => handleVer(vinilo)}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                ) : (
                  <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{height: "200px", cursor: "pointer"}} onClick={() => handleVer(vinilo)}>
                    Sin imagen
                  </div>
                )}

                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{vinilo.titulo}</h5>
                  <p className="card-text text-muted mb-1">{getArtista(vinilo.id_art)}</p>
                  <p className="card-text text-muted mb-1">{getGenero(vinilo.id_gen)}</p>
                  <p className="card-text text-muted mb-1">Formato: {vinilo.formato}</p>
                  <p className="fw-bold text-success">${vinilo.precio.toLocaleString("es-CL")}</p>
                </div>

                <div className="card-footer bg-transparent border-0 d-flex justify-content-center gap-2">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleVer(vinilo)}>
                    Ver
                  </button>
                  <button className="btn btn-outline-success btn-sm" onClick={() => handleAñadir(vinilo)}>
                    Añadir al carro
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No hay vinilos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Productos;
