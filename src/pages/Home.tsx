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

// Images from Unsplash
const IMG_HERO = heroImage; // Baby holding finger
const IMG_CONCEPT = plasterArtImage; // Plaster art
const IMG_INTERIOR = "https://images.unsplash.com/photo-1611596189148-a74728c484ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"; // Luxury interior

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
            className="w-full h-full object-cover grayscale-[10%]"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="mb-8">
              <img 
                src={logoImage} 
                alt="amorétto" 
                className="h-16 md:h-24 lg:h-32 w-auto mx-auto brightness-0 invert" 
              />
            </h1>
            
            <p className="font-jp-serif text-lg md:text-xl tracking-[0.2em] mb-12 text-white/90 font-light">
              愛おしい瞬間を、永遠に。
            </p>
            
            <Link 
              to="/about"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-white transition-all duration-500"
            >
              <span className="text-sm tracking-[0.3em] uppercase border-b border-white/50 pb-1 group-hover:border-white transition-colors">
                View Concept
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 md:py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-jp-serif text-2xl md:text-4xl text-[#2C2C2C] leading-relaxed mb-12 font-light">
              記憶は薄れる。<br />
              だから、形にする。
            </h2>
            <p className="text-[#666666] leading-[2.2] tracking-wide mb-12 font-light">
              赤ちゃんの成長は、あまりにも早い。<br />
              その小さな手も����らかな肌触りも、<br />
              写真だけでは残せない「温度」があります。<br />
              <br />
              amoréttoは、その一瞬を<br />
              アートとして未来へ届ける<br />
              日本初のライフキャスティングスタジオです。
            </p>
            
            <Link to="/about" className="text-[#C4A962] text-sm tracking-widest hover:opacity-70 transition-opacity">
              read more
            </Link>
          </motion.div>
        </div>
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#FAFAF8] rounded-full blur-[100px] -z-10" />
      </section>

      {/* --- Section 1: Material & Safety (素材へのこだわり) --- */}
      <section className="py-32 md:py-40 bg-[#FAFAF8] overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            
            {/* テキストエリア（左） */}
            <motion.div 
              className="md:w-1/2 order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >

              <h3 className="font-jp-serif text-3xl md:text-4xl text-[#2C2C2C] mb-8 leading-relaxed">
                「早さ」は、<br/>
                赤ちゃんへの<span className="text-[#C4A962]">優しさ</span>です。
              </h3>

              <div className="space-y-6 text-[#666666] leading-[2.4] tracking-wide font-light mb-10">
                <p>
                  じっとしていられない赤ちゃんにとって、<br/>
                  型取りの時間は少しでも短いほうがいい。
                </p>
                <p>
                  その想いから、私たちは<strong className="font-medium text-[#555555]">独自に研究し開発した素材</strong>を採用しました。<br/>
                  <span className="text-xs text-[#999999] tracking-wider block mt-1">（※特許申請中）</span>
                </p>
                <p>
                  硬化にかかる時間は、わずか90秒。<br/>
                  お母さんとお話している間に、魔法のように完了します。
                </p>
                <p>
                  もちろん、肌への安全性も医療レベル。<br/>
                  デリケートな新生児の肌にも安心してお使いいただける、<br/>
                  国内で唯一の特別な素材です。
                </p>
              </div>


            </motion.div>

            {/* 画像エリア（右） */}
            <motion.div 
              className="md:w-1/2 order-1 md:order-2 relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/5] overflow-hidden bg-white p-4 shadow-xl rotate-2">
                 <img 
                   src={image_a0354f462dd60a54ee83d6d005b657d7607d28c2} 
                   alt="Safe material for baby" 
                   className="w-full h-full object-cover grayscale-[10%]" 
                 />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Art & Technique (技術へのこだわり) --- */}
      <section className="py-32 md:py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            
            {/* 画像エリア（左） */}
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
               <div className="aspect-[4/5] overflow-hidden shadow-2xl relative">
                  <img 
                    src={IMG_CONCEPT} 
                    alt="Plaster Art" 
                    className="w-full h-full object-cover" 
                  />
                  {/* 装飾的な枠線（高級感） */}
                  <div className="absolute inset-4 border border-white/20"></div>
               </div>
            </motion.div>

            {/* テキストエリア（右） */}
            <motion.div 
               className="md:w-1/2"
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              <span className="block font-en-serif text-[#C4A962] text-lg tracking-[0.2em] italic mb-6 opacity-80">
                Professional Quality
              </span>

              <h3 className="font-jp-serif text-3xl md:text-4xl text-[#2C2C2C] mb-8 leading-relaxed">
                その指先も、柔らかな肌も。<br/>
                <span className="text-[#C4A962]">「アート」として昇華させる。</span>
              </h3>

              <div className="space-y-6 text-[#666666] leading-[2.4] tracking-wide font-light mb-10">
                <p>
                  血管の浮き立ち、爪の形、シワの一本一本まで。<br />
                  「LifeCasting®」が切り取るのは、二度と戻らない一瞬のリアルです。
                </p>
                <p>
                  仕上げを行うのは���<strong className="font-medium text-[#555555]">美術教員免許を持つ専任アーティスト</strong>。<br />
                  アートのプロフェッショナルによる厳格な監修のもと、<br />
                  単なる記録を超えた「美術品」として、丁寧に磨き上げます。
                </p>
              </div>

              <Link 
                to="/about" 
                className="group inline-flex items-center gap-3 text-[#2C2C2C] hover:text-[#C4A962] transition-colors"
              >
                <span className="border-b border-[#2C2C2C] group-hover:border-[#C4A962] pb-1 tracking-widest text-sm">
                  View Details
                </span>
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Artist / Staff Section - The Breath (py-32) */}
      <section id="team" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          {/* Header Area to Grid: The Group (mb-24 / 96px) */}
          <div className="text-center mb-24">
             {/* Title to Divider: The Group (mb-8 is not The Group, maybe The Rhythm or The Tight? Title to Divider is close. Let's use mb-8) */}
             <h2 className="font-jp-serif text-2xl md:text-3xl text-[#2C2C2C] mb-8 tracking-wider font-light">
               <span className="font-en-serif italic pr-2">amorétto</span>を支える3人のプロフェッショナル
             </h2>
             <div className="w-12 h-[2px] bg-[#C4A962]/30 mx-auto"></div>
          </div>

          {/* Grid Gap: The Rhythm (gap-12) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
             {[
               {
                 name: "Renan",
                 roleEn: "CASTING ARTIST",
                 roleJp: "型取り担当",
                 desc: "独自に開発した安心安全素材で、業界No.1のスピードで赤ちゃんへの負担を最小限に型取りを行います。",
                 img: image_1cacdfafa29eecceb028f649eacdf3b80807891d
               },
               {
                 name: "Mari",
                 roleEn: "PHOTOGRAPHER",
                 roleJp: "撮影担当",
                 desc: "20年以上この業界で数千組の家族と向き合ってきたプロが、二度と訪れない今この瞬間の輝きを永遠に刻みます。",
                 img: image_1dcb22b059fada42ca8857edd6c73aa35756f226
               },
               {
                 name: "Yayoi",
                 roleEn: "FINISHING ARTIST",
                 roleJp: "仕上げ���当",
                 desc: "「わぁ、きれい」その言葉が聞きたくて。世界一の仕上がりを目指しています。",
                 img: image_4f29fd2cd0dcbbe2868733df8ea47200f371e7a2
               }
             ].map((staff, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="flex flex-col items-center text-center"
               >
                 {/* Image to Role: The Rhythm (mb-12) */}
                 <div className="w-full aspect-square mb-12 overflow-hidden">
                    <img 
                      src={staff.img} 
                      alt={staff.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                 </div>
                 
                 {/* Role EN to Role JP: The Tight (mb-2) */}
                 <p className="text-[#C4A962] text-[0.7rem] tracking-[0.2em] font-bold uppercase mb-2 font-en-serif">
                   {staff.roleEn}
                 </p>
                 {/* Role JP to Name: The Tight (mb-2) */}
                 <h3 className="font-jp-serif text-xl text-[#2C2C2C] mb-2 tracking-wide">
                   {staff.roleJp}
                 </h3>
                 {/* Name to Desc: The Tight/Rhythm (mb-6) */}
                 <p className="text-[#666666] mb-6 font-en-serif italic text-lg">
                   {staff.name}
                 </p>
                 <p className="text-[#666666] text-sm leading-loose font-light text-justify md:text-center px-2">
                   {staff.desc}
                 </p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 md:py-48 bg-cover bg-center" style={{ backgroundImage: `url(${IMG_INTERIOR})` }}>
        {/* 背景を少し白く飛ばして上品に */}
        <div className="absolute inset-0 bg-white/90" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="max-w-3xl mx-auto"
          >
            {/* 英語タイトル: 繊細で美しく */}
            <h2 className="font-en-serif text-5xl md:text-7xl text-[#2C2C2C] italic tracking-widest font-light mb-8">
              The Timeless Gift.
            </h2>

            {/* 日本語コピー: 語りかけるように */}
            <p className="font-jp-serif text-[1rem] md:text-[1.2rem] text-[#4A4A4A] leading-[2.4] tracking-wider mb-12">
              その小さな手は、明日にはもう大きくなっているから。<br />
              <span className="inline-block mt-2 md:mt-0">「今」しかない感動を、未来への贈り物に。</span>
            </p>

            {/* ボタンエリア: 余白を広げてエレガントに */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
               <a 
                 href="https://lifecastingtimecapsule.com/reservation" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full md:w-auto min-w-[240px] px-10 py-4 bg-[#C4A962] text-white tracking-[0.2em] hover:bg-[#B39952] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-sm font-medium"
               >
                 予約枠を確認する
               </a>
               <Link 
                 to="/about" 
                 className="w-full md:w-auto min-w-[240px] px-10 py-4 border border-[#C4A962] text-[#C4A962] tracking-[0.2em] hover:bg-[#C4A962]/5 transition-colors text-sm font-medium bg-white/50 backdrop-blur-sm"
               >
                 ブランドコンセプト
               </Link>
            </div>
            
            <p className="mt-8 text-xs text-[#999999] tracking-widest">
              ※ 現在、多くのご予約をいただいております。<br className="md:hidden"/>お早めの確認をおすすめいたします。
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}