// Configuración para manejar Strict Mode de manera segura

// Función para verificar si estamos en Strict Mode
export const isStrictMode = (): boolean => {
  return import.meta.env.DEV && 
         typeof window !== 'undefined' && 
         window.location.hostname === 'localhost';
};

// Función para crear un ID único para cada sesión
export const createSessionId = (): string => {
  const existingId = sessionStorage.getItem('app_session_id');
  if (existingId) return existingId;
  
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('app_session_id', sessionId);
  return sessionId;
};

// Función para verificar si un evento ya fue procesado
export const isEventProcessed = (eventType: string, eventId: string): boolean => {
  const processedEvents = JSON.parse(sessionStorage.getItem('processed_events') || '[]');
  return processedEvents.some((event: any) => 
    event.type === eventType && event.id === eventId
  );
};

// Función para marcar un evento como procesado
export const markEventAsProcessed = (eventType: string, eventId: string): void => {
  const processedEvents = JSON.parse(sessionStorage.getItem('processed_events') || '[]');
  processedEvents.push({
    type: eventType,
    id: eventId,
    timestamp: Date.now()
  });
  
  // Limpiar eventos antiguos (más de 1 hora)
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  const filteredEvents = processedEvents.filter((event: any) => event.timestamp > oneHourAgo);
  
  sessionStorage.setItem('processed_events', JSON.stringify(filteredEvents));
};

// Función para limpiar datos de sesión
export const clearSessionData = (): void => {
  sessionStorage.removeItem('app_session_id');
  sessionStorage.removeItem('processed_events');
  sessionStorage.removeItem('mixpanel_session_id');
  sessionStorage.removeItem('mixpanel_tracked_pages');
  sessionStorage.removeItem('mixpanel_recent_events');
}; 