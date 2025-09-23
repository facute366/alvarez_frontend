import { useEffect, useRef, useState } from "react";
import "../styles/header.css"; // importa tus estilos

export default function Header() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  const closeMenu = () => setOpen(false);
  const toggleMenu = (e) => {
    e?.stopPropagation();
    setOpen((v) => !v);
  };

  // Cerrar al clickear fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (!navRef.current || !toggleRef.current) return;
      if (
        !navRef.current.contains(e.target) &&
        !toggleRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Cerrar con ESC
  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <header className="header">
      <div className="contenedor">
        <div className="barra">
          {/* Botón hamburguesa */}
          <svg
            ref={toggleRef}
            onClick={toggleMenu}
            xmlns="http://www.w3.org/2000/svg"
            className="menu-toggle icon icon-tabler icon-tabler-menu-2"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#154ea2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            role="button"
            aria-label="Abrir menú"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>

          {/* Logo */}
          <a href="/" className="logo" title="Volver a la página de inicio">
            <img src="/assets/img/logo_header.png" alt="Alvarez Logo" />
          </a>

          {/* Overlay mobile */}
          <div className={`overlay ${open ? "show" : ""}`} onClick={closeMenu}></div>

          {/* Navegación */}
          <nav
            ref={navRef}
            className={`navegacion ${open ? "show" : "hide"}`}
            aria-hidden={!open}
          >
            {/* Logo dentro del menú (mobile) */}
            <a href="/" className="logo noneFlex logo-burguer" title="Inicio">
              <img src="/assets/img/logo_horizontal.png" alt="Alvarez Logo" />
            </a>

            {/* Cerrar menú (mobile) */}
            <button className="menu-close" onClick={closeMenu} aria-label="Cerrar menú">
              X
            </button>

            <div className="links-header">
              <a className="navegacion-enlace" href="/">Inicio</a>
              <a className="navegacion-enlace" href="/proyectos">Proyectos</a>
              <a className="navegacion-enlace" href="#sobre-nosotros">Sobre Nosotros</a>
              <a className="navegacion-enlace" href="#contacto" title="Contacto">Contacto</a>
            </div>

            {/* Iniciar sesión al final en mobile */}
            <div id="iniciarSesion">
              <a id="link-sesion" className="iniciar-sesion-icono" href="/login" title="Iniciar sesión">
                {/* Si querés usar FontAwesome, agrega su <link> en index.html; por ahora dejo el texto. */}
                <span style={{color:"#154ea2"}}>Iniciar sesión</span>
              </a>
            </div>
          </nav>

          {/* Icono login en desktop */}
          <div className="flex iconos-header">
            <a href="/login" className="iniciar-sesion-icono" title="Iniciar sesión">
              {/* <i className="fas fa-user"></i> ← si usás FA, agregalo en index.html */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#154ea2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
