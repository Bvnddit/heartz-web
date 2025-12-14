import React, { useState, useContext } from "react";
import { validarEmail, validarPassword } from "../util/Validaciones.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUsuario } from "../api/usuarios";
import { motion } from "framer-motion";
import WaveBackground from "../components/WaveBackground";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    const emailErr = validarEmail(email);
    const passwordErr = validarPassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;

    setLoading(true);

    try {
      const loginData = { email, password };
      const response = await loginUsuario(loginData);

      console.log("Respuesta completa del backend:", response.data);

      // Extraer todos los datos del usuario del response
      const { token, ...userData } = response.data;

      console.log("Datos del usuario:", userData);

      // Crear objeto de usuario con toda la información
      const userDataComplete = {
        ...userData,
        token: token
      };

      // Usar el contexto de autenticación
      const loginResult = await login(userDataComplete);

      if (loginResult.success) {
        // Redirigir basado en el rol
        if (userData.rol === "ADMIN" || userData.rol === "EMPLEADO") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setGeneralError("Error al iniciar sesión. Inténtalo de nuevo.");
      }

    } catch (error) {
      console.error("Error en login:", error);
      if (error.response?.status === 401) {
        setGeneralError("Credenciales incorrectas. Verifica tu email y contraseña.");
      } else {
        setGeneralError("Error del servidor. Inténtalo más tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="main-content"
      style={{
        background: "linear-gradient(135deg, #1c1c1c, #2a1c3b)",
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      <WaveBackground />
      <div className="container d-flex justify-content-center align-items-center" style={{ paddingTop: 50, position: 'relative', zIndex: 1 }}>
        <form
          onSubmit={handleSubmit}
          style={{
            border: "2px solid black",
            borderRadius: "20px",
            padding: "30px",
            backgroundColor: "rgba(31, 31, 31, 0.9)", // slightly transparent
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

          <div className="form-floating mb-4 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control form-control-sm"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: passwordError ? "red" : "" }}
            />
            <label>Contraseña</label>
            <button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={() => setShowPassword(!showPassword)}
              style={{ zIndex: 10, background: "transparent", border: "none" }}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} style={{ color: "#aaa" }}></i>
            </button>
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
            {loading ? "Iniciando Sesión..." : "Iniciar Sesión"}
          </button>
          <p><br />¿Olvidaste tu contraseña?</p>
        </form>
      </div>
    </motion.div>
  );
}

export default Login;
