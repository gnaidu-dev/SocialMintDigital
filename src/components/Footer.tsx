import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import Magnetic from './Magnetic';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  const [result, setResult] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isContactOpen]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "8ee8df1f-9ef9-442a-af08-e0d6ffcf64dd");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.currentTarget.reset();
      setFocusedInput(null);
      setTimeout(() => setResult(""), 5000);
    } else {
      setResult("Error submitting form");
    }
  };

  return (
    <>
      <footer ref={footerRef} className="relative w-full bg-bg overflow-hidden mt-32 pt-24 md:pt-32">
        
        {/* Centered CTA Section */}
        <div className="w-full max-w-4xl mx-auto px-6 md:px-8 flex flex-col items-center text-center relative z-10 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-12 h-1 bg-brand rounded-full mb-4"></div>
            <h2 className="font-display font-light text-[clamp(2.5rem,6vw,80px)] tracking-tight uppercase leading-[1]">
              Let's build <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-brand via-accent-1 to-accent-2 text-transparent bg-clip-text font-bold italic pr-4">the future</span>
            </h2>
            <p className="text-[#AAAAAA] text-sm md:text-base font-light max-w-md leading-relaxed mt-4">
              Ready to scale your digital presence to unprecedented heights? Initialize communication sequence.
            </p>

            <Magnetic>
              <motion.button 
                onClick={() => setIsContactOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-12 relative group overflow-hidden bg-white text-black py-5 px-16 text-sm font-bold tracking-[0.2em] uppercase rounded-full cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(0,255,194,0.3)] transition-all duration-500"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Initiate Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand via-accent-1 to-accent-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1] z-0"></div>
              </motion.button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Footer Info Grid */}
        <div className="w-full relative z-10 grid grid-cols-1 md:grid-cols-3 border-y border-white/10 min-h-[200px] bg-black/40 backdrop-blur-sm">
          
          {/* Location Section */}
          <div className="border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#666666] mb-4 block font-bold">Address</span>
              <span className="text-xl md:text-2xl font-light block">Social Mint Digital</span>
              <span className="text-sm md:text-base font-light block text-[#AAAAAA] mt-2">No.5, Rich Homes, Richmond Road,<br/>Bangalore – 560025</span>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-accent-3 rounded-full animate-pulse"></div>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#AAAAAA]">Online & Active</span>
            </div>
          </div>

          {/* Social Section */}
          <div className="border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-12 flex flex-col justify-start">
            <span className="text-[10px] uppercase tracking-widest text-[#666666] mb-6 block font-bold">Social Media</span>
            <div className="flex flex-col gap-4">
              {['X (Twitter)', 'LinkedIn', 'Instagram', 'Facebook'].map((social) => (
                <a key={social} href="#" className="text-sm text-[#AAAAAA] hover:text-white transition-colors font-light flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-4"></span>
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#666666] mb-6 block font-bold">Direct Line</span>
              <a href="mailto:info@socialmintdigital.com" className="text-base text-[#AAAAAA] hover:text-white transition-colors font-light break-all relative group inline-block">
                info@socialmintdigital.com
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            
            <div className="mt-12 md:mt-0">
               <span className="text-[10px] uppercase tracking-widest text-[#666666] block font-bold">© {new Date().getFullYear()} Social Mint Digital</span>
            </div>
          </div>
        </div>
        
        {/* Massive Background Text */}
        <div className="relative h-48 md:h-64 overflow-hidden flex items-center justify-center mt-12 md:mt-0">
          <motion.h1 style={{ y: textY }} className="text-[clamp(4rem,15vw,250px)] font-display font-black tracking-tighter text-white/[0.04] uppercase whitespace-nowrap pointer-events-none select-none italic text-center w-full pb-8">
            SOCIAL MINT
          </motion.h1>
        </div>
      </footer>

      {/* Otherlife-style Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            {/* Backdrop click to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setIsContactOpen(false)} />
            
            {/* Modal Card */}
            <motion.div 
              className="w-full max-w-xl bg-[#F8F9FA] rounded-[32px] border-[5px] border-[#1A1A1A] p-8 md:p-12 relative shadow-[0_24px_50px_rgba(0,0,0,0.4)] z-10"
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsContactOpen(false)} 
                className="absolute top-6 right-6 text-[#1A1A1A]/60 hover:text-black transition-colors p-2"
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <h2 className="font-sans font-medium text-2xl md:text-3xl text-black mb-8 leading-tight">
                Lets work together.
              </h2>

              <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full">
                <div className="relative text-left">
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="Full name"
                    className="w-full bg-transparent border-b border-black/30 py-3 text-lg md:text-xl font-normal text-black outline-none focus:border-black placeholder-black/55 transition-colors"
                  />
                </div>
                
                <div className="relative text-left">
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-black/30 py-3 text-lg md:text-xl font-normal text-black outline-none focus:border-black placeholder-black/55 transition-colors"
                  />
                </div>

                <div className="relative text-left">
                  <input 
                    type="text" 
                    name="company" 
                    placeholder="Company name or website"
                    className="w-full bg-transparent border-b border-black/30 py-3 text-lg md:text-xl font-normal text-black outline-none focus:border-black placeholder-black/55 transition-colors"
                  />
                </div>

                <div className="relative text-left">
                  <input 
                    type="text" 
                    name="message" 
                    required 
                    placeholder="Tell us your idea - Describe your vision"
                    className="w-full bg-transparent border-b border-black/30 py-3 text-lg md:text-xl font-normal text-black outline-none focus:border-black placeholder-black/55 transition-colors"
                  />
                </div>

                <div className="relative text-left">
                  <input 
                    type="text" 
                    name="referral" 
                    placeholder="How did you hear about us?"
                    className="w-full bg-transparent border-b border-black/30 py-3 text-lg md:text-xl font-normal text-black outline-none focus:border-black placeholder-black/55 transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between mt-8">
                  <Magnetic>
                    <button 
                      type="submit"
                      className="bg-[#1A1A1A] hover:bg-black text-white py-4 px-10 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:shadow-lg"
                    >
                      Submit
                    </button>
                  </Magnetic>

                  <AnimatePresence mode="wait">
                    {result && (
                      <motion.span 
                        key={result}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className={`text-xs font-bold uppercase tracking-widest ${result.includes('Error') ? 'text-red-500' : 'text-emerald-600'}`}
                      >
                        {result}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
