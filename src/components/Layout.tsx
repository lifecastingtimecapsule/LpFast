import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, MessageCircle, Phone, Instagram, MapPin } from "./Icons";
import { Calendar, ArrowRight, ArrowUp } from "lucide-react";
import logoImage from "figma:asset/a5fc00399012eeaf62209d6c1238a54dcc136bcf.png";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll detection for header style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Plan & Gallery", path: "/plan-gallery" },
    { name: "School", path: "/school" },       
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col relative overflow-x-hidden selection:bg-[#C4A962] selection:text-white">
      <style>{`
  /* Google Fontsから3種類のフォントを読み込み */
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Noto+Serif+JP:wght@200;300;400;500&family=Noto+Sans+JP:wght@300;400;500&display=swap');
  
  :root {
    /* 英語見出し用: 繊細でエレガント */
    --font-en-serif: 'Cormorant Garamond', serif;
    /* 日本語見出し用: 知的 */
    --font-jp-serif: 'Noto Serif JP', serif;
    /* 本文用: 清潔感 */
    --font-body: 'Noto Sans JP', sans-serif;
  }

  /* 基本の文字設定 */
  body {
    font-family: var(--font-body);
    color: #4A4A4A;      /* 真っ黒ではなくダークグレーで上品に */
    letter-spacing: 0.05em; /* 本文も少しだけ文字間を広げる */
  }

  /* * クラス定義のアップデート 
   * 英語と日本語でフォントを使い分けるためのクラスを作ります
   */
  
  /* 英語のメインタイトル用 (例: amorétto, Gallery) */
  .font-en-serif {
    font-family: var(--font-en-serif);
  }

  /* 日本語のキャッチコピー用 (例: 愛おしい瞬間を、永遠に。) */
  .font-jp-serif {
    font-family: var(--font-jp-serif);
  }
`}</style>
      
      {/* Noise Overlay */}
      <div className="bg-noise"></div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
          scrolled 
            ? "bg-[#FAFAF8]/80 backdrop-blur-md border-[#E5E0D8]/60 py-3 md:py-4 shadow-sm" 
            : "bg-transparent border-transparent py-5 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" onClick={handleNavClick} className="relative z-[101]">
            <img
              src={logoImage}
              alt="amoretto"
              className={`transition-all duration-300 ${scrolled ? "h-7 md:h-9" : "h-8 md:h-10"}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-[0.95rem] tracking-wide font-medium">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  to={link.path.startsWith("/#") ? "/" : link.path}
                  onClick={(e) => {
                    if (link.path.startsWith("/#")) {
                      e.preventDefault();
                      const element = document.getElementById(link.path.replace("/#", ""));
                      if(element) element.scrollIntoView({ behavior: 'smooth' });
                      else window.location.href = link.path;
                    } else if (link.path.includes("#")) {
                      // Handle /about#faq etc
                    }
                  }}
                  className="text-[#666666] group-hover:text-[#C4A962] transition-colors py-2"
                >
                  {link.name}
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C4A962] transition-all duration-300 group-hover:w-full"></span>
              </div>
            ))}
            
            <a
              href="https://lifecastingtimecapsule.com/reservation"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden px-8 py-3 bg-[#C4A962] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#C4A962]/20"
            >
              <span className="relative z-10 flex items-center gap-2 tracking-wider text-sm">
                予約する <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-[101] p-2 text-[#2C2C2C] hover:bg-black/5 rounded-full transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[#FAFAF8]/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center"
          >
             <nav className="flex flex-col items-center gap-8 p-6 w-full max-w-sm">
               {navLinks.map((link, i) => (
                 <motion.div
                   key={link.name}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 + i * 0.1 }}
                   className="w-full text-center"
                 >
                   <Link 
                    to={link.path.startsWith("/#") ? "/" : link.path}
                    onClick={(e) => {
                      handleNavClick();
                      if (link.path.startsWith("/#")) {
                        setTimeout(() => {
                           const element = document.getElementById(link.path.replace("/#", ""));
                           if(element) element.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                      }
                    }}
                    className="font-serif text-2xl text-[#2C2C2C] hover:text-[#C4A962] transition-colors block py-2"
                   >
                     {link.name}
                   </Link>
                 </motion.div>
               ))}
               
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="mt-8 w-full"
               >
                 <a
                    href="https://lifecastingtimecapsule.com/reservation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block py-4 bg-[#C4A962] text-white text-center text-lg tracking-widest shadow-lg shadow-[#C4A962]/20"
                 >
                    予約する
                 </a>
               </motion.div>
             </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Page Transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex-grow pt-[80px] md:pt-[100px]"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative py-10 md:py-16 px-6 bg-[#F5F3EF] text-[#2C2C2C] overflow-hidden">
        {/* Footer Design Accents */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C4A962]/50 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex flex-col items-center"
          >
            <div className="mb-6">
              <img 
                src={logoImage} 
                alt="amorétto" 
                className="h-8 md:h-10 w-auto opacity-90 mix-blend-multiply" 
              />
            </div>
            
            <p className="text-[0.65rem] md:text-xs tracking-[0.3em] uppercase text-[#999999] mb-6">
              LifeCasting™ Studio 
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 mb-8 text-xs text-[#666666]">
              <div className="flex items-center gap-2">
                 <MapPin size={14} className="text-[#C4A962]" />
                 <span>愛知県豊川市門前町１５</span>
              </div>
              <div className="flex items-center gap-2">
                 <span className="px-2 py-0.5 border border-[#666666]/30 text-[10px] rounded-full">完全予約制</span>
                 <span>豊川稲荷より徒歩3分</span>
              </div>
            </div>

            <div className="flex justify-center gap-6 mb-8">
              <a href="https://www.instagram.com/amaretto_lifecasting_aichi/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white rounded-full shadow-sm text-[#2C2C2C] hover:text-[#C4A962] hover:shadow-md transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://lin.ee/nf4Ayfy" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white rounded-full shadow-sm text-[#2C2C2C] hover:text-[#C4A962] hover:shadow-md transition-all">
                <MessageCircle size={18} />
              </a>
              <a href="tel:0533569494" className="p-2.5 bg-white rounded-full shadow-sm text-[#2C2C2C] hover:text-[#C4A962] hover:shadow-md transition-all">
                <Phone size={18} />
              </a>
            </div>

            <p className="text-[0.6rem] text-[#AAAAAA] tracking-wider">
              © {new Date().getFullYear()} amorétto. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Floating Bottom Action Bar (Mobile Only) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: scrolled ? 0 : 100 }}
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#E5E0D8] p-4 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]"
      >
        <a
          href="https://lifecastingtimecapsule.com/reservation"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#C4A962] text-white rounded-sm font-medium tracking-wider shadow-md active:scale-[0.98] transition-transform"
        >
          <Calendar size={18} />
          予約・空き状況を確認
        </a>
      </motion.div>

      {/* Scroll to Top Button (Desktop) */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hidden md:flex fixed bottom-8 right-8 p-4 bg-white text-[#C4A962] rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-40 border border-[#E5E0D8]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
