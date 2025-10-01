import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nosotros from "./components/Nosotros";
import Servicios from "./components/Servicios";
import ProyectosRealizados from "./components/ProyectosRealizados";
import BeneficiosConstruccion from './components/BeneficiosConstruccion';
import Contacto from "./components/Contacto";
import Proyectos from "./components/Proyectos";
import ProyectosAdmin from './components/ProyectosAdmin';
import Login from './components/Login';
import "./App.css";
import CarruselAdmin from './components/CarruselAdmin';

function HomePage() {
  return (
    <main>
      <h1>Bienvenido a Alvarez</h1>
      <p>Este es el inicio de la página.</p>
      <Nosotros />
      <Servicios />
      <ProyectosRealizados />
      <BeneficiosConstruccion />
      <Contacto />
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/admin" element={<ProyectosAdmin />} />
              <Route path="/carrusel-admin" element={<CarruselAdmin />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;