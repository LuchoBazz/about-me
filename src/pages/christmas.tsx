import React, { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ChristmasTree() {
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Ajustar tamaño del canvas
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // --- CONFIGURACIÓN DE LA SIMULACIÓN ---
    const particles = [];
    const snowParticles = [];
    const TREE_HEIGHT = Math.min(width, height) * 0.8;
    const PARTICLE_COUNT = 800;
    const SNOW_COUNT = 200;
    
    // Variables de rotación
    let angleY = 0;
    let targetTiltX = 0;
    let currentTiltX = 0;

    // --- GENERACIÓN DEL ÁRBOL ---
    // Usamos una espiral logarítmica para la forma del árbol
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // t va de 0 (base) a 1 (punta)
      const t = i / PARTICLE_COUNT;
      
      // El radio disminuye a medida que subimos (forma de cono)
      const radius = (1 - t) * (width < 600 ? 150 : 250);
      
      // Ángulo de la espiral (cuanto mayor es el multiplicador, más vueltas da)
      const angle = t * 30; 
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      // CORRECCIÓN: Invertir Y. 
      // t=0 (radio grande) -> Base -> Y positivo (abajo en canvas)
      // t=1 (radio pequeño) -> Punta -> Y negativo (arriba en canvas)
      const y = (TREE_HEIGHT / 2) - (t * TREE_HEIGHT);

      // Determinar color y tipo
      let color = `hsl(${120 + Math.random() * 40}, 70%, 50%)`; // Verdes variados
      let size = 2 + Math.random() * 2;
      let isOrnament = Math.random() < 0.15; // 15% de probabilidad de ser adorno
      
      if (isOrnament) {
        const hue = Math.random() < 0.5 ? 0 : 50; // Rojo o Dorado
        color = `hsl(${hue}, 90%, 60%)`;
        size = 3.5;
      }

      particles.push({ x, y, z, color, size, isOrnament, baseY: y });
    }

    // Agregar la estrella en la punta (Y negativo es arriba)
    particles.push({
      x: 0, 
      y: -TREE_HEIGHT / 2, 
      z: 0, 
      color: '#FFD700', 
      size: 10, 
      isOrnament: true, 
      isStar: true 
    });

    // --- GENERACIÓN DE NIEVE ---
    for (let i = 0; i < SNOW_COUNT; i++) {
      snowParticles.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * 500 - 250,
        speed: 1 + Math.random() * 2,
        size: 1 + Math.random() * 2
      });
    }

    // --- MANEJO DEL MOUSE ---
    const handleMouseMove = (e) => {
      // Mover ligeramente la inclinación del árbol basado en el mouse
      const x = (e.clientX / width) * 2 - 1;
      targetTiltX = x * 0.5; // Inclinación máxima de 0.5 radianes
    };
    
    // Soporte táctil básico
    const handleTouchMove = (e) => {
        if(e.touches.length > 0) {
            const x = (e.touches[0].clientX / width) * 2 - 1;
            targetTiltX = x * 0.5;
        }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // --- BUCLE DE ANIMACIÓN ---
    let animationFrameId;

    const render = () => {
      if (!canvasRef.current) return;
      
      // Limpiar canvas con un fondo degradado oscuro
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      gradient.addColorStop(0, '#0f172a'); // Azul oscuro pizarra
      gradient.addColorStop(1, '#020617'); // Casi negro
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Actualizar rotación automática
      angleY += 0.015;
      
      // Suavizar la inclinación del mouse (interpolación lineal)
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;
      const focalLength = 800; // Campo de visión

      // --- DIBUJAR NIEVE ---
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      snowParticles.forEach(p => {
        p.y += p.speed;
        // Reiniciar si sale de la pantalla
        if (p.y > height / 2) p.y = -height / 2;

        // Proyección 3D simple para la nieve
        const scale = focalLength / (focalLength + p.z);
        const px = p.x * scale + centerX;
        const py = p.y * scale + centerY;
        
        ctx.beginPath();
        ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- DIBUJAR ÁRBOL ---
      // Ordenar partículas por profundidad (Z) para que las de atrás no tapen a las de adelante
      // (Algoritmo del pintor)
      const projectedParticles = particles.map(p => {
        // Rotación alrededor del eje Y (Giro automático)
        let x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
        let z1 = p.z * Math.cos(angleY) + p.x * Math.sin(angleY);
        
        // Rotación alrededor del eje X (Inclinación con mouse) - opcional, añade dinamismo
        let y2 = p.y * Math.cos(currentTiltX) - z1 * Math.sin(currentTiltX);
        let z2 = p.y * Math.sin(currentTiltX) + z1 * Math.cos(currentTiltX);

        // Proyección de perspectiva
        // Cuanto más lejos (z mayor), más pequeño el scale
        const scale = focalLength / (focalLength + z2 + 400); // +400 para empujar el árbol un poco atrás
        
        return {
          ...p,
          px: x1 * scale + centerX,
          py: y2 * scale + centerY,
          scale: scale,
          zDepth: z2 // Guardamos Z para ordenar
        };
      });

      // Ordenar: dibujar primero lo que está más lejos (Z mayor)
      projectedParticles.sort((a, b) => b.zDepth - a.zDepth);

      projectedParticles.forEach(p => {
        ctx.beginPath();
        
        // Brillo especial para la estrella y adornos
        if (p.isOrnament || p.isStar) {
           ctx.shadowBlur = p.isStar ? 20 : 10;
           ctx.shadowColor = p.color;
        } else {
           ctx.shadowBlur = 0;
        }

        ctx.fillStyle = p.color;
        
        // La estrella rota sobre sí misma visualmente con destellos
        if (p.isStar) {
             const spikeLength = p.size * p.scale * (1.2 + Math.sin(Date.now() * 0.005) * 0.3);
             drawStar(ctx, p.px, p.py, 5, p.size * p.scale, spikeLength);
             ctx.fillStyle = '#FFF'; // Centro blanco brillante
             ctx.fill();
        } else {
            // Partículas normales y adornos
            ctx.arc(p.px, p.py, p.size * p.scale, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    if (isRunning) {
        render();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning]);

  // Función auxiliar para dibujar estrella
  function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 text-white font-sans">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <a href="/about-me/" className="text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition-colors font-serif italic text-sm">
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full cursor-pointer active:cursor-grabbing"
      />
      
      {/* UI Overlay */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-3xl font-light tracking-widest text-emerald-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-2">
          MERRY CHRISTMAS · FELIZ NAVIDAD
        </h1>
        <p className="text-xs text-emerald-400/60 uppercase tracking-widest mb-6">
          From · Luis Miguel Báez
        </p>
        
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className="pointer-events-auto px-6 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all text-sm tracking-wide active:scale-95"
        >
          {isRunning ? 'Pause Rotation' : 'Resume'}
        </button>
      </div>

      {/* Instrucción sutil */}
      <div className="absolute top-4 right-4 text-right pointer-events-none opacity-50">
        <p className="text-xs text-white">Move the cursor or tap</p>
        <p className="text-[10px] text-white/60">to tilt the camera</p>
      </div>
    </div>
  );
}