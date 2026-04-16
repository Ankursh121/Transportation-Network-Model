import React from 'react';
import { MessageCircle, Heart, X } from 'lucide-react';

const InstagramIcon = ({ size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Footer = ({ isVisible, onClose }) => {
  return (
    <div 
      className={`fixed bottom-0 left-0 w-full z-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}
    >
      {/* Footer Content Card */}
      <div className="relative mx-4 mb-4 p-8 glass-card border border-white/10 rounded-3xl overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 glass-hover rounded-full text-white/40 hover:text-white transition-all pointer-events-auto"
          >
            <X size={20} />
          </button>

          {/* Left Section: Credits with Modern Typography */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-brand-cyan glow-shadow" />
              <span className="text-[10px] uppercase font-black tracking-[0.5em] text-cyan-400">Project Developers</span>
            </div>
            
            <div className="flex flex-wrap gap-12">
              {/* Developer 1 */}
              <div className="group relative">
                <div className="flex flex-col">
                  <span className="text-white text-xl font-black tracking-tight group-hover:text-emerald-400 transition-colors">Ankur Shakya</span>
                  <span className="text-[10px] text-white/30 font-black tracking-[0.2em] uppercase">Student ID: 1000024065</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <a href="https://www.instagram.com/ankur_shakya._/?__pwa=1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] text-white/40 hover:text-emerald-400 transition-colors uppercase font-black tracking-widest">
                    <InstagramIcon size={14} /> Instagram
                  </a>
                  <div className="w-1 h-1 rounded-full bg-white/10" />
                  <a href="https://wa.me/919235787767" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] text-white/40 hover:text-emerald-400 transition-colors uppercase font-black tracking-widest">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Developer 2 */}
              <div className="group relative">
                <div className="flex flex-col">
                  <span className="text-white text-xl font-black tracking-tight group-hover:text-brand-purple transition-colors">Anirudh Garg</span>
                  <span className="text-[10px] text-white/30 font-black tracking-[0.2em] uppercase">Student ID: 1000024114</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <a href="https://www.instagram.com/anirudhgargg/?__pwa=1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] text-white/40 hover:text-brand-purple transition-colors uppercase font-black tracking-widest">
                    <InstagramIcon size={14} /> Instagram
                  </a>
                  <div className="w-1 h-1 rounded-full bg-white/10" />
                  <a href="https://wa.me/918607189849" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] text-white/40 hover:text-brand-purple transition-colors uppercase font-black tracking-widest">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Project Submission Info */}
          <div className="flex flex-col items-center md:items-end gap-1 text-right mt-4 md:mt-0">
             <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.3em] text-white/50">
               Submitted To
             </div>
             <div className="text-[14px] font-black tracking-widest text-[#00d2ff] glow-text uppercase mb-2">
               Ningombam Anandshree Singh Sir
             </div>
             <div className="px-4 py-1.5 glass-light rounded-full border border-white/5 flex items-center gap-2 mt-1">
                <Heart size={10} className="text-brand-purple fill-brand-purple animate-pulse" />
                <span className="text-[8px] text-white/60 font-black uppercase tracking-widest">TransitNet 3D Simulator v2.0</span>
             </div>
             <p className="text-[8px] text-white/20 font-bold uppercase tracking-widest mt-2">© 2026 Advanced Network Modeling</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;
