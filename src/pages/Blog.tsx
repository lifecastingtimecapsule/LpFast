import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useProfile } from "@/hooks/useProfile";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  image_url: string | null;
  published_at: string | null;
};

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => setSession(sess));
    return () => sub.subscription.unsubscribe();
  }, []);

  const { isStaffOrAdmin } = useProfile(session);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      setError(null);
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          "id, slug, title, excerpt, category, image_url, published_at"
        )
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (cancelled) return;
      if (error) {
        setError("記事の読み込みに失敗しました。時間をおいて再度お試しください。");
        setLoading(false);
        return;
      }
      setPosts((data as BlogPost[]) ?? []);
      setLoading(false);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>コラム・ブログ｜amorétto LifeCasting® Studio</title>
        <meta
          name="description"
          content="日本初のLifeCasting®専門スタジオamoréttoによる公式コラム。立体手形・足形アートへの想い、制作の裏側、豊川店・浜松店で生まれた家族の物語をお届けします。"
        />
        <link
          rel="canonical"
          href="https://lifecastingstudio-amoretto.com/blog"
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "amorétto LifeCasting® Blog",
              "description": "立体手形・足形アートに関するコラムや制作ストーリーを発信する公式ブログ。",
              "url": "https://lifecastingstudio-amoretto.com/blog",
              "inLanguage": "ja"
            }
          `}
        </script>
      </Helmet>

      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8 md:mb-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <h1 className="text-4xl md:text-6xl text-[#2C2C2C] italic font-light tracking-wide font-en-serif">
                  Journal
                </h1>
                {isStaffOrAdmin && (
                  <Link
                    to="/admin/blog?new=1"
                    className="text-sm px-4 py-2 rounded border border-[#C4A962] text-[#C4A962] hover:bg-[#C4A962]/10 transition-colors"
                  >
                    新規投稿
                  </Link>
                )}
              </div>
              <p className="text-[10px] md:text-sm text-[#999999] tracking-[0.3em] uppercase mt-4">
                コラム・ブログ
              </p>
              <p className="text-xs md:text-sm text-[#666666]">
                amoréttoスタジオチームによるコラムと制作ストーリーをお届けします。
              </p>
            </div>

            {loading && (
              <p className="text-center text-sm text-[#999999]">読み込み中です…</p>
            )}

            {error && !loading && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}

            {!loading && !error && (
              <div className="grid gap-8 md:gap-10">
                {posts.length === 0 && (
                  <p className="text-center text-sm text-[#999999]">
                    公開中のコラムはまだありません。
                  </p>
                )}
                {posts.map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`}>
                    <article
                      className="bg-white border border-[#E5E0D8] overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                    >
                      {post.image_url && (
                        <div className="aspect-[16/10] w-full overflow-hidden bg-[#E5E0D8]">
                          <img
                            src={post.image_url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6 md:p-8">
                        <header className="mb-4">
                          <div className="flex items-center gap-3 text-[10px] md:text-xs text-[#999999] tracking-widest uppercase mb-2">
                          <span>{post.category ?? "Journal"}</span>
                          {post.published_at && (
                            <>
                              <span className="w-px h-3 bg-[#E5E0D8]" />
                              <span>
                                {new Date(post.published_at).toLocaleDateString(
                                  "ja-JP"
                                )}
                              </span>
                            </>
                          )}
                        </div>
                        <h2 className="font-jp-serif text-xl md:text-2xl text-[#2C2C2C] mb-2">
                          {post.title}
                        </h2>
                      </header>
                      {post.excerpt && (
                        <p className="text-sm md:text-[0.95rem] text-[#666666] leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      )}
                        <p className="text-[11px] md:text-xs text-[#999999]">
                          著者: amorétto スタジオチーム
                        </p>
                        <p className="text-xs text-[#C4A962] mt-2">続きを読む →</p>
                      </div>
                    </article>
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

