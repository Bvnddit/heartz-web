import api from "./api";

// ----------------- USUARIOS -----------------

// GET todos los usuarios
export const getUsuarios = () => api.get("/usuarios");

// GET por ID
export const getUsuarioById = (idUsuario) => api.get(`/usuarios/${idUsuario}`);

// GET por correo
export const getUsuarioByCorreo = (correo) =>
    api.get(`/usuarios/correo/${correo}`);

// Crear usuario (POST) - Para registro público (sin autenticación)
export const createUsuario = (usuario) => api.post("/usuarios/register", usuario);

// Actualizar usuario COMPLETO (PUT) - Usa ID
export const updateUsuario = (idUsuario, usuario) =>
    api.put(`/usuarios/update/${idUsuario}`, usuario);

// Actualizar usuario PARCIAL (PATCH) - Usa ID
export const patchUsuario = (idUsuario, fields) =>
    api.patch(`/usuarios/${idUsuario}`, fields);

// Eliminar por ID
export const deleteUsuarioById = (idUsuario) => api.delete(`/usuarios/${idUsuario}`);

// Eliminar todos
export const deleteAllUsuarios = () => api.delete("/usuarios/all");

// ----------------- AUTENTICACIÓN -----------------

// Login de usuario
export const loginUsuario = (loginData) => api.post("/auth/login", loginData);