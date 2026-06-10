import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#e6d5f7] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.6)_0%,transparent_100%)]"
    >
      <motion.div 
        className="absolute top-[-10px] right-[-100px] w-[600px] h-[600px] bg-white opacity-[0.5] rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="absolute bottom-[-150px] left-[-50px] w-[500px] h-[500px] bg-[#d9c1f0] opacity-[0.8] rounded-full blur-[140px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Decorative left rail equivalent */}
        <div className="hidden md:flex col-span-1 flex-col justify-end h-full absolute left-8 pb-32">
          <div className="origin-bottom-left -rotate-90 transform translate-x-4 whitespace-nowrap text-[10px] uppercase tracking-[0.4em] text-black/40 font-bold">
            Digital Strategy • Performance Marketing • Design
          </div>
        </div>

        <motion.div style={{ y: y1, opacity, scale }} className="w-full md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-3 flex flex-col justify-center relative mt-20 md:mt-0">
          <div className="overflow-hidden mb-6 relative w-fit">
            <motion.h2 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="text-black/60 font-mono text-sm tracking-[0.3em] uppercase font-bold"
            >
              Excellence in Digital
            </motion.h2>
            <div className="absolute -top-4 -right-24 text-[12px] bg-black text-white px-3 py-1 font-bold rounded-sm rotate-12">
              EST. 2024
            </div>
          </div>
          
          <div className="overflow-visible leading-[0.85] py-2 mb-4 w-full max-w-none">
            <motion.h1 
              initial={{ y: "100%", rotateX: 45, opacity: 0 }}
              animate={{ y: 0, rotateX: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black text-[clamp(4rem,9vw,140px)] tracking-tight uppercase italic text-black pr-4 leading-[0.85] flex flex-wrap"
              style={{ transformPerspective: 1000 }}
            >
              <span className="block mr-3 md:mr-6 lg:mr-8 text-black pb-2">Social Mint</span> 
              <span className="bg-gradient-to-br from-[#FF2D55] via-[#AF52DE] to-[#007AFF] text-transparent bg-clip-text block pb-4 pr-6 shrink-0">Digital</span>
            </motion.h1>
          </div>
          
          <div className="overflow-hidden leading-none pb-4">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-light text-4xl md:text-6xl tracking-tight text-black/60 max-w-xl"
            >
              Creative <span className="text-black font-semibold">Agency</span>
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 w-full max-w-lg"
          >
            <p className="text-black/80 font-sans text-lg md:text-xl font-medium leading-relaxed">
              We design cinematic web experiences, dominate search engines, and architect lead generation pipelines that scale.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating abstract elements for depth */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-12 right-12 text-black/40 font-mono text-xs tracking-widest hidden md:block font-bold"
      >
        [ SCROLL TO EXPLORE ]
      </motion.div>
    </section>
  );
}
