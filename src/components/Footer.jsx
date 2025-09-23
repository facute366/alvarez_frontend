import "../styles/footer.css";

export default function Footer() {
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

      {/* Contenido */}
      <div className="footer-split contenedor">
        {/* Logo */}
        <a href="/" className="logo_footer" aria-label="Inicio">
          <img id="logo_footer" src="/assets/img/logo_horizontal.png" alt="Alvarez" />
        </a>

        {/* Grilla de secciones */}
        <div className="footer-container">
          {/* Datos de la empresa */}
          <div id="agencia-info" className="footer-section">
            <h3>Alvarez</h3>
            <p>
              <i className="fas fa-map-marker-alt" /> Andres Ratti 200, Rio Segundo
            </p>
            <p>
              <i className="fas fa-phone-alt" /> <strong>Contacto:</strong> 3572 445578
            </p>
            <p>
              <i className="fas fa-envelope" /> alvarezconstrucciones04@gmail.com
            </p>
          </div>

          {/* Secciones */}
          <div className="footer-section">
            <h3>Secciones</h3>
            <a href="/proyectos"><p><i className="fas fa-th-large" /> Proyectos</p></a>
            <a href="#sobre-nosotros"><p><i className="fas fa-users" /> Nosotros</p></a>
            <a href="#contacto"><p><i className="fas fa-envelope" /> Contacto</p></a>
          </div>

          {/* Redes */}
          <div className="footer-section">
            <h3>Seguinos en las redes</h3>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/alvarezconstruccionenseco/?hl=es"
                target="_blank" rel="noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram fa-2x" />
              </a>

              <a
                href="https://wa.me/5493572000000"
                id="footerWpp"
                target="_blank" rel="noreferrer"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp fa-2x" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Derechos */}
      <div className="derechos">
        <p>© 2025 ALVAREZ construcción en seco. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
