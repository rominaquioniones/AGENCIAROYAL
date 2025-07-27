// Configuración de Analytics
export const ANALYTICS_CONFIG = {
  mixpanel: {
    token: '673cbf38758fedf65031113726220b66',
    debug: import.meta.env.DEV,
  },
  facebook: {
    pixelId: '1139320498000339',
  },
  events: {
    pageView: 'Page View',
    whatsappRedirect: 'WhatsApp Redirect',
    customEvent: 'Custom Event',
  },
  properties: {
    pageName: 'Landing Page - Agencia Royal',
    buttonText: '¡QUIERO MI BONO!',
    action: 'whatsapp_click',
  },
};

// Verificar si Mixpanel está configurado
export const isMixpanelConfigured = (): boolean => {
  return !!ANALYTICS_CONFIG.mixpanel.token;
};

// Verificar si Facebook Pixel está configurado
export const isFacebookPixelConfigured = (): boolean => {
  return !!ANALYTICS_CONFIG.facebook.pixelId;
}; 