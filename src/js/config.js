// Configuración del sitio web del taller mecánico
export const siteConfig = {
  taller: {
    nombre: 'Taller Mecánico AutoFix',
    direccion: 'Av. Providencia 1234, Providencia, Santiago',
    telefono: '+56 9 8765 4321',
    email: 'contacto@tallermecanicoautofix.cl',
    whatsapp: '+56987654321',
    horarios: {
      lunes_viernes: '08:00 - 18:00',
      sabado: '08:00 - 13:00',
      domingo: 'Cerrado'
    },
    redes_sociales: {
      facebook: 'https://facebook.com/tallermecanicoautofix',
      instagram: 'https://instagram.com/tallermecanicoautofix'
    }
  },
  
  servicios: [
    {
      id: 1,
      titulo: 'Mantención Preventiva',
      descripcion: 'Revisión completa del vehículo según kilometraje',
      icono: 'wrench',
      precio: 'Desde $25.000'
    },
    {
      id: 2,
      titulo: 'Cambio de Aceite',
      descripcion: 'Cambio de aceite y filtros con productos de calidad',
      icono: 'oil-can',
      precio: 'Desde $15.000'
    },
    {
      id: 3,
      titulo: 'Frenos',
      descripcion: 'Revisión y reparación del sistema de frenos',
      icono: 'brake-disc',
      precio: 'Desde $35.000'
    },
    {
      id: 4,
      titulo: 'Suspensión',
      descripcion: 'Diagnóstico y reparación de sistema de suspensión',
      icono: 'shock-absorber',
      precio: 'Desde $45.000'
    },
    {
      id: 5,
      titulo: 'Diagnóstico Computarizado',
      descripcion: 'Escaneo completo con equipos de última generación',
      icono: 'computer',
      precio: 'Desde $20.000'
    },
    {
      id: 6,
      titulo: 'Alineación y Balanceo',
      descripcion: 'Alineación de dirección y balanceo de ruedas',
      icono: 'wheel',
      precio: 'Desde $18.000'
    }
  ],

  // Configuración para formulario de contacto
  formspree: {
    endpoint: 'https://formspree.io/f/YOUR_FORM_ID' // Se configurará con variable de entorno
  },

  // Google Maps embed (coordenadas de ejemplo para Santiago)
  maps: {
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.8!2d-70.6!3d-33.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI0JzAwLjAiUyA3MMKwMzYnMDAuMCJX!5e0!3m2!1ses!2scl!4v1234567890'
  }
};