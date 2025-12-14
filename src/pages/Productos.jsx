import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { filtrarPorGenero, filtrarPorArtista, ordenarPorPrecio } from "../util/Validaciones";
import { getAllVinilos } from "../api/vinilos";
import { transformVinilos } from "../util/transformVinilo";
import ImagenVinilo from "../components/ImagenVinilo";
import {
  Snackbar,
  Alert,
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  MenuItem,
  InputAdornment,
  useTheme
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const Productos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { agregarProducto } = useContext(CarritoContext);
  const theme = useTheme();

  // URL Params
  const params = new URLSearchParams(location.search);
  const artistaParam = params.get("artista");

  // State
  const [filtroGenero, setFiltroGenero] = useState("todos");
  const [filtroArtista, setFiltroArtista] = useState(artistaParam || "todos");
  const [ordenPrecio, setOrdenPrecio] = useState("ninguno");
  const [vinilos, setVinilos] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Snackbar State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetch Data
  useEffect(() => {
    const cargarVinilos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllVinilos();
        const vinilosAPI = transformVinilos(response.data);

        setVinilos(vinilosAPI);

        const uniqueArtistas = [...new Set(vinilosAPI.map(v => v.artista).filter(Boolean))].map(nombre => ({
          id_art: nombre,
          nombre: nombre
        }));
        const uniqueGeneros = [...new Set(vinilosAPI.map(v => v.genero).filter(Boolean))].map(nombre => ({
          id_gen: nombre,
          nombre: nombre
        }));

        setArtistas(uniqueArtistas);
        setGeneros(uniqueGeneros);

      } catch (err) {
        console.error("Error al cargar vinilos:", err);
        setError("Error al cargar los vinilos.");
        setVinilos([]);
      } finally {
        setLoading(false);
      }
    };

    cargarVinilos();
  }, []);

  // Sync Artist Filter with URL
  useEffect(() => {
    const currentArtistaParam = new URLSearchParams(location.search).get("artista");
    setFiltroArtista(currentArtistaParam || "todos");
  }, [location.search]);

  // Helpers
  const getArtista = (id_art) => id_art || "Desconocido";
  const getGenero = (id_gen) => id_gen || "Sin género";

  const handleVer = (vinilo) => {
    navigate(`/productos/${vinilo.id_vin}`);
  };

  const handleAñadir = (vinilo) => {
    agregarProducto(vinilo);
    showSnackbar(`Añadido al carrito: ${vinilo.titulo}`, "success");
  };

  // Filtering Logic
  let vinilosFiltrados = filtrarPorGenero(vinilos, filtroGenero);
  vinilosFiltrados = filtrarPorArtista(vinilosFiltrados, filtroArtista);
  vinilosFiltrados = ordenarPorPrecio(vinilosFiltrados, ordenPrecio);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      py: 8
    }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component={motion.h2}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          align="center"
          gutterBottom
          sx={{
            fontWeight: 800,
            mb: 6,
            color: 'white',
            letterSpacing: '2px'
          }}
        >
          Nuestra Colección
        </Typography>

        {/* Filters Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          sx={{
            p: 3,
            mb: 5,
            borderRadius: 0,
            bgcolor: '#111',
            border: '1px solid #333',
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Filtrar por Género"
                value={filtroGenero}
                onChange={(e) => setFiltroGenero(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterListIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    backgroundColor: '#222',
                    '& fieldset': { borderColor: '#444' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputLabel-root': { color: '#aaa' },
                  '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                  '& .MuiSvgIcon-root': { color: 'white' }
                }}
              >
                <MenuItem value="todos">Todos los géneros</MenuItem>
                {generos.map((g) => (
                  <MenuItem key={g.id_gen} value={g.id_gen}>
                    {g.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Filtrar por Artista"
                value={filtroArtista}
                onChange={(e) => setFiltroArtista(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    backgroundColor: '#222',
                    '& fieldset': { borderColor: '#444' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputLabel-root': { color: '#aaa' },
                  '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                  '& .MuiSvgIcon-root': { color: 'white' }
                }}
              >
                <MenuItem value="todos">Todos los artistas</MenuItem>
                {artistas.map((a) => (
                  <MenuItem key={a.id_art} value={a.id_art}>
                    {a.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Ordenar por Precio"
                value={ordenPrecio}
                onChange={(e) => setOrdenPrecio(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SortIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    backgroundColor: '#222',
                    '& fieldset': { borderColor: '#444' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputLabel-root': { color: '#aaa' },
                  '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                  '& .MuiSvgIcon-root': { color: 'white' }
                }}
              >
                <MenuItem value="ninguno">Destacados</MenuItem>
                <MenuItem value="asc">Menor precio primero</MenuItem>
                <MenuItem value="desc">Mayor precio primero</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <Box display="flex" justifyContent="center" py={10}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              style={{
                width: 50,
                height: 50,
                border: '5px solid #e0e0e0',
                borderTop: '5px solid white',
                borderRadius: '50%'
              }}
            />
          </Box>
        )}

        {/* Products Grid */}
        {!loading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              {vinilosFiltrados.length > 0 ? (
                vinilosFiltrados.map((vinilo) => (
                  <Grid item key={vinilo.id_vin} xs={12} sm={6} md={4}>
                    <motion.div variants={itemVariants} whileHover={{ y: -10 }}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: 2,
                          overflow: 'visible',
                          transition: '0.3s',
                          bgcolor: '#111',
                          color: 'white',
                          border: '1px solid #333',
                          '&:hover': {
                            borderColor: 'white',
                            transform: 'translateY(-5px)'
                          }
                        }}
                      >
                        <Box sx={{ position: 'relative', overflow: 'hidden', borderTopLeftRadius: 12, borderTopRightRadius: 12, height: 350 }}>
                          {vinilo.img && Array.isArray(vinilo.img) && vinilo.img.length > 0 ? (
                            <CardMedia
                              component="img"
                              image={vinilo.img[0]}
                              alt={vinilo.titulo}
                              sx={{
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s',
                                '&:hover': { transform: 'scale(1.1)' },
                                cursor: 'pointer'
                              }}
                              onClick={() => handleVer(vinilo)}
                            />
                          ) : (
                            <Box
                              sx={{
                                height: '100%',
                                bgcolor: 'grey.300',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column'
                              }}
                              onClick={() => handleVer(vinilo)}
                            >
                              <SearchIcon sx={{ fontSize: 60, opacity: 0.3 }} />
                              <Typography variant="caption" color="textSecondary">Sin imagen</Typography>
                            </Box>
                          )}
                          <Chip
                            label={getGenero(vinilo.id_gen)}
                            size="small"
                            color="primary"
                            sx={{
                              position: 'absolute',
                              top: 16,
                              right: 16,
                              fontWeight: 'bold',
                              backdropFilter: 'blur(4px)',
                              backgroundColor: '#333',
                              color: 'white'
                            }}
                          />
                        </Box>

                        <CardContent sx={{ flexGrow: 1, textAlign: 'center', pb: 1 }}>
                          <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'bold', minHeight: 64, color: 'white' }}>
                            {vinilo.titulo}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>
                            {getArtista(vinilo.id_art)}
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: '800', mt: 2, color: 'white' }}>
                            ${vinilo.precio.toLocaleString("es-CL")}
                          </Typography>
                        </CardContent>

                        <CardActions sx={{ justifyContent: 'center', pb: 3, pt: 0, px: 2, gap: 1 }}>
                          <Button
                            variant="outlined"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleVer(vinilo)}
                            sx={{
                              borderRadius: 0,
                              flex: 1,
                              borderColor: 'white',
                              color: 'white',
                              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }
                            }}
                          >
                            Ver
                          </Button>
                          <Button
                            variant="contained"
                            startIcon={<ShoppingCartIcon />}
                            onClick={() => handleAñadir(vinilo)}
                            disableElevation
                            sx={{
                              borderRadius: 0,
                              flex: 1.5,
                              bgcolor: 'white',
                              color: 'black',
                              '&:hover': { bgcolor: '#e0e0e0' }
                            }}
                          >
                            Comprar
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box textAlign="center" py={5}>
                    <Typography variant="h5" sx={{ color: '#aaa' }}>
                      No encontramos vinilos con esos filtros
                    </Typography>
                    <Button variant="text" onClick={() => {
                      setFiltroGenero("todos");
                      setFiltroArtista("todos");
                    }} sx={{ mt: 2 }}>
                      Limpiar filtros
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </motion.div>
        )}
      </Container>

      {/* Footer Decoration */}
      <Box sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'white',
        zIndex: 10
      }} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Productos;