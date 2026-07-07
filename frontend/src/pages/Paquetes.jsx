import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Receipt, Clock, Mic2 } from 'lucide-react';
import PackageCard from '../components/PackageCard';

import imgBase from '../assets/IMG_4911.JPG';
import imgPro from '../assets/IMG_5401.JPG';
import imgPremium from '../assets/IMG_5404.JPG';

export default function Paquetes() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReserve = (packageId) => {
    navigate(`/cotizacion?paquete=${packageId}`);
  };

  const paquetes = [
    {
      id: 'Base',
      name: 'Paquete Esencial',
      price: '$5,500 MXN',
      color: '#00f2fe',
      image: imgBase,
      features: [
        '5 Horas de servicio continuo',
        'Audio profesional lineal para 50-80 personas',
        'Iluminación básica (Par LEDs)',
        'DJ Profesional mezclando en vivo',
        'Entrevista previa para selección musical',
        'Micrófono alámbrico para anuncios'
      ]
    },
    {
      id: 'Pro',
      name: 'Paquete Pro',
      price: '$7,500 MXN',
      color: '#ff007f',
      image: imgPro,
      features: [
        '5 Horas de servicio continuo',
        'Audio lineal de alta fidelidad para hasta 150 personas',
        'Estructura iluminada (Cabina DJ)',
        'Iluminación robótica (Cabezas móviles)',
        'Máquina de humo convencional',
        'DJ Profesional formato abierto',
        '2 Micrófonos inalámbricos'
      ]
    },
    {
      id: 'Premium',
      name: 'Experiencia Premium',
      price: '$9,900 MXN',
      color: '#ffeb3b',
      image: imgPremium,
      features: [
        '7 Horas de servicio continuo',
        'Audio lineal Premium para hasta 300 personas',
        'Show láser espectacular',
        'Máquina de humo pesado (Bailar en las nubes)',
        'Pirotecnia fría (Chispas sin fuego)',
        'Iluminación robótica avanzada sincronizada DMX',
        'DJ Profesional y animador',
        'Souvenirs básicos (Globos, pulseras neón)'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 px-4 md:px-8 font-body">
      <div className="max-w-[1200px] mx-auto text-center mb-20">
        <h1 className="font-cyber text-[3.5rem] md:text-[5rem] text-white leading-tight mb-6 mt-8">
          NUESTROS <span className="text-brand-pink drop-shadow-[0_0_20px_rgba(255,0,127,0.5)]">PAQUETES</span>
        </h1>
        <p className="text-gray-400 text-[1.1rem] md:text-[1.3rem] max-w-3xl mx-auto leading-relaxed mb-4">
          Diseñados para adaptarse al tamaño de tu evento y a tus expectativas. Desde una fiesta íntima hasta la boda de tus sueños con producción audiovisual completa.
        </p>
        <p className="text-brand-cyan/70 text-sm max-w-2xl mx-auto border border-brand-cyan/20 bg-brand-cyan/5 p-3 rounded-lg">
          ⚠️ Precios expresados en Pesos Mexicanos (MXN). Servicio disponible únicamente dentro de la República Mexicana.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col gap-20">
        {paquetes.map((pkg, idx) => (
          <div key={pkg.id} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            
            <div className="w-full lg:w-1/2 relative group">
              {/* Resplandor detrás de la imagen */}
              <div className="absolute -inset-4 bg-gradient-to-r blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-700" style={{ backgroundImage: `linear-gradient(to right, ${pkg.color}, transparent)` }}></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 z-10">
                <img src={pkg.image} alt={pkg.name} className="w-full h-[350px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: pkg.color, boxShadow: `0 0 10px ${pkg.color}` }}></div>
                  <span className="text-white font-cyber tracking-widest uppercase text-sm" style={{ color: pkg.color }}>Visualización del Paquete</span>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <PackageCard 
                service={pkg} 
                onReserve={handleReserve} 
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* SECCIÓN DE TRANSPARENCIA / LETRA CHICA */}
      <div className="max-w-[1200px] mx-auto mt-20 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
          <ShieldCheck className="text-brand-pink mb-4" size={32} />
          <h4 className="text-white font-bold text-lg mb-2">Apartado Seguro</h4>
          <p className="text-gray-400 text-sm">Bloquea tu fecha con solo el 30% de anticipo. Liquidación 3 días antes del evento.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
          <Receipt className="text-brand-cyan mb-4" size={32} />
          <h4 className="text-white font-bold text-lg mb-2">Precios Netos</h4>
          <p className="text-gray-400 text-sm">Todos nuestros precios incluyen IVA. Si requieres factura para tu empresa, no hay cargos ocultos.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
          <Clock className="text-brand-yellow mb-4" size={32} />
          <h4 className="text-white font-bold text-lg mb-2">Flexibilidad de Tiempo</h4>
          <p className="text-gray-400 text-sm">¿La fiesta está muy buena? Hora extra disponible durante el evento por $1,500 MXN.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
          <Mic2 className="text-brand-pink mb-4" size={32} />
          <h4 className="text-white font-bold text-lg mb-2">Todo el Protocolo</h4>
          <p className="text-gray-400 text-sm">Todos los paquetes incluyen micrófonos para uso de protocolo (ceremonias, brindis o discursos).</p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto mt-20 p-8 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/5 text-center">
        <h3 className="font-cyber text-[2rem] text-brand-cyan mb-4">¿Necesitas algo a la medida?</h3>
        <p className="text-gray-300 mb-6 text-[1.1rem]">
          Podemos armar un paquete personalizado con pantallas LED, pista iluminada, letras gigantes y más amenidades.
        </p>
        <button 
          onClick={() => navigate('/cotizacion?paquete=Custom')}
          className="bg-transparent border-2 border-brand-cyan text-brand-cyan px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-brand-cyan hover:text-brand-dark transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
        >
          Armar mi propio paquete
        </button>
      </div>
    </div>
  );
}
