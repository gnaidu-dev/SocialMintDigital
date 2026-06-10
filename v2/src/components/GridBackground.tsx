import { motion } from 'motion/react';

export default function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" style={{ perspective: "1000px" }}>
      <motion.div
        className="absolute w-[200vw] h-[200vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        initial={{ rotateX: 60, scale: 1.5, z: -100 }}
        animate={{
          y: [0, 80],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 2,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg" />
    </div>
  );
}
