import { useState } from "react";

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

    const [numero, dv] = rut.split("-");
    let suma = 0;
    let multiplo = 2;

    for (let i = numero.length - 1; i >= 0; i--) {
        suma += parseInt(numero[i], 10) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    let dvCalculado = "";

    if (dvEsperado === 11) dvCalculado = "0";
    else if (dvEsperado === 10) dvCalculado = "K";
    else dvCalculado = dvEsperado.toString();

    if (dv.toUpperCase() !== dvCalculado) return "RUT inválido (dígito verificador incorrecto).";

    return "";
};

export const validarTexto = (texto) => {
    // Regex que permite letras (con acentos/ñ) y espacios
    const regex = /^[a-zA-Z\u00C0-\u00FF\s]*$/;
    return regex.test(texto);
};

export const validarNumeroPositivo = (valor) => {
    if (typeof valor === 'string' && valor.includes("-")) return false;
    if (valor < 0) return false;
    return true;
};

export const validarFormularioContacto = (formData) => {
    const errores = {};

    const errorCorreo = validarEmail(formData.correo);
    if (errorCorreo) errores.correo = errorCorreo;

    if (!formData.mensaje.trim()) errores.mensaje = "El mensaje no puede estar vacío.";

    return errores;
};

export const validarFormularioUsuario = (form) => {
    const errores = {};
    const rutError = validarRut(form.rut);
    if (rutError) errores.rut = rutError;
    const nombreError = validarNombre(form.nombre);
    if (nombreError) errores.nombre = nombreError;
    const correoError = validarEmail(form.correo);
    if (correoError) errores.correo = correoError;
    return errores;
};

export const validarFormularioCompra = (formData) => {
    const errores = {};

    const errorNombre = validarNombre(formData.nombre);
    if (errorNombre) errores.nombre = errorNombre;

    const errorCorreo = validarEmail(formData.correo);
    if (errorCorreo) errores.correo = errorCorreo;

    if (!formData.calle.trim()) errores.calle = "La calle es obligatoria.";
    if (!formData.region) errores.region = "Debes seleccionar una región.";
    if (!formData.comuna) errores.comuna = "Debes seleccionar una comuna.";

    return errores;
};

export const useFormularioCompra = (navigate, total) => {
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        calle: "",
        departamento: "",
        region: "",
        comuna: "",
        indicaciones: "",
    });

    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errores[name]) {
            setErrores({ ...errores, [name]: "" });
        }
    };

    const handleCompra = () => {
        const nuevosErrores = validarFormularioCompra(formData);
        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length === 0) {
            navigate("/compra-ok", { state: { ...formData, total } });
        }
    };

    return { formData, setFormData, errores, setErrores, handleChange, handleCompra };
};

// Funciones simplificadas - los datos ahora vienen de la API
export const getArtista = (id_art) => {
    return id_art || "Desconocido";
};

export const getGenero = (id_gen) => {
    return id_gen || "Sin género";
};

export const filtrarPorGenero = (vinilos, filtroGenero) => {
    if (!filtroGenero || filtroGenero.toLowerCase() === "todos") {
        return vinilos;
    }
    return vinilos.filter(vinilo =>
        vinilo.genero && vinilo.genero.toLowerCase() === filtroGenero.toLowerCase()
    );
};

export const ordenarPorPrecio = (vinilos, ordenPrecio) => {
    if (ordenPrecio === "asc") {
        return [...vinilos].sort((a, b) => a.precio - b.precio);
    } else if (ordenPrecio === "desc") {
        return [...vinilos].sort((a, b) => b.precio - a.precio);
    }
    return vinilos;
};

export const filtrarPorArtista = (vinilos, filtroArtista) => {
    if (!filtroArtista || filtroArtista.toLowerCase() === "todos") {
        return vinilos;
    }
    return vinilos.filter(vinilo =>
        vinilo.artista && vinilo.artista.toLowerCase() === filtroArtista.toLowerCase()
    );
};

export const buscarViniloPorTitulo = (vinilos, texto) => {
    const t = texto.trim().toLowerCase();
    if (!t) return null;
    return vinilos.find((v) => v.titulo.toLowerCase().includes(t)) || null;
};

export const buscarArtistaPorNombre = (artistas, texto) => {
    const t = texto.trim().toLowerCase();
    if (!t) return null;
    return artistas.find((a) => a.nombre.toLowerCase().includes(t)) || null;
};