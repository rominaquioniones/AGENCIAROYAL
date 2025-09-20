// Utilidades de WhatsApp - NÚMERO FIJO 2236751421
export const WHATSAPP_UTILS = {
  // Número de WhatsApp FIJO
  NUMBER: '2236751421',
  
  // Mensaje de WhatsApp FIJO
  MESSAGE: 'Quiero mi bono del 30% y jugar♥',
  
  // URL completa de WhatsApp
  get URL() {
    return `https://wa.me/549${this.NUMBER}?text=${encodeURIComponent(this.MESSAGE)}`;
  },
  
  // Función para abrir WhatsApp
  openWhatsApp: () => {
    window.open(this.URL, '_blank', 'noopener,noreferrer');
  },
  
  // Función para verificar que el número sea correcto
  verifyNumber: () => {
    const expectedNumber = '2236751421';
    if (this.NUMBER !== expectedNumber) {
      console.error('❌ Número de WhatsApp incorrecto:', this.NUMBER);
      return false;
    }
    console.log('✅ Número de WhatsApp correcto:', this.NUMBER);
    return true;
  }
};

// Verificar el número al cargar
WHATSAPP_UTILS.verifyNumber();

// Exportar constantes individuales para compatibilidad
export const WHATSAPP_NUMBER = WHATSAPP_UTILS.NUMBER;
export const WHATSAPP_MESSAGE = WHATSAPP_UTILS.MESSAGE;
export const WHATSAPP_URL = WHATSAPP_UTILS.URL;
