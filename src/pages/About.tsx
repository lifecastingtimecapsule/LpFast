import { motion } from "motion/react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import IMG_HANDS from '../assets/9a3380d762d79add87cdd15a8bdf00ca60691e39.png';
import IMG_ARTIST from '../assets/61182aee64f023c22f643d006af7762c37e5d671.png';

export function About() {
  return (
    <>
      <Helmet>
        <title>立体手形への想い｜日本初のLifeCasting®専門スタジオ amorétto - 愛知県・浜松</title>
        <meta name="description" content="日本初の立体手形専門スタジオamoréttoの想い。LifeCasting®（2024年商標登録済）の技術で赤ちゃんの「今」をアートに。商標取得の歩み、日本初の専門店としての使命、一作品ごとに込める情熱を語ります。愛知県（豊川）・浜松の2拠点。" />
        <link rel="canonical" href="https://www.lifecastingstudio-amoretto.com/about" />
        
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="amorétto | LifeCasting® Studio" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content="立体手形への想い｜日本初の専門スタジオ amorétto - 愛知県・浜松" />
        <meta property="og:description" content="日本初のLifeCasting®立体手形専門スタジオamorétto。2024年商標登録。アートに懸ける想いと、日本初の専門店としての歩みをご紹介。" />
        <meta property="og:url" content="https://www.lifecastingstudio-amoretto.com/about" />
        <meta property="og:image" content="https://www.lifecastingstudio-amoretto.com/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="立体手形への想い｜日本初の専門スタジオ amorétto" />
        <meta name="twitter:description" content="日本初のLifeCasting®立体手形専門スタジオ。2024年商標登録。アートに懸ける想いと歩み。愛知県・浜松。" />
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
                  "name": "About",
                  "item": "https://www.lifecastingstudio-amoretto.com/about"
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
              "name": "立体手形への想い - amorétto",
              "description": "日本初のLifeCasting®（立体手形）専門スタジオamorétto。2024年10月に商標登録されたLifeCasting®の技術で、赤ちゃんの「今」を立体手形・足形アートとして永遠に残す。日本初の専門店としての歩みとアートへの想い。",
              "url": "https://www.lifecastingstudio-amoretto.com/about",
              "mainEntity": {
                "@type": "Organization",
                "@id": "https://www.lifecastingstudio-amoretto.com/#organization",
                "name": "amorétto",
                "url": "https://www.lifecastingstudio-amoretto.com/",
                "logo": "https://www.lifecastingstudio-amoretto.com/og-image.jpg",
                "description": "日本初のLifeCasting®（立体手形）専門スタジオ。2024年10月商標登録。愛知県と浜松の2拠点で展開。",
                "foundingDate": "2023",
                "brand": {
                  "@type": "Brand",
                  "name": "LifeCasting®",
                  "description": "2024年10月商標登録。日本初の立体手形アートブランド。"
                },
                "location": [
                  {
                    "@type": "Place",
                    "name": "ライフスタジオ豊川店",
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "門前町15",
                      "addressLocality": "豊川市",
                      "addressRegion": "愛知県",
                      "postalCode": "442-0037",
                      "addressCountry": "JP"
                    }
                  },
                  {
                    "@type": "Place",
                    "name": "ライフスタジオ浜松店",
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "上島6丁目2-30",
                      "addressLocality": "浜松市中央区",
                      "addressRegion": "静岡県",
                      "postalCode": "433-8122",
                      "addressCountry": "JP"
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
              "name": "立体手形への想い｜日本初のLifeCasting®専門スタジオ amorétto - 愛知県・浜松",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", "h3", ".speakable"]
              },
              "url": "https://www.lifecastingstudio-amoretto.com/about",
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
                <p className="text-[10px] md:text-xs text-[#C4A962] tracking-[0.35em] uppercase mb-4 font-medium">
                  日本初・立体手形の専門スタジオ
                </p>
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
                <p className="speakable">
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
                  そこに確かな命があったという<strong className="font-medium text-[#2C2C2C]">「存在感」</strong>そのものです。
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
                 <img
                    src={IMG_HANDS}
                    alt="家族の手を重ねた立体手形アート - amoréttoの作品"
                    className="w-full h-full object-cover grayscale-[10%]"
                    loading="lazy"
                 />
              </motion.div>
           </div>
        </section>

        {/* --- 03. Japan's First: Our Story --- */}
        <section className="py-20 md:py-32 bg-[#FAFAF8]">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              <span className="block text-[#C4A962] text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 font-medium">
                Japan's First LifeCasting® Studio
              </span>
              <h2 className="font-jp-serif text-2xl md:text-4xl text-[#2C2C2C] leading-relaxed font-light">
                日本初の「立体手形」専門スタジオとして
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 text-[#4A4A4A] leading-[2.2] md:leading-[2.6] tracking-wide font-light text-[0.9rem] md:text-base text-justify md:text-center"
            >
              <p className="speakable">
                amoréttoは、日本で初めて「立体手形」を専門とするスタジオとして誕生しました。
              </p>
              <p>
                海外では"Life Casting"という文化が古くから存在しますが、<br className="hidden md:block"/>
                日本にはまだ、赤ちゃんの手形・足形を「アート」として<br className="hidden md:block"/>
                本気で向き合う場所がありませんでした。
              </p>
              <p>
                「ならば、自分たちが作ろう。」<br className="hidden md:block"/>
                そんな想いから、すべてが始まりました。
              </p>
              <p>
                素材の研究、型取り技術の試行錯誤、仕上げの品質基準の確立——。<br className="hidden md:block"/>
                日本にこの文化を根付かせるために、<br className="hidden md:block"/>
                一からすべてを築いてきました。
              </p>
              <p>
                そして2024年10月、私たちが生み出したこの技術とブランドは<br className="hidden md:block"/>
                <strong className="font-medium text-[#2C2C2C]">「LifeCasting®」として正式に商標登録</strong>されました。
              </p>
              <p>
                これは単なる権利の取得ではありません。<br className="hidden md:block"/>
                日本で初めてこの分野を開拓した者としての<strong className="font-medium text-[#2C2C2C]">「責任」の証</strong>です。<br className="hidden md:block"/>
                この商標に恥じない品質を、一作品ごとに守り続ける。<br className="hidden md:block"/>
                それが私たちの誓いです。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 md:mt-16 bg-white border border-[#E5E0D8] p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
                <div>
                  <p className="text-[10px] md:text-xs text-[#999999] tracking-wider mb-2">ブランド名</p>
                  <p className="font-en-serif text-lg md:text-xl text-[#2C2C2C] italic">LifeCasting®</p>
                </div>
                <span className="hidden md:block w-px h-12 bg-[#E5E0D8]"></span>
                <div>
                  <p className="text-[10px] md:text-xs text-[#999999] tracking-wider mb-2">商標登録</p>
                  <p className="text-sm md:text-base text-[#2C2C2C] font-medium">2024年10月（令和6年）</p>
                </div>
                <span className="hidden md:block w-px h-12 bg-[#E5E0D8]"></span>
                <div>
                  <p className="text-[10px] md:text-xs text-[#999999] tracking-wider mb-2">拠点</p>
                  <p className="text-sm md:text-base text-[#2C2C2C]">愛知県（豊川）・浜松</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- 04. Passion for the Art --- */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              <span className="block text-[#C4A962] text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 font-medium">
                Our Passion
              </span>
              <h2 className="font-jp-serif text-2xl md:text-4xl text-[#2C2C2C] leading-relaxed font-light">
                立体手形は、「手形」ではない。<br/>
                それは、「存在の彫刻」です。
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 text-[#4A4A4A] leading-[2.2] md:leading-[2.6] tracking-wide font-light text-[0.9rem] md:text-base text-justify md:text-center"
            >
              <p>
                私たちが作っているのは、<br className="hidden md:block"/>
                ただの「手形」でも「足形」でもありません。
              </p>
              <p>
                血管の浮き立ち。爪の丸み。指と指の間にある、柔らかなくぼみ。<br className="hidden md:block"/>
                生まれて間もない赤ちゃんの手には、<br className="hidden md:block"/>
                言葉にはできない「生きている証」が刻まれています。
              </p>
              <p>
                その証を、0.1mmの精度で写し取り、<br className="hidden md:block"/>
                美術品として世に出せるレベルまで磨き上げる。<br className="hidden md:block"/>
                それが、私たちが「LifeCasting®」と名づけた技術の本質です。
              </p>
              <p>
                写真は「姿」を記録します。<br className="hidden md:block"/>
                動画は「動き」を記録します。<br className="hidden md:block"/>
                でも、立体手形だけが記録できるものがあります。<br className="hidden md:block"/>
                それは——<strong className="font-medium text-[#2C2C2C]">「存在感」</strong>そのものです。
              </p>
              <p>
                手に取ったとき、重さを感じる。<br className="hidden md:block"/>
                指でなぞると、シワの一本一本がたどれる。<br className="hidden md:block"/>
                10年後、20年後に手に取ったとき、<br className="hidden md:block"/>
                「こんなに小さかったんだ」と涙が溢れるような——<br className="hidden md:block"/>
                そんな、五感で感じる記憶を作りたい。
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- 05. The Commitment (Material & Art) --- */}
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
                       <img
                          src={IMG_ARTIST}
                          alt="amoréttoアーティストが立体手形を丁寧に仕上げる制作風景"
                          className="w-full h-full object-cover"
                          loading="lazy"
                       />
                    </motion.div>
                 </div>

              </div>
           </div>
        </section>

        {/* --- 06. Why We Do This --- */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              <span className="block text-[#C4A962] text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 font-medium">
                Why We Create
              </span>
              <h2 className="font-jp-serif text-2xl md:text-4xl text-[#2C2C2C] leading-relaxed font-light">
                「なぜ、ここまでやるのか」
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 text-[#4A4A4A] leading-[2.2] md:leading-[2.6] tracking-wide font-light text-[0.9rem] md:text-base text-justify md:text-center"
            >
              <p>
                「もっと簡単に作れないんですか？」<br className="hidden md:block"/>
                「もっと安くできないんですか？」<br className="hidden md:block"/>
                そう聞かれることがあります。
              </p>
              <p>
                正直に言えば、もっと簡単に、もっと安く作ることはできます。<br className="hidden md:block"/>
                でも、私たちはそれを選びません。
              </p>
              <p>
                なぜなら、お客様がこのスタジオに来てくださるのは、<br className="hidden md:block"/>
                「手形を取りたいから」ではないと知っているからです。<br className="hidden md:block"/>
                本当に求めているのは、<br className="hidden md:block"/>
                <strong className="font-medium text-[#2C2C2C]">この子が生まれてきてくれた奇跡を、形にして残したい</strong><br className="hidden md:block"/>
                という、親としての深い愛情そのものです。
              </p>
              <p>
                だからこそ、素材の一つひとつ、<br className="hidden md:block"/>
                仕上げの一工程ごとに、<br className="hidden md:block"/>
                「この作品を受け取ったご家族は、どんな表情をするだろう」と<br className="hidden md:block"/>
                想像しながら向き合っています。
              </p>
              <p>
                納品の日、作品を手に取ったお母さんが涙を流す瞬間。<br className="hidden md:block"/>
                お父さんが「こんなに小さかったのか」と声を震わせる瞬間。<br className="hidden md:block"/>
                おじいちゃん、おばあちゃんが孫の手形を撫でながら微笑む瞬間。
              </p>
              <p>
                その一つひとつの瞬間が、<br className="hidden md:block"/>
                私たちがこの仕事を続ける理由であり、<br className="hidden md:block"/>
                一切の妥協を許さない理由です。
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- 07. A Letter to the Future --- */}
        <section className="py-20 md:py-32 bg-[#FAFAF8]">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              <span className="block text-[#C4A962] text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 font-medium">
                A Letter to the Future
              </span>
              <h2 className="font-jp-serif text-2xl md:text-4xl text-[#2C2C2C] leading-relaxed font-light">
                未来のあなたへ届ける手紙
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 text-[#4A4A4A] leading-[2.2] md:leading-[2.6] tracking-wide font-light text-[0.9rem] md:text-base text-justify md:text-center"
            >
              <p>
                10年後——。<br className="hidden md:block"/>
                お子さんが小学校高学年になった頃、<br className="hidden md:block"/>
                この立体手形を見せてあげてほしいのです。
              </p>
              <p>
                「あなたの手、こんなに小さかったんだよ」<br className="hidden md:block"/>
                「ここに来るまでの道のりで、パパとママはたくさん泣いたんだよ」<br className="hidden md:block"/>
                「でも、あなたが生まれてきてくれて、本当によかった」
              </p>
              <p>
                20年後——。<br className="hidden md:block"/>
                お子さんが大人になり、<br className="hidden md:block"/>
                いつか自分の子どもを授かったとき。<br className="hidden md:block"/>
                この手形を手に取って初めて、<br className="hidden md:block"/>
                親の愛の深さを知るかもしれません。
              </p>
              <p>
                立体手形は、時を超える手紙です。<br className="hidden md:block"/>
                言葉にならない愛情を、立体という形に封じ込めた、<br className="hidden md:block"/>
                世界でたった一つの手紙。
              </p>
              <p className="speakable">
                私たちamoréttoは、<br className="hidden md:block"/>
                その手紙の「書き手」として、<br className="hidden md:block"/>
                これからも一作品ごとに全身全霊を込めてまいります。
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- 08. Message (Closing) --- */}
        <section className="py-24 md:py-48 bg-white text-center">
           <div className="container mx-auto px-6 max-w-3xl">
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
              >
                 <p className="font-en-serif text-2xl md:text-4xl text-[#2C2C2C] italic mb-8 md:mb-10 font-light">
                    "Your Love, Eternalized."
                 </p>
                 <p className="text-[#666666] leading-loose text-xs md:text-sm font-light mb-12 md:mb-16">
                    いつか、大きくなったお子様と。<br/>
                    この小さな手を見て、語り合える日が来ますように。
                 </p>
                 
                 <Link 
                   to="/plan-gallery" 
                   aria-label="立体手形のプランと作品ギャラリーを見る"
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
