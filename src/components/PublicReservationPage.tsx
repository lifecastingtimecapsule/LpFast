import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/utils/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import { getActiveLocations, getActiveMenuItemsByLocation } from "@/data/reservationCatalog";
import { reservationApi } from "@/utils/supabase/reservationApi";
import type { Location, MenuItem, ReservationSettings, BookedSlot, LocationAvailability } from "@/utils/supabase/reservationApi";
import * as reservationQueries from "@/utils/supabase/reservationQueries";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/components/ui/utils";

type FormValues = {
  location_id: string;
  menu_item_id: string;
  reservation_date: Date | undefined;
  reservation_time: string;
  parent_name: string;
  parent_name_kana: string;
  child_name: string;
  child_name_kana: string;
  child_age_years: number | string;
  child_age_months: number | string;
  phone: string;
  email: string;
  notes_customer: string;
  postal_code: string;
  address_text: string;
};

function parseTime(t: string | undefined): number | null {
  if (!t) return null;
  const [h, m] = String(t).slice(0, 5).split(":").map(Number);
  if (isNaN(h)) return null;
  return h * 60 + (m || 0);
}

function formatSlot(date: Date, minutes: number): string {
  const d = new Date(date);
  d.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
  return d.toISOString().slice(0, 16);
}

function buildSlotsForDate(
  date: Date,
  intervalMinutes: number,
  availability: LocationAvailability | null,
  _advanceDays: number
): string[] {
  const dayOfWeek = date.getDay();
  const closedDays = availability?.regular_closed_days ?? [];
  if (closedDays.includes(dayOfWeek)) return [];

  const startStr = availability?.business_hours_start ?? "09:00";
  const endStr = availability?.business_hours_end ?? "18:00";
  let openMin = parseTime(startStr) ?? 9 * 60;
  let closeMin = parseTime(endStr) ?? 18 * 60;

  const slots: string[] = [];
  for (let m = openMin; m < closeMin; m += intervalMinutes) {
    slots.push(formatSlot(date, m));
  }
  return slots;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function PublicReservationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<{ user: { id: string }; access_token: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { profile, loading: profileLoading, role } = useProfile(session);
  const [locations, setLocations] = useState<Location[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<ReservationSettings | null>(null);
  const [availability, setAvailability] = useState<LocationAvailability | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** 営業設定（location_availability）はAPIで1回だけ取得してキャッシュ */
  const [availabilityByLocation, setAvailabilityByLocation] = useState<Record<string, LocationAvailability | null>>({});
  /** カレンダー表示月。月単位で空き状況を取得する */
  const [displayedMonth, setDisplayedMonth] = useState<Date>(() => new Date());
  /** 月ごとの予約済み枠キャッシュ（キー: YYYY-MM） */
  const [monthBookedSlots, setMonthBookedSlots] = useState<Record<string, BookedSlot[]>>({});

  const form = useForm<FormValues>({
    defaultValues: {
      location_id: "",
      menu_item_id: "",
      reservation_date: undefined,
      reservation_time: "",
      parent_name: "",
      parent_name_kana: "",
      child_name: "",
      child_name_kana: "",
      child_age_years: "",
      child_age_months: "",
      phone: "",
      email: "",
      notes_customer: "",
      postal_code: "",
      address_text: "",
    },
  });

  const locationId = form.watch("location_id");
  const selectedDate = form.watch("reservation_date");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session as { user: { id: string }; access_token: string } | null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s as { user: { id: string }; access_token: string } | null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!session) {
      const redirect = encodeURIComponent(location.pathname || "/reservation");
      navigate(`/login?redirect=${redirect}`, { replace: true });
    }
  }, [authLoading, session, navigate, location.pathname]);

  useEffect(() => {
    if (!session?.access_token || profileLoading) return;
    if (role !== undefined && role !== null && role !== "customer") return;
    let cancelled = false;
    reservationQueries.getMyCustomer().then((customer) => {
      if (cancelled || !customer) return;
      form.reset((prev) => ({
        ...prev,
        phone: customer.phone ?? prev.phone,
        email: customer.email ?? prev.email,
        parent_name: customer.parent_name ?? prev.parent_name,
        parent_name_kana: customer.parent_name_kana ?? prev.parent_name_kana,
        child_name: customer.child_name ?? prev.child_name,
        child_name_kana: customer.child_name_kana ?? prev.child_name_kana,
        child_age_years: customer.child_age_years ?? prev.child_age_years,
        child_age_months: customer.child_age_months ?? prev.child_age_months,
        postal_code: customer.postal_code ?? prev.postal_code,
        address_text: customer.address_text ?? prev.address_text,
      }));
    }).catch(() => {
      // 404 or error: do not prefill
    });
    return () => { cancelled = true; };
  }, [session?.access_token, profileLoading, role]);

  // 店舗は静的カタログから取得。空の場合は DB からフォールバック
  useEffect(() => {
    const activeLocs = getActiveLocations();
    if (activeLocs.length > 0) {
      setLocations(activeLocs);
    } else {
      reservationQueries.getLocationsFromDb().then((dbLocs) => {
        setLocations(dbLocs as Location[]);
      }).catch(() => {});
    }
    let cancelled = false;
    reservationQueries.getReservationSettings().then((setRes) => {
      if (!cancelled) setSettings(setRes ?? null);
    }).catch((e) => {
      if (!cancelled) setError(e instanceof Error ? e.message : "読み込みに失敗しました");
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  // 店舗一覧に基づき営業設定（location_availability）を一括取得してキャッシュ（locations state が入ったあと）
  useEffect(() => {
    if (locations.length === 0) return;
    let cancelled = false;
    (async () => {
      const availMap: Record<string, LocationAvailability | null> = {};
      await Promise.all(
        locations.map(async (loc) => {
          const avail = await reservationQueries.getLocationAvailability(loc.location_id).catch(() => null);
          if (!cancelled) availMap[loc.location_id] = avail ?? null;
        })
      );
      if (!cancelled) setAvailabilityByLocation((prev) => ({ ...prev, ...availMap }));
    })();
    return () => { cancelled = true; };
  }, [locations]);

  // 選択中の店舗が変わったら静的カタログからメニュー、キャッシュから営業設定を表示
  useEffect(() => {
    if (!locationId) {
      setMenuItems([]);
      setAvailability(null);
      form.setValue("menu_item_id", "");
      return;
    }
    setMenuItems(getActiveMenuItemsByLocation(locationId));
    setAvailability(availabilityByLocation[locationId] ?? null);
  }, [locationId, availabilityByLocation]);

  // カレンダー表示月または店舗が変わったら、その月の予約済み枠のみ取得（1ヶ月分）
  useEffect(() => {
    if (!locationId) return;
    const y = displayedMonth.getFullYear();
    const m = displayedMonth.getMonth() + 1;
    const monthKey = `${y}-${String(m).padStart(2, "0")}`;
    let cancelled = false;
    reservationQueries.getBookedSlotsForMonth(monthKey, locationId).then((res) => {
      if (!cancelled) setMonthBookedSlots((prev) => ({ ...prev, [monthKey]: res.slots ?? [] }));
    }).catch(() => {
      if (!cancelled) setMonthBookedSlots((prev) => ({ ...prev, [monthKey]: [] }));
    });
    return () => { cancelled = true; };
  }, [displayedMonth, locationId]);

  // 選択日の予約済み枠は月キャッシュから取得
  const bookedSlotsForSelectedDay = (() => {
    if (!selectedDate || !locationId) return [];
    const monthKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}`;
    const list = monthBookedSlots[monthKey] ?? [];
    const dateStr = selectedDate.toISOString().slice(0, 10);
    return list.filter((s) => s.reservation_date_time.startsWith(dateStr));
  })();

  const availableTimeSlots = (() => {
    if (!selectedDate || !settings) return [];
    const interval = settings.slot_interval_minutes ?? 30;
    const advance = settings.advance_reservation_days ?? settings.advance_booking_days ?? 60;
    const slots = buildSlotsForDate(selectedDate, interval, availability, advance);
    const bookedSet = new Set(bookedSlotsForSelectedDay.map((s) => s.reservation_date_time.slice(0, 16)));
    return slots.filter((s) => !bookedSet.has(s));
  })();

  const handleSubmit = async (values: FormValues) => {
    setError(null);
    if (!values.location_id) {
      form.setError("location_id", { message: "店舗を選択してください" });
      return;
    }
    if (!values.menu_item_id) {
      form.setError("menu_item_id", { message: "メニューを選択してください" });
      return;
    }
    if (!values.reservation_date) {
      form.setError("reservation_date", { message: "日付を選択してください" });
      return;
    }
    if (!values.reservation_time) {
      form.setError("reservation_time", { message: "時間を選択してください" });
      return;
    }
    if (!values.parent_name?.trim()) {
      form.setError("parent_name", { message: "保護者名を入力してください" });
      return;
    }
    if (!values.child_name?.trim()) {
      form.setError("child_name", { message: "お子様名を入力してください" });
      return;
    }
    if (!values.phone?.trim()) {
      form.setError("phone", { message: "電話番号を入力してください" });
      return;
    }
    if (!values.email?.trim()) {
      form.setError("email", { message: "メールアドレスを入力してください" });
      return;
    }
    if (!validateEmail(values.email)) {
      form.setError("email", { message: "有効なメールアドレスを入力してください" });
      return;
    }
    setSubmitLoading(true);
    try {
      const dateTime = values.reservation_time;
      const location = locations.find((l) => l.location_id === values.location_id);
      const menu = menuItems.find((m) => m.menu_item_id === values.menu_item_id);
      const accessToken = session?.access_token;
      if (!accessToken) {
        setError("ログインの有効期限が切れています。再度ログインしてください。");
        setSubmitLoading(false);
        return;
      }
      const res = await reservationApi.createReservation({
        reservation_date_time: dateTime,
        menu_item_id: values.menu_item_id,
        location_id: values.location_id,
        parent_name: values.parent_name,
        parent_name_kana: values.parent_name_kana || undefined,
        child_name: values.child_name,
        child_name_kana: values.child_name_kana || undefined,
        child_age_years: values.child_age_years !== "" && values.child_age_years != null ? Number(values.child_age_years) : undefined,
        child_age_months: values.child_age_months !== "" && values.child_age_months != null ? Number(values.child_age_months) : undefined,
        phone: values.phone,
        email: values.email,
        notes_customer: values.notes_customer || undefined,
        postal_code: values.postal_code || undefined,
        address_text: values.address_text || undefined,
      }, accessToken);
      const payload = {
        reservation_id: res.reservation.reservation_id,
        reservation_number: res.reservation.reservation_number,
        reservation_date_time: res.reservation.reservation_date_time,
        customer_code: res.customer_code ?? res.reservation.customer_code ?? "",
        location_name: location?.location_name ?? "",
        menu_name: menu?.name ?? "",
        parent_name: values.parent_name,
        child_name: values.child_name,
      };
      const data = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      navigate(`/public/reservation/complete?data=${encodeURIComponent(data)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "予約の登録に失敗しました");
    } finally {
      setSubmitLoading(false);
    }
  };

  const isStaffOrAdmin = role === "staff" || role === "admin";

  if (authLoading || !session) {
    return (
      <div className="container mx-auto px-6 py-16 text-center text-[#2C2C2C]">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (!profileLoading && isStaffOrAdmin) {
    return (
      <div className="container mx-auto px-6 pt-8 pb-16 max-w-xl text-center text-[#2C2C2C]">
        <h1 className="font-en-serif text-2xl text-[#2C2C2C] mb-4 scroll-mt-24">Web予約</h1>
        <p className="mb-6">予約は会員のみご利用いただけます。スタッフ・管理者アカウントではご予約いただけません。</p>
        <Button type="button" variant="outline" onClick={() => navigate("/")}>トップへ</Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16 text-center text-[#2C2C2C]">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Web予約｜立体手形の専門スタジオ amorétto</title>
        <meta name="description" content="amoréttoのWeb予約フォームです。店舗・メニュー・日時を選んでご予約ください。" />
      </Helmet>
      <div className="container mx-auto px-6 pt-10 pb-12 md:pt-14 md:pb-16 max-w-2xl">
        <h1 className="font-en-serif text-3xl md:text-4xl text-[#2C2C2C] tracking-wide mb-2 scroll-mt-28">Web予約</h1>
        <p className="text-[#2C2C2C]/80 text-sm md:text-base mb-10">店舗・メニュー・日時をご選択のうえ、必要事項をご入力ください。</p>

        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-50 text-red-800 text-sm" role="alert">
            {error}
          </div>
        )}

        {!error && !loading && locations.length === 0 && (
          <div className="mb-6 p-4 rounded-md bg-amber-50 text-amber-900 text-sm" role="status">
            現在、登録されている店舗がありません。Supabase のダッシュボードで「locations」テーブルに店舗を追加するか、シードマイグレーション（20250223000000_seed_locations_and_menus.sql）を実行してください。
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <Card className="border-[#C4A962]/30">
              <CardHeader>
                <CardTitle className="text-lg text-[#2C2C2C]">ご予約内容</CardTitle>
                <CardDescription>店舗・メニュー・日時を選択してください</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="location_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">店舗</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#FAFAF8] border-[#C4A962]/30">
                            <SelectValue placeholder="店舗を選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locations.map((loc) => (
                            <SelectItem key={loc.location_id} value={loc.location_id}>
                              {loc.location_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="menu_item_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">メニュー</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!locationId}>
                        <FormControl>
                          <SelectTrigger className="bg-[#FAFAF8] border-[#C4A962]/30">
                            <SelectValue placeholder="メニューを選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {menuItems.map((m) => (
                            <SelectItem key={m.menu_item_id} value={m.menu_item_id}>
                              {m.name}
                              {m.duration_minutes != null ? `（約${m.duration_minutes}分）` : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reservation_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">希望日</FormLabel>
                      <p className="text-[#2C2C2C]/70 text-xs mb-3">予約は火曜・水曜のみ可能です。</p>
                      <FormControl>
                        <div className="w-full rounded-lg border border-[#E5E0D8] bg-white shadow-sm p-4 md:p-5">
                            <Calendar
                              mode="single"
                              month={displayedMonth}
                              onMonthChange={setDisplayedMonth}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                if (!settings) return true;
                                const day = date.getDay();
                                if (day !== 2 && day !== 3) return true;
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const max = new Date(today);
                                max.setDate(max.getDate() + (settings.advance_reservation_days ?? settings.advance_booking_days ?? 60));
                                return date < today || date > max;
                              }}
                              className="mx-auto"
                            />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reservation_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">希望時間</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={availableTimeSlots.length === 0}>
                        <FormControl>
                          <SelectTrigger className="bg-[#FAFAF8] border-[#C4A962]/30">
                            <SelectValue placeholder={selectedDate ? "時間を選択" : "まず日付を選択してください"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableTimeSlots.map((slot) => {
                            const label = slot.slice(11, 16);
                            return (
                              <SelectItem key={slot} value={slot}>
                                {label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="border-[#C4A962]/30">
              <CardHeader>
                <CardTitle className="text-lg text-[#2C2C2C]">お客様情報</CardTitle>
                <CardDescription>保護者様・お子様の情報とご連絡先</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="parent_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">保護者名 <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input className="bg-[#FAFAF8] border-[#C4A962]/30" placeholder="山田 花子" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parent_name_kana"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">保護者名（ふりがな）</FormLabel>
                      <FormControl>
                        <Input className="bg-[#FAFAF8] border-[#C4A962]/30" placeholder="やまだ はなこ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="child_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">お子様名 <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input className="bg-[#FAFAF8] border-[#C4A962]/30" placeholder="山田 太郎" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="child_name_kana"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">お子様名（ふりがな）</FormLabel>
                      <FormControl>
                        <Input className="bg-[#FAFAF8] border-[#C4A962]/30" placeholder="やまだ たろう" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="child_age_years"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#2C2C2C]">お子様の年齢（歳）</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} className="bg-[#FAFAF8] border-[#C4A962]/30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="child_age_months"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#2C2C2C]">お子様の年齢（ヶ月）</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} className="bg-[#FAFAF8] border-[#C4A962]/30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">電話番号 <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="tel" className="bg-[#FAFAF8] border-[#C4A962]/30" placeholder="090-1234-5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">メールアドレス <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" className="bg-[#FAFAF8] border-[#C4A962]/30" placeholder="customer@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">郵便番号</FormLabel>
                      <FormControl>
                        <Input className="bg-[#FAFAF8] border-[#C4A962]/30" placeholder="430-0900" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address_text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">住所</FormLabel>
                      <FormControl>
                        <Input className="bg-[#FAFAF8] border-[#C4A962]/30" placeholder="市区町村・番地" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes_customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#2C2C2C]">備考</FormLabel>
                      <FormControl>
                        <Textarea className="bg-[#FAFAF8] border-[#C4A962]/30" placeholder="ご要望など" rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={submitLoading}
              className={cn(
                "w-full md:w-auto min-w-[200px] bg-[#C4A962] hover:bg-[#B39952] text-white"
              )}
            >
              {submitLoading ? "送信中..." : "予約内容を送信する"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
