import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { PlanGallery } from "./pages/PlanGallery";
import { School } from "./pages/School";
import { Access } from "./pages/Access"; 

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // 少し遅延させてレンダリング待ち
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}

// Meta Pixel Code Component
function MetaPixel() {
  useEffect(() => {
    // Initialize fbq function
    if (typeof window !== 'undefined') {
      (function(f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
        
        n('init', '1848008302481267');
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', null, null, null);

      (window as any).fbq('track', 'PageView');
    }
  }, []);
  
  return (
    <noscript>
      <img 
        height="1" 
        width="1" 
        style={{ display: 'none' }}
        src="https://www.facebook.com/tr?id=1848008302481267&ev=PageView&noscript=1"
        alt=""
      />
    </noscript>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MetaPixel />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/plan-gallery" element={<PlanGallery />} />
            <Route path="/school" element={<School />} />
            <Route path="/access" element={<Access />} /> 
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
