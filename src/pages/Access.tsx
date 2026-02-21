import { motion } from "motion/react";
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Calendar as CalendarIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export function Access() {
  return (
    <>
      <Helmet>
        <title>Access | amorétto - 店舗情報・アクセス・ご予約</title>
        <meta name="description" content="愛知・豊川のLifeCasting®専門スタジオamorétto（アモレット）へのアクセス。豊川稲荷より徒歩3分。〒442-0037 愛知県豊川市門前町15。立体手形・産後ギフトのご予約・お問い合わせはこちら。電話: 0533-56-9494" />
        <link rel="canonical" href="https://www.lifecastingstudio-amoretto.com/access" />
        
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="amorétto | LifeCasting® Studio" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content="Access | amorétto - 店舗情報・アクセス" />
        <meta property="og:description" content="愛知・豊川の立体手形アート専門スタジオへのアクセス。豊川稲荷より徒歩3分。" />
        <meta property="og:url" content="https://www.lifecastingstudio-amoretto.com/access" />
        <meta property="og:image" content="https://www.lifecastingstudio-amoretto.com/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Access | amorétto - 店舗情報・アクセス" />
        <meta name="twitter:description" content="愛知・豊川の立体手形アート専門スタジオへのアクセス。豊川稲荷より徒歩3分。" />
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
                  "name": "Access",
                  "item": "https://www.lifecastingstudio-amoretto.com/access"
                }
              ]
            }
          `}
        </script>
        
        {/* 構造化データ: Place（場所情報） */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Place",
              "name": "amorétto (アモレット)",
              "description": "愛知・豊川のLifeCasting®専門スタジオ。立体手形・足形アート制作。",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "門前町15",
                "addressLocality": "豊川市",
                "addressRegion": "愛知県",
                "postalCode": "442-0037",
                "addressCountry": "JP"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 34.825,
                "longitude": 137.39
              },
              "telephone": "+81-533-56-9494",
              "email": "lifecasting.timecapsule@gmail.com",
              "url": "https://www.lifecastingstudio-amoretto.com/",
              "hasMap": "https://maps.google.com/maps?q=愛知県豊川市門前町15",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Tuesday", "Wednesday"],
                  "opens": "09:00",
                  "closes": "17:00"
                }
              ]
            }
          `}
        </script>
        
        {/* 構造化データ: FAQPage */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "火曜・水曜以外の日でも予約できますか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "はい、可能です。基本の営業日は火・水となっておりますが、ご予約枠に空きがあれば他の曜日や時間帯でも柔軟に対応させていただきます。まずはWeb予約の空き状況をご確認いただくか、LINE・お電話にてお気軽にご相談ください。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "駐車場はありますか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "専用駐車場はございませんが、近隣に提携コインパーキングがございます。ご予約の際に詳細な場所をご案内いたしますので、お車でお越しの際はお申し付けください。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "予約時間に遅れそうな場合はどうすればいいですか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ご予約時間に遅れる場合は、お早めにお電話（0533-56-9494）にてご連絡ください。可能な範囲で対応させていただきますが、後のご予約状況によっては時間の短縮や日程変更をお願いする場合がございます。"
                  }
                }
              ]
            }
          `}
        </script>

        {/* 構造化データ: Speakable WebPage */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Access | amorétto - 店舗情報・アクセス・ご予約",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", "h3"]
              },
              "url": "https://www.lifecastingstudio-amoretto.com/access",
              "inLanguage": "ja"
            }
          `}
        </script>
      </Helmet>

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 bg-[#FAFAF8]">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-8xl text-[#2C2C2C] italic font-light tracking-wide mb-4 font-en-serif">
              Access
            </h1>
            <p className="text-[10px] md:text-sm text-[#999999] tracking-[0.3em] uppercase">
              店舗情報・アクセス
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Information & Map --- */}
      <section className="py-16 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            
            {/* Left: Info Text */}
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-12">
                <h2 className="font-en-serif text-3xl text-[#2C2C2C] mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-[#C4A962]"></span>
                  Information
                </h2>

                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[#C4A962] shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-jp-serif text-lg text-[#2C2C2C] mb-2">amorétto (アモレット)</p>
                      <p className="text-[#666666] leading-relaxed text-sm">
                        〒442-0037<br />
                        愛知県豊川市門前町１５
                      </p>
                      <p className="text-[#999999] text-xs mt-2">豊川稲荷より徒歩3分</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <Clock className="text-[#C4A962] shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-jp-serif text-lg text-[#2C2C2C] mb-2">営業時間・定休日</p>
                      <table className="text-sm text-[#666666] border-collapse">
                        <tbody>
                          <tr>
                            <td className="pr-6 py-1 font-medium text-[#2C2C2C]">基本営業日</td>
                            <td className="py-1">火曜日・水曜日</td>
                          </tr>
                          <tr>
                            <td className="pr-6 py-1 font-medium text-[#2C2C2C]">営業時間</td>
                            <td className="py-1">9:00 〜 17:00</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-[#C4A962] text-xs mt-3 bg-[#C4A962]/10 inline-block px-3 py-1 rounded-sm">
                        ※その他の曜日・時間もご相談可能です
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-start gap-4">
                    <Phone className="text-[#C4A962] shrink-0 mt-1" size={20} />
                    <div className="w-full">
                      <p className="font-jp-serif text-lg text-[#2C2C2C] mb-2">お問い合わせ</p>
                      <div className="space-y-3">
                         <a href="tel:0533569494" className="flex items-center gap-3 text-[#2C2C2C] hover:text-[#C4A962] transition-colors border-b border-[#E5E0D8] pb-2">
                           <span className="text-xl font-en-serif">0533-56-9494</span>
                           <span className="text-xs text-[#999999]">（お電話はこちら）</span>
                         </a>
                         <a href="mailto:lifecasting.timecapsule@gmail.com" className="flex items-center gap-3 text-[#666666] hover:text-[#C4A962] transition-colors border-b border-[#E5E0D8] pb-2 break-all">
                           <Mail size={16} />
                           <span className="text-sm">lifecasting.timecapsule@gmail.com</span>
                         </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Map */}
            <motion.div 
              className="md:w-1/2 h-[400px] md:h-auto min-h-[400px] bg-[#F5F3EF] relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Google Map Embed */}
              <iframe 
                src="https://maps.google.com/maps?q=愛知県豊川市門前町１５&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "grayscale(0.5)" }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Google Map"
              ></iframe>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- Q&A Section --- */}
      <section className="py-16 md:py-32 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="font-en-serif text-3xl md:text-4xl text-[#2C2C2C] italic mb-4">
              Q&A
            </h2>
            <p className="text-[10px] md:text-xs text-[#999999] tracking-widest uppercase">
              よくあるご質問（ご予約・営業について）
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
             {[
               { 
                 q: "火曜・水曜以外の日でも予約できますか？", 
                 a: "はい、可能です。基本の営業日は火・水となっておりますが、ご予約枠に空きがあれば他の曜日や時間帯でも柔軟に対応させていただきます。まずはWeb予約の空き状況をご確認いただくか、LINE・お電話にてお気軽にご相談ください。" 
               },
               { 
                 q: "駐車場はありますか？", 
                 a: "専用駐車場はございませんが、近隣に提携コインパーキングがございます。ご予約の際に詳細な場所をご案内いたしますので、お車でお越しの際はお申し付けください。" 
               },
               { 
                 q: "予約時間に遅れそうな場合はどうすればいいですか？", 
                 a: "ご予約時間に遅れる場合は、お早めにお電話（0533-56-9494）にてご連絡ください。可能な範囲で対応させていただきますが、後のご予約状況によっては時間の短縮や日程変更をお願いする場合がございます。" 
               }
             ].map((item, i) => (
               <AccordionItem key={i} value={`item-${i}`} className="border border-[#E5E0D8] rounded-lg px-6 bg-white shadow-sm last:border-b">
                 <AccordionTrigger className="text-[0.9rem] text-[#2C2C2C] font-medium py-5 hover:no-underline hover:text-[#C4A962] transition-colors text-left">
                   <span className="text-[#C4A962] mr-4 font-serif italic">Q.</span>
                   {item.q}
                 </AccordionTrigger>
                 <AccordionContent className="text-[#666666] leading-[2] pb-6 pl-8 text-sm font-light">
                   {item.a}
                 </AccordionContent>
               </AccordionItem>
             ))}
          </Accordion>

          <div className="mt-16 text-center">
             <p className="text-sm text-[#666666] mb-6">その他のご質問やご相談はこちらから</p>
             <a
                href="https://lin.ee/siRIzsZ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-[#06C755] text-white text-sm tracking-wide rounded-sm shadow-md hover:bg-[#05b34c] transition-all"
             >
                LINEで相談する
             </a>
          </div>
        </div>
      </section>

    </>
  );
}