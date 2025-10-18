import { createContext, useState } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id_vin === producto.id_vin);
      if (existe) {
        // Si ya está, suma 1 a la cantidad
        return prev.map((p) =>
          p.id_vin === producto.id_vin
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        // Si no está, lo agrega con cantidad 1
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Quitar 1 unidad
  const quitarProducto = (id_vin) => {
    setCarrito((prev) =>
      prev.map((p) =>
        p.id_vin === id_vin
          ? { ...p, cantidad: p.cantidad > 1 ? p.cantidad - 1 : 0 }
          : p
      )
    );
  };

  // Eliminar completamente
  const eliminarProducto = (id_vin) => {
    setCarrito((prev) => prev.filter((p) => p.id_vin !== id_vin));
  };

  // Total del carrito
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarProducto, quitarProducto, eliminarProducto, total }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
