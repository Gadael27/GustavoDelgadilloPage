import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import PackageCard from './PackageCard';

export default function ServicesSection() {
  const navigate = useNavigate();

  const djServices = [
    {
      id: 'Base',
      name: 'DJ BASE',
      price: '$5,500',
      time: '5 Horas de Servicio',
      extraHour: '$1,200',
      color: '#00f2fe',
      description: 'Configuración ideal con excelente acústica e iluminación controlada para espacios medianos.',
      features: [
        '5 Horas de Servicio (Hora extra: $1,200)',
        'DJ Profesional con set interactivo y mezcla en vivo',
        'Cabina de DJ geométrica a elegir',
        'Sistema de audio optimizado (Bocinas de alta fidelidad)',
        'Sistemas de Luces audiorítmicas montadas',
        'Válido para CDMX (Al interior de la república requiere cotización)'
      ]
    },
    {
      id: 'Premium',
      name: 'DJ PREMIUM',
      price: '$7,500',
      time: '5 Horas de Servicio',
      extraHour: '$1,200',
      color: '#ff007f',
      description: 'Producción masiva con efectos especiales de club nocturno, pirotecnia y despliegue acústico robusto.',
      features: [
        '5 Horas de Servicio (Hora extra: $1,200)',
        'DJ Máster con set premium y mezcla de géneros en vivo',
        'Cabina de DJ geométrica premium a elegir',
        'Sistema de audio de alta potencia (4 Bocinas activas profesionales)',
        'Estructura de iluminación completa con Cabezas Robóticas y Lasers',
        'Máquinas de efectos: Máquinas de CO2 Megablast + Máquinas de Humo',
        'Pirotecnia fría integrada: Chisperos controlados para momentos cumbre'
      ]
    }
  ];



  const handleReserve = (id) => {
    navigate(`/cotizacion?paquete=${id}`);
  };

  const abrirWhatsApp = () => {
    const tuNumeroWhatsapp = "525567880698"; 
    const mensaje = encodeURIComponent("¡Hola, GD Producciones! Me interesa cotizar un evento fuera de la CDMX.");
    window.open(`https://wa.me/${tuNumeroWhatsapp}?text=${mensaje}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="servicios" style={{ paddingTop: '80px', marginBottom: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 className="font-cyber section-title" style={{ fontSize: '3rem', margin: '0' }}>
          ELIGE TU <span style={{ color: '#ff007f' }}>EXPERIENCIA</span>
        </h2>
        <p style={{ color: '#666', marginTop: '10px', fontSize: '1.1rem' }}>
          Apartado seguro vía Mercado Pago. Fechas limitadas.
        </p>
      </div>

      <style>{`
        .packages-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 80px;
        }
        @media (max-width: 900px) {
          .packages-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="packages-grid">
        {djServices.map((service) => (
          <PackageCard key={service.id} service={service} onReserve={handleReserve} />
        ))}
      </div>

      {/* FORÁNEA */}
      <div style={{ 
        padding: '60px 40px', borderRadius: '28px', marginBottom: '80px',
        background: 'linear-gradient(135deg, #050518, #0d0624)',
        border: '1px solid rgba(0,242,254,0.2)', textAlign: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        <div className="laser" style={{ top: '50%', animationDuration: '12s' }} />
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            color: '#00f2fe', fontSize: '0.9rem', fontWeight: 700,
            letterSpacing: '3px', marginBottom: '20px'
          }}>
            <MapPin size={20} /> LOGÍSTICA NACIONAL
          </div>
          
          <h2 className="font-cyber" style={{ fontSize: '3rem', margin: '0 0 20px 0', lineHeight: '1.1' }}>
            ¿TU EVENTO ES FUERA DE <span style={{ color: '#ff007f' }}>CDMX</span>?
          </h2>
          
          <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '35px' }}>
            Llevamos el arsenal completo a cualquier estado de la República. 
            Audio lineal, iluminación robótica Truss y efectos especiales incluidos. 
            Cotizamos viáticos personalizados y aseguramos tu fecha.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px' }}>
            {['Jalisco', 'Nuevo León', 'Quintana Roo', 'Puebla', 'Guanajuato'].map(state => (
              <div key={state} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '20px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#888', fontSize: '0.85rem'
              }}>
                <MapPin size={14} /> {state}
              </div>
            ))}
          </div>

          <button
            onClick={abrirWhatsApp}
            style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            background: '#25d366', color: '#fff', padding: '18px 40px',
            borderRadius: '50px', fontSize: '1.2rem', fontWeight: 800,
            textDecoration: 'none', boxShadow: '0 10px 30px rgba(37,211,102,0.3)',
            transition: 'all 0.3s', border: '2px solid rgba(255,255,255,0.2)', cursor: 'pointer'
          }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(37,211,102,0.5)'; }}
             onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,211,102,0.3)'; }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            COTIZAR EVENTO FORÁNEO
          </button>
        </div>
      </div>

    </div>
  );
}
