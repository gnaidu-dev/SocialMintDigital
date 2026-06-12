import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import Magnetic from './Magnetic';
import RootBleed from './RootBleed';

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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2
      }
    }
  };

  const charAnim = {
    hidden: { y: "100%", rotateX: 60, scale: 0.8, opacity: 0 },
    visible: {
      y: 0,
      rotateX: 0,
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 180, damping: 15 }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#e6d5f7] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.6)_0%,transparent_100%)]"
    >
      <RootBleed />
      {/* Dynamic drifting blobs - GenZ liquid motion */}
      <motion.div 
        className="absolute top-[-10%] right-[-10%] w-[65vw] h-[65vw] max-w-[800px] bg-white opacity-[0.55] rounded-full blur-[100px] pointer-events-none"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-[-20%] left-[-10%] w-[55vw] h-[55vw] max-w-[700px] bg-[#d9c1f0] opacity-[0.85] rounded-full blur-[120px] pointer-events-none"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -40, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 22,
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
          <div className="overflow-hidden mb-5 relative w-fit h-6">
            <div className="absolute top-0 left-0 text-[10px] bg-black text-white px-3 py-0.5 font-bold rounded-sm rotate-12 select-none">
              EST. 2024
            </div>
          </div>
          
          <div className="overflow-hidden leading-[0.85] py-2 mb-3 w-full max-w-none">
            <motion.h1 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="font-display font-black text-5xl sm:text-6xl md:text-8xl lg:text-[110px] xl:text-[140px] tracking-tight uppercase italic text-black pr-4 leading-[0.85] flex flex-wrap"
              style={{ 
                transformPerspective: 1000,
                filter: 'drop-shadow(0 4px 30px rgba(128, 0, 255, 0.35)) drop-shadow(0 0 10px rgba(255, 42, 133, 0.25))'
              }}
            >
              {"Social Mint Digital".split(" ").map((word, wIdx) => (
                <span key={wIdx} className="flex mr-4 md:mr-6 lg:mr-8 pb-2">
                  {word.split("").map((c, i) => (
                    <motion.span key={i} variants={charAnim} className="inline-block origin-bottom shrink-0">
                      {c}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>
          
          <div className="overflow-hidden leading-none pb-4">
            <motion.h1 
              initial={{ y: "100%", scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.5, type: "spring", bounce: 0.4 }}
              className="font-display font-light text-4xl sm:text-5xl md:text-6xl tracking-tight text-black/60 max-w-xl"
            >
              Creative <span className="text-black font-semibold">Agency</span>
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 w-full max-w-lg"
          >
            <p className="text-black/80 font-sans text-lg md:text-xl font-medium leading-relaxed">
              We design cinematic web experiences, dominate search engines, and architect lead generation pipelines that scale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
            className="w-fit"
          >
            <Magnetic>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative mt-8 group flex items-center gap-3 overflow-hidden rounded-full border border-black/10 bg-black px-7 py-3.5 text-xs font-bold tracking-widest text-white transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] cursor-pointer"
              >
                <span>LAUNCH PROJECT</span>
                <svg 
                  className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating abstract elements for depth */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-12 right-12 text-black/40 font-mono text-[10px] tracking-[0.3em] hidden md:block font-bold"
      >
        [ SCROLL TO EXPLORE ]
      </motion.div>
    </section>
  );
}

