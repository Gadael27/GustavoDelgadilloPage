import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Receipt, Clock, Mic2 } from 'lucide-react';
import PackageCard from '../components/PackageCard';

import imgBase from '../assets/GD/Paquete_basico.jpeg';
import imgPro1 from '../assets/GD/paquete_pro.jpeg';
import imgPro2 from '../assets/GD/montaje_pro.jpeg';
import imgPremium1 from '../assets/GD/montaje_premium.jpeg';
import imgPremium2 from '../assets/GD/servicio_premium.jpeg';

export default function Paquetes() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Pro');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReserve = (packageId) => {
    navigate(`/cotizacion?paquete=${packageId}`);
  };

  const paquetes = [
    {
      id: 'Base',
      name: 'Paquete Básico',
      price: '$5,500 MXN',
      color: '#00f2fe',
      images: [imgBase],
      features: [
        'Cabina DJ',
        'Controlador profesional',
        'Bocina EV o JBL de 15"',
        '5 Horas de servicio'
      ]
    },
    {
      id: 'Pro',
      name: 'Paquete Pro',
      price: '$7,500 MXN',
      color: '#ff007f',
      images: [imgPro1, imgPro2],
      features: [
        'Montaje pro',
        'Cabina DJ',
        'Controlador profesional',
        '2 bocinas 15"',
        '1 subwoofer 18"',
        '1 pantalla de 42"',
        '2 cabezas robóticas',
        '2 lasers rgb',
        '1 máquina de humo',
        '5 Horas de servicio'
      ]
    },
    {
      id: 'Premium',
      name: 'Paquete Premium',
      price: '$9,900 MXN',
      color: '#ffeb3b',
      images: [imgPremium1, imgPremium2],
      features: [
        'Montaje premium (imagen ilustrativa)',
        'Cabina DJ',
        'Controlador profesional',
        '2 bocinas 15"',
        '1 subwoofer 18"',
        '1 pantalla de 42" (en renta pantalla de 3m x 2m pitch 2.6)',
        '6 cabezas robóticas',
        '2 lasers rgb',
        '2 estrobos',
        '1 máquina de humo',
        '1 máquina CO2 lanza confeti',
        '4 disparos Pirotecnia de luz fría',
        '5 Horas de servicio'
      ]
    }
  ];

  const activePkg = paquetes.find(p => p.id === activeTab);

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 px-4 md:px-8 font-body">
      <div className="max-w-[1200px] mx-auto text-center mb-12">
        <h1 className="font-cyber text-[3.5rem] md:text-[5rem] text-white leading-tight mb-6 mt-8">
          NUESTROS <span className="text-brand-pink drop-shadow-[0_0_20px_rgba(255,0,127,0.5)]">PAQUETES</span>
        </h1>
        <p className="text-gray-400 text-[1.1rem] md:text-[1.3rem] max-w-3xl mx-auto leading-relaxed mb-4">
          Diseñados para adaptarse al tamaño de tu evento y a tus expectativas. Selecciona el paquete que mejor se adapte a tu celebración.
        </p>
        <p className="text-brand-cyan/70 text-sm max-w-2xl mx-auto border border-brand-cyan/20 bg-brand-cyan/5 p-3 rounded-lg">
          ⚠️ Precios expresados en Pesos Mexicanos (MXN). Servicio disponible únicamente dentro de la República Mexicana.
        </p>
      </div>

      {/* TABS */}
      <div className="flex justify-center gap-4 mb-16 px-4 flex-wrap max-w-[1200px] mx-auto">
        {paquetes.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setActiveTab(pkg.id)}
            className={`px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 border-2 ${
              activeTab === pkg.id 
                ? 'text-[#03030c] shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-105' 
                : 'bg-transparent text-gray-400 hover:text-white border-white/10 hover:border-white/30 hover:bg-white/5'
            }`}
            style={activeTab === pkg.id ? { background: pkg.color, borderColor: pkg.color } : {}}
          >
            {pkg.name}
          </button>
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch animate-fadeIn">
        
        <div className="w-full lg:w-1/2 relative group h-full">
          {/* Resplandor detrás de la imagen */}
          <div className="absolute -inset-4 bg-gradient-to-r blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, ${activePkg.color}, transparent)` }}></div>
          
          <div className="relative h-full min-h-[400px] md:min-h-[550px] w-full rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 z-10 bg-black flex flex-col">
            {activePkg.images.length === 1 ? (
              <img src={activePkg.images[0]} alt={activePkg.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 flex-1" />
            ) : (
              <div className="grid grid-rows-2 h-full w-full flex-1">
                <img src={activePkg.images[0]} alt={activePkg.name + ' 1'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 border-b border-white/10" />
                <img src={activePkg.images[1]} alt={activePkg.name + ' 2'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80 pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 flex items-center gap-3 z-20">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: activePkg.color, boxShadow: `0 0 10px ${activePkg.color}` }}></div>
              <span className="text-white font-cyber tracking-widest uppercase text-sm" style={{ color: activePkg.color }}>Visualización del Paquete</span>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 h-full">
          <PackageCard 
            service={activePkg} 
            onReserve={handleReserve} 
          />
        </div>
      </div>
      
      {/* SECCIÓN DE TRANSPARENCIA / LETRA CHICA */}
      <div className="max-w-[1200px] mx-auto mt-24 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
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
