import { create } from 'zustand';
import { addDays, setHours, setMinutes } from 'date-fns';

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
    case 'calleYNumero':
      if (!value.trim()) return 'Obligatorio';
      return '';
    default: return '';
  }
};

export const useCotizacionStore = create((set, get) => ({
  // ESTADOS DEL FORMULARIO
  formData: {
    nombre: '', apellido: '', telefono: '', correo: '', 
    fecha: addDays(new Date(), 2),
    horaInicio: setHours(setMinutes(addDays(new Date(), 2), 0), 14), 
    tipoEvento: 'Boda', locacion: 'Interior', 
    calleYNumero: '', colonia: '', alcaldia: '', codigoPostal: '', detalles: ''
  },
  errors: {},
  touched: {},

  // ESTADOS DE NEGOCIO
  packageType: 'Base', // Se inicializará desde URL en el componente si es necesario
  extraHours: 0,
  peopleRange: '10-100',
  paymentType: 'anticipo',

  isRedirecting: false,
  isTimeSlotBlocked: false,
  dbEvents: [],
  excludedDates: [],

  // ACCIONES
  setPackageType: (pkg) => set({ packageType: pkg, extraHours: pkg === 'Premium' ? 2 : 0 }),
  setExtraHours: (hours) => set({ extraHours: hours }),
  setPeopleRange: (range) => set({ peopleRange: range }),
  setPaymentType: (type) => set({ paymentType: type }),
  setIsRedirecting: (isRedirecting) => set({ isRedirecting }),

  handleChange: (field, value) => {
    set((state) => {
      const newFormData = { ...state.formData, [field]: value };
      const newErrors = { ...state.errors };
      if (state.touched[field]) {
        newErrors[field] = validateField(field, value);
      }
      return { formData: newFormData, errors: newErrors };
    });
    // Trigger collision check if date/time changes
    if (field === 'fecha' || field === 'horaInicio') {
      get().checkCollision();
    }
  },

  handleBlur: (field) => {
    set((state) => ({
      touched: { ...state.touched, [field]: true },
      errors: { ...state.errors, [field]: validateField(field, state.formData[field]) }
    }));
  },

  isFormValid: () => {
    const state = get();
    const newErrors = {};
    const fieldsToValidate = ['nombre', 'apellido', 'telefono', 'correo', 'calleYNumero', 'colonia', 'alcaldia', 'codigoPostal'];
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, state.formData[field]);
      if (error) newErrors[field] = error;
    });

    set({ 
      errors: newErrors, 
      touched: fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    });

    return Object.keys(newErrors).length === 0 && !state.isTimeSlotBlocked;
  },

  // LLAMADA A LA API DE FECHAS OCUPADAS
  fetchOcupadas: async () => {
    try {
      const url = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${url}/api/fechas-ocupadas`);
      const data = await res.json();
      if (data.success && data.data) {
        const parsedEvents = data.data.map(e => {
          const partes = e.fecha.split('-');
          const [evHour, evMin] = e.horaInicio.split(':').map(Number);
          const startMs = new Date(partes[0], partes[1] - 1, partes[2], evHour, evMin, 0).getTime();
          const endMs = startMs + (e.horasTotales * 3600000);
          
          const endDate = new Date(endMs);
          const endHour = endDate.getHours();
          const bufferMs = (endHour >= 0 && endHour <= 10) ? (8 * 3600000) : (3 * 3600000);
          const endWithBufferMs = endMs + bufferMs;
          
          return { startMs, endWithBufferMs, fecha: e.fecha, horaInicio: e.horaInicio, horasTotales: e.horasTotales };
        });
        set({ dbEvents: parsedEvents, excludedDates: [] });
        get().checkCollision();
      }
    } catch (err) {
      console.error('Error fetching fechas ocupadas:', err);
    }
  },

  checkCollision: () => {
    const { formData, extraHours, dbEvents } = get();
    if (!formData.fecha || !formData.horaInicio) return;
    
    const selectedDate = formData.fecha.toISOString().split('T')[0];
    const selHour = formData.horaInicio.getHours();
    const selMin = formData.horaInicio.getMinutes();
    const startMinutes = selHour * 60 + selMin;
    const totalDurationMinutes = (5 + extraHours) * 60;
    const endMinutes = startMinutes + totalDurationMinutes;

    const sameDayEvents = dbEvents.filter(e => e.fecha === selectedDate);
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
    set({ isTimeSlotBlocked: isBlocked });
  },

  calculateTotal: () => {
    const { packageType, extraHours, peopleRange, paymentType } = get();
    let serviceBasePrice = 5500;
    if (packageType === 'Pro') serviceBasePrice = 7500;
    else if (packageType === 'Premium') serviceBasePrice = 7500;
    
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
  },

  initializeFromUrl: () => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('paquete');
    if (['Base', 'Pro', 'Premium', 'Custom'].includes(p)) {
      set({ packageType: p, extraHours: p === 'Premium' ? 2 : 0 });
    }
  }
}));
