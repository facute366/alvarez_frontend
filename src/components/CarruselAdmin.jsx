import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import fetchWithAuth from '../lib/fetchWithAuth';
import '../styles/CarruselAdmin.css';

const API = 'https://alvarez-back.vercel.app';

function normalizeDeletePayloadsFromUrl(rawUrl) {
  try {
    const u = new URL(rawUrl, window.location.href);
    const pathOriginal = decodeURIComponent(u.pathname);
    const lower = pathOriginal.toLowerCase();
    const base = lower.replace(/\.(jpe?g|png|webp)$/i, '');
    const candidates = [pathOriginal, lower, `${base}.jpg`, `${base}.jpeg`]
      .filter((v, i, a) => v && a.indexOf(v) === i);
    return candidates.map(c => [{ src: c }, { url: c }]).flat();
  } catch {
    return [];
  }
}

export default function CarruselAdmin() {
  const [slides, setSlides] = useState([]); // [{id?, url}]
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  // Carga combinada: intenta /carrusel (con IDs) y si no, /carrusel/urls
  const cargar = async () => {
    setLoading(true);
    try {
      // 1) Intentar admin con IDs
      let okResp = false;
      try {
        const { ok, data } = await fetchWithAuth(`${API}/carrusel`, { method: 'GET' });
        if (ok && Array.isArray(data)) {
          setSlides(data.map(x => ({ id: x.id ?? x._id ?? null, url: x.url || x.src || x.imagen || '' })));
          okResp = true;
        }
      } catch (_) { /* sin token o 401 => probamos público */ }

      if (!okResp) {
        const r = await fetch(`${API}/carrusel/urls`);
        const d = await r.json().catch(() => []);
        const list = Array.isArray(d) ? d : (d && d.urls) || [];
        setSlides(list.map(u => ({ id: null, url: u })));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  useEffect(() => {
    if (!window.bootstrap || !carouselRef.current) return;
    // eslint-disable-next-line no-new
    new window.bootstrap.Carousel(carouselRef.current, { interval: 3000, ride: 'carousel' });
  }, [slides]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      Swal.fire('Error', 'Seleccioná una imagen.', 'error');
      return;
    }
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Quieres agregar esta imagen al carrusel!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar'
    });
    if (!confirm.isConfirmed) return;

    const fd = new FormData();
    fd.append('file', file); // backend espera 'file' como en MCL

    try {
      const { ok, data } = await fetchWithAuth(`${API}/carrusel/`, {
        method: 'POST',
        body: fd
      });
      if (ok) {
        await Swal.fire('Éxito', 'Imagen agregada correctamente.', 'success');
        setFile(null);
        await cargar();
      } else {
        const msg = (data && (data.error || data.message)) || 'No se pudo agregar la imagen';
        Swal.fire('Error', msg, 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Hubo un error al agregar la imagen.', 'error');
    }
  };

  const handleDeleteActive = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    });
    if (!isConfirmed) return;

    // Obtener slide activo
    const activeIdx = (() => {
      const inner = carouselRef.current?.querySelector('.carousel-inner');
      if (!inner) return 0;
      const items = Array.from(inner.children);
      return Math.max(0, items.findIndex(el => el.classList.contains('active')));
    })();

    const active = slides[activeIdx] || slides[0];
    if (!active) {
      Swal.fire('Error', 'No hay una imagen activa para eliminar.', 'error');
      return;
    }

    // Endpoint de borrado (igual MCL: /carrusel/img)
    const endpoint = `${API}/carrusel/img`;

    const tryDelete = async (payload) => {
      const { ok, data } = await fetchWithAuth(endpoint, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { ok, data };
    };

    let ok = false, data = null;

    // 1) Intento por ID si lo tenemos
    if (active.id) {
      ({ ok, data } = await tryDelete({ id: Number(active.id) }));
    }

    // 2) Si no hay ID o falló, pruebo por variantes de URL (.jpg/.jpeg)
    if (!ok && active.url) {
      const payloads = normalizeDeletePayloadsFromUrl(active.url);
      for (const p of payloads) {
        ({ ok, data } = await tryDelete(p));
        if (ok) break;
      }
    }

    if (!ok) {
      Swal.fire('Error', (data && (data.error || data.message)) || 'No se pudo eliminar la imagen.', 'error');
      return;
    }

    await Swal.fire('Éxito', 'Imagen eliminada correctamente.', 'success');
    await cargar();
  };

    return (
    <section className="carousel-editor">
        <h2 className="mb-3">Carrusel – Admin</h2>

        {loading ? (
        <div>Cargando…</div>
        ) : (
        <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            ref={carouselRef}
        >
            <div className="carousel-inner">
            {(!slides || slides.length === 0) ? (
                <div className="carousel-item active">
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:240,background:'#f5f5f5'}}>
                    Sin imágenes de carrusel
                </div>
                </div>
            ) : (
                slides.map((s, i) => (
                <div
                    key={(s.id ?? s.url) + '-' + i}
                    className={`carousel-item${i === 0 ? ' active' : ''}`}
                    data-image-id={s.id ?? ''}
                    data-image-src={s.url ?? ''}
                >
                    <img src={s.url} className="d-block w-100" alt={`Slide ${i + 1}`} />
                </div>
                ))
            )}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
        )}

        {/* Input file ocupa todo el ancho */}
        <input
        type="file"
        accept="image/*"
        className="carousel-input"
        onChange={e => setFile(e.target.files?.[0] || null)}
        />

        {/* Botones debajo */}
        <div id="btnsImgCarousel">
        <button id="addImageBtn" type="button" onClick={handleUpload}>
            Subir imagen
        </button>
        <button id="deleteImageBtn" type="button" onClick={handleDeleteActive}>
            Eliminar imagen activa
        </button>
        </div>
    </section>
    );


}
