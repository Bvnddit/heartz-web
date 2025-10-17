import { Link } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";

function Admin() {
  return (
    <div>
      <HeaderAdmin />
      <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)' }}>
        <div className="row">
          <div className="col-md-2">
            <BarraLateralAdmin />
          </div>
          <div className="col-md-10 p-4">
            <h2 style={{ color: 'white' }}>Bienvenido, Administrador</h2>
            <p style={{ color: 'white' }}>Aquí puedes gestionar tu tienda y ver estadísticas rápidas.</p>
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="card text-center">
                  <div className="card-body" style={{ backgroundColor: '#1c1c1c' }}>
                    <h5 className="card-title" style={{ color: 'white' }}>Usuarios Activos</h5>
                    <p className="card-text fs-3" style={{ color: 'white' }}>120</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center">
                  <div className="card-body" style={{ backgroundColor: '#1c1c1c' }}>
                    <h5 className="card-title" style={{ color: 'white' }}>Productos</h5>
                    <p className="card-text fs-3" style={{ color: 'white' }}>58</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center">
                  <div className="card-body" style={{ backgroundColor: '#1c1c1c' }}>
                    <h5 className="card-title" style={{ color: 'white' }}>Pedidos</h5>
                    <p className="card-text fs-3" style={{ color: 'white' }}>23</p>
                  </div>
                </div>
              </div>
            </div>

            <h4 style={{ color: 'white' }}>Últimos pedidos</h4>
            <table style={{ backgroundColor: '#1c1c1c', color: 'white', width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ borderBottom: '2px solid #333' }}>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <td>001</td>
                  <td>Juan Pérez</td>
                  <td>Saturday Night Wrist - Deftones (Vinilo)</td>
                  <td>12-09-2025</td>
                  <td><span className="badge bg-success">Completado</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <td>002</td>
                  <td>Cristian Grey</td>
                  <td>Imaginal Disk - Magdanela Bay (Vinilo)</td>
                  <td>12-09-2025</td>
                  <td><span className="badge bg-warning">Pendiente</span></td>
                </tr>
                {/* Agrega más filas con el mismo estilo si es necesario */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
