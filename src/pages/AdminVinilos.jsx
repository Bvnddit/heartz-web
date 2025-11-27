import { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import {
  getAllVinilos,
  createVinilo,
  updateVinilo,
  deleteViniloById
} from "../api/vinilos";


function AdminVinilos() {

  const [vinilos, setVinilos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    artista: "",
    genero: "",
    anno: "",
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
  });

  const [editingId, setEditingId] = useState(null);

  // Cargar vinilos al montar el componente
  useEffect(() => {
    cargarVinilos();
  }, []);

  const cargarVinilos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllVinilos();
      const data = Array.isArray(response.data) ? response.data : [];
      // Mapear idVin a id_vin para consistencia
      const mappedData = data.map(v => ({
        ...v,
        id_vin: v.idVin || v.id_vin
      }));
      setVinilos(mappedData);
    } catch (err) {
      console.error("Error al cargar vinilos:", err);
      setError("Error al cargar los vinilos. Por favor, intenta de nuevo.");
      setVinilos([]);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Preparar datos para el backend
      const dataToSend = {
        nombre: form.nombre,
        artista: form.artista,
        genero: form.genero,
        anno: parseInt(form.anno) || 0,
        precio: parseFloat(form.precio) || 0,
        formato: form.formato || null,
        colorVinilo: form.colorVinilo || null,
        stock: parseInt(form.stock) || 0,
        sello: form.sello || null,
        pais: form.pais || null,
        edicion: form.edicion || null,
        duracion: form.duracion || null,
        descripcion: form.descripcion || null,
        img: form.img.filter(img => img.trim() !== "").join(",") || null,
      };

      if (editingId !== null) {
        await updateVinilo(editingId, dataToSend);
        alert("Vinilo actualizado exitosamente");
        setEditingId(null);
      } else {
        await createVinilo(dataToSend);
        alert("Vinilo creado exitosamente");
      }

      await cargarVinilos();
      resetForm();
    } catch (err) {
      console.error("Error al guardar vinilo:", err);
      console.error("Error response:", err.response);
      console.error("Error data:", err.response?.data);

      if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      } else if (err.message === "Network Error") {
        alert("Error de conexión. Verifica que el servidor esté corriendo.");
      } else {
        alert(`Error al guardar el vinilo: ${err.message}`);
      }
    }
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      artista: "",
      genero: "",
      anno: "",
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
    });
  };

  const handleEdit = (vinilo) => {
    setForm({
      nombre: vinilo.nombre || "",
      artista: vinilo.artista || "",
      genero: vinilo.genero || "",
      anno: vinilo.anno || "",
      precio: vinilo.precio || "",
      formato: vinilo.formato || "",
      colorVinilo: vinilo.colorVinilo || "",
      stock: vinilo.stock || "",
      sello: vinilo.sello || "",
      pais: vinilo.pais || "",
      edicion: vinilo.edicion || "",
      duracion: vinilo.duracion || "",
      descripcion: vinilo.descripcion || "",
      img: vinilo.img ? (typeof vinilo.img === 'string' ? vinilo.img.split(',').filter(i => i) : vinilo.img) : [""],
    });
    setEditingId(vinilo.id_vin);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este vinilo?")) {
      return;
    }

    try {
      await deleteViniloById(id);
      alert("Vinilo eliminado exitosamente");
      await cargarVinilos();
    } catch (err) {
      console.error("Error al eliminar vinilo:", err);
      alert("Error al eliminar el vinilo. Por favor, intenta de nuevo.");
    }
  };

  const handleCancelar = () => {
    resetForm();
    setEditingId(null);
  };

  return (
    <div>
      <HeaderAdmin />
      <div
        className="container-fluid"
        style={{ background: "linear-gradient(135deg, #1c1c1c, #2a1c3b)", minHeight: "100vh" }}
      >
        <div className="row">
          <div className="col-md-2">
            <BarraLateralAdmin />
          </div>
          <div className="col-md-10 p-4" style={{ color: "white" }}>
            <h2>Administrar Vinilos</h2>

            {/* Mensajes de error global */}
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
              </div>
            )}

            {/* FORMULARIO */}
            <div style={{ backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>{editingId !== null ? "Editar Vinilo" : "Agregar Nuevo Vinilo"}</h3>
              <form onSubmit={handleSubmit}>
                <div className="row mb-2">
                  <div className="col-md-4 mb-2">
                    <input
                      className="form-control"
                      placeholder="Nombre del Álbum *"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="row mb-2">
                  <div className="col-md-6 mb-2">
                    <input
                      className="form-control"
                      placeholder="Artista *"
                      name="artista"
                      value={form.artista}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <input
                      className="form-control"
                      placeholder="Género *"
                      name="genero"
                      value={form.genero}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-2">
                    <input
                      className="form-control"
                      placeholder="Año *"
                      name="anno"
                      type="number"
                      value={form.anno}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      className="form-control"
                      placeholder="Precio *"
                      name="precio"
                      type="number"
                      value={form.precio}
                      onChange={handleChange}
                      required
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
                      placeholder="Stock *"
                      name="stock"
                      type="number"
                      value={form.stock}
                      onChange={handleChange}
                      required
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
                      placeholder="Duración (min)"
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
                    rows="3"
                  />
                </div>

                <div className="mb-2">
                  <label>Imágenes (URLs)</label>
                  {form.img.map((img, i) => (
                    <div key={i} className="d-flex mb-1">
                      <input
                        className="form-control"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={img}
                        onChange={(e) => handleArrayChange(i, e.target.value, "img")}
                      />
                      {form.img.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm ms-1"
                          onClick={() => removeArrayField("img", i)}
                        >
                          X
                        </button>
                      )}
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

                <div className="mt-3">
                  {editingId !== null && (
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={handleCancelar}
                    >
                      Cancelar
                    </button>
                  )}
                  <button type="submit" className="btn btn-primary">
                    {editingId !== null ? "Guardar Cambios" : "Agregar Vinilo"}
                  </button>
                </div>
              </form>
            </div>

            {/* TABLA DE VINILOS */}
            <div className="table-responsive">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-3">Cargando vinilos...</p>
                </div>
              ) : vinilos.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-white-50">No hay vinilos registrados.</p>
                </div>
              ) : (
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
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
                        <td>{v.nombre}</td>
                        <td>{v.artista}</td>
                        <td>{v.genero}</td>
                        <td>{v.anno}</td>
                        <td>${v.precio?.toLocaleString("es-CL")}</td>
                        <td>
                          <span className={`badge ${v.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                            {v.stock}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning me-1"
                            onClick={() => handleEdit(v)}
                          >
                            <i className="bi bi-pencil-fill me-1"></i>
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(v.id_vin)}
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
      </div >
    </div >
  );
}

export default AdminVinilos;
