import { Helmet } from "react-helmet-async";

export function Terms() {
  return (
    <>
      <Helmet>
        <title>利用規約｜amorétto LifeCasting® Studio</title>
        <meta
          name="description"
          content="amorétto LifeCasting® Studio の利用規約。予約・キャンセル・お支払いなどの基本的なご利用条件について記載しています。"
        />
        <link
          rel="canonical"
          href="https://lifecastingstudio-amoretto.com/terms"
        />
      </Helmet>
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-3xl text-sm md:text-[0.95rem] text-[#4A4A4A] leading-relaxed">
          <h1 className="text-3xl md:text-4xl text-[#2C2C2C] mb-8 font-jp-serif">
            利用規約
          </h1>
          <p className="mb-4">
            本規約は、amorétto LifeCasting® Studio（以下「当スタジオ」といいます）が提供するサービスのご利用条件を定めるものです。
            ご予約・ご利用にあたっては、本規約に同意いただいたものとみなします。
          </p>
          <p className="text-[11px] text-[#999999]">
            ※本ページの文面はひな型レベルであり、実運用時には顧問専門家等とともに内容をご確認ください。
          </p>
        </div>
      </section>
    </>
  );
}

