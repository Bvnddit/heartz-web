function Login(){
    return (
        <div className="main-content">
            <div className="container d-flex justify-content-center align-items-center" style={{paddingTop: 250}}>
                <img src="https://images.icon-icons.com/3446/PNG/512/account_profile_user_avatar_icon_219236.png" alt height={150} className="mb-3" />
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control form-control-sm" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Correo Electrónico</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control form-control-sm" id="floatingPassword" placeholder="Password" autoComplete="off" />
                        <label htmlFor="floatingPassword">Contraseña</label>
                    </div>
                    <button className="btn btn-primary w-100 mb-2" onclick="validarLogin()">Iniciar sesión</button>
                    <a className="btn btn-outline-primary w-100" href="registro.html">Registrarse</a>
                    {/* Mensaje de error */}
                    <p id="mensaje-error" className="text-danger mt-2" style={{display: 'none'}}>Correo o contraseña incorrectos</p>
                </div>
            </div>
        </div>
    );
}

export default Login;