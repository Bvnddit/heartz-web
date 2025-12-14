import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarEmail, validarPassword, validarNombre, validarRut } from "../util/Validaciones.js";
import { createUsuario } from "../api/usuarios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import { motion } from "framer-motion";
import WaveBackground from "../components/WaveBackground";

function Registro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [rutError, setRutError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  // Estado para el diálogo
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    const emailErr = validarEmail(email);
    const rutErr = validarRut(rut);
    const nombreErr = validarNombre(nombre);
    const passwordErr = validarPassword(password);

    let confirmPassErr = "";
    if (password !== confirmPassword) {
      confirmPassErr = "Las contraseñas no coinciden.";
    }

    setEmailError(emailErr);
    setRutError(rutErr);
    setNombreError(nombreErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPassErr);

    if (emailErr || rutErr || nombreErr || passwordErr || confirmPassErr) return;

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

      // Mostrar mensaje de éxito
      setDialogOpen(true);

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

  const handleCloseDialog = () => {
    setDialogOpen(false);
    navigate("/login");
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


          <div className="form-floating mb-3 position-relative">
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

          <div className="form-floating mb-4 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control form-control-sm"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ borderColor: confirmPasswordError ? "red" : "" }}
            />
            <label>Confirmar Contraseña</label>
            <button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={() => setShowPassword(!showPassword)}
              style={{ zIndex: 10, background: "transparent", border: "none" }}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} style={{ color: "#aaa" }}></i>
            </button>
            {confirmPasswordError && <div style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}>{confirmPasswordError}</div>}
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

      {/* Diálogo de éxito */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#1e1e1e',
            color: 'white',
            border: '1px solid #333'
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: 'white' }}>
          {"¡Registro exitoso!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: '#ccc' }}>
            Ahora puedes iniciar sesión con tu nueva cuenta.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus sx={{ color: '#90caf9' }}>
            Ir al Login
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

export default Registro;
