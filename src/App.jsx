import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nosotros from "./components/Nosotros";
import Servicios from "./components/Servicios";
import ProyectosRealizados from "./components/ProyectosRealizados";
import BeneficiosConstruccion from './components/BeneficiosConstruccion';
import Contacto from "./components/Contacto";
import Proyectos from "./components/Proyectos";
import "./App.css";

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
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/proyectos" element={<Proyectos />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;