import { useState } from "react";
import "../styles/header.css";
import { Link } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="/assets/img/logo_horizontal-removebg.png" alt="Alvarez" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/proyectos" className="nav-link">Proyectos</Link>
          <a href="#sobre-nosotros" className="nav-link">Nosotros</a>
          <a href="#contacto" className="nav-link">Contacto</a>
        </nav>

        {/* User Icon */}
        <Link to="/login" className="user-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M4 21v-2a4 4 0 0 1 3-3.87"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </Link>

        {/* Mobile Menu Button */}
        <button className="menu-btn" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <nav className={`nav-mobile ${open ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Inicio</Link>
          <Link to="/proyectos" className="nav-link" onClick={closeMenu}>Proyectos</Link>
          <a href="#sobre-nosotros" className="nav-link" onClick={closeMenu}>Nosotros</a>
          <a href="#contacto" className="nav-link" onClick={closeMenu}>Contacto</a>
          <Link to="/login" className="nav-link" onClick={closeMenu}>Iniciar Sesión</Link>
        </nav>

        {/* Mobile Overlay */}
        {open && <div className="overlay" onClick={closeMenu}></div>}
      </div>
    </header>
  );
}