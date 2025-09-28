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
          
          {/* Servicio 1 */}
          <div className="servicio-item">
            <div className="servicio-numero">01</div>
            <div className="servicio-contenido">
              <div className="servicio-texto">
                <h3>Construcción de Casas en Seco</h3>
                <p>Sistema constructivo innovador que permite construcciones más rápidas, eficientes y sustentables. Utilizamos materiales de primera calidad para garantizar durabilidad y confort.</p>
                <div className="servicio-features">
                  <span className="feature">• Construcción rápida</span>
                  <span className="feature">• Eco-friendly</span>
                  <span className="feature">• Térmica eficiente</span>
                </div>
              </div>
              <div className="servicio-imagen">
                <img src="/path/to/casas-seco.jpg" alt="Construcción de casas en seco" />
                <button className="btn-consultar" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Construcción de Casas en Seco', '_blank')}>
                  Consultar
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Servicio 2 */}
          <div className="servicio-item reverse">
            <div className="servicio-numero">02</div>
            <div className="servicio-contenido">
              <div className="servicio-imagen">
                <img src="/path/to/ampliaciones.jpg" alt="Ampliaciones y remodelaciones" />
                <button className="btn-consultar" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Ampliaciones y Remodelaciones', '_blank')}>
                  Consultar
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
              <div className="servicio-texto">
                <h3>Ampliaciones y Remodelaciones</h3>
                <p>Transformamos y expandimos espacios existentes adaptándolos a tus nuevas necesidades. Renovamos tu hogar o negocio con diseños modernos y funcionales.</p>
                <div className="servicio-features">
                  <span className="feature">• Diseño personalizado</span>
                  <span className="feature">• Optimización de espacios</span>
                  <span className="feature">• Modernización integral</span>
                </div>
              </div>
            </div>
          </div>

          {/* Servicio 3 */}
          <div className="servicio-item">
            <div className="servicio-numero">03</div>
            <div className="servicio-contenido">
              <div className="servicio-texto">
                <h3>Locales Comerciales y Oficinas</h3>
                <p>Creamos espacios comerciales que maximizan la productividad y atraen clientes. Diseños que reflejan la identidad de tu marca y optimizan la experiencia del usuario.</p>
                <div className="servicio-features">
                  <span className="feature">• Diseño comercial</span>
                  <span className="feature">• Funcionalidad optimizada</span>
                  <span className="feature">• Imagen corporativa</span>
                </div>
              </div>
              <div className="servicio-imagen">
                <img src="/path/to/locales.jpg" alt="Locales comerciales" />
                <button className="btn-consultar" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Locales Comerciales', '_blank')}>
                  Consultar
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Servicio 4 */}
          <div className="servicio-item reverse">
            <div className="servicio-numero">04</div>
            <div className="servicio-contenido">
              <div className="servicio-imagen">
                <img src="/path/to/revestimientos.jpg" alt="Revestimientos y cielorrasos" />
                <button className="btn-consultar" onClick={() => window.open('https://wa.me/1234567890?text=Consulta sobre Revestimientos', '_blank')}>
                  Consultar
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
              <div className="servicio-texto">
                <h3>Revestimientos, Cielorrasos y Tabiques</h3>
                <p>Terminaciones de alta calidad que dan el toque final perfecto a cualquier ambiente. Trabajamos con materiales premium para resultados excepcionales.</p>
                <div className="servicio-features">
                  <span className="feature">• Materiales premium</span>
                  <span className="feature">• Acabados perfectos</span>
                  <span className="feature">• Técnicas avanzadas</span>
                </div>
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