import "../styles/footer.css";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const hideFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/carrusel-admin");

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
                  src="/assets/img/logo_horizontal-removebg.png"
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
              </div>
            </div>

            {/* Servicios */}
            <div className="footer-section">
              <h3>Servicios</h3>
              <ul className="footer-links">
                <li><a href="#servicios">Construcción en Seco</a></li>
                <li><a href="#servicios">Ampliaciones</a></li>
                <li><a href="#servicios">Locales Comerciales</a></li>
                <li><a href="#servicios">Revestimientos</a></li>
              </ul>
            </div>

            {/* Enlaces Rápidos */}
            <div className="footer-section">
              <h3>Enlaces</h3>
              <ul className="footer-links">
                <li><a href="/proyectos">Proyectos</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#beneficios">Beneficios</a></li>
                <li><a href="#contacto">Contacto</a></li>
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
                    <span>+54 3572 445578</span>
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
            <div className="footer-bottom-links">
              <a href="#privacidad">Política de Privacidad</a>
              <span className="separator">|</span>
              <a href="#terminos">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
