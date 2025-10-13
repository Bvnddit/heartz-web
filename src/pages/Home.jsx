import React from "react";
import Carousel from "../components/Carousel";
import vinilo1 from "../assets/img/albums/deftones/saturday-night-wrist-cover.jpg";
import vinilo2 from "../assets/img/albums/magdalena-bay/imaginal-disk-cover.jpg";
import vinilo3 from "../assets/img/albums/casiopea/casiopea-cover.jpg";

function Home() {
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
                  <a href="detalledeftones.html" className="img-link">
                    <img src={vinilo1} alt="Saturday Night Wrist - Deftones" className="img-fluid producto-img" />
                  </a>
                  <div className="card-body">
                    <p className="card-text text-muted">Saturday Night Wrist - Deftones (Vinilo)</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <a className="btn btn-sm btn-outline-secondary" href="detalledeftones.html">Ver</a>
                      </div>
                      <small className="text-muted">$44.900</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Producto 2 */}
              <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                  <a href="detallemagdalena.html" className="img-link">
                    <img src={vinilo2} alt="Imaginal Disk - Magdalena Bay" className="img-fluid producto-img" />
                  </a>
                  <div className="card-body">
                    <p className="card-text text-muted">Imaginal Disk - Magdalena Bay (Vinilo)</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <a className="btn btn-sm btn-outline-secondary" href="detallemagdalena.html">Ver</a>
                      </div>
                      <small className="text-muted">$56.900</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Producto 3 */}
              <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                  <a href="#" className="img-link">
                    <img src={vinilo3} alt="Casiopea - Casiopea" className="img-fluid producto-img" />
                  </a>
                  <div className="card-body">
                    <p className="card-text text-muted">Casiopea - Casiopea (Vinilo)</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Ver</button>
                      </div>
                      <small className="text-muted">$68.900</small>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
