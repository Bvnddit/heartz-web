function Blog() {
  return (
    <div>
  <a href="detalle-blog-1.html">
    <table className="table w-100" style={{backgroundColor: '#272727'}}>
      <tbody><tr>
          <td style={{width: 500, backgroundColor: '#272727'}}>
            <img src="src\assets\img\default/Radiohead-Tour.webp" alt width="500px" />
          </td>
          <td style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: 250, backgroundColor: '#272727'}}>
            <h3 style={{paddingTop: 30}}>Radiohead anuncia su regreso a los escenarios luego de 7 años de ausencia</h3>
            <div style={{paddingTop: 70, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <p style={{textAlign: 'center', color:'white'}}>La última gira de Radiohead fue la llamada A Moon Shaped Pool, que inició en 2016 y finalizó en 2018 luego de eso la banda se tomó un descanso de 7 años que finalmente acabó.<br /><br />Radiohead acaba de anunciar nuevas fechas de conciertos en Europa para la temporada invernal, entre noviembre y diciembre del 2025.</p>
            </div>
          </td>
        </tr>
      </tbody></table>
  </a>
  <a href="detalle-blog-2.html">
    <table className="table w-100" style={{backgroundColor: '#272727'}}>
      <tbody><tr>
          <td style={{width: 500, backgroundColor: '#272727'}}>
            <img src="src\assets\img\default/gam.jpg" alt width="500px" />
          </td>
          <td style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: 250, backgroundColor: '#272727'}}>
            <h3 style={{paddingTop: 30}}>El Día del Vinilo regresa con todo en el GAM</h3>
            <div style={{paddingTop: 70, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <p style={{textAlign: 'center', color:'white'}}>Este 9 de agosto, el Centro Cultural Gabriela Mistral (GAM) será sede de la cuarta edición del Día del Vinilo en Chile. El evento —abierto y gratuito— reunirá a sellos, disquerías, coleccionistas y marcas como Selknam Records, Punto Musical, Sony Music, Universal y sellos independientes como Fisura y Aula Records. Habrá una feria de vinilos, lanzamientos exclusivos (como La Sangre en el Cuerpo de Los Tres y La Medicina de Los Tetas), escuchas comentadas por los propios artistas y firmas de discos: una celebración imperdible para los amantes del formato analógico.</p>
            </div>
          </td>
        </tr>
      </tbody></table>
  </a>
</div>

  );
}

export default Blog;
