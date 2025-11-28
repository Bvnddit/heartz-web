import api from "./api";

export const createVenta = async (ventaData) => {
    const token = localStorage.getItem("token");
    const config = {};

    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`
        };
    }

    return await api.post("/ventas", ventaData, config);
};
