export const validarEmail = (email) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) return "Por favor, ingresa un correo electrónico válido.";
  return "";
};

export const validarPassword = (password) => {
  if (!password.trim()) return "La contraseña no puede estar vacía.";
  return "";
};

export const validarNombre = (nombre) => {
  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,}$/;
  if (!nombreRegex.test(nombre)) return "Por favor, ingresa tu nombre (solo letras y espacios).";
  return "";
};

export const validarRut = (rut) => {
  const rutRegex = /^\d{7,8}-[Kk\d]$/;
  if (!rutRegex.test(rut)) return "Por favor, ingresa el RUT con guion y sin puntos.";
  return "";
};
