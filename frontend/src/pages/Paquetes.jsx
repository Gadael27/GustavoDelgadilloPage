import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Receipt, Clock, Mic2 } from 'lucide-react';
import PackageCard from '../components/PackageCard';

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
      name: 'Paquete Básico',
      price: '$5,500',
      color: '#00f2fe',
      features: [
        'Sonido para eventos íntimos',
        'Cabina DJ Iluminada',
        'Controlador y microfonía',
        'Luces básicas de pista',
        '5 Horas de música continua'
      ]
    },
    {
      id: 'Pro',
      name: 'Paquete Pro',
      price: '$7,500',
      color: '#ff007f',
      features: [
        'Sonido Pro + Subwoofer 18"',
        'Montaje visual con pantalla 42"',
        'Luces robóticas y láser RGB',
        'Máquina de humo atmosférico',
        '5 Horas de música continua'
      ]
    },
    {
      id: 'Premium',
      name: 'Paquete Premium',
      price: '$9,900',
      color: '#ffeb3b',
      features: [
        'Sonido Masivo de concierto',
        'Pantalla LED gigante (opcional)',
        'Show de luces, láser y humo pesado',
        'Pirotecnia fría y CO2 Confeti',
        '7 Horas (5 base + 2 incluidas)'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 px-4 md:px-8 font-body">
      <div className="max-w-[1200px] mx-auto text-center mb-16">
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

      {/* GRID DE PAQUETES */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {paquetes.map(pkg => (
          <PackageCard 
            key={pkg.id}
            service={pkg} 
            onReserve={handleReserve} 
          />
        ))}
      </div>
      
      {/* SECCIÓN DE TRANSPARENCIA / LETRA CHICA */}
      <div className="max-w-[1200px] mx-auto mt-10 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
          <ShieldCheck className="text-brand-pink mb-4" size={32} />
          <h4 className="text-white font-bold text-lg mb-2">Apartado Seguro</h4>
          <p className="text-gray-400 text-sm">Bloquea tu fecha con solo $1,500 MXN de anticipo. Liquidación 3 días antes del evento.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
          <Receipt className="text-brand-cyan mb-4" size={32} />
          <h4 className="text-white font-bold text-lg mb-2">Precios Netos</h4>
          <p className="text-gray-400 text-sm">Todos nuestros precios incluyen IVA. Si requieres factura para tu empresa, no hay cargos ocultos.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
          <Clock className="text-brand-yellow mb-4" size={32} />
          <h4 className="text-white font-bold text-lg mb-2">Flexibilidad de Tiempo</h4>
          <p className="text-gray-400 text-sm">¿La fiesta está muy buena? Hora extra disponible durante el evento por $1,200 MXN.</p>
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
          onClick={() => window.open('https://wa.me/525630626476?text=Hola,%20me%20interesa%20armar%20un%20paquete%20a%20la%20medida%20para%20mi%20evento', '_blank')}
          className="bg-transparent border-2 border-brand-cyan text-brand-cyan px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-brand-cyan hover:text-brand-dark transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
        >
          Cotizar por WhatsApp
        </button>
      </div>
    </div>
  );
}
