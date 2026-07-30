import { useState } from 'react';
import { Zap, Star, PartyPopper, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export default function PackageCard({ service, onReserve }) {
  const isPremium = service.id === 'Premium';
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`group select-none flex flex-col ${isPremium ? "shadow-[0_0_60px_rgba(255,0,127,0.2)] hover:shadow-[0_0_80px_rgba(255,0,127,0.4)]" : "glass-card hover:shadow-[0_0_50px_rgba(0,242,254,0.3)]"} transition-all duration-500`}
      style={{
        borderRadius: '16px', 
        cursor: 'pointer',
        background: isPremium ? 'linear-gradient(135deg, #0a0a24, #150820)' : 'rgba(10, 10, 36, 0.7)',
        border: `2px solid ${service.color}`, 
        position: 'relative', 
        overflow: 'hidden',
        height: '100%'
      }}
      onClick={(e) => {
        // Solo navegar si no se está haciendo click en el botón de expandir
        if (!e.target.closest('.expand-btn')) {
          onReserve(service.id);
        }
      }}
    >
      {/* CONTENIDO DE LA TARJETA */}
      <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
          <div>
            <h3 className="font-cyber" style={{ fontSize: '2.4rem', color: service.color, margin: '0', letterSpacing: '1px' }}>{service.name}</h3>
          </div>
          {!isPremium && (
            <div style={{ 
              padding: '8px 16px', borderRadius: '20px', background: `${service.color}1a`,
              border: `1px solid ${service.color}4d`, color: service.color, fontSize: '0.8rem', fontWeight: 800
            }}>
              POPULAR
            </div>
          )}
          {isPremium && (
            <div style={{ 
              padding: '8px 16px', borderRadius: '20px', background: `${service.color}1a`,
              border: `1px solid ${service.color}4d`, color: service.color, fontSize: '0.8rem', fontWeight: 800,
              display: 'flex', alignItems: 'center', gap: '5px'
            }}>
              <Star size={12} fill={service.color} /> VIP
            </div>
          )}
        </div>

        <div style={{ 
          borderTop: `1px solid ${service.color}33`, 
          borderBottom: `1px solid ${service.color}33`, 
          padding: '25px 0', marginBottom: '25px' 
        }}>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: isPremium ? '#fff' : '#fff', lineHeight: '1', textShadow: `0 0 20px ${service.color}66` }}>
            {service.price} <span style={{ fontSize: '1rem', color: '#aaa', fontWeight: 400 }}>MXN</span>
          </div>
        </div>

        {/* LISTA RESUMIDA (Siempre visible) */}
        {!isExpanded && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {service.features.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#eee', fontSize: '1.05rem', lineHeight: '1.4' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `${service.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  {isPremium ? <Star size={14} color={service.color} fill={service.color} /> : <Zap size={14} color={service.color} />}
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* LISTA COMPLETA DETALLADA (Oculta por defecto) */}
        {isExpanded && service.fullFeatures && (
          <div className="animate-fadeIn mt-2 mb-6 p-4 rounded-xl" style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${service.color}33` }}>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
              <CheckCircle2 size={16} color={service.color} /> Equipo Incluido a Detalle:
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {service.fullFeatures.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#ccc', fontSize: '0.95rem', lineHeight: '1.3' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: service.color, marginTop: '6px', flexShrink: 0 }}></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BOTÓN PARA EXPANDIR/CONTRAER */}
        {service.fullFeatures && (
          <button 
            className="expand-btn flex items-center justify-center gap-2 w-full py-2 mb-6 text-sm font-bold tracking-wider hover:text-white transition-colors"
            style={{ color: service.color }}
            onClick={(e) => {
              e.stopPropagation(); // Evita que se dispare el onReserve
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <>Ver Resumen <ChevronUp size={16} /></>
            ) : (
              <>Ver Equipo Detallado <ChevronDown size={16} /></>
            )}
          </button>
        )}

      <div style={{ marginTop: 'auto' }}>
        <button 
          className={isPremium ? "neon-pulse" : ""}
          style={isPremium ? {
            width: '100%', padding: '18px', borderRadius: '14px',
            background: `linear-gradient(135deg, ${service.color}, #bd00ff)`, border: 'none',
            color: '#fff', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer',
            transition: 'all 0.3s', letterSpacing: '1px', textTransform: 'uppercase'
          } : {
            width: '100%', padding: '18px', borderRadius: '14px',
            background: `${service.color}1a`, border: `2px solid ${service.color}66`,
            color: service.color, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer',
            transition: 'all 0.3s', letterSpacing: '1px', textTransform: 'uppercase'
          }} 
          onMouseEnter={e => { 
            if(isPremium) e.currentTarget.style.transform = 'scale(1.02)'; 
            else { e.target.style.background = service.color; e.target.style.color = '#03030c'; }
          }}
          onMouseLeave={e => { 
            if(isPremium) e.currentTarget.style.transform = 'scale(1)'; 
            else { e.target.style.background = `${service.color}1a`; e.target.style.color = service.color; }
          }}
          onClick={(e) => { e.stopPropagation(); onReserve(service.id); }}
        >
          {isPremium ? (
            <>AGENDAR PREMIUM <PartyPopper size={20} style={{ marginLeft: '8px', display: 'inline', verticalAlign: 'middle' }} /></>
          ) : (
            `AGENDAR PAQUETE ${service.id}`
          )}
        </button>
      </div>
      </div>
    </div>
  );
}
