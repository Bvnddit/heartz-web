import React from "react";
import Carousel from "../components/Carousel";
import vinilo1 from "../assets/img/albums/deftones/saturday-night-wrist-cover.jpg";
import vinilo2 from "../assets/img/albums/magdalena-bay/imaginal-disk-cover.jpg";
import vinilo3 from "../assets/img/albums/casiopea/casiopea-cover.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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
            <div className="row">
              {/* Producto 1 */}
              <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                  <div
                    onClick={() => navigate("/productos/1")}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={vinilo1}
                      alt="Saturday Night Wrist - Deftones"
                      className="img-fluid producto-img"
                    />
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted">
                      Saturday Night Wrist - Deftones (Vinilo)
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => navigate("/productos/1")}
                        >
                          Ver
                        </button>
                      </div>
                      <small className="text-muted">$44.900</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Producto 2 */}
              <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                  <div
                    onClick={() => navigate("/productos/4")}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={vinilo2}
                      alt="Imaginal Disk - Magdalena Bay"
                      className="img-fluid producto-img"
                    />
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted">
                      Imaginal Disk - Magdalena Bay (Vinilo)
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => navigate("/productos/4")}
                        >
                          Ver
                        </button>
                      </div>
                      <small className="text-muted">$39.900</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Producto 3 */}
              <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                  <div
                    onClick={() => navigate("/productos/6")}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={vinilo3}
                      alt="Casiopea - Casiopea"
                      className="img-fluid producto-img"
                    />
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted">
                      Casiopea - Casiopea (Vinilo)
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => navigate("/productos/6")}
                        >
                          Ver
                        </button>
                      </div>
                      <small className="text-muted">$47.900</small>
                    </div>
                  </div>
                </div>
              </div>

            </div>
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
