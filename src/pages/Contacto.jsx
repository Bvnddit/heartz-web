import tornamesasImg from '../assets/img/default/tornamesas.webp';

function Contacto() {
  return (
    <div style={{background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)'}}>
    <section className="container my-5 border rounded shadow" style={{backgroundColor:'black', padding: '20px', borderRadius: '10px'}}>
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img src={tornamesasImg} alt="Tornamesas" className="img-fluid shadow" style={{maxHeight: 500, objectFit: 'cover'}} />
        </div>
        <div className="col-md-6">
          <h1 className="jumbotron-heading mb-3" style={{color:'white'}}>¡Contáctanos!</h1>
          <p className="lead">
            Puedes escribirnos al correo <strong>contacto@heartz.cl</strong>.<br />
            Puedes encontrarnos tanto en <strong>Instagram, Facebook y TikTok</strong> como <strong>@Heartz.cl</strong>.<br />
            También puedes escribirnos a través de <strong>WhatsApp</strong> al número <strong>+56 9 2102 9988</strong>.<br />
            ¡Esperamos tu mensaje!
          </p>
        </div>
      </div>
    </section>
    <div className="container d-flex justify-content-center mt-5">
      <form className="p-4 border rounded shadow" style={{maxWidth: 500, width: '100%', color:'white', backgroundColor:'black'}}>
        <h1 />
        <div className="mb-3">
          <label className="form-label" htmlFor="tema">Su correo</label>
          <input className="form-control form-control-sm" type="text" placeholder="ejemplo@heartz.cl" id="tema" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="contenido">Escribenos acá</label>
          <textarea className="form-control" placeholder="Mensaje" id="contenido" rows={4} defaultValue={""} />
        </div>
        <button className="btn btn-outline-primary w-100">Enviar</button>
      </form>
    </div>
  </div>

  );
}

export default Contacto;
