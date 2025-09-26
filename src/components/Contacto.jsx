import { useState } from "react";
import "../styles/contacto.css";

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear mensaje para WhatsApp
    const mensaje = `Hola! Mi nombre es ${formData.nombre}.%0A%0ATeléfono: ${formData.telefono}%0AEmail: ${formData.email}%0A%0AMensaje: ${formData.mensaje}`;
    const whatsappURL = `https://wa.me/1234567890?text=${mensaje}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Limpiar formulario
    setFormData({
      nombre: '',
      telefono: '',
      email: '',
      mensaje: ''
    });
  };

  return (
    <>
      <section className="contacto">
        <div className="contenedor">
          <h2>Contactanos</h2>
          
          <div className="contacto-grid">
            
            {/* Formulario de Contacto */}
            <div className="formulario-section">
              <h3>Envíanos tu consulta</h3>
              <form onSubmit={handleSubmit} className="formulario-contacto">
                
                <div className="campo-grupo">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="campo-grupo">
                  <label htmlFor="telefono">Teléfono *</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    placeholder="Tu número de teléfono"
                  />
                </div>

                <div className="campo-grupo">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="campo-grupo">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-enviar">
                  <i className="fas fa-paper-plane"></i>
                  Enviar Consulta
                </button>
                
              </form>
            </div>

            {/* Información de Contacto */}
            <div className="info-contacto">
              <h3>Información de Contacto</h3>
              
              <div className="contacto-item">
                <div className="contacto-icono">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contacto-texto">
                  <h4>Dirección</h4>
                  <p>Av. Principal 1234<br />Ciudad, Provincia<br />Código Postal</p>
                </div>
              </div>

              <div className="contacto-item">
                <div className="contacto-icono">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contacto-texto">
                  <h4>Teléfono</h4>
                  <p>+54 11 1234-5678</p>
                </div>
              </div>

              <div className="contacto-item">
                <div className="contacto-icono">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contacto-texto">
                  <h4>Email</h4>
                  <p>info@alvarez.com</p>
                </div>
              </div>

              <div className="contacto-item">
                <div className="contacto-icono">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="contacto-texto">
                  <h4>Horarios</h4>
                  <p>Lun - Vie: 8:00 - 18:00<br />Sáb: 9:00 - 13:00</p>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="redes-sociales">
                <h4>Síguenos en:</h4>
                <div className="redes-iconos">
                  <a href="https://facebook.com/alvarez" target="_blank" rel="noopener noreferrer" className="red-social facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://instagram.com/alvarez" target="_blank" rel="noopener noreferrer" className="red-social instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="red-social whatsapp">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Botón WhatsApp Flotante */}
      <div className="whatsapp-flotante">
        <a href="https://wa.me/1234567890?text=Hola! Me gustaría hacer una consulta" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </>
  );
}

export default Contacto;