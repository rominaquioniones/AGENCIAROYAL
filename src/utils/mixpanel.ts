import mixpanel from 'mixpanel-browser';
import { ANALYTICS_CONFIG, isMixpanelConfigured } from '../config/analytics';

// Variables para prevenir duplicados
let isInitialized = false;

// Inicializar Mixpanel
export const initMixpanel = () => {
  if (!isMixpanelConfigured()) {
    console.warn('Mixpanel no está configurado. Por favor, configura VITE_MIXPANEL_TOKEN en tu archivo .env');
    return;
  }

  // Prevenir inicialización múltiple
  if (isInitialized) {
    console.warn('Mixpanel ya está inicializado');
    return;
  }

  mixpanel.init(ANALYTICS_CONFIG.mixpanel.token, {
    debug: ANALYTICS_CONFIG.mixpanel.debug,
    track_pageview: false, // Desactivamos el track automático para controlarlo manualmente
    persistence: 'localStorage'
  });

  isInitialized = true;
  console.log('Mixpanel inicializado correctamente');
};

// Función para trackear page view
export const trackPageView = (pageName: string = ANALYTICS_CONFIG.properties.pageName) => {
  if (!isMixpanelConfigured()) return;
  
  // Prevenir duplicados usando sessionStorage
  const pageViewKey = `pageview_${pageName}_${window.location.pathname}`;
  const sessionKey = sessionStorage.getItem('mixpanel_session_id');
  
  if (!sessionKey) {
    // Crear nueva sesión
    const sessionId = Date.now().toString();
    sessionStorage.setItem('mixpanel_session_id', sessionId);
  }
  
  // Verificar si ya se trackeó esta página en esta sesión
  const trackedPages = JSON.parse(sessionStorage.getItem('mixpanel_tracked_pages') || '[]');
  if (trackedPages.includes(pageViewKey)) {
    console.log('Page view ya trackeado en esta sesión:', pageName);
    return;
  }
  
  // Trackear el evento
  mixpanel.track(ANALYTICS_CONFIG.events.pageView, {
    page_name: pageName,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    user_agent: navigator.userAgent,
    session_id: sessionStorage.getItem('mixpanel_session_id'),
    event_id: pageViewKey
  });
  
  // Marcar como trackeado
  trackedPages.push(pageViewKey);
  sessionStorage.setItem('mixpanel_tracked_pages', JSON.stringify(trackedPages));
  
  console.log('Page view trackeado:', pageName);
};

// Función para trackear click en WhatsApp
export const trackWhatsAppClick = (phoneNumber: string) => {
  if (!isMixpanelConfigured()) return;
  
  // Prevenir duplicados usando debounce
  const eventKey = `whatsapp_click_${phoneNumber}_${Date.now()}`;
  
  // Verificar si ya se trackeó un evento similar en los últimos 2 segundos
  const recentEvents = JSON.parse(sessionStorage.getItem('mixpanel_recent_events') || '[]');
  const now = Date.now();
  const twoSecondsAgo = now - 2000;
  
  // Filtrar eventos recientes (últimos 2 segundos)
  const filteredEvents = recentEvents.filter((event: any) => event.timestamp > twoSecondsAgo);
  
  // Verificar si ya existe un evento de WhatsApp click reciente
  const hasRecentWhatsAppClick = filteredEvents.some((event: any) => 
    event.type === 'whatsapp_click' && event.phone_number === phoneNumber
  );
  
  if (hasRecentWhatsAppClick) {
    console.log('WhatsApp click ya trackeado recientemente para:', phoneNumber);
    return;
  }
  
  // Trackear el evento
  mixpanel.track(ANALYTICS_CONFIG.events.whatsappRedirect, {
    action: ANALYTICS_CONFIG.properties.action,
    phone_number: phoneNumber,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    user_agent: navigator.userAgent,
    button_text: ANALYTICS_CONFIG.properties.buttonText,
    session_id: sessionStorage.getItem('mixpanel_session_id'),
    event_id: eventKey
  });
  
  // Agregar a eventos recientes
  filteredEvents.push({
    type: 'whatsapp_click',
    phone_number: phoneNumber,
    timestamp: now,
    event_id: eventKey
  });
  
  sessionStorage.setItem('mixpanel_recent_events', JSON.stringify(filteredEvents));
  
  console.log('WhatsApp click trackeado:', phoneNumber);
};

// Función para trackear eventos personalizados
export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  if (!isMixpanelConfigured()) return;
  
  // Prevenir duplicados usando debounce
  const eventKey = `${eventName}_${Date.now()}`;
  
  // Verificar si ya se trackeó un evento similar en los últimos 2 segundos
  const recentEvents = JSON.parse(sessionStorage.getItem('mixpanel_recent_events') || '[]');
  const now = Date.now();
  const twoSecondsAgo = now - 2000;
  
  // Filtrar eventos recientes
  const filteredEvents = recentEvents.filter((event: any) => event.timestamp > twoSecondsAgo);
  
  // Verificar si ya existe un evento similar reciente
  const hasRecentEvent = filteredEvents.some((event: any) => 
    event.type === eventName && JSON.stringify(event.properties) === JSON.stringify(properties)
  );
  
  if (hasRecentEvent) {
    console.log('Evento ya trackeado recientemente:', eventName);
    return;
  }
  
  // Trackear el evento
  mixpanel.track(eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    session_id: sessionStorage.getItem('mixpanel_session_id'),
    event_id: eventKey
  });
  
  // Agregar a eventos recientes
  filteredEvents.push({
    type: eventName,
    properties,
    timestamp: now,
    event_id: eventKey
  });
  
  sessionStorage.setItem('mixpanel_recent_events', JSON.stringify(filteredEvents));
  
  console.log('Evento trackeado:', eventName);
};

// Función para identificar usuarios (opcional)
export const identifyUser = (userId: string, userProperties: Record<string, any> = {}) => {
  if (!isMixpanelConfigured()) return;
  
  mixpanel.identify(userId);
  mixpanel.people.set(userProperties);
}; 