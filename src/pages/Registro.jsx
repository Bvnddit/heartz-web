import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarEmail, validarPassword, validarNombre, validarRut } from "../util/Validaciones.js";
import { createUsuario } from "../api/usuarios";

function Registro() {
  const navigate = useNavigate();
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
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

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

    setLoading(true);

    try {
      // Preparar los datos del usuario con rol CLIENTE
      const usuarioData = {
        rut: rut,
        nombre: nombre,
        correo: email,
        contrasena: password,
        rol: "CLIENTE" // El rol debe ser "CLIENTE" según la base de datos
      };

      const response = await createUsuario(usuarioData);
      
      console.log("Usuario registrado exitosamente:", response.data);
      
      // Mostrar mensaje de éxito y redirigir al login
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate("/login");
      
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      
      if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.message || error.response?.data || "Error al registrar el usuario";
        setGeneralError(errorMessage);
      } else if (error.response?.data) {
        // Si el backend devuelve un mensaje de error
        const errorMessage = typeof error.response.data === 'string' 
          ? error.response.data 
          : error.response.data.message || "Error al registrar el usuario";
        setGeneralError(errorMessage);
      } else if (error.message === "Network Error") {
        setGeneralError("Error de conexión. Verifica que el servidor esté corriendo.");
      } else {
        setGeneralError("Error al registrar el usuario. Por favor, intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
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

          {generalError && (
            <div style={{ color: "red", fontSize: "0.9em", marginBottom: "15px" }}>
              {generalError}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-outline-primary w-100"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
