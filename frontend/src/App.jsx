import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

// Lazy loading the pages to split the code and improve load speed
const Home = React.lazy(() => import('./pages/Home'));
const Cotizacion = React.lazy(() => import('./pages/Cotizacion'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Cabinas = React.lazy(() => import('./pages/Cabinas'));
const Blog = React.lazy(() => import('./pages/Blog'));
const ReservaExitosa = React.lazy(() => import('./pages/ReservaExitosa'));
const ReservaFallida = React.lazy(() => import('./pages/ReservaFallida'));
const TerminosCondiciones = React.lazy(() => import('./pages/TerminosCondiciones'));
const PoliticasCancelacion = React.lazy(() => import('./pages/PoliticasCancelacion'));
const Paquetes = React.lazy(() => import('./pages/Paquetes'));
const Contacto = React.lazy(() => import('./pages/Contacto'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// A simple loading spinner component to show while the chunk downloads
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center font-body text-brand-cyan">
      <div className="w-12 h-12 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 animate-pulse uppercase tracking-widest font-bold">Cargando...</p>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Global fix for keyboard scrolling when user-select: none prevents native focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy({ top: 60, left: 0, behavior: 'auto' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy({ top: -60, left: 0, behavior: 'auto' });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}



function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-brand-dark flex flex-col font-body">
        <Navbar />

        <main className="flex-grow pt-[60px]">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/compra-tu-cabina" element={<Cabinas />} />
              <Route path="/cotizacion" element={<Cotizacion />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/paquetes" element={<Paquetes />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/reserva-exitosa" element={<ReservaExitosa />} />
              <Route path="/reserva-fallida" element={<ReservaFallida />} />
              <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
              <Route path="/politicas-cancelacion" element={<PoliticasCancelacion />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

      </div>
    </Router>
  );
}

export default App;
