import api from "./api";

// ----------------- USUARIOS -----------------

// GET todos los usuarios
export const getUsuarios = () => api.get("/usuarios");

// GET por rut
export const getUsuarioByRut = (rut) => api.get(`/usuarios/${rut}`);

// GET por correo
export const getUsuarioByCorreo = (correo) =>
    api.get(`/usuarios/correo/${correo}`);

// Crear usuario (POST)
export const createUsuario = (usuario) => api.post("/usuarios", usuario);

// Actualizar usuario COMPLETO (PUT)
export const updateUsuario = (rut, usuario) =>
    api.put(`/usuarios/${rut}`, usuario);

// Actualizar usuario PARCIAL (PATCH)
export const patchUsuario = (rut, fields) =>
    api.patch(`/usuarios/${rut}`, fields);

// Eliminar por RUT
export const deleteUsuarioByRut = (rut) => api.delete(`/usuarios/${rut}`);

// Eliminar todos
export const deleteAllUsuarios = () => api.delete("/usuarios/all");
