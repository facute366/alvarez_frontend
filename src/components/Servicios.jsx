import "../styles/servicios.css";

function Servicios() {
  return (
    <section className="servicios">
      
      {/* Header Section */}
      <div className="servicios-header">
        <div className="contenedor">
          <div className="header-content">
            <span className="header-subtitle">Nuestros Servicios</span>
            <h2>Construimos tus sueños con excelencia y dedicación</h2>
            <p>Ofrecemos soluciones integrales en construcción, desde proyectos residenciales hasta comerciales, con la más alta calidad y compromiso.</p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="servicios-lista-section">
        <div className="contenedor">
          
      {/* Categoría 1 */}
      <div className="servicio-item">
        <div className="servicio-numero">01</div>
        <div className="servicio-contenido">
          <div className="servicio-texto">
            <h3>Cielorrasos</h3>
            <p>Instalamos cielorrasos de alta calidad en distintos materiales, logrando ambientes modernos, prolijos y con excelente aislamiento acústico y térmico.</p>
            <div className="servicio-features">
              <span className="feature">• Terminaciones prolijas</span>
              <span className="feature">• Aislamiento térmico/acústico</span>
              <span className="feature">• Múltiples materiales y estilos</span>
            </div>
          </div>
          <div className="servicio-imagen">
            <img src="/path/to/cielorrasos.jpg" alt="Cielorrasos" />
            <button className="btn-consultar" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Cielorrasos', '_blank')}>
              Consultar
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Categoría 2 */}
      <div className="servicio-item reverse">
        <div className="servicio-numero">02</div>
        <div className="servicio-contenido">
          <div className="servicio-imagen">
            <img src="/path/to/placares-muebles.jpg" alt="Placares y muebles a medida" />
            <button className="btn-consultar" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Placares y Muebles', '_blank')}>
              Consultar
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="servicio-texto">
            <h3>Placares y Muebles</h3>
            <p>Diseñamos y fabricamos placares y muebles a medida, optimizando tus espacios con soluciones funcionales, estéticas y duraderas.</p>
            <div className="servicio-features">
              <span className="feature">• Diseño a medida</span>
              <span className="feature">• Materiales resistentes</span>
              <span className="feature">• Instalación profesional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categoría 3 */}
      <div className="servicio-item">
        <div className="servicio-numero">03</div>
        <div className="servicio-contenido">
          <div className="servicio-texto">
            <h3>Revestimientos</h3>
            <p>Aplicamos revestimientos interiores y exteriores que transforman los espacios, brindando durabilidad, estética y protección frente al desgaste.</p>
            <div className="servicio-features">
              <span className="feature">• Amplia variedad de estilos</span>
              <span className="feature">• Materiales resistentes</span>
              <span className="feature">• Acabados modernos</span>
            </div>
          </div>
          <div className="servicio-imagen">
            <img src="/path/to/revestimientos.jpg" alt="Revestimientos" />
            <button className="btn-consultar" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Revestimientos', '_blank')}>
              Consultar
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Categoría 4 */}
      <div className="servicio-item reverse">
        <div className="servicio-numero">04</div>
        <div className="servicio-contenido">
          <div className="servicio-imagen">
            <img src="/path/to/oficinas-locales.jpg" alt="Oficinas y locales comerciales" />
            <button className="btn-consultar" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Oficinas y Locales Comerciales', '_blank')}>
              Consultar
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="servicio-texto">
            <h3>Oficinas y Locales Comerciales</h3>
            <p>Diseñamos y construimos espacios de trabajo y locales comerciales modernos, funcionales y adaptados a la identidad de cada marca.</p>
            <div className="servicio-features">
              <span className="feature">• Diseño funcional</span>
              <span className="feature">• Imagen corporativa</span>
              <span className="feature">• Entrega llave en mano</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categoría 5 */}
      <div className="servicio-item">
        <div className="servicio-numero">05</div>
        <div className="servicio-contenido">
          <div className="servicio-texto">
            <h3>Steel Framing</h3>
            <p>Construimos con sistema Steel Framing, una tecnología de perfilería galvanizada que garantiza estructuras sólidas, livianas y de rápida ejecución.</p>
            <div className="servicio-features">
              <span className="feature">• Alta resistencia estructural</span>
              <span className="feature">• Eficiencia energética</span>
              <span className="feature">• Construcción rápida y limpia</span>
            </div>
          </div>
          <div className="servicio-imagen">
            <img src="/path/to/steel-framing.jpg" alt="Steel Framing" />
            <button className="btn-consultar" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Steel Framing', '_blank')}>
              Consultar
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

        </div>
      </div>

      {/* CTA Section */}
      <div className="servicios-cta">
        <div className="contenedor">
          <div className="cta-content">
            <h3>¿Tienes un proyecto en mente?</h3>
            <p>Contáctanos y recibe una cotización personalizada sin compromiso</p>
            <button className="btn-cta" onClick={() => window.open('https://wa.me/1234567890?text=Hola! Me gustaría recibir información sobre sus servicios', '_blank')}>
              <i className="fab fa-whatsapp"></i>
              Solicitar Cotización
            </button>
          </div>
        </div>
      </div>
      
            {/* Cómo Trabajamos Section */}
      <div className="proceso-section">
        <div className="contenedor">
          <div className="proceso-header">
            <h2>¿Cómo Trabajamos?</h2>
            <p>Nuestro proceso está diseñado para garantizar resultados excepcionales en cada etapa del proyecto</p>
          </div>

          <div className="proceso-timeline">
            
            <div className="proceso-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Contacto Inicial</h3>
                <p>
                  Comenzamos con una conversación para entender tus necesidades, ideas y expectativas. 
                  Escuchamos cada detalle para crear una propuesta personalizada.
                </p>
                <div className="step-icon">
                  <i className="fas fa-comments"></i>
                </div>
              </div>
            </div>

            <div className="proceso-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Relevamiento y Presupuesto</h3>
                <p>
                  Visitamos el sitio para realizar un análisis técnico completo. Elaboramos un presupuesto 
                  detallado y transparente con tiempos de ejecución claros.
                </p>
                <div className="step-icon">
                  <i className="fas fa-clipboard-list"></i>
                </div>
              </div>
            </div>

            <div className="proceso-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Diseño y Planificación</h3>
                <p>
                  Desarrollamos planos detallados y cronogramas de trabajo. Definimos materiales, 
                  permisos y todos los aspectos técnicos antes de comenzar.
                </p>
                <div className="step-icon">
                  <i className="fas fa-drafting-compass"></i>
                </div>
              </div>
            </div>

            <div className="proceso-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Ejecución de la Obra</h3>
                <p>
                  Iniciamos la construcción con supervisión constante y comunicación regular. 
                  Mantenemos los más altos estándares de calidad en cada etapa.
                </p>
                <div className="step-icon">
                  <i className="fas fa-hard-hat"></i>
                </div>
              </div>
            </div>

            <div className="proceso-step last">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Entrega Final</h3>
                <p>
                  Realizamos una inspección final completa y entregamos tu proyecto terminado. 
                  Incluimos garantías y seguimiento post-entrega.
                </p>
                <div className="step-icon">
                  <i className="fas fa-key"></i>
                </div>
              </div>
            </div>

          </div>

          <div className="proceso-cta">
            <h3>¿Listo para comenzar tu proyecto?</h3>
            <button 
              className="btn-proceso" 
              onClick={() => window.open('https://wa.me/1234567890?text=Hola! Me gustaría conocer más sobre su proceso de trabajo', '_blank')}
            >
              Iniciar Mi Proyecto
              <i className="fas fa-play"></i>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Servicios;