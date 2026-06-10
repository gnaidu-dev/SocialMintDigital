import { motion, useScroll, useVelocity, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

interface MarqueeProps {
  text: string;
  direction?: "left" | "right";
  velocity?: number;
}

export default function Marquee({ text, direction = "left", velocity = 20 }: MarqueeProps) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);

  return (
    <div className="w-full relative overflow-hidden flex whitespace-nowrap bg-gradient-to-r from-accent-2 via-brand to-accent-1 text-bg py-6 mb-24 mt-12 origin-center" style={{ perspective: 1000 }}>
      <motion.div
        className="flex whitespace-nowrap"
        style={{ skewX: skewVelocity }}
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          duration: 100 / velocity,
          ease: "linear",
          repeat: Infinity
        }}
      >
        <span className="font-display text-5xl md:text-[80px] font-black uppercase tracking-tighter mx-4 italic leading-none">
          {text} • {text} • {text} • {text} • {text} • {text} • 
        </span>
        <span className="font-display text-5xl md:text-[80px] font-black uppercase tracking-tighter mx-4 italic leading-none">
          {text} • {text} • {text} • {text} • {text} • {text} • 
        </span>
      </motion.div>
    </div>
  );
}
