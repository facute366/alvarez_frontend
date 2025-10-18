import { useState, useEffect } from 'react';
import '../styles/galeriaModal.css';

export default function GaleriaModal({ proyecto, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Bloquear scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !proyecto) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => 
      prev === proyecto.fotos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? proyecto.fotos.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>        
        
        <button className="btn-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </button>
        
        {/* Header del Modal */}
        <div className="modal-header">
          <div className="proyecto-info-header">
            <h2>{proyecto.titulo}</h2>
            <span className="categoria-pill">{proyecto.categoria.nombre}</span>
          </div>

        </div>        
        


        {/* Imagen Principal */}
        <div className="proyecto-imagenes-descripcion">
          <div className="imagen-principal-container">
            <img 
              src={proyecto.fotos[currentIndex]} 
              alt={`${proyecto.titulo} - Imagen ${currentIndex + 1}`}
              className="imagen-principal"
            />
            
            {/* Controles de navegación */}
            {proyecto.fotos.length > 1 && (
              <>
                <button className="nav-btn prev-btn" onClick={prevImage}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                <button className="nav-btn next-btn" onClick={nextImage}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </>
            )}

            {/* Contador de imágenes */}
            <div className="imagen-counter">
              {currentIndex + 1} / {proyecto.fotos.length}
            </div>
          
          {/* Thumbnails */}
          {proyecto.fotos.length > 1 && (
            <div className="thumbnails-container">
                {proyecto.fotos.map((foto, index) => (
                  <div 
                    key={index}
                    className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => goToImage(index)}
                  >
                    <img src={foto} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
            </div>
          )}
        </div>
            <div className="proyecto-descripcion">
              <p>{proyecto.descripcion}</p>
            </div>
        </div>


        {/* Footer con información */}
        <div className="modal-footer">
          
          <div className="modal-actions">
            <button 
              className="btn-whatsapp"
              onClick={() => window.open(`https://wa.me/5493572445578?text=Hola! Me interesa el proyecto: ${proyecto.titulo}`, '_blank')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.582z"/>
              </svg>
              Consultar por WhatsApp
            </button>
            
            <button className="btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}