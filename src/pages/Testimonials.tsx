import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { TestimonialCard } from "@/components/TestimonialCard";

const TESTIMONIALS = [
  {
    quote:
      "「こんなに小さかったんだね」と、作品を見ながら夫と何度も言い合いました。泣き虫だった新生児期の大変さも、今では愛おしい思い出です。",
    author: "Aさま",
    context: "0歳6ヶ月 / 初めてのご出産記念",
  },
  {
    quote:
      "第二子でようやく心の余裕ができて、ずっと気になっていた立体手形をお願いしました。上の子の分も作ってあげたいと思えるくらい、宝物になりました。",
    author: "Mさま",
    context: "1歳2ヶ月 / 兄弟おそろいで制作",
  },
  {
    quote:
      "子どもが巣立ったあと、自分のために眺められる何かが欲しいと思い依頼しました。あの日の重みを、もう一度手のひらで確かめられる気がします。",
    author: "Kさま",
    context: "3歳 / 七五三の記念に",
  },
];

export function Testimonials() {
  return (
    <>
      <Helmet>
        <title>制作事例・お客様の声｜七五三・出産記念の立体手形 amorétto LifeCasting®</title>
        <meta
          name="description"
          content="七五三・赤ちゃん誕生・1歳など大切な記念に立体手形（ライフキャスティング）を制作されたお客様の声。写真とは違う「重さと温もり」をアートで残した家族のストーリー。愛知県・浜松のamoréttoスタジオ。"
        />
        <link rel="canonical" href="https://lifecastingstudio-amoretto.com/stories" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="制作事例・お客様の声｜七五三・出産記念の立体手形 amorétto" />
        <meta property="og:description" content="七五三・赤ちゃん誕生・1歳記念に立体手形（ライフキャスティング）を制作されたお客様の声。写真とは違うアートとして残す感動体験をご紹介。" />
        <meta property="og:url" content="https://lifecastingstudio-amoretto.com/stories" />
        <meta property="og:image" content="https://lifecastingstudio-amoretto.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:site_name" content="amorétto LifeCasting® Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="制作事例・お客様の声｜七五三・出産記念の立体手形 amorétto" />
        <meta name="twitter:description" content="七五三・赤ちゃん誕生・1歳記念に立体手形を制作されたお客様の感動体験をご紹介します。" />
        <meta name="twitter:image" content="https://lifecastingstudio-amoretto.com/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "七五三の記念に立体手形（ライフキャスティング）はできますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "はい、七五三の記念にもご利用いただけます。3歳・5歳・7歳のお子さまの手足を型取りし、その瞬間の「大きさ」を立体アートとして永遠に残せます。"
                }
              },
              {
                "@type": "Question",
                "name": "立体手形と写真どちらがいいですか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "写真は「見る」記念ですが、立体手形（ライフキャスティング）は「触れる」記念です。実際の手足の大きさ・形・温もりを再現したアート作品として、写真と組み合わせてお飾りいただく方も多くいらっしゃいます。"
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12 md:mb-16 text-center">
              <h1 className="text-4xl md:text-6xl text-[#2C2C2C] italic font-light tracking-wide mb-4 font-en-serif">
                Stories
              </h1>
              <p className="text-[10px] md:text-sm text-[#999999] tracking-[0.3em] uppercase">
                制作事例・お客様の声
              </p>
            </div>

            <div className="space-y-8 md:space-y-10">
              {TESTIMONIALS.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <TestimonialCard
                    quote={t.quote}
                    author={t.author}
                    context={t.context}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

