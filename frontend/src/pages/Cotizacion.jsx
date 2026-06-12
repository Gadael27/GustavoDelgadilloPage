import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, CreditCard, Clock, CheckCircle, AlertTriangle, 
  MapPin, User, Phone, Mail, Calendar, Users, Home, 
  Package, Sparkles, ChevronDown, Info, MessageSquare, Lock, Check
} from 'lucide-react';

// ==========================================
// COMPONENTE UI: INPUT FIELD (TAILWIND)
// ==========================================
const InputField = ({ icon: Icon, label, name, type = "text", placeholder, value, error, touched, onChange, onBlur, children, ...props }) => (
  <div className="mb-4">
    <label className="text-gray-300 text-sm flex items-center gap-2 mb-2 font-semibold uppercase tracking-wide">
      <Icon size={14} className={error && touched ? "text-red-500" : "text-cyan-400"} />
      {label} <span className="text-pink-500">*</span>
    </label>
    {children || (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full p-3 md:p-4 rounded-xl bg-[#0a0a1a] text-white text-base outline-none transition-all duration-300 border ${
          error && touched 
            ? 'border-red-500 shadow-[0_0_10px_rgba(255,68,68,0.2)]' 
            : 'border-[#2a2a4e] focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,242,254,0.1)]'
        }`}
        {...props}
      />
    )}
    {error && touched && (
      <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
        <AlertTriangle size={12} /> {error}
      </div>
    )}
  </div>
);

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function Cotizacion() {
  const todayDateStr = new Date().toISOString().split('T')[0];
  
  // ESTADOS DEL FORMULARIO
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', telefono: '', correo: '', 
    fecha: todayDateStr, horaInicio: '14:00', tipoEvento: 'Boda', 
    locacion: 'Interior', direccion: '', detalles: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ESTADOS DE NEGOCIO
  const [packageType, setPackageType] = useState('Base');
  const [extraHours, setExtraHours] = useState(0); 
  const [peopleRange, setPeopleRange] = useState('10-100');
  const [paymentType, setPaymentType] = useState('anticipo'); 
  const [mpLoaded, setMpLoaded] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isTimeSlotBlocked, setIsTimeSlotBlocked] = useState(false);

  // AUTOCOMPLETADO
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const baseDireccionesCDMX = [
    'Estadio Azteca, Calz. de Tlalpan, Coyoacán, CDMX',
    'Jardines del Pedregal, Álvaro Obregón, CDMX',
    'Polanco, Miguel Hidalgo, CDMX',
    'Paseo de la Reforma, Cuauhtémoc, CDMX',
    'Centro Histórico, Cuauhtémoc, CDMX',
    'Condesa, Cuauhtémoc, CDMX',
    'Roma Norte, Cuauhtémoc, CDMX',
    'Santa Fe, Cuajimalpa de Morelos, CDMX'
  ];

  const mockGoogleCalendarEvents = [
    { fecha: '2026-06-15', horaInicio: '13:00', horasTotales: 5 }, 
    { fecha: '2026-06-20', horaInicio: '20:00', horasTotales: 7 }  
  ];

  // PARÁMETROS URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paqueteElegido = params.get('paquete');
    if (paqueteElegido === 'Base' || paqueteElegido === 'Premium') setPackageType(paqueteElegido);
  }, []);

  // DETECTOR DE COLISIONES
  useEffect(() => {
    const checkCollision = () => {
      const selectedDate = formData.fecha;
      const [selHour, selMin] = formData.horaInicio.split(':').map(Number);
      const startMinutes = selHour * 60 + selMin;
      const totalDurationMinutes = (5 + extraHours) * 60;
      const endMinutes = startMinutes + totalDurationMinutes;

      const sameDayEvents = mockGoogleCalendarEvents.filter(e => e.fecha === selectedDate);
      let isBlocked = false;

      for (let event of sameDayEvents) {
        const [evHour, evMin] = event.horaInicio.split(':').map(Number);
        const evStartMinutes = evHour * 60 + evMin;
        const evEndMinutesWithTransit = evStartMinutes + (event.horasTotales * 60) + 180;

        if (
          (startMinutes >= evStartMinutes && startMinutes < evEndMinutesWithTransit) ||
          (endMinutes > evStartMinutes && endMinutes <= evEndMinutesWithTransit) ||
          (startMinutes <= evStartMinutes && endMinutes >= evEndMinutesWithTransit)
        ) {
          isBlocked = true;
          break;
        }
      }
      setIsTimeSlotBlocked(isBlocked);
    };
    checkCollision();
  }, [formData.fecha, formData.horaInicio, extraHours]);

  // SDK MERCADO PAGO
  useEffect(() => {
    const mpScript = document.createElement('script');
    mpScript.src = 'https://sdk.mercadopago.com/js/v2';
    mpScript.async = true;
    mpScript.onload = () => setMpLoaded(true);
    document.body.appendChild(mpScript);
    return () => { document.body.removeChild(mpScript); };
  }, []);

  // VALIDACIONES
  const validateField = (name, value) => {
    switch (name) {
      case 'nombre':
      case 'apellido':
        if (!value.trim()) return 'Este campo es obligatorio';
        if (value.trim().length < 2) return 'Mínimo 2 caracteres';
        return '';
      case 'telefono':
        if (!value) return 'Teléfono obligatorio';
        if (!/^\d{10}$/.test(value)) return '10 dígitos requeridos';
        return '';
      case 'correo':
        if (!value) return 'Correo obligatorio';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Correo inválido';
        return '';
      case 'direccion':
        if (!value.trim()) return 'Dirección obligatoria';
        return '';
      default: return '';
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const isFormValid = () => {
    const newErrors = {};
    ['nombre', 'apellido', 'telefono', 'correo', 'direccion'].forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    setTouched({ nombre: true, apellido: true, telefono: true, correo: true, direccion: true });
    return Object.keys(newErrors).length === 0 && !isTimeSlotBlocked;
  };

  const handlePhoneChange = (e) => handleChange('telefono', e.target.value.replace(/\D/g, '').slice(0, 10));

  const handleDireccionChange = (e) => {
    const value = e.target.value;
    handleChange('direccion', value);
    if (value.length > 2) {
      setSuggestions(baseDireccionesCDMX.filter(d => d.toLowerCase().includes(value.toLowerCase())));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // CÁLCULOS
  const calculateTotal = () => {
    let serviceBasePrice = packageType === 'Base' ? 5500 : 7500;
    const extraHoursCost = extraHours * 1200;
    let peopleAdditionalCost = 0;
    if (peopleRange === '100-200') peopleAdditionalCost = 3000;
    else if (peopleRange === '200-300') peopleAdditionalCost = 5500;
    else if (peopleRange === '300+') peopleAdditionalCost = 7500;

    const totalEvent = serviceBasePrice + extraHoursCost + peopleAdditionalCost;
    const anticipo = 1500;
    const saldoPendiente = totalEvent - anticipo;
    const montoPagar = paymentType === 'completo' ? totalEvent : anticipo;

    return { totalEvent, extraHoursCost, peopleAdditionalCost, anticipo, saldoPendiente, montoPagar };
  };

  const { totalEvent, extraHoursCost, peopleAdditionalCost, saldoPendiente, montoPagar } = calculateTotal();

  const handleSubmitContract = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const response = await fetch('http://localhost:5000/api/reservaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, totalEvent, paymentType, montoPagar })
      });
      const data = await response.json();
      if (data.success && data.init_point) {
        setIsRedirecting(true);
        setTimeout(() => { window.location.href = data.init_point; }, 2200);
      } else {
        alert('Error al procesar la reserva.');
      }
    } catch (error) {
      alert('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#121230] to-[#0d0d2a] py-24 px-4 font-sans text-white">
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

        <form onSubmit={handleSubmitContract} className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8">
          
          {/* ========== COLUMNA IZQUIERDA ========== */}
          <div className="flex flex-col gap-8">

            {/* SECCIÓN 1: DATOS PERSONALES */}
            <div className="bg-gradient-to-br from-[#0a0a1a]/90 to-[#070714]/95 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-cyber text-2xl m-0 text-white">TUS DATOS</h2>
                  <p className="text-gray-400 text-xs mt-1">Información de contacto obligatoria</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField icon={User} label="Nombre" name="nombre" placeholder="Ej. Juan" value={formData.nombre} error={errors.nombre} touched={touched.nombre} onChange={e => handleChange('nombre', e.target.value)} onBlur={() => handleBlur('nombre')} />
                <InputField icon={User} label="Apellido" name="apellido" placeholder="Ej. Pérez" value={formData.apellido} error={errors.apellido} touched={touched.apellido} onChange={e => handleChange('apellido', e.target.value)} onBlur={() => handleBlur('apellido')} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField icon={Phone} label="Teléfono" name="telefono" type="tel" placeholder="10 dígitos" value={formData.telefono} error={errors.telefono} touched={touched.telefono} onChange={handlePhoneChange} onBlur={() => handleBlur('telefono')} />
                <InputField icon={Mail} label="Correo" name="correo" type="email" placeholder="juan@correo.com" value={formData.correo} error={errors.correo} touched={touched.correo} onChange={e => handleChange('correo', e.target.value)} onBlur={() => handleBlur('correo')} />
              </div>
            </div>

            {/* SECCIÓN 2: AGENDA Y EVENTO */}
            <div className="bg-gradient-to-br from-[#0a0a1a]/90 to-[#070714]/95 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-cyber text-2xl m-0 text-white">AGENDA TU EVENTO</h2>
                  <p className="text-gray-400 text-xs mt-1">Selecciona fecha y detalles logísticos</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField icon={Calendar} label="Fecha del Evento" name="fecha" type="date" value={formData.fecha} error={errors.fecha} touched={touched.fecha} onChange={e => handleChange('fecha', e.target.value)} min={todayDateStr} />
                <InputField icon={Clock} label="Hora de Inicio" name="horaInicio" type="time" value={formData.horaInicio} onChange={e => handleChange('horaInicio', e.target.value)} />
              </div>

              {isTimeSlotBlocked && (
                <div className="bg-red-500/10 border-2 border-red-500 p-4 rounded-xl flex items-start gap-3 mt-2 mb-4">
                  <AlertTriangle size={22} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-red-400 font-bold text-sm mb-1">Horario no disponible</div>
                    <div className="text-red-300/80 text-xs leading-relaxed">Este horario interfiere con otro evento agendado o con el tiempo de traslado (+3 hrs).</div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <InputField icon={Sparkles} label="Tipo de Evento" name="tipoEvento">
                  <select value={formData.tipoEvento} onChange={e => handleChange('tipoEvento', e.target.value)} className="w-full p-3 md:p-4 rounded-xl bg-[#0a0a1a] text-white text-base border border-[#2a2a4e] outline-none cursor-pointer">
                    <option value="Boda">Boda de Gala</option>
                    <option value="XV Años">XV Años</option>
                    <option value="Corporativo">Evento Corporativo</option>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Otro">Otro</option>
                  </select>
                </InputField>

                <InputField icon={Home} label="Entorno" name="locacion">
                  <select value={formData.locacion} onChange={e => handleChange('locacion', e.target.value)} className="w-full p-3 md:p-4 rounded-xl bg-[#0a0a1a] text-white text-base border border-[#2a2a4e] outline-none cursor-pointer">
                    <option value="Interior">Interior</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Jardín">Jardín</option>
                    <option value="Salón">Salón de Eventos</option>
                  </select>
                </InputField>
              </div>

              <div className="relative mt-4">
                <InputField icon={MapPin} label="Dirección Completa (CDMX)" name="direccion" placeholder="Calle, colonia, alcaldía..." value={formData.direccion} error={errors.direccion} touched={touched.direccion} onChange={handleDireccionChange} onBlur={() => { handleBlur('direccion'); setTimeout(() => setShowSuggestions(false), 200); }} />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-[#0f0f24] border border-[#2a2a4e] rounded-xl z-50 mt-2 max-h-48 overflow-y-auto shadow-2xl">
                    {suggestions.map((item, idx) => (
                      <div key={idx} className="p-3 text-gray-300 hover:bg-[#1a1a3e] hover:text-white cursor-pointer flex items-center gap-3 text-sm border-b border-white/5 transition-colors" onClick={() => { setFormData(prev => ({...prev, direccion: item})); setShowSuggestions(false); setErrors(prev=>({...prev, direccion: ''})) }}>
                        <MapPin size={14} className="text-cyan-400" /> {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* NUEVO: DETALLES ADICIONALES */}
              <div className="mt-4">
                 <label className="text-gray-300 text-sm flex items-center gap-2 mb-2 font-semibold uppercase tracking-wide">
                  <Info size={14} className="text-cyan-400" />
                  Detalles Adicionales <span className="text-gray-500 font-normal normal-case">(Opcional)</span>
                </label>
                <textarea 
                  rows="3"
                  placeholder="¿Hay escaleras? ¿Alguna instrucción especial para llegar?"
                  value={formData.detalles}
                  onChange={e => handleChange('detalles', e.target.value)}
                  className="w-full p-4 rounded-xl bg-[#0a0a1a] text-white text-base border border-[#2a2a4e] focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,242,254,0.1)] outline-none resize-none transition-all"
                />
              </div>
            </div>

            {/* SECCIÓN: COTIZACIÓN FUERA DE CDMX */}
            <div className="bg-gradient-to-br from-[#0a1a0a]/90 to-[#071407]/95 border border-green-500/20 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <MessageSquare size={16} className="text-white" />
                </div>
                <div>
                  <h2 className="font-cyber text-lg m-0 text-white">FUERA DE CDMX</h2>
                  <p className="text-gray-400 text-xs">¿Eres de otro estado?</p>
                </div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-center">
                <p className="text-gray-300 text-sm mb-4">Realiza tu cotización personalizada. Enviaremos disponibilidad y opciones de transporte.</p>
                <button type="button" onClick={() => window.location.href = 'https://wa.me/525567880698'} className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 uppercase text-sm tracking-wide transition-transform hover:-translate-y-1 shadow-[0_4px_15px_rgba(37,211,102,0.3)]">
                  <MessageSquare size={16} /> Cotizar por WhatsApp
                </button>
              </div>
            </div>

            {/* SECCIÓN 3: CONFIGURACIÓN DEL PAQUETE */}
            <div className="bg-gradient-to-br from-[#0a0a1a]/90 to-[#070714]/95 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <Package size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-cyber text-2xl m-0 text-white">TU PAQUETE</h2>
                  <p className="text-gray-400 text-xs mt-1">Personaliza tu experiencia</p>
                </div>
              </div>

              {/* PAQUETES (CON DISEÑO PREMIUM MEJORADO) */}
              <div className="mb-6">
                <label className="text-gray-300 text-sm font-semibold uppercase tracking-wide block mb-3">Selecciona tu Paquete</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* PAQUETE BASE */}
                  <div onClick={() => setPackageType('Base')} className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative ${packageType === 'Base' ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(0,242,254,0.15)]' : 'border-transparent bg-white/5 hover:bg-white/10'}`}>
                    <div className="text-xl font-black text-cyan-400 mb-1">BASE</div>
                    <div className="text-3xl font-black text-white mb-4">$5,500 <span className="text-sm font-normal text-gray-500">MXN</span></div>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li className="flex items-center gap-2"><Check size={14} className="text-cyan-400"/> 5 horas de servicio</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-cyan-400"/> Audio lineal estándar</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-cyan-400"/> Cabina DJ iluminada</li>
                    </ul>
                  </div>

                  {/* PAQUETE PREMIUM MEJORADO */}
                  <div onClick={() => setPackageType('Premium')} className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${packageType === 'Premium' ? 'border-pink-500 bg-pink-500/10 shadow-[0_0_25px_rgba(255,0,127,0.2)]' : 'border-white/10 bg-gradient-to-br from-pink-500/5 to-purple-500/5 hover:border-pink-500/50'}`}>
                    {/* Badge Más Popular */}
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                      Más Popular
                    </div>
                    <div className="text-xl font-black text-pink-500 mb-1">PREMIUM</div>
                    <div className="text-3xl font-black text-white mb-4">$7,500 <span className="text-sm font-normal text-gray-500">MXN</span></div>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle size={14} className="text-pink-500"/> 5 horas de servicio</li>
                      <li className="flex items-center gap-2"><CheckCircle size={14} className="text-pink-500"/> Estructura Truss completa</li>
                      <li className="flex items-center gap-2"><CheckCircle size={14} className="text-pink-500"/> Ingeniero de iluminación</li>
                      <li className="flex items-center gap-2"><CheckCircle size={14} className="text-pink-500"/> Audio Line Array Pro</li>
                    </ul>
                  </div>

                </div>
              </div>

              <div className="mb-6">
                <label className="text-gray-300 text-sm font-semibold uppercase tracking-wide block mb-3">Horas Adicionales <span className="text-gray-500 normal-case">(Máx. 2)</span></label>
                <div className="flex gap-3">
                  {[0, 1, 2].map((h) => (
                    <button key={h} type="button" onClick={() => setExtraHours(h)} className={`flex-1 py-3 rounded-xl border-2 transition-all ${extraHours === h ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.2)]' : 'border-transparent bg-white/5 hover:bg-white/10'}`}>
                      <div className={`text-base font-bold ${extraHours === h ? 'text-yellow-400' : 'text-white'}`}>{h === 0 ? 'Sin extra' : `+${h}h`}</div>
                      <div className="text-xs text-gray-500 mt-1">{h === 0 ? '5 hrs totales' : `$${h * 1200} extra`}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-semibold uppercase tracking-wide flex items-center gap-2 mb-3">
                  <Users size={14} /> Número de Asistentes
                </label>
                <select value={peopleRange} onChange={e => setPeopleRange(e.target.value)} className="w-full p-4 rounded-xl bg-[#0a0a1a] text-white text-base border border-[#2a2a4e] outline-none cursor-pointer">
                  <option value="10-100">10 a 100 personas (Precio base)</option>
                  <option value="100-200">100 a 200 personas (+$3,000)</option>
                  <option value="200-300">200 a 300 personas (+$5,500)</option>
                  <option value="300+">300 o más personas (+$7,500)</option>
                </select>
              </div>
            </div>
          </div>

          {/* ========== COLUMNA DERECHA: RESUMEN ========== */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-gradient-to-br from-[#0a0a1a]/95 to-[#140514]/95 border-2 border-pink-500/30 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
              <h2 className="font-cyber text-3xl mb-6 text-white text-center">RESUMEN</h2>

              <div className="flex flex-col gap-3 border-b border-white/10 pb-6 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Paquete {packageType}</span>
                  <span className="text-white font-bold">${packageType === 'Base' ? '5,500' : '7,500'}</span>
                </div>
                {extraHours > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Horas extra ({extraHours}h)</span>
                    <span className="text-yellow-400 font-bold">+${extraHoursCost.toLocaleString()}</span>
                  </div>
                )}
                {peopleAdditionalCost > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Ajuste por aforo</span>
                    <span className="text-yellow-400 font-bold">+${peopleAdditionalCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-400">Duración total</span>
                  <span className="text-cyan-400 font-bold">{5 + extraHours} hrs</span>
                </div>
              </div>

              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-5 text-center mb-6">
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Total del Evento</div>
                <div className="text-4xl font-black text-yellow-400 leading-none">
                  ${totalEvent.toLocaleString()} <span className="text-base text-gray-500">MXN</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-gray-300 text-xs font-bold uppercase tracking-widest block mb-4">¿Cómo deseas pagar?</label>
                <div className="flex flex-col gap-3">
                  
                  <div onClick={() => setPaymentType('anticipo')} className={`p-4 rounded-xl border-2 flex items-center gap-4 cursor-pointer transition-all ${paymentType === 'anticipo' ? 'border-pink-500 bg-pink-500/10 shadow-lg' : 'border-white/10 bg-white/5'}`}>
                    <div className={`w-5 h-5 rounded-full border-4 shrink-0 ${paymentType === 'anticipo' ? 'border-pink-500 bg-white' : 'border-gray-500'}`} />
                    <div className="flex-1">
                      <div className="font-bold text-white text-sm">Apartar con anticipo</div>
                      <div className="text-gray-400 text-xs mt-0.5">Paga hoy y liquida el día del evento</div>
                    </div>
                    <div className="font-black text-green-400 text-lg">$1,500</div>
                  </div>

                  <div onClick={() => setPaymentType('completo')} className={`p-4 rounded-xl border-2 flex items-center gap-4 cursor-pointer transition-all ${paymentType === 'completo' ? 'border-pink-500 bg-pink-500/10 shadow-lg' : 'border-white/10 bg-white/5'}`}>
                    <div className={`w-5 h-5 rounded-full border-4 shrink-0 ${paymentType === 'completo' ? 'border-pink-500 bg-white' : 'border-gray-500'}`} />
                    <div className="flex-1">
                      <div className="font-bold text-white text-sm">Pago Completo</div>
                      <div className="text-gray-400 text-xs mt-0.5">Liquida el total ahora</div>
                    </div>
                    <div className="font-black text-yellow-400 text-lg">${totalEvent.toLocaleString()}</div>
                  </div>

                </div>
              </div>

              <div className={`text-center p-5 rounded-2xl border mb-6 ${paymentType === 'completo' ? 'bg-yellow-400/10 border-yellow-400/30' : 'bg-green-400/10 border-green-400/30'}`}>
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${paymentType === 'completo' ? 'text-yellow-400' : 'text-green-400'}`}>Monto a pagar ahora</div>
                <div className={`text-3xl font-black ${paymentType === 'completo' ? 'text-yellow-400' : 'text-green-400'}`}>
                  ${montoPagar.toLocaleString()} <span className="text-sm text-gray-400 font-normal">MXN</span>
                </div>
                {paymentType === 'anticipo' && (
                  <div className="text-xs text-gray-400 mt-2">Saldo pendiente: ${saldoPendiente.toLocaleString()} MXN</div>
                )}
              </div>

              <button type="submit" disabled={isRedirecting || isTimeSlotBlocked} className={`w-full py-4 rounded-xl text-white text-lg font-bold uppercase tracking-wide flex items-center justify-center gap-3 transition-all ${isTimeSlotBlocked ? 'bg-gray-700 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(59,130,246,0.4)]'}`}>
                <CreditCard size={22} />
                {isRedirecting ? 'Procesando...' : `Pagar ${paymentType === 'completo' ? 'completo' : 'anticipo'}`}
              </button>

              {isRedirecting && (
                <div className="mt-4 bg-cyan-400/10 border border-cyan-400/30 p-3 rounded-xl flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-cyan-400 font-bold text-sm">Redirigiendo a Mercado Pago...</span>
                </div>
              )}

              <div className="mt-5 text-center flex items-center justify-center gap-2 text-gray-500 text-xs">
                <ShieldCheck size={14} className="text-green-500" />
                Pago seguro procesado por Mercado Pago
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}