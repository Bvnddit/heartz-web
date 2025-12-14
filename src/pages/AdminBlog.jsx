import { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import {
    getAllBlogs,
    insertBlog,
    updateBlog,
    deleteBlog
} from "../api/blogs";
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
    Search as SearchIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";

function AdminBlog() {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        img: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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

    useEffect(() => {
        cargarBlogs();
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

    const cargarBlogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllBlogs();
            setBlogs(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Error al cargar blogs:", err);
            setError("Error al cargar los blogs.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSend = {
                titulo: form.titulo,
                descripcion: form.descripcion,
                img: form.img
            };

            if (editingId !== null) {
                await updateBlog(editingId, dataToSend);
                showSnackbar("Blog actualizado exitosamente", "success");
                setEditingId(null);
            } else {
                await insertBlog(dataToSend);
                showSnackbar("Blog creado exitosamente", "success");
            }

            await cargarBlogs();
            resetForm();
        } catch (err) {
            console.error("Error al guardar blog:", err);
            showSnackbar("Error al procesar la solicitud", "error");
        }
    };

    const resetForm = () => {
        setForm({
            titulo: "",
            descripcion: "",
            img: ""
        });
        setEditingId(null);
    };

    const handleEdit = (blog) => {
        setForm({
            titulo: blog.titulo || "",
            descripcion: blog.descripcion || "",
            img: blog.img || ""
        });
        setEditingId(blog.id);
    };

    const handleDelete = (id) => {
        setConfirmDialog({
            open: true,
            title: "¿Estás seguro?",
            content: "¿Estás seguro de que deseas eliminar este blog?",
            onConfirm: () => ejecutarEliminacion(id)
        });
    };

    const ejecutarEliminacion = async (id) => {
        closeConfirmDialog();
        try {
            await deleteBlog(id);
            showSnackbar("Blog eliminado exitosamente", "success");
            await cargarBlogs();
        } catch (err) {
            console.error("Error al eliminar blog:", err);
            showSnackbar("Error al eliminar el blog.", "error");
        }
    };

    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': { borderColor: '#555' },
            '&:hover fieldset': { borderColor: '#aaa' },
            '&.Mui-focused fieldset': { borderColor: '#90caf9' },
        },
        '& .MuiInputLabel-root': { color: '#aaa' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#90caf9' },
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
                            Administrar Blogs
                        </Typography>

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
                                {editingId !== null ? "Editar Blog" : "Crear Nuevo Blog"}
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Título"
                                            name="titulo"
                                            value={form.titulo}
                                            onChange={handleChange}
                                            required
                                            sx={inputStyle}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Imagen URL"
                                            name="img"
                                            value={form.img}
                                            onChange={handleChange}
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
                                            rows={6}
                                            required
                                            sx={inputStyle}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                        {editingId !== null && (
                                            <Button
                                                variant="outlined"
                                                onClick={resetForm}
                                                sx={{ mr: 2, color: 'white', borderColor: 'white' }}
                                            >
                                                Cancelar
                                            </Button>
                                        )}
                                        <Button type="submit" variant="contained" color="primary">
                                            {editingId !== null ? "Guardar Cambios" : "Crear Blog"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>

                        {/* TABLA */}
                        <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e", color: "white" }}>
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            ) : blogs.length === 0 ? (
                                <div className="text-center py-5 text-white-50">No hay blogs registrados.</div>
                            ) : (
                                <>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Buscar por título..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        sx={{
                                            mb: 2,
                                            backgroundColor: "#2c2c2c",
                                            borderRadius: "5px",
                                            m: 2,
                                            width: "97%",
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
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>ID</TableCell>
                                                <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>Título</TableCell>
                                                <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }}>Imagen</TableCell>
                                                <TableCell sx={{ color: '#90caf9', fontWeight: 'bold' }} align="center">Acciones</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {blogs
                                                .filter(b => b.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
                                                .map(blog => (
                                                    <TableRow key={blog.id} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' } }}>
                                                        <TableCell sx={{ color: 'white' }}>{blog.id}</TableCell>
                                                        <TableCell sx={{ color: 'white' }}>{blog.titulo}</TableCell>
                                                        <TableCell sx={{ color: 'white' }}>
                                                            {blog.img && (
                                                                <img src={blog.img} alt={blog.titulo} style={{ height: '50px', borderRadius: '4px' }} />
                                                            )}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <IconButton onClick={() => handleEdit(blog)} sx={{ color: '#ffb74d' }}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton onClick={() => handleDelete(blog.id)} sx={{ color: '#f44336' }}>
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
            </div>
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

            <Dialog
                open={confirmDialog.open}
                onClose={closeConfirmDialog}
                PaperProps={{
                    style: { backgroundColor: '#1e1e1e', color: 'white', border: '1px solid #333' }
                }}
            >
                <DialogTitle sx={{ color: 'white' }}>{confirmDialog.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: '#ccc' }}>{confirmDialog.content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmDialog} sx={{ color: 'white' }}>Cancelar</Button>
                    <Button onClick={confirmDialog.onConfirm} color="error" autoFocus>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </motion.div>
    );
}

export default AdminBlog;
