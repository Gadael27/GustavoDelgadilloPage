import { Headphones, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="border-t border-white/5 pt-15 pb-10 grid grid-cols-1 md:grid-cols-5 gap-10 items-start px-4 md:px-8 max-w-7xl mx-auto w-full">
        
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5 select-none">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-brand-pink)] to-[var(--color-brand-cyan)] flex items-center justify-center">
              <Headphones size={20} color="#fff" />
            </div>
            <span className="font-cyber text-2xl text-white">GD PRODUCCIONES</span>
          </div>
          <p className="text-[#666] leading-relaxed text-[0.95rem] max-w-[300px]">
            Transformamos eventos en experiencias audiovisuales inolvidables. 
            CDMX y toda la República Mexicana.
          </p>
        </div>

        <div>
          <h4 className="text-white text-[0.9rem] tracking-[2px] mb-5 uppercase font-bold">Navegación</h4>
          {['Inicio', 'Galería', 'Sets', 'Paquetes'].map(item => {
            const anchor = item === 'Paquetes' ? 'servicios' : item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return (
              <a key={item} href={`/#${anchor}`} className="block text-[#666] no-underline mb-3 text-[0.9rem] transition-colors duration-300 hover:text-[var(--color-brand-pink)]">
                {item}
              </a>
            );
          })}
        </div>

        <div>
          <h4 className="text-white text-[0.9rem] tracking-[2px] mb-5 uppercase font-bold">Legal</h4>
          <Link to="/terminos-condiciones" className="block text-[#666] no-underline mb-3 text-[0.9rem] transition-colors duration-300 hover:text-[var(--color-brand-pink)]">
            Términos y condiciones
          </Link>
          <Link to="/politicas-cancelacion" className="block text-[#666] no-underline mb-3 text-[0.9rem] transition-colors duration-300 hover:text-[var(--color-brand-pink)]">
            Políticas de Cancelación
          </Link>
        </div>

        <div>
          <h4 className="text-white text-[0.9rem] tracking-[2px] mb-5 uppercase font-bold">Síguenos</h4>
          <div className="flex gap-3">
            
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-[var(--color-brand-pink)] hover:border-[var(--color-brand-pink)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            
            <a href="https://www.instagram.com/djgusdelgadillo/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-[var(--color-brand-cyan)] hover:border-[var(--color-brand-cyan)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
      </footer>

      <div className="text-center py-8 border-t border-white/5 select-none">
        <p className="text-[#444] text-[0.85rem] flex items-center justify-center gap-2 m-0">
          <ShieldCheck size={16} color="#25d366" /> 
          Pagos seguros • Leads protegidos en Firebase Firestore • GD Producciones © {new Date().getFullYear()}
        </p>
      </div>
    </>
  );
}
