import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  return (
    <div className="mb-[100px] mt-20">
      <div className="text-center mb-12">
        <h2 className="font-cyber text-[3rem] m-0">
          PREGUNTAS <span className="text-[var(--color-brand-cyan)]">FRECUENTES</span>
        </h2>
        <p className="text-[#666] mt-[10px] text-[1.1rem]">Todo lo que necesitas saber antes de contratar.</p>
      </div>
      <div className="max-w-[800px] mx-auto flex flex-col gap-4">
        <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-colors">
          <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-white group-open:text-[var(--color-brand-cyan)]">
            ¿Haces labor de Animador (MC) o solo mezclas?
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>
          <div className="text-gray-400 mt-4 leading-relaxed">
            Sí. Me encargo de hacer los anuncios protocolarios (entrada de novios, vals, inicio de baile) y de interactuar con el público con el micrófono para mantener la energía en alto, pero <strong>sin ser invasivo</strong> ni hablar sobre las canciones todo el tiempo.
          </div>
        </details>
        <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-colors">
          <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-white group-open:text-[var(--color-brand-cyan)]">
            ¿Puedo darte una "Lista Negra" de canciones prohibidas?
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>
          <div className="text-gray-400 mt-4 leading-relaxed">
            ¡Claro! Tu evento, tus reglas. Siempre tenemos una entrevista previa para conocer tus gustos y es vital que me compartas tanto tus canciones favoritas como aquellos géneros o temas que definitivamente no quieres que suenen bajo ninguna circunstancia.
          </div>
        </details>
        <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-colors">
          <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-white group-open:text-[var(--color-brand-cyan)]">
            ¿Cuáles son tus requerimientos técnicos para montar?
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>
          <div className="text-gray-400 mt-4 leading-relaxed">
            Requerimos <strong>2 tomas de corriente independientes a no más de 10 metros</strong> de la zona de montaje. Para paquetes grandes, necesitamos acceso al lugar al menos <strong>3 horas antes</strong> del inicio del evento para armar estructuras y configurar iluminación sin interrumpir.
          </div>
        </details>
      </div>
    </div>
  );
}
