import image_a0354f462dd60a54ee83d6d005b657d7607d28c2 from 'figma:asset/a0354f462dd60a54ee83d6d005b657d7607d28c2.png';
import image_4f29fd2cd0dcbbe2868733df8ea47200f371e7a2 from 'figma:asset/4f29fd2cd0dcbbe2868733df8ea47200f371e7a2.png';
import image_1dcb22b059fada42ca8857edd6c73aa35756f226 from 'figma:asset/1dcb22b059fada42ca8857edd6c73aa35756f226.png';
import image_1cacdfafa29eecceb028f649eacdf3b80807891d from 'figma:asset/1cacdfafa29eecceb028f649eacdf3b80807891d.png';
import logoImage from "figma:asset/a5fc00399012eeaf62209d6c1238a54dcc136bcf.png";
import heroImage from 'figma:asset/1b1cb659ea81541dabf0f51e56339db5d8c92811.png';
import plasterArtImage from 'figma:asset/49bf243a67012d811aa34bfe11f3d464e8fc5388.png';
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Heart } from "lucide-react";
import { Helmet } from 'react-helmet-async';

// 画像パス
const IMG_HERO = heroImage;
const IMG_CONCEPT = plasterArtImage;
const IMG_INTERIOR = "https://images.unsplash.com/photo-1611596189148-a74728c484ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
// スタッフ画像（Figmaからのインポートを割り当て）
const IMG_STAFF_1 = image_1cacdfafa29eecceb028f649eacdf3b80807891d; // Renan
const IMG_STAFF_2 = image_1dcb22b059fada42ca8857edd6c73aa35756f226; // Mari
const IMG_STAFF_3 = image_4f29fd2cd0dcbbe2868733df8ea47200f371e7a2; // Yayoi

export function Home() {
  return (
    <>
      <Helmet>
        <title>amorétto | LifeCasting® Studio</title>
        <meta name="description" content="日本初のLifeCasting®専門スタジオ。一瞬の感動を、永遠の形に。" />
        {/* Cormorant Garamond フォントの読み込み推奨（Layout.tsxに追加済みなら不要） */}
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      {/* --- Hero Section: ノイズを減らし、タイポグラフィで魅せる --- */}
      <section className="relative h-screen w-full overflow-hidden bg-[#FAFAF8]">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src={IMG_HERO} 
            alt="Newborn holding finger" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <h1 className="mb-8">
              <img 
                src={logoImage} 
                alt="amorétto" 
                className="h-20 md:h-32 w-auto mx-auto brightness-0 invert opacity-90" 
              />
            </h1>
            
            <p className="font-serif text-base md:text-xl tracking-[0.3em] mb-16 text-white/90 font-light">
              愛おしい瞬間を、永遠に。
            </p>
            
            {/* ボタンではなく「リンク」として配置し、上品に */}
            <Link 
              to="/about"
              className="group relative inline-flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <span className="text-xs tracking-[0.3em] uppercase">View Concept</span>
              <span className="w-8 h-px bg-white/50 group-hover:w-16 transition-all duration-500"></span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- Introduction: "時間と物語" (詩的な余白) --- */}
      <section className="py-32 md:py-48 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-[#C4A962] text-xs tracking-[0.3em] uppercase mb-10 opacity-80">Philosophy</span>

            <h2 className="font-serif text-2xl md:text-4xl text-[#2C2C2C] leading-loose mb-16">
              私たちが売っているのは、<br />
              <span className="text-[#C4A962]">時間</span>と<span className="text-[#C4A962]">物語</span>です。
            </h2>

            <div className="space-y-10 text-[#4A4A4A] leading-[2.4] tracking-wide font-light text-[0.95rem] md:text-base">
              <p>
                二度と戻らない、<br className="md:hidden" />
                今しかない貴重な時間。
              </p>
              <p>
                赤ちゃんの成長は、あまりにも早いから。<br />
                昨日できなかったことが今日できるようになり、<br />
                今日抱きしめたときの小ささは、<br />
                明日にはもう変わっています。
              </p>
              <p>
                amoréttoは、その一瞬の「物語」を<br />
                アートとして未来へ届ける<br />
                日本初のライフキャスティングスタジオです。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Feature 1: Art (作品) --- */}
      <section className="py-24 md:py-40 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32">
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
               <div className="aspect-[4/5] shadow-2xl relative">
                  <img src={IMG_CONCEPT} alt="Plaster Art" className="w-full h-full object-cover grayscale-[10%]" />
               </div>
            </motion.div>

            <motion.div 
               className="md:w-1/2"
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              <span className="block text-[#C4A962] text-3xl md:text-5xl font-light italic mb-6 opacity-40" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                01. Art Piece
              </span>

              <h3 className="font-serif text-2xl md:text-3xl text-[#2C2C2C] mb-8 leading-relaxed">
                その指先も、柔らかな肌も。<br/>
                <span className="text-[#C4A962]">「アート」として昇華させる。</span>
              </h3>

              <div className="space-y-6 text-[#666666] leading-[2.2] tracking-wide font-light mb-12 text-sm md:text-base">
                <p>
                  血管の浮き立ち、爪の形、シワの一本一本まで。<br />
                  「LifeCasting®」が切り取るのは、二度と戻らない一瞬のリアルです。
                </p>
                <p>
                  すべての作品は、<strong className="font-medium text-[#555555]">美術教員免許を持つプロフェッショナルが監修</strong>。<br />
                  美術品レベルの厳格な品質基準のもと、専任アーティストが丁寧に磨き上げます。<br />
                  美しさへの執着ともいえるその「こだわり」が、作品に命を吹き込みます。
                </p>
              </div>

              <Link 
                to="/about" 
                className="group inline-flex items-center gap-3 text-[#2C2C2C] border-b border-[#2C2C2C] pb-1 hover:text-[#C4A962] hover:border-[#C4A962] transition-colors tracking-widest text-sm"
              >
                READ MORE
                <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Feature 2: Material (素材) --- */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32">
            
            <motion.div 
              className="md:w-1/2 order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="block text-[#C4A962] text-3xl md:text-5xl font-light italic mb-6 opacity-40" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                02. Material
              </span>

              <h3 className="font-serif text-2xl md:text-3xl text-[#2C2C2C] mb-8 leading-relaxed">
                「早さ」は、<br/>
                赤ちゃんへの優しさです。
              </h3>

              <div className="space-y-6 text-[#666666] leading-[2.2] tracking-wide font-light mb-12 text-sm md:text-base">
                <p>
                  じっとしていられない赤ちゃんにとって、<br/>
                  型取りの時間は少しでも短いほうがいい。
                </p>
                <p>
                  その想いから、私たちは<strong className="font-medium text-[#555555]">独自に研究し開発した素材</strong>を採用しました。<br/>
                  <span className="text-xs text-[#999999] tracking-wider block mt-2">（※特許申請中）</span>
                </p>
                <p>
                  硬化にかかる時間は、わずか90秒。<br/>
                  お母さんとお話している間に、魔法のように完了します。
                </p>
              </div>


            </motion.div>

            <motion.div 
              className="md:w-1/2 order-1 md:order-2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[4/5] bg-white p-4 shadow-xl rotate-1">
                 <img src={image_a0354f462dd60a54ee83d6d005b657d7607d28c2} alt="Safe material" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Staff Section: "脱・整列" (エディトリアル風レイアウト) --- */}
      <section id="team" className="py-32 md:py-48 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24 md:mb-32"
          >
            <h2 className="text-4xl md:text-6xl text-[#2C2C2C] mb-4 font-light italic" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Professional
            </h2>
            <p className="font-serif text-sm text-[#666666] tracking-widest">
              amoréttoを支える、3人のプロフェッショナル
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-20">
            {/* Staff 1 */}
            <motion.div 
              className="flex flex-col group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-full aspect-[3/4] mb-8 overflow-hidden bg-white">
                <img src={IMG_STAFF_1} alt="Renan" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="pr-4 border-t border-[#E5E0D8] pt-6">
                <p className="text-[10px] tracking-[0.2em] text-[#C4A962] uppercase mb-2">Casting Artist</p>
                <h3 className="font-serif text-xl text-[#2C2C2C] mb-1">型取り担当</h3>
                <p className="text-sm font-light text-[#999999] mb-4 tracking-wider">Renan</p>
                <p className="text-sm leading-loose text-[#666666] font-light">
                  独自に開発した安心安全素材で、業界No.1のスピードで赤ちゃんへの負担を最小限に型取りを行います。
                </p>
              </div>
            </motion.div>

            {/* Staff 2 (少し位置をずらすなどの変化をつけても良い) */}
            <motion.div 
              className="flex flex-col group md:mt-12" // ★ポイン��: 2人目だけ少し下げることでリズムを生む
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-full aspect-[3/4] mb-8 overflow-hidden bg-white">
                <img src={IMG_STAFF_2} alt="Mari" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="pr-4 border-t border-[#E5E0D8] pt-6">
                <p className="text-[10px] tracking-[0.2em] text-[#C4A962] uppercase mb-2">Photographer</p>
                <h3 className="font-serif text-xl text-[#2C2C2C] mb-1">撮影担当</h3>
                <p className="text-sm font-light text-[#999999] mb-4 tracking-wider">Mari</p>
                <p className="text-sm leading-loose text-[#666666] font-light">
                  20年以上この業界で数千組の家族と向き合ってきたプロが、二度と訪れない今この瞬間の輝きを永遠に刻みます。
                </p>
              </div>
            </motion.div>

            {/* Staff 3 */}
            <motion.div 
              className="flex flex-col group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-full aspect-[3/4] mb-8 overflow-hidden bg-white">
                <img src={IMG_STAFF_3} alt="Yayoi" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="pr-4 border-t border-[#E5E0D8] pt-6">
                <p className="text-[10px] tracking-[0.2em] text-[#C4A962] uppercase mb-2">Finishing Artist</p>
                <h3 className="font-serif text-xl text-[#2C2C2C] mb-1">仕上げ担当</h3>
                <p className="text-sm font-light text-[#999999] mb-4 tracking-wider">Yayoi</p>
                <p className="text-sm leading-loose text-[#666666] font-light">
                  「わぁ、きれい」その言葉が聞きたくて。美術教員免許を持つ確か���技術で、世界一の仕上がりを目指しています。
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CTA: シンプルかつ美しく --- */}
      <section className="relative py-32 md:py-48 bg-cover bg-center" style={{ backgroundImage: `url(${IMG_INTERIOR})` }}>
        <div className="absolute inset-0 bg-white/90" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="max-w-3xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl text-[#2C2C2C] italic tracking-wide font-light mb-8" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              The Timeless Gift.
            </h2>

            <p className="font-serif text-[1rem] md:text-[1.1rem] text-[#4A4A4A] leading-[2.4] tracking-wider mb-16">
              その小さな手は、明日にはもう大きくなっているから。<br />
              「今」しかない感動を、未来への贈り物に。
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
               <a 
                 href="https://lifecastingtimecapsule.com/reservation" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full md:w-auto min-w-[260px] px-10 py-4 bg-[#C4A962] text-white tracking-[0.2em] hover:bg-[#B39952] transition-all shadow-xl hover:shadow-2xl text-xs uppercase"
               >
                 Reserve Now
               </a>
               <Link 
                 to="/about" 
                 className="w-full md:w-auto min-w-[260px] px-10 py-4 border border-[#C4A962] text-[#C4A962] tracking-[0.2em] hover:bg-[#C4A962]/5 transition-colors text-xs uppercase bg-white/50 backdrop-blur-sm"
               >
                 Our Story
               </Link>
            </div>
            
            <p className="mt-8 text-[10px] text-[#999999] tracking-widest">
              ※ 現在、多くのご予約をいただいております。<br className="md:hidden"/>お早めの確認をおすすめいたします。
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}