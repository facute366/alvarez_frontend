import { useState, useEffect } from 'react';
import '../styles/proyectosAdmin.css';
import Swal from 'sweetalert2';
import { useAdminGuard } from './Login';
import fetchWithAuth from '../lib/fetchWithAuth';

const API = 'https://alvarez-back.vercel.app';
const USE_MULTIPART = true; // ponelo en false si tu backend aún no acepta archivos

function ProyectosAdmin() {
  useAdminGuard(); // protege /admin

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
    es_oculto: false,
  });
  const [editingProyecto, setEditingProyecto] = useState(null);
  const [fotosSeleccionadas, setFotosSeleccionadas] = useState([]);

  // Estados para categorías (sin descripción)
  const [categoriaForm, setCategoriaForm] = useState({
    id: '',
    nombre: '',
  });
  const [editingCategoria, setEditingCategoria] = useState(null);

  useEffect(() => {
    cargarCategorias();
    cargarProyectos();
  }, []);

  // ============ Helper: fetch con auth y manejo de errores ============
  async function api(path, options = {}) {
    const url = `${API}${path}`;
    const res = await fetchWithAuth(url, options);

    if (!res.ok) {
      // LOG completo de error
      console.error('[API ERROR]', {
        path,
        method: options.method,
        status: res.status,
        data: res.data,
      });

      const msg =
        (res.data && (res.data.message || res.data.error || res.data.msg)) ||
        `HTTP ${res.status}` ||
        'Error imprevisto.';

      if (String(msg).toUpperCase().includes('TOKEN')) {
        Swal.fire({
          icon: 'error',
          title: 'Autenticación requerida',
          text: 'Tu sesión no es válida o expiró. Vuelve a iniciar sesión.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: typeof msg === 'string' ? msg : 'Error imprevisto.',
        });
      }
      throw new Error(typeof msg === 'string' ? msg : 'Error imprevisto.');
    }

    return res.data;
  }


  // ===========================
  // PROYECTOS
  // ===========================
const cargarProyectos = async () => {
  setLoading(true);
  try {
    const raw = await api('/proyectos', { method: 'GET' });

    // LOGS CLAVE
    console.log('[PROY] /proyectos raw =>', raw, 'tipo:', Array.isArray(raw) ? 'array' : typeof raw);

    // ------- PARSER ROBUSTO -------
    const parse = (data) => {
      if (!data) return [];

      // Caso 1: array de categorías con Proyectos adentro (tu ejemplo)
      if (Array.isArray(data) && data.length && (data[0]?.Proyectos || data[0]?.proyectos)) {
        const out = [];
        data.forEach((cat, idx) => {
          const catId = Number(cat?.id ?? cat?.id_categoria ?? cat?.categoria_id ?? 0);
          const catNombre = cat?.nombre ?? cat?.name ?? 'Sin categoría';
          const proys = Array.isArray(cat?.Proyectos || cat?.proyectos) ? (cat.Proyectos || cat.proyectos) : [];
          console.log(`[PROY] cat[${idx}] id=${catId} nombre=${catNombre} proys=${proys.length}`);
          proys.forEach((p, j) => {
            out.push({
              id: p?.id,
              titulo: p?.titulo ?? '',
              descripcion: p?.descripcion ?? '',
              categoria_id: Number(p?.id_categoria ?? catId),
              es_oculto: Boolean(p?.es_oculto),
              fotos: Array.isArray(p?.Fotos) ? p.Fotos.map(f => f?.link).filter(Boolean) : (Array.isArray(p?.fotos) ? p.fotos : []),
              categoria: { id: catId, nombre: catNombre },
            });
          });
        });
        return out;
      }

      // Caso 2: array plano de proyectos
      if (Array.isArray(data)) {
        return data
          .filter(Boolean)
          .map((p, i) => {
            const catId = Number(p?.id_categoria ?? p?.categoria_id ?? p?.categoria?.id ?? 0);
            const catNombre = p?.categoria?.nombre ?? 'Sin categoría';
            return {
              id: p?.id,
              titulo: p?.titulo ?? '',
              descripcion: p?.descripcion ?? '',
              categoria_id: catId,
              es_oculto: Boolean(p?.es_oculto),
              fotos: Array.isArray(p?.Fotos) ? p.Fotos.map(f => f?.link).filter(Boolean) : (Array.isArray(p?.fotos) ? p.fotos : []),
              categoria: catNombre ? { id: catId, nombre: catNombre } : null,
            };
          });
      }

      // Caso 3: objeto que envuelve { Proyectos: [...] } o similar
      const arr =
        data?.Proyectos || data?.proyectos || data?.data || [];
      if (Array.isArray(arr)) return parse(arr);

      return [];
    };

    const lista = parse(raw).filter(p => p && p.id != null);

    console.log('[PROY] lista final:', lista);
    console.table(lista.map(p => ({
      id: p.id,
      titulo: p.titulo,
      cat: p.categoria?.nombre,
      cat_id: p.categoria_id,
      fotos: p.fotos?.length || 0,
      oculto: p.es_oculto
    })));

    setProyectos(lista);
  } catch (err) {
    console.error('[PROY] Error en cargarProyectos:', err);
    mostrarError('Error al cargar proyectos');
  } finally {
    setLoading(false);
  }
};


  const handleProyectoSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingProyecto) {
        await actualizarProyecto();
        mostrarExito('Proyecto actualizado correctamente');
      } else {
        await crearProyecto();
        mostrarExito('Proyecto creado correctamente');
      }
      resetProyectoForm();
      await cargarProyectos();
    } catch (err) {
      console.error(err);
      mostrarError('Error al guardar el proyecto');
    } finally {
      setLoading(false);
    }
  };

const crearProyecto = async () => {
  const base = {
    titulo: proyectoForm.titulo.trim(),
    descripcion: proyectoForm.descripcion.trim(),
    id_categoria: Number(proyectoForm.categoria_id),
    es_oculto: proyectoForm.es_oculto ? 1 : 0, // el back usa 1/0
  };

  console.log('[PROY] creando =>', base);

  const fd = new FormData();
  fd.append('data', JSON.stringify(base)); // 👈 campo "data" con JSON string
  fotosSeleccionadas.forEach((f) => fd.append('files', f)); // 👈 campo "files"

  await api('/proyectos', { method: 'POST', body: fd });
};

const actualizarProyecto = async () => {
  const id = proyectoForm.id || editingProyecto?.id;
  if (!id) throw new Error('Proyecto sin id');

  const base = {
    titulo: proyectoForm.titulo.trim(),
    descripcion: proyectoForm.descripcion.trim(),
    id_categoria: Number(proyectoForm.categoria_id),
    es_oculto: proyectoForm.es_oculto ? 1 : 0,
  };

  console.log('[PROY] actualizando =>', { id, ...base });

  const fd = new FormData();
  fd.append('data', JSON.stringify(base));
  fotosSeleccionadas.forEach((f) => fd.append('files', f));

  await api(`/proyectos/${id}`, { method: 'PUT', body: fd });
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
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await api(`/proyectos/${id}`, { method: 'DELETE' });
        mostrarExito('Proyecto eliminado correctamente');
        await cargarProyectos();
      } catch (err) {
        console.error(err);
        mostrarError('Error al eliminar el proyecto');
      } finally {
        setLoading(false);
      }
    }
  };

const editarProyecto = (proyecto) => {
  setProyectoForm({
    id: proyecto.id,
    titulo: proyecto.titulo ?? '',
    descripcion: proyecto.descripcion ?? '',
    categoria_id: Number(proyecto.categoria_id ?? proyecto.categoria?.id ?? ''),
    es_oculto: Boolean(proyecto.es_oculto),
  });
  setEditingProyecto(proyecto);
  setFotosSeleccionadas([]);
};



  const resetProyectoForm = () => {
    setProyectoForm({
      id: '',
      titulo: '',
      descripcion: '',
      categoria_id: '',
      es_oculto: false,
    });
    setEditingProyecto(null);
    setFotosSeleccionadas([]);
  };

  // ===========================
  // CATEGORÍAS (sin descripción)
  // ===========================
  const cargarCategorias = async () => {
    try {
      const data = await api('/categorias', { method: 'GET' });
      const normalizadas = (Array.isArray(data) ? data : []).map((c) => ({
        id: c.id,
        nombre: c.nombre,
      }));
      setCategorias(normalizadas);
    } catch (err) {
      console.error(err);
      mostrarError('Error al cargar categorías');
    }
  };

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
      await cargarCategorias();
      await cargarProyectos(); // refrescar etiquetas en proyectos
    } catch (err) {
      console.error(err);
      mostrarError('Error al guardar la categoría');
    } finally {
      setLoading(false);
    }
  };

  const crearCategoria = async () => {
    const payload = { nombre: categoriaForm.nombre.trim() };
    await api('/categorias', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const actualizarCategoria = async () => {
    const id = categoriaForm.id || editingCategoria?.id;
    if (!id) throw new Error('Categoría sin id');
    const payload = { nombre: categoriaForm.nombre.trim() };
    await api(`/categorias/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
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
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await api(`/categorias/${id}`, { method: 'DELETE' });
        mostrarExito('Categoría eliminada correctamente');
        await cargarCategorias();
        await cargarProyectos();
      } catch (err) {
        console.error(err);
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
    });
    setEditingCategoria(categoria);
  };

  const resetCategoriaForm = () => {
    setCategoriaForm({
      id: '',
      nombre: '',
    });
    setEditingCategoria(null);
  };

  // ===========================
  // AUXILIARES UI
  // ===========================
  const handleFotosChange = (e) => {
    const files = Array.from(e.target.files || []);
    setFotosSeleccionadas(files);
  };

  const mostrarExito = (mensaje) => {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: mensaje,
      timer: 1800,
      showConfirmButton: false,
    });
  };

  const mostrarError = (mensaje) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    });
  };

  // ===========================
  // RENDER
  // ===========================
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

      {/* Proyectos */}
      {activeTab === 'proyectos' && (
        <div className="admin-content">
          <div className="admin-grid">
            <div className="admin-form-section">
              <h2>{editingProyecto ? 'Editar Proyecto' : 'Crear Proyecto'}</h2>

              <form onSubmit={handleProyectoSubmit} className="admin-form">
                <div className="form-group">
                  <label>Título</label>
                  <input
                    type="text"
                    value={proyectoForm.titulo}
                    onChange={(e) => setProyectoForm({ ...proyectoForm, titulo: e.target.value })}
                    required
                    placeholder="Nombre del proyecto"
                  />
                </div>

                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    value={proyectoForm.descripcion}
                    onChange={(e) => setProyectoForm({ ...proyectoForm, descripcion: e.target.value })}
                    required
                    placeholder="Descripción detallada"
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>Categoría</label>
                  <select
                    value={proyectoForm.categoria_id}
                    onChange={(e) => setProyectoForm({ ...proyectoForm, categoria_id: e.target.value })}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((categoria) => (
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
                      onChange={(e) => setProyectoForm({ ...proyectoForm, es_oculto: e.target.checked })}
                    />
                    Proyecto oculto
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Guardando...' : editingProyecto ? 'Actualizar' : 'Crear Proyecto'}
                  </button>
                  {editingProyecto && (
                    <button type="button" onClick={resetProyectoForm} className="btn-secondary">
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="admin-list-section">
              <h2>Proyectos Existentes</h2>

              <div className="list-container">
                {proyectos.map((proyecto) => (
                  <div key={proyecto.id} className="list-item">
                    <div className="item-info">
                      <h3>{proyecto.titulo}</h3>
                      <p>{proyecto.descripcion}</p>
                      <div className="item-meta">
                        <span className="categoria-tag">
                          {proyecto.categoria?.nombre ||
                            categorias.find((c) => Number(c.id) === Number(proyecto.categoria_id))?.nombre ||
                            'Sin categoría'}
                        </span>
                        {proyecto.es_oculto && <span className="oculto-tag">Oculto</span>}
                        <span className="fotos-count">
                          {Array.isArray(proyecto.fotos) ? proyecto.fotos.length : 0} fotos
                        </span>
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
                {proyectos.length === 0 && <p>No hay proyectos cargados.</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categorías */}
      {activeTab === 'categorias' && (
        <div className="admin-content">
          <div className="admin-grid">
            <div className="admin-form-section">
              <h2>{editingCategoria ? 'Editar Categoría' : 'Crear Categoría'}</h2>

              <form onSubmit={handleCategoriaSubmit} className="admin-form">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={categoriaForm.nombre}
                    onChange={(e) => setCategoriaForm({ ...categoriaForm, nombre: e.target.value })}
                    required
                    placeholder="Nombre de la categoría"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Guardando...' : editingCategoria ? 'Actualizar' : 'Crear Categoría'}
                  </button>
                  {editingCategoria && (
                    <button type="button" onClick={resetCategoriaForm} className="btn-secondary">
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="admin-list-section">
              <h2>Categorías Existentes</h2>

              <div className="list-container">
                {categorias.map((categoria) => (
                  <div key={categoria.id} className="list-item">
                    <div className="item-info">
                      <h3>{categoria.nombre}</h3>
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
                {categorias.length === 0 && <p>No hay categorías cargadas.</p>}
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
