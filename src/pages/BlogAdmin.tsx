import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/utils/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  image_url: string | null;
  published: boolean;
  published_at: string | null;
};

export function BlogAdmin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const { profile, loading: profileLoading, isStaffOrAdmin } = useProfile(session);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => {
      setSession(sess);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session || !supabase) return;
    const loadPosts = async () => {
      setLoadError(null);
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          "id, title, slug, excerpt, content, category, image_url, published, published_at"
        )
        .order("created_at", { ascending: false });
      if (error) {
        setLoadError("記事一覧の取得に失敗しました。");
        return;
      }
      setPosts((data as BlogPost[]) ?? []);
    };
    loadPosts();
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setAuthError("ログインに失敗しました。メール/パスワードをご確認ください。");
    }
  };

  const deletePost = async (id: string) => {
    if (!supabase) return;
    if (!window.confirm("この記事を削除しますか？この操作は取り消せません。")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      alert("削除に失敗しました: " + error.message);
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  if (!supabase) {
    return (
      <div className="pt-32 pb-20 px-6">
        <p>Supabase の設定がまだ完了していません。</p>
      </div>
    );
  }

  if (!session) {
    return (
      <>
        <Helmet>
          <title>Blog Admin Login | amorétto</title>
        </Helmet>
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
          <div className="container mx-auto max-w-md">
            <h1 className="text-2xl mb-6 font-jp-serif text-[#2C2C2C]">
              ブログ管理ログイン（スタッフ・管理者用）
            </h1>
            <form onSubmit={handleLogin} className="space-y-4 bg-white p-6 border border-[#E5E0D8]">
              <div>
                <label className="block text-xs mb-1 text-[#666666]">
                  メールアドレス
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs mb-1 text-[#666666]">
                  パスワード
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {authError && (
                <p className="text-xs text-red-500">{authError}</p>
              )}
              <Button type="submit" className="w-full">
                ログイン
              </Button>
            </form>
            <p className="mt-4 text-[11px] text-[#999999]">
              ※ スタッフ・管理者アカウントでログインしてください。Supabase Dashboard で profiles の role を staff または admin に設定してください。
            </p>
          </div>
        </section>
      </>
    );
  }

  if (profileLoading) {
    return (
      <section className="pt-32 pb-20 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-md text-center text-[#666666]">
          読み込み中…
        </div>
      </section>
    );
  }

  if (!isStaffOrAdmin) {
    return (
      <>
        <Helmet>
          <title>権限がありません | amorétto</title>
        </Helmet>
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
          <div className="container mx-auto max-w-md text-center">
            <h1 className="text-xl font-jp-serif text-[#2C2C2C] mb-4">
              ブログの投稿権限がありません
            </h1>
            <p className="text-sm text-[#666666]">
              ブログの投稿・編集はスタッフまたは管理者のみ可能です。お客様アカウントではご利用いただけません。
            </p>
            <button
              type="button"
              onClick={() => supabase?.auth.signOut()}
              className="mt-6 text-sm text-[#C4A962] hover:underline"
            >
              ログアウト
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog Admin | amorétto</title>
      </Helmet>
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-4 md:px-6 bg-[#FAFAF8] min-h-screen">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-jp-serif text-[#2C2C2C]">記事一覧</h1>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-[#C4A962] hover:bg-[#B39952]"
                onClick={() => navigate("/admin/blog/new")}
              >
                新規作成
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => supabase?.auth.signOut()}
              >
                ログアウト
              </Button>
            </div>
          </div>

          {loadError && (
            <p className="text-xs text-red-500 mb-4">{loadError}</p>
          )}

          <div className="bg-white border border-[#E5E0D8] rounded-lg overflow-hidden">
            {posts.length === 0 ? (
              <p className="text-sm text-[#999999] p-6 text-center">まだ記事がありません。</p>
            ) : (
              <ul className="divide-y divide-[#E5E0D8]">
                {posts.map((p) => (
                  <li key={p.id} className="group flex items-center gap-1 hover:bg-[#FAFAF8] transition-colors">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/blog/edit/${p.id}`)}
                      className="flex-1 text-left px-4 py-3 min-w-0"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-[#2C2C2C] truncate">
                          {p.title || "（無題）"}
                        </span>
                        <span
                          className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded ${
                            p.published
                              ? "bg-[#C4A962]/20 text-[#2C2C2C]"
                              : "bg-[#E5E0D8] text-[#666666]"
                          }`}
                        >
                          {p.published ? "公開" : "下書き"}
                        </span>
                      </div>
                      {p.excerpt && (
                        <p className="text-[11px] text-[#999999] truncate mt-0.5">
                          {p.excerpt}
                        </p>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => deletePost(p.id)}
                      className="shrink-0 mr-3 p-1.5 text-[#999999] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      title="削除"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

