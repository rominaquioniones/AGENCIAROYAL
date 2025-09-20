import { useEffect, useRef } from 'react';
import { initMixpanel, trackPageView } from '../utils/mixpanel';
import { debugMixpanel } from '../utils/debug';

// Hook para manejar analytics de manera segura con Strict Mode
export const useAnalytics = () => {
  const initialized = useRef(false);
  const pageViewTracked = useRef(false);

  // Inicializar Mixpanel una sola vez
  useEffect(() => {
    if (!initialized.current) {
      // Debug en desarrollo
      if (import.meta.env.DEV) {
        debugMixpanel();
      }
      
      initMixpanel();
      initialized.current = true;
    }
  }, []);

  // Trackear page view una sola vez por sesión
  useEffect(() => {
    if (!pageViewTracked.current) {
      trackPageView();
      pageViewTracked.current = true;
    }
  }, []);

  return {
    isInitialized: initialized.current,
    isPageViewTracked: pageViewTracked.current
  };
};

// Hook para prevenir efectos duplicados en Strict Mode
export const useStrictModeSafeEffect = (
  effect: () => void | (() => void),
  deps: React.DependencyList = []
) => {
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const cleanup = effect();
      effectRan.current = true;

      return () => {
        if (cleanup) cleanup();
        effectRan.current = false;
      };
    }
  }, deps);
}; 