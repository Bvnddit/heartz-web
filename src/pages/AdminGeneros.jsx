import { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import { generos as generosData } from "../data/generos";

function AdminGeneros() {
  const [generos, setGeneros] = useState(() => {
    const stored = localStorage.getItem("generos");
    const storedData = stored ? JSON.parse(stored) : [];
    const combined = [...generosData];
    storedData.forEach(g => {
      if (!combined.find(base => base.id_gen === g.id_gen)) combined.push(g);
    });
    return combined;
  });

  const [form, setForm] = useState({ id_gen: "", nombre: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const baseIds = generosData.map(g => g.id_gen);
    const userData = generos.filter(g => !baseIds.includes(g.id_gen));
    localStorage.setItem("generos", JSON.stringify(userData));
  }, [generos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setGeneros(generos.map(g => (g.id_gen === editingId ? { ...form, id_gen: editingId } : g)));
      setEditingId(null);
    } else {
      const newId = generos.length ? Math.max(...generos.map(g => g.id_gen)) + 1 : 1;
      setGeneros([...generos, { ...form, id_gen: newId }]);
    }
    setForm({ id_gen: "", nombre: "" });
  };

  const handleEdit = (genero) => {
    setForm({ ...genero });
    setEditingId(genero.id_gen);
  };

  const handleDelete = (id) => {
    setGeneros(generos.filter(g => g.id_gen !== id));
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
            <h2>Administrar Géneros</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
              <div className="row mb-2">
                <div className="col-md-6">
                  <input className="form-control" placeholder="Nombre del Género" name="nombre" value={form.nombre} onChange={handleChange} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">{editingId !== null ? "Guardar Cambios" : "Agregar Género"}</button>
            </form>

            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {generos.map(g => (
                  <tr key={g.id_gen}>
                    <td>{g.id_gen}</td>
                    <td>{g.nombre}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(g)}>Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(g.id_gen)}>Eliminar</button>
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

export default AdminGeneros;
