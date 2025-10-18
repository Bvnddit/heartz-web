import React, { useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import { usuarios as usuariosData } from "../data/usuarios";
import { validarRut, validarEmail, validarNombre } from "../util/Validaciones";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState(usuariosData);
  const [form, setForm] = useState({
    rut: "",
    nombre: "",
    correo: "",
    rol: "Cliente",
    fechaNacimiento: "",
  });
  const [editandoRut, setEditandoRut] = useState(null);
  const [errores, setErrores] = useState({});

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

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    if (editandoRut) {
      setUsuarios(
        usuarios.map((u) => (u.rut === editandoRut ? form : u))
      );
      setEditandoRut(null);
    } else {
      // Evitar duplicados de RUT
      if (usuarios.find((u) => u.rut === form.rut)) {
        alert("Ya existe un usuario con este RUT.");
        return;
      }
      setUsuarios([...usuarios, form]);
    }

    setForm({
      rut: "",
      nombre: "",
      correo: "",
      rol: "Cliente",
      fechaNacimiento: "",
    });
    setErrores({});
  };

  const handleEditar = (usuario) => {
    setForm(usuario);
    setEditandoRut(usuario.rut);
  };

  const handleEliminar = (rut) => {
    setUsuarios(usuarios.filter((u) => u.rut !== rut));
  };

  return (
    <div className="admin-page" style={{ minHeight: "100vh", background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)' }}>
      <HeaderAdmin titulo="Panel Administrador — Usuarios" />
      <div className="d-flex">
        <BarraLateralAdmin />

        <div className="admin-content flex-grow-1 p-4 text-light">
          {/* Formulario */}
          <div style={{ backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
            <h2>{editandoRut ? "Editar Usuario" : "Agregar Nuevo Usuario"}</h2>
            <form onSubmit={handleAgregar} className="row g-3 mt-2">
              <div className="col-md-6">
                <input
                  type="text"
                  name="rut"
                  placeholder="RUT"
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
                  type="date"
                  name="fechaNacimiento"
                  className="form-control"
                  value={form.fechaNacimiento}
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
                <button type="submit" className="btn btn-primary">
                  {editandoRut ? "Guardar Cambios" : "Agregar Usuario"}
                </button>
              </div>
            </form>
          </div>

          {/* Tabla */}
          <div className="table-responsive">
            <table className="table table-dark table-striped text-center">
              <thead>
                <tr>
                  <th>RUT</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Fecha de Nacimiento</th>
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
                    <td>{usuario.fechaNacimiento}</td>
                    <td>{usuario.rol}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-light me-2" onClick={() => handleEditar(usuario)}>Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(usuario.rut)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsuarios;
