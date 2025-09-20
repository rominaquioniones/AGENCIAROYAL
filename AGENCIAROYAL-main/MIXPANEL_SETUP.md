# Configuración de Mixpanel

## Pasos para configurar Mixpanel

### 1. Obtener el Token de Mixpanel
1. Ve a [Mixpanel](https://mixpanel.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a Project Settings > Project Token
4. Copia el token del proyecto

### 2. Configurar Variables de Entorno
1. Crea un archivo `.env` en la raíz del proyecto
2. Agrega tu token de Mixpanel:

```env
VITE_MIXPANEL_TOKEN=tu_token_de_mixpanel_aqui
```

### 3. Eventos Configurados

#### Page View Event
- **Nombre del evento**: `Page View`
- **Propiedades**:
  - `page_name`: Nombre de la página
  - `timestamp`: Timestamp del evento
  - `url`: URL actual
  - `user_agent`: User agent del navegador

#### WhatsApp Redirect Event
- **Nombre del evento**: `WhatsApp Redirect`
- **Propiedades**:
  - `action`: "whatsapp_click"
  - `phone_number`: Número de WhatsApp seleccionado
  - `timestamp`: Timestamp del evento
  - `url`: URL actual
  - `user_agent`: User agent del navegador
  - `button_text`: Texto del botón

### 4. Verificar la Configuración
1. Ejecuta `npm run dev`
2. Abre las herramientas de desarrollador
3. Ve a la pestaña Network
4. Busca requests a Mixpanel
5. Verifica que los eventos se estén enviando correctamente

### 5. Dashboard de Mixpanel
Una vez configurado, podrás ver los eventos en:
- **Live View**: Para ver eventos en tiempo real
- **Events**: Para ver todos los eventos históricos
- **Funnels**: Para crear embudos de conversión

### 6. Funciones Disponibles

```typescript
// Inicializar Mixpanel
initMixpanel();

// Trackear page view
trackPageView('Nombre de la página');

// Trackear click en WhatsApp
trackWhatsAppClick('número_de_whatsapp');

// Trackear evento personalizado
trackEvent('Nombre del evento', { propiedad: 'valor' });

// Identificar usuario
identifyUser('user_id', { nombre: 'Juan' });
```

### 7. Debug Mode
En desarrollo, Mixpanel mostrará logs en la consola para ayudar con el debugging. En producción, estos logs se desactivan automáticamente. 