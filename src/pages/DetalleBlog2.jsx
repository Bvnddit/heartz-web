// DetalleBlog2.jsx
import gamImg from '../assets/img/default/gam.jpg';
import { useEffect, useState } from 'react';

function DetalleBlog2() {
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
                            src={gamImg} 
                            alt="Día del Vinilo GAM" 
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
                            El Día del Vinilo 2025 se expande en Santiago: feria, lanzamientos y firmas
                        </h2>
                        <p style={{fontSize: '1.1rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)'}}>
                            Este 9 de agosto, el Centro Cultural Gabriela Mistral (GAM) será sede de la cuarta edición del Día del Vinilo en Chile.<br /><br />
                            Reunirá a sellos, disquerías, coleccionistas y marcas como Selknam Records, Punto Musical, Sony Music, Universal y sellos independientes. Habrá feria de vinilos, lanzamientos exclusivos y firmas de discos: una celebración imperdible para los amantes del vinilo.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DetalleBlog2;
