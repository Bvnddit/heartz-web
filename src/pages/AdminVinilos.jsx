import { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import {
  getAllVinilos,
  createVinilo,
  updateVinilo,
  deleteViniloById
} from "../api/vinilos";
import { validarTexto, validarNumeroPositivo } from "../util/Validaciones";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Typography,
  InputAdornment
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";

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
    canciones: [""],
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para alertas MUI
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: null
  });

  // Cargar vinilos al montar el componente
  useEffect(() => {
    cargarVinilos();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

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

    // Validación para País: Solo texto
    if (name === "pais") {
      if (!validarTexto(value)) return;
    }

    // Validación para números positivos
    if (["duracion", "stock", "precio", "anno"].includes(name)) {
      if (!validarNumeroPositivo(value)) return;
    }

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
        canciones: form.canciones.filter(c => c.trim() !== "") || [],
      };

      if (editingId !== null) {
        await updateVinilo(editingId, dataToSend);
        showSnackbar("Vinilo actualizado exitosamente", "success");
        setEditingId(null);
      } else {
        await createVinilo(dataToSend);
        showSnackbar("Vinilo creado exitosamente", "success");
      }

      await cargarVinilos();
      resetForm();
    } catch (err) {
      console.error("Error al guardar vinilo:", err);
      console.error("Error response:", err.response);
      console.error("Error data:", err.response?.data);

      if (err.response?.data?.message) {
        showSnackbar(`Error: ${err.response.data.message}`, "error");
      } else if (err.message === "Network Error") {
        showSnackbar("Error de conexión. Verifica que el servidor esté corriendo.", "error");
      } else {
        showSnackbar(`Error al guardar el vinilo: ${err.message}`, "error");
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
      canciones: [""],
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
      canciones: vinilo.canciones && Array.isArray(vinilo.canciones) ? vinilo.canciones : [""],
    });
    setEditingId(vinilo.id_vin);
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      open: true,
      title: "¿Estás seguro?",
      content: "¿Estás seguro de que deseas eliminar este vinilo?",
      onConfirm: () => ejecutarEliminacion(id)
    });
  };

  const ejecutarEliminacion = async (id) => {
    closeConfirmDialog();
    try {
      await deleteViniloById(id);
      showSnackbar("Vinilo eliminado exitosamente", "success");
      await cargarVinilos();
    } catch (err) {
      console.error("Error al eliminar vinilo:", err);
      showSnackbar("Error al eliminar el vinilo. Por favor, intenta de nuevo.", "error");
    }
  };

  const handleCancelar = () => {
    resetForm();
    setEditingId(null);
  };

  // Estilos personalizados para inputs oscuros
  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: '#555' },
      '&:hover fieldset': { borderColor: '#aaa' },
      '&.Mui-focused fieldset': { borderColor: '#90caf9' },
    },
    '& .MuiInputLabel-root': { color: '#aaa' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#90caf9' },
    '& .MuiSelect-icon': { color: 'white' }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
            <Typography variant="h4" gutterBottom>
              Administrar Vinilos
            </Typography>

            {/* Mensajes de error global */}
            {error && (
              <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* FORMULARIO */}
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "#1e1e1e",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "20px",
                color: "white"
              }}
            >
              <Typography variant="h5" gutterBottom>
                {editingId !== null ? "Editar Vinilo" : "Agregar Nuevo Vinilo"}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Nombre del Álbum"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      sx={inputStyle}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Artista"
                      name="artista"
                      value={form.artista}
                      onChange={handleChange}
                      required
                      sx={inputStyle}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Género"
                      name="genero"
                      value={form.genero}
                      onChange={handleChange}
                      required
                      sx={inputStyle}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Sello"
                      name="sello"
                      value={form.sello}
                      onChange={handleChange}
                      sx={inputStyle}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="País"
                      name="pais"
                      value={form.pais}
                      onChange={handleChange}
                      sx={inputStyle}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth sx={inputStyle}>
                      <InputLabel>Formato</InputLabel>
                      <Select
                        name="formato"
                        value={form.formato}
                        label="Formato"
                        onChange={handleChange}
                      >
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="EP">EP</MenuItem>
                        <MenuItem value="LP/Album">LP/Album</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth sx={inputStyle}>
                      <InputLabel>Edición</InputLabel>
                      <Select
                        name="edicion"
                        value={form.edicion}
                        label="Edición"
                        onChange={handleChange}
                      >
                        <MenuItem value="Estandar">Estandar</MenuItem>
                        <MenuItem value="Edicion Especial">Edicion Especial</MenuItem>
                        <MenuItem value="Aniversario">Aniversario</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Color"
                      name="colorVinilo"
                      value={form.colorVinilo}
                      onChange={handleChange}
                      sx={inputStyle}
                    />
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <TextField
                      fullWidth
                      label="Año"
                      name="anno"
                      type="number"
                      value={form.anno}
                      onChange={handleChange}
                      required
                      InputProps={{ inputProps: { min: 0 } }}
                      sx={inputStyle}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      fullWidth
                      label="Duración (min)"
                      name="duracion"
                      type="number"
                      value={form.duracion}
                      onChange={handleChange}
                      InputProps={{ inputProps: { min: 0 } }}
                      sx={inputStyle}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      fullWidth
                      label="Stock"
                      name="stock"
                      type="number"
                      value={form.stock}
                      onChange={handleChange}
                      required
                      InputProps={{ inputProps: { min: 0 } }}
                      sx={inputStyle}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      fullWidth
                      label="Precio"
                      name="precio"
                      type="number"
                      value={form.precio}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: <InputAdornment position="start" sx={{ '& .MuiTypography-root': { color: '#aaa' } }}>$</InputAdornment>,
                        inputProps: { min: 0 }
                      }}
                      sx={inputStyle}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Descripción"
                      name="descripcion"
                      value={form.descripcion}
                      onChange={handleChange}
                      multiline
                      rows={3}
                      sx={inputStyle}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: '#aaa' }}>
                      Lista de Canciones
                    </Typography>
                    {form.canciones.map((cancion, i) => (
                      <Grid container spacing={1} key={i} alignItems="center" sx={{ mb: 1 }}>
                        <Grid item xs={10} md={11}>
                          <TextField
                            fullWidth
                            placeholder={`Canción ${i + 1}`}
                            value={cancion}
                            onChange={(e) => handleArrayChange(i, e.target.value, "canciones")}
                            size="small"
                            sx={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={2} md={1}>
                          {form.canciones.length > 1 && (
                            <IconButton onClick={() => removeArrayField("canciones", i)} color="error">
                              <RemoveIcon />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => addArrayField("canciones")}
                      sx={{ color: '#90caf9' }}
                    >
                      Añadir Canción
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: '#aaa' }}>
                      Imágenes (URLs)
                    </Typography>
                    {form.img.map((img, i) => (
                      <Grid container spacing={1} key={i} alignItems="center" sx={{ mb: 1 }}>
                        <Grid item xs={10} md={11}>
                          <TextField
                            fullWidth
                            placeholder="https://ejemplo.com/imagen.jpg"
                            value={img}
                            onChange={(e) => handleArrayChange(i, e.target.value, "img")}
                            size="small"
                            sx={inputStyle}
                          />
                        </Grid>
                        <Grid item xs={2} md={1}>
                          {form.img.length > 1 && (
                            <IconButton onClick={() => removeArrayField("img", i)} color="error">
                              <RemoveIcon />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>

                  <Grid item xs={12} sx={{ textAlign: 'right' }}>
                    {editingId !== null && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancelar}
                        sx={{ mr: 2, color: 'white', borderColor: 'white' }}
                      >
                        Cancelar
                      </Button>
                    )}
                    <Button type="submit" variant="contained" color="primary">
                      {editingId !== null ? "Guardar Cambios" : "Agregar Vinilo"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>

            {/* TABLA DE VINILOS */}
            <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e", color: "white" }}>
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
                <>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                      mb: 2,
                      backgroundColor: "#2c2c2c",
                      borderRadius: "5px",
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": { borderColor: "#555" },
                        "&:hover fieldset": { borderColor: "#aaa" },
                        "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "#aaa" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>Nombre</TableCell>
                        <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>Artista</TableCell>
                        <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>Género</TableCell>
                        <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>Año</TableCell>
                        <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>Precio</TableCell>
                        <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>Stock</TableCell>
                        <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }} align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vinilos
                        .filter((vinilo) =>
                          vinilo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((v) => (
                          <TableRow
                            key={v.id_vin}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' } }}
                          >
                            <TableCell component="th" scope="row" sx={{ color: 'white' }}>
                              {v.id_vin}
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>{v.nombre}</TableCell>
                            <TableCell sx={{ color: 'white' }}>{v.artista}</TableCell>
                            <TableCell sx={{ color: 'white' }}>{v.genero}</TableCell>
                            <TableCell sx={{ color: 'white' }}>{v.anno}</TableCell>
                            <TableCell sx={{ color: 'white' }}>${v.precio?.toLocaleString("es-CL")}</TableCell>
                            <TableCell sx={{ color: 'white' }}>
                              <span className={`badge ${v.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                {v.stock}
                              </span>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton onClick={() => handleEdit(v)} sx={{ color: '#ffb74d' }}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => handleDelete(v.id_vin)} sx={{ color: '#f44336' }}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </TableContainer>
          </div>
        </div>
      </div >

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Diálogo de confirmación */}
      <Dialog
        open={confirmDialog.open}
        onClose={closeConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#1e1e1e',
            color: 'white',
            border: '1px solid #333'
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: 'white' }}>
          {confirmDialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: '#ccc' }}>
            {confirmDialog.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} sx={{ color: 'white' }}>
            Cancelar
          </Button>
          <Button onClick={confirmDialog.onConfirm} color="error" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

export default AdminVinilos;
