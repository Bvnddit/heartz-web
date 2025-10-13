import { Link } from "react-router-dom";
import img1 from '../assets/img/default/carrusel-1.jpg';
import img2 from '../assets/img/default/vinilo2.jpg';
import img3 from '../assets/img/default/carousel-4.jpg';

export default function Carousel() {
  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      {/* Indicadores */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        <div className="carousel-item active position-relative">
          <Link to="/productos">
            <img src={img1} className="d-block w-100" alt="Productos" style={{ height: '500px', objectFit: 'cover' }}/>
            <div className="carousel-caption d-none d-md-block">
              <h3>¡Descubre nuestro catálogo!</h3>
              <p>Los mejores vinilos y productos exclusivos</p>
            </div>
          </Link>
        </div>

        <div className="carousel-item position-relative">
          <Link to="/blog">
            <img src={img2} className="d-block w-100" alt="Blog" style={{ height: '500px', objectFit: 'cover' }}/>
            <div className="carousel-caption d-none d-md-block ">
              <h3>Noticias y novedades</h3>
              <p>Eventos, lanzamientos y artículos de interés</p>
            </div>
          </Link>
        </div>

        <div className="carousel-item position-relative">
          <Link to="/contacto">
            <img src={img3} className="d-block w-100" alt="Contacto" style={{ height: '500px', objectFit: 'cover' }}/>
            <div className="carousel-caption d-none d-md-block">
              <h3>Contáctanos</h3>
              <p>Estamos para ayudarte con tus compras y consultas</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Controles */}
      <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
