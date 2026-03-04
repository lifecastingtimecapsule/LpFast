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
        <title>制作事例・お客様の声｜amorétto LifeCasting® Studio</title>
        <meta
          name="description"
          content="amoréttoで実際に制作された立体手形・足形アートの事例と、お客様の声をご紹介します。家族それぞれの「時間」と「物語」が詰まったLifeCasting®のストーリー。"
        />
        <link
          rel="canonical"
          href="https://lifecastingstudio-amoretto.com/testimonials"
        />
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

