import { useState, useEffect, useRef } from 'react';
import '../styles/proyectosAdmin.css';
import Swal from 'sweetalert2';
import { useAdminGuard } from './Login';
import fetchWithAuth from '../lib/fetchWithAuth';
import { compressImage } from '../utils/compressImage';
import Sortable from 'sortablejs'; // <- igual que en MCL

const API = 'https://alvarez-back.vercel.app';

function ProyectosAdmin() {
  useAdminGuard();

  // Tabs / loading
  const [activeTab, setActiveTab] = useState('proyectos');
  const [loading, setLoading] = useState(false);

  // Proyectos
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

  // --- Selección de fotos (estilo MCL): [{ key, file, url }]
  const [fotoItems, setFotoItems] = useState([]);
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);     // contenedor de la grilla
  const sortableRef = useRef(null);    // instancia Sortable

  // Categorías
  const [categoriaForm, setCategoriaForm] = useState({ id: '', nombre: '' });
  const [editingCategoria, setEditingCategoria] = useState(null);

  useEffect(() => {
    cargarCategorias();
    cargarProyectos();
  }, []);

  // ====== API helper ======
  async function api(path, options = {}) {
    const url = `${API}${path}`;
    const res = await fetchWithAuth(url, options);
    if (!res.ok) {
      console.error('[API ERROR]', { path, method: options.method, status: res.status, data: res.data });
      const msg =
        (res.data && (res.data.message || res.data.error || res.data.msg)) ||
        `HTTP ${res.status}` ||
        'Error imprevisto.';
      Swal.fire({ icon: 'error', title: 'Error', text: String(msg) });
      throw new Error(String(msg));
    }
    return res.data;
  }

  // ====== PROYECTOS ======
  const cargarProyectos = async () => {
    setLoading(true);
    try {
      const raw = await api('/proyectos', { method: 'GET' });
      const parse = (data) => {
        if (!data) return [];
        if (Array.isArray(data) && data.length && (data[0]?.Proyectos || data[0]?.proyectos)) {
          const out = [];
          data.forEach((cat) => {
            const catId = Number(cat?.id ?? cat?.id_categoria ?? cat?.categoria_id ?? 0);
            const catNombre = cat?.nombre ?? cat?.name ?? 'Sin categoría';
            const proys = Array.isArray(cat?.Proyectos || cat?.proyectos) ? (cat.Proyectos || cat.proyectos) : [];
            proys.forEach((p) => {
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
        if (Array.isArray(data)) {
          return data.filter(Boolean).map((p) => {
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
        const arr = data?.Proyectos || data?.proyectos || data?.data || [];
        if (Array.isArray(arr)) return parse(arr);
        return [];
      };
      setProyectos(parse(raw).filter(p => p && p.id != null));
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
      es_oculto: proyectoForm.es_oculto ? 1 : 0,
    };

    const files = fotoItems.map(it => it.file); // respeta el orden del usuario
    console.time('[PROY] compresión total');
    const comprimidas = await Promise.all(
      files.map(async (f, i) => {
        console.log(`[PROY] original #${i + 1}: ${f.name} - ${(f.size / 1024).toFixed(1)} KB`);
        const out = await compressImage(f);
        console.log(`[PROY] comprimida #${i + 1}: ${out.name} - ${(out.size / 1024).toFixed(1)} KB`);
        return out;
      })
    );
    console.timeEnd('[PROY] compresión total');

    const fd = new FormData();
    fd.append('data', JSON.stringify(base));
    comprimidas.forEach((f) => fd.append('files', f));
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

    const files = fotoItems.map(it => it.file);
    console.time('[PROY] compresión total (edit)');
    const comprimidas = await Promise.all(
      files.map(async (f, i) => {
        console.log(`[PROY] (edit) original #${i + 1}: ${f.name} - ${(f.size / 1024).toFixed(1)} KB`);
        const out = await compressImage(f);
        console.log(`[PROY] (edit) comprimida #${i + 1}: ${out.name} - ${(out.size / 1024).toFixed(1)} KB`);
        return out;
      })
    );
    console.timeEnd('[PROY] compresión total (edit)');

    const fd = new FormData();
    fd.append('data', JSON.stringify(base));
    comprimidas.forEach((f) => fd.append('files', f));
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
    if (!result.isConfirmed) return;
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
    revokeAllAndClear(); // al entrar a editar, limpiamos selección previa
  };

  const resetProyectoForm = () => {
    setProyectoForm({ id: '', titulo: '', descripcion: '', categoria_id: '', es_oculto: false });
    setEditingProyecto(null);
    revokeAllAndClear();
  };

  // ====== CATEGORÍAS ======
  const cargarCategorias = async () => {
    try {
      const data = await api('/categorias', { method: 'GET' });
      const normalizadas = (Array.isArray(data) ? data : []).map((c) => ({ id: c.id, nombre: c.nombre }));
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
      await cargarProyectos();
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
    if (!result.isConfirmed) return;
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
  };

  const editarCategoria = (categoria) => {
    setCategoriaForm({ id: categoria.id, nombre: categoria.nombre });
    setEditingCategoria(categoria);
  };

  const resetCategoriaForm = () => {
    setCategoriaForm({ id: '', nombre: '' });
    setEditingCategoria(null);
  };

  // ====== FOTOS (como MCL, con SortableJS) ======
  const makeKey = (f, idx) => `${f.name}__${f.size}__${f.lastModified}__${idx}`;

  // reemplaza la selección completa (revoca las urls anteriores)
 const handleFotosChange = (e) => {
  const files = Array.from(e.target.files || []);
  
  // Mantener las fotos existentes
  const existingPhotos = fotoItems.filter(item => item.isExisting);
  
  // Crear nuevos items solo para las fotos nuevas
  const newItems = files.map((f, i) => ({
    key: makeKey(f, i + existingPhotos.length),
    file: f,
    url: URL.createObjectURL(f),
    isExisting: false
  }));
  
  // Combinar fotos existentes con las nuevas
  setFotoItems([...existingPhotos, ...newItems]);
};

  // quitar una imagen (revoca solo esa)
  const removeAt = (idx) => {
    setFotoItems((prev) => {
      const next = [...prev];
      const [removed] = next.splice(idx, 1);
      
      // Solo revocar URL si no es una foto existente
      if (removed && !removed.isExisting) {
        URL.revokeObjectURL(removed.url);
      }
      
      if (next.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return next;
    });
  };

  const revokeAllAndClear = () => {
    // Solo revocar URLs de fotos nuevas (no existentes)
    fotoItems.forEach(it => {
      if (!it.isExisting && it.url) {
        URL.revokeObjectURL(it.url);
      }
    });
    setFotoItems([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Inicializar / actualizar SortableJS cuando cambia la grilla
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    // destruir previa
    if (sortableRef.current) {
      sortableRef.current.destroy();
      sortableRef.current = null;
    }

    if (!fotoItems.length) return;

    sortableRef.current = Sortable.create(el, {
      animation: 150,
      ghostClass: 'drag-ghost',     // clases para estilos
      chosenClass: 'drag-chosen',
      dragClass: 'dragging',
      // importante para mobile:
      // (Sortable ya maneja touch, no uses HTML5 drag)
      onEnd: () => {
        // leer nuevo orden desde el DOM (data-key en cada hijo)
        const orderKeys = Array.from(el.children).map((n) => n.getAttribute('data-key'));
        setFotoItems((prev) => {
          const map = new Map(prev.map((it) => [it.key, it]));
          return orderKeys.map((k) => map.get(k)).filter(Boolean);
        });
      },
    });

    return () => {
      if (sortableRef.current) {
        sortableRef.current.destroy();
        sortableRef.current = null;
      }
    };
  }, [fotoItems]);

  // ====== UI helpers ======
  const mostrarExito = (mensaje) => Swal.fire({ icon: 'success', title: 'Éxito', text: mensaje, timer: 1800, showConfirmButton: false });
  const mostrarError = (mensaje) => Swal.fire({ icon: 'error', title: 'Error', text: mensaje });

  // ====== RENDER ======
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <p>Gestión de proyectos y categorías</p>
      </div>

      <div className="admin-tabs">
        <button className={`tab-btn ${activeTab === 'proyectos' ? 'active' : ''}`} onClick={() => setActiveTab('proyectos')}>
          <i className="fas fa-building"></i> Proyectos
        </button>
        <button className={`tab-btn ${activeTab === 'categorias' ? 'active' : ''}`} onClick={() => setActiveTab('categorias')}>
          <i className="fas fa-tags"></i> Categorías
        </button>
      </div>

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
                    {categorias.map((c) => (
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Fotos</label>
                  
                  {/* Visualización de fotos actuales (solo cuando se edita) */}
                  {editingProyecto && editingProyecto.fotos && editingProyecto.fotos.length > 0 && (
                    <div className="current-photos-preview">
                      <p className="current-photos-label">
                        <i className="fas fa-images"></i>
                        Fotos actuales del proyecto ({editingProyecto.fotos.length})
                      </p>
                      <div className="current-photos-grid">
                        {editingProyecto.fotos.map((foto, index) => (
                          <div key={index} className="current-photo-item">
                            <img 
                              src={typeof foto === 'string' ? foto : foto.url || foto.imagen_url || foto.link} 
                              alt={`${editingProyecto.titulo} - Foto ${index + 1}`} 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFotosChange}
                    className="file-input"
                  />

                  {/* Grilla con SortableJS + botón X (crear y editar) */}
                  {fotoItems.length > 0 && (
                    <div className="preview-grid" ref={previewRef}>
                      {fotoItems.map((it, i) => (
                        <div 
                          key={it.key} 
                          data-key={it.key} 
                          className={`preview-item ${it.isExisting ? 'existing' : ''}`}
                        >
                          <button type="button" className="remove-btn" onClick={() => removeAt(i)} aria-label="Quitar imagen">
                            ×
                          </button>
                          <img src={it.url} alt={`preview-${i}`} />
                        </div>
                      ))}
                    </div>
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
                    {/* Preview de imágenes */}
                    <div className="item-images">
                      {proyecto.fotos && Array.isArray(proyecto.fotos) && proyecto.fotos.length > 0 ? (
                        <>
                          <div className="main-image">
                            <img src={proyecto.fotos[0]} alt={proyecto.titulo} />
                          </div>
                          {proyecto.fotos.length > 1 && (
                            <div className="thumbnail-images">
                              {proyecto.fotos.slice(1, 4).map((foto, index) => (
                                <div key={index} className="thumbnail-item">
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
                        <div className="no-image">
                          <i className="fas fa-image"></i>
                          <span>Sin imágenes</span>
                        </div>
                      )}
                    </div>
                    
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
                        <span className="fotos-count">{Array.isArray(proyecto.fotos) ? proyecto.fotos.length : 0} fotos</span>
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

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}

export default ProyectosAdmin;
