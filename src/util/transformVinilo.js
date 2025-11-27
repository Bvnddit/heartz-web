import { artistas } from "../data/artistas";
import { generos } from "../data/generos";

/**
 * Transforma un vinilo del formato del backend al formato del frontend
 * @param {Object} viniloBackend - Vinilo en formato del backend
 * @returns {Object} Vinilo en formato del frontend
 */
export const transformVinilo = (viniloBackend) => {
  // Debug: ver qué está llegando del backend (solo en desarrollo)
  if (import.meta.env.DEV) {
    console.log("Transformando vinilo:", {
      idVin: viniloBackend.idVin,
      nombre: viniloBackend.nombre,
      img: viniloBackend.img,
      imgType: typeof viniloBackend.img,
      imgIsArray: Array.isArray(viniloBackend.img),
      imgLength: viniloBackend.img?.length
    });
  }

  // Buscar el ID del artista por nombre
  const artistaEncontrado = artistas.find(
    (a) => a.nombre.toLowerCase() === viniloBackend.artista?.toLowerCase()
  );
  const id_art = artistaEncontrado ? artistaEncontrado.id_art : null;

  // Buscar el ID del género por nombre
  const generoEncontrado = generos.find(
    (g) => g.nombre.toLowerCase().trim() === viniloBackend.genero?.toLowerCase().trim()
  );
  const id_gen = generoEncontrado ? generoEncontrado.id_gen : null;

  // Convertir img de string a array si es necesario
  let imgArray = [];
  if (viniloBackend.img) {
    if (Array.isArray(viniloBackend.img)) {
      // Ya es un array, usarlo directamente
      imgArray = viniloBackend.img;
    } else if (typeof viniloBackend.img === 'string' && viniloBackend.img.trim() !== '') {
      // Si es un string no vacío, podría ser una URL única o un JSON string con múltiples URLs
      try {
        // Intentar parsear como JSON (por si viene como "[\"url1\", \"url2\"]")
        const parsed = JSON.parse(viniloBackend.img);
        imgArray = Array.isArray(parsed) ? parsed : [viniloBackend.img];
      } catch {
        // Si no es JSON válido, es una URL única - convertirla a array
        imgArray = [viniloBackend.img.trim()];
      }
    }
  }

  // NO aplicar proxy automáticamente - dejar que el componente maneje los errores
  // El proxy puede causar más problemas que soluciones
  // Si es necesario, se puede aplicar en el componente cuando falle la carga

  // Asegurarse de que siempre sea un array, incluso si está vacío
  const imgFinal = Array.isArray(imgArray) && imgArray.length > 0 ? imgArray : [];
  
  // Debug: ver la imagen transformada (solo en desarrollo)
  if (import.meta.env.DEV && imgFinal.length > 0) {
    console.log("Imagen transformada:", {
      cantidad: imgFinal.length,
      primeraURL: imgFinal[0],
      urlCompleta: imgFinal[0]?.length
    });
  }

  return {
    id_vin: viniloBackend.idVin || viniloBackend.id_vin,
    titulo: viniloBackend.nombre || viniloBackend.titulo,
    id_art: id_art || viniloBackend.id_art,
    id_gen: id_gen || viniloBackend.id_gen,
    año: viniloBackend.anno || viniloBackend.año,
    precio: viniloBackend.precio,
    formato: viniloBackend.formato,
    colorVinilo: viniloBackend.colorVinilo,
    stock: viniloBackend.stock,
    sello: viniloBackend.sello,
    pais: viniloBackend.pais,
    edicion: viniloBackend.edicion,
    duracion: viniloBackend.duracion,
    descripcion: viniloBackend.descripcion,
    img: imgFinal,
    listaDeCanciones: viniloBackend.listaDeCanciones || [],
  };
};

/**
 * Transforma un array de vinilos del backend al formato del frontend
 * @param {Array} vinilosBackend - Array de vinilos en formato del backend
 * @returns {Array} Array de vinilos en formato del frontend
 */
export const transformVinilos = (vinilosBackend) => {
  if (!Array.isArray(vinilosBackend)) {
    return [];
  }
  return vinilosBackend.map(transformVinilo);
};

