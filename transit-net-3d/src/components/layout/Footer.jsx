const Footer = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <footer className="fixed bottom-0 left-0 w-full py-12 px-6 bg-[#010101]/95 backdrop-blur-3xl border-t border-brand-cyan/20 z-[100] overflow-hidden">
      {/* Close Button / Down Arrow */}
      <button 
        onClick={onClose}
        className="absolute top-4 left-1/2 -translate-x-1/2 p-2 glass-hover rounded-full transition-all group"
      >
        <ArrowDown size={24} className="text-white/40 group-hover:text-brand-cyan transition-colors" />
      </button>

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 pt-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-brand-cyan text-[10px] uppercase font-black tracking-[0.4em] glow-text">Developed By</h3>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            <div className="flex flex-col items-center group">
              <span className="text-white font-bold text-lg group-hover:text-brand-cyan transition-colors">Ankur Shakya</span>
              <span className="text-white/30 text-[10px] font-black tracking-widest uppercase">ID: 1000024065</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10 hidden md:block" />
            <div className="flex flex-col items-center group">
              <span className="text-white font-bold text-lg group-hover:text-brand-purple transition-colors">Anirudh Garg</span>
              <span className="text-white/30 text-[10px] font-black tracking-widest uppercase">ID: 1000024114</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <a 
            href="https://github.com/Ankursh121" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 glass-hover px-8 py-3 rounded-full border border-white/10 transition-all duration-300 group hover:border-brand-cyan/50 hover:bg-brand-cyan/5"
          >
            <Github size={20} className="text-white group-hover:text-brand-cyan transition-colors" />
            <span className="text-[12px] text-white/60 uppercase font-black group-hover:text-white transition-colors tracking-widest">Ankursh121 / GitHub</span>
          </a>
        </div>

        <div className="flex flex-col items-center gap-1 opacity-60">
           <div className="flex items-center gap-2 text-[9px] uppercase font-black tracking-[0.4em] text-white/50">
             Made with <Heart size={10} className="text-brand-purple fill-brand-purple shadow-[0_0_10px_rgba(146,84,222,0.5)]" /> for TransitNet 3D
           </div>
           <span className="text-[8px] text-white/10 font-bold uppercase tracking-widest">© 2026 Advanced Transportation Systems</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

