import React, { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuarioByRut
} from "../api/usuarios";
import { validarRut, validarEmail, validarNombre } from "../util/Validaciones";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    rut: "",
    nombre: "",
    correo: "",
    contrasena: "",
    rol: "Cliente",
  });
  const [editandoRut, setEditandoRut] = useState(null);
  const [errores, setErrores] = useState({});

  // Cargar usuarios al montar el componente
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsuarios();
      // Asegurarse de que siempre sea un array
      const data = Array.isArray(response.data) ? response.data : [];
      setUsuarios(data);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      setError("Error al cargar los usuarios. Por favor, intenta de nuevo.");
      setUsuarios([]); // Establecer array vacío en caso de error
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const newErrores = {};
    const rutError = validarRut(form.rut);
    if (rutError) newErrores.rut = rutError;
    const nombreError = validarNombre(form.nombre);
    if (nombreError) newErrores.nombre = nombreError;
    const correoError = validarEmail(form.correo);
    if (correoError) newErrores.correo = correoError;

    setErrores(newErrores);
    return Object.keys(newErrores).length === 0;
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      if (editandoRut) {
        // Actualizar usuario existente
        await updateUsuario(editandoRut, form);
        alert("Usuario actualizado exitosamente");
        setEditandoRut(null);
      } else {
        // Crear nuevo usuario
        await createUsuario(form);
        alert("Usuario creado exitosamente");
      }

      // Recargar la lista de usuarios
      await cargarUsuarios();

      // Limpiar formulario
      setForm({
        rut: "",
        nombre: "",
        correo: "",
        contrasena: "",
        rol: "Cliente",
      });
      setErrores({});
    } catch (err) {
      console.error("Error al guardar usuario:", err);
      console.error("Error response:", err.response);
      console.error("Error data:", err.response?.data);
      console.error("Error status:", err.response?.status);

      if (err.response?.status === 409) {
        alert("Ya existe un usuario con este RUT.");
      } else if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      } else if (err.message === "Network Error") {
        alert("Error de conexión. Verifica que el servidor esté corriendo en http://localhost:9090");
      } else {
        alert(`Error al guardar el usuario: ${err.message}`);
      }
    }
  };

  const handleEditar = (usuario) => {
    setForm(usuario);
    setEditandoRut(usuario.rut);
  };

  const handleEliminar = async (rut) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return;
    }

    try {
      await deleteUsuarioByRut(rut);
      alert("Usuario eliminado exitosamente");
      await cargarUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      alert("Error al eliminar el usuario. Por favor, intenta de nuevo.");
    }
  };

  const handleCancelar = () => {
    setForm({
      rut: "",
      nombre: "",
      correo: "",
      contrasena: "",
      rol: "Cliente",
    });
    setEditandoRut(null);
    setErrores({});
  };

  return (
    <div className="admin-page" style={{ minHeight: "100vh", background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)' }}>
      <HeaderAdmin titulo="Panel Administrador — Usuarios" />
      <div className="d-flex">
        <BarraLateralAdmin />

        <div className="admin-content flex-grow-1 p-4 text-light">
          {/* Mensajes de error global */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError(null)}></button>
            </div>
          )}

          {/* Formulario */}
          <div style={{ backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
            <h2>{editandoRut ? "Editar Usuario" : "Agregar Nuevo Usuario"}</h2>
            <form onSubmit={handleAgregar} className="row g-3 mt-2">
              <div className="col-md-6">
                <input
                  type="text"
                  name="rut"
                  placeholder="RUT (ej: 12345678-9)"
                  className="form-control"
                  value={form.rut}
                  onChange={handleChange}
                  disabled={!!editandoRut}
                  required
                />
                {errores.rut && <small className="text-danger">{errores.rut}</small>}
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
                {errores.nombre && <small className="text-danger">{errores.nombre}</small>}
              </div>

              <div className="col-md-6">
                <input
                  type="email"
                  name="correo"
                  placeholder="Correo"
                  className="form-control"
                  value={form.correo}
                  onChange={handleChange}
                  required
                />
                {errores.correo && <small className="text-danger">{errores.correo}</small>}
              </div>

              <div className="col-md-6">
                <input
                  type="password"
                  name="contrasena"
                  placeholder="Contraseña"
                  className="form-control"
                  value={form.contrasena}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <select
                  name="rol"
                  className="form-select"
                  value={form.rol}
                  onChange={handleChange}
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Empleado">Empleado</option>
                </select>
              </div>

              <div className="col-12 text-end">
                {editandoRut && (
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={handleCancelar}
                  >
                    Cancelar
                  </button>
                )}
                <button type="submit" className="btn btn-primary">
                  {editandoRut ? "Guardar Cambios" : "Agregar Usuario"}
                </button>
              </div>
            </form>
          </div>

          {/* Tabla */}
          <div className="table-responsive">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando usuarios...</p>
              </div>
            ) : usuarios.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-white-50">No hay usuarios registrados.</p>
              </div>
            ) : (
              <table className="table table-dark table-striped text-center">
                <thead>
                  <tr>
                    <th>RUT</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.rut}>
                      <td>{usuario.rut}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.correo}</td>
                      <td>
                        <span className={`badge ${usuario.rol === 'Empleado' ? 'bg-warning' : 'bg-info'}`}>
                          {usuario.rol}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-light me-2"
                          onClick={() => handleEditar(usuario)}
                        >
                          <i className="bi bi-pencil-fill me-1"></i>
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleEliminar(usuario.rut)}
                        >
                          <i className="bi bi-trash-fill me-1"></i>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsuarios;
