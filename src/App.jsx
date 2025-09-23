import Header from "./components/Header"; // 👈 importa tu componente
import Footer from "./components/Footer";
import "./App.css"; // podés dejar este archivo para estilos globales

function App() {
  return (
    <>
      <Header />   {/* 👈 mostramos el header */}
      <main>
        <h1>Bienvenido a Alvarez</h1>
        <p>Este es el inicio de la página.</p>
      </main>

       <Footer />
    </>
  );
}

export default App;
