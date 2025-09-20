// Declaraciones globales para TypeScript
declare global {
  interface Window {
    WHATSAPP_CONFIG: {
      NUMBER: string;
      MESSAGE: string;
      URL: string;
    };
  }
}

export {};
