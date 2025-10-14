import radioheadImg from '../assets/img/default/Radiohead-Tour.webp';

function DetalleBlog1() {
    return (
        <div className="main-content">
            <section className="container my-5">
                <div className="row align-items-center" style={{backgroundColor:'#272727', borderRadius: '50px', padding: '20px'}}>
                    <div className="col-md-6 text-center">
                        <img src={radioheadImg} alt="Tornamesas" className="img-fluid shadow" style={{maxHeight: 500, objectFit: 'cover', borderRadius:'50px'}} />
                    </div>
                    <div className="col-md-6">
                        <h2 className="jumbotron-heading mb-3">Radiohead anuncia su regreso a los escenarios luego de 7 años de ausencia</h2>
                        <p className="lead">
                        Tras siete años de pausa en vivo, la icónica banda británica anunció su esperada vuelta a los escenarios.<br />
                        Radiohead recorrerá cinco ciudades europeas —Madrid, Bolonia, Londres, Copenhague y Berlín— con 20 conciertos programados entre noviembre y diciembre de 2025, ofreciendo cuatro presentaciones en cada ciudad.
                        <br /><br />
                        El baterista Phil Selway reveló que se reencontraron en los ensayos del año pasado y la experiencia los motivó a retomar los escenarios. “Después de una pausa de siete años, reconectar con nuestra identidad musical fue realmente positivo… Por ahora, solo serán estas fechas, pero quién sabe a dónde nos llevará todo esto”,
                        dijo. Además, anunciaron el lanzamiento de un álbum en vivo: Hail to the Thief - Live Recordings 2003-2009, que saldrá el 31 de octubre
                        </p>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default DetalleBlog1;