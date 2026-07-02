import React, { useState } from 'react';
import { Music, Zap, Disc, Headphones, Sparkles, Volume2 } from 'lucide-react';

import showLasers from '../assets/40e7af3d-94f8-418e-bfe0-6e7f11e86996.jpg';
import cabinaDenonPista from '../assets/AE69E51A-CF1E-409E-8899-B4E2D45FB79F.jpg';
import cumbiaDance from '../assets/cumbia_dance.jpg';
import rockCrowd from '../assets/rock_crowd.jpg';
import openFormat from '../assets/open_format.jpg';

export default function GenresSection() {
  const [activeGenre, setActiveGenre] = useState('reggaeton');

  const genres = [
    { id: 'reggaeton', name: 'Reggaetón', icon: <Music size={16} />, color: 'var(--color-brand-pink)' },
    { id: 'electronic', name: 'Electrónica', icon: <Zap size={16} />, color: 'var(--color-brand-cyan)' },
    { id: 'cumbia', name: 'Cumbia/Banda', icon: <Disc size={16} />, color: 'var(--color-brand-yellow)' },
    { id: 'rock', name: 'Rock/Indie', icon: <Headphones size={16} />, color: '#ff5e00' },
    { id: 'open', name: 'Formato Abierto', icon: <Sparkles size={16} />, color: '#bd00ff' },
  ];

  return (
    <div className="text-center my-[100px] md:mb-[60px]">
      <h2 className="font-cyber text-[3rem] mb-[15px]">
        ¿QUÉ SUENA EN TU <span className="text-[var(--color-brand-pink)]">FIESTA</span>?
      </h2>
      <p className="text-[#888] text-[1.1rem] mb-[40px]">
        Selecciona un género y escucha cómo transformamos la pista
      </p>
      
      <div className="flex gap-[12px] justify-center flex-wrap mb-[50px]">
        {genres.map(g => (
          <button 
            key={g.id}
            onClick={() => setActiveGenre(g.id)}
            className={`genre-tag ${activeGenre === g.id ? 'active' : ''}`}
            style={{ color: activeGenre === g.id ? g.color : '#aaa' }}
          >
            {g.icon} {g.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-[#07071c] to-[#0d0d2a] rounded-[28px] p-10 border border-white/5">
        <div className="text-left">
          <div className="flex items-center gap-[10px] mb-[20px] select-none">
            <Volume2 size={24} color={genres.find(g => g.id === activeGenre)?.color || 'var(--color-brand-pink)'} />
            <span className="font-bold text-[0.9rem] tracking-[2px] uppercase" style={{ 
              color: genres.find(g => g.id === activeGenre)?.color || 'var(--color-brand-pink)',
            }}>
              Reproduciendo ahora
            </span>
          </div>
          <h3 className="font-cyber text-[2.5rem] mb-[15px]">
            {genres.find(g => g.id === activeGenre)?.name.toUpperCase()}
          </h3>
          <p className="text-[#aaa] leading-[1.7] text-[1.05rem] mb-[25px]">
            {activeGenre === 'reggaeton' && "Desde el clásico hasta el perreo intenso. Transiciones perfectas que mantienen la pista prendida toda la noche."}
            {activeGenre === 'electronic' && "House, Techno, EDM y Progressive. Beats que elevan la energía y crean momentos épicos en la pista."}
            {activeGenre === 'cumbia' && "La esencia mexicana con toques modernos. Cumbia rebajada, sonidera y banda para todos los gustos."}
            {activeGenre === 'rock' && "Alternativo, Indie, Clásicos en inglés y español. Para esos momentos de pura energía y nostalgia."}
            {activeGenre === 'open' && "¿Por qué elegir uno solo? Mezclamos TODO en vivo. Del reggaetón al rock en segundos sin cortes abruptos."}
          </p>
          <div className="flex gap-[8px] h-[40px] items-end opacity-60">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="eq-bar w-[6px]" style={{ 
                animationDuration: `${0.5 + (i % 5) * 0.2}s`,
                background: genres.find(g => g.id === activeGenre)?.color || 'var(--color-brand-pink)'
              }} />
            ))}
          </div>
        </div>
        
        <div className="rounded-[20px] overflow-hidden h-[300px] border-2 shadow-2xl transition-all duration-300" style={{ 
          borderColor: `${genres.find(g => g.id === activeGenre)?.color || 'var(--color-brand-pink)'}40`,
          boxShadow: `0 0 40px ${genres.find(g => g.id === activeGenre)?.color || 'var(--color-brand-pink)'}20`
        }}>
          <img 
            src={
              activeGenre === 'electronic' ? showLasers : 
              activeGenre === 'cumbia' ? cumbiaDance : 
              activeGenre === 'rock' ? rockCrowd :
              activeGenre === 'open' ? openFormat :
              cabinaDenonPista
            } 
            alt="Servicio de renta de sonido y DJ para fiestas en CDMX" 
            title="Música mezclada en vivo por DJ Gustavo Delgadillo"
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
}
