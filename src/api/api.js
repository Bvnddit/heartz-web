import axios from "axios";

// Configurar la URL base de la API desde las variables de entorno
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
