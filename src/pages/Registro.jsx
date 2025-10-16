import React, { useState } from "react";

function Registro() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [rut, setRut] = useState("");
  const [rutError, setRutError] = useState("");
  const [nombre, setNombre] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const rutRegex = /^\d{7,8}-[Kk\d]$/;
  const textRegex = /^(?!\s*$).+/;
  const passwordRegex = /^(?!\s*$).+/;

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = eighteenYearsAgo.toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!emailRegex.test(email)) {
      setEmailError("Por favor, ingresa un correo electrónico válido.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!rutRegex.test(rut)) {
      setRutError("Por favor, ingresa el RUT con guion y sin puntos.");
      hasError = true;
    } else {
      setRutError("");
    }

    if (!textRegex.test(nombre)) {
      setNombreError("El nombre no puede estar vacío.");
      hasError = true;
    } else {
      setNombreError("");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError("La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;
  };

  return (
    <div
      className="main-content"
      style={{ background: "linear-gradient(135deg, #1c1c1c, #2a1c3b)" }}
    >
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ paddingTop: 50 }}
      >
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
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: emailError ? "red" : "" }}
            />
            <label htmlFor="floatingInput">Correo Electrónico</label>
            {emailError && (
              <div style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}>
                {emailError}
              </div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              id="floatingRut"
              placeholder="Rut"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              style={{ borderColor: rutError ? "red" : "" }}
            />
            <label htmlFor="floatingRut">RUT</label>
            {rutError && (
              <div style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}>
                {rutError}
              </div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              id="floatingName"
              placeholder="Nombre completo"
              autoComplete="off"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{ borderColor: nombreError ? "red" : "" }}
            />
            <label htmlFor="floatingName">Nombre completo</label>
            {nombreError && (
              <div style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}>
                {nombreError}
              </div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control form-control-sm"
              id="floatingDate"
              placeholder="Fecha de nacimiento"
              autoComplete="off"
              max={maxDate}
            />
            <label htmlFor="floatingDate">Fecha de nacimiento</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control form-control-sm"
              id="floatingPassword"
              placeholder="Contraseña"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: passwordError ? "red" : "" }}
            />
            <label htmlFor="floatingPassword">Contraseña</label>
            {passwordError && (
              <div style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}>
                {passwordError}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-outline-primary w-100">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
