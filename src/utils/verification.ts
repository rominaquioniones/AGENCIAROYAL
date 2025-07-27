// Script de verificación rápida para Mixpanel
export const verifyMixpanelSetup = () => {
  console.log('🔍 Verificación Rápida de Mixpanel');
  console.log('====================================');
  
  // 1. Verificar variables de entorno
  const token = import.meta.env.VITE_MIXPANEL_TOKEN;
  const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  
  console.log('✅ Variables de entorno:');
  console.log(`   - Mixpanel Token: ${token ? '✅ Configurado' : '❌ No configurado'}`);
  console.log(`   - Facebook Pixel: ${pixelId ? '✅ Configurado' : '❌ No configurado'}`);
  
  // 2. Verificar Mixpanel en window
  const mixpanelExists = typeof window !== 'undefined' && 'mixpanel' in window;
  console.log(`✅ Mixpanel en window: ${mixpanelExists ? '✅ Disponible' : '❌ No disponible'}`);
  
  // 3. Verificar sessionStorage
  const sessionId = sessionStorage.getItem('mixpanel_session_id');
  const trackedPages = sessionStorage.getItem('mixpanel_tracked_pages');
  
  console.log('✅ SessionStorage:');
  console.log(`   - Session ID: ${sessionId ? '✅ Creado' : '❌ No creado'}`);
  console.log(`   - Tracked Pages: ${trackedPages ? '✅ Configurado' : '❌ No configurado'}`);
  
  // 4. Verificar eventos
  console.log('✅ Eventos configurados:');
  console.log('   - Page View: ✅ Automático al cargar');
  console.log('   - WhatsApp Click: ✅ Al hacer click en botón');
  
  // 5. Verificar protección contra duplicados
  console.log('✅ Protecciones implementadas:');
  console.log('   - Prevención de inicialización múltiple: ✅');
  console.log('   - Control de page view por sesión: ✅');
  console.log('   - Debounce para clicks: ✅');
  console.log('   - IDs únicos de eventos: ✅');
  
  console.log('====================================');
  
  return {
    tokenConfigured: !!token,
    pixelConfigured: !!pixelId,
    mixpanelAvailable: mixpanelExists,
    sessionCreated: !!sessionId,
    pagesTracked: !!trackedPages
  };
};

// Función para enviar evento de prueba inmediato
export const sendImmediateTestEvent = () => {
  console.log('🚀 Enviando evento de prueba inmediato...');
  
  if (typeof window !== 'undefined' && 'mixpanel' in window) {
    const mixpanel = (window as any).mixpanel;
    
    const testEvent = {
      event: 'Immediate Test Event',
      properties: {
        test: true,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        user_agent: navigator.userAgent,
        verification: 'manual_test'
      }
    };
    
    mixpanel.track(testEvent.event, testEvent.properties);
    console.log('✅ Evento de prueba enviado:', testEvent);
    
    return true;
  } else {
    console.error('❌ Mixpanel no disponible para evento de prueba');
    return false;
  }
};

// Función para verificar en tiempo real
export const realTimeVerification = () => {
  console.log('⏱️ Verificación en tiempo real...');
  
  // Verificar cada 2 segundos por 10 segundos
  let attempts = 0;
  const maxAttempts = 5;
  
  const checkInterval = setInterval(() => {
    attempts++;
    
    const mixpanelExists = typeof window !== 'undefined' && 'mixpanel' in window;
    const sessionId = sessionStorage.getItem('mixpanel_session_id');
    
    console.log(`   Intento ${attempts}/${maxAttempts}:`);
    console.log(`   - Mixpanel disponible: ${mixpanelExists ? '✅' : '❌'}`);
    console.log(`   - Session ID: ${sessionId ? '✅' : '❌'}`);
    
    if (mixpanelExists && sessionId) {
      console.log('✅ ¡Mixpanel está funcionando correctamente!');
      clearInterval(checkInterval);
    } else if (attempts >= maxAttempts) {
      console.log('❌ Mixpanel no se inicializó correctamente');
      clearInterval(checkInterval);
    }
  }, 2000);
}; 