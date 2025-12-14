import { useState } from 'react';
import tornamesasImg from '../assets/img/default/tornamesas.webp';
import { validarFormularioContacto } from '../util/Validaciones';
import Swal from 'sweetalert2';

function Contacto() {
  const [formData, setFormData] = useState({
    correo: '',
    mensaje: ''
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar error al escribir
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validarFormularioContacto(formData);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      // Aquí iría la lógica de envío real
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado',
        text: 'Hemos recibido tu mensaje correctamente.',
        confirmButtonColor: '#3085d6',
      });
      setFormData({ correo: '', mensaje: '' });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor corrige los errores antes de enviar.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)' }}>
      <section className="container my-5 border rounded shadow" style={{ backgroundColor: 'black', padding: '20px', borderRadius: '10px' }}>
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img src={tornamesasImg} alt="Tornamesas" className="img-fluid shadow" style={{ maxHeight: 500, objectFit: 'cover' }} />
          </div>
          <div className="col-md-6">
            <h1 className="jumbotron-heading mb-3" style={{ color: 'white' }}>¡Contáctanos!</h1>
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
        <form className="p-4 border rounded shadow" style={{ maxWidth: 500, width: '100%', color: 'white', backgroundColor: 'black' }} onSubmit={handleSubmit}>
          <h1 />
          <div className="mb-3">
            <label className="form-label" htmlFor="correo">Su correo</label>
            <input
              className={`form-control form-control-sm ${errores.correo ? 'is-invalid' : ''}`}
              type="text"
              placeholder="ejemplo@heartz.cl"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
            />
            {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="mensaje">Escribenos acá</label>
            <textarea
              className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
              placeholder="Mensaje"
              id="mensaje"
              name="mensaje"
              rows={4}
              value={formData.mensaje}
              onChange={handleChange}
            />
            {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
          </div>
          <button type="submit" className="btn btn-outline-primary w-100">Enviar</button>
        </form>
      </div>
    </div>

  );
}

export default Contacto;
