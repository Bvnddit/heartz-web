import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "../api/blogs";
import WaveBackground from "../components/WaveBackground";

import { Slide } from "@mui/material";

function DetalleBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await getBlogById(id);
                setBlog(response.data);
            } catch (err) {
                console.error("Error al cargar el blog:", err);
                setError("No se pudo cargar el blog.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="container my-5 text-center">
                <div className="alert alert-danger">{error || "Blog no encontrado"}</div>
                <Link to="/blog" className="btn btn-primary mt-3">Volver a Noticias</Link>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', paddingBottom: '100px' }}>
            <WaveBackground />
            <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={1000}>
                <div className="container my-5" style={{ position: 'relative', zIndex: 1 }}>
                    <Link to="/blog" className="btn btn-outline-light mb-4 text-white border-white">
                        &larr; Volver a Noticias
                    </Link>

                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <article className="blog-post">
                                <h1 className="display-4 fw-bold mb-4 text-white">{blog.titulo}</h1>

                                <div className="mb-4 rounded overflow-hidden shadow-lg" style={{ maxHeight: '500px' }}>
                                    <img
                                        src={blog.img || 'https://via.placeholder.com/1200x600?text=No+Image'}
                                        alt={blog.titulo}
                                        className="img-fluid w-100 object-fit-cover"
                                    />
                                </div>

                                <div className="blog-content fs-5 lh-lg">
                                    {/*  Render description properly preserving line breaks if needed */}
                                    <p className="text-white" style={{ whiteSpace: 'pre-line' }}>{blog.descripcion}</p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </Slide>
        </div>
    );
}

export default DetalleBlog;
