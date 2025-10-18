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


// Funciones para filtrar en productos
import { artistas } from "../data/artistas";
import { generos } from "../Data/generos";


export const getArtista = (id_art) => {
  const artista = artistas.find((a) => a.id_art === id_art);
  return artista ? artista.nombre : "Desconocido";
};


export const getGenero = (id_gen) => {
  const genero = generos.find((g) => g.id_gen === id_gen);
  return genero ? genero.nombre : "Sin género";
};


export const filtrarPorGenero = (vinilos, filtroGenero) => {
  if (filtroGenero === "todos") return vinilos;
  return vinilos.filter((v) => v.id_gen === parseInt(filtroGenero));
};


export const ordenarPorPrecio = (vinilos, ordenPrecio) => {
  if (ordenPrecio === "asc") {
    return [...vinilos].sort((a, b) => a.precio - b.precio);
  } else if (ordenPrecio === "desc") {
    return [...vinilos].sort((a, b) => b.precio - a.precio);
  }
  return vinilos;
};

export function filtrarPorArtista(vinilos, id_artista) {
  if (id_artista === "todos") return vinilos;
  return vinilos.filter((v) => v.id_art === parseInt(id_artista));
}


// Funcion para buscador de header
export const buscarViniloPorTitulo = (vinilos, texto) => {
  const t = texto.trim().toLowerCase();
  if (!t) return null;
  return vinilos.find((v) => v.titulo.toLowerCase().includes(t)) || null;
};

export const buscarArtistaPorNombre = (artistas, texto) => {
  const t = texto.trim().toLowerCase();
  if (!t) return null;
  return artistas.find((a) => a.nombre.toLowerCase().includes(t)) || null;
}