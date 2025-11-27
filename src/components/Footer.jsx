import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer text-light">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-5 col-md-12 footer-about">
                        <Link to="/" className="logo d-flex align-items-center mb-3 text-decoration-none">
                            <span className="h3 fw-bold text-white">Heartz</span>
                        </Link>
                        <p className="text-secondary">
                            Tu destino definitivo para vinilos exclusivos y música de alta fidelidad.
                            Conectamos pasiones a través del sonido analógico.
                        </p>

                    </div>

                    <div className="col-lg-2 col-6 footer-links">
                        <h5>Enlaces Útiles</h5>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/nosotros">Sobre Nosotros</Link></li>
                            <li><Link to="/productos">Catálogo</Link></li>
                            <li><Link to="/blog">Blog Musical</Link></li>
                            <li><Link to="/terminos">Términos de servicio</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-6 footer-links">
                        <h5>Nuestros Servicios</h5>
                        <ul>
                            <li><Link to="#">Envíos a todo el país</Link></li>
                            <li><Link to="#">Venta de Vinilos</Link></li>
                            <li><Link to="#">Restauración</Link></li>
                            <li><Link to="#">Comunidad</Link></li>
                            <li><Link to="#">Soporte</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                        <h5>Contacto</h5>
                        <p>Av. Apoquindo 2730</p>
                        <p>Las Condes, Santiago</p>
                        <p className="mt-4"><strong>Teléfono:</strong> <span>+56 9 1234 5678</span></p>
                        <p><strong>Email:</strong> <span>contacto@heartz.cl</span></p>
                    </div>
                </div>
            </div>

            <div className="container copyright text-center mt-4 pt-4 border-top border-secondary border-opacity-10">
                <p className="mb-0">© <span>Copyright</span> <strong className="px-1">Heartz</strong> <span>Todos los derechos reservados</span></p>
                <div className="credits text-secondary small mt-2">
                    Diseñado con <i className="bi bi-heart-fill text-danger mx-1"></i> por el equipo Heartz
                </div>
            </div>
        </footer>
    );
}

export default Footer;