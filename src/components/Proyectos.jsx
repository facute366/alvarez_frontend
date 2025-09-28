import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/proyectos.css";

function Proyectos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState(searchParams.get('categoria') || 'todos');

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
        },
        {
          id: 5,
          titulo: "Duplex en Palermo",
          descripcion: "Vivienda de dos plantas con diseño minimalista, terraza con parrilla y cochera para dos autos.",
          categoria: { id: 1, nombre: "Residencial" },
          fotos: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800"
          ],
          es_oculto: false
        },
        {
          id: 6,
          titulo: "Remodelación de Cocina",
          descripción: "Renovación completa de cocina con isla central, electrodomésticos de última generación y despensa walk-in.",
          categoria: { id: 3, nombre: "Remodelaciones" },
          fotos: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
            "https://images.unsplash.com/photo-1556909090-4694ad63b063?w=800"
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

  const handleCategoriaChange = (categoria) => {
    setCategoriaActiva(categoria);
    // Actualizar URL
    if (categoria === 'todos') {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: categoria });
    }
  };

  if (loading) {
    return (
      <div className="proyectos-page">
        <div className="contenedor">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando proyectos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="proyectos-page">
      <div className="contenedor">
        
        {/* Header */}
        <div className="proyectos-page-header">
          <div className="breadcrumb">
            <a href="/">Inicio</a>
            <i className="fas fa-chevron-right"></i>
            <span>Proyectos</span>
          </div>
          
          <h1>Nuestros Proyectos</h1>
          <p>Explora nuestra galería completa con más de 500 obras realizadas a lo largo de 25 años de experiencia</p>
        </div>

        {/* Filtros */}
        <div className="proyectos-filtros">
          <div className="filtros-header">
            <h3>Filtrar por categoría</h3>
            <div className="resultados-count">
              {proyectosFiltrados.length} proyecto{proyectosFiltrados.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="categorias-filtros">
            {categorias.map(categoria => (
              <button
                key={categoria}
                className={`filtro-btn ${categoriaActiva === categoria ? 'active' : ''}`}
                onClick={() => handleCategoriaChange(categoria)}
              >
                {categoria === 'todos' ? 'Todos los Proyectos' : categoria}
                <span className="count">
                  {categoria === 'todos' 
                    ? proyectos.length 
                    : proyectos.filter(p => p.categoria.nombre === categoria).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Proyectos */}
        <div className="proyectos-full-grid">
          {proyectosFiltrados.map(proyecto => (
            <div key={proyecto.id} className="proyecto-card-full">
              <div className="proyecto-imagen-container">
                <img src={proyecto.fotos[0]} alt={proyecto.titulo} />
                <div className="imagen-overlay">
                  <button className="btn-ver-galeria">
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
                  <button className="btn-ver-detalle">
                    <i className="fas fa-eye"></i>
                    Ver Detalles
                  </button>
                  <button 
                    className="btn-consultar"
                    onClick={() => window.open(`https://wa.me/1234567890?text=Hola! Me interesa el proyecto: ${proyecto.titulo}`, '_blank')}
                  >
                    <i className="fab fa-whatsapp"></i>
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {proyectosFiltrados.length === 0 && (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>No se encontraron proyectos</h3>
            <p>No hay proyectos en la categoría seleccionada</p>
            <button onClick={() => handleCategoriaChange('todos')} className="btn-reset-filter">
              Ver Todos los Proyectos
            </button>
          </div>
        )}

        {/* CTA Bottom */}
        <div className="proyectos-bottom-cta">
          <h2>¿No encontraste lo que buscabas?</h2>
          <p>Contáctanos y cuéntanos sobre tu proyecto. Tenemos más de 500 obras realizadas.</p>
          <button 
            className="btn-contactar"
            onClick={() => window.open('https://wa.me/1234567890?text=Hola! Me gustaría consultar sobre un proyecto personalizado', '_blank')}
          >
            <i className="fab fa-whatsapp"></i>
            Contactar Ahora
          </button>
        </div>

      </div>
    </div>
  );
}

export default Proyectos;