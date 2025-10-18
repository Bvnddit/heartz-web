// src/util/__tests__/Validaciones.test.js
import { describe, it, expect } from "vitest";
import { 
  validarEmail,
  validarPassword,
  validarNombre,
  validarRut,
  getArtista,
  getGenero,
  filtrarPorGenero,
  filtrarPorArtista,
  ordenarPorPrecio,
  buscarViniloPorTitulo,
  buscarArtistaPorNombre
} from "../Validaciones.js";

import { artistas, vinilos, generos } from "../../data/artistas.js"; // ajusta la ruta según tu proyecto

describe("Funciones de Validaciones", () => {
  // Email
  it("validarEmail devuelve error para email inválido", () => {
    expect(validarEmail("correoInvalido")).toBe("Por favor, ingresa un correo electrónico válido.");
  });
  it("validarEmail no devuelve error para email válido", () => {
    expect(validarEmail("test@mail.com")).toBe("");
  });

  // Password
  it("validarPassword devuelve error para contraseña vacía", () => {
    expect(validarPassword("")).toBe("La contraseña no puede estar vacía.");
  });
  it("validarPassword no devuelve error para contraseña válida", () => {
    expect(validarPassword("123456")).toBe("");
  });

  // Nombre
  it("validarNombre devuelve error para nombre inválido", () => {
    expect(validarNombre("123")).toBe("Por favor, ingresa tu nombre (solo letras y espacios).");
  });
  it("validarNombre no devuelve error para nombre válido", () => {
    expect(validarNombre("Alan Fuentes")).toBe("");
  });

  // RUT
  it("validarRut devuelve error para RUT inválido", () => {
    expect(validarRut("12345678")).toBe("Por favor, ingresa el RUT con guion y sin puntos.");
  });
  it("validarRut no devuelve error para RUT válido", () => {
    expect(validarRut("12345678-9")).toBe("");
  });

  // getArtista y getGenero
  it("getArtista retorna nombre correcto", () => {
    expect(getArtista(1)).toBe("Deftones");
    expect(getArtista(999)).toBe("Desconocido");
  });
  it("getGenero retorna nombre correcto", () => {
    expect(getGenero(1)).toBe("Jazz fusion");
    expect(getGenero(999)).toBe("Sin género");
  });


});
