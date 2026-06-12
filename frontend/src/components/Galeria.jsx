import React from 'react';
import { Play, Sparkles, Music, Zap } from 'lucide-react';

export default function Galeria() {
  // URLs temporales (placeholders) para que veas el diseño sin errores.
  const placeholders = {
    videoShow: 'https://cdn.pixabay.com/video/2020/05/24/40092-424754336_tiny.mp4',
    consola: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=800',
    jardin: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800',
    exterior2: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800',
    videoBailando: 'https://cdn.pixabay.com/video/2016/11/22/6462-192569562_tiny.mp4',
    exterior3: 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=800',
    cabina: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=800'
  };

  return (
    <div id="galeria" className="max-w-6xl mx-auto px-5 mb-24">
      {/* Encabezado */}
      <div className="text-center mb-12">
        <h2 className="font-cyber text-4xl md:text-5xl m-0">
          ASÍ SE VIVE LA <span className="text-brand-cyan">ENERGÍA</span>
        </h2>
        <p className="text-gray-400 mt-3 text-lg">
          Producciones reales. Pistas llenas. Momentos épicos.
        </p>
      </div>

      {/* Grid Masonry con Tailwind */}
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] gap-5">
        
        {/* 1. Video Show Láser - Grande arriba izquierda */}
        <div className="md:col-span-2 md:row-span-1 relative rounded-2xl overflow-hidden bg-brand-card border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-brand-cyan hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] group">
          <video src={placeholders.videoShow} autoPlay loop muted playsInline className="w-full h-full object-cover saturate-[0.85] transition-transform duration-700 group-hover:scale-110 group-hover:saturate-125" />
          <div className="absolute top-5 left-5 bg-brand-pink/90 px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 z-10 backdrop-blur-sm">
            <Play size={12} fill="#fff" /> ILUMINACIÓN SYNCHRO
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-brand-dark to-transparent z-10">
            <h3 className="font-cyber text-3xl m-0">SHOW LASER EN VIVO</h3>
            <p className="text-gray-400 m-0 mt-1 text-sm font-body">Estructuras Truss con cabezas Beam programadas al ritmo</p>
          </div>
        </div>

        {/* 2. Consola DJ - Derecha arriba */}
        <div className="md:row-span-2 relative rounded-2xl overflow-hidden bg-brand-card border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-brand-cyan hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] group">
          <img src={placeholders.consola} alt="Consola" className="w-full h-full object-cover saturate-[0.85] transition-transform duration-700 group-hover:scale-110 group-hover:saturate-125" />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-dark to-transparent z-10">
            <h4 className="font-cyber text-2xl text-brand-cyan m-0">EQUIPO PROFESIONAL</h4>
            <p className="text-gray-400 text-sm m-0 mt-1 font-body">Consolas digitales de última generación</p>
          </div>
        </div>

        {/* 3. Setup Jardín */}
        <div className="relative rounded-2xl overflow-hidden bg-brand-card border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-brand-cyan hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] group">
          <img src={placeholders.jardin} alt="Setup Jardín" className="w-full h-full object-cover saturate-[0.85] transition-transform duration-700 group-hover:scale-110 group-hover:saturate-125" />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-brand-dark to-transparent z-10">
            <h4 className="font-cyber text-xl text-brand-yellow m-0 flex items-center gap-1.5">
              <Sparkles size={16} /> MONTAJE EXTERIOR
            </h4>
          </div>
        </div>

        {/* 4. Setup Exterior 2 */}
        <div className="relative rounded-2xl overflow-hidden bg-brand-card border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-brand-cyan hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] group">
          <img src={placeholders.exterior2} alt="Setup Exterior" className="w-full h-full object-cover saturate-[0.85] transition-transform duration-700 group-hover:scale-110 group-hover:saturate-125" />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-brand-dark to-transparent z-10">
            <h4 className="font-cyber text-xl text-white m-0 flex items-center gap-1.5">
              <Music size={16} /> PRODUCCIÓN COMPLETA
            </h4>
          </div>
        </div>

        {/* 5. Video Gente Bailando - Grande medio */}
        <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden bg-brand-card border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-brand-cyan hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] group">
          <video src={placeholders.videoBailando} autoPlay loop muted playsInline className="w-full h-full object-cover saturate-[0.85] transition-transform duration-700 group-hover:scale-110 group-hover:saturate-125" />
          {/* Overlay de Play */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-10">
            <div className="w-16 h-16 rounded-full bg-brand-pink/90 flex items-center justify-center">
              <Play size={28} fill="#fff" className="ml-1" />
            </div>
          </div>
          <div className="absolute top-5 right-5 bg-brand-cyan/90 px-3.5 py-1.5 rounded-lg text-xs font-black text-brand-dark z-10 tracking-widest backdrop-blur-sm">
            PISTA LLENA
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-brand-dark to-transparent z-10">
            <h3 className="font-cyber text-4xl m-0">LA GENTE NO PARA</h3>
            <p className="text-gray-400 m-0 mt-1 text-sm font-body">Ambiente real de pista de baile</p>
          </div>
        </div>

        {/* 6. Setup Exterior 3 */}
        <div className="relative rounded-2xl overflow-hidden bg-brand-card border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-brand-cyan hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] group">
          <img src={placeholders.exterior3} alt="Audiovisual" className="w-full h-full object-cover saturate-[0.85] transition-transform duration-700 group-hover:scale-110 group-hover:saturate-125" />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-brand-dark to-transparent z-10">
            <h4 className="font-cyber text-xl text-brand-pink m-0 flex items-center gap-1.5">
              <Zap size={16} /> AUDIOVISUAL
            </h4>
          </div>
        </div>

      </div>
    </div>
  );
}