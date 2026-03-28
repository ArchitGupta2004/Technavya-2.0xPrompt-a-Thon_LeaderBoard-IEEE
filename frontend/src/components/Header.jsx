const Header = () => {
  return (
    <header className="w-full bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 py-5 px-6">
      <div className="flex items-center justify-between">
        {/* Technavya × Prompt-a-Thon Logo - Left Top Corner */}
        <div className="flex items-center gap-0">
          <a href="https://www.technavya.org/" target="_blank" rel="noopener noreferrer">
            <img
              src="/image/TechNavya-2.0.webp"
              alt="Techनव 2.0"
              className="h-20 md:h-28 animate-glow cursor-pointer hover:opacity-80 transition-opacity"
            />
          </a>
          <span className="text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent px-1 -mt-5">×</span>
          <img
            src="/image/Prompt-a-Thon.png"
            alt="Prompt-A-Thon"
            className="h-8 md:h-10 animate-glow -mt-5"
          />
        </div>

        {/* Right Side Logos (IEEE + GLA) */}
        <div className="flex items-center gap-4">
          {/* IEEE Logo */}
          <a href="https://www.instagram.com/ieee.studentbranch.glau/" target="_blank" rel="noopener noreferrer">
            <img
            src="/image/IEEE.png"
            alt="IEEE"
            className="h-20 md:h-28"
            />
          </a>

          {/* GLA Logo */}
          <a href="https://www.gla.ac.in/" target="_blank" rel="noopener noreferrer">
            <img
              src="/image/gla.webp"
              alt="GLA University"
              className="h-20 md:h-28"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;