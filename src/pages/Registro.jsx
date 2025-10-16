import React, { useState } from "react";
import { validarEmail, validarPassword, validarNombre, validarRut } from "../util/Validaciones.js";

function Registro() {
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const [emailError, setEmailError] = useState("");
  const [rutError, setRutError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fechaError, setFechaError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailErr = validarEmail(email);
    const rutErr = validarRut(rut);
    const nombreErr = validarNombre(nombre);
    const passwordErr = validarPassword(password);

    let fechaErr = "";
    if (!fechaNacimiento) {
      fechaErr = "Por favor, selecciona tu fecha de nacimiento.";
    } else {
      const hoy = new Date();
      const fecha18 = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
      if (new Date(fechaNacimiento) > fecha18) {
        fechaErr = "Debes ser mayor de 18 años.";
      }
    }

    setEmailError(emailErr);
    setRutError(rutErr);
    setNombreError(nombreErr);
    setPasswordError(passwordErr);
    setFechaError(fechaErr);

    if (emailErr || rutErr || nombreErr || passwordErr || fechaErr) return;

    alert("Registro exitoso.");
  };

  const hoy = new Date();
  const maxDate = `${hoy.getFullYear() - 18}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;

  return (
    <div className="main-content" style={{ background: "linear-gradient(135deg, #1c1c1c, #2a1c3b)" }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ paddingTop: 50 }}>
        <form
          onSubmit={handleSubmit}
          style={{
            border: "2px solid black",
            borderRadius: "20px",
            padding: "30px",
            backgroundColor: "#1f1f1f",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <img
            src="https://images.icon-icons.com/3446/PNG/512/account_profile_user_avatar_icon_219236.png"
            alt="avatar"
            height={150}
            className="mb-4"
          />

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control form-control-sm"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: emailError ? "red" : "" }}
            />
            <label>Correo Electrónico</label>
            {emailError && <div style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}>{emailError}</div>}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="RUT"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              style={{ borderColor: rutError ? "red" : "" }}
            />
            <label>RUT</label>
            {rutError && <div style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}>{rutError}</div>}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{ borderColor: nombreError ? "red" : "" }}
            />
            <label>Nombre completo</label>
            {nombreError && <div style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}>{nombreError}</div>}
          </div>

          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control form-control-sm"
              placeholder="Fecha de nacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              max={maxDate}
              style={{ borderColor: fechaError ? "red" : "" }}
            />
            <label>Fecha de nacimiento</label>
            {fechaError && <div style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}>{fechaError}</div>}
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: passwordError ? "red" : "" }}
            />
            <label>Contraseña</label>
            {passwordError && <div style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}>{passwordError}</div>}
          </div>

          <button type="submit" className="btn btn-outline-primary w-100">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
