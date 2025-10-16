import { Link } from "react-router-dom";
import radioheadImg from '../assets/img/default/Radiohead-Tour.webp';
import gamImg from '../assets/img/default/gam.jpg';

function Blog() {
  const posts = [
    {
      id: 1,
      titulo: "Radiohead anuncia su regreso a los escenarios luego de 7 años de ausencia",
      descripcion: "La última gira de Radiohead fue la llamada A Moon Shaped Pool, que inició en 2016 y finalizó en 2018 luego de eso la banda se tomó un descanso de 7 años que finalmente acabó. Radiohead acaba de anunciar nuevas fechas de conciertos en Europa para la temporada invernal, entre noviembre y diciembre del 2025.",
      img: radioheadImg,
      ruta: "/detalleBlog1",
    },
    {
      id: 2,
      titulo: "El Día del Vinilo regresa con todo en el GAM",
      descripcion: "Este 9 de agosto, el Centro Cultural Gabriela Mistral (GAM) será sede de la cuarta edición del Día del Vinilo en Chile. El evento —abierto y gratuito— reunirá a sellos, disquerías, coleccionistas y marcas como Selknam Records, Punto Musical, Sony Music, Universal y sellos independientes como Fisura y Aula Records. Habrá una feria de vinilos, lanzamientos exclusivos (como La Sangre en el Cuerpo de Los Tres y La Medicina de Los Tetas), escuchas comentadas por los propios artistas y firmas de discos: una celebración imperdible para los amantes del formato analógico.",
      img: gamImg,
      ruta: "/detalleBlog2",
    },
  ];

  return (
    <div className="container my-5">
      {posts.map(post => (
        <Link key={post.id} to={post.ruta} className="text-decoration-none">
          <div className="row mb-5 align-items-center bg-dark text-white p-3 rounded shadow-sm">
            <div className="col-md-5 text-center mb-3 mb-md-0">
              <img src={post.img} alt={post.titulo} className="img-fluid rounded" />
            </div>
            <div className="col-md-7">
              <h3>{post.titulo}</h3>
              <p className="mt-3">{post.descripcion}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Blog;
