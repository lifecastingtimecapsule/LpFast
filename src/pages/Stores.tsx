import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { locations as catalogLocations } from "@/data/reservationCatalog";
import * as reservationQueries from "@/utils/supabase/reservationQueries";
import type { StaticLocationRow } from "@/data/reservationCatalog";

type StoreRow = StaticLocationRow;

export function Stores() {
  const staticList = catalogLocations
    .filter((l) => l.active_flag)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  const [list, setList] = useState<StoreRow[]>(staticList);
  const [loading, setLoading] = useState(staticList.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (staticList.length > 0) return;
    reservationQueries.getLocationsFromDb()
      .then((rows) => {
        setList(
          rows.map((r) => ({
            id: r.location_id,
            name: r.location_name,
            name_kana: null,
            postal_code: null,
            address_text: r.address_text ?? null,
            phone: r.phone ?? null,
            email: null,
            description: null,
            active_flag: r.active_flag,
            sort_order: null,
          }))
        );
      })
      .catch(() => setError("店舗情報の取得に失敗しました。"))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>店舗紹介｜amorétto LifeCasting® Studio</title>
        <meta
          name="description"
          content="立体手形・足形アートが体験できるamoréttoの店舗一覧。お近くのスタジオをご紹介します。"
        />
        <link rel="canonical" href="https://lifecastingstudio-amoretto.com/stores" />
      </Helmet>
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10 md:mb-14 text-center">
              <h1 className="text-3xl md:text-5xl text-[#2C2C2C] italic font-light tracking-wide font-en-serif mb-2">
                Stores
              </h1>
              <p className="text-[10px] md:text-sm text-[#999999] tracking-[0.2em] uppercase">
                店舗紹介
              </p>
              <p className="text-sm text-[#666666] mt-2">
                立体手形・足形アートが体験できるスタジオです。
              </p>
            </div>
            {loading && <p className="text-center text-[#999999]">読み込み中…</p>}
            {error && !loading && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && list.length === 0 && (
              <p className="text-center text-[#666666]">現在、紹介中の店舗はありません。</p>
            )}
            {!loading && !error && list.length > 0 && (
              <div className="grid gap-6 md:gap-8">
                {list.map((loc) => (
                  <Link
                    key={loc.id}
                    to={`/stores/${loc.id}`}
                    className="block bg-white border border-[#E5E0D8] p-6 md:p-8 rounded-lg hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <h2 className="font-jp-serif text-xl md:text-2xl text-[#2C2C2C] mb-3">
                      {loc.name}
                    </h2>
                    {loc.address_text && (
                      <p className="text-sm text-[#666666] mb-1">
                        <span className="text-[#999999] font-medium">住所：</span>
                        {loc.address_text}
                      </p>
                    )}
                    {loc.phone && (
                      <p className="text-sm text-[#666666] mb-2">TEL: {loc.phone}</p>
                    )}
                    {loc.description && (
                      <p className="text-sm text-[#666666] line-clamp-2 mt-2">
                        {loc.description}
                      </p>
                    )}
                    <p className="text-xs text-[#C4A962] mt-3">詳細を見る →</p>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
