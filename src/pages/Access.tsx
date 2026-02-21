import { motion } from "motion/react";
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Car, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export function Access() {
  return (
    <>
      <Helmet>
        <title>Access | amorétto - 豊川店・浜松店 店舗情報・アクセス・ご予約</title>
        <meta name="description" content="amorétto（アモレット）の立体手形・足形アートは、ライフスタジオ豊川店（愛知県豊川市門前町15）とライフスタジオ浜松店（静岡県浜松市中央区上島6-2-30）の2拠点で型取りが可能です。出産祝い・産後ギフトのご予約・お問い合わせはこちら。" />
        <link rel="canonical" href="https://www.lifecastingstudio-amoretto.com/access" />
        
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="amorétto | LifeCasting® Studio" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content="Access | amorétto - 豊川店・浜松店 店舗情報・アクセス" />
        <meta property="og:description" content="ライフスタジオ豊川店・浜松店の2拠点で立体手形の型取りが可能。店舗情報・アクセス・ご予約はこちら。" />
        <meta property="og:url" content="https://www.lifecastingstudio-amoretto.com/access" />
        <meta property="og:image" content="https://www.lifecastingstudio-amoretto.com/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Access | amorétto - 豊川店・浜松店 店舗情報・アクセス" />
        <meta name="twitter:description" content="ライフスタジオ豊川店・浜松店の2拠点で立体手形の型取りが可能。店舗情報・アクセス・ご予約はこちら。" />
        <meta name="twitter:image" content="https://www.lifecastingstudio-amoretto.com/og-image.jpg" />
        
        {/* BreadcrumbList */}
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
        
        {/* Place - 豊川店 */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Place",
              "@id": "https://www.lifecastingstudio-amoretto.com/#toyokawa-place",
              "name": "amorétto ライフスタジオ豊川店",
              "alternateName": ["アモレット豊川", "ライフスタジオ豊川 立体手形"],
              "description": "愛知県豊川市のLifeCasting®専門スタジオ。赤ちゃんの立体手形・足形アートの型取りが可能。出産祝い・産後ギフトに最適。",
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
                "latitude": 34.8271,
                "longitude": 137.3878
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

        {/* Place - 浜松店 */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Place",
              "@id": "https://www.lifecastingstudio-amoretto.com/#hamamatsu-place",
              "name": "amorétto ライフスタジオ浜松店",
              "alternateName": ["アモレット浜松", "ライフスタジオ浜松 立体手形"],
              "description": "静岡県浜松市のLifeCasting®専門スタジオ。赤ちゃんの立体手形・足形アートの型取りが可能。出産祝い・産後ギフトに最適。",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "上島6丁目2-30",
                "addressLocality": "浜松市中央区",
                "addressRegion": "静岡県",
                "postalCode": "433-8122",
                "addressCountry": "JP"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 34.7307,
                "longitude": 137.7370
              },
              "telephone": "+81-53-415-8775",
              "email": "lifecasting.timecapsule@gmail.com",
              "url": "https://www.lifecastingstudio-amoretto.com/",
              "hasMap": "https://maps.google.com/maps?q=静岡県浜松市中央区上島6丁目2-30",
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
        
        {/* FAQPage */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "豊川店と浜松店、どちらでも立体手形の型取りができますか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "はい、ライフスタジオ豊川店（愛知県豊川市門前町15）とライフスタジオ浜松店（静岡県浜松市中央区上島6-2-30）の2拠点どちらでも立体手形・足形の型取りが可能です。お近くの店舗をお選びください。"
                  }
                },
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
                    "text": "浜松店は店舗前に駐車場をご用意しております。豊川店は提携している近隣の駐車場をご案内いたしますので、ご予約時にお車でお越しの旨をお伝えください。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "予約時間に遅れそうな場合はどうすればいいですか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ご予約時間に遅れる場合は、お早めにご予約店舗へお電話にてご連絡ください。豊川店: 0533-56-9494、浜松店: 053-415-8775。可能な範囲で対応させていただきます。"
                  }
                }
              ]
            }
          `}
        </script>

        {/* Speakable WebPage */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Access | amorétto - 豊川店・浜松店 店舗情報・アクセス・ご予約",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", "h3", ".speakable"]
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
            <p className="text-[10px] md:text-sm text-[#999999] tracking-[0.3em] uppercase mb-4">
              店舗情報・アクセス
            </p>
            <p className="speakable text-sm md:text-base text-[#666666] font-light tracking-wide">
              ライフスタジオ<strong className="font-medium text-[#2C2C2C]">豊川店</strong>・<strong className="font-medium text-[#2C2C2C]">浜松店</strong>の2拠点で立体手形の型取りが可能です
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 豊川店 Information & Map --- */}
      <section className="py-16 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-en-serif text-2xl md:text-3xl text-[#2C2C2C] mb-2 flex items-center gap-3">
              <span className="w-8 h-px bg-[#C4A962]"></span>
              LIFE Studio 豊川店
            </h2>
            <p className="text-xs text-[#999999] tracking-wider ml-11">ライフスタジオ豊川店</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            
            {/* Left: Info Text */}
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#C4A962] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-jp-serif text-lg text-[#2C2C2C] mb-2">amorétto ライフスタジオ豊川店</p>
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
                       <a href="https://lin.ee/55K9AP6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#06C755] hover:text-[#05b34c] transition-colors border-b border-[#E5E0D8] pb-2">
                         <MessageCircle size={16} />
                         <span className="text-sm font-medium">豊川店 LINEで相談する</span>
                       </a>
                       <a href="mailto:lifecasting.timecapsule@gmail.com" className="flex items-center gap-3 text-[#666666] hover:text-[#C4A962] transition-colors border-b border-[#E5E0D8] pb-2 break-all">
                         <Mail size={16} />
                         <span className="text-sm">lifecasting.timecapsule@gmail.com</span>
                       </a>
                    </div>
                  </div>
                </div>

                {/* Parking */}
                <div className="flex items-start gap-4">
                  <Car className="text-[#C4A962] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-jp-serif text-lg text-[#2C2C2C] mb-2">駐車場</p>
                    <p className="text-[#666666] text-sm leading-relaxed">
                      提携している近隣の駐車場をご案内いたします。<br />
                      ご予約時にお車でお越しの旨をお伝えください。
                    </p>
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
              <iframe 
                src="https://maps.google.com/maps?q=愛知県豊川市門前町１５&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "grayscale(0.5)" }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="ライフスタジオ豊川店 Google Map"
              ></iframe>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- 浜松店 Information & Map --- */}
      <section className="py-16 md:py-32 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-en-serif text-2xl md:text-3xl text-[#2C2C2C] mb-2 flex items-center gap-3">
              <span className="w-8 h-px bg-[#C4A962]"></span>
              LIFE Studio 浜松店
            </h2>
            <p className="text-xs text-[#999999] tracking-wider ml-11">ライフスタジオ浜松店（子ども赤ちゃんのフォトスタジオ）</p>
          </motion.div>

          <div className="flex flex-col md:flex-row-reverse gap-12 md:gap-20">
            
            {/* Right: Info Text */}
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#C4A962] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-jp-serif text-lg text-[#2C2C2C] mb-2">amorétto ライフスタジオ浜松店</p>
                    <p className="text-[#666666] leading-relaxed text-sm">
                      〒433-8122<br />
                      静岡県浜松市中央区上島６丁目２−３０
                    </p>
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
                       <a href="tel:0534158775" className="flex items-center gap-3 text-[#2C2C2C] hover:text-[#C4A962] transition-colors border-b border-[#E5E0D8] pb-2">
                         <span className="text-xl font-en-serif">053-415-8775</span>
                         <span className="text-xs text-[#999999]">（お電話はこちら）</span>
                       </a>
                       <a href="https://lin.ee/StzkfTW" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#06C755] hover:text-[#05b34c] transition-colors border-b border-[#E5E0D8] pb-2">
                         <MessageCircle size={16} />
                         <span className="text-sm font-medium">浜松店 LINEで相談する</span>
                       </a>
                       <a href="mailto:lifecasting.timecapsule@gmail.com" className="flex items-center gap-3 text-[#666666] hover:text-[#C4A962] transition-colors border-b border-[#E5E0D8] pb-2 break-all">
                         <Mail size={16} />
                         <span className="text-sm">lifecasting.timecapsule@gmail.com</span>
                       </a>
                    </div>
                  </div>
                </div>

                {/* Parking */}
                <div className="flex items-start gap-4">
                  <Car className="text-[#C4A962] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-jp-serif text-lg text-[#2C2C2C] mb-2">駐車場</p>
                    <p className="text-[#666666] text-sm leading-relaxed">
                      店舗前に駐車場をご用意しております。<br />
                      お車でお気軽にお越しください。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Left: Map */}
            <motion.div 
              className="md:w-1/2 h-[400px] md:h-auto min-h-[400px] bg-[#F5F3EF] relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <iframe 
                src="https://maps.google.com/maps?q=静岡県浜松市中央区上島6丁目2-30&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "grayscale(0.5)" }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="ライフスタジオ浜松店 Google Map"
              ></iframe>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- Q&A Section --- */}
      <section className="py-16 md:py-32 bg-white">
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
                 q: "豊川店と浜松店、どちらでも立体手形の型取りができますか？",
                 a: "はい、ライフスタジオ豊川店（愛知県豊川市）とライフスタジオ浜松店（静岡県浜松市）の2拠点どちらでも、同じクオリティで立体手形・足形の型取りが可能です。お近くの店舗をお選びください。"
               },
               { 
                 q: "火曜・水曜以外の日でも予約できますか？", 
                 a: "はい、可能です。基本の営業日は火・水となっておりますが、ご予約枠に空きがあれば他の曜日や時間帯でも柔軟に対応させていただきます。まずはWeb予約の空き状況をご確認いただくか、LINE・お電話にてお気軽にご相談ください。" 
               },
               { 
                 q: "駐車場はありますか？", 
                 a: "浜松店は店舗前に駐車場をご用意しております。豊川店は提携している近隣の駐車場をご案内いたしますので、ご予約時にお車でお越しの旨をお伝えください。" 
               },
               { 
                 q: "予約時間に遅れそうな場合はどうすればいいですか？", 
                 a: "ご予約時間に遅れる場合は、お早めにご予約店舗へお電話にてご連絡ください。豊川店: 0533-56-9494、浜松店: 053-415-8775。可能な範囲で対応させていただきますが、後のご予約状況によっては時間の短縮や日程変更をお願いする場合がございます。" 
               },
               {
                 q: "豊川店と浜松店でプランや料金は同じですか？",
                 a: "はい、両店舗とも同じプラン・料金でご利用いただけます。amorétto Collectionプラン（写真なし）とPremium Foto Collectionプラン（写真付き）からお選びいただけます。"
               }
             ].map((item, i) => (
               <AccordionItem key={i} value={`item-${i}`} className="border border-[#E5E0D8] rounded-lg px-6 bg-[#FAFAF8] shadow-sm last:border-b">
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
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <a
                  href="https://lin.ee/55K9AP6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#06C755] text-white text-sm tracking-wide rounded-sm shadow-md hover:bg-[#05b34c] transition-all"
               >
                  豊川店 LINEで相談
               </a>
               <a
                  href="https://lin.ee/StzkfTW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#06C755] text-white text-sm tracking-wide rounded-sm shadow-md hover:bg-[#05b34c] transition-all"
               >
                  浜松店 LINEで相談
               </a>
             </div>
          </div>
        </div>
      </section>

    </>
  );
}
