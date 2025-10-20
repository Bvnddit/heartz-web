import { useEffect, useState } from "react";
import axios from "axios";

function ProximosProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {

    const ids = [249504, 15961158, 249506];

    const fetchData = async () => {
      try {
        const results = await Promise.all(
          ids.map((id) =>
            axios.get(`https://api.discogs.com/releases/${id}`, {
              headers: { "User-Agent": "FooBarApp/3.0" },
            })
          )
        );

        const data = results.map((res) => ({
          id: res.data.id,
          titulo: res.data.title,
          artista: res.data.artists[0].name,
          año: res.data.year,
          imagen: res.data.images ? res.data.images[0].uri : "", // portada principal
        }));

        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos Discogs:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-5 bg-dark text-center ">
      <div className="container">
        <h2 className="fw-bold mb-4 titulo-marquee">¡Próximos productos en camino!</h2>
        <div className="row justify-content-center g-4">
          {productos.map((item) => (
            <div key={item.id} className="col-6 col-md-3">
              <img
                src={item.imagen}
                alt={item.titulo}
                className="img-fluid rounded-4 shadow-sm"
              />
              <h5 className="mt-2">{item.titulo}</h5>
              <p className="text-muted ">{item.artista}</p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProximosProductos;
