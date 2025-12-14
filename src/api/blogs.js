import api from "./api";

// ----------------- BLOGS -----------------

// GET todos los blogs
export const getAllBlogs = () => api.get("/blogs");

// GET blog por ID
export const getBlogById = (id) => api.get(`/blogs/${id}`);

// Crear blog (POST)
export const insertBlog = (blog) => api.post("/blogs", blog);

// Actualizar blog (PUT)
export const updateBlog = (id, blog) => api.put(`/blogs/${id}`, blog);

// Eliminar blog (DELETE)
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);
