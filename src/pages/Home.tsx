import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Heart } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { useRef } from "react";

// Images from Unsplash
const IMG_HERO = "https://images.unsplash.com/photo-1651083472052-d944a2bf25df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"; // Baby holding finger
const IMG_CONCEPT = "https://images.unsplash.com/photo-1616627503062-6c26ed4c73b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"; // Plaster art
const IMG_INTERIOR = "https://images.unsplash.com/photo-1611596189148-a74728c484ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"; // Luxury interior
const IMG_ARTIST = "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"; // Artist

export function Home() {
  return (
    <>
      <Helmet>
        <title>amorétto | LifeCasting® Studio</title>
        <meta name="description" content="日本初のLifeCasting®専門スタジオ。一瞬の感動を、永遠の形に。" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-[#FAFAF8]">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src={IMG_HERO} 
            alt="Newborn holding finger" 
            className="w-full h-full object-cover grayscale-[20%] sepia-[10%]"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-white/90">
              LifeCasting® Studio
            </h2>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tight">
              amorétto
            </h1>
            <p className="font-serif text-lg md:text-2xl tracking-widest mb-12 text-white/90">
              愛おしい瞬間を、永遠に。
            </p>
            
            <Link 
              to="/about"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#2C2C2C] transition-all duration-300 rounded-sm uppercase tracking-widest text-sm"
            >
              View Concept
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 md:py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-serif text-[#C4A962] text-sm tracking-widest uppercase mb-8">Philosophy</p>
            <h2 className="font-serif text-2xl md:text-4xl text-[#2C2C2C] leading-relaxed mb-12">
              記憶は薄れる。<br />
              だから、形にする。
            </h2>
            <p className="text-[#666666] leading-[2.2] tracking-wide mb-12 font-light">
              赤ちゃんの成長は、あまりにも早い。<br />
              その小さな手も、柔らかな肌触りも、<br />
              写真だけでは残せない「温度」があります。<br />
              <br />
              amoréttoは、その一瞬を<br />
              アートとして未来へ届ける<br />
              日本初のライフキャスティングスタジオです。
            </p>
            <Link to="/about" className="text-[#C4A962] border-b border-[#C4A962] pb-1 hover:opacity-70 transition-opacity tracking-widest text-sm">
              もっと詳しく見る
            </Link>
          </motion.div>
        </div>
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#FAFAF8] rounded-full blur-[100px] -z-10" />
      </section>

      {/* Showcase / Features */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5]"
            >
              <img src={IMG_CONCEPT} alt="Plaster Art" className="w-full h-full object-cover rounded-sm shadow-xl" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white p-6 shadow-lg hidden md:block">
                <p className="font-serif text-[#C4A962] text-4xl mb-2">90<span className="text-sm">sec</span></p>
                <p className="text-xs text-[#666666] leading-relaxed">
                  赤ちゃんに負担をかけない<br/>魔法の硬化時間
                </p>
              </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              <h3 className="font-serif text-3xl text-[#2C2C2C] mb-8">
                世界にひとつだけの<br/>
                <span className="text-[#C4A962]">マスターピース</span>
              </h3>
              <p className="text-[#666666] leading-loose mb-8">
                血管の浮きや、爪の先、シワの1本1本まで。<br />
                驚くほど精巧に再現される「LifeCasting®」は、<br />
                まるで時が止まったかのような感動を与えてくれます。<br />
                <br />
                インテリアに馴染む、美術館品質のアートとして<br />
                熟練の職人が手作業で仕上げます。
              </p>
              <ul className="space-y-4 mb-10">
                 <li className="flex items-center gap-3 text-[#555555]">
                    <Star size={16} className="text-[#C4A962]" />
                    <span className="text-sm tracking-wide">国内唯一の専用素材を使用</span>
                 </li>
                 <li className="flex items-center gap-3 text-[#555555]">
                    <Heart size={16} className="text-[#C4A962]" />
                    <span className="text-sm tracking-wide">医療レベルの安全性</span>
                 </li>
              </ul>
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#2C2C2C] text-white hover:bg-[#444] transition-colors rounded-sm"
              >
                <span>こだわりの技術</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Artist / Staff Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                    <img 
                      src={IMG_ARTIST} 
                      alt="Artist working" 
                      className="w-full h-auto rounded-sm shadow-xl grayscale-[10%]" 
                    />
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#FAFAF8] -z-10 rounded-full blur-2xl"></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[#C4A962] tracking-widest text-xs font-bold uppercase block mb-4">Artist</span>
                <h3 className="font-serif text-3xl text-[#2C2C2C] mb-6">
                  想いを汲み取り、<br/>形にする。
                </h3>
                <p className="text-[#666666] leading-loose mb-6">
                  amoréttoのアーティストは、全員が研修を受けた専任スタッフです。
                  技術だけではなく、赤ちゃんの安全管理や、親御様の想いに寄り添うカウンセリングを大切にしています。
                </p>
                <p className="text-[#666666] leading-loose">
                  「こんな風に残したい」という曖昧なイメージでも構いません。<br/>
                  私たちが会話の中から、あなただけの物語を見つけ出します。
                </p>
                <div className="mt-8">
                  <p className="font-serif text-lg text-[#2C2C2C]">Owner / Lead Artist</p>
                  <p className="font-serif text-[#C4A962] text-xl">MIO</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-cover bg-center" style={{ backgroundImage: `url(${IMG_INTERIOR})` }}>
        <div className="absolute inset-0 bg-white/90" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-5xl text-[#2C2C2C] mb-8">
              Make it Eternal.
            </h2>
            <p className="text-[#666666] mb-10 text-lg">
              この小さな奇跡を、形に残しませんか？
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
               <a 
                 href="https://lifecastingtimecapsule.com/reservation" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-10 py-4 bg-[#C4A962] text-white tracking-widest hover:bg-[#B39952] transition-colors shadow-lg"
               >
                 ご予約・空き状況
               </a>
               <Link 
                 to="/about" 
                 className="px-10 py-4 border border-[#C4A962] text-[#C4A962] tracking-widest hover:bg-[#C4A962]/5 transition-colors"
               >
                 詳しく見る
               </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
