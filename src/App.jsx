import Header from "./components/Header"; // 👈 importa tu componente
import Footer from "./components/Footer";
import Nosotros from "./components/Nosotros";
import Servicios from "./components/Servicios";
import Contacto from "./components/Contacto";
import "./App.css"; // podés dejar este archivo para estilos globales

function App() {
  return (
    <>
      <Header />   
      <main>
        <h1>Bienvenido a Alvarez</h1>
        <p>Este es el inicio de la página.</p>
        <Nosotros /> 
        <Servicios /> 
        <Contacto /> 
      </main>

       <Footer />
    </>
  );
}

export default App;
