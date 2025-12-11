import image_3f278eecc36eef79470171f39dc14006cf0e9cb9 from 'figma:asset/3f278eecc36eef79470171f39dc14006cf0e9cb9.png';
import image_1986fa6511a700ac3e4eeb46a728feea3d8ff040 from 'figma:asset/1986fa6511a700ac3e4eeb46a728feea3d8ff040.png';
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { TestimonialCard } from "../components/TestimonialCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Helmet } from 'react-helmet-async';
import { Camera } from "lucide-react";

// Import images
import image_collab from "figma:asset/298ca8044759a9db905e0b307ec97ce7f3386940.png";
import image_premium from "figma:asset/2313c0ef7c72fea9684332541201c7988100c7d8.png";
import image_gallery_0 from "figma:asset/96363315c6e81ea319cebace631d308b4c40d1f7.png";
import image_gallery_1 from "figma:asset/b249142c3b0afcc8d91208afed6a8e291cdb4144.png";
import image_gallery_2 from "figma:asset/d3aa16a948f66f2158eb7316e75d2a1c2732968e.png";
import image_gallery_3 from "figma:asset/92a2101c1f75310484352570d56526aa7857c259.png";

export function PlanGallery() {
  
  const galleryImages = [
    { src: image_gallery_0, alt: "Silver feet cast" },
    { src: image_gallery_1, alt: "Baby with teddy bear" },
    { src: image_gallery_2, alt: "Framed hands and feet" },
    { src: image_gallery_3, alt: "Baby feet comparison" }
  ];

  return (
    <>
      <Helmet>
        <title>Plan & Gallery | amorétto</title>
        <meta name="description" content="料金プラン、作品ギャラリー、制作の流れについて。" />
      </Helmet>

      {/* --- Hero / Intro --- */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl text-[#2C2C2C] italic font-light tracking-wide mb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Plan & Gift
            </h1>
            <p className="text-xs md:text-sm text-[#999999] tracking-[0.3em] uppercase mb-16">
              プラン・料金・ギャラリー
            </p>
            
            <p className="text-[1rem] md:text-[1.1rem] leading-loose text-[#666666] tracking-wide max-w-2xl mx-auto">
              かけがえのない瞬間を、最適なカタチで。<br />
              写真は「姿」を、私たちは「存在」を残します。
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Product Plans --- */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-32 md:space-y-40">
            
            {/* Plan 1: amorétto Collection (No Photo) */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 group">
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-square overflow-hidden bg-[#F5F3EF] shadow-xl relative">
                   <ImageWithFallback 
                      src={image_3f278eecc36eef79470171f39dc14006cf0e9cb9} 
                      alt="Standard Plan" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                   />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs tracking-widest uppercase text-[#C4A962]">
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
                <h3 className="text-3xl md:text-4xl text-[#2C2C2C] mb-3 font-serif">amorétto Collection</h3>
                <p className="text-xs text-[#C4A962] tracking-[0.2em] uppercase mb-8">初めて触れた、あの日をDesignする</p>
                
                <div className="text-[#666666] leading-loose mb-10 text-sm font-light">
                  <p className="mb-4">
                    シンプルだからこそ、その造形の美しさが際立つスタンダードモデル。<br/>
                    ゴールドまたはシルバーの繊細な塗装仕上げで、インテリアに上品な輝きを添えます。
                  </p>
                  <p className="text-xs text-[#999999] tracking-wider bg-[#FAFAF8] p-3 border-l-2 border-[#E5E0D8]">
                    <strong>【写真なしタイプ】</strong> 手足のキャストのみを額装するプランです。<br/>
                    純粋に「形」のアートを楽しみたい方におすすめです。
                  </p>
                </div>

                <div className="space-y-6 border-t border-b border-[#E5E0D8] py-8 mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#4A4A4A] tracking-wide">2 pieces (手足2点)</span>
                    <span className="font-serif text-xl text-[#2C2C2C]">¥35,000<span className="text-xs ml-1">+TAX</span></span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#4A4A4A] tracking-wide">4 pieces (手足4点)</span>
                    <span className="font-serif text-xl text-[#2C2C2C]">¥45,000<span className="text-xs ml-1">+TAX</span></span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Plan 2: Premium Foto Collection (With Photo) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 group">
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-square overflow-hidden bg-[#F5F3EF] shadow-xl relative">
                   <ImageWithFallback 
                      src={image_1986fa6511a700ac3e4eeb46a728feea3d8ff040} 
                      alt="Luxury Frame" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                   />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs tracking-widest uppercase text-[#C4A962]">
                      With Photo
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
                {/* 変更点: タイトルを "Premium Foto Collection" に変更 */}
                <h3 className="text-3xl md:text-4xl text-[#2C2C2C] mb-3 font-serif">Premium Foto Collection</h3>
                <p className="text-xs text-[#C4A962] tracking-[0.2em] uppercase mb-8">温もりと共に残す、家族のものがたり</p>
                
                <div className="text-[#666666] leading-loose mb-10 text-sm font-light">
                  <p className="mb-6">
                    お気に入りの一枚を、キャストと一緒に額装できるプランです。<br/>
                    重厚感のある特注フレームに、お子様のお名前や生年月日を刻印。<br/>
                    世界にひとつの「家宝」としてお仕立てします。
                  </p>
                  
                  {/* 通常価格（写真持ち込みなど） */}
                  <div className="flex justify-between items-baseline border-b border-[#E5E0D8] pb-4 mb-6">
                    <span className="text-[#4A4A4A] tracking-wide">Complete set</span>
                    <div className="text-right">
                       <span className="block text-xs text-[#999999] line-through mb-1">¥50,000+TAX</span>
                       <span className="font-serif text-xl text-[#2C2C2C]">¥48,000<span className="text-xs ml-1 text-[#2C2C2C]">+TAX</span></span>
                    </div>
                  </div>

                  {/* ライフスタジオ コラボ価格（強調表示） */}
                  <div className="relative bg-gradient-to-br from-[#FAFAF8] to-[#F5F3EF] p-6 rounded-sm border border-[#C4A962]/30">
                    <div className="absolute -top-3 -left-3 bg-[#C4A962] text-white text-[10px] px-3 py-1 tracking-widest">
                      SPECIAL PRICE
                    </div>
                    <h4 className="flex items-center gap-2 font-serif text-lg text-[#2C2C2C] mb-2">
                      <Camera size={18} className="text-[#C4A962]" />
                      amorétto × Life Studio
                    </h4>
                    <p className="text-xs text-[#666666] leading-relaxed mb-3">
                      提携フォトスタジオ「Life Studio」で撮影された方だけの特別優待。<br/>
                      プロの撮影データを使用して、お得にこのプランをご利用いただけます。
                    </p>
                    <div className="flex items-end gap-2">
                        <span className="text-xs text-[#999999] mb-1">コラボ特別価格</span>
                        <span className="font-serif text-2xl text-[#C4A962]">¥20,000〜<span className="text-xs text-[#666666] ml-1">+TAX</span></span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Gallery & Process & FAQ & Testimonials ... (変更なし) --- */}
      <section className="py-24 md:py-32 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl text-[#2C2C2C] italic font-light mb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Gallery
            </h2>
            <div className="h-px w-12 bg-[#C4A962] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
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

      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl text-[#2C2C2C] italic font-light mb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Process
            </h2>
            <p className="text-xs text-[#999999] tracking-widest uppercase">制作の流れ</p>
          </div>

          <div className="relative border-l border-[#D4C5B0] ml-4 md:ml-0 md:pl-10 space-y-16">
            <div className="relative pl-8 md:pl-0">
              <span className="absolute -left-[37px] md:-left-[55px] top-0 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-[#C4A962] text-white rounded-full font-serif text-sm shadow-sm">1</span>
              <div className="md:flex gap-10 items-start">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <h3 className="font-serif text-xl text-[#2C2C2C] mb-2">ご来店・型取り</h3>
                  <p className="text-xs text-[#C4A962] tracking-wider uppercase">Counseling & Casting</p>
                </div>
                <div className="md:w-2/3">
                  <p className="text-[#666666] leading-loose text-sm font-light">
                    デザインのご相談後、独自開発の素材で型取りを行います。<br/>
                    所要時間はわずか90秒。お子様のご機嫌に合わせて進めます。
                  </p>
                  <p className="mt-3 text-xs text-[#999999]">所要時間：約30分</p>
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div className="relative pl-8 md:pl-0">
              <span className="absolute -left-[37px] md:-left-[55px] top-0 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-[#C4A962] text-white rounded-full font-serif text-sm shadow-sm">2</span>
              <div className="md:flex gap-10 items-start">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <h3 className="font-serif text-xl text-[#2C2C2C] mb-2">制作・仕上げ</h3>
                  <p className="text-xs text-[#C4A962] tracking-wider uppercase">Creation</p>
                </div>
                <div className="md:w-2/3">
                  <p className="text-[#666666] leading-loose text-sm font-light">
                    工房にて、熟練の職人が手作業で制作に入ります。<br/>
                    美術品レベルの品質基準で、指紋やシワまで忠実に再現します。
                  </p>
                  <p className="mt-3 text-xs text-[#999999]">制作期間：約4週間</p>
                </div>
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative pl-8 md:pl-0">
              <span className="absolute -left-[37px] md:-left-[55px] top-0 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-[#C4A962] text-white rounded-full font-serif text-sm shadow-sm">3</span>
              <div className="md:flex gap-10 items-start">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <h3 className="font-serif text-xl text-[#2C2C2C] mb-2">完成・お渡し</h3>
                  <p className="text-xs text-[#C4A962] tracking-wider uppercase">Completion</p>
                </div>
                <div className="md:w-2/3">
                  <p className="text-[#666666] leading-loose text-sm font-light">
                    専用ボックスに収めてお渡しします。<br/>
                    配送、または店頭での受け取りをお選びいただけます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 md:py-32 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#2C2C2C] italic font-light mb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Q&A
            </h2>
            <p className="text-xs text-[#999999] tracking-widest uppercase">よくあるご質問</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
             {[
               { q: "何歳から型取りできますか？", a: "何歳からでも可能です。これまでの最年少実績は生後14日の赤ちゃんです。新生児特有の小ささを残したい場合は、生後1ヶ月以内のご来店をおすすめしております。" },
               { q: "赤ちゃんが泣いても大丈夫ですか？", a: "問題ありません。スタッフは赤ちゃんの扱いに慣れておりますし、型取り自体は90秒という短時間で完了するため、泣いている間でもスムーズに行えます。" },
               { q: "肌荒れが心配です。", a: "歯科医療でも使用される、海藻由来の安全な素材を使用しています。水で簡単に洗い流せ、肌への刺激は極めて少ないものです。ご心配な方はパッチテストも可能です。" },
               { q: "駐車場はありますか？", a: "専用駐車場はございませんが、近隣に提携駐車場がございます。ご予約の際に場所をご案内いたしますので、お車でお越しの際はお気軽にお申し付けください。" }
             ].map((item, i) => (
               <AccordionItem key={i} value={`item-${i}`} className="border border-[#E5E0D8] rounded-lg px-6 bg-white">
                 <AccordionTrigger className="text-[0.95rem] text-[#2C2C2C] font-medium py-5 hover:no-underline hover:text-[#C4A962] transition-colors text-left">
                   <span className="text-[#C4A962] mr-4 font-serif italic">Q.</span>
                   {item.q}
                 </AccordionTrigger>
                 <AccordionContent className="text-[#666666] leading-[2] pb-6 pl-8 text-sm font-light">
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