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
                        <div className="mt-3 overflow-hidden rounded-3 shadow-sm">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.2144953341353!2d-70.6013263!3d-33.4176518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf6a675d731f%3A0x652a88d62abde692!2sAv.%20Apoquindo%202730%2C%207550000%20Las%20Condes%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1764286083691!5m2!1ses!2scl"
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación Heartz"
                            ></iframe>
                        </div>
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