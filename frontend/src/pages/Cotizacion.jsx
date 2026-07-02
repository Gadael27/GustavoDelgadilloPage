import React, { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Sparkles } from 'lucide-react';
import { useCotizacionStore } from '../store/useCotizacionStore';
import CotizacionForm from '../components/CotizacionForm';
import ResumenCompra from '../components/ResumenCompra';

export default function Cotizacion() {
  const { fetchOcupadas, initializeFromUrl } = useCotizacionStore();

  useEffect(() => {
    initializeFromUrl();
    fetchOcupadas();
    
    // SDK MERCADO PAGO
    const mpScript = document.createElement('script');
    mpScript.src = 'https://sdk.mercadopago.com/js/v2';
    mpScript.async = true;
    mpScript.onload = () => {};
    document.body.appendChild(mpScript);
    return () => { 
      if (document.body.contains(mpScript)) {
        document.body.removeChild(mpScript); 
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#121230] to-[#0d0d2a] py-24 px-4 font-sans text-white">
      <Helmet>
        <title>Cotizar Renta de DJ | Precios de Sonido para Fiestas</title>
        <meta name="description" content="Calcula el precio de renta de DJ, equipo de sonido y cabinas para tu evento. Sistema de reservas seguro y rápido." />
      </Helmet>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@300;400;600;700;800&display=swap');
        .font-cyber { font-family: 'Bangers', cursive; letter-spacing: 2px; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 px-5 py-2 rounded-full mb-5 text-cyan-400 text-sm font-bold tracking-widest">
            <Sparkles size={14} /> RESERVA TU FECHA AHORA
          </div>
          <h1 className="font-cyber text-4xl md:text-6xl m-0 leading-tight bg-gradient-to-br from-white via-cyan-400 to-pink-500 bg-clip-text text-transparent">
            SISTEMA DE RESERVAS
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto mt-4 text-base leading-relaxed">
            Completa tu información y aparta tu fecha. El pago se procesa de forma segura vía Mercado Pago.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8">
          <CotizacionForm />
          <ResumenCompra />
        </div>
      </div>
    </div>
  );
}
