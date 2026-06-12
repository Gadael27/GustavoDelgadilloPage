import React, { useEffect, useRef } from 'react';

export default function SmokeSparksCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Inicializar y escuchar cambios de tamaño
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor(x, y, isSpark) {
        this.x = x;
        this.y = y;
        this.isSpark = isSpark;
        this.size = isSpark ? Math.random() * 3 + 1 : Math.random() * 40 + 20;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * -4 - 1;
        // Colores de la marca: Amarillo para chispas, rosa sutil para humo
        this.color = isSpark ? '#ffeb3b' : 'rgba(255, 0, 127, 0.05)';
        this.alpha = 1;
        this.decay = isSpark ? 0.02 : 0.005;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha); // Evitar alphas negativos
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const createExplosion = (e) => {
      for (let i = 0; i < 15; i++) {
        particles.push(new Particle(e.clientX, e.clientY, true));  // Chispas
        particles.push(new Particle(e.clientX, e.clientY, false)); // Humo
      }
    };

    window.addEventListener('click', createExplosion);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };
    animate();

    // Limpieza al desmontar
    return () => {
      window.removeEventListener('click', createExplosion);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 pointer-events-none z-[9999]" 
    />
  );
}