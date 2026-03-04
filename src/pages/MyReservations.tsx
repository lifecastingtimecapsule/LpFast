import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/utils/supabase/client";
import type { MyReservationItem } from "@/utils/supabase/reservationApi";
import * as reservationQueries from "@/utils/supabase/reservationQueries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    confirmed: "確定",
    cancelled: "キャンセル",
    completed: "完了",
    no_show: "未来店",
  };
  return map[status] ?? status;
}

export function MyReservations() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<{ access_token: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [list, setList] = useState<MyReservationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session as { access_token: string } | null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s as { access_token: string } | null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.access_token) return;
    setError(null);
    setLoading(true);
    reservationQueries.getMyReservations().then((data) => {
      setList(Array.isArray(data) ? data : []);
    }).catch((e) => {
      setError(e instanceof Error ? e.message : "取得に失敗しました");
      setList([]);
    }).finally(() => setLoading(false));
  }, [session?.access_token]);

  useEffect(() => {
    if (authLoading) return;
    if (!session) {
      const redirect = encodeURIComponent(location.pathname || "/my/reservations");
      navigate(`/login?redirect=${redirect}`, { replace: true });
    }
  }, [authLoading, session, navigate, location.pathname]);

  if (authLoading || !session) {
    return (
      <div className="container mx-auto px-6 py-16 text-center text-[#2C2C2C]">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>マイ予約｜立体手形の専門スタジオ amorétto</title>
        <meta name="description" content="ご自身の予約一覧を確認できます。" />
      </Helmet>
      <div className="container mx-auto px-6 py-12 md:py-16 max-w-2xl">
        <h1 className="font-en-serif text-3xl md:text-4xl text-[#2C2C2C] tracking-wide mb-2">マイ予約</h1>
        <p className="text-[#2C2C2C]/80 text-sm md:text-base mb-8">これまでのご予約一覧です。</p>

        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-50 text-red-800 text-sm" role="alert">
            {error}
          </div>
        )}

        <div className="mb-6">
          <Button type="button" variant="outline" onClick={() => navigate("/reservation")}>
            新規予約
          </Button>
        </div>

        {loading ? (
          <p className="text-[#2C2C2C]/70">読み込み中...</p>
        ) : list.length === 0 ? (
          <p className="text-[#2C2C2C]/70">予約はまだありません。</p>
        ) : (
          <ul className="space-y-4">
            {list.map((r) => (
              <li key={r.reservation_id}>
                <Card className="border-[#C4A962]/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex justify-between items-center">
                      <span className="font-medium text-[#2C2C2C]">
                        {r.reservation_number}
                      </span>
                      <span className={`text-xs font-normal ${r.status === "cancelled" ? "text-gray-500" : "text-[#2C2C2C]/80"}`}>
                        {statusLabel(r.status)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-[#2C2C2C]/80 space-y-1">
                    <p>{formatDateTime(r.reservation_date_time)}</p>
                    <p>店舗: {r.location_name ?? "—"}</p>
                    <p>メニュー: {r.menu_name ?? "—"}</p>
                    {r.duration_minutes != null && <p>所要時間: {r.duration_minutes}分</p>}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
