import { useState } from "react";
import "../styles/header.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, scroller } from 'react-scroll';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const isAdmin =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/carrusel-admin");

  // 👉 función para hacer scroll suave incluso si estás en otra ruta
  const goTo = (id) => {
    const opts = { smooth: true, duration: 600, offset: -80 };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scroller.scrollTo(id, opts), 100);
    } else {
      scroller.scrollTo(id, opts);
    }

    closeMenu();
  };

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="/assets/img/logo_horizontal-removebg.png" alt="Alvarez" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          {isAdmin ? (
            <>
              <Link to="/" className="nav-link">Inicio</Link>
              <Link to="/admin" className="nav-link">Proyectos</Link>
              <Link to="/carrusel-admin" className="nav-link">Carrusel</Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Inicio</Link>
              <ScrollLink to="sobre-nosotros" smooth duration={600} offset={-80} className="nav-link">
                Nosotros
              </ScrollLink>
              <Link to="/proyectos" className="nav-link">Proyectos</Link>
              <ScrollLink to="beneficios" smooth duration={600} offset={-80} className="nav-link">
                Beneficios
              </ScrollLink>
              <ScrollLink to="contacto" smooth duration={600} offset={-80} className="nav-link">
                Contacto
              </ScrollLink>
            </>
          )}
        </nav>

        {/* User Icon (solo en público) */}
        {!isAdmin && (
          <Link to="/login" className="user-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button className="menu-btn" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* ✅ Mobile Menu con scroll suave */}
        <nav className={`nav-mobile ${open ? 'open' : ''}`}>
          {isAdmin ? (
            <>
              <Link to="/" className="nav-link" onClick={closeMenu}>Inicio</Link>
              <Link to="/admin" className="nav-link" onClick={closeMenu}>Proyectos</Link>
              <Link to="/carrusel-admin" className="nav-link" onClick={closeMenu}>Carrusel</Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link" onClick={closeMenu}>Inicio</Link>
              <button type="button" className="nav-link" onClick={() => goTo('sobre-nosotros')}>
                Nosotros
              </button>
              <Link to="/proyectos" className="nav-link" onClick={closeMenu}>Proyectos</Link>
              <button type="button" className="nav-link" onClick={() => goTo('beneficios')}>
                Beneficios
              </button>
              <button type="button" className="nav-link" onClick={() => goTo('contacto')}>
                Contacto
              </button>
              <Link to="/login" className="nav-link" onClick={closeMenu}>Iniciar Sesión</Link>
            </>
          )}
        </nav>

        {/* Mobile Overlay */}
        {open && <div className="overlay" onClick={closeMenu}></div>}
      </div>
    </header>
  );
}
