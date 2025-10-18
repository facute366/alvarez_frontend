import "../styles/footer.css";
import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from 'react-scroll';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const hideFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/carrusel-admin");

  // 👉 función para hacer scroll suave incluso si estás en otra ruta
  const goTo = (id) => {
    const opts = { smooth: true, duration: 600, offset: -80 };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scroller.scrollTo(id, opts), 100);
    } else {
      scroller.scrollTo(id, opts);
    }
  };

  // 👉 función para ir a proyectos page
  const goToProyectos = () => {
    navigate("/proyectos");
    setTimeout(() => {
      const element = document.getElementById("proyectos-page");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  if (hideFooter) return null; // No renderiza nada en esas rutas

  return (
    <footer className="footer">
      {/* Mapa */}
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d3396.0628576275444!2d-63.9042!3d-31.6595!3m2!1i1024!2i768!4f13.1!2m1!1zQW5kcsOpcyBSYXR0aSAyMDLigJMzMDAsIFg1MDIwIFLDrW8gU2VndW5kbywgQ8OzcmRvYmEsIEFyZ2VudGluYQ!5e0!3m2!1ses!2sar!4v1758647020294!5m2!1ses!2sar"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Alvarez"
        />
      </div>

      {/* Contenido Principal */}
      <div className="footer-main">
        <div className="contenedor">
          <div className="footer-grid">
            {/* Logo y Descripción */}
            <div className="footer-brand">
              <a href="/" className="footer-logo" aria-label="Inicio">
                <img
                  src="/assets/img/logo-sf-white.png"
                  alt="Alvarez Construcciones"
                />
              </a>
              <p className="footer-description">
                Especialistas en construcción en seco con más de 10 años de experiencia.
                Transformamos tus ideas en realidad con calidad y compromiso.
              </p>
              <div className="social-icons">
                <a
                  href="https://www.instagram.com/alvarezconstruccionenseco/?hl=es"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="social-link instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>

                <a
                  href="https://wa.me/5493572445578"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="social-link whatsapp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>

                <a
                  href="https://www.facebook.com/share/19poMGDR4v/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="social-link facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>

            </div>

            {/* Servicios */}
            <div className="footer-section">
              <h3>Servicios</h3>
              <ul className="footer-links">
                <li><button type="button" onClick={() => goTo('servicios')}>Construcción en Seco</button></li>
                <li><button type="button" onClick={() => goTo('servicios')}>Ampliaciones</button></li>
                <li><button type="button" onClick={() => goTo('servicios')}>Locales Comerciales</button></li>
                <li><button type="button" onClick={() => goTo('servicios')}>Revestimientos</button></li>
              </ul>
            </div>

            {/* Enlaces Rápidos */}
            <div className="footer-section">
              <h3>Enlaces</h3>
              <ul className="footer-links">
                <li><button type="button" onClick={goToProyectos}>Proyectos</button></li>
                <li><button type="button" onClick={() => goTo('sobre-nosotros')}>Nosotros</button></li>
                <li><button type="button" onClick={() => goTo('beneficios')}>Beneficios</button></li>
                <li><button type="button" onClick={() => goTo('contacto')}>Contacto</button></li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="footer-section">
              <h3>Contacto</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="contact-text">
                    <span>Andrés Ratti 200</span>
                    <span>Río Segundo, Córdoba</span>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone-alt"></i>
                  <div className="contact-text">
                    <span>+54 9 3572 445578</span>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div className="contact-text">
                    <span>alvarezconstrucciones04@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* CTA WhatsApp */}
              <a
                href="https://wa.me/5493572445578?text=Hola! Me interesa conocer más sobre sus servicios de construcción"
                target="_blank"
                rel="noreferrer"
                className="footer-cta"
              >
                <i className="fab fa-whatsapp"></i>
                Consulta Gratis
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="contenedor">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 Alvarez Construcciones en Seco. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
