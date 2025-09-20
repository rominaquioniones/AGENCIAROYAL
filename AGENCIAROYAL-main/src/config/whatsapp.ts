// Configuración de WhatsApp - NÚMERO FIJO
export const WHATSAPP_CONFIG = {
  NUMBER: '2236751421',
  MESSAGE: 'Quiero mi bono del 30% y jugar♥',
  URL: `https://wa.me/5492236751421?text=${encodeURIComponent('Quiero mi bono del 30% y jugar♥')}`
} as const;

// Función para obtener la URL de WhatsApp
export const getWhatsAppUrl = (): string => {
  return WHATSAPP_CONFIG.URL;
};

// Función para obtener el número de WhatsApp
export const getWhatsAppNumber = (): string => {
  return WHATSAPP_CONFIG.NUMBER;
};

// Función para obtener el mensaje de WhatsApp
export const getWhatsAppMessage = (): string => {
  return WHATSAPP_CONFIG.MESSAGE;
};
