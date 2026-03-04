import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CompleteData {
  reservation_id?: string;
  reservation_number?: string;
  reservation_date_time: string;
  customer_code?: string;
  location_name: string;
  menu_name: string;
  parent_name: string;
  child_name: string;
  id?: string;
}

function formatDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    const date = d.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "short" });
    const time = d.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
    return `${date} ${time}`;
  } catch {
    return iso;
  }
}

export function ReservationCompletePage() {
  const [searchParams] = useSearchParams();
  const dataParam = searchParams.get("data");

  let data: CompleteData | null = null;
  let parseError = false;
  if (dataParam) {
    try {
      const json = decodeURIComponent(escape(atob(dataParam)));
      data = JSON.parse(json) as CompleteData;
    } catch {
      parseError = true;
    }
  }

  if (parseError || !data) {
    return (
      <>
        <Helmet>
          <title>予約完了｜立体手形の専門スタジオ amorétto</title>
        </Helmet>
        <div className="container mx-auto px-6 py-16 max-w-2xl text-center">
          <h1 className="font-en-serif text-2xl text-[#2C2C2C] mb-4">予約情報の取得に失敗しました</h1>
          <p className="text-[#2C2C2C]/80 mb-8">
            お手数ですが、トップページまたは予約ページから再度お申し込みください。
          </p>
          <Button asChild className="bg-[#C4A962] hover:bg-[#B39952] text-white">
            <Link to="/reservation">予約ページへ</Link>
          </Button>
        </div>
      </>
    );
  }

  const dateTimeStr = formatDateTime(data.reservation_date_time);
  const reservationNumber = data.reservation_number ?? (data.id != null ? String(data.id).slice(0, 8) : "—");
  const customerCode = data.customer_code ?? "";

  return (
    <>
      <Helmet>
        <title>予約完了｜立体手形の専門スタジオ amorétto</title>
        <meta name="description" content="ご予約を承りました。ご来店の際はよろしくお願いいたします。" />
      </Helmet>
      <div className="container mx-auto px-6 py-12 md:py-16 max-w-2xl">
        <h1 className="font-en-serif text-3xl md:text-4xl text-[#2C2C2C] tracking-wide mb-2">予約完了</h1>
        <p className="text-[#2C2C2C]/80 text-sm md:text-base mb-10">
          このたびはご予約いただきありがとうございます。以下の内容で承りました。
        </p>

        <Card className="border-[#C4A962]/30 mb-10">
          <CardHeader>
            <CardTitle className="text-lg text-[#2C2C2C]">ご予約内容</CardTitle>
            <CardDescription>ご来店の際はお控えください</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="text-[#2C2C2C]/70 font-medium">予約番号</dt>
                <dd className="text-[#2C2C2C] font-mono">{reservationNumber}</dd>
              </div>
              {customerCode && (
                <div>
                  <dt className="text-[#2C2C2C]/70 font-medium">お客様番号</dt>
                  <dd className="text-[#2C2C2C] font-mono">{customerCode}</dd>
                </div>
              )}
              <div>
                <dt className="text-[#2C2C2C]/70 font-medium">日時</dt>
                <dd className="text-[#2C2C2C]">{dateTimeStr}</dd>
              </div>
              <div>
                <dt className="text-[#2C2C2C]/70 font-medium">店舗</dt>
                <dd className="text-[#2C2C2C]">{data.location_name || "—"}</dd>
              </div>
              <div>
                <dt className="text-[#2C2C2C]/70 font-medium">メニュー</dt>
                <dd className="text-[#2C2C2C]">{data.menu_name || "—"}</dd>
              </div>
              <div>
                <dt className="text-[#2C2C2C]/70 font-medium">保護者名</dt>
                <dd className="text-[#2C2C2C]">{data.parent_name}</dd>
              </div>
              <div>
                <dt className="text-[#2C2C2C]/70 font-medium">お子様名</dt>
                <dd className="text-[#2C2C2C]">{data.child_name}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <p className="text-[#2C2C2C]/80 text-sm mb-8">
          ご予約内容の変更・キャンセルは、お電話または各店舗までお問い合わせください。
          確定メールをお送りしている場合は、そちらもご確認ください。
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-[#C4A962] hover:bg-[#B39952] text-white">
            <Link to="/">トップページへ</Link>
          </Button>
          <Button asChild variant="outline" className="border-[#C4A962]/50 text-[#2C2C2C]">
            <Link to="/my/reservations">マイ予約一覧</Link>
          </Button>
          <Button asChild variant="outline" className="border-[#C4A962]/50 text-[#2C2C2C]">
            <Link to="/reservation">別の予約をする</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
