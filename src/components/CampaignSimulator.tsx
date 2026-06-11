import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useState, useEffect } from 'react';
import { Target, TrendingUp, Users, Zap } from 'lucide-react';

export default function CampaignSimulator() {
  const [activeTab, setActiveTab] = useState('meta');
  const adSpend = useMotionValue(1000);
  const [spendValue, setSpendValue] = useState(1000);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [7, -7]);
  const rotateY = useTransform(mouseX, [-400, 400], [-7, 7]);
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!hasHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    if (!hasHover) return;
    animate(mouseX, 0, { type: "spring", stiffness: 200, damping: 20 });
    animate(mouseY, 0, { type: "spring", stiffness: 200, damping: 20 });
  }

  // Derived metrics based on spend
  const reach = useTransform(adSpend, value => Math.round(value * 8.5).toLocaleString());
  const conversions = useTransform(adSpend, value => Math.round(value * 0.12).toLocaleString());
  const roas = useTransform(adSpend, value => (Math.max(2.5, 8.4 - (value / 5000))).toFixed(1) + 'x');
  const revenue = useTransform(adSpend, value => {
    const multiplier = Math.max(2.5, 8.4 - (value / 5000));
    return '$' + Math.round(value * multiplier).toLocaleString();
  });

  useEffect(() => {
    const controls = animate(adSpend, spendValue, { type: "spring", bounce: 0, duration: 0.8 });
    return controls.stop;
  }, [spendValue, adSpend]);

  const tabs = [
    { id: 'meta', name: 'Meta Ads', color: 'from-[#0668E1] to-[#00A1FF]' },
    { id: 'google', name: 'Google Ads', color: 'from-[#EA4335] to-[#4285F4]' },
    { id: 'tiktok', name: 'TikTok', color: 'from-[#00F2FE] to-[#FE0979]' },
    { id: 'linkedin', name: 'LinkedIn', color: 'from-[#0077B5] to-[#00A0DC]' },
  ];

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="w-full bg-black rounded-2xl border border-white/10 p-6 md:p-8 font-sans relative overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(168,85,247,0.08)]"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg bg-gradient-to-b from-[#FF2D55]/10 to-transparent blur-[80px] pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        {/* Left Col: Interactive Simulator */}
        <div className="flex-1 space-y-8">
          <div>
            <h3 className="text-[#86868B] text-xs font-mono uppercase tracking-widest mb-1">Live Engine</h3>
            <div className="text-2xl font-display font-medium text-[#F5F5F7]">Campaign Simulator</div>
          </div>

          <div className="space-y-4 bg-[#0a0a0a] border border-white/5 p-5 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#86868B]">Monthly Budget</span>
              <span className="text-sm text-[#F5F5F7] font-mono">${spendValue.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="25000" 
              step="500"
              value={spendValue}
              onChange={(e) => setSpendValue(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF2D55]"
            />
            <div className="flex justify-between text-[10px] text-[#86868B] font-mono mt-1">
              <span>$1k</span>
              <span>$25k</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <motion.div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-xl flex flex-col justify-center">
                <Target className="w-4 h-4 text-[#FF9500] mb-2" />
                <span className="text-[10px] text-[#86868B] uppercase tracking-wider mb-1">Est. Reach</span>
                <motion.span className="text-xl font-display text-white">{reach}</motion.span>
             </motion.div>
             <motion.div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-xl flex flex-col justify-center">
                <Zap className="w-4 h-4 text-[#AF52DE] mb-2" />
                <span className="text-[10px] text-[#86868B] uppercase tracking-wider mb-1">Conversions</span>
                <motion.span className="text-xl font-display text-white">{conversions}</motion.span>
             </motion.div>
             <motion.div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-xl flex flex-col justify-center">
                <Users className="w-4 h-4 text-[#34C759] mb-2" />
                <span className="text-[10px] text-[#86868B] uppercase tracking-wider mb-1">Projected ROAS</span>
                <motion.span className="text-xl font-display text-white">{roas}</motion.span>
             </motion.div>
             <motion.div className="bg-gradient-to-br from-[#FF2D55]/10 to-[#FF9500]/5 border border-[#FF2D55]/20 p-4 rounded-xl flex flex-col justify-center">
                <TrendingUp className="w-4 h-4 text-[#FF2D55] mb-2" />
                <span className="text-[10px] text-[#86868B] uppercase tracking-wider mb-1">Est. Revenue</span>
                <motion.span className="text-xl font-display text-transparent bg-clip-text bg-gradient-to-r from-[#FF9500] to-[#FF2D55] font-bold">{revenue}</motion.span>
             </motion.div>
          </div>
        </div>

        {/* Right Col: Omnichannel Grid */}
        <div className="flex-1 flex flex-col">
           <h3 className="text-[#86868B] text-xs font-mono uppercase tracking-widest mb-4">Omnichannel Network</h3>
           <div className="flex flex-col gap-3 flex-1">
             {tabs.map((tab) => (
               <div 
                 key={tab.id}
                 onMouseEnter={() => setActiveTab(tab.id)}
                 className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between overflow-hidden ${
                   activeTab === tab.id ? 'border-white/20 bg-white/5' : 'border-white/5 bg-[#0a0a0a] hover:bg-white/[0.02]'
                 }`}
               >
                 {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className={`absolute inset-0 opacity-10 bg-gradient-to-r ${tab.color}`}
                    />
                 )}
                 <span className="relative z-10 text-sm font-medium text-[#F5F5F7]">{tab.name}</span>
                 <div className="relative z-10 flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 </div>
               </div>
             ))}
             
             {/* Dynamic insight based on tab */}
             <div className="mt-auto pt-4 border-t border-white/10">
               <motion.p 
                 key={activeTab}
                 initial={{ opacity: 0, y: 5 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-xs text-[#86868B] leading-relaxed"
               >
                 {activeTab === 'meta' && "Advanced lookalike modeling leveraging behavioral data across Instagram and Facebook. Optimal for direct-response e-commerce and lead gen."}
                 {activeTab === 'google' && "Capturing high-intent search traffic globally. Structuring performance max campaigns to dominate top-of-page real estate."}
                 {activeTab === 'tiktok' && "Exploiting short-form algorithmic virality to generate high-velocity conversions at an aggressively low CPA."}
                 {activeTab === 'linkedin' && "Precision ABM (Account-Based Marketing) targeting decision-makers. Essential for high-ticket B2B pipelines and authority building."}
               </motion.p>
             </div>
           </div>
        </div>
       </div>
    </motion.div>
  );
}