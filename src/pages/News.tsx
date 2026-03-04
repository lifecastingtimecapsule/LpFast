import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";

type NewsItem = {
  date: string;
  title: string;
  category: string;
  body: string;
};

const NEWS_ITEMS: NewsItem[] = [
  {
    date: "2025-02-20",
    title: "【お知らせ】Web予約フォームをリニューアルしました",
    category: "お知らせ",
    body: "Supabaseを用いた新しいWeb予約システムに移行しました。空き状況の確認からご予約完了まで、すべてWeb上で完結します。",
  },
  {
    date: "2025-01-15",
    title: "【メディア掲載】ライフキャスティング™が育児情報誌に紹介されました",
    category: "メディア",
    body: "立体手形・足形アートとしてのLifeCasting®が、育児情報誌の特集「新しい記念日の残し方」で紹介されました。",
  },
];

export function News() {
  return (
    <>
      <Helmet>
        <title>ニュース・お知らせ｜amorétto LifeCasting® Studio</title>
        <meta
          name="description"
          content="amorétto（アモレット）からの最新ニュース・お知らせ。営業日やキャンペーン、メディア掲載情報などをお届けします。"
        />
        <link
          rel="canonical"
          href="https://lifecastingstudio-amoretto.com/news"
        />
      </Helmet>

      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12 md:mb-16 text-center">
              <h1 className="text-4xl md:text-6xl text-[#2C2C2C] italic font-light tracking-wide mb-4 font-en-serif">
                News
              </h1>
              <p className="text-[10px] md:text-sm text-[#999999] tracking-[0.3em] uppercase">
                ニュース・お知らせ
              </p>
            </div>

            <div className="space-y-6">
              {NEWS_ITEMS.map((item, idx) => (
                <article
                  key={`${item.date}-${idx}`}
                  className="bg-white border border-[#E5E0D8] p-5 md:p-6"
                >
                  <header className="mb-2">
                    <div className="flex items-center gap-3 text-[10px] md:text-xs text-[#999999] tracking-widest uppercase mb-1">
                      <span>{item.category}</span>
                      <span className="w-px h-3 bg-[#E5E0D8]" />
                      <time dateTime={item.date}>{item.date}</time>
                    </div>
                    <h2 className="font-jp-serif text-lg md:text-xl text-[#2C2C2C]">
                      {item.title}
                    </h2>
                  </header>
                  <p className="text-sm md:text-[0.95rem] text-[#666666] leading-relaxed">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

