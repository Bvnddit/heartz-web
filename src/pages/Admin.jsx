import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import BarraLateralAdmin from "../components/BarraLateralAdmin";
import { getAllVinilos } from "../api/vinilos";
import { obtenerTodasLasVentas } from "../api/ventas";
import {
  AttachMoney as AttachMoneyIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  Star as StarIcon
} from "@mui/icons-material";

function Admin() {
  const [stats, setStats] = useState({
    totalStock: 0,
    totalVentas: 0,
    totalIngresos: 0,
    bestSeller: "N/A"
  });
  const [recentSales, setRecentSales] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vinilosRes, ventasRes] = await Promise.all([
          getAllVinilos(),
          obtenerTodasLasVentas()
        ]);

        const vinilos = vinilosRes.data || [];
        const ventasData = ventasRes.data.body || ventasRes.data || [];

        console.log("Ventas recibidas:", ventasData);
        console.log("Primera venta (ejemplo):", ventasData[0]);

        // Calcular Stock Total
        const totalStock = vinilos.reduce((acc, vinilo) => acc + (vinilo.stock || 0), 0);

        // Calcular Total Ventas e Ingresos
        const totalVentas = ventasData.length;
        const totalIngresos = ventasData.reduce((acc, venta) => acc + (venta.total || 0), 0);

        // Calcular Producto Más Vendido
        const productCount = {};
        ventasData.forEach(venta => {
          if (venta.detalles) {
            venta.detalles.forEach(detalle => {
              const titulo = detalle.vinilo ? detalle.vinilo.nombre : "Desconocido";
              productCount[titulo] = (productCount[titulo] || 0) + detalle.cantidad;
            });
          }
        });

        let bestSeller = "N/A";
        let maxCount = 0;
        Object.entries(productCount).forEach(([titulo, count]) => {
          if (count > maxCount) {
            maxCount = count;
            bestSeller = titulo;
          }
        });

        setStats({
          totalStock,
          totalVentas,
          totalIngresos,
          bestSeller
        });

        // Últimas 5 ventas
        const sortedVentas = [...ventasData].sort((a, b) => b.idVenta - a.idVenta).slice(0, 5);
        setRecentSales(sortedVentas);

        // Datos para el gráfico (simulado con datos reales si hubiera fecha, por ahora dummy mejorado o estático si no hay fecha)
        // Vamos a dejar los datos estáticos del gráfico pero con valores dinámicos si es posible, o dejarlos como ejemplo visual.
        // Para "moderno", dejaremos el gráfico como visualización de ejemplo.

      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Datos de ejemplo para el gráfico (mantenidos para visualización)
  const dataVentas = [
    { mes: "Ene", ventas: 30 }, { mes: "Feb", ventas: 45 }, { mes: "Mar", ventas: 28 },
    { mes: "Abr", ventas: 60 }, { mes: "May", ventas: 50 }, { mes: "Jun", ventas: 40 },
    { mes: "Jul", ventas: 55 }, { mes: "Ago", ventas: 35 }, { mes: "Sep", ventas: 65 },
    { mes: "Oct", ventas: 70 },
  ];

  return (
    <div>
      <HeaderAdmin />
      <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #1c1c1c, #2a1c3b)', minHeight: '100vh' }}>
        <div className="row">
          <div className="col-md-2 p-0">
            <BarraLateralAdmin />
          </div>

          <div className="col-md-10 p-4">
            <h2 className="text-white mb-4 fw-bold">Dashboard General</h2>

            {/* Stats Cards */}
            <div className="row mb-4 g-3">
              <div className="col-md-3">
                <div className="card text-white h-100 border-0 shadow-lg" style={{ background: "linear-gradient(45deg, #2196F3, #21CBF3)" }}>
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="card-title mb-1 text-white-50">Ingresos Totales</h6>
                      <h3 className="mb-0 fw-bold">${stats.totalIngresos.toLocaleString("es-CL")}</h3>
                    </div>
                    <AttachMoneyIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white h-100 border-0 shadow-lg" style={{ background: "linear-gradient(45deg, #FF9800, #FFC107)" }}>
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="card-title mb-1 text-white-50">Ventas Realizadas</h6>
                      <h3 className="mb-0 fw-bold">{stats.totalVentas}</h3>
                    </div>
                    <ShoppingCartIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white h-100 border-0 shadow-lg" style={{ background: "linear-gradient(45deg, #4CAF50, #8BC34A)" }}>
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="card-title mb-1 text-white-50">Stock Total</h6>
                      <h3 className="mb-0 fw-bold">{stats.totalStock}</h3>
                    </div>
                    <InventoryIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white h-100 border-0 shadow-lg" style={{ background: "linear-gradient(45deg, #E91E63, #FF4081)" }}>
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="card-title mb-1 text-white-50">Más Vendido</h6>
                      <h5 className="mb-0 fw-bold text-truncate" style={{ maxWidth: "150px" }} title={stats.bestSeller}>{stats.bestSeller}</h5>
                    </div>
                    <StarIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Últimos Pedidos */}
              <div className="col-lg-8 mb-4">
                <div className="card border-0 shadow-lg" style={{ backgroundColor: '#1e1e1e', color: 'white' }}>
                  <div className="card-header bg-transparent border-secondary d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Últimos Pedidos</h5>
                    <Link to="/admin-reportes" className="btn btn-sm btn-outline-light">Ver todos</Link>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-dark table-hover align-middle mb-0" style={{ backgroundColor: 'transparent' }}>
                        <thead>
                          <tr className="text-secondary">
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr><td colSpan="4" className="text-center py-3">Cargando...</td></tr>
                          ) : recentSales.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-3">No hay ventas recientes</td></tr>
                          ) : (
                            recentSales.map((venta) => (
                              <tr key={venta.idVenta}>
                                <td>#{venta.idVenta}</td>
                                <td>
                                  <div className="d-flex flex-column">
                                    <span>{venta.usuario ? venta.usuario.nombre : "Cliente"}</span>
                                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>{venta.usuario ? venta.usuario.correo : ""}</small>
                                  </div>
                                </td>
                                <td className="fw-bold text-success">${venta.total.toLocaleString("es-CL")}</td>
                                <td><span className="badge bg-success">Completado</span></td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfico Simple */}
              <div className="col-lg-4 mb-4">
                <div className="card border-0 shadow-lg h-100" style={{ backgroundColor: '#1e1e1e', color: 'white' }}>
                  <div className="card-header bg-transparent border-secondary">
                    <h5 className="mb-0">Tendencia de Ventas</h5>
                  </div>
                  <div className="card-body d-flex align-items-end justify-content-center gap-2" style={{ height: '300px' }}>
                    {dataVentas.map((item, index) => (
                      <div key={index} className="d-flex flex-column align-items-center flex-grow-1">
                        <div
                          className="w-100 rounded-top"
                          style={{
                            height: `${item.ventas * 2}px`,
                            backgroundColor: index % 2 === 0 ? '#90caf9' : '#42a5f5',
                            opacity: 0.8,
                            transition: 'height 0.5s ease'
                          }}
                        ></div>
                        <small className="text-muted mt-1" style={{ fontSize: '0.7rem' }}>{item.mes}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
