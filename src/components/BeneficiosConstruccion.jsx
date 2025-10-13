import "../styles/beneficiosConstruccion.css";

function BeneficiosConstruccion() {
  return (
    <section className="beneficios-construccion">
      <div className="contenedor">
        
        {/* Header */}
        <div className="beneficios-header" id="beneficios">
          <span className="beneficios-badge">Ventajas Exclusivas</span>
          <h2>Beneficios de la Construcción en Seco</h2>
          <p>
            Descubre por qué la construcción en seco se ha convertido en la técnica preferida 
            para proyectos modernos y sostenibles
          </p>
        </div>

        {/* Beneficios Grid */}
        <div className="beneficios-grid">
          
          <div className="beneficio-item">
            <div className="beneficio-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <div className="beneficio-content">
              <h3>Rapidez en la Construcción</h3>
              <p>
                Reducimos los tiempos de construcción hasta un 50% comparado con métodos tradicionales. 
                Procesos optimizados que te permiten disfrutar tu proyecto antes.
              </p>
              <div className="beneficio-highlight">
                <i className="fas fa-clock"></i>
                <span>50% más rápido</span>
              </div>
            </div>
          </div>

          <div className="beneficio-item">
            <div className="beneficio-icon">
              <i className="fas fa-broom"></i>
            </div>
            <div className="beneficio-content">
              <h3>Limpieza y Menor Desperdicio</h3>
              <p>
                Obra limpia con mínima generación de escombros. Materiales prefabricados 
                que reducen desperdicios y mantienen el espacio de trabajo ordenado.
              </p>
              <div className="beneficio-highlight">
                <i className="fas fa-leaf"></i>
                <span>90% menos residuos</span>
              </div>
            </div>
          </div>

          <div className="beneficio-item">
            <div className="beneficio-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div className="beneficio-content">
              <h3>Excelente Aislación Térmica y Acústica</h3>
              <p>
                Superior confort habitacional con aislación térmica y acústica de última generación. 
                Mayor eficiencia energética y ambientes más confortables.
              </p>
              <div className="beneficio-highlight">
                <i className="fas fa-thermometer-half"></i>
                <span>40% más eficiente</span>
              </div>
            </div>
          </div>

          <div className="beneficio-item">
            <div className="beneficio-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="beneficio-content">
              <h3>Costos Competitivos</h3>
              <p>
                Inversión inteligente con excelente relación costo-beneficio. Menor tiempo de obra 
                se traduce en menores costos indirectos y mayor rentabilidad.
              </p>
              <div className="beneficio-highlight">
                <i className="fas fa-chart-line"></i>
                <span>Mejor ROI</span>
              </div>
            </div>
          </div>

        </div>

        {/* Comparación Section */}
        <div className="comparacion-section">
          <h3>Construcción en Seco vs. Tradicional</h3>
          
          <div className="comparacion-grid">
            <div className="comparacion-item">
              <div className="comparacion-header">
                <i className="fas fa-home"></i>
                <h4>Construcción en Seco</h4>
              </div>
              <div className="comparacion-list ventajas">
                <div className="comparacion-point">
                  <i className="fas fa-check"></i>
                  <span>3-6 meses de construcción</span>
                </div>
                <div className="comparacion-point">
                  <i className="fas fa-check"></i>
                  <span>Obra limpia y ordenada</span>
                </div>
                <div className="comparacion-point">
                  <i className="fas fa-check"></i>
                  <span>Menor consumo energético</span>
                </div>
                <div className="comparacion-point">
                  <i className="fas fa-check"></i>
                  <span>Flexibilidad en diseño</span>
                </div>
                <div className="comparacion-point">
                  <i className="fas fa-check"></i>
                  <span>Materiales sustentables</span>
                </div>
              </div>
            </div>

            <div className="vs-separator">
              <div className="vs-circle">VS</div>
            </div>

            <div className="comparacion-item">
              <div className="comparacion-header">
                <i className="fas fa-building"></i>
                <h4>Construcción Tradicional</h4>
              </div>
              <div className="comparacion-list desventajas">
                <div className="comparacion-point">
                  <i className="fas fa-times"></i>
                  <span>6-12 meses de construcción</span>
                </div>
                <div className="comparacion-point">
                  <i className="fas fa-times"></i>
                  <span>Mucho desperdicio y suciedad</span>
                </div>
                <div className="comparacion-point">
                  <i className="fas fa-times"></i>
                  <span>Mayor gasto energético</span>
                </div>
                <div className="comparacion-point">
                  <i className="fas fa-times"></i>
                  <span>Limitaciones estructurales</span>
                </div>
                <div className="comparacion-point">
                  <i className="fas fa-times"></i>
                  <span>Impacto ambiental mayor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="beneficios-cta">
          <div className="cta-content">
            <h3>¿Listo para construir con la mejor tecnología?</h3>
            <p>Solicita una cotización personalizada y descubre todas las ventajas</p>
            <button 
              className="btn-cotizar cotizar-principal"
              onClick={() => window.open('https://wa.me/1234567890?text=Hola! Me interesa conocer más sobre construcción en seco', '_blank')}
            >
              <i className="fab fa-whatsapp"></i>
              Solicitar Cotización
            </button>
          </div>
          
          <div className="cta-stats">
            <div className="cta-stat">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-text">
                <span className="stat-number">50%</span>
                <span className="stat-label">Más Rápido</span>
              </div>
            </div>
            <div className="cta-stat">
              <div className="stat-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <div className="stat-text">
                <span className="stat-number">90%</span>
                <span className="stat-label">Menos Residuos</span>
              </div>
            </div>
            <div className="cta-stat">
              <div className="stat-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-text">
                <span className="stat-number">100%</span>
                <span className="stat-label">Rentable</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default BeneficiosConstruccion;