# 🛡️ Guía para Prevenir Eventos Duplicados en Strict Mode

## 🚨 El Problema

React Strict Mode ejecuta efectos dos veces en desarrollo para detectar efectos secundarios. Esto puede causar:

- ✅ Eventos de analytics duplicados
- ✅ Inicializaciones múltiples
- ✅ Llamadas a APIs duplicadas
- ✅ Problemas en producción si no se maneja correctamente

## 🛠️ Soluciones Implementadas

### 1. **Prevención de Inicialización Múltiple**

```typescript
// Variables para prevenir duplicados
let isInitialized = false;

export const initMixpanel = () => {
  if (isInitialized) {
    console.warn('Mixpanel ya está inicializado');
    return;
  }
  
  mixpanel.init(token, config);
  isInitialized = true;
};
```

### 2. **Control de Page View por Sesión**

```typescript
export const trackPageView = (pageName: string) => {
  const pageViewKey = `pageview_${pageName}_${window.location.pathname}`;
  const trackedPages = JSON.parse(sessionStorage.getItem('mixpanel_tracked_pages') || '[]');
  
  if (trackedPages.includes(pageViewKey)) {
    console.log('Page view ya trackeado en esta sesión');
    return;
  }
  
  // Trackear y marcar como procesado
  mixpanel.track('Page View', properties);
  trackedPages.push(pageViewKey);
  sessionStorage.setItem('mixpanel_tracked_pages', JSON.stringify(trackedPages));
};
```

### 3. **Debounce para Eventos de Click**

```typescript
export const trackWhatsAppClick = (phoneNumber: string) => {
  const recentEvents = JSON.parse(sessionStorage.getItem('mixpanel_recent_events') || '[]');
  const now = Date.now();
  const twoSecondsAgo = now - 2000;
  
  // Verificar eventos recientes
  const hasRecentClick = recentEvents.some(event => 
    event.type === 'whatsapp_click' && 
    event.phone_number === phoneNumber &&
    event.timestamp > twoSecondsAgo
  );
  
  if (hasRecentClick) return;
  
  // Trackear y agregar a eventos recientes
  mixpanel.track('WhatsApp Redirect', properties);
  recentEvents.push({ type: 'whatsapp_click', phone_number: phoneNumber, timestamp: now });
  sessionStorage.setItem('mixpanel_recent_events', JSON.stringify(recentEvents));
};
```

### 4. **Hook Personalizado para Strict Mode**

```typescript
export const useAnalytics = () => {
  const initialized = useRef(false);
  const pageViewTracked = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initMixpanel();
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (!pageViewTracked.current) {
      trackPageView();
      pageViewTracked.current = true;
    }
  }, []);
};
```

## 📊 Estrategias de Prevención

### 1. **SessionStorage para Persistencia**
- ✅ Mantiene estado entre re-renders
- ✅ Se limpia al cerrar la pestaña
- ✅ No interfiere con otras pestañas

### 2. **Debounce Temporal**
- ✅ Previene clicks múltiples rápidos
- ✅ Ventana de 2 segundos para eventos similares
- ✅ Limpieza automática de eventos antiguos

### 3. **IDs Únicos de Eventos**
- ✅ Cada evento tiene un ID único
- ✅ Verificación de duplicados por ID
- ✅ Timestamp incluido en cada evento

### 4. **Verificación de Configuración**
- ✅ Solo se ejecuta si Mixpanel está configurado
- ✅ Mensajes de warning informativos
- ✅ Fallback graceful

## 🔧 Configuración de Desarrollo

### Variables de Entorno
```env
# Para desarrollo
VITE_MIXPANEL_TOKEN=tu_token_aqui
VITE_DEBUG_ANALYTICS=true

# Para producción
VITE_MIXPANEL_TOKEN=tu_token_produccion
VITE_DEBUG_ANALYTICS=false
```

### Debug Mode
```typescript
// Solo en desarrollo
if (import.meta.env.DEV) {
  console.log('Analytics debug mode activado');
}
```

## 🧪 Testing

### Verificar en Desarrollo
1. Abre las herramientas de desarrollador
2. Ve a la pestaña Console
3. Recarga la página varias veces
4. Verifica que solo se envíe un evento de page view
5. Haz click en WhatsApp varias veces rápidamente
6. Verifica que solo se envíe un evento por click

### Verificar en Producción
1. Despliega a producción
2. Usa herramientas de red para verificar requests
3. Verifica en el dashboard de Mixpanel
4. Confirma que no hay eventos duplicados

## 📈 Monitoreo

### Logs de Debug
```typescript
console.log('Page view trackeado:', pageName);
console.log('WhatsApp click trackeado:', phoneNumber);
console.log('Evento ya trackeado recientemente');
```

### Métricas a Monitorear
- ✅ Eventos únicos vs duplicados
- ✅ Tiempo entre eventos similares
- ✅ Tasa de conversión real
- ✅ Sesiones únicas

## 🚀 Beneficios

### Para Desarrollo
- ✅ No más eventos duplicados en desarrollo
- ✅ Debug más limpio
- ✅ Mejor experiencia de desarrollo

### Para Producción
- ✅ Datos más precisos
- ✅ Métricas confiables
- ✅ Mejor análisis de conversión

### Para Analytics
- ✅ Eventos únicos garantizados
- ✅ Datos limpios para análisis
- ✅ Funnels más precisos

## 🔍 Troubleshooting

### Si sigues viendo duplicados:
1. Verifica que el token esté configurado
2. Revisa la consola para mensajes de debug
3. Limpia el sessionStorage: `sessionStorage.clear()`
4. Verifica que no haya múltiples instancias de la app

### Para limpiar datos de sesión:
```javascript
// En la consola del navegador
sessionStorage.clear();
location.reload();
```

## ✅ Checklist de Verificación

- [ ] Page view se envía solo una vez por sesión
- [ ] WhatsApp clicks no se duplican con clicks rápidos
- [ ] Eventos personalizados tienen debounce
- [ ] Debug logs aparecen en desarrollo
- [ ] No hay warnings de inicialización múltiple
- [ ] SessionStorage se limpia correctamente
- [ ] Funciona en desarrollo y producción 