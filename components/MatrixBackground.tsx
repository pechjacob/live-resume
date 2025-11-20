import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  mode: 'dark' | 'light';
}

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Initialize background to black immediately
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    // Matrix characters
    const letters = '0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const matrix = letters.split('');

    const fontSize = 14;
    const columns = width / fontSize;

    // Array of drops - one per column
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Fade effect
      // Always fade to black to maintain the dark background aesthetic
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Text color
      // Always Matrix Green (#0F0) regardless of light/dark mode setting
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Randomly reset drop to top
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Reset background on resize
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      // Reset drops on resize to prevent gaps
      const newColumns = width / fontSize;
      if (newColumns > drops.length) {
         for (let x = drops.length; x < newColumns; x++) {
            drops[x] = Math.random() * (height / fontSize);
         }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Remove mode dependency to prevent animation reset on toggle, as visuals are now identical

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none no-print bg-black"
    />
  );
};

export default MatrixBackground;