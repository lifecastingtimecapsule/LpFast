import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { TestimonialCard } from "../components/TestimonialCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Helmet } from 'react-helmet-async';

// Import existing images for products
import image_869102067ce8235d121d1e72efdd989be969f734 from "figma:asset/869102067ce8235d121d1e72efdd989be969f734.png";
import image_298ca8044759a9db905e0b307ec97ce7f3386940 from "figma:asset/298ca8044759a9db905e0b307ec97ce7f3386940.png";
import image_2313c0ef7c72fea9684332541201c7988100c7d8 from "figma:asset/2313c0ef7c72fea9684332541201c7988100c7d8.png";

export function PlanGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1557151331-5d93debb2e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob2xkaW5nJTIwaGFuZHMlMjBlbW90aW9uYWwlMjBhcnRpc3RpYyUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzY1NDM3OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", alt: "Family holding hands" },
    { src: "https://images.unsplash.com/photo-1649176636526-f7443d8259ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwaGFuZCUyMGZlZXQlMjBwbGFzdGVyJTIwY2FzdGluZyUyMGFydCUyMHdoaXRlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjU0Mzc5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", alt: "Plaster casting art" },
    { src: "https://images.unsplash.com/photo-1745173038890-16205011df4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieSUyMGZlZXQlMjBhcnRpc3RpYyUyMGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBoaWdoJTIwa2V5fGVufDF8fHx8MTc2NTQzNzkwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", alt: "Newborn feet artistic" },
    { src: "https://images.unsplash.com/photo-1759173791710-659069f6184f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBob2xkaW5nJTIwYmFieSUyMGhhbmQlMjBjbG9zZSUyMHVwJTIwZW1vdGlvbmFsfGVufDF8fHx8MTc2NTQzNzkwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", alt: "Mother holding baby hand" }
  ];

  return (
    <>
      <Helmet>
        <title>Plan & Gallery | amorétto</title>
        <meta name="description" content="amoréttoの料金プランと作品ギャラリー。世界にひとつだけの立体手形アートのデザインや価格をご確認いただけます。" />
      </Helmet>

      {/* Hero / Intro */}
      <section className="py-12 md:py-24 px-6 md:px-6 bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-[2rem] md:text-[3.5rem] mb-6 md:mb-8 text-[#2C2C2C] tracking-wide">
              Plan & Gift
            </h1>
            <p className="text-[1rem] md:text-[1.1rem] leading-loose text-[#666666] tracking-wide max-w-2xl mx-auto">
              かけがえのない瞬間を、最適なカタチで。
              <br />
              ご自宅用はもちろん、大切な方へのギフトにも。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-6 md:py-12 px-6 md:px-6 bg-[#FAFAF8]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-4 md:mb-20"
          >
            {/* Product Image Carousel */}
            <div className="relative h-[35vh] md:h-[55vh] mb-12 md:mb-20 overflow-hidden rounded-sm shadow-md">
              {/* Images */}
              {[
                { src: image_869102067ce8235d121d1e72efdd989be969f734, alt: "Gold casting collection" },
                { src: image_298ca8044759a9db905e0b307ec97ce7f3386940, alt: "Silver casting collection" },
                { src: image_2313c0ef7c72fea9684332541201c7988100c7d8, alt: "Premium casting with frame" }
              ].map((img, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: index === 0 ? 1 : 0 }}
                  animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ImageWithFallback
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
              
              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'bg-[#C4A962] w-6' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`画像 ${index + 1} を表示`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <ProductCard
                title="amorétto  Collection"
                subtitle="初めて触れた、あの日をDesignする"
                items={[
                  { description: "2 pieces", price: "¥35,000+TAX" },
                  { description: "4 pieces", price: "¥45,000+TAX" },
                ]}
              />

              <ProductCard
                title="amorétto × Life Studio"
                subtitle="時間と記憶を、ひとつの作品に"
                items={[
                  {
                    description: "1 photo + 1 casting",
                    price: "¥20,000～+TAX",
                  },
                  {
                    description: "+ 1 additional piece",
                    price: "¥5,000+TAX",
                  },
                ]}
              />

              <ProductCard
                title="Premium Story Collection"
                subtitle="温もりと共に残す、家族のものがたり"
                items={[]}
                discount={{
                  original: "¥50,000+TAX",
                  current: "¥48,000+TAX",
                }}
                note="*期間限定価格"
              />
            </div>

            {/* CTA */}
            <div className="text-center mt-12 md:mt-16">
              <a
                href="https://lifecastingtimecapsule.com/reservation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-block px-10 md:px-14 py-3.5 md:py-4 bg-[#C4A962] text-white hover:bg-[#B39952] transition-all duration-300 tracking-wider text-[0.95rem] md:text-[1.05rem] text-center"
              >
                予約する
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section (New) */}
      <section className="py-12 md:py-24 px-6 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="font-serif text-[1.8rem] md:text-[2.5rem] text-center mb-4 md:mb-6 text-[#2C2C2C] tracking-wide">
              Gallery
            </h2>
            <div className="h-px w-24 bg-[#C4A962] mx-auto mb-12 md:mb-20"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="aspect-[3/4] overflow-hidden group relative">
                   <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                   />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-24 px-6 md:px-6 bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="font-serif text-[1.8rem] md:text-[2.5rem] text-center mb-12 md:mb-20 text-[#2C2C2C] tracking-wide">
              お客様の声
            </h2>

            <div className="space-y-6 md:space-y-8">
              <TestimonialCard
                quote="小さな手足がそのまま残っていて泣きそうになりました"
                author="M.K様"
                context="お子様3カ月"
              />
              <TestimonialCard
                quote="不安だったけど、思っていたより短時間で終わり、楽しく安心して任せられました。"
                author="Y.S様"
                context="20代ママ"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}