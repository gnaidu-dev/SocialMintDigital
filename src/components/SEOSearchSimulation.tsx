import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Search, MapPin, Star, Phone } from 'lucide-react';

export default function SEOSearchSimulation() {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const targetText = "vaishnavi cycle world";

  useEffect(() => {
    // Sequence
    // Step 0: Blank search page
    // Step 1: Typing
    // Step 2: Loading / Search Results
    // Step 3: Clicking on result
    
    let isMounted = true;
    
    const sequence = async () => {
      // Small pause before typing
      await new Promise(r => setTimeout(r, 1000));
      if (!isMounted) return;
      
      setStep(1);
      
      // Type text
      for (let i = 0; i <= targetText.length; i++) {
        setTypedText(targetText.slice(0, i));
        await new Promise(r => setTimeout(r, 50 + Math.random() * 50));
      }
      
      await new Promise(r => setTimeout(r, 500));
      if (!isMounted) return;
      
      // Submit search
      setStep(2);
      
      await new Promise(r => setTimeout(r, 4000));
      if (!isMounted) return;
      
      // Hover over first result
      setStep(3);
      
      await new Promise(r => setTimeout(r, 1500));
      if (!isMounted) return;
      
      // Click and show website (loop back after some time?)
      setStep(4);
      
      await new Promise(r => setTimeout(r, 5000));
      if (!isMounted) return;
      
      // Reset
      setStep(0);
      setTypedText("");
    };

    if (step === 0) {
      sequence();
    }
    
    return () => { isMounted = false; };
  }, [step, targetText]);

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden bg-white text-black font-sans shadow-2xl relative border border-white/10 flex flex-col">
      {/* Browser UI header */}
      <div className="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-4 gap-2">
        <div className="flex gap-1.5 mr-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-white rounded-md h-6 border border-gray-200 px-3 flex items-center text-[10px] text-gray-500 font-mono overflow-hidden">
          {step < 2 ? 'https://www.google.com' : step === 4 ? 'https://www.srivaishnavicycleworld.com' : `https://www.google.com/search?q=${targetText.replace(/ /g, '+')}`}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          {step < 2 && (
            <motion.div 
              key="search-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8"
            >
              <div className="text-4xl sm:text-5xl font-medium text-gray-800 mb-8 tracking-tighter">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
              </div>
              <div className="w-full max-w-lg bg-white rounded-full border hover:shadow-md transition-shadow px-4 py-3 flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-400" />
                <div className="flex-1 text-sm text-gray-800 relative">
                  {typedText}
                  <motion.span 
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-[1px] h-4 bg-black ml-0.5 align-middle"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {(step >= 2 && step < 4) && (
            <motion.div 
              key="search-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col p-4 sm:p-6 overflow-hidden bg-white"
            >
              <div className="w-full max-w-3xl flex items-center gap-4 mb-6 border-b pb-4">
                <div className="text-2xl font-medium tracking-tighter">
                  <span className="text-blue-500">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-500">g</span>
                  <span className="text-green-500">l</span>
                  <span className="text-red-500">e</span>
                </div>
                <div className="flex-1 max-w-xl bg-white rounded-full border shadow-sm px-4 py-2 flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <div className="flex-1 text-xs sm:text-sm text-gray-800">{targetText}</div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mb-6">About 1,230,000 results (0.34 seconds) </div>

              {/* Result 1 (Target) */}
              <motion.div 
                className={`max-w-2xl mb-8 p-3 -ml-3 rounded-lg cursor-pointer ${step === 3 ? 'bg-gray-100' : ''}`}
                animate={step === 3 ? { backgroundColor: '#f3f4f6' } : { backgroundColor: '#ffffff' }}
              >
                <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center font-bold text-[10px]">SC</div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 leading-tight">Sri Vaishnavi Cycle World</span>
                    <span className="text-gray-500 text-[10px] sm:text-xs">https://www.srivaishnavicycleworld.com</span>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl text-[#1a0dab] group-hover:underline font-medium mt-1 leading-snug">
                  Sri Vaishnavi Cycle World - Premium Bicycles
                </h3>
                <p className="text-[#4d5156] text-xs sm:text-sm mt-1 line-clamp-2">
                  Find the perfect bicycle for your needs. We offer a wide range of premium cycles, accessories, and professional repair services. 
                </p>
                
                {/* Simulated Sitelinks */}
                <div className="mt-3 grid grid-cols-2 gap-2 w-full max-w-md">
                   <div>
                     <div className="text-[#1a0dab] text-xs hover:underline cursor-pointer">Bicycles Collection</div>
                     <div className="text-[#4d5156] text-[10px]">Explore our hybrid, mountain, and road cycles.</div>
                   </div>
                   <div>
                     <div className="text-[#1a0dab] text-xs hover:underline cursor-pointer">Repair & Services</div>
                     <div className="text-[#4d5156] text-[10px]">Expert mechanical tune-ups and servicing.</div>
                   </div>
                </div>
              </motion.div>

              {/* Generic Competitor Result */}
              <div className="max-w-2xl mb-8 pl-3 border-l-2 border-transparent">
                <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center font-bold text-[10px]">JS</div>
                  <div className="flex flex-col">
                    <span className="text-gray-900 leading-tight">Justdial</span>
                    <span className="text-gray-500 text-[10px] sm:text-xs">https://www.justdial.com</span>
                  </div>
                </div>
                <h3 className="text-lg text-[#1a0dab] font-medium leading-snug">
                  Top 10 Bicycle Dealers in the Area - Justdial
                </h3>
                <p className="text-[#4d5156] text-xs sm:text-sm mt-1">
                  Find the best bicycle stores near you. Compare prices, check reviews and ratings...
                </p>
              </div>

               {/* Simulated Google Maps Pack */}
              <div className="max-w-xl border rounded-lg p-4 mb-8 bg-white">
                 <div className="text-sm font-medium mb-3 border-b pb-2">Businesses</div>
                 <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
                    <div className="flex-1">
                       <h4 className="text-sm font-medium">Sri Vaishnavi Cycle World</h4>
                       <div className="flex items-center text-xs text-gray-600 gap-1 mt-1">
                         <span className="font-medium">5.0</span>
                         <span className="text-yellow-400 flex"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></span>
                         <span>(124) · Bicycle store</span>
                       </div>
                       <div className="text-xs text-gray-500 mt-1">Open ⋅ Closes 9 PM</div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="website"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-black"
            >
              {/* Replace with the actual iframe to prove it's the site */}
              <iframe 
                 src="https://www.srivaishnavicycleworld.com/" 
                 className="w-full h-full border-none"
                 title="Target Site"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fake Cursor Animation */}
        <motion.div 
          className="absolute z-50 pointer-events-none"
          initial={{ top: "80%", left: "50%" }}
          animate={
            step === 0 ? { top: "80%", left: "50%", opacity: 0 } :
            step === 1 ? { top: "60%", left: "50%", opacity: 1 } : // Typing
            step === 2 ? { top: "30%", left: "40%", opacity: 1, scale: 1 } : // Viewing results
            step === 3 ? { top: "25%", left: "30%", opacity: 1, scale: 0.95 } : // Hover result
            step === 4 ? { top: "25%", left: "30%", opacity: 0, scale: 0.9 } : // Click
            { opacity: 0 }
          }
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 20.5L9.5 15.5H16.5L4.5 3.5V20.5Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
