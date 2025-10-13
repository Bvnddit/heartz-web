import { Link } from "react-router-dom";
import { Carousel as BootstrapCarousel } from "react-bootstrap"; // renombramos
import img1 from "../assets/img/default/carrusel-1.jpg";
import img2 from "../assets/img/default/vinilo2.jpg";
import img3 from "../assets/img/default/carousel-4.jpg";

export default function Carousel() {
  return (
    <BootstrapCarousel fade interval={4000} pause={false}>
      <BootstrapCarousel.Item>
        <Link to="/productos">
          <img
            className="d-block w-100"
            src={img1}
            alt="Productos"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <BootstrapCarousel.Caption>
            <h3>¡Descubre nuestro catálogo!</h3>
            <p>Los mejores vinilos y productos exclusivos</p>
          </BootstrapCarousel.Caption>
        </Link>
      </BootstrapCarousel.Item>

      <BootstrapCarousel.Item>
        <Link to="/blog">
          <img
            className="d-block w-100"
            src={img2}
            alt="Blog"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <BootstrapCarousel.Caption>
            <h3>Noticias y novedades</h3>
            <p>Eventos, lanzamientos y artículos de interés</p>
          </BootstrapCarousel.Caption>
        </Link>
      </BootstrapCarousel.Item>

      <BootstrapCarousel.Item>
        <Link to="/contacto">
          <img
            className="d-block w-100"
            src={img3}
            alt="Contacto"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <BootstrapCarousel.Caption>
            <h3>Contáctanos</h3>
            <p>Estamos para ayudarte con tus compras y consultas</p>
          </BootstrapCarousel.Caption>
        </Link>
      </BootstrapCarousel.Item>
    </BootstrapCarousel>
  );
}
