// CONSTANTES DE WHATSAPP - NÚMERO FIJO 2236751421
// Este archivo fuerza la actualización del caché

export const WHATSAPP_CONSTANTS = {
  // NÚMERO CORRECTO - 2236751421
  NUMBER: '2236751421',
  
  // MENSAJE CORRECTO - 30%
  MESSAGE: 'Quiero mi bono del 30% y jugar♥',
  
  // URL COMPLETA CORRECTA
  get URL() {
    return `https://wa.me/549${this.NUMBER}?text=${encodeURIComponent(this.MESSAGE)}`;
  }
} as const;

// Exportar constantes individuales
export const WHATSAPP_NUMBER = WHATSAPP_CONSTANTS.NUMBER;
export const WHATSAPP_MESSAGE = WHATSAPP_CONSTANTS.MESSAGE;
export const WHATSAPP_URL = WHATSAPP_CONSTANTS.URL;

// Función para verificar que todo esté correcto
export const verifyWhatsAppConfig = () => {
  console.log('🔍 Verificando configuración de WhatsApp...');
  console.log('📱 Número:', WHATSAPP_NUMBER);
  console.log('💬 Mensaje:', WHATSAPP_MESSAGE);
  console.log('🔗 URL:', WHATSAPP_URL);
  
  if (WHATSAPP_NUMBER !== '2236751421') {
    console.error('❌ NÚMERO INCORRECTO:', WHATSAPP_NUMBER);
    return false;
  }
  
  if (!WHATSAPP_MESSAGE.includes('30%')) {
    console.error('❌ MENSAJE INCORRECTO:', WHATSAPP_MESSAGE);
    return false;
  }
  
  console.log('✅ Configuración correcta');
  return true;
};

// Verificar inmediatamente
verifyWhatsAppConfig();
