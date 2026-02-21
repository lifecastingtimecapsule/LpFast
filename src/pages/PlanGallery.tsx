import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Helmet } from 'react-helmet-async';
import { Camera } from "lucide-react";

// Import images
import image_basic from "../assets/869102067ce8235d121d1e72efdd989be969f734.png";
import image_with_photo_new from "../assets/1986fa6511a700ac3e4eeb46a728feea3d8ff040.png";
import image_gallery_0 from "../assets/96363315c6e81ea319cebace631d308b4c40d1f7.png";
import image_gallery_1 from "../assets/b249142c3b0afcc8d91208afed6a8e291cdb4144.png";
import image_gallery_2 from "../assets/d3aa16a948f66f2158eb7316e75d2a1c2732968e.png";
import image_gallery_3 from "../assets/92a2101c1f75310484352570d56526aa7857c259.png";

export function PlanGallery() {
  
  const galleryImages = [
    { src: image_gallery_0, alt: "シルバー仕上げの赤ちゃん立体足形アート - amorétto作品" },
    { src: image_gallery_1, alt: "赤ちゃんと立体手形アート - 出産祝いギフト" },
    { src: image_gallery_2, alt: "額装された立体手形・足形アート - 産後ギフト" },
    { src: image_gallery_3, alt: "赤ちゃんの成長を記録する立体足形 - LifeCasting®作品" }
  ];

  return (
    <>
      <Helmet>
        <title>立体手形の料金・プラン｜amorétto 産後ギフト - 愛知県・浜松</title>
        <meta name="description" content="amoréttoの立体手形・足形アート料金プランと作品ギャラリー。ライフスタジオ豊川店・浜松店の2拠点で型取り可能。出産祝いや産後ギフトに最適な、写真付き・写真なしの2プランをご用意。美術教員免許保持者が丁寧に制作します。" />
        <link rel="canonical" href="https://www.lifecastingstudio-amoretto.com/plan-gallery" />
        
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="amorétto | LifeCasting® Studio" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content="立体手形の料金・プラン｜amorétto 産後ギフト - 愛知県・浜松" />
        <meta property="og:description" content="立体手形・足形アートの料金プランと作品ギャラリー。ライフスタジオ豊川店・浜松店で型取り可能。写真付き・写真なしの2プランから選べます。" />
        <meta property="og:url" content="https://www.lifecastingstudio-amoretto.com/plan-gallery" />
        <meta property="og:image" content="https://www.lifecastingstudio-amoretto.com/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="立体手形の料金・プラン｜amorétto - 愛知県・浜松" />
        <meta name="twitter:description" content="立体手形・足形アートの料金プランと作品ギャラリー。ライフスタジオ豊川店・浜松店で型取り可能。写真付き・写真なしの2プランから選べます。" />
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
                  "name": "Plan & Gallery",
                  "item": "https://www.lifecastingstudio-amoretto.com/plan-gallery"
                }
              ]
            }
          `}
        </script>
        
        {/* 構造化データ: 商品情報（amorétto Collection） */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "amorétto Collection - 立体手形アート（写真なし）",
              "image": "https://www.lifecastingstudio-amoretto.com/assets/plan-basic.jpg",
              "description": "シンプルだからこそ、その造形の美しさが際立つスタンダードモデル。ゴールドまたはシルバーの繊細な塗装仕上げで、インテリアに上品な輝きを添えます。出産祝いや産後ギフトに最適です。",
              "brand": {
                "@type": "Brand",
                "name": "amorétto"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "name": "2 pieces (手足2点)",
                  "price": "38500",
                  "priceCurrency": "JPY",
                  "availability": "https://schema.org/InStock",
                  "url": "https://www.lifecastingstudio-amoretto.com/plan-gallery"
                },
                {
                  "@type": "Offer",
                  "name": "4 pieces (手足4点)",
                  "price": "49500",
                  "priceCurrency": "JPY",
                  "availability": "https://schema.org/InStock",
                  "url": "https://www.lifecastingstudio-amoretto.com/plan-gallery"
                }
              ],
              "category": "立体手形・立体足型アート"
            }
          `}
        </script>
        
        {/* 構造化データ: 商品情報（Premium Foto Collection） */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Premium Foto Collection - 立体手形アート（写真付き）",
              "image": "https://www.lifecastingstudio-amoretto.com/assets/plan-premium.jpg",
              "description": "お気に入りの一枚を、立体手形・立体足型と一緒に額装できるプラン。重厚感のある特注フレームに、お子様のお名前や生年月日を刻印。出産祝いや家宝として最適な産後ギフトです。",
              "brand": {
                "@type": "Brand",
                "name": "amorétto"
              },
              "offers": {
                "@type": "Offer",
                "name": "Complete set",
                "price": "52800",
                "priceCurrency": "JPY",
                "availability": "https://schema.org/InStock",
                "url": "https://www.lifecastingstudio-amoretto.com/plan-gallery",
                "priceValidUntil": "2026-12-31"
              },
              "category": "立体手形・立体足型アート"
            }
          `}
        </script>

        {/* 構造化データ: FAQPage */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "何歳から型取りができますか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "何歳からでも可能です。これまでの最年少実績は生後14日の赤ちゃんです。新生児特有の小ささを残したい場合は、生後1ヶ月以内のご来店をおすすめしております。ライフスタジオ豊川店・浜松店どちらでも型取りが可能です。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "赤ちゃんが泣いても大丈夫ですか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "問題ありません。スタッフは赤ちゃんの扱いに慣れておりますし、型取り自体は90秒という短時間で完了するため、泣いている間でもスムーズに行えます。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "肌荒れが心配です。",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "歯科医療で使用される、海藻由来の安全な素材を使用しています。水で簡単に洗い流せ、肌への刺激は極めて少ないものです。ご心配な方はパッチテストも可能です。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "豊川店と浜松店でプランや料金は同じですか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "はい、ライフスタジオ豊川店（愛知県豊川市）・浜松店（静岡県浜松市）ともに同じプラン・料金でご利用いただけます。amorétto Collectionプラン（写真なし）とPremium Foto Collectionプラン（写真付き）からお選びいただけます。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "駐車場はありますか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "浜松店は店舗前に駐車場をご用意しております。豊川店は提携している近隣の駐車場をご案内いたしますので、ご予約時にお車でお越しの旨をお伝えください。"
                  }
                }
              ]
            }
          `}
        </script>

        {/* 構造化データ: Speakable WebPage */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Plan & Gallery | amorétto - 立体手形プラン・料金・産後ギフト｜愛知県・浜松",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", "h3", ".speakable"]
              },
              "url": "https://www.lifecastingstudio-amoretto.com/plan-gallery",
              "inLanguage": "ja"
            }
          `}
        </script>
      </Helmet>

      {/* --- Hero / Intro --- */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-8xl text-[#2C2C2C] italic font-light tracking-wide mb-4 font-en-serif">
              Plan & Gift
            </h1>
            <p className="text-[10px] md:text-sm text-[#999999] tracking-[0.3em] uppercase mb-12 md:mb-16">
              立体手形プラン・産後ギフト
            </p>
            
            <p className="text-[0.9rem] md:text-[1.1rem] leading-loose text-[#666666] tracking-wide max-w-2xl mx-auto">
              かけがえのない瞬間を、立体手形/立体足型という最適なカタチで。<br />
              写真は「姿」を、私たちは「存在」を残します。
            </p>
            <p className="speakable text-xs md:text-sm text-[#999999] mt-4 tracking-wide">
              ライフスタジオ豊川店・浜松店の2拠点で型取りが可能です
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Product Plans --- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-24 md:space-y-40">
            
            {/* Plan 1: amorétto Collection (No Photo) */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-24 group">
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-square overflow-hidden bg-[#F5F3EF] shadow-xl relative">
                   <img
                      src={image_basic}
                      alt="amorétto Collection - 写真なし立体手形アート スタンダードプラン"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                   />
                   <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/40 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs tracking-widest uppercase text-[#C4A962] rounded-full bg-[rgba(255,255,255,0.9)]">
                      No Photo
                   </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl md:text-4xl text-[#2C2C2C] mb-2 md:mb-3 font-jp-serif">amorétto Collection</h3>
                <p className="text-[10px] md:text-xs text-[#C4A962] tracking-[0.2em] uppercase mb-6 md:mb-8">初めて触れた、あの日をDesignする</p>
                
                <div className="text-[#666666] leading-loose mb-8 md:mb-10 text-[0.85rem] md:text-sm font-light">
                  <p className="mb-4">
                    シンプルだからこそ、その造形の美しさが際立つスタンダードモデル。<br/>
                    ゴールドまたはシルバーの繊細な塗装仕上げで、インテリアに上品な輝きを添えます。
                  </p>
                  <p className="text-[10px] md:text-xs text-[#999999] tracking-wider bg-[#FAFAF8] p-3 border-l-2 border-[#E5E0D8]">
                    <strong>【写真なしタイプ】</strong> 手足の立体手形（キャスト）のみを額装するプランです。<br/>
                    純粋に「形」のアートを楽しみたい方におすすめです。
                  </p>
                </div>

                <div className="space-y-4 md:space-y-6 border-t border-b border-[#E5E0D8] py-6 md:py-8 mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#4A4A4A] tracking-wide text-sm md:text-base">2 pieces (手足2点)</span>
                    <span className="font-en-serif text-lg md:text-xl text-[#2C2C2C]">¥35,000<span className="text-xs ml-1">+TAX</span></span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#4A4A4A] tracking-wide text-sm md:text-base">4 pieces (手足4点)</span>
                    <span className="font-en-serif text-lg md:text-xl text-[#2C2C2C]">¥45,000<span className="text-xs ml-1">+TAX</span></span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Plan 2: Premium Foto Collection (With Photo) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-24 group">
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative aspect-square">
                   <div className="w-full h-full shadow-xl overflow-hidden bg-[#F5F3EF] relative">
                      <img
                         src={image_with_photo_new}
                         alt="Premium Foto Collection - 写真付き立体手形アート 額装プラン"
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                         loading="lazy"
                      />
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/40 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs tracking-widest uppercase text-[#C4A962] rounded-full bg-[rgba(255,255,255,0.9)]">
                        With Photo
                      </div>
                   </div>
                   
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl md:text-4xl text-[#2C2C2C] mb-2 md:mb-3 font-jp-serif">Premium Foto Collection</h3>
                <p className="text-[10px] md:text-xs text-[#C4A962] tracking-[0.2em] uppercase mb-8">温もりと共に残す、家族のものがたり</p>
                
                <div className="text-[#666666] leading-loose mb-10 text-[0.85rem] md:text-sm font-light">
                  <p className="mb-6">
                    お気に入りの一枚を、立体手形/立体足型（キャスト）と一緒に額装できるプランです。<br/>
                    重厚感のある特注フレームに、お子様のお名前や生年月日を刻印。<br/>
                    出産祝いなどの「家宝」としてお仕立てします。
                  </p>
                  
                  {/* 通常価格 */}
                  <div className="flex justify-between items-baseline border-b border-[#E5E0D8] pb-4 mb-6">
                    <span className="text-[#4A4A4A] tracking-wide text-sm md:text-base">Complete set</span>
                    <div className="text-right">
                       <span className="block text-[10px] text-[#999999] line-through mb-1">¥50,000+TAX</span>
                       <span className="font-en-serif text-lg md:text-xl text-[#2C2C2C]">¥48,000<span className="text-xs ml-1 text-[#2C2C2C]">+TAX</span></span>
                    </div>
                  </div>

                  {/* ライフスタジオ コラボ価格 */}
                  <div className="relative bg-gradient-to-br from-[#FAFAF8] to-[#F5F3EF] p-5 md:p-6 rounded-sm border border-[#C4A962]/30">
                    <div className="absolute -top-3 -left-3 bg-[#C4A962] text-white text-[9px] md:text-[10px] px-3 py-1 tracking-widest">
                      SPECIAL PRICE
                    </div>
                    <h4 className="flex items-center gap-2 font-serif text-base md:text-lg text-[#2C2C2C] mb-2">
                      <Camera size={16} className="text-[#C4A962]" />
                      amorétto × Life Studio
                    </h4>
                    <p className="text-[10px] md:text-xs text-[#666666] leading-relaxed mb-3">
                      ライフスタジオ<strong>豊川店</strong>・<strong>浜松店</strong>で撮影された方だけの特別優待。<br/>
                      プロの撮影データを使用して、お得にこのプランをご利用いただけます。
                    </p>
                    <div className="flex items-end gap-2">
                        <span className="text-[10px] md:text-xs text-[#999999] mb-1">コラボ特別価格</span>
                        <span className="font-en-serif text-xl md:text-2xl text-[#C4A962]">¥20,000〜<span className="text-[10px] md:text-xs text-[#666666] ml-1">+TAX</span></span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Gallery --- */}
      <section className="py-20 md:py-32 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl text-[#2C2C2C] italic font-light mb-4 font-en-serif">
              Gallery
            </h2>
            <div className="h-px w-12 bg-[#C4A962] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {galleryImages.map((img, idx) => (
              <motion.div 
                key={idx} 
                className="aspect-[3/4] overflow-hidden group relative bg-white shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                 <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                 />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Process Section --- */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl text-[#2C2C2C] italic font-light mb-4 font-en-serif">
              Process
            </h2>
            <p className="text-[10px] md:text-xs text-[#999999] tracking-widest uppercase">制作の流れ</p>
          </div>

          <div className="relative border-l border-[#D4C5B0] ml-3 md:ml-0 md:pl-10 space-y-12 md:space-y-16">
            <div className="relative pl-8 md:pl-0">
              <span className="absolute -left-[32px] md:-left-[55px] top-0 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-[#C4A962] text-white rounded-full font-serif text-sm shadow-sm">1</span>
              <div className="md:flex gap-10 items-start">
                <div className="md:w-1/3 mb-3 md:mb-0">
                  <h3 className="font-jp-serif text-lg md:text-xl text-[#2C2C2C] mb-1 md:mb-2">ご来店・型取り</h3>
                  <p className="text-[10px] md:text-xs text-[#C4A962] tracking-wider uppercase">Counseling & Casting</p>
                </div>
                <div className="md:w-2/3">
                  <p className="text-[#666666] leading-loose text-[0.85rem] md:text-sm font-light">
                    デザインのご相談後、独自開発の素材で型取りを行います。<br/>
                    所要時間はわずか90秒。お子様のご機嫌に合わせて進めます。
                  </p>
                  <p className="mt-2 text-[10px] text-[#999999]">所要時間：約30分</p>
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div className="relative pl-8 md:pl-0">
              <span className="absolute -left-[32px] md:-left-[55px] top-0 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-[#C4A962] text-white rounded-full font-serif text-sm shadow-sm">2</span>
              <div className="md:flex gap-10 items-start">
                <div className="md:w-1/3 mb-3 md:mb-0">
                  <h3 className="font-jp-serif text-lg md:text-xl text-[#2C2C2C] mb-1 md:mb-2">制作・仕上げ</h3>
                  <p className="text-[10px] md:text-xs text-[#C4A962] tracking-wider uppercase">Creation</p>
                </div>
                <div className="md:w-2/3">
                  <p className="text-[#666666] leading-loose text-[0.85rem] md:text-sm font-light">
                    工房にて、熟練の職人が手作業で制作に入ります。<br/>
                    美術品レベルの品質基準で、指紋やシワまで忠実に再現します。
                  </p>
                  <p className="mt-2 text-[10px] text-[#999999]">制作期間：約4週間</p>
                </div>
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative pl-8 md:pl-0">
              <span className="absolute -left-[32px] md:-left-[55px] top-0 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-[#C4A962] text-white rounded-full font-serif text-sm shadow-sm">3</span>
              <div className="md:flex gap-10 items-start">
                <div className="md:w-1/3 mb-3 md:mb-0">
                  <h3 className="font-jp-serif text-lg md:text-xl text-[#2C2C2C] mb-1 md:mb-2">完成・お渡し</h3>
                  <p className="text-[10px] md:text-xs text-[#C4A962] tracking-wider uppercase">Completion</p>
                </div>
                <div className="md:w-2/3">
                  <p className="text-[#666666] leading-loose text-[0.85rem] md:text-sm font-light">
                    専用ボックスに収めてお渡しします。<br/>
                    配送、または店頭での受け取りをお選びいただけます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="py-20 md:py-32 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-3xl pb-12 md:pb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-[#2C2C2C] italic font-light mb-4 font-en-serif">
              Q&A
            </h2>
            <p className="text-[10px] md:text-xs text-[#999999] tracking-widest uppercase">よくあるご質問</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
             {[
               { q: "何歳から型取りができますか？", a: "何歳からでも可能です。これまでの最年少実績は生後14日の赤ちゃんです。新生児特有の小ささを残したい場合は、生後1ヶ月以内のご来店をおすすめしております。ライフスタジオ豊川店・浜松店どちらでも型取りが可能です。" },
               { q: "赤ちゃんが泣いても大丈夫ですか？", a: "問題ありません。スタッフは赤ちゃんの扱いに慣れておりますし、型取り自体は90秒という短時間で完了するため、泣いている間でもスムーズに行えます。" },
               { q: "肌荒れが心配です。", a: "歯科医療で使用される、海藻由来の安全な素材を使用しています。水で簡単に洗い流せ、肌への刺激は極めて少ないものです。ご心配な方はパッチテストも可能です。" },
               { q: "豊川店と浜松店でプランや料金は同じですか？", a: "はい、ライフスタジオ豊川店・浜松店ともに同じプラン・料金でご利用いただけます。amorétto Collectionプラン（写真なし）とPremium Foto Collectionプラン（写真付き）からお選びいただけます。" },
               { q: "駐車場はありますか？", a: "浜松店は店舗前に駐車場をご用意しております。豊川店は提携している近隣の駐車場をご案内いたしますので、ご予約時にお車でお越しの旨をお伝えください。" }
             ].map((item, i) => (
               <AccordionItem key={i} value={`item-${i}`} className="border border-[#E5E0D8] rounded-lg px-4 md:px-6 bg-white last:border-b">
                 <AccordionTrigger className="text-[0.9rem] md:text-[0.95rem] text-[#2C2C2C] font-medium py-4 md:py-5 hover:no-underline hover:text-[#C4A962] transition-colors text-left">
                   <span className="text-[#C4A962] mr-3 md:mr-4 font-serif italic">Q.</span>
                   {item.q}
                 </AccordionTrigger>
                 <AccordionContent className="text-[#666666] leading-[1.8] md:leading-[2] pb-6 pl-6 md:pl-8 text-[0.85rem] md:text-sm font-light">
                   {item.a}
                 </AccordionContent>
               </AccordionItem>
             ))}
          </Accordion>
        </div>
      </section>


    </>
  );
}
