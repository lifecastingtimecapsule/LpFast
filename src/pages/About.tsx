import { motion } from "motion/react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";

// 立体手形（1枚目）・アーティスト（2枚目）：写真が見当たらない場合は空白で表示。
// 実画像を使う場合は src/assets/ に 9a3380d762d79add87cdd15a8bdf00ca60691e39.png を置き、
// 下の import を有効にして IMG_HANDS に差し替えてください。
// import image_hands from 'figma:asset/9a3380d762d79add87cdd15a8bdf00ca60691e39.png';
const IMG_HANDS = ''; // 立体手形用。ファイルを置いたら import に差し替え
const IMG_ARTIST = ''; // アーティスト写真は未所持のため空白

export function About() {
  return (
    <>
      <Helmet>
        <title>About | amorétto - 私たちの想い｜立体手形アート</title>
        <meta name="description" content="amoréttoのブランドストーリー。愛知・豊川のLifeCasting®専門スタジオが大切にしている想いと、立体手形・産後ギフト制作への情熱をご紹介します。" />
        <link rel="canonical" href="https://lifecastingtimecapsule.com/about" />
        
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="amorétto | LifeCasting® Studio" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content="About | amorétto - 私たちの想い" />
        <meta property="og:description" content="amoréttoのブランドストーリー。記憶を形にする、立体手形アートへの想い。" />
        <meta property="og:url" content="https://lifecastingtimecapsule.com/about" />
        <meta property="og:image" content="https://lifecastingtimecapsule.com/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About | amorétto - 私たちの想い" />
        <meta name="twitter:description" content="amoréttoのブランドストーリー。記憶を形にする、立体手形アートへの想い。" />
        <meta name="twitter:image" content="https://lifecastingtimecapsule.com/og-image.jpg" />
        
        {/* 構造化データ: BreadcrumbList */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "ホーム",
                  "item": "https://lifecastingtimecapsule.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "About",
                  "item": "https://lifecastingtimecapsule.com/about"
                }
              ]
            }
          `}
        </script>
        
        {/* 構造化データ: AboutPage */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About amorétto",
              "description": "amoréttoのブランドストーリー。赤ちゃんの「今」を立体手形・足形アートとして残し、産後ギフトとして家族の大切な記憶を形にする想いをご紹介。",
              "url": "https://lifecastingtimecapsule.com/about",
              "mainEntity": {
                "@type": "Organization",
                "name": "amorétto",
                "url": "https://lifecastingtimecapsule.com/",
                "logo": "https://lifecastingtimecapsule.com/og-image.jpg",
                "description": "愛知・豊川のLifeCasting®専門スタジオ。立体手形・足形アート制作。",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "門前町15",
                  "addressLocality": "豊川市",
                  "addressRegion": "愛知県",
                  "postalCode": "442-0037",
                  "addressCountry": "JP"
                }
              }
            }
          `}
        </script>

        {/* 構造化データ: Speakable WebPage */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "About | amorétto - 私たちの想い｜立体手形アート",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", "h3"]
              },
              "url": "https://lifecastingtimecapsule.com/about",
              "inLanguage": "ja"
            }
          `}
        </script>
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
              <div className="mb-16 md:mb-20">
                <h1 className="text-5xl md:text-8xl text-[#2C2C2C] italic font-light tracking-wide mb-4 font-en-serif">
                  About
                </h1>
                <p className="text-[10px] md:text-sm text-[#999999] tracking-[0.3em] uppercase">
                  私たちの想い
                </p>
              </div>
          
              <h2 className="font-jp-serif text-2xl md:text-4xl text-[#2C2C2C] leading-relaxed mb-10 md:mb-12 font-light">
                記憶は、いつか<br/>
                輪郭を失ってしまうから。
              </h2>

              <div className="space-y-8 text-[#4A4A4A] leading-[2.2] md:leading-[2.6] tracking-wide font-light text-[0.9rem] md:text-lg text-justify md:text-center">
                <p>
                  赤ちゃんを抱っこした時の、あの重み。<br className="hidden md:block"/>
                  指を握り返してくれる、柔らかな力強さ。<br className="hidden md:block"/>
                  そのすべてが、親御さんにとっては奇跡の連続です。
                </p>
                <p>
                  けれど、子供の成長はあまりに早く、<br className="hidden md:block"/>
                  昨日できなかったことが今日できるようになり、<br className="hidden md:block"/>
                  今日抱きしめたその小ささは、明日にはもう過去のものになります。
                </p>
                <p>
                  写真は「姿」を鮮明に残してくれます。<br className="hidden md:block"/>
                  でも、私たちが残したいのは、<br className="hidden md:block"/>
                  そこに確かな命があったという「存在感」そのものです。
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- 02. The Visual (Image) --- */}
        <section className="pb-20 md:pb-32 px-6">
           <div className="container mx-auto max-w-5xl">
              <motion.div 
                className="aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-[#FAFAF8]"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                 {IMG_HANDS ? (
                   <img 
                      src={IMG_HANDS} 
                      alt="家族の手を重ねた立体手形アート - amoréttoの作品" 
                      className="w-full h-full object-cover grayscale-[10%]" 
                      loading="lazy"
                   />
                 ) : (
                   <div className="w-full h-full" aria-hidden />
                 )}
              </motion.div>
           </div>
        </section>

        {/* --- 03. The Commitment (Material & Art) --- */}
        <section className="py-20 md:py-32 bg-[#FAFAF8]">
           <div className="container mx-auto px-6 max-w-6xl">
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-32">
                 
                 <div className="md:w-1/2 order-2 md:order-1">
                    <motion.div
                       initial={{ opacity: 0, x: -30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8 }}
                    >
                       <span className="block text-[#C4A962] text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 font-medium">
                          Our Commitment
                       </span>
                       <h3 className="font-jp-serif text-2xl md:text-3xl text-[#2C2C2C] leading-relaxed mb-6 md:mb-8">
                          「美しさ」への執着は、<br/>
                          「愛おしさ」への敬意。
                       </h3>
                       <div className="space-y-6 text-[#4A4A4A] leading-[2] md:leading-[2.4] tracking-wide font-light text-[0.9rem] md:text-[0.95rem] text-justify md:text-left">
                          <p>
                             amoréttoは、ただ形を取るだけの場所ではありません。<br className="hidden md:block"/>
                             私たちが目指すのは、美術館に飾られる彫刻のような「アート」です。
                          </p>
                          <p>
                             赤ちゃんのために独自開発した、魔法のような素材。<br className="hidden md:block"/>
                             美術教員免許を持つプロフェッショナルによる監修。<br className="hidden md:block"/>
                             0.1mmの気泡さえ許さない、徹底した仕上げ。
                          </p>
                          <p>
                             そのすべてのこだわりは、<br className="hidden md:block"/>
                             かけがえのない「今」を、最も美しい形で未来へ届けるためです。
                          </p>
                       </div>
                    </motion.div>
                 </div>

                 <div className="md:w-1/2 relative order-1 md:order-2">
                    <motion.div
                       initial={{ opacity: 0, x: 30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8, delay: 0.2 }}
                       className="aspect-square md:aspect-square overflow-hidden bg-white p-3 md:p-4 shadow-xl"
                    >
                       {IMG_ARTIST ? (
                         <img 
                            src={IMG_ARTIST} 
                            alt="amoréttoアーティストが立体手形を丁寧に仕上げる制作風景" 
                            className="w-full h-full object-cover" 
                            loading="lazy"
                         />
                       ) : (
                         <div className="w-full h-full bg-[#FAFAF8]" aria-hidden />
                       )}
                    </motion.div>
                 </div>

              </div>
           </div>
        </section>

        {/* --- 04. Message (Closing) --- */}
        <section className="py-24 md:py-48 bg-white text-center">
           <div className="container mx-auto px-6 max-w-3xl">
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
              >
                 <p className="font-en-serif text-2xl md:text-4xl text-[#2C2C2C] italic mb-8 md:mb-10 font-light">
                    “Your Love, Eternalized.”
                 </p>
                 <p className="text-[#666666] leading-loose text-xs md:text-sm font-light mb-12 md:mb-16">
                    いつか、大きくなったお子様と。<br/>
                    この小さな手を見て、語り合える日が来ますように。
                 </p>
                 
                 <Link 
                   to="/plan-gallery" 
                   aria-label="撮影プランと作品ギャラリーを見る"
                   className="inline-block px-10 py-3 md:px-12 md:py-4 bg-[#2C2C2C] text-white tracking-[0.2em] hover:bg-[#444] transition-colors text-[10px] md:text-xs uppercase"
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