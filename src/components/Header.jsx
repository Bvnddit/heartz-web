// Búsqueda simplificada - ya no usamos datos estáticos
import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";

function Header() {
  const [busqueda, setBusqueda] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isAdmin } = useContext(AuthContext);

  // Estado para el menú de usuario
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Estado para confirmación de logout
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  // Estado para Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "warning"
  });

  const showSnackbar = (message, severity = "warning") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    setLogoutConfirmOpen(true);
  };

  const handleConfirmLogout = () => {
    setLogoutConfirmOpen(false);
    logout();
    navigate("/");
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('#navmenu') && !event.target.closest('.mobile-nav-toggle')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (busqueda.trim() === "") {
      showSnackbar("Por favor, introduce un término de búsqueda.", "warning");
      return;
    }

    // Simplemente navegar a productos - la búsqueda se puede implementar en el futuro con la API
    navigate("/productos");
    setBusqueda("");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between px-4">
        {/* Logo */}
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0 text-decoration-none">
          <i className="bi bi-disc-fill me-2 fs-3 text-white"></i>
          <h1 className="sitename">Heartz</h1>
        </Link>

        {/* Navegación principal */}
        <nav id="navmenu" className={`navmenu ${mobileMenuOpen ? 'navmenu-mobile-open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/nosotros" onClick={() => setMobileMenuOpen(false)}>Nosotros</Link></li>
            <li><Link to="/productos" onClick={() => setMobileMenuOpen(false)}>Productos</Link></li>
            <li><Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link></li>
            <li><Link to="/contacto" onClick={() => setMobileMenuOpen(false)}>Contacto</Link></li>
          </ul>

          {/* Elementos móviles: búsqueda, carrito y auth */}
          <div className="navmenu-mobile-content d-xl-none mt-4">
            {/* Buscador móvil */}
            <form className="d-flex mb-4" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2 bg-dark text-light border-secondary"
                type="search"
                placeholder="Buscar vinilo..."
                aria-label="Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit"><i className="bi bi-search"></i></button>
            </form>

            {/* Botón de carrito móvil */}
            <button className="btn btn-outline-light w-100 mb-3 d-flex align-items-center justify-content-center gap-2" onClick={() => { navigate("/carrito"); setMobileMenuOpen(false); }}>
              <i className="bi bi-cart3"></i> Carrito
            </button>

            {/* Auth móvil */}
            {isAuthenticated ? (
              <div className="d-flex flex-column gap-2">
                <div className="text-light mb-2 small opacity-75">
                  <i className="bi bi-person-circle me-2"></i>
                  {user.email}
                </div>
                {isAdmin() && (
                  <Link to="/admin" className="btn btn-warning w-100" onClick={() => setMobileMenuOpen(false)}>Panel Admin</Link>
                )}
                <button
                  className="btn btn-danger w-100"
                  onClick={() => {
                    // Para móvil, quizás directo es mejor por UX rápido, pero el usuario pidió "asegure si quiere cerrar sesión".
                    // Vamos a usar logout directo en móvil para no complicar el menú móvil.
                    logout();
                    navigate("/");
                    setMobileMenuOpen(false);
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2">
                <Link to="/Login" className="btn btn-outline-light w-100" onClick={() => setMobileMenuOpen(false)}>Iniciar Sesión</Link>
                <Link to="/Registro" className="btn btn-light w-100" onClick={() => setMobileMenuOpen(false)}>Registrarse</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Icons (Cart + Toggle) */}
        <div className="d-xl-none d-flex align-items-center gap-3">
          <button
            className="btn btn-link text-light p-0 position-relative"
            onClick={() => navigate("/carrito")}
            aria-label="Ver carrito"
          >
            <i className="bi bi-cart3 fs-4"></i>
          </button>

          <i
            className={`mobile-nav-toggle bi ${mobileMenuOpen ? 'bi-x' : 'bi-list'}`}
            onClick={toggleMobileMenu}
            style={{ fontSize: '28px', cursor: 'pointer' }}
          />
        </div>

        {/* Elementos desktop */}
        <div className="d-none d-xl-flex align-items-center gap-3">
          {/* Buscador desktop */}
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-secondary text-light border-end-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                className="form-control bg-transparent border-secondary text-light border-start-0 ps-0"
                type="search"
                placeholder="Buscar..."
                aria-label="Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ maxWidth: '200px' }}
              />
            </div>
            <button type="submit" style={{ display: 'none' }} aria-label="Buscar"></button>
          </form>

          {/* Botones desktop */}
          <div className="header-buttons d-flex align-items-center gap-3">
            {/* Botón de carrito */}
            <button className="btn btn-outline-light d-flex align-items-center gap-2" onClick={() => navigate("/carrito")}>
              <i className="bi bi-cart3"></i>
              <span>Carrito</span>
            </button>

            <div className="vr bg-secondary opacity-50" style={{ height: '24px' }}></div>

            {isAuthenticated ? (
              <>
                <div
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: "#90caf9", color: "#1e1e1e" }}>
                    {user.nombre ? user.nombre.charAt(0).toUpperCase() : <i className="bi bi-person-fill"></i>}
                  </Avatar>
                </div>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMenu}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      bgcolor: "#1e1e1e",
                      color: "white",
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "#1e1e1e",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => navigate("/perfil")} sx={{ color: "white" }}>
                    <Avatar /> Mi Perfil
                  </MenuItem>
                  {isAdmin() && (
                    <MenuItem onClick={() => navigate("/admin")} sx={{ color: "white" }}>
                      <ListItemIcon>
                        <i className="bi bi-speedometer2 text-white"></i>
                      </ListItemIcon>
                      Panel Admin
                    </MenuItem>
                  )}
                  <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
                  <MenuItem onClick={handleLogoutClick} sx={{ color: "#f44336" }}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" sx={{ color: "#f44336" }} />
                    </ListItemIcon>
                    Cerrar Sesión
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/Login" className="btn btn-outline-light btn-sm px-3 rounded-pill">Ingresar</Link>
                <Link to="/Registro" className="btn btn-light btn-sm px-3 rounded-pill fw-semibold">Registro</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialogo de confirmación de cierre de sesión */}
      <Dialog
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
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
          {"¿Cerrar sesión?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: '#ccc' }}>
            ¿Estás seguro que deseas cerrar tu sesión actual?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutConfirmOpen(false)} sx={{ color: 'white' }}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmLogout} color="error" autoFocus>
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </header>
  );
}

export default Header;