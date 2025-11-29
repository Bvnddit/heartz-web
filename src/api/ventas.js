import api from "./api";

// ----------------- VENTAS -----------------

// POST - Registrar una nueva venta
export const registrarVenta = (ventaData) => api.post("/api/ventas/registrarventa", ventaData);

// Alias para compatibilidad con código existente
export const createVenta = registrarVenta;

// GET - Obtener todas las ventas (para futuro uso)
export const getVentas = () => api.get("/api/ventas");

// GET - Obtener venta por ID (para futuro uso)
export const getVentaById = (idVenta) => api.get(`/api/ventas/${idVenta}`);

// GET - Obtener todas las ventas (Admin)
export const obtenerTodasLasVentas = () => api.get("/api/ventas/obtenerventas");

// GET - Obtener ventas por usuario
export const obtenerVentasPorUsuario = (idUsuario) => api.get(`/api/ventas/obtenerventasusuario/${idUsuario}`);
