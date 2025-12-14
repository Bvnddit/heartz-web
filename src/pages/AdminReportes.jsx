import React, { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import { obtenerTodasLasVentas } from "../api/ventas";
import { getUsuarios, getUsuarioById } from "../api/usuarios";
import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Divider,
  Card,
  CardContent,
  Avatar
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  ReceiptLong as ReceiptIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  ShoppingBag as ShoppingBagIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";

function AdminReportes() {
  const [ventas, setVentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ventasRes, usuariosRes] = await Promise.all([
          obtenerTodasLasVentas(),
          getUsuarios()
        ]);

        const ventasData = ventasRes.data.body || ventasRes.data;
        // Mapear idVin a id_vin para consistencia si es necesario
        // En este caso asumimos que ventasData ya viene estructurado correctamente

        // Ordenar por idVenta descendente
        const ventasOrdenadas = [...ventasData].sort((a, b) => b.idVenta - a.idVenta);
        setVentas(ventasOrdenadas);

        const usuariosData = usuariosRes.data || [];
        setUsuarios(usuariosData);

        // Debug: Ver estructura de datos
        console.log("=== DEBUG AdminReportes ===");
        console.log("Total ventas:", ventasOrdenadas.length);
        if (ventasOrdenadas.length > 0) {
          console.log("Primera venta completa:", ventasOrdenadas[0]);
          console.log("Usuario en primera venta:", ventasOrdenadas[0]?.usuario);
        }
        console.log("Total usuarios cargados:", usuariosData.length);
        if (usuariosData.length > 0) {
          console.log("Primer usuario:", usuariosData[0]);
        }

      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVerDetalles = async (venta) => {
    console.log("Venta seleccionada:", venta);
    console.log("Usuario en venta:", venta.usuario);

    let usuarioCompleto = null;

    try {
      // Intentar obtener el ID del usuario de diferentes formas
      const userId = venta.usuario?.idUsuario || venta.idUsuario || venta.usuario?.id;

      console.log("ID de usuario detectado:", userId);

      if (userId) {
        // Obtener datos frescos del usuario desde el backend
        const response = await getUsuarioById(userId);
        usuarioCompleto = response.data;
        console.log("Usuario obtenido del backend:", usuarioCompleto);
      } else {
        console.warn("No se pudo detectar el ID del usuario en la venta");
      }
    } catch (error) {
      console.error("Error al obtener usuario del backend:", error);

      // Fallback: buscar en la lista de usuarios cargada
      const userId = venta.usuario?.idUsuario || venta.idUsuario || venta.usuario?.id;
      if (userId) {
        usuarioCompleto = usuarios.find(u => u.idUsuario === userId);
        console.log("Usuario encontrado en lista local:", usuarioCompleto);
      }

      // Si aún no hay usuario, usar lo que venga en venta.usuario
      if (!usuarioCompleto && venta.usuario) {
        usuarioCompleto = venta.usuario;
      }
    }

    setSelectedVenta({
      ...venta,
      usuarioFull: usuarioCompleto
    });
    console.log("usuarioFull completo:", usuarioCompleto);
    console.log("Tipo de rol:", typeof usuarioCompleto?.rol, "Valor:", usuarioCompleto?.rol);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedVenta(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeaderAdmin />
      <div className="d-flex" style={{ minHeight: "100vh", background: "#121212" }}>
        <BarraLateralAdmin />

        <div className="flex-grow-1 p-4">
          <Box sx={{ maxWidth: 1200, mx: "auto" }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: "white", fontWeight: "bold", mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ReceiptIcon fontSize="large" sx={{ color: "#90caf9" }} />
              Reporte de Ventas
            </Typography>

            <Paper
              elevation={3}
              sx={{
                width: '100%',
                overflow: 'hidden',
                bgcolor: '#1e1e1e',
                color: 'white',
                borderRadius: 2,
                border: '1px solid #333'
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </Box>
              ) : ventas.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Alert severity="info" sx={{ bgcolor: 'rgba(2, 136, 209, 0.1)', color: '#90caf9' }}>No hay ventas registradas.</Alert>
                </Box>
              ) : (
                <TableContainer sx={{ maxHeight: 600 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ bgcolor: '#252525', color: '#90caf9', fontWeight: 'bold' }}>ID Venta</TableCell>
                        <TableCell sx={{ bgcolor: '#252525', color: '#90caf9', fontWeight: 'bold' }}>Fecha</TableCell>
                        <TableCell sx={{ bgcolor: '#252525', color: '#90caf9', fontWeight: 'bold' }}>Cliente (ID)</TableCell>
                        <TableCell sx={{ bgcolor: '#252525', color: '#90caf9', fontWeight: 'bold' }}>Total</TableCell>
                        <TableCell sx={{ bgcolor: '#252525', color: '#90caf9', fontWeight: 'bold' }}>Estado</TableCell>
                        <TableCell sx={{ bgcolor: '#252525', color: '#90caf9', fontWeight: 'bold' }} align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ventas.map((venta) => {
                        const date = new Date(venta.fecha);
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={venta.idVenta} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05) !important' } }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>#{venta.idVenta}</TableCell>
                            <TableCell sx={{ color: '#ccc' }}>
                              {date.toLocaleDateString()} <small style={{ color: '#777' }}>{date.toLocaleTimeString()}</small>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                              {(() => {
                                // Intentar obtener el nombre del usuario
                                const nombre = venta.usuario?.nombre;
                                // Intentar obtener el ID del usuario de diferentes formas
                                const userId = venta.usuario?.idUsuario || venta.idUsuario || venta.usuario?.id;

                                if (nombre) {
                                  return nombre;
                                } else if (userId) {
                                  return `Usuario #${userId}`;
                                } else {
                                  return 'Usuario desconocido';
                                }
                              })()}
                            </TableCell>
                            <TableCell sx={{ color: '#66bb6a', fontWeight: 'bold' }}>
                              ${venta.total.toLocaleString('es-CL')}
                            </TableCell>
                            <TableCell>
                              <Chip label="Completada" color="success" size="small" variant="outlined" />
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<VisibilityIcon />}
                                onClick={() => handleVerDetalles(venta)}
                                sx={{ color: '#90caf9', borderColor: 'rgba(144, 202, 249, 0.5)', '&:hover': { borderColor: '#90caf9', bgcolor: 'rgba(144, 202, 249, 0.08)' } }}
                              >
                                Ver Detalle
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Box>
        </div>
      </div>

      {/* DIÁLOGO DE DETALLES */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#1e1e1e',
            color: 'white',
            backgroundImage: 'none',
            border: '1px solid #444'
          }
        }}
      >
        {selectedVenta && (
          <>
            <DialogTitle sx={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box display="flex" alignItems="center" gap={1}>
                <ReceiptIcon color="primary" />
                <Typography variant="h6">Detalle Venta #{selectedVenta.idVenta}</Typography>
              </Box>
              <Chip label={new Date(selectedVenta.fecha).toLocaleString()} size="small" sx={{ bgcolor: '#333', color: '#ccc' }} />
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Grid container spacing={3}>

                {/* INFO CLIENTE */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ bgcolor: 'transparent', borderColor: '#444', height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle1" color="primary" gutterBottom display="flex" alignItems="center" gap={1}>
                        <PersonIcon fontSize="small" /> Información del Cliente
                      </Typography>
                      {selectedVenta.usuarioFull ? (
                        <Box sx={{ mt: 2 }}>
                          <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Avatar sx={{ bgcolor: '#90caf9', color: '#1e1e1e' }}>
                              {selectedVenta.usuarioFull.nombre ? selectedVenta.usuarioFull.nombre.charAt(0).toUpperCase() : 'U'}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {selectedVenta.usuarioFull.nombre || 'Sin nombre'} {selectedVenta.usuarioFull.apellido || ''}
                              </Typography>
                              <Typography variant="body2" color="#aaa">
                                {selectedVenta.usuarioFull.correo || selectedVenta.usuarioFull.email || 'Sin correo'}
                              </Typography>
                            </Box>
                          </Box>
                          <Divider sx={{ borderColor: '#333', my: 1 }} />
                          <Typography variant="body2" color="#ccc" sx={{ mt: 1 }}>
                            <strong>ID Usuario:</strong> {selectedVenta.usuarioFull.idUsuario || selectedVenta.usuarioFull.id || 'N/A'}
                          </Typography>
                          <Typography variant="body2" color="#ccc">
                            <strong>RUT:</strong> {selectedVenta.usuarioFull.rut || 'No registrado'}
                          </Typography>
                          <Typography variant="body2" color="#ccc">
                            <strong>Rol:</strong> {typeof selectedVenta.usuarioFull.rol === 'object'
                              ? (selectedVenta.usuarioFull.rol?.nombre || 'N/A')
                              : (selectedVenta.usuarioFull.rol || 'N/A')}
                          </Typography>
                        </Box>
                      ) : (
                        <Alert severity="warning" sx={{ mt: 1, bgcolor: 'rgba(255, 152, 0, 0.1)', color: '#ffcc80' }}>
                          Usuario no encontrado en la base de datos actual.
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                {/* INFO ENVÍO */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ bgcolor: 'transparent', borderColor: '#444', height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle1" color="secondary" gutterBottom display="flex" alignItems="center" gap={1}>
                        <LocationIcon fontSize="small" /> Detalles de Envío
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2" color="#eee">
                          <strong>Dirección:</strong> {selectedVenta.direccion}
                        </Typography>
                        <Typography variant="body2" color="#eee">
                          <strong>Comuna/Región:</strong> {selectedVenta.comuna}, {selectedVenta.region}
                        </Typography>
                        {selectedVenta.indicaciones && (
                          <Typography variant="body2" color="#ffd54f" sx={{ bgcolor: 'rgba(255, 213, 79, 0.1)', p: 1, borderRadius: 1 }}>
                            <small>Nota: {selectedVenta.indicaciones}</small>
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* PRODUCTOS */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="white" sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ShoppingBagIcon fontSize="small" /> Productos Comprados
                  </Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: 'transparent', borderColor: '#444' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: '#aaa' }}>Producto</TableCell>
                          <TableCell sx={{ color: '#aaa' }}>Artista</TableCell>
                          <TableCell align="right" sx={{ color: '#aaa' }}>Precio Unit.</TableCell>
                          <TableCell align="center" sx={{ color: '#aaa' }}>Cant.</TableCell>
                          <TableCell align="right" sx={{ color: '#aaa' }}>Subtotal</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedVenta.detalles && Array.isArray(selectedVenta.detalles) && selectedVenta.detalles.length > 0 ? (
                          selectedVenta.detalles.map((detalle, idx) => (
                            <TableRow key={idx}>
                              <TableCell sx={{ color: 'white' }}>
                                {detalle.vinilo?.titulo || detalle.vinilo?.nombre || 'Producto eliminado'}
                              </TableCell>
                              <TableCell sx={{ color: '#ccc' }}>
                                {detalle.vinilo?.artista || '-'}
                              </TableCell>
                              <TableCell align="right" sx={{ color: '#ccc' }}>
                                ${(detalle.precio || detalle.precioUnitario || 0).toLocaleString('es-CL')}
                              </TableCell>
                              <TableCell align="center" sx={{ color: '#ccc' }}>
                                {detalle.cantidad || 0}
                              </TableCell>
                              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>
                                ${((detalle.cantidad || 0) * (detalle.precio || detalle.precioUnitario || 0)).toLocaleString('es-CL')}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ color: '#aaa', py: 3 }}>
                              No hay productos en esta venta
                            </TableCell>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCell colSpan={4} align="right" sx={{ color: 'white', fontWeight: 'bold', borderBottom: 'none', fontSize: '1.2rem' }}>TOTAL:</TableCell>
                          <TableCell align="right" sx={{ color: '#66bb6a', fontWeight: 'bold', borderBottom: 'none', fontSize: '1.2rem' }}>
                            ${selectedVenta.total.toLocaleString('es-CL')}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: '1px solid #333' }}>
              <Button onClick={handleCloseDialog} variant="contained" color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

    </motion.div>
  );
}

export default AdminReportes;
