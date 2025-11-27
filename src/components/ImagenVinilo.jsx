import { useState } from "react";

/**
 * Componente que maneja la carga de imágenes con fallback a proxy si falla
 */
const ImagenVinilo = ({ src, alt, className, style, onError, ...props }) => {
  const [intentos, setIntentos] = useState(0);
  const [urlActual, setUrlActual] = useState(src);
  const [haFallado, setHaFallado] = useState(false);

  // Proxies alternativos para intentar si la URL original falla
  const proxies = [
    (url) => `https://images.weserv.nl/?url=${encodeURIComponent(url)}&output=webp`,
    (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  ];

  const manejarError = (e) => {
    console.error(`Error al cargar imagen (intento ${intentos + 1}):`, urlActual);

    // Si ya intentamos todos los proxies, mostrar placeholder
    if (intentos >= proxies.length) {
      setHaFallado(true);
      if (onError) {
        onError(e);
      }
      return;
    }

    // Intentar con el siguiente proxy
    const proxiedUrl = proxies[intentos](src);
    setUrlActual(proxiedUrl);
    setIntentos(intentos + 1);
    
    // Forzar recarga de la imagen con la nueva URL
    setTimeout(() => {
      e.target.src = proxiedUrl;
    }, 100);
  };

  if (haFallado || !urlActual) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#6c757d",
          color: "white",
        }}
        {...props}
      >
        <div className="text-center">
          <i className="bi bi-image" style={{ fontSize: "2rem", opacity: 0.5 }}></i>
          <p className="mt-2 mb-0 small">Imagen no disponible</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={urlActual}
      alt={alt}
      className={className}
      style={style}
      onError={manejarError}
      {...props}
    />
  );
};

export default ImagenVinilo;

