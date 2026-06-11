import { motion, useMotionValue, useMotionTemplate, animate } from 'motion/react';
import { useEffect, useState, useRef, Key } from 'react';

const TUNNEL_WORDS = [
  "INITIALIZE",
  "DOMINANCE",
  "ACCELERATE",
  "GROWTH",
  "FUTURE",
  "SOCIAL MINT DIGITAL",
];

export default function Loader({ onComplete }: { onComplete: () => void; key?: Key }) {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const oRef = useRef<HTMLSpanElement>(null);

  const xPos = useMotionValue('50%');
  const yPos = useMotionValue('50%');
  const holeRadius = useMotionValue(0);
  const oScale = useMotionValue(1);

  const maskImage = useMotionTemplate`radial-gradient(circle at ${xPos} ${yPos}, transparent ${holeRadius}px, black calc(${holeRadius}px + 1px))`;

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          if (oRef.current) {
            const rect = oRef.current.getBoundingClientRect();
            xPos.set(`${rect.left + rect.width / 2}px`);
            yPos.set(`${rect.top + rect.height / 2}px`);
          }
          setIsOpening(true);

          let baseRadius = 15;
          if (oRef.current) {
            const rect = oRef.current.getBoundingClientRect();
            // Match the approximate counter hole of 'O'
            baseRadius = rect.width * 0.16; 
          }

          animate(oScale, 200, {
            duration: 2.0,
            ease: [0.76, 0, 0.24, 1], // Cinematic ease
            onUpdate: (v) => {
              holeRadius.set(v * baseRadius);
            }
          });

          // Wait for tunnel to finish
          setTimeout(() => {
            onComplete();
          }, 2000); 

        }, 400); 
      }
      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden ${isOpening ? 'pointer-events-none' : ''}`}
    >
      <motion.div 
        className="absolute inset-0 bg-bg z-0 will-change-transform"
        style={{ WebkitMaskImage: maskImage, maskImage: maskImage }}
      />
      
      {/* Tunnel Layer (Text removed per request) */}
      <motion.div 
        className="absolute z-[-1] pointer-events-none flex items-center justify-center"
        style={{ left: xPos, top: yPos }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 overflow-visible">
        <div className="font-display text-[clamp(3.5rem,10vw,9rem)] tracking-tight font-black uppercase text-white italic flex items-center justify-center">
           <motion.span 
             animate={{ opacity: isOpening ? 0 : 1, x: isOpening ? -200 : 0, y: isOpening ? -50 : 0 }} 
             transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
             className="inline-block relative z-10"
             style={{ transformOrigin: "center center" }}
           >
             L
           </motion.span>
           <motion.span 
             ref={oRef} 
             className="relative z-20 inline-block px-[1px] text-brand will-change-transform"
             animate={{ opacity: isOpening ? 0 : 1 }}
             transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
             style={{ transformOrigin: "center 55%", scale: oScale }}
           >
             O
           </motion.span>
           <motion.span 
             animate={{ opacity: isOpening ? 0 : 1, x: isOpening ? 200 : 0, y: isOpening ? -50 : 0 }} 
             transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
             className="inline-block relative z-10 text-white"
             style={{ transformOrigin: "center center" }}
           >
             ADING
           </motion.span>
        </div>
        
        <motion.div 
           className="w-64 h-[2px] bg-white/20 relative overflow-hidden will-change-transform"
           animate={{ opacity: isOpening ? 0 : 1, scaleX: isOpening ? 2 : 1, scaleY: isOpening ? 0 : 1, y: isOpening ? 100 : 0 }}
           transition={{ duration: 1.0, ease: [0.8, 0, 0.1, 1] }}
        >
          <motion.div 
             className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand to-accent-1"
             initial={{ width: "0%" }}
             animate={{ width: `${progress}%` }}
             transition={{ ease: "linear", duration: 0.2 }}
          />
        </motion.div>
        
        <motion.div 
           className="font-mono text-xs sm:text-sm tracking-widest text-white/50 text-center px-4 will-change-transform"
           animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 3 : 1, y: isOpening ? 120 : 0 }}
           transition={{ duration: 1.0, ease: [0.8, 0, 0.1, 1] }}
        >
          {progress.toString().padStart(3, '0')}% — INITIALIZING SEQUENCE
        </motion.div>
      </div>
    </motion.div>
  );
}
