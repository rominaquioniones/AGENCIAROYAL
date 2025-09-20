import React, { useEffect, useState, useRef, useCallback } from 'react';

interface ChipDesign {
  gradient: string;
  border: string;
  innerRing: string;
  centerColor: string;
  textColor: string;
  value: string;
}

interface Chip {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  design: ChipDesign;
  rotation: number;
  rotationSpeed: number;
}

const chipDesigns: ChipDesign[] = [
  {
    gradient: 'bg-gradient-to-br from-red-400 via-red-500 to-red-700',
    border: 'border-red-800',
    innerRing: 'border-red-300',
    centerColor: 'bg-red-600',
    textColor: 'text-white',
    value: '5'
  },
  {
    gradient: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700',
    border: 'border-blue-800',
    innerRing: 'border-blue-300',
    centerColor: 'bg-blue-600',
    textColor: 'text-white',
    value: '10'
  },
  {
    gradient: 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700',
    border: 'border-purple-800',
    innerRing: 'border-purple-300',
    centerColor: 'bg-purple-600',
    textColor: 'text-white',
    value: '50'
  },
  {
    gradient: 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600',
    border: 'border-yellow-700',
    innerRing: 'border-yellow-200',
    centerColor: 'bg-yellow-500',
    textColor: 'text-black',
    value: '100'
  },
  {
    gradient: 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900',
    border: 'border-gray-900',
    innerRing: 'border-gray-500',
    centerColor: 'bg-gray-800',
    textColor: 'text-white',
    value: '500'
  },
  {
    gradient: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700',
    border: 'border-orange-800',
    innerRing: 'border-orange-300',
    centerColor: 'bg-orange-600',
    textColor: 'text-white',
    value: '25'
  }
];

const FallingParticles: React.FC = () => {
  const [chips, setChips] = useState<Chip[]>([]);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const windowDimensions = useRef({ width: 0, height: 0 });
  const [isAndroid, setIsAndroid] = useState(false);

  // Cachear dimensiones de ventana
  const updateWindowDimensions = useCallback(() => {
    windowDimensions.current = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }, []);

  useEffect(() => {
    // Detectar Android
    const userAgent = navigator.userAgent.toLowerCase();
    setIsAndroid(userAgent.includes('android'));
  }, []);

  // Generar fichas estáticas una sola vez - Reducidas para Android
  const staticChips = React.useMemo(() => {
    // Menos fichas en Android para mejor rendimiento
    const chipCount = isAndroid ? 50 : 100;
    
    return Array.from({ length: chipCount }, (_, i) => {
      const design = chipDesigns[Math.floor(Math.random() * chipDesigns.length)];
      const stackHeight = Math.random() * 80;
      const clusterX = (i % 10) * (window.innerWidth / 10);
      const randomOffset = Math.random() * 100 - 50;
      
      return {
        id: `pile-${i}`,
        design,
        left: clusterX + randomOffset,
        bottom: stackHeight,
        width: Math.random() * 10 + 25,
        height: Math.random() * 10 + 25,
        opacity: Math.max(0.3, 0.8 - stackHeight * 0.01),
        rotation: Math.random() * 360,
        zIndex: Math.floor(stackHeight),
      };
    });
  }, [isAndroid]);

  // Función de animación optimizada con requestAnimationFrame
  const animate = useCallback((currentTime: number) => {
    // FPS más bajo en Android para mejor rendimiento
    const targetFPS = isAndroid ? 30 : 60;
    const frameTime = 1000 / targetFPS;
    
    if (currentTime - lastTimeRef.current < frameTime) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const deltaTime = Math.min(currentTime - lastTimeRef.current, 50);
    lastTimeRef.current = currentTime;

    setChips(prevChips => {
      const { width, height } = windowDimensions.current;
      const pileHeight = height - 130;
      
      return prevChips.map(chip => {
        const speedMultiplier = deltaTime / 16.67;
        const newY = chip.y + (chip.speed * speedMultiplier);
        const newRotation = chip.rotation + (chip.rotationSpeed * speedMultiplier);
        
        if (newY > pileHeight) {
          const fadeDistance = 50;
          const distanceIntoPile = newY - pileHeight;
          const fadeOpacity = Math.max(0, chip.opacity - (distanceIntoPile / fadeDistance) * chip.opacity);
          
          if (fadeOpacity <= 0) {
            return {
              ...chip,
              x: Math.random() * (width - 60),
              y: -60,
              speed: Math.random() * 3 + 1.5,
              opacity: Math.random() * 0.6 + 0.4,
              design: chipDesigns[Math.floor(Math.random() * chipDesigns.length)],
              rotation: Math.random() * 360,
            };
          }
          
          return {
            ...chip,
            y: newY,
            rotation: newRotation,
            opacity: fadeOpacity,
          };
        }
        
        return {
          ...chip,
          y: newY,
          rotation: newRotation,
        };
      });
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [isAndroid]);

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    // Menos fichas cayendo en Android
    const chipCount = isAndroid ? 8 : 15;
    
    const initialChips: Chip[] = Array.from({ length: chipCount }, (_, i) => ({
      id: i,
      x: Math.random() * (windowDimensions.current.width - 60),
      y: Math.random() * windowDimensions.current.height,
      size: Math.random() * 15 + 30,
      speed: Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.6 + 0.4,
      design: chipDesigns[Math.floor(Math.random() * chipDesigns.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 3,
    }));

    setChips(initialChips);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, [animate, updateWindowDimensions, isAndroid]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Montones de fichas estáticas acumuladas - Simplificadas en Android */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        {staticChips.map(staticChip => (
          <div
            key={staticChip.id}
            className={`absolute ${staticChip.design.gradient} ${staticChip.design.border} border rounded-full flex items-center justify-center`}
            style={{
              left: `${staticChip.left}px`,
              bottom: `${staticChip.bottom}px`,
              width: `${staticChip.width}px`,
              height: `${staticChip.height}px`,
              opacity: staticChip.opacity,
              transform: `rotate(${staticChip.rotation}deg)`,
              zIndex: staticChip.zIndex,
              willChange: 'auto',
            }}
          >
            {/* Versión más simple en Android */}
            {!isAndroid && (
              <div 
                className={`${staticChip.design.centerColor} rounded-full flex items-center justify-center ${staticChip.design.textColor} font-bold`}
                style={{
                  width: '60%',
                  height: '60%',
                  fontSize: '8px',
                }}
              >
                {staticChip.design.value}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fichas cayendo - Simplificadas en Android */}
      {chips.map(chip => (
        <div
          key={chip.id}
          className={`absolute ${chip.design.gradient} ${chip.design.border} border-4 rounded-full flex items-center justify-center`}
          style={{
            left: `${chip.x}px`,
            top: `${chip.y}px`,
            width: `${chip.size}px`,
            height: `${chip.size}px`,
            opacity: chip.opacity,
            transform: `rotate(${chip.rotation}deg)`,
            boxShadow: isAndroid 
              ? '0 2px 6px rgba(0, 0, 0, 0.3)' 
              : '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
            zIndex: 100,
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Elementos decorativos solo en no-Android */}
          {!isAndroid && (
            <>
              <div 
                className={`absolute rounded-full border-2 ${chip.design.innerRing}`}
                style={{
                  width: `${chip.size * 0.7}px`,
                  height: `${chip.size * 0.7}px`,
                }}
              />
              
              <div className="absolute inset-0">
                {[0, 120, 240].map(angle => (
                  <div
                    key={angle}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-70"
                    style={{
                      top: '15%',
                      left: '50%',
                      transform: `translateX(-50%) rotate(${angle}deg) translateY(${chip.size * 0.3}px)`,
                      transformOrigin: 'center center',
                    }}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Centro con valor */}
          <div 
            className={`${chip.design.centerColor} rounded-full flex items-center justify-center ${chip.design.textColor} font-bold ${
              isAndroid ? '' : 'shadow-inner'
            }`}
            style={{
              width: `${chip.size * 0.5}px`,
              height: `${chip.size * 0.5}px`,
              fontSize: `${chip.size * 0.25}px`,
              boxShadow: isAndroid ? 'none' : 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {chip.design.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FallingParticles; 