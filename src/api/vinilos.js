import api from "./api";

// ----------------- VINILOS -----------------

// GET todos los vinilos
export const getAllVinilos = () => api.get("/vinilos");

// GET vinilo por ID
export const getViniloById = (id) => api.get(`/vinilos/${id}`);

// Crear vinilo (POST)
export const createVinilo = (vinilo) => api.post("/vinilos", vinilo);

// Actualizar vinilo COMPLETO (PUT)
export const updateVinilo = (id, vinilo) => api.put(`/vinilos/${id}`, vinilo);

// Actualizar vinilo PARCIAL (PATCH)
export const patchVinilo = (id, fields) => api.patch(`/vinilos/${id}`, fields);

// Eliminar vinilo por ID
export const deleteViniloById = (id) => api.delete(`/vinilos/${id}`);

// Eliminar todos los vinilos
export const deleteAllVinilos = () => api.delete("/vinilos/all");
