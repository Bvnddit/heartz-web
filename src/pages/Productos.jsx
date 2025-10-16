import React from "react";
import { vinilos } from "../Data/vinilos";
import { artistas } from "../Data/artistas";
import { generos } from "../Data/generos";

const Productos = () => {
  const getArtista = (id_art) => artistas.find((a) => a.id_art === id_art)?.nombre || "Desconocido";
  const getGenero = (id_gen) => generos.find((g) => g.id_gen === id_gen)?.nombre || "Sin género";

  const handleVer = (vinilo) => {
    alert(`🎵 ${vinilo.titulo} - ${getArtista(vinilo.id_art)}\nGénero: ${getGenero(vinilo.id_gen)}\nPrecio: $${vinilo.precio}`);
  };

  const handleAñadir = (vinilo) => {
    alert(`🛒 Añadido al carrito: ${vinilo.titulo}`);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Nuestros Vinilos</h2>

      <div className="row">
        {vinilos.map((vinilo) => (
          <div key={vinilo.id_vin} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={vinilo.img} className="card-img-top" alt={vinilo.titulo} />
              <div className="card-body">
                <h5 className="card-title">{vinilo.titulo}</h5>
                <p className="card-text mb-1">
                  <strong>Artista:</strong> {getArtista(vinilo.id_art)}
                </p>
                <p className="card-text mb-1">
                  <strong>Género:</strong> {getGenero(vinilo.id_gen)}
                </p>
                <p className="card-text text-success fw-bold">
                  ${vinilo.precio.toLocaleString("es-CL")}
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-primary btn-sm" onClick={() => handleVer(vinilo)}>Ver</button>
                <button className="btn btn-success btn-sm" onClick={() => handleAñadir(vinilo)}>Añadir al carrito</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
