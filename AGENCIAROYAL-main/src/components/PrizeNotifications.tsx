import React, { useEffect, useState } from 'react';

// Número de WhatsApp FIJO - 2236751421
const WHATSAPP_NUMBER = '2236751421';
const WHATSAPP_MESSAGE = 'Quiero mi bono del 30% y jugar♥';

interface Notification {
  id: number;
  name: string;
  amount: string;
  location: string;
  timeAgo: string;
  isVisible: boolean;
}

const notifications: Omit<Notification, 'id' | 'isVisible'>[] = [
  { name: "Danielita Roy", amount: "$44.000", location: "Córdoba", timeAgo: "hace 1 hora" },
  { name: "Juan Gómez", amount: "$67.000", location: "Rosario", timeAgo: "hace 1 hora" },
  { name: "Exe Bosch", amount: "$83.000", location: "Salta", timeAgo: "hace 35 minutos" },
  { name: "María López", amount: "$52.000", location: "Buenos Aires", timeAgo: "hace 2 horas" },
  { name: "Carlos Paz", amount: "$91.000", location: "Mendoza", timeAgo: "hace 45 minutos" },
];

const PrizeNotifications: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    let notificationIndex = 0;
    let idCounter = 0;

    const showNotification = () => {
      const notification = notifications[notificationIndex % notifications.length];
      const newNotification: Notification = {
        ...notification,
        id: idCounter++,
        isVisible: false, // Empieza invisible para animar la entrada
      };

      setCurrentNotification(newNotification);

      // Animar la entrada después de un pequeño delay
      setTimeout(() => {
        setCurrentNotification(prev => 
          prev ? { ...prev, isVisible: true } : null
        );
      }, 50);

      // Ocultar después de 3 segundos
      setTimeout(() => {
        setCurrentNotification(prev => 
          prev ? { ...prev, isVisible: false } : null
        );

        // Remover completamente después de la animación de salida
        setTimeout(() => {
          setCurrentNotification(null);
        }, 500);
      }, 3000);

      notificationIndex++;
    };

    // Mostrar primera notificación después de 2 segundos
    const initialTimeout = setTimeout(showNotification, 2000);

    // Luego mostrar cada 5 segundos
    const interval = setInterval(showNotification, 5000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!currentNotification) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div
        className={`
          bg-white rounded-lg shadow-lg p-2 w-[280px]
          transform transition-all duration-500 ease-in-out
          ${currentNotification.isVisible 
            ? 'translate-x-0 opacity-100' 
            : '-translate-x-full opacity-0'
          }
        `}
      >
        <div className="flex items-center space-x-2">
          {/* Avatar más pequeño */}
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Content más compacto */}
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-800 text-xs">
                {currentNotification.name}
              </span>
              <span className="text-orange-500 text-sm">🏆</span>
            </div>
            
            <div className="text-blue-600 font-bold text-xs">
              Reclamó su premio de {currentNotification.amount}
            </div>
            
            <div className="flex items-center text-gray-500 text-xs">
              <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {currentNotification.location} • {currentNotification.timeAgo}
            </div>
          </div>
        </div>

        {/* WhatsApp Button más pequeño */}
        <div className="mt-2">
          <a 
            href={`https://wa.me/549${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-xs transition-colors block text-center"
          >
            WhatsApp!
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrizeNotifications;