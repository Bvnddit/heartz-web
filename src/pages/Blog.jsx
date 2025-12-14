import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../api/blogs";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setPosts(response.data);
    } catch (err) {
      console.error("Error al cargar los blogs:", err);
      setError("No se pudieron cargar los blogs.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 display-4 fw-bold gradient-text">Nuestras Últimas Noticias</h2>

      {posts.length === 0 ? (
        <div className="text-center">
          <p className="fs-5 text-muted">No hay blogs disponibles en este momento.</p>
        </div>
      ) : (
        <div className="row g-4">
          {posts.map(post => (
            <div key={post.id} className="col-12">
              <Link to={`/blog/${post.id}`} className="text-decoration-none text-reset">
                <div className="card h-100 border-0 shadow-sm overflow-hidden hover-card bg-dark text-white">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-5 position-relative overflow-hidden" style={{ minHeight: '300px' }}>
                      <img
                        src={post.img || 'https://via.placeholder.com/600x400?text=No+Image'}
                        alt={post.titulo}
                        className="img-fluid w-100 h-100 object-fit-cover position-absolute top-0 start-0 zoom-effect"
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body p-4 p-lg-5">
                        <small className="text-primary fw-bold text-uppercase mb-2 d-block">Noticias</small>
                        <h3 className="card-title fw-bold mb-3">{post.titulo}</h3>
                        <p className="card-text text-white-50 fs-5 d-none d-md-block" style={{
                          display: '-webkit-box',
                          WebkitLineClamp: '3',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {post.descripcion}
                        </p>
                        <div className="mt-4">
                          <span className="btn btn-outline-light rounded-pill px-4">Leer más</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
