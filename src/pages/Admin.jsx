import { Link } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";

function Admin() {
  // Datos de ejemplo para los últimos pedidos
  const pedidos = [
    { id: "001", cliente: "Juan Pérez", producto: "Saturday Night Wrist - Deftones", fecha: "12-09-2025", estado: "Completado" },
    { id: "002", cliente: "Ana Torres", producto: "Imaginal Disk - Magdanela Bay", fecha: "12-09-2025", estado: "Pendiente" },
    { id: "003", cliente: "Luis Fernández", producto: "The Dark Side of the Moon - Pink Floyd", fecha: "11-09-2025", estado: "Completado" },
  ];

  // Datos de ejemplo para el gráfico de ventas de enero a octubre
  const dataVentas = [
    { mes: "Enero", ventas: 30 },
    { mes: "Febrero", ventas: 45 },
    { mes: "Marzo", ventas: 28 },
    { mes: "Abril", ventas: 60 },
    { mes: "Mayo", ventas: 50 },
    { mes: "Junio", ventas: 40 },
    { mes: "Julio", ventas: 55 },
    { mes: "Agosto", ventas: 35 },
    { mes: "Septiembre", ventas: 65 },
    { mes: "Octubre", ventas: 70 },
  ];

  return (
    <div>
      {/* Header */}
      <HeaderAdmin />

      <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)', minHeight: '100vh' }}>
        <div className="row">
          {/* Barra lateral */}
          <div className="col-md-2">
            <BarraLateralAdmin />
          </div>

          {/* Contenido principal */}
          <div className="col-md-10 p-4">
            <h2 style={{ color: 'white' }}>Bienvenido, Administrador</h2>
            <p style={{ color: 'white' }}>Aquí puedes gestionar tu tienda y ver estadísticas rápidas.</p>

            {/* Tarjetas */}
            <div className="row mb-4">
              {[
                { titulo: "Usuarios Activos", cantidad: 120 },
                { titulo: "Productos", cantidad: 58 },
                { titulo: "Pedidos", cantidad: 23 },
              ].map((card, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card text-center mb-3" style={{ backgroundColor: '#1c1c1c', color: 'white' }}>
                    <div className="card-body">
                      <h5 className="card-title">{card.titulo}</h5>
                      <p className="card-text fs-3">{card.cantidad}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabla últimos pedidos */}
            <h4 style={{ color: 'white' }}>Últimos pedidos</h4>
            <div className="table-responsive mb-4">
              <table className="table table-dark table-striped align-middle text-center rounded-4 overflow-hidden">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.cliente}</td>
                      <td>{p.producto}</td>
                      <td>{p.fecha}</td>
                      <td>
                        <span className={`badge ${p.estado === "Completado" ? "bg-success" : "bg-warning"}`}>
                          {p.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Gráfico de ventas */}
            <div className="p-3" style={{ backgroundColor: '#1e1e1e', borderRadius: '10px' }}>
              <h5 style={{ color: 'white', marginBottom: '20px' }}>Ventas Mensuales</h5>
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '10px' }}>
                {dataVentas.map((item) => (
                  <div key={item.mes} style={{ textAlign: 'center', color: 'white', flex: 1 }}>
                    <div
                      style={{
                        height: `${item.ventas * 2.5}px`,
                        backgroundColor: '#8884d8',
                        borderRadius: '5px',
                        transition: '0.3s'
                      }}
                      title={`${item.ventas} ventas`}
                    />
                    <span style={{ display: 'block', marginTop: '5px', fontSize: '0.8rem' }}>{item.mes}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
