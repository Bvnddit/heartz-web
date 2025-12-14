import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Album as AlbumIcon,
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Article as ArticleIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";

const drawerWidth = 240;

function BarraLateralAdmin() {
  const { isAdmin, logout } = useContext(AuthContext);
  const location = useLocation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogoutClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmLogout = () => {
    setConfirmOpen(false);
    logout();
  };

  const menuItems = [
    { text: "Panel", icon: <DashboardIcon />, path: "/admin" },
    ...(isAdmin() ? [{ text: "Usuarios", icon: <PeopleIcon />, path: "/admin-usuarios" }] : []),
    { text: "Vinilos", icon: <AlbumIcon />, path: "/admin-vinilos" },
    { text: "Blogs", icon: <ArticleIcon />, path: "/admin-blogs" },
    { text: "Reportes", icon: <AssessmentIcon />, path: "/admin-reportes" },
    { text: "Perfil", icon: <PersonIcon />, path: "/admin-perfil" },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e1e1e",
          color: "white",
          borderRight: "1px solid #333"
        },
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRight: "1px solid #333",
            position: "relative", // Important for layout
            height: "100vh"
          },
        }}
        open
      >
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
            ADMIN PANEL
          </Typography>
          <Typography variant="caption" sx={{ color: '#aaa' }}>
            Heartz Music
          </Typography>
        </Box>
        <Divider sx={{ borderColor: '#333' }} />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "rgba(144, 202, 249, 0.16)",
                    borderRight: "4px solid #90caf9",
                    "&:hover": {
                      backgroundColor: "rgba(144, 202, 249, 0.24)",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                  my: 0.5,
                  mx: 1,
                  borderRadius: 1
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? '#90caf9' : '#aaa' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 'bold' : 'medium',
                    color: location.pathname === item.path ? '#90caf9' : 'white'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider sx={{ borderColor: '#333' }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogoutClick} sx={{ "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.1)" } }}>
              <ListItemIcon sx={{ color: '#f44336' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" primaryTypographyProps={{ color: '#f44336' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Dialogo de confirmación de cierre de sesión */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
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
          <Button onClick={() => setConfirmOpen(false)} sx={{ color: 'white' }}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmLogout} color="error" autoFocus>
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BarraLateralAdmin;
