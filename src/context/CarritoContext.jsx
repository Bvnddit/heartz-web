import { createContext, useState } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito con validación de stock
  const agregarProducto = (producto) => {
    let agregado = false;
    let mensaje = "";

    setCarrito((prev) => {
      const existe = prev.find((p) => p.id_vin === producto.id_vin);
      if (existe) {
        // Verificar si hay stock disponible
        if (existe.cantidad >= producto.stock) {
          mensaje = `No hay más stock disponible. Stock máximo: ${producto.stock}`;
          agregado = false;
          return prev; // No modificar el carrito
        }
        // Si hay stock, suma 1 a la cantidad
        agregado = true;
        return prev.map((p) =>
          p.id_vin === producto.id_vin
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        // Si no está, lo agrega con cantidad 1
        agregado = true;
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });

    return { agregado, mensaje };
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
