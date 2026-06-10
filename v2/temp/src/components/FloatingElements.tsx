import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 1000]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-60">
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[20%] left-[10%] w-[30vh] h-[30vh] border-[1px] border-accent-1/20 rounded-full"
      />
      
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[60%] right-[15%] w-[40vh] h-[40vh] border-[1px] border-brand/20"
      />

      <motion.div 
        style={{ y: y3, rotate: rotate1 }}
        className="absolute top-[80%] left-[30%] w-[20vh] h-[20vh] border-[1px] border-accent-3/20 rounded-lg"
      />
      
      <motion.div 
        style={{ y: y1, rotate: rotate2 }}
        className="absolute top-[10%] right-[40%] w-[10vh] h-[10vh] border-[1px] border-accent-2/20"
      />
    </div>
  );
}
