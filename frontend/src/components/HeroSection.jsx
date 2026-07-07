import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Disc, Sparkles, Play, Pause } from 'lucide-react';

import heroBackground from '../assets/premium_hero_bg.jpg';
import premiumTurntable from '../assets/minimalist_vinyl.jpg';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create an audio element for the hero section
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
    audioRef.current.loop = true;

    // Intentar autoplay (puede ser bloqueado por el navegador si no hay interacción previa)
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.warn("El navegador bloqueó el autoplay del audio. Se requiere interacción del usuario.", error);
        setIsPlaying(false);
      });
    }

    const handlePauseDJ = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('pause-dj-audio', handlePauseDJ);

    return () => {
      window.removeEventListener('pause-dj-audio', handlePauseDJ);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      // Silenciar videos de la galería al reproducir el DJ
      window.dispatchEvent(new CustomEvent('mute-gallery-videos'));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div id="inicio" className="relative min-h-screen flex items-center bg-cover bg-center overflow-hidden pt-24 pb-16 md:py-0" style={{ 
      backgroundImage: 'linear-gradient(to bottom, rgba(3,3,12,0.3) 0%, rgba(3,3,12,0.7) 50%, #03030c 100%), url(' + heroBackground + ')'
    }}>
      <div className="laser top-[30%]" />
      <div className="laser top-[60%]" style={{ animationDelay: '4s', background: 'linear-gradient(90deg, transparent, var(--color-brand-pink), #fff, transparent)' }} />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-30" style={{
            width: `${4 + i * 2}px`, height: `${4 + i * 2}px`,
            background: i % 2 === 0 ? 'var(--color-brand-pink)' : 'var(--color-brand-cyan)',
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            boxShadow: `0 0 20px ${i % 2 === 0 ? 'var(--color-brand-pink)' : 'var(--color-brand-cyan)'}`,
            animation: `float ${5 + i}s ease-in-out infinite alternate`
          }} />
        ))}
      </div>

      <div className="max-w-[1300px] mx-auto w-full px-4 md:pl-4 md:pr-8 lg:pl-4 relative z-20 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        <div className="text-center md:text-left flex flex-col items-center md:items-start lg:-ml-8 md:-translate-y-16 lg:-translate-y-24">
          <h1 className="sr-only">Renta de DJ y Equipo de Sonido Profesional en CDMX - Gustavo Delgadillo</h1>

          <div className="inline-flex items-center gap-2.5 bg-[#ff007f1a] border border-[#ff007f4d] px-4 py-2 rounded-full mb-6 text-white text-[0.75rem] font-bold tracking-wider backdrop-blur-md">
            <Sparkles size={12} color="var(--color-brand-yellow)" /> DJ PARA FIESTAS EN CDMX • MEZCLAS EN VIVO
          </div>

          <h2 className="font-cyber m-0 leading-[1.1] drop-shadow-[0_0_40px_rgba(255,0,127,0.5)] cursor-default glitch-hover flex flex-wrap items-center justify-center md:justify-start gap-4 text-[3.5rem] md:text-[5rem] lg:text-[6rem] w-full">
            <span className="text-[var(--color-brand-pink)] whitespace-nowrap">RENTA DE</span>
            <span className="text-[var(--color-brand-cyan)] whitespace-nowrap">DJ</span>
          </h2>

          <p className="text-[1.1rem] text-[#ccc] max-w-[500px] my-6 leading-relaxed font-light mx-auto md:mx-0">
            El mejor <strong className="text-white font-bold">servicio de DJ y renta de equipo de sonido</strong> en CDMX y Foráneo. Aparta tu fecha hoy y asegura el éxito de tu evento.
          </p>

          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <a href="/cotizacion?paquete=Base" className="bg-gradient-to-br from-[var(--color-brand-pink)] to-[#bd00ff] text-white border-none px-9 py-[18px] rounded-full text-[1.1rem] font-extrabold cursor-pointer inline-flex items-center gap-2.5 shadow-[0_10px_30px_rgba(255,0,127,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_40px_rgba(255,0,127,0.6)] tracking-wider no-underline">
              COTIZAR SONIDO <ArrowRight size={20} />
            </a>
            
            <a 
              href="/paquetes"
              className="bg-white/5 text-white border border-white/20 px-9 py-[18px] rounded-full text-[1.1rem] font-semibold no-underline inline-flex items-center gap-2.5 backdrop-blur-md transition-all duration-300 cursor-pointer hover:bg-white/10 hover:border-white">
              <Disc size={20} />
              VER PAQUETES
            </a>
          </div>

          {isPlaying && (
            <div className="mt-10 flex gap-8 items-center justify-center md:justify-start">
              <div className="flex gap-1 h-8 items-end">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="eq-bar h-full" />
                ))}
              </div>
              <span className="text-[#888] text-[0.9rem] font-medium">
                Escuchando ahora: <span className="text-[var(--color-brand-cyan)]">Set En Vivo - GD Producciones</span>
              </span>
            </div>
          )}
        </div>

        <div className="hidden md:flex relative justify-center items-center">
          <div 
            className="w-[320px] h-[320px] rounded-full p-1 relative shadow-[0_0_60px_rgba(255,0,127,0.3)] bg-[conic-gradient(from_0deg,var(--color-brand-pink),var(--color-brand-cyan),var(--color-brand-yellow),var(--color-brand-pink))] cursor-pointer group hover:scale-105 transition-transform duration-500"
            onClick={togglePlay}
            title={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            <div className={`w-full h-full rounded-full relative overflow-hidden ${isPlaying ? 'vinyl-spin' : ''}`} style={{ background: 'url(' + premiumTurntable + ') center/cover' }}>
              <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_center,transparent_0,transparent_10px,rgba(0,0,0,0.3)_10px,rgba(0,0,0,0.3)_12px)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#03030c] border-2 border-[var(--color-brand-cyan)] flex items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.5)] z-20">
                {isPlaying ? <Pause size={32} color="var(--color-brand-cyan)" /> : <Play size={32} color="var(--color-brand-cyan)" className="ml-1" />}
              </div>
            </div>
            {/* Overlay interactivo */}
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="text-white font-cyber text-2xl tracking-widest bg-black/60 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
                {isPlaying ? 'PAUSAR' : 'REPRODUCIR'}
              </div>
            </div>
          </div>
          
          <div className="absolute top-5 right-0 bg-[#07071c]/80 backdrop-blur-md border border-[var(--color-brand-cyan)]/30 rounded-2xl px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <div className="text-[1.8rem] font-extrabold text-[var(--color-brand-cyan)]">500+</div>
            <div className="text-[0.8rem] text-[#aaa]">Eventos realizados</div>
          </div>
          
          <div className="absolute -bottom-10 left-0 bg-[#07071c]/80 backdrop-blur-md border border-[var(--color-brand-pink)]/30 rounded-2xl px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <div className="text-[1.8rem] font-extrabold text-[var(--color-brand-pink)]">10+</div>
            <div className="text-[0.8rem] text-[#aaa]">Años de experiencia</div>
          </div>
        </div>
      </div>
    </div>
  );
}
