import { useParams, useNavigate } from "react-router-dom";
import { vinilos } from "../Data/vinilos";
import { artistas } from "../Data/artistas";
import { generos } from "../Data/generos";

const ProductosDetalles = () => {
  const { id_vin } = useParams(); // obtiene el id del vinilo desde la URL
  const navigate = useNavigate();

  const vinilo = vinilos.find((v) => v.id_vin === parseInt(id_vin));
  if (!vinilo) return <p>Vinilo no encontrado</p>;

  const getArtista = (id_art) => artistas.find((a) => a.id_art === id_art)?.nombre || "Desconocido";
  const getGenero = (id_gen) => generos.find((g) => g.id_gen === id_gen)?.nombre || "Sin género";

  return (
    <div className="container my-5">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>← Volver</button>
      <div className="row">
        <div className="col-md-5">
          <img src={vinilo.img} alt={vinilo.titulo} className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-md-7">
          <h2>{vinilo.titulo}</h2>
          <p><strong>Artista:</strong> {getArtista(vinilo.id_art)}</p>
          <p><strong>Género:</strong> {getGenero(vinilo.id_gen)}</p>
          <p><strong>Formato:</strong> {vinilo.formato} — {vinilo.colorVinilo}</p>
          <p><strong>Precio:</strong> ${vinilo.precio.toLocaleString("es-CL")}</p>
          <p><strong>Edición:</strong> {vinilo.edicion}</p>
          <p><strong>Sello:</strong> {vinilo.sello}</p>
          <p><strong>País:</strong> {vinilo.pais}</p>
          <p className="mt-3">{vinilo.descripcion}</p>

          <button className="btn btn-success mt-3">Añadir al carrito</button>

          <h5 className="mt-4">Lista de canciones:</h5>
          <ul>
            {vinilo.listaDeCanciones?.map((cancion, index) => (
              <li key={index}>{cancion}</li>
            ))}
          </ul>


        </div>
      </div>
    </div>
  );
};

export default ProductosDetalles;
