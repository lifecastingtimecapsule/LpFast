import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
    if (password !== passwordConfirm) {
      setError("パスワードとパスワード（確認）が一致しません。");
      return;
    }
    if (password.length < 6) {
      setError("パスワードは6文字以上で入力してください。");
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + redirectTo },
    });
    setLoading(false);
    if (err) {
      setError(err.message === "User already registered" ? "このメールアドレスは既に登録されています。ログインしてください。" : err.message);
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
        <title>会員登録｜amorétto LifeCasting® Studio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#FAFAF8] min-h-screen">
        <div className="container mx-auto max-w-md">
          <h1 className="text-2xl mb-2 font-jp-serif text-[#2C2C2C]">
            会員登録
          </h1>
          <p className="text-sm text-[#666666] mb-6">
            ご予約には会員登録（無料）が必要です。
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
                パスワード（6文字以上）
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="border-[#E5E0D8]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">
                パスワード（確認）
              </label>
              <Input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="border-[#E5E0D8]"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "登録中…" : "会員登録"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-[#666666] text-center">
            すでにアカウントをお持ちの方は
            <Link to="/login" className="text-[#C4A962] hover:underline ml-1">
              ログイン
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
