import api from "axios";

export const getUsuarios = () => api.get("/usuarios");
export const getUsuarioByRut = (rut) => api.get(`/usuarios/${rut}`);
export const getUsuarioByCorreo = (correo) => api.get(`/usuarios/correo/${correo}`);
export const createUsuario = (usuario) => api.post("/usuarios", usuario);
export const deleteUsuarioByRut = (rut) => api.delete(`/usuarios/${rut}`);
export const deleteAllUsuarios = () => api.delete("/usuarios/all");
