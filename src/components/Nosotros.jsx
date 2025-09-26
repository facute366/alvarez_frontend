import "../styles/nosotros.css";

function SobreNosotros() {
  return (
    <section className="sobre-nosotros">
      <div className="contenedor">
        
        {/* Historia de la empresa */}
        <div className="historia-seccion">
          <h2>Nuestra Historia</h2>
          <p>
            Desde nuestros inicios en 1995, Alvarez ha sido sinónimo de excelencia 
            en el sector de la construcción. Lo que comenzó como un pequeño proyecto 
            familiar, ha crecido hasta convertirse en una empresa líder que ha 
            transformado paisajes urbanos y rurales a lo largo del país. Con más de 
            25 años de experiencia, hemos construido no solo estructuras, sino también 
            relaciones duraderas basadas en la confianza y la calidad.
          </p>
        </div>

        {/* Misión y Valores */}
        <div className="mision-valores">
          <h2>Nuestra Misión y Valores</h2>
          
          <div className="valores-grid">
            <div className="valor-item">
              <div className="valor-icono">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Confianza</h3>
              <p>
                Construimos relaciones sólidas basadas en la transparencia, 
                honestidad y compromiso con cada uno de nuestros clientes.
              </p>
            </div>

            <div className="valor-item">
              <div className="valor-icono">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Rapidez</h3>
              <p>
                Optimizamos nuestros procesos para entregar proyectos en tiempo 
                récord sin comprometer la calidad de nuestro trabajo.
              </p>
            </div>

            <div className="valor-item">
              <div className="valor-icono">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Sustentabilidad</h3>
              <p>
                Implementamos prácticas eco-amigables y materiales sostenibles 
                para cuidar el medio ambiente en cada proyecto.
              </p>
            </div>
          </div>
        </div>

        {/* Equipo/Obra */}
        <div className="equipo-seccion">
          <h2>Nuestro Equipo</h2>
          <div className="imagen-placeholder">
            {/* Aquí puedes poner tu imagen del equipo o de una obra */}
            <img src="/path/to/your/image.jpg" alt="Equipo Alvarez" />
            <div className="imagen-overlay">
              <p>Foto del equipo - Reemplazar con imagen real</p>
            </div>
          </div>
          <p className="descripcion-equipo">
            Nuestro equipo está formado por profesionales altamente capacitados 
            que comparten la pasión por la construcción de calidad. Cada miembro 
            aporta su experiencia y dedicación para hacer realidad los proyectos 
            más ambiciosos de nuestros clientes.
          </p>
        </div>

      </div>
    </section>
  );
}

export default SobreNosotros;