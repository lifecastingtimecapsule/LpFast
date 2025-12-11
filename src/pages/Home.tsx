import image_a0354f462dd60a54ee83d6d005b657d7607d28c2 from 'figma:asset/a0354f462dd60a54ee83d6d005b657d7607d28c2.png';
import image_1dcb22b059fada42ca8857edd6c73aa35756f226 from 'figma:asset/1dcb22b059fada42ca8857edd6c73aa35756f226.png';
import image_1cacdfafa29eecceb028f649eacdf3b80807891d from 'figma:asset/1cacdfafa29eecceb028f649eacdf3b80807891d.png';
import logoImage from "figma:asset/a5fc00399012eeaf62209d6c1238a54dcc136bcf.png";
import heroImage from 'figma:asset/1b1cb659ea81541dabf0f51e56339db5d8c92811.png';
import plasterArtImage from 'figma:asset/49bf243a67012d811aa34bfe11f3d464e8fc5388.png';
import image_staff_3 from 'figma:asset/4f29fd2cd0dcbbe2868733df8ea47200f371e7a2.png';
import { motion } from "motion/react";
import { Helmet } from 'react-helmet-async';

// 画像パス
const IMG_HERO = heroImage;
const IMG_CONCEPT = plasterArtImage;
const IMG_STAFF_1 = image_1cacdfafa29eecceb028f649eacdf3b80807891d; // Renan
const IMG_STAFF_2 = image_1dcb22b059fada42ca8857edd6c73aa35756f226; // Mari
const IMG_STAFF_3 = image_staff_3; // Yayoi

export function Home() {
  return (
    <>
      <Helmet>
        <title>amorétto | LifeCasting® Studio</title>
        <meta name="description" content="日本初のLifeCasting®専門スタジオ。一瞬の感動を、永遠の形に。" />
      </Helmet>

      {/* --- Hero Section --- */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-[#FAFAF8]">
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
          <div className="absolute bottom-0 left-0 w-full h-32 md:h-64 bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8]/60 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <h1 className="mb-6 md:mb-8">
              {/* スマホでロゴが大きすぎないように調整 */}
              <img 
                src={logoImage} 
                alt="amorétto" 
                className="h-12 md:h-24 w-auto mx-auto brightness-0 invert opacity-90" 
              />
            </h1>
            
            <p className="font-serif text-sm md:text-xl tracking-[0.3em] mb-12 text-white/90 font-light">
              愛おしい瞬間を、永遠に。
            </p>
            
            <a 
              href="https://lifecastingtimecapsule.com/reservation"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex flex-col items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase">予約する</span>
              <span className="w-8 h-px bg-white/50 group-hover:w-16 transition-all duration-500"></span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- Introduction --- */}
      <section className="py-24 md:py-40 bg-[#FAFAF8] relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-[#C4A962] text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8 opacity-80">Philosophy</span>

            <h2 className="font-jp-serif text-2xl md:text-4xl text-[#2C2C2C] leading-loose mb-12 md:mb-16">
              私たちが売っているのは、<br />
              <span className="text-[#C4A962]">時間</span>と<span className="text-[#C4A962]">物語</span>です。
            </h2>

            <div className="space-y-8 text-[#4A4A4A] leading-[2.2] md:leading-[2.4] tracking-wide font-light text-[0.9rem] md:text-base">
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
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-32">
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
               <div className="aspect-[4/5] shadow-xl relative">
                  <img src={IMG_CONCEPT} alt="Plaster Art" className="w-full h-full object-cover grayscale-[5%]" />
               </div>
            </motion.div>

            <motion.div 
               className="md:w-1/2"
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              <span className="block text-[#C4A962] text-3xl md:text-5xl font-light italic mb-6 opacity-40 font-en-serif">
                01. Art Piece
              </span>

              <h3 className="font-jp-serif text-2xl md:text-3xl text-[#2C2C2C] mb-6 leading-relaxed">
                その指先も、柔らかな肌も。<br/>
                <span className="text-[#C4A962]">「アート」として昇華させる。</span>
              </h3>

              <div className="space-y-6 text-[#666666] leading-[2] tracking-wide font-light text-[0.9rem] md:text-base">
                <p>
                  血管の浮き立ち、爪の形、シワの一本一本まで。<br />
                  「LifeCasting®」が切り取るのは、二度と戻らない一瞬のリアルです。
                </p>
                <p>
                  すべての作品は、<strong className="font-medium text-[#555555]">美術教員免許を持つプロフェッショナルが監修</strong>。<br />
                  美術品レベルの厳格な品質基準のもと、専任アーティストが丁寧に磨き上げます。
                </p>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Feature 2: Material (素材) --- */}
      <section className="py-20 md:py-32 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-32">
            
            <motion.div 
              className="md:w-1/2 order-2 md:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="block text-[#C4A962] text-3xl md:text-5xl font-light italic mb-6 opacity-40 font-en-serif">
                02. Material
              </span>

              <h3 className="font-jp-serif text-2xl md:text-3xl text-[#2C2C2C] mb-6 leading-relaxed">
                「速さ」は、<br/>
                赤ちゃんへの優しさです。
              </h3>

              <div className="space-y-6 text-[#666666] leading-[2] tracking-wide font-light text-[0.9rem] md:text-base">
                <p>
                  じっとしていられない赤ちゃんにとって、<br/>
                  型取りの時間は少しでも短いほうがいい。
                </p>
                <p>
                  その想いから、私たちは<strong className="font-medium text-[#555555]">独自に研究し開発した素材</strong>を採用しました。<br/>
                  <span className="text-[10px] text-[#999999] tracking-wider block mt-1">（※特許申請中）</span>
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
              <div className="relative aspect-[4/5] bg-white p-3 shadow-lg">
                 <img src={image_a0354f462dd60a54ee83d6d005b657d7607d28c2} alt="Safe material" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Staff Section --- */}
      <section id="team" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl text-[#2C2C2C] mb-4 font-light italic font-en-serif">
              Professional
            </h2>
            <p className="font-jp-serif text-xs md:text-sm text-[#666666] tracking-widest">
              amoréttoを支える、3人のプロフェッショナル
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Staff 1 */}
            <motion.div 
              className="flex flex-col items-center text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-[80%] md:w-full aspect-[3/4] mb-6 overflow-hidden bg-[#FAFAF8] border border-[#E5E0D8]">
                <img src={IMG_STAFF_1} alt="Renan" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-[#C4A962] uppercase mb-2">Casting Artist</p>
                <h3 className="font-jp-serif text-xl text-[#2C2C2C] mb-1">型取り担当</h3>
                <p className="text-sm font-light text-[#999999] mb-4 tracking-wider">Renan</p>
                <p className="text-[0.85rem] leading-loose text-[#666666] font-light max-w-xs mx-auto">
                  独自に開発した安心安全素材で、業界No.1のスピードで赤ちゃんへの負担を最小限に型取りを行います。
                </p>
              </div>
            </motion.div>

            {/* Staff 2 */}
            <motion.div 
              className="flex flex-col items-center text-center group md:mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-[80%] md:w-full aspect-[3/4] mb-6 overflow-hidden bg-[#FAFAF8] border border-[#E5E0D8]">
                <img src={IMG_STAFF_2} alt="Mari" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-[#C4A962] uppercase mb-2">Photographer</p>
                <h3 className="font-jp-serif text-xl text-[#2C2C2C] mb-1">撮影担当</h3>
                <p className="text-sm font-light text-[#999999] mb-4 tracking-wider">Mari</p>
                <p className="text-[0.85rem] leading-loose text-[#666666] font-light max-w-xs mx-auto">
                  20年以上この業界で数千組の家族と向き合ってきたプロが、二度と訪れない今この瞬間の輝きを永遠に刻みます。
                </p>
              </div>
            </motion.div>

            {/* Staff 3 */}
            <motion.div 
              className="flex flex-col items-center text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-[80%] md:w-full aspect-[3/4] mb-6 overflow-hidden bg-[#FAFAF8] border border-[#E5E0D8]">
                <img src={IMG_STAFF_3} alt="Yayoi" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-[#C4A962] uppercase mb-2">Finishing Artist</p>
                <h3 className="font-jp-serif text-xl text-[#2C2C2C] mb-1">仕上げ担当</h3>
                <p className="text-sm font-light text-[#999999] mb-4 tracking-wider">Yayoi</p>
                <p className="text-[0.85rem] leading-loose text-[#666666] font-light max-w-xs mx-auto">
                  「わぁ、きれい」その言葉が聞きたくて。美術教員免許を持つ確かな技術で、世界一の仕上がりを目指しています。
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}