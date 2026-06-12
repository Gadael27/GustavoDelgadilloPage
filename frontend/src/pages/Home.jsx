import React, { useState } from 'react';
import { 
  Truck, ArrowRight, ShieldCheck, Play, Sparkles, 
  Music, Zap, Disc, Headphones, Star, MapPin, 
  ChevronRight, Volume2, PartyPopper
} from 'lucide-react';
import Galeria from '../components/Galeria';

// Importaciones comentadas para tu entorno real
// import heroBackground from '../assets/hero.png';
// import showLasers from '../assets/40e7af3d-94f8-418e-bfe0-6e7f11e86996.jpg';
// import escenarioGalactus from '../assets/Cabina DJ Blanca Diamante Frente.jpeg';
// import cabinaDenonPista from '../assets/AE69E51A-CF1E-409E-8899-B4E2D45FB79F.jpg';
// import consolaCloseup from '../assets/BB8F1BA0-38B6-4B43-8F62-B3A346AB7D5C.jpg';

// URLs de reemplazo para previsualización
const heroBackground = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop';
const showLasers = 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=800&auto=format&fit=crop';
const escenarioGalactus = 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800&auto=format&fit=crop';
const cabinaDenonPista = 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=800&auto=format&fit=crop';
const consolaCloseup = 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=800&auto=format&fit=crop';

const BotonPrimario = ({ texto, onClick, icono }) => (
  <button 
    onClick={onClick}
    className="bg-gradient-to-r from-brand-pink to-[#bd00ff] text-white px-9 py-4 rounded-full text-lg font-extrabold flex items-center gap-2 shadow-[0_10px_30px_rgba(255,0,127,0.4)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_40px_rgba(255,0,127,0.6)] transition-all duration-300 tracking-wide cursor-pointer border-none"
  >
    {texto} {icono}
  </button>
);

const BotonSecundario = ({ texto, onClick, icono }) => (
  <button 
    onClick={onClick}
    className="bg-white/5 text-white border border-white/20 px-9 py-4 rounded-full text-lg font-semibold flex items-center gap-2 backdrop-blur-md hover:bg-white/10 hover:border-white transition-all duration-300 cursor-pointer"
  >
    {icono} {texto}
  </button>
);

const TituloSeccion = ({ texto1, textoResaltado, colorResalte = "text-brand-pink" }) => (
  <h2 className="font-cyber text-4xl md:text-5xl mb-4 text-center">
    {texto1} <span className={colorResalte}>{textoResaltado}</span>
  </h2>
);

export default function Home() {
  const [activeGenre, setActiveGenre] = useState('reggaeton');

  // Funciones de utilidad
  const irACotizar = (tipoPaquete) => {
    // Usaremos React Router en el futuro, por ahora mantenemos window.location
    window.location.href = `/cotizacion?paquete=${tipoPaquete}`;
  };

  const abrirWhatsApp = () => {
    const tuNumeroWhatsapp = "525567880698"; 
    const mensaje = encodeURIComponent("¡Hola, GD Producciones! Me interesa cotizar un evento.");
    window.open(`https://wa.me/${tuNumeroWhatsapp}?text=${mensaje}`, '_blank');
  };

  const genres = [
    { id: 'reggaeton', name: 'Reggaetón', icon: <Music size={16} />, color: 'text-brand-pink', bg: 'bg-brand-pink', border: 'border-brand-pink', shadow: 'shadow-brand-pink' },
    { id: 'electronic', name: 'Electrónica', icon: <Zap size={16} />, color: 'text-brand-cyan', bg: 'bg-brand-cyan', border: 'border-brand-cyan', shadow: 'shadow-brand-cyan' },
    { id: 'cumbia', name: 'Cumbia/Banda', icon: <Disc size={16} />, color: 'text-brand-yellow', bg: 'bg-brand-yellow', border: 'border-brand-yellow', shadow: 'shadow-brand-yellow' },
    { id: 'open', name: 'Formato Abierto', icon: <Sparkles size={16} />, color: 'text-[#bd00ff]', bg: 'bg-[#bd00ff]', border: 'border-[#bd00ff]', shadow: 'shadow-[#bd00ff]' },
  ];

  return (
    <div className="bg-brand-dark text-white min-h-screen font-body overflow-x-hidden relative">
      
      {/* Botón Flotante de WhatsApp Componentizado */}
      <button 
        onClick={abrirWhatsApp}
        className="fixed bottom-8 right-8 bg-[#25d366] w-16 h-16 rounded-full flex items-center justify-center z-50 cursor-pointer shadow-lg hover:scale-110 hover:-translate-y-1 transition-transform duration-300 border-none [animation:waPulseNeon_2.5s_infinite]"
        title="Contactar por WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </button>

      {}
      <section id="inicio" className="relative min-h-screen flex items-center px-5 py-24 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `linear-gradient(to bottom, rgba(3,3,12,0.3) 0%, rgba(3,3,12,0.7) 50%, #03030c 100%), url(${heroBackground})` }}>
        
        {/* Efectos Láser de fondo (Usan CSS puro desde index.css) */}
        <div className="laser-beam top-[30%] bg-gradient-to-r from-transparent via-brand-cyan to-transparent" />
        <div className="laser-beam top-[60%] [animation-delay:4s] bg-gradient-to-r from-transparent via-brand-pink to-transparent" />
        
        <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Textos del Hero */}
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-pink/10 border border-brand-pink/30 px-5 py-2.5 rounded-full mb-4 text-sm font-bold tracking-widest backdrop-blur-sm">
              <Sparkles size={14} className="text-brand-yellow" /> FORMATO ABIERTO • MEZCLA EN VIVO
            </div>
            
            <h2 className="font-cyber text-3xl text-brand-cyan tracking-wide uppercase mb-2">
              Gustavo Delgadillo - DJ
            </h2>
            
            <h1 className="font-cyber text-6xl md:text-[5.5rem] leading-none mb-0 text-white drop-shadow-[0_0_40px_rgba(255,0,127,0.5)] glitch-hover cursor-default">
              LA FIESTA<br />
              <span className="text-brand-pink">NO PARA</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-lg my-6 leading-relaxed font-light">
              Bodas, XV años y eventos corporativos que nadie olvida. 
              Producción audiovisual masiva, consolas HiFi e iluminación robótica sincronizada.
            </p>
            
            {/* Usando los componentes de botones limpios */}
            <div className="flex flex-wrap gap-4 mt-8">
              <BotonPrimario 
                texto="COTIZAR MI EVENTO" 
                icono={<ArrowRight size={20} />} 
                onClick={() => irACotizar('Base')} 
              />
              <BotonSecundario 
                texto="WHATSAPP" 
                icono={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>} 
                onClick={abrirWhatsApp} 
              />
            </div>
          </div>

          {}
          <div className="hidden md:flex relative justify-center">
            {/* Vinil Girando */}
            <div className="w-80 h-80 rounded-full bg-[conic-gradient(from_0deg,#ff007f,#00f2fe,#ffeb3b,#ff007f)] p-1 shadow-[0_0_60px_rgba(255,0,127,0.3)] relative">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center relative overflow-hidden [animation:spin_8s_linear_infinite]"
                style={{ backgroundImage: `url(${escenarioGalactus})` }}
              >
                <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_center,transparent_0,transparent_10px,rgba(0,0,0,0.3)_10px,rgba(0,0,0,0.3)_12px)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-brand-dark border-2 border-white/20 flex items-center justify-center">
                  <Disc size={32} className="text-brand-pink" />
                </div>
              </div>
            </div>
            
            {/* Tarjetas flotantes */}
            <div className="absolute top-5 right-0 bg-brand-card/80 backdrop-blur-md border border-brand-cyan/30 rounded-2xl p-4 shadow-2xl">
              <div className="text-3xl font-extrabold text-brand-cyan">500+</div>
              <div className="text-xs text-gray-400">Eventos realizados</div>
            </div>
            
            <div className="absolute bottom-10 left-0 bg-brand-card/80 backdrop-blur-md border border-brand-pink/30 rounded-2xl p-4 shadow-2xl">
              <div className="text-3xl font-extrabold text-brand-pink">10+</div>
              <div className="text-xs text-gray-400">Años de experiencia</div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="max-w-6xl mx-auto px-5 py-24">
        <TituloSeccion texto1="¿QUÉ SUENA EN TU" textoResaltado="FIESTA?" colorResalte="text-brand-pink" />
        <p className="text-gray-400 text-lg text-center mb-12">
          Selecciona un género y descubre cómo transformamos la pista
        </p>

        {/* Botones de Géneros */}
        <div className="flex gap-3 justify-center flex-wrap mb-12">
          {genres.map(g => {
            const isActive = activeGenre === g.id;
            return (
              <button 
                key={g.id}
                onClick={() => setActiveGenre(g.id)}
                className={`px-5 py-2.5 rounded-full cursor-pointer flex items-center gap-2 font-semibold text-sm transition-all duration-300 border
                  ${isActive 
                    ? `${g.color} ${g.bg}/10 ${g.border} shadow-[0_0_20px_rgba(var(--tw-shadow-color),0.2)] ${g.shadow}` 
                    : 'text-gray-400 bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
              >
                {g.icon} {g.name}
              </button>
            )
          })}
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-brand-card to-[#0d0d2a] rounded-3xl p-10 border border-white/5 shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Volume2 size={24} className={genres.find(g => g.id === activeGenre)?.color} />
              <span className={`font-bold text-sm tracking-widest uppercase ${genres.find(g => g.id === activeGenre)?.color}`}>
                Reproduciendo ahora
              </span>
            </div>
            
            <h3 className="font-cyber text-4xl mb-4">
              {genres.find(g => g.id === activeGenre)?.name.toUpperCase()}
            </h3>
            
            <p className="text-gray-400 leading-relaxed text-lg mb-6">
              {activeGenre === 'reggaeton' && "Desde el clásico hasta el perreo intenso. Transiciones perfectas que mantienen la pista prendida toda la noche."}
              {activeGenre === 'electronic' && "House, Techno, EDM y Progressive. Beats que elevan la energía y crean momentos épicos en la pista."}
              {activeGenre === 'cumbia' && "La esencia mexicana con toques modernos. Cumbia rebajada, sonidera y banda para todos los gustos."}
              {activeGenre === 'open' && "¿Por qué elegir uno solo? Mezclamos TODO en vivo. Del reggaetón al rock en segundos sin cortes abruptos."}
            </p>
          </div>
          
          <div className={`rounded-2xl overflow-hidden h-72 border-2 ${genres.find(g => g.id === activeGenre)?.border}/40 shadow-2xl`}>
             <img 
                src={activeGenre === 'electronic' ? showLasers : activeGenre === 'cumbia' ? escenarioGalactus : cabinaDenonPista} 
                alt="DJ en acción" 
                className="w-full h-full object-cover transition-all duration-500 hover:scale-110 hover:saturate-150"
              />
          </div>
        </div>
      </section>
    <Galeria/>
      {}
      <footer className="border-t border-white/5 py-12 mt-20 text-center">
        <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
          <ShieldCheck size={16} className="text-[#25d366]" /> 
          Pagos seguros • GD Producciones © {new Date().getFullYear()}
        </p>
 
      </footer>

    </div>
  );
}