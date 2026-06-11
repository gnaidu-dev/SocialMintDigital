import { useEffect, useRef } from 'react';

export default function FloatingElements() {
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

    // Throttled mouse tracking — only update every 50ms
    let mouse = { x: -9999, y: -9999 };
    let mouseTimer: ReturnType<typeof setTimeout>;
    const onMouseMove = (e: MouseEvent) => {
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }, 50);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Reduce particle count significantly — was width*height/9000, now /20000
    const PARTICLE_COUNT = Math.min(Math.round((width * height) / 20000), 60);
    const CONNECT_DISTANCE_SQ = 12000; // Fixed threshold, no division per frame
    const MOUSE_RADIUS = 100;

    const colors = ['#AF52DE', '#FF2D55', '#007AFF', '#FF9500'];

    interface P {
      x: number; y: number;
      bx: number; by: number;
      size: number;
      density: number;
      color: string;
      angle: number;
      vel: number;
    }

    let particles: P[] = [];

    function init() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x, y, bx: x, by: y,
          size: Math.random() * 2 + 0.5,
          density: Math.random() * 15 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * Math.PI * 2,
          vel: Math.random() * 0.3 + 0.05,
        });
      }
    }

    let rafId: number;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Wander
        p.angle += p.vel * 0.02;
        p.bx += Math.cos(p.angle) * p.vel;
        p.by += Math.sin(p.angle) * p.vel;

        // Wrap
        if (p.bx > width + 50) p.bx = -50;
        else if (p.bx < -50) p.bx = width + 50;
        if (p.by > height + 50) p.by = -50;
        else if (p.by < -50) p.by = height + 50;

        // Mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        const maxDistSq = MOUSE_RADIUS * MOUSE_RADIUS;

        if (distSq < maxDistSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * p.density;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        } else {
          p.x += (p.bx - p.x) * 0.05;
          p.y += (p.by - p.y) * 0.05;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // O(n²) connect — only run when n is small (≤60)
      ctx.lineWidth = 0.5;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const pa = particles[a], pb = particles[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < CONNECT_DISTANCE_SQ) {
            ctx.globalAlpha = (1 - dSq / CONNECT_DISTANCE_SQ) * 0.12;
            ctx.strokeStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(mouseTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-50"
    />
  );
}
