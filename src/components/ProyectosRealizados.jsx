import { useState, useEffect } from "react";
import "../styles/proyectosRealizados.css";
import { Link } from 'react-router-dom';
import GaleriaModal from "./GaleriaModal"; // Agregar import del modal

const API = 'https://alvarez-back.vercel.app';

function ProyectosRealizados() {
  const [proyectos, setProyectos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  
  // Estados para el modal
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
            Más de <strong>{proyectos.length} proyectos</strong> concretados con clientes satisfechos
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
            <p>Explora nuestra galería completa con más de {proyectos.length} obras realizadas</p>
            <Link to="/proyectos" className="btn-ver-todos">
                Ver Más Proyectos
                <i className="fas fa-external-link-alt"></i>
            </Link>
          </div>
          
          <div className="cta-stats cta-stats-desktop">
            <div className="stat">
              <div className="stat-number">{proyectos.length}+</div>
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