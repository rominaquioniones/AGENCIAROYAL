// Configuración de Analytics
export const ANALYTICS_CONFIG = {
  mixpanel: {
    token: import.meta.env.VITE_MIXPANEL_TOKEN,
    debug: import.meta.env.DEV,
  },
  facebook: {
    pixelId: import.meta.env.VITE_FACEBOOK_PIXEL_ID || '1053176933005691',
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
  return !!ANALYTICS_CONFIG.mixpanel.token && ANALYTICS_CONFIG.mixpanel.token !== 'TU_TOKEN_AQUI';
};

// Verificar si Facebook Pixel está configurado
export const isFacebookPixelConfigured = (): boolean => {
  return !!ANALYTICS_CONFIG.facebook.pixelId;
}; 