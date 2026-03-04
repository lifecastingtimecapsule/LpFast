import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { supabase } from "@/utils/supabase/client";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  image_url: string | null;
  published_at: string | null;
};

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!slug || !supabase) {
        setLoading(false);
        return;
      }
      setError(null);
      const { data, error: err } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, content, category, image_url, published_at")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (cancelled) return;
      if (err) {
        setError("記事の読み込みに失敗しました。");
        setLoading(false);
        return;
      }
      if (!data) {
        setError("記事が見つかりません。");
        setLoading(false);
        return;
      }
      setPost(data as BlogPost);
      setLoading(false);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-3xl text-center text-[#999999]">
          読み込み中です…
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-[#666666] mb-6">{error ?? "記事が見つかりません。"}</p>
          <Link to="/blog" className="text-[#C4A962] hover:underline">
            コラム一覧へ戻る
          </Link>
        </div>
      </section>
    );
  }

  const canonical = `https://lifecastingstudio-amoretto.com/blog/${post.slug}`;

  return (
    <>
      <Helmet>
        <title>{post.title}｜コラム・ブログ｜amorétto LifeCasting® Studio</title>
        <meta
          name="description"
          content={post.excerpt ?? `${post.title} - amorétto公式コラム`}
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt ?? post.title,
            datePublished: post.published_at ?? undefined,
            author: { "@type": "Organization", name: "amorétto スタジオチーム" },
          })}
        </script>
      </Helmet>

      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-[#E5E0D8] overflow-hidden"
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
            <div className="p-6 md:p-10">
            <header className="mb-8">
              <div className="flex items-center gap-3 text-[10px] md:text-xs text-[#999999] tracking-widest uppercase mb-3">
                <span>{post.category ?? "Journal"}</span>
                {post.published_at && (
                  <>
                    <span className="w-px h-3 bg-[#E5E0D8]" />
                    <span>
                      {new Date(post.published_at).toLocaleDateString("ja-JP")}
                    </span>
                  </>
                )}
              </div>
              <h1 className="font-jp-serif text-2xl md:text-3xl text-[#2C2C2C] mb-4">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-sm md:text-base text-[#666666] leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              <p className="text-[11px] md:text-xs text-[#999999] mt-4">
                著者: amorétto スタジオチーム
              </p>
            </header>

            {post.content && (
              <div
                className="blog-article-body prose prose-sm md:prose-base max-w-none text-[#2C2C2C]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}

            <footer className="mt-10 pt-6 border-t border-[#E5E0D8]">
              <Link
                to="/blog"
                className="text-sm text-[#C4A962] hover:underline"
              >
                ← コラム一覧へ戻る
              </Link>
            </footer>
            </div>
          </motion.article>
        </div>
      </section>
    </>
  );
}
