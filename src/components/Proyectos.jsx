import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GaleriaModal from "./GaleriaModal"; // ← Agregar este import
import fetchWithAuth from '../lib/fetchWithAuth';
import "../styles/proyectos.css";

const API = 'https://alvarez-back.vercel.app';

function Proyectos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [proyectos, setProyectos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState(searchParams.get('categoria') || 'todos');

// Estados para el modal ← Agregar estos estados
  const [modalOpen, setModalOpen] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  // ====== API helper ======
  async function api(path, options = {}) {
    const url = `${API}${path}`;
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        console.error('[API ERROR]', { path, method: options.method, status: res.status });
        return null;
      }
      return await res.json();
    } catch (err) {
      console.error('[API ERROR]', { path, error: err.message });
      return null;
    }
  }

  // Cargar categorías desde el backend
  const cargarCategorias = async () => {
    try {
      const data = await api('/categorias', { method: 'GET' });
      if (data && Array.isArray(data)) {
        const categoriasNormalizadas = data.map((c) => ({ id: c.id, nombre: c.nombre }));
        setCategorias(['todos', ...categoriasNormalizadas.map(c => c.nombre)]);
      }
    } catch (err) {
      console.error('Error al cargar categorías:', err);
      // Fallback a categorías por defecto
      setCategorias(['todos', 'Residencial', 'Comercial', 'Remodelaciones']);
    }
  };

  // Cargar proyectos desde el backend
  const cargarProyectos = async () => {
    try {
      const raw = await api('/proyectos', { method: 'GET' });
      if (!raw) {
        setProyectos([]);
        return;
      }

      const parse = (data) => {
        if (!data) return [];
        
        // Manejar diferentes estructuras de respuesta del backend
        if (Array.isArray(data) && data.length && (data[0]?.Proyectos || data[0]?.proyectos)) {
          const out = [];
          data.forEach((cat) => {
            const catId = Number(cat?.id ?? cat?.id_categoria ?? cat?.categoria_id ?? 0);
            const catNombre = cat?.nombre ?? cat?.name ?? 'Sin categoría';
            const proys = Array.isArray(cat?.Proyectos || cat?.proyectos) ? (cat.Proyectos || cat.proyectos) : [];
            proys.forEach((p) => {
              if (!p.es_oculto) { // Solo mostrar proyectos no ocultos
                out.push({
                  id: p?.id,
                  titulo: p?.titulo ?? '',
                  descripcion: p?.descripcion ?? '',
                  categoria: { id: catId, nombre: catNombre },
                  fotos: Array.isArray(p?.Fotos) ? p.Fotos.map(f => f?.link).filter(Boolean) : (Array.isArray(p?.fotos) ? p.fotos : []),
                  es_oculto: Boolean(p?.es_oculto),
                });
              }
            });
          });
          return out;
        }
        
        if (Array.isArray(data)) {
          return data.filter(Boolean).map((p) => {
            if (p.es_oculto) return null; // Filtrar proyectos ocultos
            
            const catId = Number(p?.id_categoria ?? p?.categoria_id ?? p?.categoria?.id ?? 0);
            const catNombre = p?.categoria?.nombre ?? 'Sin categoría';
            return {
              id: p?.id,
              titulo: p?.titulo ?? '',
              descripcion: p?.descripcion ?? '',
              categoria: { id: catId, nombre: catNombre },
              fotos: Array.isArray(p?.Fotos) ? p.Fotos.map(f => f?.link).filter(Boolean) : (Array.isArray(p?.fotos) ? p.fotos : []),
              es_oculto: Boolean(p?.es_oculto),
            };
          }).filter(Boolean);
        }
        
        const arr = data?.Proyectos || data?.proyectos || data?.data || [];
        if (Array.isArray(arr)) return parse(arr);
        return [];
      };

      const proyectosParsed = parse(raw).filter(p => p && p.id != null && !p.es_oculto);
      setProyectos(proyectosParsed);
    } catch (err) {
      console.error('Error al cargar proyectos:', err);
      setProyectos([]);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      await Promise.all([cargarCategorias(), cargarProyectos()]);
      setLoading(false);
    };
    
    cargarDatos();
  }, []);

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
          <p>Explora nuestra galería completa con más de 100 obras realizadas a lo largo de 5 años de experiencia</p>
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
              <div className="proyecto-imagen-container" onClick={() => abrirModal(proyecto)} style={{cursor: 'pointer'}}>
                {proyecto.fotos && proyecto.fotos.length > 0 ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="imagen-placeholder">
                      <i className="fas fa-image"></i>
                      <span>Sin imágenes</span>
                    </div>
                    <div className="imagen-overlay">
                      <div className="proyecto-categoria-tag">
                        {proyecto.categoria.nombre}
                      </div>
                    </div>
                  </>
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
          <p>Contáctanos y cuéntanos sobre tu proyecto. Tenemos más de 100 obras realizadas.</p>
          <button 
            className="btn-contactar"
            onClick={() => window.open('https://wa.me/1234567890?text=Hola! Me gustaría consultar sobre un proyecto personalizado', '_blank')}
          >
            <i className="fab fa-whatsapp"></i>
            Contactar Ahora
          </button>
        </div>

      </div>

      {/* Modal de Galería */}
      <GaleriaModal 
        proyecto={proyectoSeleccionado}
        isOpen={modalOpen}
        onClose={cerrarModal}
      />
    </div>
  );
}

export default Proyectos;