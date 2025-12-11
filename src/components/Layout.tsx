import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, MessageCircle, Phone, Instagram, MapPin } from "./Icons";
import { ArrowRight, ArrowUp } from "lucide-react"; // Calendar削除
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/", ariaLabel: "amorétto トップページ" },
    { name: "About", path: "/about", ariaLabel: "amoréttoのコンセプト・想いについて" },
    { name: "Plan & Gallery", path: "/plan-gallery", ariaLabel: "撮影プランと作品ギャラリー" },
    { name: "School", path: "/school", ariaLabel: "ライフキャスティングスクールについて" },       
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col relative overflow-x-hidden selection:bg-[#C4A962] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Noto+Serif+JP:wght@200;300;400;500&family=Noto+Sans+JP:wght@300;400;500&display=swap');
        
        :root {
          --font-en-serif: 'Cormorant Garamond', serif;
          --font-jp-serif: 'Noto Serif JP', serif;
          --font-body: 'Noto Sans JP', sans-serif;
        }

        body {
          font-family: var(--font-body);
          color: #4A4A4A;
          letter-spacing: 0.05em;
        }
        
        .font-en-serif { font-family: var(--font-en-serif); }
        .font-jp-serif { font-family: var(--font-jp-serif); }
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
            ? "bg-[#FAFAF8]/90 backdrop-blur-md border-[#E5E0D8]/60 py-3 shadow-sm" 
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" onClick={handleNavClick} className="relative z-[101]">
            <img
              src={logoImage}
              alt="amoretto"
              className={`transition-all duration-300 ${scrolled ? "h-6 md:h-9" : "h-7 md:h-10"}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-[0.95rem] tracking-wide font-medium">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  to={link.path}
                  aria-label={link.ariaLabel}
                  className="text-[#666666] group-hover:text-[#C4A962] transition-colors py-2 font-en-serif text-lg"
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
              aria-label="予約する"
              className="group relative overflow-hidden px-8 py-3 bg-[#C4A962] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#C4A962]/20"
            >
              <span className="relative z-10 flex items-center gap-2 tracking-wider text-xs font-medium">
                予約する <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-[101] p-2 text-[#2C2C2C] active:scale-95 transition-transform"
            aria-label="メニューを開閉する"
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
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
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] bg-[#FAFAF8] flex flex-col md:hidden"
          >
             {/* Decorative Background */}
             <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] rounded-full bg-[#C4A962]/5 blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vh] h-[50vh] rounded-full bg-[#C4A962]/5 blur-3xl"></div>
             </div>

             <div className="flex-1 flex flex-col justify-center items-center px-6 relative z-10">
               <div className="mb-12 opacity-80">
                  <img src={logoImage} alt="amoretto" className="h-8 w-auto mix-blend-multiply" />
               </div>

               <nav className="flex flex-col items-center gap-8 w-full">
                 {navLinks.map((link, i) => (
                   <motion.div
                     key={link.name}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                   >
                     <Link 
                      to={link.path}
                      onClick={handleNavClick}
                      aria-label={link.ariaLabel}
                      className="font-en-serif text-4xl text-[#2C2C2C] hover:text-[#C4A962] transition-colors block py-1 italic tracking-wide"
                     >
                       {link.name}
                     </Link>
                   </motion.div>
                 ))}
               </nav>
               
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.6 }}
                 className="mt-16 w-full max-w-xs"
               >
                 <a
                    href="https://lifecastingtimecapsule.com/reservation"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="予約する"
                    className="block w-full py-4 border border-[#C4A962] text-[#C4A962] text-center text-sm tracking-[0.2em] uppercase hover:bg-[#C4A962] hover:text-white transition-all duration-300"
                 >
                    Reservation
                 </a>
                 <div className="flex justify-center gap-8 mt-10 text-[#C4A962]">
                    <a href="https://www.instagram.com/amaretto_lifecasting_aichi/" target="_blank" rel="noopener noreferrer"><Instagram size={24} strokeWidth={1.5} /></a>
                    <a href="https://lin.ee/nf4Ayfy" target="_blank" rel="noopener noreferrer"><MessageCircle size={24} strokeWidth={1.5} /></a>
                 </div>
               </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex-grow pt-[0px] md:pt-[0px]" // ヘッダー分のパディングは各ページ側で調整または透過ヘッダーなら0
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative py-12 md:py-20 px-6 bg-[#F5F3EF] text-[#2C2C2C] overflow-hidden border-t border-[#E5E0D8]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex flex-col items-center"
          >
            <div className="mb-8">
              <img 
                src={logoImage} 
                alt="amorétto" 
                className="h-6 md:h-8 w-auto opacity-80 mix-blend-multiply" 
              />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 mb-10 text-[11px] md:text-xs text-[#666666] tracking-wider font-light">
              <div className="flex items-center gap-2">
                 <MapPin size={12} className="text-[#C4A962]" />
                 <span>愛知県豊川市門前町１５</span>
              </div>
              <span className="hidden md:inline text-[#E5E0D8]">|</span>
              <div>豊川稲荷より徒歩3分</div>
              <span className="hidden md:inline text-[#E5E0D8]">|</span>
              <div>完全予約制</div>
            </div>

            <div className="flex justify-center gap-8 mb-10">
              <a href="https://www.instagram.com/amaretto_lifecasting_aichi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#999999] hover:text-[#C4A962] transition-colors">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a href="https://lin.ee/nf4Ayfy" target="_blank" rel="noopener noreferrer" aria-label="LINE公式アカウント" className="text-[#999999] hover:text-[#C4A962] transition-colors">
                <MessageCircle size={20} strokeWidth={1.5} />
              </a>
              <a href="tel:0533569494" aria-label="電話をかける" className="text-[#999999] hover:text-[#C4A962] transition-colors">
                <Phone size={20} strokeWidth={1.5} />
              </a>
            </div>

            <p className="text-[10px] text-[#AAAAAA] tracking-[0.1em] font-light">
              © {new Date().getFullYear()} amorétto. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top Button (Desktop only to keep mobile clean) */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hidden md:flex fixed bottom-8 right-8 p-3 bg-white text-[#C4A962] rounded-full shadow-lg border border-[#E5E0D8] z-40 hover:-translate-y-1 transition-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <ArrowUp size={20} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}