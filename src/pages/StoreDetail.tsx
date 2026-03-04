import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { getLocationById } from "@/data/reservationCatalog";
import * as reservationQueries from "@/utils/supabase/reservationQueries";
import type { StaticLocationRow } from "@/data/reservationCatalog";

export function StoreDetail() {
  const { id } = useParams<{ id: string }>();
  const staticStore = id ? getLocationById(id) : undefined;

  const [store, setStore] = useState<StaticLocationRow | null>(staticStore ?? null);
  const [loading, setLoading] = useState(!staticStore && !!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (staticStore || !id) return;
    reservationQueries.getLocationByIdFromDb(id)
      .then((row) => {
        if (!row) { setError("店舗が見つかりません。"); return; }
        setStore(row);
      })
      .catch(() => setError("店舗情報の取得に失敗しました。"))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <section className="pt-32 pb-20 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-2xl text-center text-[#999999]">
          読み込み中…
        </div>
      </section>
    );
  }

  if (error || !store) {
    return (
      <section className="pt-32 pb-20 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-[#666666] mb-6">{error ?? "店舗が見つかりません。"}</p>
          <Link to="/stores" className="text-[#C4A962] hover:underline">
            店舗一覧へ戻る
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{store.name}｜店舗紹介｜amorétto LifeCasting® Studio</title>
        <meta
          name="description"
          content={`${store.name}の店舗情報。${store.address_text ?? ""} ${store.phone ?? ""}。立体手形・足形アートのご予約はこちら。`}
        />
        <link
          rel="canonical"
          href={`https://lifecastingstudio-amoretto.com/stores/${store.id}`}
        />
      </Helmet>
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-2xl">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-[#E5E0D8] p-6 md:p-10 rounded-lg"
          >
            <h1 className="font-jp-serif text-2xl md:text-3xl text-[#2C2C2C] mb-6">
              {store.name}
            </h1>
            <dl className="space-y-4 text-sm">
              {(store.postal_code || store.address_text) && (
                <div>
                  <dt className="text-[#999999] font-medium mb-0.5">住所</dt>
                  <dd className="text-[#2C2C2C]">
                    {[store.postal_code, store.address_text].filter(Boolean).join(" ")}
                  </dd>
                </div>
              )}
              {store.phone && (
                <div>
                  <dt className="text-[#999999] font-medium mb-0.5">電話番号</dt>
                  <dd className="text-[#2C2C2C]">
                    <a href={`tel:${store.phone}`} className="hover:text-[#C4A962]">
                      {store.phone}
                    </a>
                  </dd>
                </div>
              )}
              {store.email && (
                <div>
                  <dt className="text-[#999999] font-medium mb-0.5">メール</dt>
                  <dd className="text-[#2C2C2C]">
                    <a href={`mailto:${store.email}`} className="hover:text-[#C4A962]">
                      {store.email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            {store.description && (
              <div className="mt-6 pt-6 border-t border-[#E5E0D8]">
                <h2 className="text-sm font-medium text-[#999999] mb-2">店舗紹介</h2>
                <p className="text-[#2C2C2C] leading-relaxed whitespace-pre-wrap">
                  {store.description}
                </p>
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/reservation"
                className="inline-flex items-center justify-center rounded border border-[#C4A962] bg-[#C4A962] text-white px-4 py-2 text-sm hover:bg-[#B39952] transition-colors"
              >
                ご予約はこちら
              </Link>
              <Link
                to="/stores"
                className="inline-flex items-center justify-center rounded border border-[#E5E0D8] text-[#666666] px-4 py-2 text-sm hover:bg-[#FAFAF8] transition-colors"
              >
                ← 店舗一覧へ
              </Link>
            </div>
          </motion.article>
        </div>
      </section>
    </>
  );
}
