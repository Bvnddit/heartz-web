import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Cargando...</div>; // O un spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.rol)) {
        // Si el usuario no tiene el rol permitido, redirigir a home o a una página de error
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
