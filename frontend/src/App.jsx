import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cotizacion from './pages/Cotizacion';
import Navbar from './components/Navbar';
import SmokeSparksCanvas from './components/SmokeSparksCanvas';


function App() {
  return (
    // Router envuelve toda la aplicación
    <Router>
      <div className="min-h-screen bg-brand-dark flex flex-col font-body">
        
        {/* Efectos globales y Navbar siempre visibles */}
        <SmokeSparksCanvas />
        <Navbar />

        {/* El padding top compensa la Navbar fija para que el contenido no quede debajo */}
        <main className="flex-grow pt-[60px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compra-tu-cabina" element={<div className="p-24 text-center text-white">Página de Cabinas...</div>} />
            <Route path="/cotizacion" element={<Cotizacion />} />
            <Route path="/admin" element={<div className="p-24 text-center text-white">Panel de Control...</div>} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;