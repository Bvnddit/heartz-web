import { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import { artistas as artistasData } from "../data/artistas";
import { generos as generosData } from "../data/generos";
import { vinilos as vinilosData } from "../data/vinilos";

function AdminVinilos() {
  // Combinar datos base con localStorage
  const [artistas, setArtistas] = useState(() => {
    const stored = localStorage.getItem("artistas");
    const storedData = stored ? JSON.parse(stored) : [];
    const combined = [...artistasData];
    storedData.forEach(a => {
      if (!combined.find(base => base.id_art === a.id_art)) combined.push(a);
    });
    return combined;
  });

  const [generos, setGeneros] = useState(() => {
    const stored = localStorage.getItem("generos");
    const storedData = stored ? JSON.parse(stored) : [];
    const combined = [...generosData];
    storedData.forEach(g => {
      if (!combined.find(base => base.id_gen === g.id_gen)) combined.push(g);
    });
    return combined;
  });

  const [vinilos, setVinilos] = useState(() => {
    const stored = localStorage.getItem("vinilos");
    const storedData = stored ? JSON.parse(stored) : [];
    const combined = [...vinilosData];
    storedData.forEach(v => {
      if (!combined.find(base => base.id_vin === v.id_vin)) combined.push(v);
    });
    return combined;
  });

  const [form, setForm] = useState({
    id_vin: "",
    titulo: "",
    id_art: artistas[0]?.id_art || "",
    id_gen: generos[0]?.id_gen || "",
    año: "",
    precio: "",
    formato: "",
    colorVinilo: "",
    stock: "",
    sello: "",
    pais: "",
    edicion: "",
    duracion: "",
    descripcion: "",
    img: [""],
    listaDeCanciones: [""],
  });

  const [editingId, setEditingId] = useState(null);

  // Guardar en localStorage solo los vinilos creados por el usuario (no los base)
  useEffect(() => {
    const baseIds = vinilosData.map(v => v.id_vin);
    const userData = vinilos.filter(v => !baseIds.includes(v.id_vin));
    localStorage.setItem("vinilos", JSON.stringify(userData));
  }, [vinilos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (index, value, field) => {
    const arr = [...form[field]];
    arr[index] = value;
    setForm({ ...form, [field]: arr });
  };

  const addArrayField = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayField = (field, index) => {
    const arr = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: arr });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setVinilos(
        vinilos.map((v) =>
          v.id_vin === editingId ? { ...form, id_vin: editingId } : v
        )
      );
      setEditingId(null);
    } else {
      const newId = vinilos.length ? Math.max(...vinilos.map((v) => v.id_vin)) + 1 : 1;
      setVinilos([...vinilos, { ...form, id_vin: newId }]);
    }

    setForm({
      id_vin: "",
      titulo: "",
      id_art: artistas[0]?.id_art || "",
      id_gen: generos[0]?.id_gen || "",
      año: "",
      precio: "",
      formato: "",
      colorVinilo: "",
      stock: "",
      sello: "",
      pais: "",
      edicion: "",
      duracion: "",
      descripcion: "",
      img: [""],
      listaDeCanciones: [""],
    });
  };

  const handleEdit = (vinilo) => {
    setForm({ ...vinilo });
    setEditingId(vinilo.id_vin);
  };

  const handleDelete = (id) => {
    setVinilos(vinilos.filter((v) => v.id_vin !== id));
  };

  return (
    <div>
      <HeaderAdmin />
      <div
        className="container-fluid"
        style={{ background: "linear-gradient(135deg, #1c1c1c, #2a1c3b)" }}
      >
        <div className="row">
          <div className="col-md-2">
            <BarraLateralAdmin />
          </div>
          <div className="col-md-10 p-4" style={{ color: "white" }}>
            <h2>Administrar Vinilos</h2>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
              <div className="row mb-2">
                <div className="col-md-4 mb-2">
                  <input
                    className="form-control"
                    placeholder="Título"
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <select
                    className="form-control"
                    name="id_art"
                    value={form.id_art}
                    onChange={handleChange}
                  >
                    {artistas.map((a) => (
                      <option key={a.id_art} value={a.id_art}>
                        {a.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mb-2">
                  <select
                    className="form-control"
                    name="id_gen"
                    value={form.id_gen}
                    onChange={handleChange}
                  >
                    {generos.map((g) => (
                      <option key={g.id_gen} value={g.id_gen}>
                        {g.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-md-2">
                  <input
                    className="form-control"
                    placeholder="Año"
                    name="año"
                    type="number"
                    value={form.año}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    placeholder="Precio"
                    name="precio"
                    type="number"
                    value={form.precio}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    placeholder="Formato"
                    name="formato"
                    value={form.formato}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    placeholder="Color"
                    name="colorVinilo"
                    value={form.colorVinilo}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    placeholder="Stock"
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    placeholder="Sello"
                    name="sello"
                    value={form.sello}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-md-2">
                  <input
                    className="form-control"
                    placeholder="País"
                    name="pais"
                    value={form.pais}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    placeholder="Edición"
                    name="edicion"
                    value={form.edicion}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    placeholder="Duración"
                    name="duracion"
                    value={form.duracion}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-2">
                <textarea
                  className="form-control"
                  placeholder="Descripción"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                />
              </div>

                <div className="mb-2">
                    <label>
                        Imágenes (solo URL, ej: https://misitio.com/imagenes/album.jpg)
                    </label>
                    {form.img.map((img, i) => (
                        <div key={i} className="d-flex mb-1">
                        <input
                            className="form-control"
                            placeholder="https://ejemplo.com/imagen.jpg"
                            value={img}
                            onChange={(e) => handleArrayChange(i, e.target.value, "img")}
                        />
                        <button
                            type="button"
                            className="btn btn-danger btn-sm ms-1"
                            onClick={() => removeArrayField("img", i)}
                        >
                            X
                        </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => addArrayField("img")}
                    >
                        + Añadir Imagen
                    </button>
                </div>


              <div className="mb-2">
                <label>Lista de Canciones</label>
                {form.listaDeCanciones.map((c, i) => (
                  <div key={i} className="d-flex mb-1">
                    <input
                      className="form-control"
                      value={c}
                      onChange={(e) => handleArrayChange(i, e.target.value, "listaDeCanciones")}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm ms-1"
                      onClick={() => removeArrayField("listaDeCanciones", i)}
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => addArrayField("listaDeCanciones")}
                >
                  + Añadir Canción
                </button>
              </div>

              <button type="submit" className="btn btn-primary mt-2">
                {editingId !== null ? "Guardar Cambios" : "Agregar Vinilo"}
              </button>
            </form>

            {/* TABLA DE VINILOS */}
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Artista</th>
                  <th>Género</th>
                  <th>Año</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vinilos.map((v) => (
                  <tr key={v.id_vin}>
                    <td>{v.id_vin}</td>
                    <td>{v.titulo}</td>
                    <td>{artistas.find((a) => a.id_art === v.id_art)?.nombre || "Desconocido"}</td>
                    <td>{generos.find((g) => g.id_gen === v.id_gen)?.nombre || "Desconocido"}</td>
                    <td>{v.año}</td>
                    <td>{v.precio}</td>
                    <td>{v.stock}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(v)}>Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(v.id_vin)}>Eliminar</button>
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

export default AdminVinilos;
