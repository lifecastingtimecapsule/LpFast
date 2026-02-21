import { motion } from "motion/react";
import { Helmet } from 'react-helmet-async';
import { Check, Star, Shield, AlertTriangle } from "lucide-react";
import { PLACEHOLDER_IMAGE } from "@/lib/placeholder";

const IMG_HERO = PLACEHOLDER_IMAGE;
const IMG_MESSAGE = "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export function School() {
  return (
    <>
      <Helmet>
        <title>School | amorétto - LifeCasting®認定講座・立体手形スクール｜豊川・浜松</title>
        <meta name="description" content="愛知・豊川と静岡・浜松で開講する日本唯一のLifeCasting®認定講座。立体手形・足形アート制作技術を学び、公式アーティストとして活動できます。商標権を持つ本格的な技術指導と開業サポート付き。ライフスタジオ豊川店・浜松店で受講可能。" />
        <link rel="canonical" href="https://www.lifecastingstudio-amoretto.com/school" />
        
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="amorétto | LifeCasting® Studio" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content="School | amorétto - LifeCasting®認定講座｜豊川・浜松" />
        <meta property="og:description" content="日本唯一のLifeCasting®認定講座。豊川・浜松の2拠点で立体手形アート制作技術を学び、公式アーティストとして活動できます。" />
        <meta property="og:url" content="https://www.lifecastingstudio-amoretto.com/school" />
        <meta property="og:image" content="https://www.lifecastingstudio-amoretto.com/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="School | amorétto - LifeCasting®認定講座｜豊川・浜松" />
        <meta name="twitter:description" content="日本唯一のLifeCasting®認定講座。豊川・浜松の2拠点で立体手形アート制作技術を学び、公式アーティストとして活動できます。" />
        <meta name="twitter:image" content="https://www.lifecastingstudio-amoretto.com/og-image.jpg" />
        
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
                  "item": "https://www.lifecastingstudio-amoretto.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "School",
                  "item": "https://www.lifecastingstudio-amoretto.com/school"
                }
              ]
            }
          `}
        </script>
        
        {/* 構造化データ: EducationalOrganization & Course */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "amorétto LifeCasting® School",
              "description": "日本唯一のLifeCasting®認定講座。立体手形・足形アート制作技術を学び、公式認定アーティストとして活動できます。",
              "url": "https://www.lifecastingstudio-amoretto.com/school",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "門前町15",
                "addressLocality": "豊川市",
                "addressRegion": "愛知県",
                "postalCode": "442-0037",
                "addressCountry": "JP"
              },
              "telephone": "0533-56-9494",
              "email": "lifecasting.timecapsule@gmail.com",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "LifeCasting®認定講座",
                "itemListElement": [
                  {
                    "@type": "Course",
                    "name": "LifeCasting®認定アーティスト養成講座",
                    "description": "立体手形・足形アート制作の全技術を習得し、商標使用権を得て公式アーティストとして活動できる認定講座。",
                    "provider": {
                      "@type": "Organization",
                      "name": "amorétto"
                    },
                    "coursePrerequisites": "なし（初心者歓迎）",
                    "educationalCredentialAwarded": "LifeCasting®認定アーティスト",
                    "hasCourseInstance": {
                      "@type": "CourseInstance",
                      "courseMode": "in-person",
                      "location": {
                        "@type": "Place",
                        "name": "amorétto Studio",
                        "address": {
                          "@type": "PostalAddress",
                          "addressLocality": "豊川市",
                          "addressRegion": "愛知県",
                          "addressCountry": "JP"
                        }
                      }
                    }
                  }
                ]
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
              "name": "School | amorétto - LifeCasting®認定講座・立体手形スクール",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", "h3"]
              },
              "url": "https://www.lifecastingstudio-amoretto.com/school",
              "inLanguage": "ja"
            }
          `}
        </script>
      </Helmet>

      {/* --- Hero Section --- */}
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-[#2C2C2C]">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src={IMG_HERO} 
            alt="amorétto LifeCasting®認定講座 - 立体手形アート制作技術を学ぶスクール" 
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="inline-block py-1 px-4 border border-white/30 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 md:mb-8 text-white/80 backdrop-blur-sm">
              LifeCasting™ School
            </span>
            <h1 className="text-4xl md:text-8xl italic font-light tracking-wide mb-4 md:mb-6 font-en-serif">
              Become an Artist.
            </h1>
            <p className="font-jp-serif text-base md:text-xl tracking-[0.2em] font-light opacity-90">
              技術を、受け継ぐ
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Message --- */}
      <section className="py-24 md:py-48 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-32">
            
            <motion.div 
              className="md:w-1/2 order-2 md:order-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-jp-serif text-2xl md:text-4xl text-[#2C2C2C] leading-relaxed mb-8 md:mb-10">
                私たちが教えるのは、<br/>
                単なる「型取り」ではありません。
              </h2>
              
              <div className="space-y-6 md:space-y-8 text-[#4A4A4A] leading-[2] md:leading-[2.4] tracking-wide font-light text-[0.9rem] md:text-base">
                <p>
                  amoréttoが育成したいのは、型取り屋ではなく、<br/>
                  <strong className="font-medium text-[#2C2C2C]">「時間」と「物語」を届けるアーティスト</strong>です。
                </p>
                <p>
                  赤ちゃんの手足という作品は、二度と戻らない「今」の象徴。<br/>
                  10年後、20年後に触れたとき、<br/>
                  あの日の温もりや、親が子に抱いた「甘くて少し苦い片想い」のような愛情を、<br/>
                  鮮明に呼び起こす装置でなければなりません。
                </p>
                <p>
                  技術の習得は、あくまでスタートライン。<br/>
                  最も大切なのは、家族の空気を整え、<br/>
                  幸せな「体験」を提供するプロとしての責任感です。
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
              <div className="aspect-[3/4] overflow-hidden bg-[#FAFAF8]">
                 <img 
                    src={IMG_MESSAGE} 
                    alt="LifeCasting®アーティストが立体手形を丁寧に仕上げる様子" 
                    className="w-full h-full object-cover grayscale-[20%]" 
                    loading="lazy"
                 />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- License & Warning --- */}
      <section className="py-24 md:py-32 bg-[#FAFAF8] relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <h2 className="font-jp-serif text-2xl md:text-4xl leading-relaxed mb-10 md:mb-12 text-[#2C2C2C]">
              日本で唯一。<br/>
              <span className="text-[#C4A962]">「LifeCasting®」</span>の商標を持つ<br className="md:hidden"/>認定講座。
            </h2>

            <div className="text-left bg-white border border-[#E5E0D8] p-8 md:p-12 shadow-sm rounded-sm">
              <div className="flex items-start gap-5 mb-8">
                <div className="shrink-0 p-3 bg-[#F5F3EF] rounded-full text-[#C4A962]">
                  <AlertTriangle size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-jp-serif text-lg md:text-xl mb-3 text-[#2C2C2C]">市場の8割は「無断使用」です。</h3>
                  <p className="text-[0.9rem] md:text-base text-[#666666] leading-[2.2] font-light">
                    現在、SNS等で「ライフキャスティング」とタグ付けされている投稿の多くは、残念ながら商標権を無視した無断使用であるのが実情です。<br/>
                    それらは技術や素材の安全基準が不透明なものも多く、お客様にとってもリスクとなり得ます。
                  </p>
                </div>
              </div>
              
              <div className="h-px w-full bg-[#E5E0D8] my-8"></div>

              <div className="space-y-4">
                 <h3 className="font-jp-serif text-lg md:text-xl text-center md:text-left mb-4 text-[#2C2C2C]">だからこそ、<span className="text-[#C4A962]">「本物」</span>であることに価値がある。</h3>
                 <p className="text-[0.9rem] md:text-base text-[#666666] leading-[2.2] font-light">
                   amoréttoは、日本における「LifeCasting®」の商標を正式に取得している唯一のブランドです。<br/>
                   当スクールを修了し、認定を受けたアーティストだけが、<br className="hidden md:block"/>
                   堂々とこの名称を掲げ、法的に守られた状態で活動することができます。<br/>
                   <br/>
                   偽物に埋もれない、選ばれる理由とプライドを、あなたに。
                 </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Curriculum --- */}
      <section className="py-24 md:py-48 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-6xl text-[#2C2C2C] italic font-light mb-4 md:mb-6 font-en-serif">
              Curriculum
            </h2>
            <p className="font-jp-serif text-xs md:text-sm text-[#666666] tracking-widest">
              完全初心者から、プロフェッショナルへ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            
            {/* Step 1 */}
            <div className="bg-[#FAFAF8] p-6 md:p-10 border-t-4 border-[#C4A962] flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
              <span className="text-[#C4A962] text-4xl md:text-5xl font-serif opacity-20 mb-4 md:mb-6 block">01</span>
              <h3 className="font-jp-serif text-lg md:text-xl text-[#2C2C2C] mb-4">基礎・入門</h3>
              <p className="text-[0.85rem] md:text-sm text-[#666666] font-light leading-[2] flex-grow">
                まずは足形の型取りから。<br/>
                素材の扱い方や、赤ちゃんの安全管理など、アーティストとしての土台となる基礎技術を習得します。
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAFAF8] p-6 md:p-10 border-t-4 border-[#2C2C2C] flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
              <span className="text-[#2C2C2C] text-4xl md:text-5xl font-serif opacity-20 mb-4 md:mb-6 block">02</span>
              <h3 className="font-jp-serif text-lg md:text-xl text-[#2C2C2C] mb-4">実践・理念</h3>
              <p className="text-[0.85rem] md:text-sm text-[#666666] font-light leading-[2] flex-grow">
                難易度の高い「手」の型取りや、独自素材の活用法をマスター。<br/>
                さらに、助師監修の知識やブランド理念を学び、技術に「心」を吹き込みます。
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAFAF8] p-6 md:p-10 border-t-4 border-[#C4A962] flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
              <span className="text-[#C4A962] text-4xl md:text-5xl font-serif opacity-20 mb-4 md:mb-6 block">03</span>
              <h3 className="font-jp-serif text-lg md:text-xl text-[#2C2C2C] mb-4">プロ認定</h3>
              <p className="text-[0.85rem] md:text-sm text-[#666666] font-light leading-[2] flex-grow">
                実店舗での現場研修と実技テスト。<br/>
                実際の空気を肌で感じ、お客様に感動を届けるプロフェッショナルとしての最終仕上げを行います。
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- Support --- */}
      <section className="py-24 md:py-48 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl text-[#2C2C2C] italic font-light mb-4 md:mb-6 font-en-serif">
              Support
            </h2>
            <p className="font-jp-serif text-xs md:text-sm text-[#666666] tracking-widest">
              卒業後の活動支援
            </p>
          </div>

          <div className="bg-white border border-[#E5E0D8] p-6 md:p-16">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Star size={20} className="text-[#C4A962]" />
                  <h3 className="font-jp-serif text-xl md:text-2xl text-[#2C2C2C]">活動支援</h3>
                </div>
                <ul className="space-y-4 md:space-y-6 text-[0.85rem] md:text-sm text-[#666666] font-light leading-relaxed">
                  <li className="flex items-center justify-center gap-3 md:gap-4">
                    <Check size={18} className="text-[#C4A962] shrink-0" />
                    <span>商標<strong>「ライフキャスティング®」</strong>の公式使用権</span>
                  </li>
                  <li className="flex items-center justify-center gap-3 md:gap-4">
                    <Check size={18} className="text-[#C4A962] shrink-0" />
                    <span><strong>独自開発素材</strong>を<span className="text-[#C4A962] font-medium">スクール生特別価格（卸値）</span>で購入可能</span>
                  </li>
                  <li className="flex items-center justify-center gap-3 md:gap-4">
                    <Check size={18} className="text-[#C4A962] shrink-0" />
                    <span>活動に必要な<strong>LP（ランディングページ）</strong>の制作支援</span>
                  </li>
                  <li className="flex items-center justify-center gap-3 md:gap-4">
                    <Check size={18} className="text-[#C4A962] shrink-0" />
                    <span>認定アーティスト限定コミュニティ・勉強会への参加</span>
                  </li>
                </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 md:mt-24 text-center">
            <p className="text-xs md:text-sm text-[#666666] mb-6 md:mb-8 tracking-widest">
              まずは無料相談会へお越しください。
            </p>
            <a
              href="https://lin.ee/siRIzsZ" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-3 md:px-12 md:py-4 bg-[#2C2C2C] text-white tracking-[0.2em] shadow-xl hover:bg-[#444] hover:-translate-y-1 transition-all duration-300 text-[10px] md:text-xs uppercase font-medium"
            >
              Contact Us
            </a>
          </div>

        </div>
      </section>
    </>
  );
}