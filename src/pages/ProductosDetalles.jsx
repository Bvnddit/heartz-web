import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { vinilos } from "../data/vinilos";
import { artistas } from "../data/artistas";
import { generos } from "../data/generos";
import "../assets/css/main.css";
import { CarritoContext } from "../context/CarritoContext.jsx";

const ProductosDetalles = () => {
  const { agregarProducto } = useContext(CarritoContext);
  const { id_vin } = useParams();
  const navigate = useNavigate();

  const vinilo = vinilos.find((v) => v.id_vin === parseInt(id_vin));
  if (!vinilo) return <p>Vinilo no encontrado</p>;

  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % vinilo.img.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [vinilo.img.length]);

  const getArtista = (id_art) =>
    artistas.find((a) => a.id_art === id_art)?.nombre || "Desconocido";
  const getGenero = (id_gen) =>
    generos.find((g) => g.id_gen === id_gen)?.nombre || "Sin género";

  const handleAñadir = () => {
    agregarProducto(vinilo); // <-- agregamos al carrito
    alert(`Añadido al carrito: ${vinilo.titulo}`);
  };

  const handleComprarAhora = () => {
    agregarProducto(vinilo); // Añadir al carrito
    navigate("/compra"); // Redirigir a la página de compra
  };

  return (
    <div className="producto-detalle blanco-degradado-background min-vh-100 py-5">
      <div className="container-lg">
        <button
          className="btn btn-outline-light mb-4 px-4 py-2 rounded-pill shadow-sm"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-2"></i>Volver
        </button>

        <div className="row g-5">
          {/* Galería de imágenes */}
          <div className="col-lg-6">
            <div className="position-relative">
              <div className="card bg-dark bg-opacity-25 border-0 shadow-lg rounded-4 overflow-hidden">
                <img
                  src={vinilo.img[imgIndex]}
                  alt={`${vinilo.titulo} ${imgIndex + 1}`}
                  className="card-img-top"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient bg-dark bg-opacity-50">
                  <div className="d-flex justify-content-center gap-2">
                    {vinilo.img.map((_, index) => (
                      <button
                        key={index}
                        className={`btn btn-sm rounded-circle ${imgIndex === index ? "btn-light" : "btn-outline-light"
                          }`}
                        style={{ width: "12px", height: "12px", padding: 0 }}
                        onClick={() => setImgIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Miniaturas */}
              <div className="d-flex gap-2 mt-3 justify-content-center">
                {vinilo.img.map((imagen, index) => (
                  <img
                    key={index}
                    src={imagen}
                    alt={`mini ${index + 1}`}
                    className={`rounded-3 shadow-sm ${imgIndex === index ? "border border-3 border-light" : "opacity-50"
                      }`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                    onClick={() => setImgIndex(index)}
                    onMouseEnter={(e) => e.target.style.opacity = "1"}
                    onMouseLeave={(e) => {
                      if (imgIndex !== index) e.target.style.opacity = "0.5";
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Información del producto */}
          <div className="col-lg-6">
            <div className="text-light">
              <h1 className="display-5 fw-bold mb-3">{vinilo.titulo}</h1>

              <div className="d-flex gap-2 mb-4 flex-wrap">
                <span className="badge bg-primary bg-opacity-75 px-3 py-2 rounded-pill">
                  <i className="bi bi-person-fill me-1"></i>
                  {getArtista(vinilo.id_art)}
                </span>
                <span className="badge bg-info bg-opacity-75 px-3 py-2 rounded-pill">
                  <i className="bi bi-music-note-beamed me-1"></i>
                  {getGenero(vinilo.id_gen)}
                </span>
              </div>

              <div className="card bg-dark bg-opacity-50 border-0 shadow-lg rounded-4 p-4 mb-4">
                <div className="row g-3">
                  <div className="col-6">
                    <p className="mb-2 text-white-50 small">Formato</p>
                    <p className="mb-0 fw-semibold">{vinilo.formato}</p>
                  </div>
                  <div className="col-6">
                    <p className="mb-2 text-white-50 small">Color</p>
                    <p className="mb-0 fw-semibold">{vinilo.colorVinilo}</p>
                  </div>
                  <div className="col-6">
                    <p className="mb-2 text-white-50 small">Edición</p>
                    <p className="mb-0 fw-semibold">{vinilo.edicion}</p>
                  </div>
                  <div className="col-6">
                    <p className="mb-2 text-white-50 small">Sello</p>
                    <p className="mb-0 fw-semibold">{vinilo.sello}</p>
                  </div>
                  <div className="col-6">
                    <p className="mb-2 text-white-50 small">País</p>
                    <p className="mb-0 fw-semibold">{vinilo.pais}</p>
                  </div>
                  {vinilo.duracion && (
                    <div className="col-6">
                      <p className="mb-2 text-white-50 small">Duración</p>
                      <p className="mb-0 fw-semibold">{vinilo.duracion} min</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between mb-4 p-4 bg-success bg-opacity-25 rounded-4 border border-success border-opacity-50">
                <div>
                  <p className="mb-0 text-white-50 small">Precio</p>
                  <h2 className="mb-0 fw-bold text-success">${vinilo.precio.toLocaleString("es-CL")}</h2>
                </div>
                <i className="bi bi-vinyl-fill text-success" style={{ fontSize: "3rem", opacity: 0.3 }}></i>
              </div>

              <div className="d-grid gap-3 mb-4">
                <button
                  className="btn btn-light btn-lg rounded-pill shadow-lg py-3 fw-semibold"
                  onClick={handleComprarAhora}
                >
                  <i className="bi bi-cart-check-fill me-2"></i>
                  Comprar ahora
                </button>
                <button
                  className="btn btn-outline-light btn-lg rounded-pill py-3 fw-semibold"
                  onClick={handleAñadir}
                >
                  <i className="bi bi-bag-plus-fill me-2"></i>
                  Añadir al carrito
                </button>
              </div>

              {/* Lista de canciones */}
              <div className="card bg-dark bg-opacity-50 border-0 shadow-lg rounded-4 p-4">
                <h5 className="mb-3 fw-bold">
                  <i className="bi bi-music-note-list me-2"></i>
                  Lista de canciones
                </h5>
                <div className="overflow-auto" style={{ maxHeight: "300px" }}>
                  <ol className="list-group list-group-flush">
                    {vinilo.listaDeCanciones.map((cancion, index) => (
                      <li
                        key={index}
                        className="list-group-item bg-transparent text-light border-secondary py-2"
                      >
                        <span className="text-white-50 me-2">{String(index + 1).padStart(2, '0')}.</span>
                        {cancion}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductosDetalles;

