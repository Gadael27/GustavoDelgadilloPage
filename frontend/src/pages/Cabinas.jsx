import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Package, Truck, ShieldCheck, ExternalLink, SlidersHorizontal, 
  X, ZoomIn, ChevronLeft, ChevronRight, Sparkles, 
  Ruler, Clock, CheckCircle2, Wrench, ShoppingBag, MapPin, ChevronDown, Check
} from 'lucide-react';
import Footer from '../components/Footer';

// Importaciones de cabinas (todos los nombres exactos de tu captura)
import cabinaBlanca4Diamantes from '../assets/Cabina DJ Blanca 4 diamantes frente.jpeg';
import cabinaBlancaDiamanteFrente from '../assets/Cabina DJ Blanca Diamante Frente.jpeg';
import cabinaBlancaDiamanteLateral from '../assets/Cabina DJ Blanca Diamante Lateral.jpeg';
import cabinaBlancaTriangulos from '../assets/Cabina DJ Blanca Triangulos.jpeg';
import cabinaOroEspejo from '../assets/Cabina DJ diamante Oro tipo espejo frente.jpeg';
import cabinaPlataEspejo from '../assets/Cabina DJ Diamante Plata tipo espejo frente.jpeg';
import cabinaNegraDiamanteFrente2 from '../assets/Cabina DJ negra Diamante frente 2.jpeg';
import cabinaNegraDiamanteFrente from '../assets/Cabina DJ Negra Diamante frente.jpeg';
import cabinaNegraDiamanteLateral from '../assets/Cabina DJ Negra Diamante Lateral.jpeg';
import cabinaNegraRayado from '../assets/Cabina DJ Negra Rayado.jpeg';
import cabinaNegraTriangulos from '../assets/Cabina DJ Negra Triangulos.jpeg';

export default function CompraCabina() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const cabinas = [
    {
      id: 1,
      nombre: 'Cabina Negra Diamante Premium',
      descripcion: 'Mueble de carpintería fina con corte geométrico en relieve tipo diamante. Acabado negro mate de alta resistencia al rayado y humedad. Ideal para eventos corporativos y bodas elegantes.',
      color: 'Negro',
      precio: '8,500',
      tag: 'Best Seller',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaNegraDiamanteFrente, cabinaNegraDiamanteLateral, cabinaNegraDiamanteFrente2],
      specs: { material: 'Madera MDF Premium', peso: '18kg', ensamble: '5 min', garantia: '1 año', medidas: '120 x 60 x 90 cm' },
      features: ['Corte diamante 3D', 'Acabado negro mate', 'Patas ajustables', 'Portacables integrado'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    },
    {
      id: 2,
      nombre: 'Cabina Blanca Diamante Luxury',
      descripcion: 'Estructura modular blanca con diseño de diamantes tridimensionales. Ideal para bodas de gala y eventos corporativos de alto nivel que buscan limpieza visual.',
      color: 'Blanco',
      precio: '8,900',
      tag: 'Premium',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaBlancaDiamanteFrente, cabinaBlancaDiamanteLateral, cabinaBlanca4Diamantes],
      specs: { material: 'Madera MDF Premium', peso: '19kg', ensamble: '5 min', garantia: '1 año', medidas: '120 x 60 x 90 cm' },
      features: ['Diamantes tridimensionales', 'Blanco satinado', 'Resistente a manchas', 'Diseño modular'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    },
    {
      id: 3,
      nombre: 'Cabina Diamante Espejo Oro',
      descripcion: 'Edición especial con caras reflejantes en acabado acrílico tipo espejo dorado. Máxima presencia escénica garantizada, rebota la iluminación del evento creando un espectáculo visual.',
      color: 'Oro/Espejo',
      precio: '11,200',
      tag: 'Edición Limitada',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaOroEspejo],
      specs: { material: 'MDF + Acrílico Espejo', peso: '22kg', ensamble: '7 min', garantia: '2 años', medidas: '120 x 60 x 95 cm' },
      features: ['Acrílico espejo dorado', 'Efecto reflectante total', 'Estructura reforzada', 'Iluminación LED compatible'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: false
    },
    {
      id: 4,
      nombre: 'Cabina Diamante Espejo Plata',
      descripcion: 'Fachada reflectante plata tipo espejo con cortes diagonales de precisión. Estructura robusta y ligera de armar, ideal para eventos futuristas o barras iluminadas.',
      color: 'Plata/Espejo',
      precio: '10,800',
      tag: 'Exclusivo',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaPlataEspejo],
      specs: { material: 'MDF + Acrílico Espejo', peso: '21kg', ensamble: '7 min', garantia: '2 años', medidas: '120 x 60 x 95 cm' },
      features: ['Espejo plata premium', 'Cortes diagonales', 'Ligera y robusta', 'Montaje rápido'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: false
    },
    {
      id: 5,
      nombre: 'Cabina Negra Triángulos Rave',
      descripcion: 'Diseño geométrico lineal basado en patrones triangulares abstractos. Ideal para iluminación perimetral LED RGB y eventos tipo festival.',
      color: 'Negro',
      precio: '7,900',
      tag: 'A medida',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaNegraTriangulos],
      specs: { material: 'Madera MDF Premium', peso: '17kg', ensamble: '4 min', garantia: '1 año', medidas: '110 x 55 x 85 cm' },
      features: ['Patrón triangular abstracto', 'Compatible LED RGB', 'Diseño rave/festival', 'Superficie difusora'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    },
    {
      id: 6,
      nombre: 'Cabina Negra Minimal Rayado',
      descripcion: 'Líneas paralelas fresadas sobre madera premium con acabado negro satinado de alta durabilidad. Elegancia minimalista para DJs refinados.',
      color: 'Negro',
      precio: '8,200',
      tag: 'Nuevo',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaNegraRayado],
      specs: { material: 'Madera MDF Premium', peso: '18kg', ensamble: '5 min', garantia: '1 año', medidas: '120 x 60 x 90 cm' },
      features: ['Líneas paralelas fresadas', 'Acabado satinado', 'Minimalista', 'Alta durabilidad'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    },
    {
      id: 7,
      nombre: 'Cabina Blanca Triángulos',
      descripcion: 'Versión blanca del diseño triangular con acabado satinado. Perfecta para eventos diurnos, albercadas y exteriores.',
      color: 'Blanco',
      precio: '8,400',
      tag: 'Nuevo',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaBlancaTriangulos],
      specs: { material: 'Madera MDF Premium', peso: '17kg', ensamble: '4 min', garantia: '1 año', medidas: '110 x 55 x 85 cm' },
      features: ['Triángulos en blanco', 'Ideal exteriores', 'Satinado premium', 'Ligera'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    }
  ];

  const [selectedCabina, setSelectedCabina] = useState(cabinas[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleComprar = async (cabina) => {
    try {
      setIsRedirecting(true);
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/comprar-cabina`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cabinaId: cabina.id,
          nombre: cabina.nombre,
          precioStr: cabina.precio
        })
      });

      const data = await response.json();

      if (data.success && data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Error al generar la compra.');
        setIsRedirecting(false);
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión con el servidor.');
      setIsRedirecting(false);
    }
  };

  const siguienteImagen = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedCabina.imagenes.length);
  };
  const anteriorImagen = () => {
    setCurrentImageIndex((prev) => (prev - 1 + selectedCabina.imagenes.length) % selectedCabina.imagenes.length);
  };

  return (
    <div className="bg-gradient-to-br from-[#03030c] to-[#0a0a1a] min-h-screen text-white pt-[100px] pb-[60px] font-sans">
      <Helmet>
        <title>{selectedCabina.nombre} | GDL Producciones</title>
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
        .font-cyber { font-family: 'Bangers', cursive; letter-spacing: 2px; }
        
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,0,127,0.5); }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="text-[13px] text-gray-500 mb-6 flex items-center gap-1.5 font-medium tracking-wide">
          <Link to="/" className="hover:text-[var(--color-brand-cyan)] transition-colors cursor-pointer no-underline text-inherit">Inicio</Link> 
          <ChevronRight size={14} className="text-gray-600"/> 
          <Link to="/compra-tu-cabina" className="hover:text-[var(--color-brand-cyan)] transition-colors cursor-pointer no-underline text-inherit">Tienda</Link>
          <ChevronRight size={14} className="text-gray-600"/> 
          <span className="text-[var(--color-brand-pink)]">{selectedCabina.nombre}</span>
        </div>

        {/* Card Principal E-Commerce */}
        <div className="bg-[#0a0a1a]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col lg:flex-row mb-10 overflow-hidden">
          
          {/* LADO IZQUIERDO: GALERÍA */}
          <div className="lg:w-[60%] flex flex-col p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/5 relative bg-[#050510]/50">
            
            <div className="flex gap-4">
              {/* Thumbnails verticales (Desktop) */}
              <div className="hidden lg:flex flex-col gap-3 w-[60px] shrink-0">
                {selectedCabina.imagenes.map((img, idx) => (
                  <button 
                    key={idx}
                    onMouseEnter={() => setCurrentImageIndex(idx)}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-[60px] h-[60px] rounded-xl border-2 ${idx === currentImageIndex ? 'border-[var(--color-brand-pink)] shadow-[0_0_15px_rgba(255,0,127,0.4)] scale-105' : 'border-transparent hover:border-white/20 opacity-60 hover:opacity-100'} overflow-hidden bg-black/50 transition-all duration-300`}
                  >
                    <img src={img} className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>

              {/* Imagen Principal */}
              <div className="flex-1 relative aspect-[4/3] flex items-center justify-center p-4 bg-black/40 rounded-2xl border border-white/5 shadow-inner">
                <img 
                  src={selectedCabina.imagenes[currentImageIndex]} 
                  className="w-full h-full object-contain"
                  alt={selectedCabina.nombre} 
                />
                
                {selectedCabina.imagenes.length > 1 && (
                  <>
                    <button onClick={anteriorImagen} className="absolute left-4 lg:hidden w-10 h-10 bg-black/60 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                      <ChevronLeft size={24} className="text-white" />
                    </button>
                    <button onClick={siguienteImagen} className="absolute right-4 lg:hidden w-10 h-10 bg-black/60 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                      <ChevronRight size={24} className="text-white" />
                    </button>
                  </>
                )}
                
                {/* Tag Flotante en la imagen */}
                <div className="absolute top-4 left-4 bg-[var(--color-brand-cyan)] text-[#03030c] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.4)]">
                  {selectedCabina.tag}
                </div>
              </div>
            </div>

            {/* Thumbnails horizontales (Móvil) */}
            <div className="flex lg:hidden gap-3 overflow-x-auto custom-scrollbar pb-2 mt-4">
              {selectedCabina.imagenes.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`shrink-0 w-[60px] h-[60px] rounded-xl border-2 ${idx === currentImageIndex ? 'border-[var(--color-brand-pink)] shadow-[0_0_10px_rgba(255,0,127,0.4)] scale-105' : 'border-transparent opacity-60'} overflow-hidden bg-black/50 transition-all`}
                  >
                    <img src={img} className="w-full h-full object-contain p-1" />
                  </button>
                ))}
            </div>

            {/* Descripción Larga */}
            <div className="mt-10 hidden lg:block">
              <h2 className="text-2xl font-cyber tracking-widest text-[var(--color-brand-pink)] mb-6">DESCRIPCIÓN</h2>
              <p className="text-lg text-gray-300 leading-relaxed font-light mb-8">
                {selectedCabina.descripcion}
              </p>
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                 <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-4">Características Premium</h3>
                 <div className="grid grid-cols-2 gap-4">
                    {selectedCabina.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 size={16} className="text-[var(--color-brand-cyan)] shrink-0" />
                        {feat}
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: INFO DE COMPRA */}
          <div className="lg:w-[40%] p-6 lg:p-8 flex flex-col">
            
            <div className="text-xs text-gray-400 mb-3 flex items-center gap-2 uppercase tracking-wider font-bold">
               <Package size={14} className="text-[var(--color-brand-yellow)]"/> Manufactura Especializada
            </div>
            
            <h1 className="font-cyber text-4xl text-white mb-4 leading-tight">
              {selectedCabina.nombre}
            </h1>
            
            {/* Precio */}
            <div className="mb-4">
              <span className="text-5xl font-black text-[var(--color-brand-yellow)] drop-shadow-[0_0_15px_rgba(255,235,59,0.2)]">
                ${selectedCabina.precio}
              </span>
              <span className="text-xl text-gray-500 font-bold ml-2">MXN</span>
            </div>
            
            <div className="text-sm text-gray-300 mb-6 flex items-center gap-1.5">
              Disponible en <span className="text-[var(--color-brand-cyan)] font-bold">Pagos con tarjeta de crédito</span> mediante Mercado Pago.
            </div>

            {/* Envíos */}
            <div className="mb-8 bg-gradient-to-r from-[var(--color-brand-cyan)]/10 to-transparent p-4 rounded-xl border-l-4 border-[var(--color-brand-cyan)] flex gap-3 items-start">
              <Truck size={24} className="text-[var(--color-brand-cyan)] shrink-0 mt-1" />
              <div>
                 <span className="text-white text-sm font-bold block mb-1">Envíos a todo México</span>
                 <span className="text-gray-400 text-xs leading-relaxed block">Llega <strong className="text-[var(--color-brand-cyan)]">gratis</strong> a CDMX (5km Estadio Azteca).<br/>Bodegas físicas en QRO y GDL. Interior cotizar.</span>
              </div>
            </div>

            {/* SELECTOR DE VARIANTES */}
            <div className="mb-8">
              <div className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-widest flex justify-between items-end">
                <span>Selecciona Diseño:</span>
                <span className="text-[var(--color-brand-pink)] text-xs">{selectedCabina.color}</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-3">
                {cabinas.map(cab => (
                  <button
                    key={cab.id}
                    onClick={() => { setSelectedCabina(cab); setCurrentImageIndex(0); }}
                    className={`relative w-[65px] h-[65px] rounded-xl bg-black/40 border-2 ${selectedCabina.id === cab.id ? 'border-[var(--color-brand-pink)] shadow-[0_0_15px_rgba(255,0,127,0.3)] bg-[rgba(255,0,127,0.1)]' : 'border-white/10 hover:border-white/30'} overflow-hidden p-1 flex items-center justify-center group transition-all`}
                    title={cab.nombre}
                  >
                    <img src={cab.imagenes[0]} className="w-full h-full object-contain" />
                    
                    {/* Tooltip on hover */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#03030c] border border-white/10 text-[var(--color-brand-cyan)] text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded hidden group-hover:block whitespace-nowrap z-50 shadow-xl">
                      {cab.color}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* SPECS TABLE MINI */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
               <div className="font-bold text-[11px] text-gray-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                 <Wrench size={14} /> Ficha Técnica
               </div>
               <div className="grid grid-cols-1 gap-3 text-sm">
                 <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Material</span>
                    <span className="text-white font-semibold">{selectedCabina.specs.material}</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Peso</span>
                    <span className="text-white font-semibold">{selectedCabina.specs.peso}</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Medidas (LxPxA)</span>
                    <span className="text-white font-semibold">{selectedCabina.specs.medidas}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-gray-500">Ensamble</span>
                    <span className="text-white font-semibold">{selectedCabina.specs.ensamble}</span>
                 </div>
               </div>
            </div>

            {/* BOTONES DE COMPRA */}
            <div className="flex flex-col gap-3 mb-6 mt-auto">
              <button 
                onClick={() => handleComprar(selectedCabina)} 
                disabled={isRedirecting}
                className={`w-full py-4 rounded-xl text-white text-base font-black uppercase tracking-widest bg-gradient-to-r from-[var(--color-brand-pink)] to-[#bd00ff] hover:shadow-[0_0_25px_rgba(255,0,127,0.5)] transition-all flex items-center justify-center gap-2 ${isRedirecting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}`}
              >
                <ShoppingBag size={20} />
                {isRedirecting ? 'Procesando...' : 'Comprar Ahora'}
              </button>
              
              <button 
                onClick={() => window.open(selectedCabina.mlLink, '_blank')}
                className="w-full py-3.5 rounded-xl text-[#03030c] text-sm font-bold bg-[#ffe600] hover:bg-[#ffea33] hover:shadow-[0_0_20px_rgba(255,230,0,0.3)] transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <ExternalLink size={16} /> Ver en Mercado Libre
              </button>
            </div>

            <div className="flex flex-col gap-2.5 text-xs text-gray-500 mt-2 bg-black/30 p-4 rounded-xl border border-white/5">
              <div className="flex gap-2 items-start">
                <ShieldCheck size={14} className="shrink-0 mt-0.5 text-green-500" />
                <span><span className="text-white font-bold">Compra Segura</span>, pagos encriptados a través de Mercado Pago.</span>
              </div>
              <div className="flex gap-2 items-start">
                <Ruler size={14} className="shrink-0 mt-0.5 text-[var(--color-brand-pink)]" />
                <span>¿Buscas una cabina a medida? <a href="https://wa.me/525567880698" target="_blank" className="text-[var(--color-brand-pink)] hover:underline font-bold">Contáctanos por WhatsApp</a>.</span>
              </div>
            </div>

          </div>
        </div>
        
        {/* Descripción Móvil */}
        <div className="bg-[#0a0a1a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 lg:hidden mb-10">
           <h2 className="text-xl font-cyber tracking-widest text-[var(--color-brand-pink)] mb-4">DESCRIPCIÓN</h2>
           <p className="text-base text-gray-300 leading-relaxed font-light mb-6">
             {selectedCabina.descripcion}
           </p>
           
           <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
               <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">Características Premium</h3>
               <div className="flex flex-col gap-3">
                  {selectedCabina.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                      <CheckCircle2 size={16} className="text-[var(--color-brand-cyan)] shrink-0" />
                      {feat}
                    </div>
                  ))}
               </div>
            </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
}
