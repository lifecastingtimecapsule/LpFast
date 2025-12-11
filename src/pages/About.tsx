import image_64ecf4b89ba86abb64e7b70055c5a78e62299b8b from 'figma:asset/64ecf4b89ba86abb64e7b70055c5a78e62299b8b.png';
import image_9a3380d762d79add87cdd15a8bdf00ca60691e39 from 'figma:asset/9a3380d762d79add87cdd15a8bdf00ca60691e39.png';
import image_284dd24834c7502bfef135fb40ebd48f7178ea28 from 'figma:asset/284dd24834c7502bfef135fb40ebd48f7178ea28.png';
import { motion } from "motion/react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import image_material from 'figma:asset/a0354f462dd60a54ee83d6d005b657d7607d28c2.png';

// 画像素材（Homeと同じトーンのものを使用）
const IMG_HANDS = image_9a3380d762d79add87cdd15a8bdf00ca60691e39;
const IMG_ARTIST = image_64ecf4b89ba86abb64e7b70055c5a78e62299b8b;

export function About() {
  return (
    <>
      <Helmet>
        <title>Our Story | amorétto</title>
        <meta name="description" content="amoréttoのブランドストーリー。私たちが大切にしている想いと約束。" />
      </Helmet>

      <div className="bg-white">
        
        {/* --- 01. Title & Introduction --- */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="mb-20">
                <h1 className="text-6xl md:text-8xl text-[#2C2C2C] italic font-light tracking-wide mb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  About
                </h1>
                <p className="text-xs md:text-sm text-[#999999] tracking-[0.3em] uppercase">
                  私たちの想い
                </p>
              </div>
          
              <h2 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] leading-relaxed mb-12 font-light">
                記憶は、いつか<br/>
                輪郭を失ってしまうから。
              </h2>

              <div className="space-y-8 text-[#4A4A4A] leading-[2.6] tracking-wide font-light text-[0.95rem] md:text-lg">
                <p>
                  赤ちゃんを抱っこした時の、あの重み。<br/>
                  指を握り返してくれる、柔らかな力強さ。<br/>
                  そのすべてが、親御さんにとっては奇跡の連続です。
                </p>
                <p>
                  けれど、子供の成長はあまりに早く、<br/>
                  昨日できなかったことが今日できるようになり、<br/>
                  今日抱きしめたその小ささは、明日にはもう過去のものになります。
                </p>
                <p>
                  写真は「姿」を鮮明に残してくれます。<br/>
                  でも、私たちが残したいのは、<br/>
                  そこに確かな命があったという「存在感」そのものです。
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- 02. The Visual (Image) --- */}
        <section className="pb-24 md:pb-32 px-6">
           <div className="container mx-auto max-w-5xl">
              <motion.div 
                className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#FAFAF8]"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                 <img 
                    src={IMG_HANDS} 
                    alt="Family Hands" 
                    className="w-full h-full object-cover grayscale-[10%]" 
                 />
              </motion.div>
           </div>
        </section>

        {/* --- 03. The Commitment (Material & Art) --- */}
        <section className="py-24 md:py-32 bg-[#FAFAF8]">
           <div className="container mx-auto px-6 max-w-6xl">
              <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32">
                 
                 <div className="md:w-1/2">
                    <motion.div
                       initial={{ opacity: 0, x: -30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8 }}
                    >
                       <span className="block text-[#C4A962] text-xs tracking-[0.2em] uppercase mb-6 font-medium">
                          Our Commitment
                       </span>
                       <h3 className="font-serif text-3xl text-[#2C2C2C] leading-relaxed mb-8">
                          「美しさ」への執着は、<br/>
                          「愛おしさ」への敬意。
                       </h3>
                       <div className="space-y-6 text-[#4A4A4A] leading-[2.4] tracking-wide font-light text-[0.95rem]">
                          <p>
                             amoréttoは、ただ形を取るだけの場所ではありません。<br/>
                             私たちが目指すのは、美術館に飾られる彫刻のような「アート」です。
                          </p>
                          <p>
                             赤ちゃんのために独自開発した、魔法のような素材。<br/>
                             美術教員免許を持つプロフェッショナルによる監修。<br/>
                             0.1mmの気泡さえ許さない、徹底した仕上げ。
                          </p>
                          <p>
                             そのすべてのこだわりは、<br/>
                             かけがえのない「今」を、最も美しい形で未来へ届けるためです。
                          </p>
                       </div>
                    </motion.div>
                 </div>

                 <div className="md:w-1/2 relative">
                    <motion.div
                       initial={{ opacity: 0, x: 30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8, delay: 0.2 }}
                       className="aspect-[4/5] md:aspect-square overflow-hidden bg-white p-4 shadow-xl"
                    >
                       <img 
                          src={IMG_ARTIST} 
                          alt="Artist working" 
                          className="w-full h-full object-cover" 
                       />
                    </motion.div>
                 </div>

              </div>
           </div>
        </section>

        {/* --- 04. Message (Closing) --- */}
        <section className="py-32 md:py-48 bg-white text-center">
           <div className="container mx-auto px-6 max-w-3xl">
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
              >
                 <p className="font-serif text-lg md:text-xl text-[#2C2C2C] italic mb-10">
                    “Your Love, Eternalized.”
                 </p>
                 <p className="text-[#666666] leading-loose text-sm font-light mb-16">
                    いつか、大きくなったお子様と。<br/>
                    この小さな手を見て、語り合える日が来ますように。
                 </p>
                 
                 <Link 
                   to="/plan-gallery" 
                   className="inline-block px-12 py-4 bg-[#2C2C2C] text-white tracking-[0.2em] hover:bg-[#444] transition-colors text-xs uppercase"
                 >
                   View Plans
                 </Link>
              </motion.div>
           </div>
        </section>

      </div>
    </>
  );
}