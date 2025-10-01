import { useEffect, useRef, useState } from 'react';
import '../styles/CarruselAdmin.css';

const API = 'https://alvarez-back.vercel.app';

export default function CarruselPublic() {
  const [urls, setUrls] = useState([]);
  const carouselRef = useRef(null);

  // Traer URLs del carrusel
  const fetchCarrusel = async () => {
    try {
      const res = await fetch(`${API}/carrusel/urls`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data && data.urls) || [];
      setUrls(list);
    } catch (err) {
      console.error('Error al traer carrusel:', err);
      setUrls([]);
    }
  };

  // Cargar imágenes al montar
  useEffect(() => {
    fetchCarrusel();
  }, []);

  // Inicializar el carousel de Bootstrap
  useEffect(() => {
    if (!window.bootstrap || !carouselRef.current) return;
    // eslint-disable-next-line no-new
    new window.bootstrap.Carousel(carouselRef.current, {
      interval: 3000,
      ride: 'carousel'
    });
  }, [urls]);

  return (
    <div
      id="carouselPublic"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      ref={carouselRef}
      style={{ width: '100%' }}
    >
      <div className="carousel-inner">
        {(!urls || urls.length === 0) ? (
          <div className="carousel-item active">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 240,
                background: '#f5f5f5'
              }}
            >
              Sin imágenes de carrusel
            </div>
          </div>
        ) : (
          urls.map((url, i) => (
            <div key={url + i} className={`carousel-item${i === 0 ? ' active' : ''}`}>
              <img
                src={url}
                className="d-block w-100"
                alt={`Slide ${i + 1}`}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          ))
        )}
      </div>

      {/* Controles */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselPublic" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselPublic" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

