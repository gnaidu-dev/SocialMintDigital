import { motion, useScroll, useTransform } from 'motion/react';

export default function GridBackground() {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [60, 40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.5, 2]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-bg" style={{ perspective: "1000px" }}>
      <motion.div
        className="absolute w-[200vw] h-[200vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          rotateX,
          scale,
          z: -100,
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
        animate={{
          y: [0, 100],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 3,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)]" />
    </div>
  );
}
