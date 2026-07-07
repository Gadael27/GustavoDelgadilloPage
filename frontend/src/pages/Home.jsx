import { Helmet } from 'react-helmet-async';

import Footer from '../components/Footer';
import GoogleReviews from '../components/GoogleReviews';
import ServicesSection from '../components/ServicesSection';
import HeroSection from '../components/HeroSection';
import GenresSection from '../components/GenresSection';
import SetsSection from '../components/SetsSection';

import GallerySection from '../components/GallerySection';
import FAQSection from '../components/FAQSection';

export default function Home() {
  const abrirWhatsApp = (mensajeCustom = null) => {
    const tuNumeroWhatsapp = "525567880698"; 
    const texto = mensajeCustom || "¡Hola Gustavo! Me interesa cotizar un evento en la CDMX y apartar mi fecha.";
    const mensajeURL = encodeURIComponent(texto);
    const linkCompletoWA = `https://wa.me/${tuNumeroWhatsapp}?text=${mensajeURL}`;
    window.open(linkCompletoWA, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#03030c] min-h-screen text-white font-body relative">
      <Helmet>
        <title>DJ Gustavo Delgadillo | Renta de Sonido y DJ para Eventos</title>
        <meta name="description" content="Renta de DJ, renta de sonido profesional e iluminación robótica. El mejor ambiente musical 100% en vivo para tu boda o fiesta." />
        <meta name="keywords" content="Renta de DJ, Renta de equipo de sonido, Sonido para fiestas, DJ Gustavo Delgadillo" />
      </Helmet>

      {/* 🟢 BOTÓN FLOTANTE WA */}
      <button 
        onClick={() => abrirWhatsApp()}
        className="wa-float border-none cursor-pointer p-0" title="Contactar por WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </button>

      {/* MODULARIZED SECTIONS */}
      <HeroSection />

      <div className="max-w-[1200px] mx-auto px-5 w-full">
        
        <GallerySection />

        {/* MODULARIZED SECTIONS */}
        <GenresSection />
        <SetsSection />

        <GoogleReviews />
        <ServicesSection />

        <FAQSection />
      </div>
      
      <Footer />
    </div>
  );
}