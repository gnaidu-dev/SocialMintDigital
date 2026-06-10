import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  return (
    <footer ref={footerRef} className="relative w-full bg-bg overflow-hidden mt-32">
      <div className="w-full relative z-10 grid grid-cols-1 md:grid-cols-4 border-y border-white/10 min-h-[200px]">
        
        {/* Main CTA Section - cols 1 and 2 */}
        <div className="md:col-span-2 border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-12 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <h2 className="font-display font-light text-[clamp(2.5rem,5vw,60px)] tracking-tight uppercase leading-[1.1] z-10 w-full pr-4">
              Let's build <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-brand to-accent-1 text-transparent bg-clip-text font-bold italic inline-block pb-2 pr-4">the future</span>
            </h2>
            <p className="text-[#AAAAAA] text-sm md:text-base font-light max-w-sm leading-relaxed z-10">
              Ready to scale your digital presence to unprecedented heights? Initialize communication sequence.
            </p>
          </div>
        </div>

        {/* Location Section */}
        <div className="border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#666666] mb-4 block font-bold">Location</span>
            <span className="text-xl md:text-2xl font-light">Global Ops</span>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-accent-3 rounded-full animate-pulse"></div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#AAAAAA]">Online</span>
          </div>
        </div>

        {/* Social & Button Section */}
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-widest text-[#666666] mb-2 block font-bold">Social</span>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-[#AAAAAA] hover:text-brand transition-colors font-light">X (Twitter)</a>
              <a href="#" className="text-sm text-[#AAAAAA] hover:text-brand transition-colors font-light">LinkedIn</a>
              <a href="#" className="text-sm text-[#AAAAAA] hover:text-brand transition-colors font-light">Instagram</a>
            </div>
          </div>
          
          <motion.a 
            href="mailto:hello@socialmint.digital"
            className="mt-8 bg-gradient-to-r from-accent-1 to-accent-3 text-white px-6 py-4 text-[12px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity duration-300 w-full text-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Initiate Contact
          </motion.a>
        </div>
      </div>
      
      {/* Massive Background Text */}
      <div className="relative h-48 md:h-64 overflow-hidden flex items-center justify-center mt-12 md:mt-0">
        <motion.h1 style={{ y: textY }} className="text-[clamp(4rem,15vw,250px)] font-display font-black tracking-tighter text-white/[0.04] uppercase whitespace-nowrap pointer-events-none select-none italic text-center w-full pb-8">
          SOCIAL MINT
        </motion.h1>
      </div>
    </footer>
  );
}
