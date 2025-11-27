import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import ProximosProductos from "../components/ProximosProductos";
import { getAllVinilos } from "../api/vinilos";
import { transformVinilos } from "../util/transformVinilo";
import ImagenVinilo from "../components/ImagenVinilo";

const Home = () => {
  const navigate = useNavigate();
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDestacados = async () => {
      try {
        setLoading(true);
        const response = await getAllVinilos();
        const vinilosAPI = transformVinilos(response.data);
        // Tomar los primeros 3 vinilos como destacados
        setDestacados(vinilosAPI.slice(0, 3));
      } catch (error) {
        console.error("Error al cargar destacados:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDestacados();
  }, []);

  return (
    <>
      {/* Carousel */}
      <Carousel />

      {/* Productos destacados */}
      <div>
        <h1 style={{ textAlign: "center", paddingTop: 10 }}>Productos Destacados</h1>
        <h1 style={{ textAlign: "center", paddingTop: 10 }}>↓</h1>

        <div className="album py-5 bg-light">
          <div className="container">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : (
              <div className="row">
                {destacados.length > 0 ? (
                  destacados.map((vinilo) => (
                    <div key={vinilo.id_vin} className="col-md-4">
                      <div className="card mb-4 box-shadow h-100">
                        <div
                          onClick={() => navigate(`/productos/${vinilo.id_vin}`)}
                          style={{ cursor: "pointer", overflow: "hidden" }}
                        >
                          {vinilo.img && Array.isArray(vinilo.img) && vinilo.img.length > 0 ? (
                            <ImagenVinilo
                              src={vinilo.img[0]}
                              alt={`${vinilo.titulo} - ${vinilo.artista}`}
                              className="img-fluid producto-img"
                              style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "cover",
                                transition: "transform 0.3s ease"
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            />
                          ) : (
                            <div
                              className="bg-secondary text-white d-flex align-items-center justify-content-center"
                              style={{ height: "300px" }}
                            >
                              <i className="bi bi-disc" style={{ fontSize: "3rem" }}></i>
                            </div>
                          )}
                        </div>
                        <div className="card-body d-flex flex-column">
                          <p className="card-text text-muted mb-auto">
                            {vinilo.titulo} - {vinilo.artista} (Vinilo)
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="btn-group">
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => navigate(`/productos/${vinilo.id_vin}`)}
                              >
                                Ver
                              </button>
                            </div>
                            <small className="text-muted">${vinilo.precio.toLocaleString("es-CL")}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No hay productos destacados disponibles.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="bg-dark text-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Lo que dicen nuestros clientes</h2>


          <div className="row g-4">
            {/* Testimonio 1 */}
            <div className="col-md-4">
              <div
                className="p-4 rounded-4 bg-secondary bg-opacity-10 shadow-sm h-100 transition"
                style={{ transition: "transform 0.3s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <p className="fst-italic fs-5">“Excelente calidad y envío rápido.”</p>
                <footer className="blockquote-footer text-light mt-3">Matías R.</footer>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className="col-md-4">
              <div
                className="p-4 rounded-4 bg-secondary bg-opacity-10 shadow-sm h-100 transition"
                style={{ transition: "transform 0.3s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <p className="fst-italic fs-5">“El vinilo de Deftones suena increíble, recomendado.”</p>
                <footer className="blockquote-footer text-light mt-3">Camila S.</footer>
              </div>
            </div>

            {/* Testimonio 3 */}
            <div className="col-md-4">
              <div
                className="p-4 rounded-4 bg-secondary bg-opacity-10 shadow-sm h-100 transition"
                style={{ transition: "transform 0.3s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <p className="fst-italic fs-5">“Una tienda con muy buen gusto musical.”</p>
                <footer className="blockquote-footer text-light mt-3">Diego A.</footer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 text-center" style={{ background: 'linear-gradient(135deg, #1a1a1a, #3b0066)', color: '#fff' }}>
        <div className="container">
          <h2 className="mb-3">Encuentra tu próximo vinilo</h2>
          <p className="text-muted mb-4">
            Explora nuestra colección y déjate llevar por la música que marcó generaciones.
          </p>
          <button className="btn btn-light" onClick={() => navigate('/productos')}>
            Ver catálogo completo
          </button>
        </div>
      </section>
      <ProximosProductos />
      <section className="py-5 text-center" style={{ background: '#1c1c1c', color: '#fff' }}>
        <div className="container">
          <h2 className="mb-3">Nuestra pasión por el vinilo</h2>
          <p className="text-muted mb-4" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Creemos en la magia del sonido analógico, en las portadas que cuentan historias
            y en la sensación única de poner una aguja sobre un disco.
            Gracias por ser parte de esta comunidad que mantiene viva la esencia de la música.
          </p>
          <button className="btn btn-outline-light" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Volver arriba ↑
          </button>
        </div>
      </section>

    </>
  );
};

export default Home;
