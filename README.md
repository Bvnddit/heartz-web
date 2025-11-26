# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Autenticación

El proyecto incluye un sistema de autenticación integrado con la API backend.

### API de Login

- **Endpoint**: `/auth/login`
- **Método**: POST
- **Body**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "password": "contraseña"
  }
  ```
- **Respuesta**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "rol": "ADMIN",
    "token": "jwt_token_aqui"
  }
  ```

### Uso del Contexto de Autenticación

```jsx
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function MiComponente() {
  const { isAuthenticated, user, login, logout, hasRole, isAdmin } = useContext(AuthContext);

  // Verificar si está autenticado
  if (!isAuthenticated) {
    return <p>Debes iniciar sesión</p>;
  }

  // Acceder a datos del usuario
  console.log(user.email); // Email del usuario
  console.log(user.rol);   // Rol del usuario (ej: "ADMIN")

  // Verificar roles
  if (isAdmin()) {
    return <p>Contenido solo para administradores</p>;
  }

  // Cerrar sesión
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <p>Bienvenido, {user.email}</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}
```

### Funciones del AuthContext

- `isAuthenticated`: Boolean que indica si hay un usuario logueado
- `user`: Objeto con datos del usuario (`email`, `rol`, `token`)
- `login(userData)`: Función para iniciar sesión (recibe el response de la API)
- `logout()`: Función para cerrar sesión
- `hasRole(role)`: Verifica si el usuario tiene un rol específico
- `isAdmin()`: Verifica si el usuario es administrador

### Variables de Entorno

Asegúrate de configurar la variable de entorno `VITE_API_URL` en tu archivo `.env`:

```
VITE_API_URL=http://localhost:8080/api
```
