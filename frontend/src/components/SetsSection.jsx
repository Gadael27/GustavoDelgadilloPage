import React, { useState, useRef } from 'react';
import { Disc, Play, ChevronRight, Zap } from 'lucide-react';

import consolaCloseup from '../assets/BB8F1BA0-38B6-4B43-8F62-B3A346AB7D5C.jpg';

export default function SetsSection() {
  const [playingSet, setPlayingSet] = useState(null);
  const audioRef = useRef(null);

  const sets = [
    { title: "Set Reggaetón Old School", duration: "45 min", plays: "2.4k", color: "var(--color-brand-pink)", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Electro House Fiesta", duration: "60 min", plays: "1.8k", color: "var(--color-brand-cyan)", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Cumbia Remix En Vivo", duration: "50 min", plays: "3.1k", color: "var(--color-brand-yellow)", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  ];

  const toggleSet = (idx) => {
    if (playingSet === idx) {
      audioRef.current.pause();
      setPlayingSet(null);
    } else {
      setPlayingSet(idx);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log('Error reproduciendo audio', e));
        }
      }, 50);
    }
  };

  return (
    <div id="sets" className="mb-[100px]">
      <audio 
        ref={audioRef} 
        src={playingSet !== null ? sets[playingSet].audioSrc : undefined} 
        loop 
        style={{ display: 'none' }} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
        <div>
          <div className="flex items-center gap-[10px] text-[var(--color-brand-pink)] mb-[15px] font-bold tracking-[2px] text-[0.9rem]">
            <Disc size={20} className="vinyl-spin" /> SETS RECIENTES
          </div>
          <h2 className="font-cyber text-[3rem] m-0 mb-[20px] leading-none">
            ESCUCHA ANTES DE <span className="text-[var(--color-brand-cyan)]">CONTRATAR</span>
          </h2>
          <p className="text-[#aaa] leading-[1.7] mb-[30px] text-[1.05rem]">
            Nuestros sets no son playlists automáticas. Son mezclas en vivo, 
            leídas de la pista, con transiciones limpias y energía calculada.
          </p>
          
          <div className="mt-[20px] flex flex-col gap-3">
            {sets.map((set, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-[var(--color-brand-pink)]/10 hover:border-[var(--color-brand-pink)]/30 hover:translate-x-2 transition-all duration-300 cursor-pointer" onClick={() => toggleSet(idx)}>
                <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center shrink-0" style={{
                  background: `linear-gradient(135deg, ${set.color}40, ${set.color}20)`,
                  border: `1px solid ${set.color}60`,
                  color: set.color
                }}>
                  {playingSet === idx ? (
                    <div className="flex gap-[3px] items-end h-[16px]">
                      <div className="eq-bar w-1" style={{ background: set.color }} />
                      <div className="eq-bar w-1" style={{ background: set.color, animationDelay: '0.1s' }} />
                      <div className="eq-bar w-1" style={{ background: set.color, animationDelay: '0.2s' }} />
                    </div>
                  ) : (
                    <Play size={20} fill={set.color} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[1rem] mb-1 transition-colors duration-300" style={{ color: playingSet === idx ? set.color : '#fff' }}>{set.title}</div>
                  <div className="text-[0.85rem] text-[#666] flex gap-[12px]">
                    <span>{set.duration}</span>
                    <span>•</span>
                    <span>{set.plays} reproducciones</span>
                  </div>
                </div>
                <ChevronRight size={20} color="#444" />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block relative">
          <div className="rounded-[24px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            <img src={consolaCloseup} alt="Equipos de DJ profesional y renta de consolas en CDMX" title="Mezcla en vivo garantizada" className="w-full block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03030ccc] to-transparent flex items-end p-[30px]">
              <div>
                <div className="inline-flex items-center gap-[8px] bg-[#00f2fe26] border border-[#00f2fe66] px-3.5 py-1.5 rounded-full mb-[10px] text-[var(--color-brand-cyan)] text-[0.8rem] font-bold">
                  <Zap size={12} /> LIVE MIXING
                </div>
                <div className="text-[1.3rem] font-bold text-white">Consolas Denon Prime 4</div>
                <div className="text-[#888] text-[0.9rem]">Mezcla totalmente en vivo</div>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-[20px] -right-[20px] w-[100px] h-[100px] rounded-[20px] bg-gradient-to-br from-[var(--color-brand-pink)] to-[#bd00ff] opacity-80 blur-[30px] -z-10" />
        </div>
      </div>
    </div>
  );
}
