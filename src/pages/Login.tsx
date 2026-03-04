import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/reservation";

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(redirectTo, { replace: true });
    });
  }, [navigate, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setError(null);
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (err) {
      setError("メールアドレスまたはパスワードが正しくありません。");
      return;
    }
    navigate(redirectTo, { replace: true });
  };

  if (!supabase) {
    return (
      <section className="pt-32 pb-20 px-6">
        <p>Supabase の設定がまだ完了していません。</p>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>ログイン｜amorétto LifeCasting® Studio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-md">
          <h1 className="text-2xl mb-2 font-jp-serif text-[#2C2C2C]">
            ログイン
          </h1>
          <p className="text-sm text-[#666666] mb-6">
            ご予約・マイ予約をご利用になるにはログインしてください。
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 border border-[#E5E0D8] rounded-lg"
          >
            {error && (
              <p className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                メールアドレス
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="border-[#E5E0D8]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                パスワード
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="border-[#E5E0D8]"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "ログイン中…" : "ログイン"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-[#666666] text-center">
            アカウントをお持ちでない方は
            <Link to="/signup" className="text-[#C4A962] hover:underline ml-1">
              会員登録
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
