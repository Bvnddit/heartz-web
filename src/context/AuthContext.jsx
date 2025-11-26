import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario en localStorage al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      // Configurar el token en axios para futuras peticiones
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  // Función para hacer login
  const login = async (userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);

      // Guardar en localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);

      // Configurar token en axios para futuras peticiones
      api.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;

      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, error: error.message };
    }
  };

  // Función para hacer logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    // Limpiar localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Remover token de axios
    delete api.defaults.headers.common["Authorization"];
  };

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return user?.rol === role;
  };

  // Función para verificar si es admin
  const isAdmin = () => {
    return hasRole("ADMIN");
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasRole,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
