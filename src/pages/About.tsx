import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import image_material from 'figma:asset/a0354f462dd60a54ee83d6d005b657d7607d28c2.png';

export function About() {
  return (
    <>
      <Helmet>
        <title>Philosophy & Process | amorétto</title>
        <meta name="description" content="amoréttoが大切にしている想いと、作品がお手元に届くまでの物語。" />
      </Helmet>

      <div className="overflow-hidden bg-[#FAFAF8]">
        
        {/* --- Hero / Philosophy Section --- */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
          
              
              <h1 className="font-serif text-3xl md:text-5xl text-[#2C2C2C] leading-relaxed md:leading-tight mb-16 font-light">
                記憶は、いつか<br/>
                薄れてしまうから。
              </h1>

              <div className="space-y-12 text-[#4A4A4A] leading-[2.6] tracking-wide font-light text-[0.95rem] md:text-lg">
                <p>
                  赤ちゃんがあっという間に大きくなること。<br/>
                  昨日できなかったことが、今日できるようになること。<br/>
                  その成長は、何よりも嬉しいはずなのに。
                </p>
                <p className="italic text-[#666666] font-serif text-xl">
                  “このまま止まってほしい”
                </p>
                <p>
                  そんな矛盾した、けれど切実な想いを<br/>
                  私たちは「形」にして残したいと考えました。
                </p>
                <p>
                  写真では残せない、<br/>
                  その指の細さ、肌の質感、ぬくもり。<br/>
                  amoréttoは、一瞬の愛おしさを永遠に閉じ込める<br/>
                  ライフキャスティングスタジオです。
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- The Material --- */}
        <section className="py-32 md:py-48 px-6">
           <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                 
                 <div className="md:w-1/2 order-2 md:order-1">
                    <motion.div
                       initial={{ opacity: 0, x: -30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 1 }}
                    >
                       
                       <h2 className="font-serif text-3xl md:text-5xl text-[#2C2C2C] leading-tight mb-10 font-light">
                          赤ちゃんのためだけに生まれた、<br/>
                          唯一のキャスティング素材
                       </h2>
                       <div className="space-y-8 text-[#4A4A4A] leading-[2.4] tracking-wide font-light text-[0.95rem]">
                          <p>
                             主成分は、昆布やワカメなどの海藻から抽出された天然成分「アルジネート」。<br/>
                             歯科治療の型取りや食品にも使われるほど安全性が高く、<br/>
                             万が一お口に入っても害のない、やさしい素材です。
                          </p>
                          <p>
                             たっぷりの水分を含んだゼリーのような感触で、<br/>
                             型取り後の肌がしっとりするほどの保湿力。<br/>
                             摩擦や刺激が極めて少ないため、生後間もない赤ちゃんのデリケートな肌も傷つけることなく、優しく包み込みます。
                          </p>
                          <p>
                             さらに、独自の研究により硬化時間を「わずか90秒」に短縮。<br/>
                             ママのお腹の中にいたときのような心地よさのまま、<br/>
                             一瞬の形を永遠に残します。
                          </p>
                       </div>
                    </motion.div>
                 </div>

                 <div className="md:w-1/2 order-1 md:order-2">
                    <motion.div
                       initial={{ opacity: 0, scale: 0.95 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       transition={{ duration: 1.2 }}
                       className="aspect-[4/5] overflow-hidden bg-white shadow-xl rotate-1"
                    >
                       <img 
                          src={image_material} 
                          alt="Safe Material" 
                          className="w-full h-full object-cover grayscale-[10%]" 
                       />
                    </motion.div>
                 </div>

              </div>
           </div>
        </section>

        {/* --- The Process (Timeline Layout) --- */}
        <section className="py-32 md:py-48 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div 
              className="text-center mb-24 md:mb-32"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl text-[#2C2C2C] italic font-light mb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                The Process
              </h2>
              <p className="text-xs md:text-sm text-[#999999] tracking-[0.2em] uppercase">
                作品が届くまでの物語
              </p>
            </motion.div>

            <div className="relative pl-8 md:pl-0">
              {/* Vertical Line (Left on mobile, Center on desktop? Keeping it Simple Left for clarity/editorial feel) */}
              {/* Actually, editorial often puts time on left, content on right. Let's do a refined left-aligned timeline for readability. */}
              
              <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-[#E5E0D8]"></div>

              <div className="space-y-24">
                
                {/* Step 01 */}
                <motion.div 
                  className="relative pl-12 md:pl-20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full bg-white border border-[#C4A962] z-10"></div>
                  <span className="block text-[#C4A962] text-xs tracking-[0.2em] mb-3 uppercase font-medium">Step 01</span>
                  <h3 className="font-serif text-2xl text-[#2C2C2C] mb-6 font-light">
                    Counseling & Casting
                    <span className="block text-sm text-[#999999] font-sans mt-2 tracking-wide font-normal">カウンセリング・型取り</span>
                  </h3>
                  <p className="text-[#4A4A4A] leading-[2.2] font-light text-[0.95rem]">
                    ご希望のデザインや仕上げについて、ゆっくりとお話を伺います。<br/>
                    型取りにかかる時間は、独自の技術によりわずか90秒。<br/>
                    お子様のご機嫌に合わせ、負担のないよう丁寧に進めさせていただきます。
                  </p>
                  <p className="mt-4 text-xs text-[#999999] tracking-wider">所要時間：約30分</p>
                </motion.div>

                {/* Step 02 */}
                <motion.div 
                  className="relative pl-12 md:pl-20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full bg-white border border-[#C4A962] z-10"></div>
                  <span className="block text-[#C4A962] text-xs tracking-[0.2em] mb-3 uppercase font-medium">Step 02</span>
                  <h3 className="font-serif text-2xl text-[#2C2C2C] mb-6 font-light">
                    Creation
                    <span className="block text-sm text-[#999999] font-sans mt-2 tracking-wide font-normal">制作</span>
                  </h3>
                  <p className="text-[#4A4A4A] leading-[2.2] font-light text-[0.95rem]">
                    工房にて、熟練の職人が一つひとつ手作業で仕上げます。<br/>
                    石膏の流し込み、気泡の除去、そして繊細な磨き上げ。<br/>
                    指紋やシワのディテールまで、美術品レベルの品質で再現します。
                  </p>
                  <p className="mt-4 text-xs text-[#999999] tracking-wider">期間：約4週間</p>
                </motion.div>

                {/* Step 3 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-8 md:pl-0"
                >
                  <span className="absolute -left-[37px] md:-left-[61px] top-0 flex items-center justify-center w-6 h-6 md:w-10 md:h-10 bg-[#2C2C2C] text-white rounded-full font-serif text-sm md:text-lg shadow-md">3</span>
                  
                  <div className="md:flex gap-12 items-start">
                    <div className="md:w-1/3 mb-6 md:mb-0">
                      {/* "Delivery" から "Completion"（完成）へ変更 */}
                      <span className="text-xs tracking-[0.2em] text-[#C4A962] uppercase block mb-2">Completion</span>
                      {/* タイトルも「お渡し」を含める形に変更 */}
                      <h3 className="font-serif text-xl md:text-2xl text-[#2C2C2C]">完成・お渡し</h3>
                    </div>
                    <div className="md:w-2/3 text-[#666666] leading-[2.2] font-light">
                      <p className="mb-4">
                        完成した作品は、専用のボックスに収めてお渡しします。<br/>
                        配送、または店頭での受け取りをお選びいただけます。
                      </p>
                      <p>
                        箱を開けた瞬間、あの日のお子様の体温が蘇るような<br className="hidden md:block"/>
                        感動をお届けします。
                      </p>
                    </div>
                  </div>
                </motion.div>

              </div>
              
              <div className="mt-24 md:pl-20 pl-12">
                 <a 
                   href="https://lifecastingtimecapsule.com/reservation" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-block border-b border-[#C4A962] text-[#C4A962] pb-1 text-xs tracking-[0.2em] uppercase hover:text-[#B39952] hover:border-[#B39952] transition-colors"
                 >
                   Reserve Now
                 </a>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ Section (Minimal) --- */}
        <section className="py-32 bg-[#FAFAF8]">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl text-[#2C2C2C] italic font-light mb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                Q&A
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-0">
               {[
                 { q: "何歳から型取りできますか？", a: "何歳からでも可能です。これまでの最年少実績は生後14日の赤ちゃんです。新生児特有の小ささを残したい場合は、生後1ヶ月以内のご来店をおすすめしております。" },
                 { q: "赤ちゃんが泣いても大丈夫ですか？", a: "問題ありません。スタッフは赤ちゃんの扱いに慣れておりますし、型取り自体は短時間で完了するため、泣いている間でもスムーズに行えます。" },
                 { q: "肌荒れが心配です。", a: "歯科医療でも使用される、海藻由来の安全な素材を使用しています。水で簡単に洗い流せ、肌への刺激は極めて少ないものです。ご心配な方はパッチテストも可能です。" },
                 { q: "手形・足形以外も作れますか？", a: "はい、可能です。ご家族で手を繋いだ形や、指輪を握った形など、オーダーメイドのご要望にもお応えしております。" },
                 { q: "駐車場はありますか？", a: "専用駐車場はございませんが、近隣に提携駐車場がございます。ご予約の際に場所をご案内いたしますので、お車でお越しの際はお気軽にお申し付けください。" }
               ].map((item, i) => (
                 <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#E5E0D8] bg-transparent">
                   <AccordionTrigger className="text-[1rem] md:text-[1.05rem] text-[#2C2C2C] font-light py-6 hover:no-underline hover:text-[#C4A962] transition-colors font-serif tracking-wide text-left">
                     {item.q}
                   </AccordionTrigger>
                   <AccordionContent className="text-[#666666] leading-[2.2] pb-8 pt-2 font-light text-sm md:text-base">
                     {item.a}
                   </AccordionContent>
                 </AccordionItem>
               ))}
            </Accordion>
          </div>
        </section>

      </div>
    </>
  );
}
