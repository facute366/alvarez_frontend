import { useState, useEffect } from "react";
import "../styles/proyectosRealizados.css";
import { Link } from 'react-router-dom';

function ProyectosRealizados() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  // Simulación de datos (reemplazar con API call)
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const proyectosEjemplo = [
        {
          id: 1,
          titulo: "Casa Moderna en Nordelta",
          descripcion: "Construcción integral de vivienda unifamiliar con diseño contemporáneo y acabados premium.",
          categoria: { id: 1, nombre: "Residencial" },
          fotos: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
          ],
          es_oculto: false
        },
        {
          id: 2,
          titulo: "Oficinas Corporativas Centro",
          descripcion: "Remodelación completa de espacios de trabajo con diseño funcional y tecnología integrada.",
          categoria: { id: 2, nombre: "Comercial" },
          fotos: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"
          ],
          es_oculto: false
        },
        {
          id: 3,
          titulo: "Ampliación Familiar",
          descripcion: "Expansión de vivienda existente con nueva suite principal y área de entretenimiento.",
          categoria: { id: 3, nombre: "Remodelaciones" },
          fotos: [
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"
          ],
          es_oculto: false
        },
        {
          id: 4,
          titulo: "Restaurante Gourmet",
          descripcion: "Construcción y diseño interior de restaurante de alta cocina con cocina a la vista.",
          categoria: { id: 2, nombre: "Comercial" },
          fotos: [
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
          ],
          es_oculto: false
        }
      ];
      setProyectos(proyectosEjemplo);
      setLoading(false);
    }, 1000);
  }, []);

  const categorias = ['todos', 'Residencial', 'Comercial', 'Remodelaciones'];

  const proyectosFiltrados = categoriaActiva === 'todos' 
    ? proyectos 
    : proyectos.filter(proyecto => proyecto.categoria.nombre === categoriaActiva);

  const proyectosRecientes = proyectosFiltrados.slice(0, 6); // Mostrar solo los últimos 6

  if (loading) {
    return (
      <section className="proyectos-realizados">
        <div className="contenedor">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando proyectos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="proyectos-realizados">
      <div className="contenedor">
        
        {/* Header */}
        <div className="proyectos-header">
          <span className="proyectos-badge">Portfolio</span>
          <h2>Proyectos Realizados</h2>
          <p className="proyectos-estadistica">
            Más de <strong>500 proyectos</strong> concretados con clientes satisfechos
          </p>
        </div>

        {/* Filtros de Categorías */}
        <div className="categorias-filtros">
          {categorias.map(categoria => (
            <button
              key={categoria}
              className={`filtro-btn ${categoriaActiva === categoria ? 'active' : ''}`}
              onClick={() => setCategoriaActiva(categoria)}
            >
              {categoria === 'todos' ? 'Todos los Proyectos' : categoria}
            </button>
          ))}
        </div>

        {/* Grid de Proyectos */}
        <div className="proyectos-grid">
          {proyectosRecientes.map(proyecto => (
            <div key={proyecto.id} className="proyecto-card">
              <div className="proyecto-imagen">
                <img src={proyecto.fotos[0]} alt={proyecto.titulo} />
                <div className="imagen-overlay">
                  <button className="btn-ver-mas">
                    <i className="fas fa-search-plus"></i>
                  </button>
                  <div className="proyecto-categoria">
                    {proyecto.categoria.nombre}
                  </div>
                </div>
              </div>
              
              <div className="proyecto-info">
                <h3>{proyecto.titulo}</h3>
                <p>{proyecto.descripcion}</p>
                
                <div className="proyecto-footer">
                  <div className="proyecto-fotos-count">
                    <i className="fas fa-images"></i>
                    <span>{proyecto.fotos.length} fotos</span>
                  </div>
                  <button className="btn-detalle">
                    Ver Detalles
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para ver más proyectos */}
        <div className="proyectos-cta">
          <div className="cta-content">
            <h3>¿Quieres ver todos nuestros proyectos?</h3>
            <p>Explora nuestra galería completa con más de 500 obras realizadas</p>
            <Link to="/proyectos" className="btn-ver-todos">
                Ver Más Proyectos
                <i className="fas fa-external-link-alt"></i>
            </Link>
          </div>
          
          <div className="cta-stats">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Proyectos</div>
            </div>
            <div className="stat">
              <div className="stat-number">25+</div>
              <div className="stat-label">Años</div>
            </div>
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Satisfacción</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ProyectosRealizados;