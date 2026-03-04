import { Helmet } from "react-helmet-async";

export function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>プライバシーポリシー｜amorétto LifeCasting® Studio</title>
        <meta
          name="description"
          content="amorétto LifeCasting® Studio のプライバシーポリシー。お客様からお預かりした個人情報の取り扱いについて記載しています。"
        />
        <link
          rel="canonical"
          href="https://lifecastingstudio-amoretto.com/privacy"
        />
      </Helmet>
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-3xl text-sm md:text-[0.95rem] text-[#4A4A4A] leading-relaxed">
          <h1 className="text-3xl md:text-4xl text-[#2C2C2C] mb-8 font-jp-serif">
            プライバシーポリシー
          </h1>
          <p className="mb-4">
            amorétto LifeCasting® Studio（以下「当スタジオ」といいます）は、
            お客様からお預かりする個人情報を適切に取り扱うことを重要な責務と考え、
            以下の方針に基づき個人情報の保護に努めます。
          </p>
          <p className="text-[11px] text-[#999999]">
            ※本ページの文面はひな型レベルであり、実運用時には顧問専門家等とともに内容をご確認ください。
          </p>
        </div>
      </section>
    </>
  );
}

