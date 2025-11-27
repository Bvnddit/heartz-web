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
    // Usamos el nombre directamente ya que no tenemos IDs estáticos
    artista: viniloBackend.artista,
    genero: viniloBackend.genero,
    // Mantenemos id_art e id_gen por compatibilidad si es necesario, pero usando el nombre como ID o null
    id_art: viniloBackend.artista,
    id_gen: viniloBackend.genero,
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

