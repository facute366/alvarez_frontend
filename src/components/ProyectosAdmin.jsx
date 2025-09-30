import { useState, useEffect } from 'react';
import '../styles/proyectosAdmin.css';
import Swal from 'sweetalert2';
import { useAdminGuard } from './Login';



function ProyectosAdmin() {
   useAdminGuard(); // ← esto protege /admin

  // Estados principales
  const [activeTab, setActiveTab] = useState('proyectos');
  const [loading, setLoading] = useState(false);
  
  // Estados para proyectos
  const [proyectos, setProyectos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proyectoForm, setProyectoForm] = useState({
    id: '',
    titulo: '',
    descripcion: '',
    categoria_id: '',
    es_oculto: false
  });
  const [editingProyecto, setEditingProyecto] = useState(null);
  const [fotosSeleccionadas, setFotosSeleccionadas] = useState([]);

  // Estados para categorías
  const [categoriaForm, setCategoriaForm] = useState({
    id: '',
    nombre: '',
    descripcion: ''
  });
  const [editingCategoria, setEditingCategoria] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    cargarProyectos();
    cargarCategorias();
  }, []);

  // ===========================
  // FUNCIONES DE PROYECTOS
  // ===========================

  const cargarProyectos = async () => {
    setLoading(true);
    try {
      // Simulación de API call - reemplazar con tu endpoint
      const proyectosEjemplo = [
        {
          id: 1,
          titulo: "Casa Moderna en Nordelta",
          descripcion: "Construcción integral de vivienda unifamiliar",
          categoria_id: 1,
          categoria: { nombre: "Residencial" },
          es_oculto: false,
          fotos: ['foto1.jpg', 'foto2.jpg']
        },
        {
          id: 2,
          titulo: "Oficinas Corporativas",
          descripcion: "Remodelación completa de espacios",
          categoria_id: 2,
          categoria: { nombre: "Comercial" },
          es_oculto: false,
          fotos: ['foto3.jpg']
        }
      ];
      setProyectos(proyectosEjemplo);
    } catch (error) {
      mostrarError('Error al cargar proyectos');
    } finally {
      setLoading(false);
    }
  };

  const cargarCategorias = async () => {
    try {
      // Simulación de API call - reemplazar con tu endpoint
      const categoriasEjemplo = [
        { id: 1, nombre: "Residencial", descripcion: "Proyectos residenciales" },
        { id: 2, nombre: "Comercial", descripcion: "Proyectos comerciales" },
        { id: 3, nombre: "Remodelaciones", descripcion: "Remodelaciones y reformas" }
      ];
      setCategorias(categoriasEjemplo);
    } catch (error) {
      mostrarError('Error al cargar categorías');
    }
  };

  const handleProyectoSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingProyecto) {
        // Actualizar proyecto existente
        await actualizarProyecto();
        mostrarExito('Proyecto actualizado correctamente');
      } else {
        // Crear nuevo proyecto
        await crearProyecto();
        mostrarExito('Proyecto creado correctamente');
      }
      
      resetProyectoForm();
      cargarProyectos();
    } catch (error) {
      mostrarError('Error al guardar el proyecto');
    } finally {
      setLoading(false);
    }
  };

  const crearProyecto = async () => {
    // Aquí iría tu llamada a la API
    console.log('Creando proyecto:', proyectoForm);
    console.log('Fotos:', fotosSeleccionadas);
    
    // Simulación de API call
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const actualizarProyecto = async () => {
    // Aquí iría tu llamada a la API
    console.log('Actualizando proyecto:', proyectoForm);
    
    // Simulación de API call
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const eliminarProyecto = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proyecto se eliminará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        // Aquí iría tu llamada a la API
        console.log('Eliminando proyecto:', id);
        
        // Simulación
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        mostrarExito('Proyecto eliminado correctamente');
        cargarProyectos();
      } catch (error) {
        mostrarError('Error al eliminar el proyecto');
      } finally {
        setLoading(false);
      }
    }
  };

  const editarProyecto = (proyecto) => {
    setProyectoForm({
      id: proyecto.id,
      titulo: proyecto.titulo,
      descripcion: proyecto.descripcion,
      categoria_id: proyecto.categoria_id,
      es_oculto: proyecto.es_oculto
    });
    setEditingProyecto(proyecto);
  };

  const resetProyectoForm = () => {
    setProyectoForm({
      id: '',
      titulo: '',
      descripcion: '',
      categoria_id: '',
      es_oculto: false
    });
    setEditingProyecto(null);
    setFotosSeleccionadas([]);
  };

  // ===========================
  // FUNCIONES DE CATEGORÍAS
  // ===========================

  const handleCategoriaSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingCategoria) {
        await actualizarCategoria();
        mostrarExito('Categoría actualizada correctamente');
      } else {
        await crearCategoria();
        mostrarExito('Categoría creada correctamente');
      }
      
      resetCategoriaForm();
      cargarCategorias();
    } catch (error) {
      mostrarError('Error al guardar la categoría');
    } finally {
      setLoading(false);
    }
  };

  const crearCategoria = async () => {
    console.log('Creando categoría:', categoriaForm);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const actualizarCategoria = async () => {
    console.log('Actualizando categoría:', categoriaForm);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const eliminarCategoria = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta categoría se eliminará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        console.log('Eliminando categoría:', id);
        await new Promise(resolve => setTimeout(resolve, 1000));
        mostrarExito('Categoría eliminada correctamente');
        cargarCategorias();
      } catch (error) {
        mostrarError('Error al eliminar la categoría');
      } finally {
        setLoading(false);
      }
    }
  };

  const editarCategoria = (categoria) => {
    setCategoriaForm({
      id: categoria.id,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    });
    setEditingCategoria(categoria);
  };

  const resetCategoriaForm = () => {
    setCategoriaForm({
      id: '',
      nombre: '',
      descripcion: ''
    });
    setEditingCategoria(null);
  };

  // ===========================
  // FUNCIONES AUXILIARES
  // ===========================

  const handleFotosChange = (e) => {
    const files = Array.from(e.target.files);
    setFotosSeleccionadas(files);
  };

  const mostrarExito = (mensaje) => {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: mensaje,
      timer: 2000,
      showConfirmButton: false
    });
  };

  const mostrarError = (mensaje) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje
    });
  };

  return (
    
    <div className="admin-container">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <p>Gestión de proyectos y categorías</p>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'proyectos' ? 'active' : ''}`}
          onClick={() => setActiveTab('proyectos')}
        >
          <i className="fas fa-building"></i>
          Proyectos
        </button>
        <button 
          className={`tab-btn ${activeTab === 'categorias' ? 'active' : ''}`}
          onClick={() => setActiveTab('categorias')}
        >
          <i className="fas fa-tags"></i>
          Categorías
        </button>
      </div>

      {/* Contenido de Proyectos */}
      {activeTab === 'proyectos' && (
        <div className="admin-content">
          <div className="admin-grid">
            
            {/* Formulario de Proyecto */}
            <div className="admin-form-section">
              <h2>{editingProyecto ? 'Editar Proyecto' : 'Crear Proyecto'}</h2>
              
              <form onSubmit={handleProyectoSubmit} className="admin-form">
                <div className="form-group">
                  <label>Título</label>
                  <input
                    type="text"
                    value={proyectoForm.titulo}
                    onChange={(e) => setProyectoForm({...proyectoForm, titulo: e.target.value})}
                    required
                    placeholder="Nombre del proyecto"
                  />
                </div>

                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    value={proyectoForm.descripcion}
                    onChange={(e) => setProyectoForm({...proyectoForm, descripcion: e.target.value})}
                    required
                    placeholder="Descripción detallada"
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>Categoría</label>
                  <select
                    value={proyectoForm.categoria_id}
                    onChange={(e) => setProyectoForm({...proyectoForm, categoria_id: e.target.value})}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map(categoria => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Fotos</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFotosChange}
                    className="file-input"
                  />
                  {fotosSeleccionadas.length > 0 && (
                    <p className="file-count">{fotosSeleccionadas.length} archivos seleccionados</p>
                  )}
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={proyectoForm.es_oculto}
                      onChange={(e) => setProyectoForm({...proyectoForm, es_oculto: e.target.checked})}
                    />
                    Proyecto oculto
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Guardando...' : (editingProyecto ? 'Actualizar' : 'Crear Proyecto')}
                  </button>
                  {editingProyecto && (
                    <button type="button" onClick={resetProyectoForm} className="btn-secondary">
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Lista de Proyectos */}
            <div className="admin-list-section">
              <h2>Proyectos Existentes</h2>
              
              <div className="list-container">
                {proyectos.map(proyecto => (
                  <div key={proyecto.id} className="list-item">
                    <div className="item-info">
                      <h3>{proyecto.titulo}</h3>
                      <p>{proyecto.descripcion}</p>
                      <div className="item-meta">
                        <span className="categoria-tag">{proyecto.categoria?.nombre}</span>
                        {proyecto.es_oculto && <span className="oculto-tag">Oculto</span>}
                        <span className="fotos-count">{proyecto.fotos?.length || 0} fotos</span>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => editarProyecto(proyecto)} className="btn-edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => eliminarProyecto(proyecto.id)} className="btn-delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Contenido de Categorías */}
      {activeTab === 'categorias' && (
        <div className="admin-content">
          <div className="admin-grid">
            
            {/* Formulario de Categoría */}
            <div className="admin-form-section">
              <h2>{editingCategoria ? 'Editar Categoría' : 'Crear Categoría'}</h2>
              
              <form onSubmit={handleCategoriaSubmit} className="admin-form">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={categoriaForm.nombre}
                    onChange={(e) => setCategoriaForm({...categoriaForm, nombre: e.target.value})}
                    required
                    placeholder="Nombre de la categoría"
                  />
                </div>

                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    value={categoriaForm.descripcion}
                    onChange={(e) => setCategoriaForm({...categoriaForm, descripcion: e.target.value})}
                    placeholder="Descripción de la categoría"
                    rows="3"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Guardando...' : (editingCategoria ? 'Actualizar' : 'Crear Categoría')}
                  </button>
                  {editingCategoria && (
                    <button type="button" onClick={resetCategoriaForm} className="btn-secondary">
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Lista de Categorías */}
            <div className="admin-list-section">
              <h2>Categorías Existentes</h2>
              
              <div className="list-container">
                {categorias.map(categoria => (
                  <div key={categoria.id} className="list-item">
                    <div className="item-info">
                      <h3>{categoria.nombre}</h3>
                      <p>{categoria.descripcion || 'Sin descripción'}</p>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => editarCategoria(categoria)} className="btn-edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => eliminarCategoria(categoria.id)} className="btn-delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}

export default ProyectosAdmin;