import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { vinilos } from "../data/vinilos";
import { artistas } from "../data/artistas";
import { generos } from "../data/generos";
import "../assets/css/main.css";
import { CarritoContext } from "../context/CarritoContext.jsx"; // <-- contexto

const ProductosDetalles = () => {
  const { agregarProducto } = useContext(CarritoContext); // <-- usar contexto
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

  return (
    <div className="producto-detalle blanco-degradado-background py-5 px-4">
      <div className="container-lg">
        <button className="btn btn-outline-light mb-4" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        <div className="row g-4">
          <div className="col-md-5 text-center d-flex">
            <div className="flex-grow-1">
              <img
                src={vinilo.img[imgIndex]}
                alt={`${vinilo.titulo} ${imgIndex + 1}`}
                className="img-fluid rounded-4 shadow mb-3"
              />
            </div>

            <div className="d-flex flex-column ms-3">
              {vinilo.img.map((imagen, index) => (
                <img
                  key={index}
                  src={imagen}
                  alt={`mini ${index + 1}`}
                  className={`rounded shadow-sm mb-2 ${imgIndex === index ? "border border-light" : ""}`}
                  style={{ width: "60px", cursor: "pointer" }}
                  onClick={() => setImgIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="col-md-7 text-light">
            <h2 className="fw-bold mb-3">{vinilo.titulo}</h2>
            <p><strong>Artista:</strong> {getArtista(vinilo.id_art)}</p>
            <p><strong>Género:</strong> {getGenero(vinilo.id_gen)}</p>
            <p><strong>Formato:</strong> {vinilo.formato} — {vinilo.colorVinilo}</p>
            <p><strong>Edición:</strong> {vinilo.edicion}</p>
            <p><strong>Sello:</strong> {vinilo.sello}</p>
            <p><strong>País:</strong> {vinilo.pais}</p>
            {vinilo.duracion && <p><strong>Duración total:</strong> {vinilo.duracion} minutos</p>}
            <p><strong>Precio:</strong> ${vinilo.precio.toLocaleString("es-CL")}</p>
            <div className="mt-4 d-flex gap-3">
              <button className="btn btn-outline-light px-4">Comprar ahora</button>
              <button className="btn btn-success px-4" onClick={handleAñadir}>
                Añadir al carrito
              </button>
            </div>

            <h5 className="mt-4">Lista de canciones</h5>
            <ul className="list-unstyled">
              {vinilo.listaDeCanciones.map((cancion, index) => (
                <li key={index}>- {cancion}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductosDetalles;

