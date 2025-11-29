import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { obtenerVentasPorUsuario } from '../api/ventas';

const UsuarioPerfil = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [ventas, setVentas] = useState([]);
    const [loadingVentas, setLoadingVentas] = useState(false);
    const [mostrarVentas, setMostrarVentas] = useState(false);

    if (!user) {
        return (
            <div className="container mt-5 text-center text-light">
                <h2>No has iniciado sesión</h2>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/login')}>
                    Ir al Login
                </button>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleVerVentas = async () => {
        if (mostrarVentas) {
            setMostrarVentas(false);
            return;
        }

        setLoadingVentas(true);
        try {
            // Intentar obtener ID del usuario (ajustar según estructura real del objeto user)
            const userId = user.id || user.idUsuario || user.userId;
            if (!userId) {
                console.error("No se encontró el ID del usuario");
                return;
            }

            const response = await obtenerVentasPorUsuario(userId);
            // Ajustar según si el backend devuelve ResponseEntity completo o solo el body
            const data = response.data.body || response.data;
            setVentas(data);
            setMostrarVentas(true);
        } catch (error) {
            console.error("Error al obtener ventas:", error);
        } finally {
            setLoadingVentas(false);
        }
    };

    return (
        <div className="container-fluid" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)', paddingTop: '100px' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <div className="card bg-dark text-white shadow-lg border-0 rounded-4">
                            <div className="card-header bg-transparent border-bottom border-secondary p-4 text-center">
                                <div className="d-inline-block p-3 rounded-circle bg-primary bg-opacity-25 mb-3">
                                    <i className="bi bi-person-circle fs-1 text-primary"></i>
                                </div>
                                <h2 className="card-title mb-0">Mi Perfil</h2>
                            </div>
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-4">
                                            <label className="form-label text-white-50 small text-uppercase fw-bold">Nombre</label>
                                            <div className="fs-5 text-white">{user.nombre || 'Usuario'}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-4">
                                            <label className="form-label text-white-50 small text-uppercase fw-bold">Correo Electrónico</label>
                                            <div className="fs-5 text-white">{user.email || user.correo}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-white-50 small text-uppercase fw-bold">Rol</label>
                                    <div className="fs-5">
                                        <span className="badge bg-info text-dark">
                                            {user.rol && (typeof user.rol === 'string' ? user.rol : user.rol.nombre)}
                                        </span>
                                    </div>
                                </div>

                                <hr className="border-secondary my-4" />

                                <div className="d-grid gap-2 mb-4">
                                    <button
                                        onClick={handleVerVentas}
                                        className="btn btn-outline-light btn-lg"
                                        disabled={loadingVentas}
                                    >
                                        {loadingVentas ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Cargando...
                                            </>
                                        ) : (
                                            <>
                                                <i className={`bi ${mostrarVentas ? 'bi-eye-slash' : 'bi-bag-check'} me-2`}></i>
                                                {mostrarVentas ? 'Ocultar Mis Compras' : 'Ver Mis Compras'}
                                            </>
                                        )}
                                    </button>
                                </div>

                                {mostrarVentas && (
                                    <div className="animate__animated animate__fadeIn">
                                        <h4 className="mb-3">Historial de Compras</h4>
                                        {ventas.length === 0 ? (
                                            <div className="alert alert-info">No has realizado ninguna compra aún.</div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-dark table-hover align-middle">
                                                    <thead>
                                                        <tr>
                                                            <th>Fecha</th>
                                                            <th>Dirección</th>
                                                            <th>Total</th>
                                                            <th>Detalles</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {ventas.map((venta) => (
                                                            <tr key={venta.idVenta}>
                                                                <td>{new Date(venta.fecha).toLocaleDateString()} {new Date(venta.fecha).toLocaleTimeString()}</td>
                                                                <td>
                                                                    <small>{venta.direccion}, {venta.comuna}</small>
                                                                </td>
                                                                <td className="fw-bold text-success">
                                                                    ${venta.total.toLocaleString('es-CL')}
                                                                </td>
                                                                <td>
                                                                    <ul className="list-unstyled mb-0 small">
                                                                        {venta.detalles.map((detalle, idx) => (
                                                                            <li key={idx}>
                                                                                {detalle.cantidad}x {detalle.vinilo?.nombre || 'Producto'}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="d-grid gap-2 mt-5">
                                    <button onClick={handleLogout} className="btn btn-danger btn-lg">
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsuarioPerfil;
