import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { preloadLpImages } from "./utils/preloadImages";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { PlanGallery } from "./pages/PlanGallery";
import { School } from "./pages/School";
import { Access } from "./pages/Access";
import { Stores } from "./pages/Stores";
import { StoreDetail } from "./pages/StoreDetail";
import { Sitemap } from "./pages/Sitemap";
import { Company } from "./pages/Company";
import { Blog } from "./pages/Blog";
import { BlogArticle } from "./pages/BlogArticle";
import { News } from "./pages/News";
import { Testimonials } from "./pages/Testimonials";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Terms } from "./pages/Terms";
import { BlogAdmin } from "./pages/BlogAdmin";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { PublicReservationPage } from "./components/PublicReservationPage";
import { ReservationCompletePage } from "./components/ReservationCompletePage";
import { MyReservations } from "./pages/MyReservations";

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

function LpImagePreload() {
  useEffect(() => {
    preloadLpImages();
  }, []);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MetaPixel />
        <LpImagePreload />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/company" element={<Company />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/news" element={<News />} />
            <Route path="/stories" element={<Testimonials />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin/blog" element={<BlogAdmin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/plan-gallery" element={<PlanGallery />} />
            <Route path="/school" element={<School />} />
            <Route path="/access" element={<Access />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/stores/:id" element={<StoreDetail />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/reservation" element={<PublicReservationPage />} />
            <Route path="/yoyaku" element={<PublicReservationPage />} />
            <Route path="/public/reservation" element={<PublicReservationPage />} />
            <Route path="/public/reservation/complete" element={<ReservationCompletePage />} />
            <Route path="/my/reservations" element={<MyReservations />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}