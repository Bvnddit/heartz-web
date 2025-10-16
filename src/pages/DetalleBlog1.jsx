// DetalleBlog1.jsx
import radioheadImg from '../assets/img/default/Radiohead-Tour.webp';
import { useEffect, useState } from 'react';

function DetalleBlog1() {
    const [fade, setFade] = useState(false);

    useEffect(() => { setFade(true); }, []);

    return (
        <div className="main-content" 
             style={{
                background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)', 
                minHeight: '100vh', 
                padding: '60px 0',
                color: 'rgba(255,255,255,0.9)',
                transition: 'all 1s ease'
             }}>
            <section className="container">
                <div className={`row align-items-center shadow-lg rounded p-4`} style={{opacity: fade ? 1 : 0, transition: 'opacity 1.2s'}}>
                    <div className="col-md-6 text-center mb-4 mb-md-0">
                        <img 
                            src={radioheadImg} 
                            alt="Radiohead Tour" 
                            className="img-fluid rounded shadow-lg" 
                            style={{
                                maxHeight: 500, 
                                objectFit: 'cover', 
                                transition: 'transform 0.5s, box-shadow 0.5s',
                                boxShadow: '0 0 30px rgba(138,43,226,0.6)'
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 style={{color: '#da70d6', fontWeight: 700, fontSize: '2.5rem', marginBottom: '20px'}}>
                            Radiohead anuncia su regreso a los escenarios luego de 7 años
                        </h2>
                        <p style={{fontSize: '1.1rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)'}}>
                            Tras siete años de pausa en vivo, la icónica banda británica anunció su esperada vuelta a los escenarios.<br /><br />
                            Radiohead recorrerá cinco ciudades europeas —Madrid, Bolonia, Londres, Copenhague y Berlín— con 20 conciertos programados entre noviembre y diciembre de 2025.<br /><br />
                            El baterista Phil Selway reveló que se reencontraron en los ensayos del año pasado y la experiencia los motivó a retomar los escenarios. “Después de una pausa de siete años, reconectar con nuestra identidad musical fue realmente positivo… Por ahora, solo serán estas fechas, pero quién sabe a dónde nos llevará todo esto”, dijo. Además, anunciaron el lanzamiento de un álbum en vivo: <strong>Hail to the Thief - Live Recordings 2003-2009</strong>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DetalleBlog1;
