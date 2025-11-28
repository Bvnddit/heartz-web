import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { CarritoContext } from "../context/CarritoContext.jsx";
import { filtrarPorGenero, filtrarPorArtista, ordenarPorPrecio } from "../util/Validaciones";
import { getAllVinilos } from "../api/vinilos";
import { transformVinilos } from "../util/transformVinilo";
import ImagenVinilo from "../components/ImagenVinilo";


const Productos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { agregarProducto } = useContext(CarritoContext);

  // Obtiene el parámetro 'artista' de la URL para inicializar el filtro
  const params = new URLSearchParams(location.search);
  const artistaParam = params.get("artista"); 

  const [filtroGenero, setFiltroGenero] = useState("todos");
  const [filtroArtista, setFiltroArtista] = useState(artistaParam || "todos");
  const [ordenPrecio, setOrdenPrecio] = useState("ninguno");

  const [vinilos, setVinilos] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar vinilos desde la API
    const cargarVinilos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllVinilos();
        const vinilosAPI = transformVinilos(response.data);

        setVinilos(vinilosAPI);

        // Extraer artistas y géneros únicos de los vinilos cargados
        // Usamos el nombre como id_art / id_gen
        const uniqueArtistas = [...new Set(vinilosAPI.map(v => v.artista).filter(Boolean))].map(nombre => ({
          id_art: nombre,
          nombre: nombre
        }));
        const uniqueGeneros = [...new Set(vinilosAPI.map(v => v.genero).filter(Boolean))].map(nombre => ({
          id_gen: nombre,
          nombre: nombre
        }));

        setArtistas(uniqueArtistas);
        setGeneros(uniqueGeneros);

      } catch (err) {
        console.error("Error al cargar vinilos:", err);
        setError("Error al cargar los vinilos. Por favor, intenta de nuevo más tarde.");
        setVinilos([]);
      } finally {
        setLoading(false);
      }
    };

    cargarVinilos();
  }, []);
  
  // EFECTO CRUCIAL: Sincroniza el filtro de artista con los cambios en la URL (al buscar desde el Header)
  useEffect(() => {
    const currentArtistaParam = new URLSearchParams(location.search).get("artista");
    setFiltroArtista(currentArtistaParam || "todos");
  }, [location.search]);

  const getArtista = (id_art) => id_art || "Desconocido";

  const getGenero = (id_gen) => id_gen || "Sin género";

  const handleVer = (vinilo) => {
    const card = document.getElementById(`vinilo-${vinilo.id_vin}`);
    card?.classList.add("fade-out");
    setTimeout(() => navigate(`/productos/${vinilo.id_vin}`), 300);
  };

  const handleAñadir = (vinilo) => {
    agregarProducto(vinilo);
    alert(`Añadido al carrito: ${vinilo.titulo}`);
  };

  // --- FILTROS ---
  let vinilosFiltrados = filtrarPorGenero(vinilos, filtroGenero);
  vinilosFiltrados = filtrarPorArtista(vinilosFiltrados, filtroArtista);
  vinilosFiltrados = ordenarPorPrecio(vinilosFiltrados, ordenPrecio); // Se mantiene tu función existente

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Nuestros Vinilos</h2>

      {/*  Barra de filtros */}
      <div className="row mb-4 g-3 justify-content-center">
        <div className="col-md-3">
          <label className="form-label fw-bold">Filtrar por género:</label>
          <select
            className="form-select"
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

        <div className="col-md-3">
          <label className="form-label fw-bold">Filtrar por artista:</label>
          <select
            className="form-select"
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

        <div className="col-md-3">
          <label className="form-label fw-bold">Ordenar por precio:</label>
          <select
            className="form-select"
            value={ordenPrecio}
            onChange={(e) => setOrdenPrecio(e.target.value)}
          >
            <option value="ninguno">Sin orden</option>
            <option value="asc">Menor a mayor</option>
            <option value="desc">Mayor a menor</option>
          </select>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {/* Estado de carga */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando vinilos...</p>
        </div>
      )}

      {/*  Tarjetas de vinilos */}
      {!loading && (
        <div className="row">
          {vinilosFiltrados.length > 0 ? (
            vinilosFiltrados.map((vinilo) => (
              <div key={vinilo.id_vin} id={`vinilo-${vinilo.id_vin}`} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  {vinilo.img && Array.isArray(vinilo.img) && vinilo.img.length > 0 ? (
                    <ImagenVinilo
                      src={vinilo.img[0]}
                      className="card-img-top"
                      alt={vinilo.titulo}
                      style={{
                        cursor: "pointer",
                        transition: "transform 0.3s ease",
                        height: "300px",
                        width: "100%",
                        objectFit: "cover",
                        display: "block"
                      }}
                      onClick={() => handleVer(vinilo)}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  ) : (
                    <div
                      className="bg-secondary text-white d-flex align-items-center justify-content-center"
                      style={{ height: "300px", cursor: "pointer" }}
                      onClick={() => handleVer(vinilo)}
                    >
                      <div className="text-center">
                        <i className="bi bi-image" style={{ fontSize: "2rem", opacity: 0.5 }}></i>
                        <p className="mt-2 mb-0 small">Sin imagen</p>
                      </div>
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
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No hay vinilos disponibles que coincidan con los filtros seleccionados.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Productos;