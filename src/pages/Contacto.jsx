function Contacto() {
  return (
    <div style={{backgroundColor:'white'}}>
    <section className="container my-5" style={{backgroundColor:'white'}}>
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img src="src/assets/img/default/tornamesas.webp" alt="Tornamesas" className="img-fluid shadow" style={{maxHeight: 500, objectFit: 'cover'}} />
        </div>
        <div className="col-md-6">
          <h1 className="jumbotron-heading mb-3" style={{color:'black'}}>¡Contáctanos!</h1>
          <p className="lead text-muted">
            Puedes escribirnos al correo <strong>contacto@heartz.cl</strong>.<br />
            Puedes encontrarnos tanto en <strong>Instagram, Facebook y TikTok</strong> como <strong>@Heartz.cl</strong>.<br />
            También puedes escribirnos a través de <strong>WhatsApp</strong> al número <strong>+56 9 2102 9988</strong>.<br />
            ¡Esperamos tu mensaje!
          </p>
        </div>
      </div>
    </section>
    <div className="container d-flex justify-content-center mt-5">
      <form className="p-4 border rounded shadow" style={{maxWidth: 500, width: '100%'}}>
        <h1 />
        <div className="mb-3">
          <label className="form-label text-muted" htmlFor="tema">Su correo</label>
          <input className="form-control form-control-sm" type="text" placeholder="ejemplo@heartz.cl" id="tema" />
        </div>
        <div className="mb-3">
          <label className="form-label text-muted" htmlFor="contenido">Escribenos acá</label>
          <textarea className="form-control" placeholder="Mensaje" id="contenido" rows={4} defaultValue={""} />
        </div>
        <button className="btn btn-outline-primary w-100">Enviar</button>
      </form>
      <div className="text-center mt-4">
        <a href="https://www.instagram.com" target="_blank" className="btn btn-outline-primary btn-lg mx-2">
          <i className="bi bi-instagram fs-3" />
        </a>
        <a href="https://www.tiktok.com" target="_blank" className="btn btn-outline-dark btn-lg mx-2">
          <i className="bi bi-tiktok fs-3" />
        </a>
        <a href="https://wa.me/123456789" target="_blank" className="btn btn-outline-success btn-lg mx-2">
          <i className="bi bi-whatsapp fs-3" />
        </a>
      </div>
    </div>
  </div>

  );
}

export default Contacto;
