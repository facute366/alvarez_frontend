import "../styles/servicios.css";

function Servicios() {
  return (
    <section className="servicios">
      
      {/* Hero Parallax Section */}
      <div className="parallax-hero">
        <div className="parallax-content">
          <h2>¿QUÉ HACEMOS?</h2>
          <div className="servicios-lista">
            <ul>
              <li>• Construcción de casas en seco</li>
              <li>• Ampliaciones y remodelaciones</li>
              <li>• Locales comerciales y oficinas</li>
              <li>• Revestimientos, cielorrasos y tabiques</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Servicios Grid */}
      <div className="servicios-grid-section">
        <div className="contenedor">
          <h3>Nuestros Proyectos</h3>
          
          <div className="servicios-grid">
            
            {/* Servicio 1 */}
            <div className="servicio-card">
              <div className="servicio-imagen">
                <img src="/path/to/casas-seco.jpg" alt="Construcción de casas en seco" />
                <div className="imagen-overlay"></div>
              </div>
              <div className="servicio-info">
                <h4>Construcción de Casas en Seco</h4>
                <p>Sistema constructivo moderno, rápido y sustentable. Ideal para construcciones residenciales.</p>
                <button className="btn-whatsapp" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Construcción de Casas en Seco', '_blank')}>
                  <i className="fab fa-whatsapp"></i>
                  Consultar
                </button>
              </div>
            </div>

            {/* Servicio 2 */}
            <div className="servicio-card">
              <div className="servicio-imagen">
                <img src="/path/to/ampliaciones.jpg" alt="Ampliaciones y remodelaciones" />
                <div className="imagen-overlay"></div>
              </div>
              <div className="servicio-info">
                <h4>Ampliaciones y Remodelaciones</h4>
                <p>Transformamos y ampliamos espacios existentes con diseños funcionales y modernos.</p>
                <button className="btn-whatsapp" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Ampliaciones y Remodelaciones', '_blank')}>
                  <i className="fab fa-whatsapp"></i>
                  Consultar
                </button>
              </div>
            </div>

            {/* Servicio 3 */}
            <div className="servicio-card">
              <div className="servicio-imagen">
                <img src="/path/to/locales.jpg" alt="Locales comerciales" />
                <div className="imagen-overlay"></div>
              </div>
              <div className="servicio-info">
                <h4>Locales Comerciales y Oficinas</h4>
                <p>Espacios comerciales diseñados para maximizar la funcionalidad y atraer clientes.</p>
                <button className="btn-whatsapp" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Locales Comerciales', '_blank')}>
                  <i className="fab fa-whatsapp"></i>
                  Consultar
                </button>
              </div>
            </div>

            {/* Servicio 4 */}
            <div className="servicio-card">
              <div className="servicio-imagen">
                <img src="/path/to/revestimientos.jpg" alt="Revestimientos y cielorrasos" />
                <div className="imagen-overlay"></div>
              </div>
              <div className="servicio-info">
                <h4>Revestimientos, Cielorrasos y Tabiques</h4>
                <p>Terminaciones de alta calidad que dan el toque final perfecto a cualquier ambiente.</p>
                <button className="btn-whatsapp" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Revestimientos', '_blank')}>
                  <i className="fab fa-whatsapp"></i>
                  Consultar
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Servicios;