import { useState, useEffect } from "react";
import "../styles/proyectosRealizados.css";
import { Link } from 'react-router-dom';
import GaleriaModal from "./GaleriaModal"; // Agregar import del modal

function ProyectosRealizados() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  
  // Estados para el modal
  const [modalOpen, setModalOpen] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  // Simulación de datos (reemplazar con API call)
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const proyectosEjemplo = [
        {
          id: 1,
          titulo: "Casa Moderna en Nordelta",
          descripcion: "Construcción integral de vivienda unifamiliar con diseño contemporáneo y acabados premium. Proyecto completo desde cimientos hasta terminaciones de lujo.",
          categoria: { id: 1, nombre: "Residencial" },
          fotos: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
          ],
          es_oculto: false
        },
        {
          id: 2,
          titulo: "Oficinas Corporativas Centro",
          descripcion: "Remodelación completa de espacios de trabajo con diseño funcional y tecnología integrada para 200 empleados.",
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
          descripcion: "Expansión de vivienda existente con nueva suite principal y área de entretenimiento. Integración perfecta con la estructura original.",
          categoria: { id: 3, nombre: "Remodelaciones" },
          fotos: [
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
            "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800"
          ],
          es_oculto: false
        },
        {
          id: 4,
          titulo: "Restaurante Gourmet",
          descripcion: "Construcción y diseño interior de restaurante de alta cocina con cocina a la vista y capacidad para 120 comensales.",
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

  // Función para abrir el modal
  const abrirModal = (proyecto) => {
    setProyectoSeleccionado(proyecto);
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalOpen(false);
    setProyectoSeleccionado(null);
  };

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
            Más de <strong>100 proyectos</strong> concretados con clientes satisfechos
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
        <div className="proyectos-full-grid">
          {proyectosRecientes.map(proyecto => (
            <div key={proyecto.id} className="proyecto-card-full">
              <div className="proyecto-imagen-container" onClick={() => abrirModal(proyecto)} style={{cursor: 'pointer'}}>
                <img src={proyecto.fotos[0]} alt={proyecto.titulo} />
                <div className="imagen-overlay">
                  <button className="btn-ver-galeria" onClick={(e) => { e.stopPropagation(); abrirModal(proyecto); }}>
                    <i className="fas fa-images"></i>
                    <span>Ver Galería ({proyecto.fotos.length})</span>
                  </button>
                  <div className="proyecto-categoria-tag">
                    {proyecto.categoria.nombre}
                  </div>
                </div>
                
                {/* Thumbnails de otras fotos */}
                {proyecto.fotos.length > 1 && (
                  <div className="fotos-thumbnails">
                    {proyecto.fotos.slice(1, 4).map((foto, index) => (
                      <div key={index} className="thumbnail">
                        <img src={foto} alt={`${proyecto.titulo} ${index + 2}`} />
                      </div>
                    ))}
                    {proyecto.fotos.length > 4 && (
                      <div className="thumbnail-more">
                        +{proyecto.fotos.length - 4}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="proyecto-content">
                <div className="proyecto-header">
                  <h3>{proyecto.titulo}</h3>
                  <div className="proyecto-meta">
                    <span className="categoria-badge">{proyecto.categoria.nombre}</span>
                  </div>
                </div>
                
                <p className="proyecto-descripcion">{proyecto.descripcion}</p>
                
                <div className="proyecto-actions">
                  <button className="btn-ver-detalle" onClick={() => abrirModal(proyecto)}>
                    <i className="fas fa-eye"></i>
                    Ver Detalles
                  </button>
                  <button 
                    className="btn-consultar"
                    onClick={() => window.open(`https://wa.me/5493572445578?text=Hola! Me interesa el proyecto: ${proyecto.titulo}`, '_blank')}
                  >
                    <i className="fab fa-whatsapp"></i>
                    Consultar
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
            <p>Explora nuestra galería completa con más de 100 obras realizadas</p>
            <Link to="/proyectos" className="btn-ver-todos">
                Ver Más Proyectos
                <i className="fas fa-external-link-alt"></i>
            </Link>
          </div>
          
          <div className="cta-stats cta-stats-desktop">
            <div className="stat">
              <div className="stat-number">100+</div>
              <div className="stat-label">Proyectos</div>
            </div>
            <div className="stat">
              <div className="stat-number">5+</div>
              <div className="stat-label">Años</div>
            </div>
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Satisfacción</div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal de Galería */}
      <GaleriaModal 
        proyecto={proyectoSeleccionado}
        isOpen={modalOpen}
        onClose={cerrarModal}
      />
    </section>
  );
}

export default ProyectosRealizados;