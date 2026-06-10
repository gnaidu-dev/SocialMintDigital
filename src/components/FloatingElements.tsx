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

    let mouse = { x: width / 2, y: height / 2, radius: 150 };
    let scrollY = window.scrollY;

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    });

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    });

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      angle: number;
      velocity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 3 + 1;
        this.density = (Math.random() * 30) + 1;
        const colors = ['#AF52DE', '#FF2D55', '#007AFF', '#FF9500', '#10b981'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * 360;
        this.velocity = Math.random() * 0.5 + 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Gentle wandering
        this.angle += this.velocity * 0.05;
        this.baseX += Math.cos(this.angle) * this.velocity;
        this.baseY += Math.sin(this.angle) * this.velocity;

        // Wrap around screen
        if (this.baseX > width + 100) this.baseX = -100;
        if (this.baseX < -100) this.baseX = width + 100;
        if (this.baseY > height + scrollY + 100) this.baseY = -100 + scrollY;
        if (this.baseY < -100 + scrollY) this.baseY = height + scrollY + 100;

        let dx = mouse.x - this.x;
        let dy = mouse.y - (this.y - scrollY);
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }

    let particleArray: Particle[] = [];

    function init() {
      particleArray = [];
      let numberOfParticles = (width * height) / 9000; // Density
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * width;
        let y = Math.random() * (height + document.body.scrollHeight);
        particleArray.push(new Particle(x, y));
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleArray.length; i++) {
        let p = particleArray[i];
        // Only update and draw if on screen
        if (p.y >= scrollY - 100 && p.y <= scrollY + height + 100) {
           // Temporarily adjust y to screen space for drawing
           let screenY = p.y - scrollY;
           let tempY = p.y;
           p.y = screenY;
           p.update();
           p.draw();
           
           // Restore absolute Y for connections
           p.y = tempY + (p.y - screenY); 
        }
      }
      
      connect();
      requestAnimationFrame(animate);
    }

    function connect() {
      if (!ctx) return;
      let opacityValue = 1;
      for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
          let pa = particleArray[a];
          let pb = particleArray[b];
          
          // Skip if out of viewport
          if (pa.y < scrollY - 50 || pa.y > scrollY + height + 50 || pb.y < scrollY - 50 || pb.y > scrollY + height + 50) continue;

          let screenYa = pa.y - scrollY;
          let screenYb = pb.y - scrollY;

          let distance = ((pa.x - pb.x) * (pa.x - pb.x)) + ((screenYa - screenYb) * (screenYa - screenYb));
          
          if (distance < (width/10) * (height/10)) {
            opacityValue = 1 - (distance / 10000);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pa.x, screenYa);
            ctx.lineTo(pb.x, screenYb);
            ctx.stroke();
          }
        }
      }
    }

    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-70"
    />
  );
}
