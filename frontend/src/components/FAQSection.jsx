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
            ¿Con cuánto tiempo de anticipación debo reservar mi fecha?
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>
          <div className="text-gray-400 mt-4 leading-relaxed">
            Recomendamos realizar tu reservación con al menos <strong>1 a 3 meses de anticipación</strong> para asegurar disponibilidad, especialmente en temporadas altas. Para bloquear oficialmente tu fecha en nuestro calendario, se requiere un anticipo formal procesado de forma segura a través de nuestra plataforma.
          </div>
        </details>

        <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-colors">
          <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-white group-open:text-[var(--color-brand-cyan)]">
            ¿Cuántas horas de servicio incluyen los paquetes y cuál es el costo por hora extra?
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>
          <div className="text-gray-400 mt-4 leading-relaxed">
            Todos nuestros paquetes base cubren <strong>5 horas de música continua</strong> en vivo. Entendemos que algunas celebraciones se extienden; si requieres tiempo adicional durante el evento, la hora extra tiene un costo de <strong>$1,200 MXN</strong> y se puede coordinar directamente en el lugar.
          </div>
        </details>

        <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-colors">
          <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-white group-open:text-[var(--color-brand-cyan)]">
            ¿Cuál es el proceso y método de pago para reservar?
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>
          <div className="text-gray-400 mt-4 leading-relaxed">
            El proceso es transparente y 100% digital. Todo el manejo de pagos se realiza a través de la pasarela oficial de <strong>Mercado Pago</strong>, la cual acepta tarjetas de crédito, débito, transferencias y pagos en efectivo. Tras tu pago, recibirás un comprobante de servicio con todos los términos detallados de contratación.
          </div>
        </details>

        <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-colors">
          <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-white group-open:text-[var(--color-brand-cyan)]">
            ¿Cuánto tiempo requieren para el montaje técnico e instalación?
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>
          <div className="text-gray-400 mt-4 leading-relaxed">
            Nuestro equipo técnico llega con <strong>2 a 3 horas de anticipación</strong> a la locación. Este tiempo es fundamental para instalar estructuras, realizar pruebas de audio e iluminación robótica, y asegurar que todo funcione a la perfección sin interrumpir la llegada de tus invitados.
          </div>
        </details>

        <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-colors">
          <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-white group-open:text-[var(--color-brand-cyan)]">
            ¿Se puede personalizar el repertorio musical del evento?
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>
          <div className="text-gray-400 mt-4 leading-relaxed">
            Absolutamente. Previo al evento agendamos una consulta para definir la línea musical, estructurar los momentos clave del protocolo y establecer los géneros preferidos. Nuestro compromiso es que la atmósfera acústica refleje fielmente tu visión y estilo.
          </div>
        </details>

      </div>
    </div>
  );
}
