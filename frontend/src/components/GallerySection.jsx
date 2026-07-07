import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Zap, Music, Volume2, VolumeX } from 'lucide-react';

// FOTOS DE LA GALERÍA
import videoShowUrl from '../assets/IMG_5404.MP4?url';
import videoGenteBailando from '../assets/IMG_2958_opt.mp4?url';
import videoConsolaYBailando from '../assets/FE8097BE-2C22-4D19-89BA-407922426329.mp4?url';
import consolaDJ from '../assets/IMG_4911.JPG';
import setupJardin from '../assets/IMG_4921.JPG';
import setupExterior2 from '../assets/IMG_5401.JPG';
import setupExterior3 from '../assets/IMG_5404.JPG';
import disparoCo2 from '../assets/160523.jpg';

export default function GallerySection() {
  const [unmutedVideoId, setUnmutedVideoId] = useState(null);

  useEffect(() => {
    const handleMuteGallery = () => setUnmutedVideoId(null);
    window.addEventListener('mute-gallery-videos', handleMuteGallery);
    return () => window.removeEventListener('mute-gallery-videos', handleMuteGallery);
  }, []);

  const toggleMute = (e, videoId) => {
    e.preventDefault();
    if (unmutedVideoId === videoId) {
      setUnmutedVideoId(null); // Silenciar
    } else {
      setUnmutedVideoId(videoId); // Desmutear este y silenciar los demás
      // Pausar el reproductor del DJ para evitar empalmes
      window.dispatchEvent(new CustomEvent('pause-dj-audio'));
    }
  };

  return (
    <div id="galería" className="mb-[100px]">
      <div className="text-center mb-[50px]">
        <h2 className="font-cyber text-[3rem] m-0">
          ASÍ SE VIVE LA <span className="text-[var(--color-brand-cyan)]">ENERGÍA</span>
        </h2>
        <p className="text-[#666] mt-[10px] text-[1.1rem]">
          Producciones reales. Pistas llenas. Momentos épicos.
        </p>
      </div>

      {/* CONEXIÓN HUMANA: CONOCE A TU DJ */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white/5 border border-white/10 rounded-3xl p-8 mb-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-brand-pink/20 relative">
            <img src="/Logo.jpeg" alt="Gustavo Delgadillo DJ" className="w-full h-[250px] object-cover saturate-110" />
          </div>
        </div>
        <div className="w-full md:w-2/3 text-left">
          <h3 className="font-cyber text-2xl text-[var(--color-brand-pink)] mb-4">¿QUIÉN PONDRÁ EL AMBIENTE?</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            "Mi objetivo no es solo poner música, es crear la <strong>banda sonora perfecta</strong> para tu evento."
          </p>
          <p className="text-gray-400 leading-relaxed mb-6">
            Al contratar nuestros servicios, te garantizo trato directo y personalizado. <strong>Nada de intermediarios ni agencias sin rostro.</strong> Estaré contigo desde la entrevista inicial para entender tus gustos, hasta el último minuto en la pista de baile asegurando que la energía nunca caiga.
          </p>
          <div className="flex gap-4">
            <span className="bg-brand-cyan/10 text-[var(--color-brand-cyan)] px-4 py-1.5 rounded-full text-sm font-semibold border border-brand-cyan/20">Trato Directo</span>
            <span className="bg-brand-pink/10 text-[var(--color-brand-pink)] px-4 py-1.5 rounded-full text-sm font-semibold border border-brand-pink/20">+10 Años Experiencia</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] gap-5">
        {/* 1. Video Show Láser */}
        <div className="media-v2 md:col-span-2 md:row-span-1 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] cursor-pointer group" onClick={(e) => toggleMute(e, 'video1')}>
          <video src={videoShowUrl} autoPlay loop muted={unmutedVideoId !== 'video1'} playsInline className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-125" />
          
          <div className="absolute top-5 right-5 bg-black/50 p-2.5 rounded-full border border-white/20 backdrop-blur-md z-20 text-white hover:bg-[var(--color-brand-pink)] transition-colors opacity-0 group-hover:opacity-100">
            {unmutedVideoId !== 'video1' ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </div>
          
          <div className="absolute top-5 left-5 bg-[#ff007fe6] px-3.5 py-1.5 rounded-lg text-[0.8rem] font-bold flex items-center gap-1.5 z-10 text-white">
            <Play size={12} fill="#fff" /> ILUMINACIÓN SYNCHRO
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-[30px] bg-gradient-to-t from-[#03030cf2] to-transparent z-10">
            <h3 className="font-cyber text-[1.8rem] m-0">SHOW LASER EN VIVO</h3>
            <p className="text-[#aaa] mt-[5px] text-[0.9rem] flex items-center gap-2">
              Haz clic para {unmutedVideoId === 'video1' ? 'silenciar' : 'escuchar'}
            </p>
          </div>
        </div>

        {/* 2. Consola DJ (IMG_4911) */}
        <div className="media-v2 md:row-span-2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)]">
          <img src={consolaDJ} alt="Equipo de DJ profesional" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-125" />
          <div className="absolute bottom-0 left-0 right-0 p-[25px] bg-gradient-to-t from-[#03030cf2] to-transparent z-10">
            <h4 className="font-cyber text-[1.5rem] text-[var(--color-brand-cyan)] m-0">EQUIPO PROFESIONAL</h4>
            <p className="text-[#888] text-[0.85rem] mt-[5px]">Consolas digitales de última generación</p>
          </div>
        </div>

        {/* 3. Setup Jardín (IMG_4921) */}
        <div className="media-v2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)]">
          <img src={setupJardin} alt="Montaje en jardín" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-125" />
          <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-[#03030cf2] to-transparent z-10">
            <h4 className="font-cyber text-[1.3rem] text-[var(--color-brand-yellow)] m-0 flex items-center gap-[6px]">
              <Sparkles size={16} /> MONTAJE EXTERIOR
            </h4>
          </div>
        </div>

        {/* 4. Setup Exterior 2 (IMG_5401) */}
        <div className="media-v2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)]">
          <img src={setupExterior2} alt="Producción en exterior" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-125" />
          <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-[#03030cf2] to-transparent z-10">
            <h4 className="font-cyber text-[1.3rem] text-white m-0 flex items-center gap-[6px]">
              <Music size={16} /> PRODUCCIÓN COMPLETA
            </h4>
          </div>
        </div>

        {/* 5. Video Gente Bailando */}
        <div className="media-v2 md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] group cursor-pointer" onClick={(e) => toggleMute(e, 'video2')}>
          <video src={videoGenteBailando} autoPlay loop muted={unmutedVideoId !== 'video2'} playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 saturate-[0.85] group-hover:saturate-125" />
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-10">
            <div className="w-[60px] h-[60px] rounded-full bg-[#ff007fe6] flex items-center justify-center">
              {unmutedVideoId !== 'video2' ? <VolumeX size={28} color="#fff" /> : <Volume2 size={28} color="#fff" />}
            </div>
          </div>

          <div className="absolute top-5 right-5 bg-[#00f2fee6] px-3.5 py-1.5 rounded-lg text-[0.75rem] font-extrabold text-[#03030c] z-20 tracking-widest">
            PISTA LLENA
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-[30px] bg-gradient-to-t from-[#03030cf2] to-transparent z-20">
            <h3 className="font-cyber text-[2rem] m-0">LA GENTE NO PARA</h3>
            <p className="text-[#aaa] mt-[5px] text-[0.9rem]">Haz clic para {unmutedVideoId === 'video2' ? 'silenciar' : 'escuchar'} el ambiente</p>
          </div>
        </div>

        {/* 6. Setup Exterior 3 */}
        <div className="media-v2 md:row-span-2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)]">
          <img src={setupExterior3} alt="Montaje audiovisual" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-125" />
          <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-[#03030cf2] to-transparent z-10">
            <h4 className="font-cyber text-[1.3rem] text-[var(--color-brand-pink)] m-0 flex items-center gap-[6px]">
              <Zap size={16} /> AUDIOVISUAL
            </h4>
          </div>
        </div>

        {/* 7. Video Consola + Gente */}
        <div className="media-v2 md:col-span-2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] group cursor-pointer" onClick={(e) => toggleMute(e, 'video3')}>
          <video src={videoConsolaYBailando} autoPlay loop muted={unmutedVideoId !== 'video3'} playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 saturate-[0.85] group-hover:saturate-125" />
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-10">
            <div className="w-[50px] h-[50px] rounded-full bg-[#00f2fee6] flex items-center justify-center text-[#03030c]">
              {unmutedVideoId !== 'video3' ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </div>
          </div>

          <div className="absolute top-[15px] left-[15px] bg-[#ffeb3be6] px-2.5 py-1 rounded-md text-[0.7rem] font-extrabold text-[#03030c] z-20">
            BEHIND THE DECKS
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-[#03030cf2] to-transparent z-20">
            <h4 className="font-cyber text-[1.3rem] text-[var(--color-brand-yellow)] m-0 flex items-center gap-[6px]">
              <Music size={14} /> DESDE LA CONSOLA
            </h4>
          </div>
        </div>

        {/* 12. Disparo CO2 */}
        <div className="media-v2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)]">
          <img src={disparoCo2} alt="Efectos especiales CO2" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-125" />
          <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-[#03030cf2] to-transparent z-10">
            <h4 className="font-cyber text-[1.3rem] text-[var(--color-brand-yellow)] m-0 flex items-center gap-[6px]">
              <Sparkles size={16} /> CO2 FX
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
