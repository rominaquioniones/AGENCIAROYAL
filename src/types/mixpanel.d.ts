declare module 'mixpanel-browser' {
  interface Mixpanel {
    init(token: string, config?: any): void;
    track(event: string, properties?: Record<string, any>): void;
    identify(userId: string): void;
    people: {
      set(properties: Record<string, any>): void;
    };
  }

  const mixpanel: Mixpanel;
  export default mixpanel;
} 