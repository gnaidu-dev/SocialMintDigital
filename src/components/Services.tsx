import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import SEOSearchSimulation from './SEOSearchSimulation';

const SERVICES = [
  {
    id: "01",
    title: "WEBSITE",
    description: "Cinematic, high-performance web experiences engineered for absolute distinction.",
  },
  {
    id: "02",
    title: "SEO",
    description: "Algorithmic dominance through authoritative architecture and precision content strategy.",
  },
  {
    id: "03",
    title: "LEAD GENERATION",
    description: "Architecting high-conversion pipelines that systematically acquire market share.",
  },
  {
    id: "04",
    title: "DIGITAL MARKETING",
    description: "Multi-channel advertising campaigns designed to maximize ROI and scale brand awareness.",
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative w-full py-32 md:py-48 bg-bg min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-8 w-full"><motion.div style={{ y: titleY }} className="mb-24">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#86868B] mb-4 font-bold">Core Competencies</h2>
          <div className="font-display text-[clamp(2.5rem,8vw,90px)] md:text-[clamp(3.5rem,8vw,90px)] font-bold tracking-tight leading-[0.85] pr-4 bg-gradient-to-r from-[#FF2D55] via-[#AF52DE] to-[#007AFF] text-transparent bg-clip-text inline-block pb-4">
            Our Arsenal.
          </div>
        </motion.div>

        <div className="flex flex-col border-t border-white/10 overflow-hidden">
          {SERVICES.map((srv, idx) => (
            <motion.div 
              key={srv.id}
              className="group relative border-b border-white/10 py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              initial={{ opacity: 0, y: 100, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.76, 0, 0.24, 1] }}
              style={{ transformPerspective: 1000 }}
            >
              {/* Animated Background layer */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-brand/10 via-accent-3/5 to-transparent origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-baseline gap-6 md:gap-16 w-full">
                <span className="text-[14px] uppercase tracking-widest text-[#86868B] mb-2 font-bold opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  {srv.id} //
                </span>
                
                <motion.h3 
                  className={`font-display text-[clamp(2rem,6vw,70px)] md:text-[clamp(2.5rem,5vw,70px)] font-bold tracking-tight md:pr-4 ${idx === 0 ? 'bg-gradient-to-r from-[#FF9500] to-[#FF2D55]' : idx === 1 ? 'bg-gradient-to-r from-[#AF52DE] to-[#007AFF]' : 'bg-gradient-to-r from-[#34C759] to-[#007AFF]'} text-transparent bg-clip-text`}
                  initial={{ x: 0 }}
                  whileHover={{ x: 30, skewX: -2 }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                >
                  {srv.title}
                </motion.h3>

                <div className="md:ml-auto max-w-sm ml-0">
                  <motion.p 
                    className="text-[#86868B] text-sm md:text-base leading-relaxed group-hover:text-[#F5F5F7] transition-colors duration-500"
                    initial={{ opacity: 0.5, y: 0 }}
                    whileHover={{ opacity: 1, y: -5 }}
                  >
                    {srv.description}
                  </motion.p>
                </div>
              </div>

              {srv.id === "01" && (
                <div className="flex flex-col gap-12 mt-16 md:mt-24 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-[#F5F5F7] relative z-10 mx-auto max-w-5xl w-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                      className="space-y-6 flex flex-col justify-center pr-8"
                    >
                      <h4 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-[#F5F5F7] mb-2 uppercase tracking-wide bg-gradient-to-r from-[#FF9500] to-[#FF2D55] text-transparent bg-clip-text inline-block">Cinematic Precision</h4>
                      <p className="text-sm md:text-base text-[#86868B] leading-relaxed">
                        We don't just build websites; we architect digital environments. Every surface is polished, every interaction is calibrated. Using rigorous engineering standards and fluid motion logic, we create immersive experiences that demand attention and command authority.
                      </p>
                      <p className="text-sm md:text-base text-[#86868B] leading-relaxed">
                        We view development through the lens of <strong className="text-[#F5F5F7] font-medium">brand legacy</strong>. Slow load times and fragile layouts are unacceptable. Our platforms are built on robust, cutting-edge architectures to ensure absolute stability, unmatched speed, and uncompromising aesthetic execution.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                      className="relative w-full rounded-2xl border border-white/5 shadow-2xl overflow-hidden bg-[#050505] origin-right"
                    >
                      <div className="flex items-center px-4 md:px-6 py-3 border-b border-white/5 bg-[#0a0a0a]">
                        <div className="flex gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ED6A5E]"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#F4BF4F]"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#61C554]"></div>
                        </div>
                        <div className="mx-auto text-[10px] md:text-xs font-mono text-[#86868B] tracking-widest uppercase">
                          Architecture // Desktop View
                        </div>
                        <div className="w-12"></div>
                      </div>
                      <div className="w-full aspect-[16/10] relative overflow-hidden bg-[#000] group">
                         <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/60 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] group-hover:opacity-0 transition-opacity duration-1000" />
                         <motion.div 
                           className="absolute inset-0 w-[120%] h-[120%] left-[-10%] top-[-10%]"
                           whileHover={{ y: "-10%" }}
                           transition={{ duration: 10, ease: "linear" }}
                         >
                           <iframe 
                             src="https://www.srivaishnavicycleworld.com/" 
                             loading="lazy"
                             className="w-full h-full border-none pointer-events-none transform scale-[0.85] origin-top opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                             title="Sri Vaishnavi Cycle World Snapshot"
                           />
                         </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {srv.id === "02" && (
                <div className="flex flex-col gap-12 mt-16 md:mt-24 w-full">
                  <motion.div 
                    className="relative z-10 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl origin-top mx-auto max-w-5xl"
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, height: "auto", scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <SEOSearchSimulation />
                  </motion.div>
                  
                  <div className="grid grid-cols-1 gap-12 text-[#F5F5F7] relative z-10 mx-auto max-w-5xl w-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                      className="space-y-6 flex flex-col justify-center"
                    >
                      <h4 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-[#F5F5F7] mb-2 uppercase tracking-wide bg-gradient-to-r from-[#AF52DE] to-[#007AFF] text-transparent bg-clip-text w-fit inline-block">Algorithm Architecture</h4>
                      <p className="text-sm md:text-base text-[#86868B] leading-relaxed">
                        We engineered the platform's SEO architecture so robustly that <strong className="text-[#F5F5F7] font-medium">Sri Vaishnavi Cycle World</strong> acts as a gravitational pull for local search real estate. Through high-authority domain presence, structured schema markups, and aggressively optimized Core Web Vitals, the brand achieves an impenetrable digital footprint.
                      </p>
                      <p className="text-sm md:text-base text-[#86868B] leading-relaxed border-l-2 border-white/20 pl-4 py-1">
                        The semantic indexing is so dominant that it aggressively captures adjacent permutations and highly competitive lateral queries—even ranking instantaneously for disparate branded searches like <strong className="text-[#F5F5F7] font-medium">"Vaishnavi Honey"</strong>, leveraging overwhelming localized domain authority and precision keyword clustering.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
                    >
                      {[
                        { label: "Local SERP Rank", value: "#1", color: "bg-gradient-to-r from-[#FF3B30] to-[#FF9500]" },
                        { label: "Intent Match", value: "99.8%", color: "bg-gradient-to-r from-[#AF52DE] to-[#FF2D55]" },
                        { label: "Indexing Speed", value: "< 2H", color: "bg-gradient-to-r from-[#34C759] to-[#007AFF]" },
                        { label: "Lateral Query", value: "Dominant", sub: "e.g., 'Vaishnavi Honey'", color: "bg-gradient-to-r from-[#007AFF] to-[#5856D6]" }
                      ].map((stat, i) => (
                        <motion.div 
                           key={i} 
                           whileHover={{ scale: 1.02, y: -5 }}
                           transition={{ type: "spring", stiffness: 400, damping: 25 }}
                           className="w-full h-full min-h-[160px] sm:min-h-[200px] lg:min-h-[240px] bg-[#0f0f0f] border border-white/5 rounded-2xl md:rounded-3xl p-4 sm:p-6 lg:p-6 flex flex-col justify-between items-start group hover:bg-[#151515] hover:border-white/10 transition-colors relative overflow-hidden"
                        >
                           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                           <div className="text-[9px] sm:text-[10px] md:text-xs text-[#86868B] uppercase tracking-widest font-mono relative z-10 w-full">{stat.label}</div>
                           <div className="relative z-10 w-full">
                             <div className={`text-[clamp(1.5rem,4vw,2.5rem)] lg:text-[clamp(1.75rem,2.5vw,3rem)] leading-none font-display font-bold tracking-tight text-transparent bg-clip-text inline-block break-words w-full ${stat.color}`}>
                               {stat.value}
                             </div>
                             {stat.sub && <div className="text-[8px] sm:text-[9px] md:text-[10px] text-[#86868B]/70 mt-1 md:mt-2 font-mono uppercase tracking-widest">{stat.sub}</div>}
                           </div>
                        </motion.div>
                      )              )}
              {srv.id === "04" && (
                <div className="flex flex-col gap-12 mt-16 md:mt-24 w-full">
                  <div className="grid grid-cols-1 gap-8 text-[#F5F5F7] relative z-10 mx-auto max-w-4xl w-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                      className="space-y-6 flex flex-col items-center text-center px-4"
                    >
                      <h4 className="text-2xl md:text-4xl font-display font-medium tracking-tight text-[#F5F5F7] uppercase tracking-wide bg-gradient-to-r from-[#FF9500] to-[#FF2D55] text-transparent bg-clip-text inline-block pb-2">Omnichannel Domination</h4>
                      <p className="text-sm md:text-lg text-[#86868B] leading-relaxed max-w-2xl">
                        We deploy aggressive, data-backed ad campaigns across all major networks. By hyper-targeting your exact demographic and relentlessly optimizing creative assets, we ensure your message converts at the highest possible margin.
                      </p>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
                  </div>
                </div>
              )}
              {srv.id === "03" && (
                <div className="flex flex-col gap-12 mt-16 md:mt-24 w-full">
                  <div className="grid grid-cols-1 gap-8 text-[#F5F5F7] relative z-10 mx-auto max-w-4xl w-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                      className="space-y-6 flex flex-col items-center text-center px-4"
                    >
                      <h4 className="text-2xl md:text-4xl font-display font-medium tracking-tight text-[#F5F5F7] uppercase tracking-wide bg-gradient-to-r from-[#34C759] to-[#007AFF] text-transparent bg-clip-text inline-block pb-2">Performance-Driven Acquisition</h4>
                      <p className="text-sm md:text-lg text-[#86868B] leading-relaxed max-w-2xl">
                        Lead generation treated as a precise science. We construct high-velocity conversion funnels that systematically capture market demand. By aligning behavioral psychology with frictionless UX, we turn passive traffic into qualified pipelines that scale predictably.
                      </p>
                      
                    </motion.div>
                  </div>
                </div>              )}
              {srv.id === "04" && (
                <div className="flex flex-col gap-12 mt-16 md:mt-24 w-full">
                  <div className="grid grid-cols-1 gap-8 text-[#F5F5F7] relative z-10 mx-auto max-w-4xl w-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                      className="space-y-6 flex flex-col items-center text-center px-4"
                    >
                      <h4 className="text-2xl md:text-4xl font-display font-medium tracking-tight text-[#F5F5F7] uppercase tracking-wide bg-gradient-to-r from-[#FF9500] to-[#FF2D55] text-transparent bg-clip-text inline-block pb-2">Omnichannel Domination</h4>
                      <p className="text-sm md:text-lg text-[#86868B] leading-relaxed max-w-2xl">
                        We deploy aggressive, data-backed ad campaigns across all major networks. By hyper-targeting your exact demographic and relentlessly optimizing creative assets, we ensure your message converts at the highest possible margin.
                      </p>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        
        
        {/* Website Showcase with Elegant Motion Spotlight */}
        <motion.div style={{ y: titleY }} className="mb-16 mt-8">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#86868B] mb-4 font-bold">Featured Case Study</h2>
          <div className="font-display text-[clamp(2.5rem,8vw,90px)] md:text-[clamp(3.5rem,8vw,90px)] font-bold tracking-tight leading-[0.85] pr-4 bg-gradient-to-r from-[#FF9500] to-[#FF2D55] text-transparent bg-clip-text inline-block pb-4">
            What We Built.
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
           className="relative mb-32 md:mb-48 z-10 mx-auto w-full"
        >
          {/* Elegant Ambient Spotlight */}
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-brand/20 blur-[100px] pointer-events-none rounded-[100%]"
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              scale: [0.9, 1.05, 0.9]
            }}
            transition={{
              duration: 8, repeat: Infinity, ease: "easeInOut" 
            }}
          />
          
          {/* Core Content Container */}
          <div className="relative z-10 w-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black shadow-[0_0_100px_rgba(16,185,129,0.15)] border border-white/10 ring-1 ring-white/5 mx-auto max-w-6xl">
            <div className="flex items-center px-4 md:px-6 py-3 md:py-4 border-b border-white/10 bg-[#0a0a0a]">
              <div className="flex gap-2 relative z-10">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mx-auto text-[10px] md:text-xs font-mono text-white/50 tracking-widest uppercase">
                What We Built // srivaishnavicycleworld.com
              </div>
              <div className="w-12"></div> {/* Spacer for centering */}
            </div>

            <div className="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] relative bg-black overflow-hidden group">
               <div className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-700 bg-black/10 group-hover:bg-transparent" />
               <iframe 
                 src="https://www.srivaishnavicycleworld.com/" 
                 className="absolute inset-0 w-full h-full border-none transition-transform duration-1000 ease-[0.76,0,0.24,1] scale-[1.01] group-hover:scale-100"
                 title="Sri Vaishnavi Cycle World"
               />
            </div>
          </div>
        </motion.div>

        
      </div>
      </div>

      {/* Floating abstract visual based on hover */}
      <motion.div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] bg-gradient-to-tr from-accent-2 to-brand pointer-events-none mix-blend-screen z-[-1]"
        animate={{
          opacity: hoveredIdx !== null ? 0.15 : 0,
          scale: hoveredIdx !== null ? 1 : 0.8,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </section>
  );
}


