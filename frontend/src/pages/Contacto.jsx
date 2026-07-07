import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, MessageSquare, User, Calendar } from 'lucide-react';
import Footer from '../components/Footer';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import InputField from '../components/InputField';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoEvento: 'Boda',
    fecha: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);

  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const phoneNumber = parsePhoneNumberFromString(formData.telefono, 'MX');
    if (!phoneNumber || !phoneNumber.isValid()) {
      alert('Número de teléfono inválido. Asegúrate de incluir la lada correcta.');
      return;
    }

    setCargando(true);
    
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if(data.success) {
        setEnviado(true);
        setFormData({
          nombre: '', email: '', telefono: '', tipoEvento: 'Boda', fecha: '', mensaje: ''
        });
        setTimeout(() => setEnviado(false), 5000);
      } else {
        alert('Hubo un error: ' + data.error);
      }
    } catch (error) {
      console.error('Error enviando contacto:', error);
      alert('Error de conexión. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const abrirWhatsApp = () => {
    const tuNumeroWhatsapp = "525567880698"; 
    const mensaje = encodeURIComponent("¡Hola, GD Producciones! Me gustaría recibir información formal para mi evento.");
    window.open(`https://wa.me/${tuNumeroWhatsapp}?text=${mensaje}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#03030c] pt-24 font-body">
      <Helmet>
        <title>Contacto | GD Producciones</title>
      </Helmet>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mb-20 relative z-10">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2.5 bg-[#00f2fe]/10 border border-[#00f2fe]/30 px-4 py-2 rounded-full mb-6 text-[#00f2fe] text-[0.8rem] font-bold tracking-widest">
            ESTAMOS PARA SERVIRTE
          </div>
          <h1 className="font-cyber text-[3.5rem] md:text-[5rem] text-white leading-tight mb-4">
            CONTÁCTA<span className="text-[#00f2fe]">NOS</span>
          </h1>
          <p className="text-gray-400 text-[1.1rem] md:text-[1.3rem] max-w-2xl mx-auto">
            ¿Tienes alguna duda o quieres cotizar un evento muy particular? Déjanos tus datos o escríbenos directamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          
          {/* INFORMACIÓN DIRECTA Y WHATSAPP */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* BOTÓN GIGANTE WHATSAPP */}
            <div 
              onClick={abrirWhatsApp}
              className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-[#25D366]/20 to-[#128C7E]/20 border border-[#25D366]/40 p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,211,102,0.3)] hover:border-[#25D366]"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#25D366] rounded-full blur-[80px] opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
              
              <div className="w-20 h-20 mx-auto rounded-full bg-[#25D366] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-transform duration-500 group-hover:scale-110">
                <MessageSquare size={40} color="white" fill="white" />
              </div>
              
              <h3 className="text-2xl font-black text-white mb-2">¡Escríbenos por WhatsApp!</h3>
              <p className="text-[#25D366] font-semibold mb-6">Atención rápida y personalizada</p>
              
              <button className="bg-[#25D366] text-white font-bold py-3 px-8 rounded-full w-full uppercase tracking-wider transition-all duration-300 group-hover:bg-[#128C7E]">
                Abrir Chat
              </button>
            </div>

            {/* DETALLES FORMALES */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h4 className="text-xl font-bold text-white mb-6 font-cyber tracking-wide">INFORMACIÓN</h4>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#00f2fe]/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#00f2fe]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-bold tracking-wider mb-1">TELÉFONO / WHATSAPP</div>
                  <div className="text-white text-lg">+52 55 6788 0698</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#ff007f]/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#ff007f]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-bold tracking-wider mb-1">CORREO ELECTRÓNICO</div>
                  <div className="text-white text-lg">contacto@gdlproducciones.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ffeb3b]/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#ffeb3b]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-bold tracking-wider mb-1">COBERTURA</div>
                  <div className="text-white text-lg">CDMX y toda la República Mexicana</div>
                </div>
              </div>
            </div>
          </div>

          {/* FORMULARIO DE CONTACTO */}
          <div className="lg:col-span-3 bg-[#07071c] border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Glow form */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#ff007f] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

            <h3 className="text-2xl font-cyber text-white mb-8">DÉJANOS UN MENSAJE</h3>

            {enviado ? (
              <div className="bg-[#00f2fe]/20 border border-[#00f2fe] text-[#00f2fe] p-6 rounded-2xl text-center flex flex-col items-center justify-center py-20 animate-fade-in">
                <Send size={40} className="mb-4 animate-bounce" />
                <h4 className="text-2xl font-bold mb-2">¡Mensaje Enviado!</h4>
                <p className="text-white">Nos pondremos en contacto contigo lo antes posible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    icon={User}
                    label="Tu Nombre" 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ej. Carlos Martínez"
                  />
                  <InputField 
                    icon={Phone}
                    label="Teléfono" 
                    type="tel" 
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    placeholder="Ej. 55 1234 5678"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    icon={MessageSquare}
                    label="Tipo de Evento" 
                    name="tipoEvento"
                  >
                    <select 
                      name="tipoEvento"
                      value={formData.tipoEvento}
                      onChange={handleChange}
                      className="w-full p-3 md:p-4 rounded-xl bg-[#0a0a1a] text-white border border-[#2a2a4e] focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,242,254,0.1)] outline-none transition-all duration-300 appearance-none"
                    >
                      <option value="Boda">Boda</option>
                      <option value="XV Años">XV Años</option>
                      <option value="Corporativo">Corporativo</option>
                      <option value="Cumpleaños">Cumpleaños / Privado</option>
                      <option value="Graduación">Graduación</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </InputField>
                  
                  <InputField 
                    icon={Calendar}
                    label="Fecha Tentativa" 
                    type="date" 
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>

                <InputField 
                  icon={Mail}
                  label="Correo Electrónico (Opcional)" 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tucorreo@ejemplo.com"
                />

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">¿Qué tienes en mente?</label>
                  <textarea 
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Danos detalles de lo que buscas para tu evento..."
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#ff007f] focus:bg-white/10 transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={cargando}
                  className="w-full bg-gradient-to-r from-[#ff007f] to-[#bd00ff] text-white font-bold text-lg py-4 rounded-xl uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,127,0.4)] hover:shadow-[0_0_30px_rgba(255,0,127,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} className={cargando ? "animate-pulse" : ""} /> 
                  {cargando ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                </button>
              </form>
            )}
          </div>
          
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
