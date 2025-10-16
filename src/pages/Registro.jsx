function Registro() {
  return (
    <div className="main-content" style={{ background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)' }}>
        <div className="container d-flex justify-content-center align-items-center" style={{ paddingTop: 50 }}>
            <div
                style={{
                border: '2px solid black',
                borderRadius: '20px',
                padding: '30px',
                backgroundColor: '#1f1f1f',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center',
                }}
            >
                <img
                src="https://images.icon-icons.com/3446/PNG/512/account_profile_user_avatar_icon_219236.png"
                alt="avatar"
                height={150}
                className="mb-4"
                />

                <div className="form-floating mb-3">
                <input type="email" className="form-control form-control-sm" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput">Correo Electrónico</label>
                </div>

                <div className="form-floating mb-3">
                <input type="text" className="form-control form-control-sm" id="floatingName" placeholder="Nombre completo" autoComplete="off" />
                <label htmlFor="floatingName">Nombre completo</label>
                </div>

                <div className="form-floating mb-3">
                <input type="text" className="form-control form-control-sm" id="floatingRut" placeholder="Rut" autoComplete="off" />
                <label htmlFor="floatingRut">Rut</label>
                </div>

                <div className="form-floating mb-3">
                <input type="date" className="form-control form-control-sm" id="floatingDate" placeholder="Fecha de nacimiento" autoComplete="off" />
                <label htmlFor="floatingDate">Fecha de nacimiento</label>
                </div>

                <div className="form-floating mb-4">
                <input type="password" className="form-control form-control-sm" id="floatingPassword" placeholder="Contraseña" autoComplete="off" />
                <label htmlFor="floatingPassword">Contraseña</label>
                </div>

                <button className="btn btn-outline-primary w-100">Registrarse</button>
            </div>

      </div>
    </div>
  );
}

export default Registro;
