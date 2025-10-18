import { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import { artistas as artistasData } from "../data/artistas"; // tus artistas "base"

function AdminArtistas() {
  const [artistas, setArtistas] = useState(() => {
    const stored = localStorage.getItem("artistas");
    const storedData = stored ? JSON.parse(stored) : [];
    // Combinar los datos base con los guardados en localStorage (evitar duplicados por id)
    const combined = [...artistasData];
    storedData.forEach(a => {
      if (!combined.find(base => base.id_art === a.id_art)) combined.push(a);
    });
    return combined;
  });

  const [form, setForm] = useState({
    id_art: "",
    nombre: "",
    pais: "",
    añoFormacion: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Guardar solo los que no son del archivo base (los creados por el usuario)
    const baseIds = artistasData.map(a => a.id_art);
    const userData = artistas.filter(a => !baseIds.includes(a.id_art));
    localStorage.setItem("artistas", JSON.stringify(userData));
  }, [artistas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setArtistas(artistas.map(a => (a.id_art === editingId ? { ...form, id_art: editingId } : a)));
      setEditingId(null);
    } else {
      const newId = artistas.length ? Math.max(...artistas.map(a => a.id_art)) + 1 : 1;
      setArtistas([...artistas, { ...form, id_art: newId }]);
    }
    setForm({ id_art: "", nombre: "", pais: "", añoFormacion: "" });
  };

  const handleEdit = (artista) => {
    setForm({ ...artista });
    setEditingId(artista.id_art);
  };

  const handleDelete = (id) => {
    setArtistas(artistas.filter(a => a.id_art !== id));
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)' }}>
        <div className="row">
          <div className="col-md-2">
            <BarraLateralAdmin />
          </div>
          <div className="col-md-10 p-4" style={{ color: "white" }}>
            <h2>Administrar Artistas</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
              <div className="row mb-2">
                <div className="col-md-4">
                  <input className="form-control" placeholder="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                  <input className="form-control" placeholder="País" name="pais" value={form.pais} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                  <input className="form-control" placeholder="Año de Formación" type="number" name="añoFormacion" value={form.añoFormacion} onChange={handleChange} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">{editingId !== null ? "Guardar Cambios" : "Agregar Artista"}</button>
            </form>

            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>País</th>
                  <th>Año de Formación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {artistas.map(a => (
                  <tr key={a.id_art}>
                    <td>{a.id_art}</td>
                    <td>{a.nombre}</td>
                    <td>{a.pais}</td>
                    <td>{a.añoFormacion}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(a)}>Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a.id_art)}>Eliminar</button>
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
}

export default AdminArtistas;
