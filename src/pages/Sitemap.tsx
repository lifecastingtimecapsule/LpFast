import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Helmet } from 'react-helmet-async';

export function Sitemap() {
  const siteStructure = [
    {
      title: "ホーム",
      path: "/",
      description: "amorétto トップページ。LifeCasting®専門スタジオの紹介、コンセプト、スタッフ紹介。",
      sections: [
        { name: "コンセプト - 「時間」と「物語」を届ける", anchor: "/" },
        { name: "Art Piece - アートとしての立体手形", anchor: "/" },
        { name: "Material - 90秒で固まる独自素材", anchor: "/" },
        { name: "Professional - 3人のプロフェッショナル", anchor: "/#team" },
      ]
    },
    {
      title: "About - 私たちの想い",
      path: "/about",
      description: "amoréttoのブランドストーリー。立体手形・産後ギフト制作への想いと、美へのこだわり。",
      sections: [
        { name: "記憶を形にする想い", anchor: "/about" },
        { name: "「美しさ」への執着は「愛おしさ」への敬意", anchor: "/about" },
      ]
    },
    {
      title: "Plan & Gallery - 料金プラン・作品ギャラリー",
      path: "/plan-gallery",
      description: "立体手形・足形アートの料金プラン（写真なし/写真付き）と作品ギャラリー。制作の流れとQ&A。",
      sections: [
        { name: "amorétto Collection（写真なしプラン）- ¥35,000+tax〜", anchor: "/plan-gallery" },
        { name: "Premium Foto Collection（写真付きプラン）- ¥48,000+tax", anchor: "/plan-gallery" },
        { name: "amorétto × Life Studio コラボ特別価格", anchor: "/plan-gallery" },
        { name: "Gallery - 作品ギャラリー", anchor: "/plan-gallery" },
        { name: "Process - 制作の流れ", anchor: "/plan-gallery" },
        { name: "Q&A - よくあるご質問", anchor: "/plan-gallery#faq" },
      ]
    },
    {
      title: "School - LifeCasting®認定講座",
      path: "/school",
      description: "日本唯一のLifeCasting®認定講座。商標権を持つ本格的な技術指導と開業サポート。",
      sections: [
        { name: "カリキュラム - 基礎から認定まで", anchor: "/school" },
        { name: "商標・ライセンスについて", anchor: "/school" },
        { name: "卒業後の活動支援", anchor: "/school" },
      ]
    },
    {
      title: "Access - 店舗情報・アクセス",
      path: "/access",
      description: "豊川店: 〒442-0037 愛知県豊川市門前町15（TEL: 0533-56-9494）／浜松店: 〒433-8122 静岡県浜松市中央区上島6-2-30（TEL: 053-415-8775）",
      sections: [
        { name: "ライフスタジオ豊川店 - 店舗情報・地図", anchor: "/access" },
        { name: "ライフスタジオ浜松店 - 店舗情報・地図", anchor: "/access" },
        { name: "Q&A - ご予約・営業に関するご質問", anchor: "/access" },
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>サイトマップ | amorétto - LifeCasting® Studio</title>
        <meta name="description" content="amorétto（アモレット）公式サイトのサイトマップ。愛知県と浜松の2拠点で展開するLifeCasting®専門スタジオの全ページ一覧。" />
        <link rel="canonical" href="https://lifecastingstudio-amoretto.com/sitemap" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12 md:mb-16 text-center">
              <h1 className="text-4xl md:text-6xl text-[#2C2C2C] italic font-light tracking-wide mb-4 font-en-serif">
                Sitemap
              </h1>
              <p className="text-[10px] md:text-sm text-[#999999] tracking-[0.3em] uppercase">
                サイトマップ
              </p>
            </div>

            <nav aria-label="サイトマップ">
              <ul className="space-y-10 md:space-y-12">
                {siteStructure.map((page) => (
                  <li key={page.path} className="border-b border-[#E5E0D8] pb-8 md:pb-10">
                    <Link 
                      to={page.path}
                      className="group block mb-3"
                    >
                      <h2 className="font-jp-serif text-xl md:text-2xl text-[#2C2C2C] group-hover:text-[#C4A962] transition-colors">
                        {page.title}
                      </h2>
                    </Link>
                    <p className="text-[#666666] text-sm leading-relaxed mb-4 font-light">
                      {page.description}
                    </p>
                    {page.sections.length > 0 && (
                      <ul className="space-y-2 pl-4 border-l-2 border-[#E5E0D8]">
                        {page.sections.map((section, idx) => (
                          <li key={idx}>
                            <Link 
                              to={section.anchor}
                              className="text-[#999999] text-sm hover:text-[#C4A962] transition-colors font-light"
                            >
                              {section.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-12 md:mt-16 p-6 md:p-8 bg-white border border-[#E5E0D8] rounded-sm">
              <h2 className="font-jp-serif text-lg text-[#2C2C2C] mb-4">お問い合わせ</h2>
              <div className="space-y-4 text-sm text-[#666666] font-light">
                <p className="font-medium text-[#2C2C2C]">amorétto (アモレット) - LifeCasting® Studio</p>
                <div>
                  <p className="font-medium text-[#2C2C2C] mb-1">豊川店</p>
                  <p>〒442-0037 愛知県豊川市門前町15</p>
                  <p>TEL: <a href="tel:0533569494" className="hover:text-[#C4A962] transition-colors">0533-56-9494</a></p>
                </div>
                <div>
                  <p className="font-medium text-[#2C2C2C] mb-1">浜松店</p>
                  <p>〒433-8122 静岡県浜松市中央区上島6丁目2-30</p>
                  <p>TEL: <a href="tel:0534158775" className="hover:text-[#C4A962] transition-colors">053-415-8775</a></p>
                </div>
                <p>Email: <a href="mailto:lifecasting.timecapsule@gmail.com" className="hover:text-[#C4A962] transition-colors">lifecasting.timecapsule@gmail.com</a></p>
                <p className="pt-2">
                  <Link 
                    to="/reservation"
                    className="text-[#C4A962] hover:underline"
                  >
                    Web予約はこちら
                  </Link>
                  {" / "}
                  <a 
                    href="https://lin.ee/55K9AP6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#06C755] hover:underline"
                  >
                    豊川店 LINE
                  </a>
                  {" / "}
                  <a 
                    href="https://lin.ee/StzkfTW" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#06C755] hover:underline"
                  >
                    浜松店 LINE
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
