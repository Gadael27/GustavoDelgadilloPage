import React, { useState } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCotizacionStore } from '../store/useCotizacionStore';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export default function ResumenCompra() {
  const { 
    formData, packageType, extraHours, paymentType,
    isRedirecting, isTimeSlotBlocked,
    setPaymentType, calculateTotal, isFormValid, setIsRedirecting
  } = useCotizacionStore();

  const { totalEvent, extraHoursCost, peopleAdditionalCost, saldoPendiente, montoPagar } = calculateTotal();
  const [submitError, setSubmitError] = useState(null);

  const handleSubmitContract = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!isFormValid()) {
      const currentErrors = useCotizacionStore.getState().errors;
      const fieldNames = { nombre: 'Nombre', apellido: 'Apellido', telefono: 'Teléfono', correo: 'Correo', calleYNumero: 'Calle', colonia: 'Colonia', alcaldia: 'Alcaldía', codigoPostal: 'C.P.', fecha: 'Fecha' };
      const missing = Object.keys(currentErrors).map(k => `${fieldNames[k] || k} (${currentErrors[k]})`).join(', ');
      setSubmitError(`Por favor revisa: ${missing}`);
      return;
    }

    const phoneNumber = parsePhoneNumberFromString(formData.telefono, 'MX');
    if (!phoneNumber || !phoneNumber.isValid()) {
      setSubmitError('El teléfono parece ser inventado o la LADA no existe. Por favor ingresa un número de México real (10 dígitos).');
      return;
    }

    try {
      const url = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${url}/api/reservaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          fecha: `${formData.fecha.getFullYear()}-${String(formData.fecha.getMonth() + 1).padStart(2, '0')}-${String(formData.fecha.getDate()).padStart(2, '0')}`,
          horaInicio: `${String(formData.horaInicio.getHours()).padStart(2, '0')}:${String(formData.horaInicio.getMinutes()).padStart(2, '0')}`,
          telefono: formData.telefono, // Send the exact 10 digits, avoid E.164 +52 since backend expects exactly 10 digits
          direccion: `${formData.calleYNumero}, Col. ${formData.colonia}, Alc/Mun ${formData.alcaldia}, CP ${formData.codigoPostal}`, 
          totalEvent, 
          paymentType, 
          montoPagar,
          packageType,
          extraHours,
          peopleRange: useCotizacionStore.getState().peopleRange // Access directly if needed
        })
      });
      const data = await response.json();
      if (data.success && data.init_point) {
        setIsRedirecting(true);
        setTimeout(() => { window.location.href = data.init_point; }, 2200);
      } else {
        setSubmitError(data.error || 'Error al procesar la reserva.');
      }
    } catch {
      setSubmitError('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="lg:sticky lg:top-24 h-fit">
      <div className="bg-gradient-to-br from-[#0a0a1a]/95 to-[#140514]/95 border-2 border-pink-500/30 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
        <h2 className="font-cyber text-3xl mb-6 text-white text-center">RESUMEN</h2>

        <div className="mb-6">
          <label className="text-gray-300 text-xs font-bold uppercase tracking-widest block mb-4">¿Cómo deseas pagar?</label>
          <div className="flex flex-col gap-3">
            
            <div onClick={() => setPaymentType('anticipo')} className={`p-4 rounded-xl border-2 flex items-center gap-4 cursor-pointer transition-all ${paymentType === 'anticipo' ? 'border-pink-500 bg-pink-500/10 shadow-lg' : 'border-white/10 bg-white/5'}`}>
              <div className={`w-5 h-5 rounded-full border-4 shrink-0 ${paymentType === 'anticipo' ? 'border-pink-500 bg-white' : 'border-gray-500'}`} />
              <div className="flex-1">
                <div className="font-bold text-white text-sm">Pagar Anticipo</div>
                <div className="text-gray-400 text-xs mt-0.5">Aparta tu fecha hoy</div>
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

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 mb-6">
          <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Desglose del Paquete</div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Paquete {packageType}</span>
            <span className="text-white font-bold">${packageType === 'Premium' ? '9,900' : packageType === 'Pro' ? '7,500' : '5,500'}</span>
          </div>
          {extraHours > 0 && packageType !== 'Premium' && (
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

        <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-2xl p-5 text-center mb-6">
          <div className="text-xs text-brand-cyan uppercase tracking-widest mb-2 font-bold">Total del Evento</div>
          <div className="text-4xl font-black text-white leading-none drop-shadow-[0_0_10px_rgba(0,242,254,0.3)]">
            ${totalEvent.toLocaleString()} <span className="text-base text-gray-400 font-normal">MXN</span>
          </div>
        </div>

        <div className={`text-center p-5 rounded-2xl border mb-6 transition-all duration-300 ${paymentType === 'completo' ? 'bg-brand-pink/10 border-brand-pink/40 shadow-[0_0_20px_rgba(255,0,127,0.2)]' : 'bg-brand-cyan/10 border-brand-cyan/30'}`}>
          <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${paymentType === 'completo' ? 'text-brand-pink' : 'text-brand-cyan'}`}>
            Monto a pagar ahora
          </div>
          <div className={`text-4xl font-black text-white ${paymentType === 'completo' ? 'drop-shadow-[0_0_15px_rgba(255,0,127,0.6)]' : 'drop-shadow-[0_0_10px_rgba(0,242,254,0.4)]'}`}>
            ${montoPagar.toLocaleString()} <span className={`text-base font-bold ${paymentType === 'completo' ? 'text-brand-pink' : 'text-brand-cyan'}`}>MXN</span>
          </div>
          {paymentType === 'anticipo' && (
            <div className="text-xs text-gray-400 mt-2">Saldo pendiente a pagar el día del evento: <span className="text-white font-bold">${saldoPendiente.toLocaleString()}</span> MXN</div>
          )}
        </div>

        <button onClick={handleSubmitContract} type="button" disabled={isRedirecting || isTimeSlotBlocked} className={`w-full py-4 rounded-xl text-white text-lg font-bold uppercase tracking-wide flex items-center justify-center gap-3 transition-all ${(isTimeSlotBlocked) ? 'bg-gray-700 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(59,130,246,0.4)]'}`}>
          <CreditCard size={22} />
          {isRedirecting ? 'Procesando...' : `Pagar ${paymentType === 'completo' ? 'completo' : 'anticipo'}`}
        </button>

        {submitError && (
          <div className="mt-4 bg-red-500/10 border border-red-500/50 p-3 rounded-xl text-red-400 text-sm font-bold text-center">
            {submitError}
          </div>
        )}

        {isRedirecting && (
          <div className="mt-4 bg-cyan-400/10 border border-cyan-400/30 p-3 rounded-xl flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-cyan-400 font-bold text-sm">Redirigiendo a Mercado Pago...</span>
          </div>
        )}

        <div className="mt-5 flex flex-col items-center justify-center gap-2 text-gray-500 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-green-500" />
            Pago seguro procesado por Mercado Pago
          </div>
          <div className="text-center text-brand-cyan/70 mt-2 p-2 bg-brand-cyan/5 border border-brand-cyan/10 rounded">
            Servicio exclusivo para la República Mexicana. Precios en MXN.
          </div>
        </div>
      </div>
    </div>
  );
}
