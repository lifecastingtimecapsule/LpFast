import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";

export function Company() {
  return (
    <>
      <Helmet>
        <title>会社概要・運営情報｜amorétto LifeCasting® Studio - 立体手形・ライフキャスティング</title>
        <meta
          name="description"
          content="日本初のLifeCasting®（ライフキャスティング・立体手形）専門スタジオamoréttoの会社概要・運営情報。事業内容、愛知県豊川・浜松の2拠点、連絡先などをご案内します。"
        />
        <link rel="canonical" href="https://lifecastingstudio-amoretto.com/company" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="会社概要・運営情報｜amorétto LifeCasting® Studio" />
        <meta property="og:description" content="日本初のLifeCasting®（ライフキャスティング・立体手形）専門スタジオamoréttoの会社概要。愛知県豊川・浜松の2拠点。" />
        <meta property="og:url" content="https://lifecastingstudio-amoretto.com/company" />
        <meta property="og:image" content="https://lifecastingstudio-amoretto.com/og-image.jpg" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:site_name" content="amorétto LifeCasting® Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="会社概要｜amorétto LifeCasting® Studio" />
        <meta name="twitter:description" content="日本初のLifeCasting®（立体手形）専門スタジオamoréttoの会社概要・運営情報。" />
        <meta name="twitter:image" content="https://lifecastingstudio-amoretto.com/og-image.jpg" />
      </Helmet>

      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8]">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12 md:mb-16 text-center">
              <h1 className="text-4xl md:text-6xl text-[#2C2C2C] italic font-light tracking-wide mb-4 font-en-serif">
                Company
              </h1>
              <p className="text-[10px] md:text-sm text-[#999999] tracking-[0.3em] uppercase">
                会社概要・運営情報
              </p>
            </div>

            {/* 会社概要 */}
            <section className="mb-16 md:mb-20 bg-white border border-[#E5E0D8] p-6 md:p-10">
              <h2 className="font-jp-serif text-xl md:text-2xl text-[#2C2C2C] mb-6">
                1. 会社概要
              </h2>
              <dl className="grid grid-cols-1 md:grid-cols-[180px,1fr] gap-x-8 gap-y-4 text-sm text-[#4A4A4A]">
                <dt className="font-medium text-[#2C2C2C]">屋号 / ブランド名</dt>
                <dd>amorétto（アモレット） / LifeCasting® Studio</dd>

                <dt className="font-medium text-[#2C2C2C]">事業内容</dt>
                <dd>
                  立体手形・足形アート（LifeCasting®）の企画・制作・販売 /
                  写真撮影との複合アート作品の企画・販売 /
                  LifeCasting®技術の講座・スクール運営
                </dd>

                <dt className="font-medium text-[#2C2C2C]">運営体制</dt>
                <dd>
                  amorétto オーナーを中心に、
                  2025年より株式会社ラヴレターズ 林氏との共同経営体制で運営。
                </dd>

                <dt className="font-medium text-[#2C2C2C]">
                  運営拠点（豊川スタジオ）
                </dt>
                <dd>
                  〒442-0037 愛知県豊川市門前町15
                  <br />
                  TEL: 0533-56-9494
                </dd>

                <dt className="font-medium text-[#2C2C2C]">
                  運営拠点（浜松スタジオ）
                </dt>
                <dd>
                  〒433-8122 静岡県浜松市中央区上島6丁目2-30
                  <br />
                  TEL: 053-415-8775
                </dd>

                <dt className="font-medium text-[#2C2C2C]">メールアドレス</dt>
                <dd>
                  <a
                    href="mailto:lifecasting.timecapsule@gmail.com"
                    className="hover:text-[#C4A962] transition-colors"
                  >
                    lifecasting.timecapsule@gmail.com
                  </a>
                </dd>

                <dt className="font-medium text-[#2C2C2C]">Webサイト</dt>
                <dd>
                  <a
                    href="https://lifecastingstudio-amoretto.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C4A962] transition-colors"
                  >
                    https://lifecastingstudio-amoretto.com/
                  </a>
                </dd>

                <dt className="font-medium text-[#2C2C2C]">営業時間</dt>
                <dd>火・水 9:00〜17:00（その他の曜日・時間は応相談）</dd>

                <dt className="font-medium text-[#2C2C2C]">主な対応エリア</dt>
                <dd>愛知県（豊川市周辺） / 静岡県（浜松市周辺）</dd>
              </dl>
            </section>

            {/* 私たちのあり方 */}
            <section className="mb-16 md:mb-20 bg-white border border-[#E5E0D8] p-6 md:p-10">
              <h2 className="font-jp-serif text-xl md:text-2xl text-[#2C2C2C] mb-6">
                2. 私たちのあり方 - 「写真スタジオ」から、「ライフキャスティング™スタジオ」へ
              </h2>
              <div className="space-y-6 text-sm md:text-[0.95rem] text-[#4A4A4A] leading-[2.1] tracking-wide">
                <p>
                  amoréttoは、単なる写真スタジオでも、手型・足型を作るだけの作業場でもありません。
                  私たちが提供したいのは、家族だけの
                  <strong className="font-medium text-[#2C2C2C]">
                    「じかん」と「ものがたり」
                  </strong>
                  を生み出す新しい場所です。
                </p>
                <p>
                  写真は「あの日」の記憶を呼び覚ますチケットですが、立体手形・足形（LifeCasting®）は
                  <strong className="font-medium text-[#2C2C2C]">
                    「あの日」にもう一度触れられる扉
                  </strong>
                  だと私たちは考えています。
                </p>
                <p>
                  我が子の成長は嬉しい。けれど、「これ以上大きくならないで」とも思ってしまう——。
                  その相反する感情は、一生報われることのない、見返りを求めない「片想い」に似ています。
                  私たちはこの甘くて少し苦い感情を、「amorétto」という名前に託しました。
                </p>
                <p>
                  いつか手を離れ、自由に歩き出す我が子を想う、甘く切ない
                  <strong className="font-medium text-[#2C2C2C]">
                    無償の愛
                  </strong>
                  。そのかけがえのない気持ちに、触れられるかたちを与えること——それが、私たちがライフキャスティング™を続ける理由です。
                </p>
              </div>
            </section>

            {/* 沿革 */}
            <section className="bg-white border border-[#E5E0D8] p-6 md:p-10">
              <h2 className="font-jp-serif text-xl md:text-2xl text-[#2C2C2C] mb-6">
                3. 沿革
              </h2>
              <ul className="space-y-3 text-sm text-[#4A4A4A] leading-relaxed">
                <li>
                  <span className="inline-block w-28 font-medium text-[#2C2C2C]">
                    2023年
                  </span>
                  LifeCasting®による立体手形・足形アート制作を本格的に開始し、「LifeCasting®」として商標登録を取得
                </li>
                <li>
                  <span className="inline-block w-28 font-medium text-[#2C2C2C]">
                    2025年
                  </span>
                  株式会社ラヴレターズ 林氏との共同経営体制へ移行し、日本初の専門スタジオとしてブランドと品質基準の発信を強化
                </li>
              </ul>
            </section>
          </motion.div>
        </div>
      </section>
    </>
  );
}

