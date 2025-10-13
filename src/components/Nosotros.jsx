import "../styles/nosotros.css";

function SobreNosotros() {
  return (
    <section className="sobre-nosotros">
      
      {/* Hero Section */}
      <div className="nosotros-hero">
        <div className="contenedor">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-badge">Desde 2020</span>
              <h1>Construyendo el futuro con pasión y experiencia</h1>
              <p>
                Más de 5 años transformando sueños en realidad, creando espacios 
                que inspiran y perduran en el tiempo.
              </p>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number-nosotros">5+</div>
                <div className="stat-label-nosotros">Años de Experiencia</div>
              </div>
              <div className="stat-item">
                <div className="stat-number-nosotros">100+</div>
                <div className="stat-label-nosotros">Proyectos Completados</div>
              </div>
              <div className="stat-item">
                <div className="stat-number-nosotros">100%</div>
                <div className="stat-label-nosotros">Satisfacción del Cliente</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Valores Section */}
      <div className="valores-section">
        <div className="contenedor">
          <div className="valores-header">
            <h2>Nuestros Pilares Fundamentales</h2>
            <p>Los valores que nos definen y guían cada uno de nuestros proyectos</p>
          </div>

          <div className="valores-container">
            <div className="valor-card">
              <div className="valor-header">
                <div className="valor-icon-bg">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Confianza</h3>
              </div>
              <p>
                Construimos relaciones sólidas basadas en la transparencia y el compromiso 
                absoluto con la calidad y los plazos acordados.
              </p>
              <div className="valor-highlight">Transparencia total en cada proyecto</div>
            </div>

            <div className="valor-card active">
              <div className="valor-header">
                <div className="valor-icon-bg">
                  <i className="fas fa-bolt"></i>
                </div>
                <h3>Eficiencia</h3>
              </div>
              <p>
                Optimizamos cada proceso utilizando tecnología de vanguardia para 
                entregar resultados excepcionales en tiempo récord.
              </p>
              <div className="valor-highlight">Tecnología + Experiencia</div>
            </div>

            <div className="valor-card">
              <div className="valor-header">
                <div className="valor-icon-bg">
                  <i className="fas fa-seedling"></i>
                </div>
                <h3>Sostenibilidad</h3>
              </div>
              <p>
                Implementamos prácticas eco-responsables y materiales sustentables 
                para construir un futuro mejor para las próximas generaciones.
              </p>
              <div className="valor-highlight">Compromiso con el planeta</div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipo Section */}
      <div className="equipo-section">
        <div className="contenedor">
          <div className="equipo-grid">
            <div className="equipo-text">
              <h2>El Equipo Detrás de Cada Proyecto</h2>
              <p>
                Nuestro equipo multidisciplinario combina experiencia, creatividad y 
                pasión por la construcción. Desde arquitectos visionarios hasta 
                maestros especialistas, cada miembro aporta su expertise para 
                hacer realidad tus proyectos más ambiciosos.
              </p>
              
              <div className="equipo-features">
                <div className="feature-item">
                  <i className="fas fa-users"></i>
                  <span>Equipo multidisciplinario</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-graduation-cap"></i>
                  <span>Formación continua</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-handshake"></i>
                  <span>Compromiso total</span>
                </div>
              </div>

              <button className="btn-conocer-mas">
                Conocer Más Sobre Nosotros
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>

            <div className="equipo-visual">
              <div className="imagen-principal">
                <img src="/assets/img/equipo.jpeg" alt="Equipo Alvarez" />
                <div className="imagen-badge">
                  <span>+5 años</span>
                  <small>construyendo juntos</small>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default SobreNosotros;