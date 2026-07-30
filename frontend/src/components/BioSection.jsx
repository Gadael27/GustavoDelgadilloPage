import React from 'react';
import { Music, Star, Disc3 } from 'lucide-react';
import gusFoto1 from '../assets/GD/Gus_Foto_1.jpeg';
import gusFoto2 from '../assets/GD/Gus_Foto_2.jpeg';
import logoGDByN from '../assets/GD/Logo_GD_ByN.jpeg';

export default function BioSection() {
  return (
    <section className="py-20 relative z-10 font-body" id="bio">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent"></div>
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
        
        {/* Lado de las imágenes */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative h-[450px] md:h-[600px] w-full max-w-[500px] mx-auto">
            {/* Foto principal (Fondo) */}
            <div className="absolute top-0 right-0 w-[75%] h-[80%] rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] z-10">
              <img src={gusFoto2} alt="Gustavo Delgadillo DJ" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none"></div>
            </div>
            
            {/* Foto secundaria (Frente) */}
            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-2xl overflow-hidden border-4 border-brand-dark shadow-[0_0_40px_rgba(0,242,254,0.3)] z-20">
              <img src={gusFoto1} alt="DJ Gus Delgadillo en vivo" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink/20 to-transparent pointer-events-none mix-blend-overlay"></div>
            </div>
            
            {/* Elemento decorativo */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-pink/20 rounded-full blur-[40px] -z-10"></div>
            <div className="absolute top-10 -left-10 w-40 h-40 bg-brand-cyan/20 rounded-full blur-[50px] -z-10"></div>
          </div>
        </div>

        {/* Lado del texto */}
        <div className="w-full lg:w-1/2 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 mb-6">
            <Star size={16} className="text-brand-cyan" />
            <span className="text-brand-cyan font-bold tracking-widest text-xs uppercase">El DJ Detrás de la Fiesta</span>
          </div>
          
          <div className="mb-8 relative max-w-[400px]">
            <img src={logoGDByN} alt="Gustavo Delgadillo Logo" className="w-full h-auto mix-blend-screen opacity-90 transition-all duration-500 hover:opacity-100 hover:scale-[1.02]" style={{ filter: 'drop-shadow(0 0 20px rgba(0,242,254,0.4))' }} />
          </div>
          
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl font-light">
            Con años de trayectoria transformando eventos en la Ciudad de México y toda la República. 
            Mi misión es entender la vibra de tus invitados y llevarla al máximo nivel con mezclas dinámicas, 
            energía inagotable y un formato abierto que garantiza que nadie se quede sentado.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-brand-pink/20 flex items-center justify-center flex-shrink-0">
                <Music className="text-brand-pink" size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Open Format</h4>
                <p className="text-gray-400 text-sm">Desde electrónica hasta reguetón, pasando por cumbia y rock. Lectura de pista perfecta.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-brand-cyan/20 flex items-center justify-center flex-shrink-0">
                <Disc3 className="text-brand-cyan" size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Mezcla en Vivo</h4>
                <p className="text-gray-400 text-sm">Transiciones impecables y Mashups exclusivos en tiempo real para una fiesta sin pausas.</p>
              </div>
            </div>
          </div>
          
          <a href="/paquetes" className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-pink to-[#bd00ff] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,0,127,0.4)]">
            Ver Paquetes
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
