import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";


describe("Componente Header", () => {
  it("renderiza el nombre del sitio", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Verificar que el texto "Heartz" aparezca
    expect(screen.getByText("Heartz")).toBeInTheDocument();
  });

  it("renderiza todos los enlaces del menú", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const links = ["Home", "Nosotros", "Productos", "Blog", "Contacto"];
    for (const link of links) {
      expect(screen.getByText(link)).toBeInTheDocument();
    }
  });

  it("muestra el campo de búsqueda", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/Buscar vinilo o artista/i);
    expect(input).toBeInTheDocument();
  });

  it("muestra los botones de acción principales", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
    expect(screen.getByText("🛒 Carrito")).toBeInTheDocument();
  });
});
