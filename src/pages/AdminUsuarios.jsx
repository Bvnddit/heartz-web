import React, { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import {
  getUsuarios,
  createUsuario,
  patchUsuario,
  deleteUsuarioById
} from "../api/usuarios";
import { validarRut, validarEmail, validarNombre, validarFormularioUsuario } from "../util/Validaciones";

import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Box,
  Typography,
  InputAdornment
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    rut: "",
    nombre: "",
    correo: "",
    contrasena: "",
    rol: "CLIENTE",
  });
  const [editandoId, setEditandoId] = useState(null);
  const [errores, setErrores] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para alertas MUI
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: null
  });

  // Cargar usuarios al montar el componente
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsuarios();
      console.log("Respuesta del backend:", response.data);
      // Asegurarse de que siempre sea un array
      const data = Array.isArray(response.data) ? response.data : [];
      // Normalizar el campo rol si viene como objeto
      const usuariosNormalizados = data.map(usuario => ({
        ...usuario,
        rol: typeof usuario.rol === 'object' && usuario.rol !== null
          ? usuario.rol.nombre || usuario.rol
          : usuario.rol
      }));
      console.log("Usuarios normalizados:", usuariosNormalizados);
      setUsuarios(usuariosNormalizados);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      console.error("Error completo:", err.response);
      setError("Error al cargar los usuarios. Por favor, intenta de nuevo.");
      setUsuarios([]); // Establecer array vacío en caso de error
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const newErrores = validarFormularioUsuario(form);
    setErrores(newErrores);
    return Object.keys(newErrores).length === 0;
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      if (editandoId) {
        // Actualizar usuario existente
        const dataToUpdate = { ...form };
        // Al editar, si no hay contraseña o el campo está oculto, no la enviamos para no sobrescribirla
        if (!dataToUpdate.contrasena) {
          delete dataToUpdate.contrasena;
        }

        const response = await patchUsuario(editandoId, dataToUpdate);
        showSnackbar(response.data.message || "Usuario actualizado exitosamente", "success");
        setEditandoId(null);
      } else {
        // Crear nuevo usuario
        const response = await createUsuario(form);
        showSnackbar(response.data.message || "Usuario creado exitosamente", "success");
      }

      // Recargar la lista de usuarios
      await cargarUsuarios();

      // Limpiar formulario
      setForm({
        rut: "",
        nombre: "",
        correo: "",
        contrasena: "",
        rol: "CLIENTE",
      });
      setErrores({});
    } catch (err) {
      console.error("Error al guardar usuario:", err);
      console.error("Error response:", err.response);

      let errorMessage = "Error al guardar el usuario";
      if (err.response?.status === 409) {
        errorMessage = "Ya existe un usuario con este RUT.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message === "Network Error") {
        errorMessage = "Error de conexión. Verifica que el servidor esté corriendo en http://18.216.144.119:9090";
      }

      showSnackbar(errorMessage, "error");
    }
  };

  const handleEditar = (usuario) => {
    // Normalizar el rol si viene como objeto
    const rolNormalizado = typeof usuario.rol === 'object' && usuario.rol !== null
      ? usuario.rol.nombre || usuario.rol
      : usuario.rol;

    setForm({
      ...usuario,
      rol: rolNormalizado,
      contrasena: "" // No mostrar la contraseña al editar
    });
    setEditandoId(usuario.idUsuario);
  };

  const handleEliminar = (idUsuario) => {
    setConfirmDialog({
      open: true,
      title: "¿Estás seguro?",
      content: "No podrás revertir esto",
      onConfirm: () => ejecutarEliminacion(idUsuario)
    });
  };

  const ejecutarEliminacion = async (idUsuario) => {
    closeConfirmDialog();
    try {
      const response = await deleteUsuarioById(idUsuario);
      showSnackbar(response.data?.message || "Usuario eliminado exitosamente", "success");
      await cargarUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      showSnackbar(err.response?.data?.message || "Error al eliminar el usuario. Es posible que tenga registros asociados.", "error");
    }
  };

  const handleCancelar = () => {
    setForm({
      rut: "",
      nombre: "",
      correo: "",
      contrasena: "",
      rol: "CLIENTE",
    });
    setEditandoId(null);
    setErrores({});
  };

  // Estilos personalizados para inputs oscuros
  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: '#555' },
      '&:hover fieldset': { borderColor: '#aaa' },
      '&.Mui-focused fieldset': { borderColor: '#90caf9' },
    },
    '& .MuiInputLabel-root': { color: '#aaa' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#90caf9' },
    '& .MuiSelect-icon': { color: 'white' }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="admin-page"
      style={{ minHeight: "100vh", background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)' }}
    >
      <HeaderAdmin titulo="Panel Administrador — Usuarios" />
      <div className="d-flex">
        <BarraLateralAdmin />

        <div className="admin-content flex-grow-1 p-4 text-light">
          {/* Mensajes de error global */}
          {error && (
            <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Formulario */}
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "#1e1e1e",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
              color: "white"
            }}
          >
            <Typography variant="h5" gutterBottom>
              {editandoId ? "Editar Usuario" : "Agregar Nuevo Usuario"}
            </Typography>
            <form onSubmit={handleAgregar}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="RUT"
                    name="rut"
                    value={form.rut}
                    onChange={handleChange}
                    disabled={!!editandoId}
                    error={!!errores.rut}
                    helperText={errores.rut}
                    sx={inputStyle}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    error={!!errores.nombre}
                    helperText={errores.nombre}
                    sx={inputStyle}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Correo"
                    name="correo"
                    type="email"
                    value={form.correo}
                    onChange={handleChange}
                    error={!!errores.correo}
                    helperText={errores.correo}
                    sx={inputStyle}
                  />
                </Grid>
                {!editandoId && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Contraseña"
                      name="contrasena"
                      type="password"
                      value={form.contrasena}
                      onChange={handleChange}
                      sx={inputStyle}
                    />
                  </Grid>
                )}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={inputStyle}>
                    <InputLabel>Rol</InputLabel>
                    <Select
                      name="rol"
                      value={form.rol}
                      label="Rol"
                      onChange={handleChange}
                    >
                      <MenuItem value="CLIENTE">Cliente</MenuItem>
                      <MenuItem value="EMPLEADO">Empleado</MenuItem>
                      <MenuItem value="ADMIN">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                  {editandoId && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleCancelar}
                      sx={{ mr: 2, color: 'white', borderColor: 'white' }}
                    >
                      Cancelar
                    </Button>
                  )}
                  <Button type="submit" variant="contained" color="primary">
                    {editandoId ? "Guardar Cambios" : "Agregar Usuario"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>

          {/* Tabla */}
          <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e", color: "white" }}>
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando usuarios...</p>
              </div>
            ) : usuarios.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-white-50">No hay usuarios registrados.</p>
              </div>
            ) : (

              <>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    mb: 2,
                    backgroundColor: "#2c2c2c",
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      "& fieldset": { borderColor: "#555" },
                      "&:hover fieldset": { borderColor: "#aaa" },
                      "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#aaa" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>RUT</TableCell>
                      <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>Nombre</TableCell>
                      <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>Correo</TableCell>
                      <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>Rol</TableCell>
                      <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }} align="center">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usuarios
                      .filter((usuario) =>
                        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((usuario) => (
                        <TableRow
                          key={usuario.idUsuario}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' } }}
                        >
                          <TableCell component="th" scope="row" sx={{ color: 'white' }}>
                            {usuario.rut}
                          </TableCell>
                          <TableCell sx={{ color: 'white' }}>{usuario.nombre}</TableCell>
                          <TableCell sx={{ color: 'white' }}>{usuario.correo}</TableCell>
                          <TableCell sx={{ color: 'white' }}>
                            <span className={`badge ${usuario.rol === 'EMPLEADO' ? 'bg-warning' : usuario.rol === 'ADMIN' ? 'bg-danger' : 'bg-info'}`}>
                              {typeof usuario.rol === 'object' && usuario.rol !== null
                                ? usuario.rol.nombre || JSON.stringify(usuario.rol)
                                : usuario.rol}
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton onClick={() => handleEditar(usuario)} sx={{ color: '#4fc3f7' }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleEliminar(usuario.idUsuario)} sx={{ color: '#f44336' }}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </>
            )}
          </TableContainer>
        </div>
      </div>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Diálogo de confirmación */}
      <Dialog
        open={confirmDialog.open}
        onClose={closeConfirmDialog}
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
          {confirmDialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: '#ccc' }}>
            {confirmDialog.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} sx={{ color: 'white' }}>
            Cancelar
          </Button>
          <Button onClick={confirmDialog.onConfirm} color="error" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div >
  );
};

export default AdminUsuarios;
