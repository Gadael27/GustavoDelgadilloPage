import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Store, BookOpen, Home, Settings, Menu, X } from 'lucide-react';

// URL temporal para el logo mientras conectas tus assets locales
const miLogoOfficial = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  
  // Usamos el hook de React Router en lugar de window.location
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 990);
      if (window.innerWidth > 990) setIsMobileMenuOpen(false);
    };
    const handleScroll = () => setScrolled(window.scrollY > 30);
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navegar = (ruta) => {
    navigate(ruta);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'inicio', label: 'Inicio', icon: <Home size={15} />, route: '/', color: 'text-brand-pink', hex: '#ff007f', glow: 'rgba(255,0,127,0.4)' },
    { id: 'cabina', label: 'Compra tu Mesa de DJ', icon: <Store size={15} />, route: '/compra-tu-cabina', color: 'text-brand-yellow', hex: '#ffeb3b', glow: 'rgba(255,235,59,0.4)' },
    { id: 'blog', label: 'Blog GD', icon: <BookOpen size={15} />, route: '/blog', color: 'text-brand-cyan', hex: '#00f2fe', glow: 'rgba(0,242,254,0.4)' },
  ];

  return (
    <>
      {/* NAVBAR PRINCIPAL */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 box-border flex justify-between items-center ${isMobile ? 'px-4 py-2.5' : 'px-10 py-3.5'} ${scrolled ? 'bg-brand-dark/95 backdrop-blur-xl border-b border-brand-cyan/30 shadow-[0_8px_40px_rgba(0,0,0,0.5)]' : 'bg-brand-dark/75 backdrop-blur-md border-b border-brand-cyan/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'}`}>
        
        {/* LADO IZQUIERDO: REDES + LOGO */}
        <div className={`flex items-center ${isMobile ? 'gap-2.5' : 'gap-5'}`}>
          
          {/* Redes Sociales con hover neón */}
          <div className="flex items-center gap-3 border-r border-[#141435] pr-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" 
               className="text-[#888] flex items-center transition-all duration-300 p-1.5 rounded-lg hover:text-brand-cyan hover:bg-brand-cyan/10 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" 
               className="text-[#888] flex items-center transition-all duration-300 p-1.5 rounded-lg hover:text-brand-pink hover:bg-brand-pink/10 hover:shadow-[0_0_15px_rgba(255,0,127,0.3)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>

          {/* Logo con efecto flotante y glow */}
          <div onClick={() => navegar('/')} className="flex items-center gap-3 cursor-pointer transition-all duration-300 [animation:float_3s_ease-in-out_infinite] hover:[animation:none] hover:scale-105">
            <div className={`rounded-full overflow-hidden border-2 border-brand-cyan bg-white p-[2px] flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,242,254,0.4),0_0_40px_rgba(0,242,254,0.1)] ${isMobile ? 'w-9 h-9' : 'w-10 h-10'}`}>
              <img src={miLogoOfficial} alt="Logo GD" className="w-full h-full object-contain rounded-full" />
            </div>
            {!isMobile && (
              <div className="text-white font-cyber text-2xl tracking-[2px] drop-shadow-[0_0_20px_rgba(255,0,127,0.5)] flex items-center gap-2">
                GD <span className="text-brand-pink">PRODUCCIONES</span>
                {/* Mini equalizer animado */}
                <div className="flex gap-[2px] h-4 items-end ml-1">
                  <div className="eq-bar-nav" />
                  <div className="eq-bar-nav" />
                  <div className="eq-bar-nav" />
                  <div className="eq-bar-nav" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* LADO DERECHO: LINKS + ACCIONES */}
        <div className={`flex items-center ${isMobile ? 'gap-2.5' : 'gap-6'}`}>
          
          {/* Links de navegación desktop */}
          {!isMobile && (
            <div className="flex items-center gap-2">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => navegar(link.route)}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`nav-link-item flex items-center gap-2 font-body text-[0.85rem] font-semibold px-4 py-2 rounded-full transition-all duration-300 uppercase tracking-widest cursor-pointer ${hoveredLink === link.id ? link.color : 'text-[#bbb]'}`}
                  style={{ color: hoveredLink === link.id ? link.hex : '#bbb' }}
                >
                  <span style={{ 
                    color: link.hex, 
                    filter: hoveredLink === link.id ? `drop-shadow(0 0 8px ${link.glow})` : 'none',
                    transition: 'all 0.3s ease'
                  }}>
                    {link.icon}
                  </span>
                  {link.label}
                </button>
              ))}
            </div>
          )}

          {/* Área de acciones */}
          <div className="flex items-center gap-3">
            
            {/* Botón RESERVAR con efecto neón pulsante */}
            <button 
              onClick={() => navegar('/cotizacion')} 
              className={`relative overflow-hidden bg-gradient-to-br from-brand-pink to-[#bd00ff] border-none rounded-full text-white cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 font-extrabold font-body tracking-widest uppercase shadow-[0_4px_20px_rgba(255,0,127,0.4)] hover:-translate-y-[2px] hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,0,127,0.6),0_0_40px_rgba(189,0,255,0.3)] ${isMobile ? 'px-4 py-2 text-[0.75rem]' : 'px-6 py-2.5 text-[0.85rem]'}`}
            >
              <Calendar size={isMobile ? 14 : 15} className="[animation:neonFlicker_2s_infinite]" />
              {isMobile ? 'RESERVAR' : 'RESERVAR FECHA'}
            </button>

            {/* Panel Admin con glow sutil */}
            <div 
              onClick={() => navegar('/admin')}
              className={`rounded-xl bg-brand-card/80 border border-brand-pink/30 flex items-center justify-center text-brand-pink cursor-pointer transition-all duration-300 box-border backdrop-blur-md hover:border-brand-pink hover:shadow-[0_0_20px_rgba(255,0,127,0.5),inset_0_0_10px_rgba(255,0,127,0.1)] hover:rotate-90 ${isMobile ? 'w-9 h-9' : 'w-10 h-10'}`}
              title="Panel de Control Interno"
            >
              <Settings size={isMobile ? 16 : 18} />
            </div>

            {/* Hamburguesa móvil con animación */}
            {isMobile && (
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="bg-transparent border border-brand-cyan/30 rounded-lg text-brand-cyan cursor-pointer flex items-center justify-center w-9 h-9 p-1.5 transition-all duration-300 hover:bg-brand-cyan/10 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)]"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* MENÚ MÓVIL FULLSCREEN CON EFECTO GLASSMORPHISM */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-enter fixed top-[56px] left-0 w-full h-[calc(100vh-56px)] bg-brand-dark/98 z-[999] px-6 py-8 flex flex-col gap-2 font-body border-t border-brand-cyan/20 box-border backdrop-blur-xl">
          {/* Header del menú móvil */}
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/5">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-cyan bg-white p-[2px]">
              <img src={miLogoOfficial} alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div className="font-cyber text-xl text-white tracking-[2px]">
              GD <span className="text-brand-pink">PRODUCCIONES</span>
            </div>
          </div>

          {/* Links móviles con efectos */}
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => navegar(link.route)}
              className="bg-transparent border-none text-white flex items-center gap-4 text-left cursor-pointer px-5 py-4 rounded-2xl text-[1.1rem] font-bold font-body transition-all duration-300 border-l-[3px] border-transparent uppercase tracking-widest hover:pl-7"
              style={{
                '--hover-bg': `linear-gradient(90deg, ${link.hex}15, transparent)`,
                '--hover-border': link.hex,
                '--hover-shadow': `0 0 30px ${link.glow}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(90deg, ${link.hex}15, transparent)`;
                e.currentTarget.style.borderLeftColor = link.hex;
                e.currentTarget.style.boxShadow = `0 0 30px ${link.glow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderLeftColor = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ color: link.hex, filter: `drop-shadow(0 0 8px ${link.glow})` }}>
                {React.cloneElement(link.icon, { size: 24 })}
              </span>
              {link.label}
            </button>
          ))}

          {/* Separador decorativo */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent my-4" />

          {/* Botón de reserva destacado en móvil */}
          <button 
            onClick={() => navegar('/cotizacion')}
            className="bg-gradient-to-br from-brand-pink to-[#bd00ff] border-none text-white py-4 px-6 rounded-2xl text-[1.1rem] font-extrabold flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_8px_30px_rgba(255,0,127,0.4)] uppercase tracking-[2px] mt-2.5"
          >
            <Calendar size={22} />
            RESERVAR FECHA
          </button>

          {/* Footer del menú móvil */}
          <div className="mt-auto pt-5 text-center text-[#555] text-[0.75rem] tracking-[2px] uppercase">
            <div className="flex justify-center gap-[6px] mb-2.5">
              <div className="eq-bar-nav" style={{ animationDuration: '0.5s' }} />
              <div className="eq-bar-nav" style={{ animationDuration: '0.7s' }} />
              <div className="eq-bar-nav" style={{ animationDuration: '0.4s' }} />
              <div className="eq-bar-nav" style={{ animationDuration: '0.6s' }} />
              <div className="eq-bar-nav" style={{ animationDuration: '0.8s' }} />
            </div>
            La fiesta no para
          </div>
        </div>
      )}
    </>
  );
}