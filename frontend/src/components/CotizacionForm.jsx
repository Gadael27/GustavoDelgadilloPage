import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import { addDays } from 'date-fns';
import { 
  User, Phone, Mail, Calendar, Clock, 
  MapPin, Users, Home, Package, Sparkles, 
  Check, CheckCircle, AlertTriangle, MessageSquare
} from 'lucide-react';
import InputField from './InputField';
import { useCotizacionStore } from '../store/useCotizacionStore';

export default function CotizacionForm() {
  const { 
    formData, errors, touched, 
    packageType, extraHours, peopleRange, 
    isTimeSlotBlocked, excludedDates, dbEvents,
    handleChange, handleBlur, setPackageType, setExtraHours, setPeopleRange
  } = useCotizacionStore();

  const handlePhoneChange = (e) => handleChange('telefono', e.target.value.replace(/\D/g, '').slice(0, 10));

  return (
    <div className="flex flex-col gap-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
            
            {/* PAQUETE BASE */}
            <div onClick={() => setPackageType('Base')} className={`p-5 rounded-2xl border-2 cursor-pointer select-none transition-all duration-300 relative flex flex-col ${packageType === 'Base' ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(0,242,254,0.15)]' : 'border-transparent bg-white/5 hover:bg-white/10'}`}>
              <div className="text-xl font-black text-cyan-400 mb-1">BASE</div>
              <div className="text-2xl font-black text-white mb-4">$5,500 <span className="text-xs font-normal text-gray-500">MXN</span></div>
              <ul className="text-sm text-gray-200 font-medium space-y-3 flex-grow">
                <li className="flex items-center gap-2"><Check size={16} className="text-cyan-400 shrink-0"/> 5 Horas de música continua</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-cyan-400 shrink-0"/> Sonido para hasta 80 personas</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-cyan-400 shrink-0"/> Cabina DJ iluminada</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-cyan-400 shrink-0"/> Luces básicas de pista</li>
              </ul>
            </div>

            {/* PAQUETE PRO */}
            <div onClick={() => setPackageType('Pro')} className={`p-5 rounded-2xl border-2 cursor-pointer select-none transition-all duration-300 relative flex flex-col ${packageType === 'Pro' ? 'border-pink-500 bg-pink-500/10 shadow-[0_0_25px_rgba(255,0,127,0.2)]' : 'border-transparent bg-white/5 hover:bg-white/10'}`}>
              <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
                Nuevo
              </div>
              <div className="text-xl font-black text-pink-500 mb-1">PRO</div>
              <div className="text-2xl font-black text-white mb-4">$7,500 <span className="text-xs font-normal text-gray-500">MXN</span></div>
              <ul className="text-sm text-white font-semibold space-y-3 flex-grow drop-shadow-md">
                <li className="flex items-center gap-2"><Check size={16} className="text-pink-400 shrink-0 drop-shadow-[0_0_5px_rgba(255,0,127,0.8)]"/> 5 Horas de música continua</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-pink-400 shrink-0 drop-shadow-[0_0_5px_rgba(255,0,127,0.8)]"/> Sonido potente (150 personas)</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-pink-400 shrink-0 drop-shadow-[0_0_5px_rgba(255,0,127,0.8)]"/> Luces robóticas de antro</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-pink-400 shrink-0 drop-shadow-[0_0_5px_rgba(255,0,127,0.8)]"/> Máquina de humo para ambiente</li>
              </ul>
            </div>

            {/* PAQUETE PREMIUM MEJORADO */}
            <div onClick={() => setPackageType('Premium')} className={`p-5 rounded-2xl border-2 cursor-pointer select-none transition-all duration-300 relative overflow-hidden flex flex-col ${packageType === 'Premium' ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_25px_rgba(250,204,21,0.2)]' : 'border-white/10 bg-gradient-to-br from-yellow-400/5 to-amber-600/5 hover:border-yellow-400/50'}`}>
              {/* Badge Más Popular */}
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-[9px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
                Más Popular
              </div>
              <div className="text-xl font-black text-yellow-400 mb-1">PREMIUM</div>
              <div className="text-2xl font-black text-white mb-4">$9,900 <span className="text-xs font-normal text-gray-500">MXN</span></div>
              <ul className="text-sm text-white font-semibold space-y-3 flex-grow drop-shadow-md">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-yellow-400 shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"/> 7 Horas de música continua</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-yellow-400 shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"/> Sonido masivo (300+ personas)</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-yellow-400 shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"/> Show láser y chispas (Pirotecnia fría)</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-yellow-400 shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"/> Humo pesado (Bailar en las nubes)</li>
              </ul>
            </div>

          </div>
        </div>

        <div className="mb-6">
          <label className="text-gray-300 text-sm font-semibold uppercase tracking-wide block mb-3">Horas Adicionales <span className="text-gray-500 normal-case">(Máx. 2)</span></label>
          <div className="flex gap-3">
            {[0, 1, 2].map((h) => (
              <button 
                key={h} 
                type="button" 
                onClick={() => setExtraHours(h)} 
                disabled={packageType === 'Premium' && h !== 2}
                className={`flex-1 py-3 rounded-xl border-2 select-none transition-all ${
                  extraHours === h ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.2)]' : 
                  packageType === 'Premium' && h !== 2 ? 'opacity-30 cursor-not-allowed border-transparent bg-white/5' : 
                  'border-transparent bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className={`text-base font-bold ${extraHours === h ? 'text-yellow-400' : 'text-white'}`}>{h === 0 ? 'Sin extra' : `+${h}h`}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {packageType === 'Premium' && h === 2 ? 'Incluido (7 hrs)' :
                   h === 0 ? '5 hrs totales' : 
                   `$${h * 1200} extra`}
                </div>
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
          <InputField icon={User} label="Nombre" name="nombre" placeholder="Ej. Juan" value={formData.nombre} error={errors.nombre} touched={touched.nombre} onChange={e => handleChange('nombre', e.target.value)} onBlur={() => handleBlur('nombre')} autoComplete="given-name" />
          <InputField icon={User} label="Apellido" name="apellido" placeholder="Ej. Pérez" value={formData.apellido} error={errors.apellido} touched={touched.apellido} onChange={e => handleChange('apellido', e.target.value)} onBlur={() => handleBlur('apellido')} autoComplete="family-name" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField icon={Phone} label="Teléfono" name="telefono" type="tel" placeholder="10 dígitos" value={formData.telefono} error={errors.telefono} touched={touched.telefono} onChange={handlePhoneChange} onBlur={() => handleBlur('telefono')} autoComplete="tel" />
          <InputField icon={Mail} label="Correo" name="correo" type="email" placeholder="juan@correo.com" value={formData.correo} error={errors.correo} touched={touched.correo} onChange={e => handleChange('correo', e.target.value)} onBlur={() => handleBlur('correo')} autoComplete="email" />
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
          
          <div className="mb-4">
            <label className="text-gray-300 text-sm flex items-center gap-2 mb-2 font-semibold uppercase tracking-wide">
              <Calendar size={14} className={errors.fecha && touched.fecha ? "text-red-500" : "text-cyan-400"} />
              Fecha del Evento <span className="text-pink-500">*</span>
            </label>
            <DatePicker
              selected={formData.fecha}
              onChange={(date) => handleChange('fecha', date)}
              minDate={addDays(new Date(), 2)}
              excludeDates={excludedDates}
              locale={es}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona una fecha"
              className={`w-full p-3 md:p-4 rounded-xl bg-[#0a0a1a] text-white text-base outline-none transition-all duration-300 border cursor-pointer ${
                errors.fecha && touched.fecha
                  ? 'border-red-500 shadow-[0_0_10px_rgba(255,68,68,0.2)]'
                  : 'border-[#2a2a4e] focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,242,254,0.1)]'
              }`}
            />
            {errors.fecha && touched.fecha && <p className="text-red-500 text-xs mt-1 font-bold">{errors.fecha}</p>}
          </div>

          <div className="mb-4">
            <label className="text-gray-300 text-sm flex items-center gap-2 mb-2 font-semibold uppercase tracking-wide">
              <Clock size={14} className="text-cyan-400" />
              Hora de Inicio <span className="text-pink-500">*</span>
            </label>
            <DatePicker
              selected={formData.horaInicio}
              onChange={(date) => handleChange('horaInicio', date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Hora"
              dateFormat="h:mm aa"
              filterTime={(time) => {
                if (!formData.fecha) return true;
                
                // Regla de 2 días y 12 PM
                const limitDate = addDays(new Date(), 2);
                const isLimitDay = formData.fecha.getDate() === limitDate.getDate() && 
                                   formData.fecha.getMonth() === limitDate.getMonth() && 
                                   formData.fecha.getFullYear() === limitDate.getFullYear();
                if (isLimitDay && time.getHours() < 12) return false;
                
                // Regla del motor de colisiones
                const proposedStartMs = new Date(
                  formData.fecha.getFullYear(),
                  formData.fecha.getMonth(),
                  formData.fecha.getDate(),
                  time.getHours(),
                  time.getMinutes(),
                  0
                ).getTime();
                
                const proposedEndMs = proposedStartMs + ((5 + extraHours) * 3600000);
                const proposedEndDate = new Date(proposedEndMs);
                const proposedEndHour = proposedEndDate.getHours();
                const proposedBufferMs = (proposedEndHour >= 0 && proposedEndHour <= 10) ? (8 * 3600000) : (3 * 3600000);
                const proposedEndWithBufferMs = proposedEndMs + proposedBufferMs;

                for (let ev of dbEvents) {
                  if (proposedStartMs < ev.endWithBufferMs && ev.startMs < proposedEndWithBufferMs) {
                    return false; // Time is blocked!
                  }
                }
                
                return true;
              }}
              className="w-full p-3 md:p-4 rounded-xl bg-[#0a0a1a] text-white text-base outline-none transition-all duration-300 border border-[#2a2a4e] focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,242,254,0.1)] cursor-pointer"
            />
          </div>

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

        <div className="mt-6 border-t border-white/10 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-cyan-400" />
            <h3 className="text-white font-bold tracking-widest text-sm uppercase">Dirección del Evento</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4 mb-4">
            <InputField icon={MapPin} label="Calle y Número" name="calleYNumero" placeholder="Ej. Av. Reforma 222" value={formData.calleYNumero} error={errors.calleYNumero} touched={touched.calleYNumero} onChange={e => handleChange('calleYNumero', e.target.value)} onBlur={() => handleBlur('calleYNumero')} autoComplete="street-address" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField icon={MapPin} label="Colonia" name="colonia" placeholder="Ej. Juárez" value={formData.colonia} error={errors.colonia} touched={touched.colonia} onChange={e => handleChange('colonia', e.target.value)} onBlur={() => handleBlur('colonia')} autoComplete="address-level3" />
            <InputField icon={MapPin} label="Alcaldía / Municipio" name="alcaldia" placeholder="Ej. Cuauhtémoc" value={formData.alcaldia} error={errors.alcaldia} touched={touched.alcaldia} onChange={e => handleChange('alcaldia', e.target.value)} onBlur={() => handleBlur('alcaldia')} autoComplete="address-level2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InputField icon={MapPin} label="Código Postal" name="codigoPostal" placeholder="Ej. 06600" value={formData.codigoPostal} error={errors.codigoPostal} touched={touched.codigoPostal} onChange={e => handleChange('codigoPostal', e.target.value.replace(/\D/g, '').slice(0, 5))} onBlur={() => handleBlur('codigoPostal')} autoComplete="postal-code" />
          </div>
        </div>

      </div>
      
      {/* SECCIÓN: COTIZACIÓN EN CDMX Y ÁREA METROPOLITANA */}
      <div className="bg-gradient-to-br from-[#0a1a0a]/90 to-[#071407]/95 border border-green-500/20 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <MessageSquare size={16} className="text-white" />
          </div>
          <div>
            <h2 className="font-cyber text-lg m-0 text-white leading-tight">FUERA DE CDMX Y ÁREA METROPOLITANA</h2>
            <p className="text-gray-400 text-xs">Atención personalizada</p>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-center">
          <p className="text-gray-300 text-sm mb-4">Si te encuentras fuera de CDMX o Área Metropolitana, contáctanos.</p>
          <button type="button" onClick={() => window.location.href = 'https://wa.me/525567880698'} className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 uppercase text-sm tracking-wide transition-transform hover:-translate-y-1 shadow-[0_4px_15px_rgba(37,211,102,0.3)]">
            <MessageSquare size={16} /> Cotizar por WhatsApp
          </button>
        </div>
      </div>
      
    </div>
  );
}
