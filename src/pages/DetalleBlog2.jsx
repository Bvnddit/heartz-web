import gamImg from '../assets/img/default/gam.jpg';

function DetalleBlog2() {
    return (
        <div className="main-content">
            <section className="container my-5">
                <div className="row align-items-center" style={{backgroundColor:'#272727', borderRadius: '50px', padding: '20px'}}>
                    <div className="col-md-6 text-center">
                        <img src={gamImg} alt="Tornamesas" className="img-fluid shadow" style={{maxHeight: 500, objectFit: 'cover', borderRadius:'50px'}} />
                    </div>
                    <div className="col-md-6">
                        <h2 className="jumbotron-heading mb-3">El Día del Vinilo 2025 se expande en Santiago: feria, lanzamientos y firmas en el GAM</h2>
                        <p className="lead">
                        Este 9 de agosto, el Centro Cultural Gabriela Mistral (GAM) será sede de la cuarta edición del Día del Vinilo en Chile. 
                        El evento (abierto y gratuito) reunirá a sellos, disquerías, coleccionistas y marcas como Selknam Records, Punto Musical, Sony Music, Universal y sellos independientes como Fisura y Aula Records. 
                        Habrá una feria de vinilos, lanzamientos exclusivos (como La Sangre en el Cuerpo de Los Tres y La Medicina de Los Tetas), escuchas comentadas por los propios artistas y firmas de discos: una celebración imperdible para los amantes del formato analógico.
                        </p>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default DetalleBlog2;