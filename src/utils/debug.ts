// Utilidad de debug para Mixpanel
export const debugMixpanel = () => {
  console.log('🔍 Debug Mixpanel Configuration');
  console.log('================================');
  
  // Verificar variables de entorno
  console.log('Environment Variables:');
  console.log('- VITE_MIXPANEL_TOKEN:', import.meta.env.VITE_MIXPANEL_TOKEN);
  console.log('- VITE_FACEBOOK_PIXEL_ID:', import.meta.env.VITE_FACEBOOK_PIXEL_ID);
  console.log('- DEV Mode:', import.meta.env.DEV);
  
  // Verificar configuración
  const token = import.meta.env.VITE_MIXPANEL_TOKEN;
  const isConfigured = !!token && token !== 'TU_TOKEN_AQUI';
  
  console.log('\nConfiguration Status:');
  console.log('- Token configured:', !!token);
  console.log('- Token valid:', isConfigured);
  console.log('- Token value:', token);
  
  // Verificar sessionStorage
  console.log('\nSession Storage:');
  console.log('- mixpanel_session_id:', sessionStorage.getItem('mixpanel_session_id'));
  console.log('- mixpanel_tracked_pages:', sessionStorage.getItem('mixpanel_tracked_pages'));
  console.log('- mixpanel_recent_events:', sessionStorage.getItem('mixpanel_recent_events'));
  
  // Verificar window.mixpanel
  console.log('\nMixpanel Object:');
  console.log('- window.mixpanel exists:', typeof window !== 'undefined' && 'mixpanel' in window);
  
  if (typeof window !== 'undefined' && 'mixpanel' in window) {
    console.log('- mixpanel object:', (window as any).mixpanel);
  }
  
  // Verificar si hay errores en la consola
  console.log('\nNetwork Status:');
  console.log('- Current URL:', window.location.href);
  console.log('- User Agent:', navigator.userAgent);
  
  console.log('\n================================');
  
  return {
    tokenConfigured: !!token,
    tokenValid: isConfigured,
    tokenValue: token,
    sessionId: sessionStorage.getItem('mixpanel_session_id'),
    mixpanelExists: typeof window !== 'undefined' && 'mixpanel' in window
  };
};

// Función para forzar un evento de prueba
export const forceTestEvent = () => {
  console.log('🧪 Forcing Test Event');
  
  if (typeof window !== 'undefined' && 'mixpanel' in window) {
    const mixpanel = (window as any).mixpanel;
    
    mixpanel.track('Test Event', {
      test: true,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      user_agent: navigator.userAgent
    });
    
    console.log('✅ Test event sent to Mixpanel');
  } else {
    console.error('❌ Mixpanel not available');
  }
};

// Función para verificar si Mixpanel está funcionando
export const checkMixpanelStatus = () => {
  console.log('🔍 Checking Mixpanel Status');
  
  // Verificar si el script de Mixpanel se cargó
  const scripts = document.querySelectorAll('script');
  let mixpanelScriptFound = false;
  
  scripts.forEach(script => {
    if (script.src && script.src.includes('mixpanel')) {
      mixpanelScriptFound = true;
      console.log('✅ Mixpanel script found:', script.src);
    }
  });
  
  if (!mixpanelScriptFound) {
    console.log('❌ Mixpanel script not found in DOM');
  }
  
  // Verificar si hay requests a Mixpanel en la red
  console.log('📡 Check Network tab for requests to api.mixpanel.com');
  
  return {
    scriptFound: mixpanelScriptFound,
    windowMixpanel: typeof window !== 'undefined' && 'mixpanel' in window
  };
};

// Función para enviar evento manual directamente
export const sendManualEvent = () => {
  console.log('📤 Sending Manual Event');
  
  const token = import.meta.env.VITE_MIXPANEL_TOKEN;
  
  if (!token) {
    console.error('❌ No Mixpanel token configured');
    return;
  }
  
  // Crear evento manual usando fetch
  const eventData = {
    event: 'Manual Test Event',
    properties: {
      token: token,
      test: true,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      user_agent: navigator.userAgent,
      distinct_id: 'test_user_' + Date.now()
    }
  };
  
  fetch('https://api.mixpanel.com/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([eventData])
  })
  .then(response => {
    console.log('✅ Manual event sent successfully:', response.status);
    return response.text();
  })
  .then(data => {
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('❌ Error sending manual event:', error);
  });
}; 