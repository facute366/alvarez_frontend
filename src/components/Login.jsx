import { useState } from 'react';
import '../styles/login.css';
import Swal from 'sweetalert2';

export default function Login() {
  const [formData, setFormData] = useState({
    usuario: '',
    clave: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

// Reemplaza solo esta función dentro de src/components/Login.jsx
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validaciones básicas
  const usuario = formData.usuario.trim();
  const clave = formData.clave.trim();

  if (!usuario || !clave) {
    Swal.fire({
      icon: 'warning',
      title: '¡Campos vacíos!',
      text: 'Por favor, completa todos los campos.',
      confirmButtonColor: '#154ea2',
      background: '#ffffff',
      color: '#333'
    });
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch('https://alvarez-back.vercel.app/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // El backend espera { usuario, password } igual que MCL
      body: JSON.stringify({ usuario, password: clave })
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data?.token) {
      // Guardar token y estado de sesión (igual que en MCL)
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('loggedIn', 'true');

      await Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Inicio de sesión exitoso',
        confirmButtonColor: '#154ea2',
        background: '#ffffff',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false
      });

      // Redirección: ajustá la ruta según tu router.
      // Tengo en cuenta que tenés ProyectosAdmin.jsx
      window.location.href = '/admin';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: data?.error || 'Usuario o contraseña incorrectos',
        confirmButtonColor: '#154ea2',
        background: '#ffffff',
        color: '#333'
      });
    }
  } catch (error) {
    console.error('Error durante el login:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error del servidor',
      text: 'Ha ocurrido un error. Inténtalo nuevamente.',
      confirmButtonColor: '#154ea2',
      background: '#ffffff',
      color: '#333'
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          {/* Header del formulario */}
          <div className="login-header">
            <div className="login-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#154ea2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h1 className="login-title">Iniciar Sesión</h1>
            <p className="login-subtitle">Accede a tu cuenta</p>
          </div>

          {/* Formulario */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="usuario" className="form-label">Usuario</label>
              <div className="input-wrapper">
                <svg
                  className="input-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                </svg>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ingresa tu usuario"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="clave" className="form-label">Contraseña</label>
              <div className="input-wrapper">
                <svg
                  className="input-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <circle cx="12" cy="16" r="1" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  id="clave"
                  name="clave"
                  value={formData.clave}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ingresa tu contraseña"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Footer del formulario */}
          <div className="login-footer">
            <a href="/" className="back-link">
              ← Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helpers de sesión (pueden vivir aquí mismo) ---
export const isLoggedIn = () =>
  localStorage.getItem('loggedIn') === 'true' &&
  !!localStorage.getItem('authToken');

// Hook para proteger /admin (definido acá, reutilizado allá)
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAdminGuard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === '/admin' && !isLoggedIn()) {
      navigate('/sesion', { replace: true });
    }
  }, [navigate]);
}