import { motion, useScroll, useTransform } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { MessageCircle, Clock, Check } from "../components/Icons";
import { Sparkles, Heart, Star, ShieldCheck, Fingerprint } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { useRef } from "react";

// Import images
import image_artist from 'figma:asset/1cacdfafa29eecceb028f649eacdf3b80807891d.png';

export function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <>
      <Helmet>
        <title>LifeCasting®の物語 | amorétto</title>
        <meta name="description" content="2023年商標登録。日本で唯一の90秒素材を使用したLifeCasting®。一瞬で過ぎ去る赤ちゃんの「今」を、一生の宝物へ。" />
      </Helmet>

      <div ref={containerRef} className="overflow-hidden">
        {/* Hero Section - Magazine Style */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FAFAF8] pt-20">


            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                    <div className="md:w-1/2 text-center md:text-left">
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <span className="inline-block py-1 px-3 border border-[#C4A962] text-[#C4A962] text-xs tracking-widest mb-6">
                                SINCE 2023 / JAPAN ORIGINAL
                            </span>
                            <div className="font-serif text-[#2C2C2C] mb-8">
                                <p className="text-xl md:text-2xl leading-relaxed mb-6">
                                    赤ちゃんは、<br/>
                                    あっという間に<br/>
                                    大きくなってしまいます。
                                </p>
                                <p className="text-base md:text-lg text-[#666666] leading-loose mb-6">
                                    昨日できなかったことが今日できるようになり、<br/>
                                    今日抱きしめたときの小ささは、<br/>
                                    明日にはもう変わっています。
                                </p>
                            </div>
                            <div className="border-l-4 border-[#C4A962] pl-6 py-2 mb-10 italic text-[#666666]">
                                <p className="font-serif text-lg md:text-xl leading-relaxed">
                                    “成長が嬉しい。<br/>
                                    でも、このまま止まってほしい。”
                                </p>
                            </div>
                            <p className="text-[#666666] leading-relaxed tracking-wide mb-4">
                                その矛盾した想いこそが、<br/>
                                お母さん・お父さんである証。
                            </p>
                            <p className="text-[#2C2C2C] font-medium leading-relaxed tracking-wide">
                                amoréttoは、この <span className="text-[#C4A962]">揺れる気持ちに寄り添うため</span> に生まれました。
                            </p>
                        </motion.div>
                    </div>
                    <div className="md:w-1/2 relative">
                        <motion.div
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ duration: 1.2, delay: 0.2 }}
                           className="relative z-10"
                        >
                            <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1557151331-5d93debb2e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob2xkaW5nJTIwaGFuZHMlMjBlbW90aW9uYWwlMjBhcnRpc3RpYyUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzY1NDM3OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                                    alt="Family hands" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Decorative Frame */}
                            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#C4A962]/30 -z-10"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>

        {/* The "Why" - Emotional Hook */}
        <section className="py-24 md:py-40 bg-white relative">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                 <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                 >
                     <h2 className="font-serif text-[1.5rem] md:text-[2rem] text-[#2C2C2C] mb-12 leading-loose">
                        写真は「姿」を残してくれます。<br />
                        でも、私たちが守りたいのは<br />
                        <span className="text-xl md:text-2xl mt-4 block">温度・質感・重さ・ぬくもり</span>
                     </h2>
                     <p className="text-[1rem] md:text-[1.1rem] leading-[2.2] text-[#666666] tracking-wide mb-12">
                        目ではなく、心で覚えている記憶。<br/>
                        <br/>
                        その一瞬を、そのまま未来へ届ける技術が、<br/>
                        <span className="font-serif text-2xl text-[#2C2C2C] block mt-2 mb-2">LifeCasting™<span className="text-sm ml-2">（ライフキャスティング）</span></span>
                        です。
                     </p>
                     
                     <div className="w-16 h-px bg-[#C4A962] mx-auto mb-12"></div>

                     <p className="font-serif text-[1rem] md:text-[1.2rem] text-[#2C2C2C] leading-loose">
                        私たちamoréttoは、2023年にこの名称を商標登録し、<br/>
                        <span className="text-[#C4A962]">“日本で初めて”</span> ライフキャスティングを<br/>
                        専門に扱うスタジオとして歩み始めました。
                     </p>
                 </motion.div>
            </div>
        </section>

        {/* The "Solution" - 90 Seconds & Quality (Refined Light Version) */}
        <section className="py-24 md:py-32 bg-[#FAFAF8] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                     <div className="md:w-1/2 order-2 md:order-1">
                        <motion.div
                           initial={{ opacity: 0, scale: 0.95 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ duration: 1 }}
                           className="relative"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl">
                                <img 
                                    src={image_artist} 
                                    alt="Craftsman working" 
                                    className="w-full h-full object-cover sepia-[0.1]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                            

                        </motion.div>
                     </div>

                     <div className="md:w-1/2 order-1 md:order-2">
                        <motion.div
                           initial={{ opacity: 0, x: 30 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 1 }}
                        >
                            <h2 className="font-serif text-[2.2rem] md:text-[3rem] text-[#2C2C2C] mb-6 leading-tight">
                                赤ちゃんのための<br/>
                                <span className="text-[#C4A962]">“90秒”</span> という答え。
                            </h2>
                            <p className="text-[#666666] leading-loose mb-10 tracking-wide">
                                「じっとしていられない赤ちゃんに、負担をかけたくない」<br/>
                                その一心で、私たちは国内唯一の専用素材に辿り着きました。<br/>
                                <br/>
                                従来3〜5分かかっていた時間を、わずか90秒へ。<br/>
                                これは技術の進化ではなく、優しさの進化です。
                            </p>

                            <ul className="space-y-6">
                                {[
                                    { title: "国内最速クラスの硬化", desc: "おしゃべりしている間に終わるほどの早さです。" },
                                    { title: "医療レベルの安全性", desc: "新生児の柔肌にも優しい、厳選された成分。" },
                                    { title: "驚異的な再現度", desc: "シワの1本1本まで、まるで呼吸しているかのように。" }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C4A962] flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-serif text-[#2C2C2C] text-lg mb-1">{item.title}</h4>
                                            <p className="text-[#999999] text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                     </div>
                </div>
            </div>
        </section>

        {/* Flow Section - Improved UX */}
        <section className="py-24 md:py-32 px-6 bg-[#FAFAF8]">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-20">
                    <span className="text-[#C4A962] tracking-widest text-sm font-bold uppercase block mb-4">Process</span>
                    <h2 className="font-serif text-[2rem] md:text-[3rem] text-[#2C2C2C]">
                        体験の流れ
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] md:left-[29px] top-0 bottom-0 w-[2px] bg-[#E5E0D8]"></div>

                    <div className="space-y-16 md:space-y-24">
                        {/* Step 1 & 2 Grouped */}
                        <motion.div 
                           className="relative pl-12 md:pl-24"
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                        >
                            <div className="absolute left-0 md:left-[4px] top-0 bg-[#C4A962] text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-serif text-xl z-10 shadow-lg">1</div>
                            <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm border border-[#E5E0D8]">
                                <h3 className="font-serif text-xl md:text-2xl text-[#2C2C2C] mb-4 flex items-center gap-3">
                                    カウン��リング & 型取り
                                </h3>
                                <p className="text-[#666666] leading-relaxed mb-6">
                                    デザインのご相談から、独自の90秒素材を使用した型取りまで。お子様のペースに合わせて進めます。
                                </p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAFAF8] border border-[#C4A962]/30 rounded-full text-[#C4A962] font-medium text-sm">
                                    <Clock size={16} />
                                    <span>所要時間：合計 約30分</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div 
                           className="relative pl-12 md:pl-24"
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: 0.1 }}
                        >
                            <div className="absolute left-0 md:left-[4px] top-0 bg-[#2C2C2C] text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-serif text-xl z-10 shadow-lg">2</div>
                             <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm border border-[#E5E0D8]">
                                <h3 className="font-serif text-xl md:text-2xl text-[#2C2C2C] mb-4 flex items-center gap-3">
                                    <Sparkles className="text-[#C4A962]" size={24} />
                                    制作（成形・着色・額装）
                                </h3>
                                <p className="text-[#666666] leading-relaxed">
                                    工房にて、熟練の職人が一つ一つ手作業で仕上げます。石膏の流し込みから、繊細な着色、そして額装まで。世界に一つのアートとして完成させます。
                                </p>
                                <div className="mt-4 text-sm text-[#999999] flex items-center gap-2">
                                    <Clock size={14} /> 制作期間：約4週間
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 4 */}
                        <motion.div 
                           className="relative pl-12 md:pl-24"
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: 0.2 }}
                        >
                            <div className="absolute left-0 md:left-[4px] top-0 bg-[#2C2C2C] text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-serif text-xl z-10 shadow-lg">3</div>
                            <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm border border-[#E5E0D8]">
                                <h3 className="font-serif text-xl md:text-2xl text-[#2C2C2C] mb-4 flex items-center gap-3">
                                    お届け
                                </h3>
                                <p className="text-[#666666] leading-relaxed">
                                    完成した作品をご自宅へお届け、または店頭にてお渡しいたします。箱を開けた瞬間、あの日のお子様の体温が��るような感動をお届けします。
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-20 text-center">
                        <a
                            href="https://lifecastingtimecapsule.com/reservation"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-12 py-4 bg-[#C4A962] text-white text-lg tracking-widest hover:bg-[#B39952] hover:shadow-lg transition-all transform hover:-translate-y-1"
                        >
                            予約枠を確認する
                        </a>
                        <p className="mt-4 text-sm text-[#999999]">※人気の土日枠はお早めにご確認ください</p>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-16">
                    <span className="text-[#C4A962] tracking-widest text-sm font-bold uppercase block mb-4">Q&A</span>
                    <h2 className="font-serif text-[2rem] text-[#2C2C2C]">
                        よくあるご質問
                    </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem value="item-1" className="border border-[#E5E0D8] rounded-sm px-6 bg-[#FAFAF8]">
                        <AccordionTrigger className="text-[1rem] text-[#2C2C2C] font-medium py-6 hover:no-underline hover:text-[#C4A962] transition-colors">
                            何歳から型取りできますか？
                        </AccordionTrigger>
                        <AccordionContent className="text-[#666666] leading-relaxed pb-6 pl-4 border-l-2 border-[#C4A962]/30">
                            何歳からでも体験いただけます。これまでの最年少実績は生後14日の赤ちゃんです。新生児期のシワ感や小ささを残したい場合は、生後1ヶ月以内のご来店をおすすめしております。
                        </AccordionContent>
                    </AccordionItem>
                    
                     <AccordionItem value="item-2" className="border border-[#E5E0D8] rounded-sm px-6 bg-[#FAFAF8]">
                        <AccordionTrigger className="text-[1rem] text-[#2C2C2C] font-medium py-6 hover:no-underline hover:text-[#C4A962] transition-colors">
                            型取り中に赤ちゃんが泣いても大丈夫？
                        </AccordionTrigger>
                        <AccordionContent className="text-[#666666] leading-relaxed pb-6 pl-4 border-l-2 border-[#C4A962]/30">
                            全く問題ありません。当店のスタッフは赤ちゃんの扱いに慣れており、泣いてしまっても優しくサポートいたします。また、90秒という短時間で硬化するため、泣いている間でもサッと型取りを完了させることが可能です。
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border border-[#E5E0D8] rounded-sm px-6 bg-[#FAFAF8]">
                        <AccordionTrigger className="text-[1rem] text-[#2C2C2C] font-medium py-6 hover:no-underline hover:text-[#C4A962] transition-colors">
                            肌荒れやアレルギーが心配です
                        </AccordionTrigger>
                        <AccordionContent className="text-[#666666] leading-relaxed pb-6 pl-4 border-l-2 border-[#C4A962]/30">
                            使用する素材は、歯科医療でも使われるアルジネート（海藻由来成分）をベースにした、赤ちゃん専用の安全なものです。肌への刺激は極めて少なく、水で簡単に洗い流せます。ご不安な場合は、事前にパッチテストも可能ですのでご相談ください。
                        </AccordionContent>
                    </AccordionItem>

                     <AccordionItem value="item-4" className="border border-[#E5E0D8] rounded-sm px-6 bg-[#FAFAF8]">
                        <AccordionTrigger className="text-[1rem] text-[#2C2C2C] font-medium py-6 hover:no-underline hover:text-[#C4A962] transition-colors">
                            制作期間と受け取り方法は？
                        </AccordionTrigger>
                        <AccordionContent className="text-[#666666] leading-relaxed pb-6 pl-4 border-l-2 border-[#C4A962]/30">
                             通常、約4週間で完成いたします。完成後は「店頭受け取り」または「配送（着払い）」をお選びいただけます。
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5" className="border border-[#E5E0D8] rounded-sm px-6 bg-[#FAFAF8]">
                        <AccordionTrigger className="text-[1rem] text-[#2C2C2C] font-medium py-6 hover:no-underline hover:text-[#C4A962] transition-colors">
                            予約の変更やキャンセルはできますか？
                        </AccordionTrigger>
                        <AccordionContent className="text-[#666666] leading-relaxed pb-6 pl-4 border-l-2 border-[#C4A962]/30">
                             はい、可能です。お子様の体調不良などによる急な日程変更も承っております。できるだけ早めにご連絡いただければ、別の日程で調整いたします。キャンセル料はいただいておりませんが、無断キャンセルの場合は今後のご予約をお断りする場合がございます。
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
      </div>
    </>
  );
}
