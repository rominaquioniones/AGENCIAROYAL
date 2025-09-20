import FallingParticles from './components/FallingParticles';
import PrizeNotifications from './components/PrizeNotifications';
import logoImage from './assets/descarga.png';
import { useState, useEffect } from 'react';

// Número de WhatsApp FIJO - 2236751421
const WHATSAPP_NUMBER = '2236751421';
const WHATSAPP_MESSAGE = 'Quiero mi bono del 30% y jugar♥';

function App() {
  const [isLowHeight, setIsLowHeight] = useState(false);
  const [isNotebook, setIsNotebook] = useState(false);

  useEffect(() => {
    const checkDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Threshold para notebooks con poco VH (menos de 800px de altura)
      setIsLowHeight(height < 800);
      
      // Detectar notebook: ancho >= 1024px Y altura < 800px (ratio landscape extremo)
      setIsNotebook(width >= 1024 && height < 800);
    };

    checkDimensions();
    window.addEventListener('resize', checkDimensions);
    return () => window.removeEventListener('resize', checkDimensions);
  }, []);

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-black via-gray-900 to-red-900 relative overflow-hidden" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
      <style>{`
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.3) rotate(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.1);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes pulseScale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-zoom-in {
          animation: zoomIn 1.2s ease-out;
          animation-delay: 0.1s;
          animation-fill-mode: both;
        }
        
        .animate-slide-down {
          animation: slideDown 0.8s ease-out;
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
        
        .animate-slide-left {
          animation: slideLeft 0.8s ease-out;
          animation-delay: 0.7s;
          animation-fill-mode: both;
        }
        
        .animate-bounce-in {
          animation: bounceIn 1s ease-out;
          animation-delay: 1s;
          animation-fill-mode: both;
        }
        
        .animate-slide-right {
          animation: slideRight 0.8s ease-out;
          animation-delay: 1.3s;
          animation-fill-mode: both;
        }
        
        .animate-fade-up {
          animation: fadeUp 1s ease-out;
          animation-delay: 1.6s;
          animation-fill-mode: both;
        }
        
        .animate-pulse-scale {
          animation: pulseScale 2s ease-in-out infinite;
        }
      `}</style>
      
      {/* Partículas cayendo */}
      <FallingParticles />
      
      {/* Notificaciones de premios */}
      <PrizeNotifications />
      
      {/* Contenido principal */}
      <div className={`container mx-auto px-4 relative z-20 flex flex-col items-center h-full ${isNotebook ? 'overflow-y-hidden justify-center py-6 space-y-4' : 'overflow-y-auto justify-evenly py-4'} overflow-x-hidden`}>
        
        {/* Logo Image */}
        <div className={`${isNotebook ? 'w-36 h-36' : 'w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-64 lg:h-64'} flex items-center justify-center flex-shrink-0 animate-zoom-in`}>
          <img 
            src={logoImage} 
            alt="Logo" 
            className="w-full h-full object-contain rounded-full shadow-2xl"
          />
        </div>

        {/* Plataforma Verificada */}
        <div className={`text-center flex-shrink-0 ${isNotebook ? '-mt-3' : '-mt-4'} animate-slide-down`}>
          <div className={`flex items-center justify-center space-x-1 sm:space-x-1.5 md:space-x-1.5 ${
            isNotebook ? 'mb-1' : isLowHeight ? 'mb-0.5 sm:mb-0.5 md:mb-0.5' : 'mb-1 sm:mb-1.5 md:mb-1'
          }`}>
            <span className="text-green-500 text-lg sm:text-xl md:text-xl lg:text-2xl">✅</span>
            <h1 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white">Plataforma Verificada</h1>
            <span className="text-green-500 text-lg sm:text-xl md:text-xl lg:text-2xl">✅</span>
          </div>
          <p className="text-green-400 text-base sm:text-lg md:text-lg lg:text-xl font-semibold">Casino de Confianza</p>
        </div>

        {/* Mensaje de conexión - Oculto en notebooks */}
        {!isNotebook && (
          <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md text-center flex-shrink-0 animate-slide-left ${
            isLowHeight ? 'p-2 sm:p-2 md:p-2' : 'p-3 sm:p-3.5 md:p-3'
          }`}>
            <p className="text-gray-300 text-xs sm:text-sm md:text-sm lg:text-base">
              Te estamos conectando con nuestro equipo vía WhatsApp.
            </p>
          </div>
        )}

        {/* Botón WhatsApp - NÚMERO FIJO 2236751421 */}
        <a 
          href={`https://wa.me/549${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center flex-shrink-0 animate-bounce-in animate-pulse-scale ${
            isLowHeight 
              ? 'py-2.5 px-5 sm:py-3 sm:px-6 md:py-3 md:px-6 lg:py-4 lg:px-8 text-sm sm:text-base md:text-base lg:text-xl space-x-2 sm:space-x-2 md:space-x-2 lg:space-x-3'
              : 'py-3 px-6 sm:py-3.5 sm:px-7 md:py-3.5 md:px-7 lg:py-4 lg:px-8 text-base sm:text-lg md:text-lg lg:text-xl space-x-2 sm:space-x-2.5 md:space-x-2.5 lg:space-x-3'
          }`}
        >
          <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          <span>¡QUIERO MI BONO!</span>
        </a>

        {/* Clientes ganando - Oculto en notebooks */}
        {!isNotebook && (
          <div className="text-green-400 text-sm sm:text-base md:text-base lg:text-xl font-semibold text-center flex-shrink-0 animate-slide-right">
            <span>+1.000 CLIENTES GANANDO todos los días</span>
          </div>
        )}

        {/* Banner de características */}
        <div className={`bg-black/80 backdrop-blur-sm rounded-xl w-full border-2 border-green-500 shadow-lg shadow-green-500/20 flex-shrink-0 animate-fade-up ${
          isNotebook 
            ? 'max-w-4xl p-4'
            : isLowHeight 
              ? 'max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-4xl p-2 sm:p-3 md:p-3 lg:p-6 mb-1 sm:mb-1 md:mb-1'
              : 'max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-4xl p-3 sm:p-4 md:p-4 lg:p-6 mb-2 sm:mb-3 md:mb-2'
        }`}>
          <div className={`grid grid-cols-2 md:grid-cols-4 text-center ${
            isLowHeight 
              ? 'gap-1.5 sm:gap-2 md:gap-2 lg:gap-6'
              : 'gap-2 sm:gap-3 md:gap-3 lg:gap-6'
          }`}>
            
            {/* Atención 24/7 */}
            <div className={`flex flex-col items-center ${
              isLowHeight ? 'space-y-0.5 sm:space-y-1 md:space-y-0.5' : 'space-y-1 sm:space-y-1.5 md:space-y-1'
            }`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-16 lg:h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-8 lg:h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="text-white">
                <p className="text-xs sm:text-sm md:text-sm lg:text-base font-bold">ATENCIÓN</p>
                <p className="text-xs sm:text-xs md:text-xs lg:text-sm text-green-400">24/7</p>
              </div>
            </div>

            {/* Premios al instante */}
            <div className={`flex flex-col items-center ${
              isLowHeight ? 'space-y-0.5 sm:space-y-1 md:space-y-0.5' : 'space-y-1 sm:space-y-1.5 md:space-y-1'
            }`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-16 lg:h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-8 lg:h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 3H18L21 7L12 21L3 7L6 3Z"/>
                  <path d="M6 3L12 7L18 3"/>
                  <path d="M3 7L12 7L21 7"/>
                  <path d="M8 7L12 21"/>
                  <path d="M16 7L12 21"/>
                </svg>
              </div>
              <div className="text-white">
                <p className="text-xs sm:text-sm md:text-sm lg:text-base font-bold">PREMIOS</p>
                <p className="text-xs sm:text-xs md:text-xs lg:text-sm text-green-400">AL INSTANTE</p>
              </div>
            </div>

            {/* Aceptamos transferencias */}
            <div className={`flex flex-col items-center ${
              isLowHeight ? 'space-y-0.5 sm:space-y-1 md:space-y-0.5' : 'space-y-1 sm:space-y-1.5 md:space-y-1'
            }`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-16 lg:h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-8 lg:h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                </svg>
              </div>
              <div className="text-white">
                <p className="text-xs sm:text-sm md:text-sm lg:text-base font-bold">ACEPTAMOS</p>
                <p className="text-xs sm:text-xs md:text-xs lg:text-sm text-green-400">TRANSFERENCIAS</p>
              </div>
            </div>

            {/* 100% Seguro */}
            <div className={`flex flex-col items-center ${
              isLowHeight ? 'space-y-0.5 sm:space-y-1 md:space-y-0.5' : 'space-y-1 sm:space-y-1.5 md:space-y-1'
            }`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-16 lg:h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-8 lg:h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                </svg>
              </div>
              <div className="text-white">
                <p className="text-xs sm:text-sm md:text-sm lg:text-base font-bold">100%</p>
                <p className="text-xs sm:text-xs md:text-xs lg:text-sm text-green-400">SEGURO</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App