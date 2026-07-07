import React from 'react';
import { Link } from 'react-router-dom';
import { Disc, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-5 text-center relative overflow-hidden z-10 pt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-brand-pink)]/20 rounded-full blur-[100px] -z-10"></div>
      
      <Disc size={120} className="text-[var(--color-brand-pink)] mb-8 animate-[spin_4s_linear_infinite]" />
      
      <h1 className="font-cyber text-[5rem] md:text-[8rem] m-0 text-white drop-shadow-[0_0_20px_rgba(255,0,127,0.5)] leading-none">
        404
      </h1>
      <h2 className="text-2xl font-bold text-white mt-4 mb-2 tracking-widest uppercase">
        ¡Disco Rayado!
      </h2>
      <p className="text-gray-400 mb-8 text-lg max-w-md mx-auto">
        La página que buscas no existe o fue movida a otra pista.
      </p>
      
      <Link 
        to="/" 
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-brand-pink)] to-[var(--color-brand-purple)] text-white font-bold py-3 px-8 rounded-full shadow-[0_0_30px_rgba(255,0,127,0.3)] hover:scale-105 transition-transform uppercase tracking-wider"
      >
        <ArrowLeft size={20} /> Volver a la Pista
      </Link>
    </div>
  );
}
