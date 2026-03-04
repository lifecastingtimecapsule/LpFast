import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/utils/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/RichTextEditor";

const BLOG_IMAGES_BUCKET = "blog-images";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showNewEditor, setShowNewEditor] = useState(false);
  const [form, setForm] = useState<Partial<BlogPost>>({});
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

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

  useEffect(() => {
    if (session && typeof window !== "undefined" && new URLSearchParams(window.location.search).get("new") === "1") {
      startNew();
    }
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

  const startNew = () => {
    setSelectedId(null);
    setShowNewEditor(true);
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      image_url: null,
      published: false,
    });
  };

  const editPost = (post: BlogPost) => {
    setSelectedId(post.id);
    setShowNewEditor(false);
    setForm(post);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!supabase || !session?.user) return null;
    const ext = file.name.replace(/^.*\./, "") || "jpg";
    const path = `${session.user.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from(BLOG_IMAGES_BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      alert("画像のアップロードに失敗しました: " + error.message);
      return null;
    }
    const { data: urlData } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(path);
    return urlData.publicUrl;
  };

  const slugFromTitle = (title: string): string => {
    const s = title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return s || `post-${Date.now()}`;
  };

  const savePost = async (publish: boolean) => {
    if (!supabase) return;
    if (!form.title?.trim()) {
      alert("タイトルを入力してください。");
      return;
    }
    setSaving(true);
    const slug = selectedId ? (form.slug ?? "") : slugFromTitle(form.title);
    const payload: any = {
      title: form.title.trim(),
      slug: slug || slugFromTitle(form.title),
      excerpt: form.excerpt ?? null,
      content: form.content ?? null,
      category: form.category ?? null,
      image_url: form.image_url ?? null,
      published: publish,
      published_at: publish
        ? form.published_at ?? new Date().toISOString()
        : null,
    };
    let error;
    let insertedRow: BlogPost | null = null;
    if (selectedId) {
      ({ error } = await supabase
        .from("blog_posts")
        .update(payload)
        .eq("id", selectedId));
    } else {
      const res = await supabase
        .from("blog_posts")
        .insert(payload)
        .select("id, title, slug, excerpt, content, category, image_url, published, published_at")
        .single();
      error = res.error;
      insertedRow = res.data as BlogPost | null;
    }
    if (error) {
      alert("保存に失敗しました: " + error.message);
    } else {
      const { data } = await supabase
        .from("blog_posts")
        .select(
          "id, title, slug, excerpt, content, category, image_url, published, published_at"
        )
        .order("created_at", { ascending: false });
      setPosts((data as BlogPost[]) ?? []);
      if (insertedRow) {
        setSelectedId(insertedRow.id);
        setShowNewEditor(false);
        setForm(insertedRow);
      }
    }
    setSaving(false);
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

  const hasForm = selectedId !== null || showNewEditor;

  return (
    <>
      <Helmet>
        <title>Blog Admin | amorétto</title>
      </Helmet>
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-4 md:px-6 bg-[#FAFAF8] min-h-screen">
        <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* 左: 記事一覧サイドバー */}
          <aside className="lg:w-72 shrink-0 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-base font-jp-serif text-[#2C2C2C]">
                記事一覧
              </h1>
              <Button
                size="sm"
                className="bg-[#C4A962] hover:bg-[#B39952]"
                onClick={startNew}
              >
                新規作成
              </Button>
            </div>
            {loadError && (
              <p className="text-xs text-red-500 mb-2">{loadError}</p>
            )}
            <nav className="flex-1 min-h-0 bg-white border border-[#E5E0D8] rounded-lg overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {posts.length === 0 && (
                  <p className="text-xs text-[#999999] p-3">まだ記事がありません。</p>
                )}
                {posts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => editPost(p)}
                    className={`w-full text-left px-3 py-2.5 rounded-md transition-colors ${
                      selectedId === p.id
                        ? "bg-[#C4A962]/15 border border-[#C4A962]/40"
                        : "hover:bg-[#FAFAF8] border border-transparent"
                    }`}
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
                ))}
              </div>
            </nav>
          </aside>

          {/* 右: 編集エリア */}
          <main className="flex-1 min-w-0">
            {!hasForm ? (
              <div className="h-64 flex items-center justify-center bg-white border border-[#E5E0D8] rounded-lg">
                <p className="text-sm text-[#999999]">
                  左の「新規作成」か記事をクリックして編集してください
                </p>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E0D8] rounded-lg shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 md:p-6 border-b border-[#E5E0D8] bg-[#FAFAF8]/50">
                  <h2 className="text-lg font-jp-serif text-[#2C2C2C] mb-4">
                    {selectedId ? "記事を編集" : "新規記事"}
                  </h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                      トップ画像（記事の一番上に表示されます）
                    </label>
                    {form.image_url ? (
                      <div className="flex items-start gap-3">
                        <img
                          src={form.image_url}
                          alt="トップ画像"
                          className="w-40 h-28 object-cover rounded border border-[#E5E0D8]"
                        />
                        <div className="flex flex-col gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setForm((f) => ({ ...f, image_url: null }))}
                          >
                            削除
                          </Button>
                          <label className="text-xs text-[#666666] cursor-pointer">
                            差し替え
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/gif,image/webp"
                              className="sr-only"
                              disabled={uploadingImage}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setUploadingImage(true);
                                const url = await uploadImage(file);
                                if (url) setForm((f) => ({ ...f, image_url: url }));
                                setUploadingImage(false);
                                e.target.value = "";
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label className="inline-flex flex-col items-center gap-2 p-4 border border-dashed border-[#E5E0D8] rounded-lg cursor-pointer hover:bg-[#FAFAF8]">
                        <span className="text-sm text-[#666666]">
                          {uploadingImage ? "アップロード中…" : "画像を選択してアップロード"}
                        </span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          className="sr-only"
                          disabled={uploadingImage}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setUploadingImage(true);
                            const url = await uploadImage(file);
                            if (url) setForm((f) => ({ ...f, image_url: url }));
                            setUploadingImage(false);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                        タイトル
                      </label>
                      <Input
                        placeholder="例: なぜ写真だけではなく、立体手形なのか"
                        className="text-base"
                        value={form.title ?? ""}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, title: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                        カテゴリ
                      </label>
                      <Input
                        placeholder="例: コンセプト"
                        value={form.category ?? ""}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, category: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6 flex-1 flex flex-col gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                      リード文（一覧ページに表示）
                    </label>
                    <Textarea
                      placeholder="記事の要約や導入を1〜3行で"
                      rows={4}
                      className="resize-y min-h-[100px]"
                      value={form.excerpt ?? ""}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, excerpt: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex-1 flex flex-col min-h-0">
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                      本文（見出し・太字・配置など）
                    </label>
                    <RichTextEditor
                      value={form.content ?? ""}
                      onChange={(html) =>
                        setForm((f) => ({ ...f, content: html }))
                      }
                      minHeight="320px"
                    />
                  </div>
                </div>

                <div className="p-4 md:p-6 border-t border-[#E5E0D8] bg-[#FAFAF8]/50 flex flex-wrap gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={saving}
                    onClick={() => savePost(false)}
                  >
                    {saving ? "保存中…" : "下書き保存"}
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#C4A962] hover:bg-[#B39952]"
                    disabled={saving}
                    onClick={() => savePost(true)}
                  >
                    {saving ? "保存中…" : "公開する"}
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </section>
    </>
  );
}

