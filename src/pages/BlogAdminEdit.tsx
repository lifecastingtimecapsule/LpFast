import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export function BlogAdminEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isNew = !id || id === "new";

  const [session, setSession] = useState<any>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    image_url: null,
    published: false,
  });
  const [saving, setSaving] = useState(false);
  const [loadingPost, setLoadingPost] = useState(!isNew);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { loading: profileLoading, isStaffOrAdmin } = useProfile(session);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => {
      setSession(sess);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Load existing post
  useEffect(() => {
    if (isNew || !id || !session || !supabase) return;
    setLoadingPost(true);
    supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, content, category, image_url, published, published_at")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          alert("記事の取得に失敗しました");
          navigate("/admin/blog");
        } else {
          setForm(data as BlogPost);
        }
        setLoadingPost(false);
      });
  }, [id, isNew, session]);

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
    const slug = !isNew ? (form.slug ?? "") : slugFromTitle(form.title);
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
    if (!isNew && id) {
      ({ error } = await supabase.from("blog_posts").update(payload).eq("id", id));
    } else {
      ({ error } = await supabase.from("blog_posts").insert(payload));
    }
    setSaving(false);
    if (error) {
      alert("保存に失敗しました: " + error.message);
    } else {
      navigate("/admin/blog");
    }
  };

  if (!supabase) {
    return (
      <div className="pt-32 pb-20 px-6">
        <p>Supabase の設定がまだ完了していません。</p>
      </div>
    );
  }

  if (!session || profileLoading) {
    return (
      <section className="pt-32 pb-20 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-md text-center text-[#666666]">
          読み込み中…
        </div>
      </section>
    );
  }

  if (!isStaffOrAdmin) {
    navigate("/admin/blog");
    return null;
  }

  if (loadingPost) {
    return (
      <section className="pt-32 pb-20 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-md text-center text-[#666666]">
          読み込み中…
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isNew ? "新規記事" : "記事を編集"} | amorétto Blog Admin</title>
      </Helmet>
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-4 md:px-6 bg-[#FAFAF8] min-h-screen">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/blog")}
                className="text-[#666666] hover:text-[#2C2C2C] transition-colors"
                title="記事一覧に戻る"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <h1 className="text-xl font-jp-serif text-[#2C2C2C]">
                {isNew ? "新規記事" : "記事を編集"}
              </h1>
            </div>
            <div className="flex gap-2">
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

          <div className="bg-white border border-[#E5E0D8] rounded-lg shadow-sm overflow-hidden">
            {/* Top image */}
            <div className="p-4 md:p-6 border-b border-[#E5E0D8] bg-[#FAFAF8]/50">
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
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                    カテゴリ
                  </label>
                  <Input
                    placeholder="例: コンセプト"
                    value={form.category ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                  リード文（一覧ページに表示）
                </label>
                <Textarea
                  placeholder="記事の要約や導入を1〜3行で"
                  rows={4}
                  className="resize-y min-h-[100px]"
                  value={form.excerpt ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                  本文（見出し・太字・配置など）
                </label>
                <RichTextEditor
                  value={form.content ?? ""}
                  onChange={(html) => setForm((f) => ({ ...f, content: html }))}
                  minHeight="400px"
                />
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-[#E5E0D8] bg-[#FAFAF8]/50 flex flex-wrap gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/blog")}
              >
                キャンセル
              </Button>
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
        </div>
      </section>
    </>
  );
}
