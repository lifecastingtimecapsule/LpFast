import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/utils/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import { getActiveLocations, getActiveMenuItemsByLocation } from "@/data/reservationCatalog";
import { reservationApi } from "@/utils/supabase/reservationApi";
import type { Location, MenuItem, ReservationSettings, BookedSlot, LocationAvailability } from "@/utils/supabase/reservationApi";
import * as reservationQueries from "@/utils/supabase/reservationQueries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/ui/utils";
import { AvailabilityOverview } from "@/components/AvailabilityOverview";

type SessionType = { user: { id: string; email?: string }; access_token: string } | null;

type CustomerData = {
  parent_name: string;
  parent_name_kana: string;
  child_name: string;
  child_name_kana: string;
  phone: string;
  email: string;
  postal_code: string;
  prefecture: string;
  city: string;
  address_line: string;
};

function parseTime(t: string | undefined): number | null {
  if (!t) return null;
  const [h, m] = String(t).slice(0, 5).split(":").map(Number);
  if (isNaN(h)) return null;
  return h * 60 + (m || 0);
}

function formatSlot(date: Date, minutes: number): string {
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(Math.floor(minutes / 60)).padStart(2, "0");
  const m = String(minutes % 60).padStart(2, "0");
  return `${y}-${mo}-${d}T${h}:${m}`;
}

function buildAllSlots(
  date: Date,
  intervalMinutes: number,
  availability: LocationAvailability | null,
  settings: ReservationSettings | null
): string[] {
  const a = availability as Record<string, unknown> | null;
  const s = settings as Record<string, unknown> | null;
  const startStr =
    (a?.business_hours_start as string | undefined) ??
    (s?.business_hours_start as string | undefined) ??
    "09:00";
  const endStr =
    (a?.business_hours_end as string | undefined) ??
    (s?.business_hours_end as string | undefined) ??
    "18:00";
  const openMin = parseTime(startStr) ?? 9 * 60;
  const closeMin = parseTime(endStr) ?? 18 * 60;
  const slots: string[] = [];
  for (let m = openMin; m < closeMin; m += intervalMinutes) {
    slots.push(formatSlot(date, m));
  }
  return slots;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatJapaneseDate(date: Date): string {
  const y = date.getFullYear();
  const mo = date.getMonth() + 1;
  const d = date.getDate();
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return `${y}年${mo}月${d}日（${days[date.getDay()]}）`;
}

function formatJapaneseDateTime(date: Date, timeSlot: string): string {
  const time = timeSlot.slice(11, 16);
  return `${formatJapaneseDate(date)} ${time}`;
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <h2 style={{ fontSize: 15, fontWeight: 600, color: "#2C2C2C", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#C4A962", color: "white", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>
        {n}
      </span>
      {label}
    </h2>
  );
}

const STEP_LABELS = ["スケジュール", "お客様情報", "確認"];

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", marginTop: 20, marginBottom: 28 }}>
      {[1, 2, 3].map((n, i) => (
        <div key={n} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : undefined }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: step >= n ? "#C4A962" : "#E5E0D8",
              color: step >= n ? "white" : "#9CA3AF",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700,
            }}>
              {n}
            </div>
            <span style={{ fontSize: 9, color: step === n ? "#C4A962" : "#AAAAAA", fontWeight: step === n ? 600 : 400, whiteSpace: "nowrap" }}>
              {STEP_LABELS[i]}
            </span>
          </div>
          {i < 2 && (
            <div style={{ flex: 1, height: 1, background: step > n ? "#C4A962" : "#E5E0D8", marginBottom: 14, margin: "0 6px 14px" }} />
          )}
        </div>
      ))}
    </div>
  );
}

export function PublicReservationPage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  // Auth
  const [session, setSession] = useState<SessionType>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const { loading: profileLoading, role } = useProfile(session);

  // Step
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Selections
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [selectedMenuItemId, setSelectedMenuItemId] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");

  // Data
  const [locations, setLocations] = useState<Location[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [settings, setSettings] = useState<ReservationSettings | null>(null);
  const [availabilityByLocation, setAvailabilityByLocation] = useState<
    Record<string, LocationAvailability | null>
  >({});

  // Calendar
  const [displayedMonth, setDisplayedMonth] = useState<Date>(() => new Date());
  const [monthBookedSlots, setMonthBookedSlots] = useState<Record<string, BookedSlot[]>>({});

  // Customer form
  const [customerData, setCustomerData] = useState<CustomerData>({
    parent_name: "",
    parent_name_kana: "",
    child_name: "",
    child_name_kana: "",
    phone: "",
    email: "",
    postal_code: "",
    prefecture: "",
    city: "",
    address_line: "",
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [postalSearchLoading, setPostalSearchLoading] = useState(false);
  const [postalError, setPostalError] = useState<string | null>(null);

  // Auth
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [authPassword, setAuthPassword] = useState("");
  const [authPasswordConfirm, setAuthPasswordConfirm] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [editingCustomerInfo, setEditingCustomerInfo] = useState(false);

  // Global
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // ── Effects ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session as SessionType);
      setSessionLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s as SessionType);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.access_token || profileLoading) return;
    if (role !== undefined && role !== null && role !== "customer") return;
    let cancelled = false;
    reservationQueries
      .getMyCustomer()
      .then((customer) => {
        if (cancelled || !customer) return;
        const c = customer as Record<string, unknown>;
        setCustomerData((prev) => ({
          ...prev,
          phone: customer.phone ?? prev.phone,
          email: customer.email ?? prev.email,
          parent_name: customer.parent_name ?? prev.parent_name,
          parent_name_kana: (c.parent_name_kana as string) ?? prev.parent_name_kana,
          child_name: customer.child_name ?? prev.child_name,
          child_name_kana: (c.child_name_kana as string) ?? prev.child_name_kana,
          postal_code: (c.postal_code as string) ?? prev.postal_code,
          prefecture: (c.prefecture as string) ?? prev.prefecture,
          city: (c.city as string) ?? prev.city,
          address_line: (c.address_line as string) ?? prev.address_line,
        }));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [session?.access_token, profileLoading, role]);

  useEffect(() => {
    const activeLocs = getActiveLocations();
    if (activeLocs.length > 0) {
      setLocations(activeLocs);
    } else {
      reservationQueries
        .getLocationsFromDb()
        .then((dbLocs) => setLocations(dbLocs as Location[]))
        .catch(() => {});
    }
    let cancelled = false;
    reservationQueries
      .getReservationSettings()
      .then((res) => { if (!cancelled) setSettings(res ?? null); })
      .catch((e) => { if (!cancelled) setError(e instanceof Error ? e.message : "読み込みに失敗しました"); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (locations.length === 0) return;
    let cancelled = false;
    (async () => {
      const map: Record<string, LocationAvailability | null> = {};
      await Promise.all(
        locations.map(async (loc) => {
          const avail = await reservationQueries
            .getLocationAvailability(loc.location_id)
            .catch(() => null);
          if (!cancelled) map[loc.location_id] = avail ?? null;
        })
      );
      if (!cancelled) setAvailabilityByLocation((prev) => ({ ...prev, ...map }));
    })();
    return () => { cancelled = true; };
  }, [locations]);

  useEffect(() => {
    if (!selectedLocationId) { setMenuItems([]); return; }
    const staticMenus = getActiveMenuItemsByLocation(selectedLocationId);
    if (staticMenus.length > 0) { setMenuItems(staticMenus); return; }
    setMenuLoading(true);
    reservationQueries
      .getMenuItemsByLocationFromDb(selectedLocationId)
      .then((items) => setMenuItems(items as MenuItem[]))
      .catch(() => setMenuItems([]))
      .finally(() => setMenuLoading(false));
  }, [selectedLocationId]);

  useEffect(() => {
    if (!selectedLocationId) return;
    const y = displayedMonth.getFullYear();
    const mo = displayedMonth.getMonth() + 1;
    const monthKey = `${y}-${String(mo).padStart(2, "0")}`;
    let cancelled = false;
    reservationQueries
      .getBookedSlotsForMonth(monthKey, selectedLocationId)
      .then((res) => { if (!cancelled) setMonthBookedSlots((prev) => ({ ...prev, [monthKey]: res.slots ?? [] })); })
      .catch(() => { if (!cancelled) setMonthBookedSlots((prev) => ({ ...prev, [monthKey]: [] })); });
    return () => { cancelled = true; };
  }, [displayedMonth, selectedLocationId]);

  // ── Computed ──────────────────────────────────────────────────────────────────

  const currentAvailability = availabilityByLocation[selectedLocationId] ?? null;

  const allTimeSlotsForDate = useMemo<string[]>(() => {
    if (!selectedDate || !settings) return [];
    const interval = settings.slot_interval_minutes ?? 30;
    return buildAllSlots(selectedDate, interval, currentAvailability, settings);
  }, [selectedDate, settings, currentAvailability]);

  const bookedTimesForDate = useMemo<Set<string>>(() => {
    if (!selectedDate) return new Set();
    const sy = selectedDate.getFullYear();
    const smo = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const sd = String(selectedDate.getDate()).padStart(2, "0");
    const localDateStr = `${sy}-${smo}-${sd}`;
    const monthKey = `${sy}-${smo}`;
    const slots = monthBookedSlots[monthKey] ?? [];
    return new Set(
      slots
        .filter((s) => {
          const dt = new Date(s.reservation_date_time as string);
          const dy = dt.getFullYear();
          const dmo = String(dt.getMonth() + 1).padStart(2, "0");
          const dd = String(dt.getDate()).padStart(2, "0");
          return `${dy}-${dmo}-${dd}` === localDateStr;
        })
        .map((s) => {
          const dt = new Date(s.reservation_date_time as string);
          const h = String(dt.getHours()).padStart(2, "0");
          const m = String(dt.getMinutes()).padStart(2, "0");
          return `${localDateStr}T${h}:${m}`;
        })
    );
  }, [selectedDate, monthBookedSlots]);

  const selectedLocationObj = locations.find((l) => l.location_id === selectedLocationId);
  const selectedMenuObj = menuItems.find((m) => m.menu_item_id === selectedMenuItemId);

  // ── Postal code search ───────────────────────────────────────────────────────

  const handlePostalSearch = async () => {
    const code = customerData.postal_code.replace(/-/g, "").trim();
    if (code.length !== 7 || !/^\d{7}$/.test(code)) {
      setPostalError("7桁の郵便番号を入力してください（例：1234567）");
      return;
    }
    setPostalSearchLoading(true);
    setPostalError(null);
    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${code}`);
      const json = await res.json();
      if (json.results && json.results.length > 0) {
        const r = json.results[0];
        setCustomerData((p) => ({
          ...p,
          prefecture: r.address1 ?? p.prefecture,
          city: (r.address2 ?? "") + (r.address3 ?? ""),
        }));
      } else {
        setPostalError("該当する住所が見つかりませんでした");
      }
    } catch {
      setPostalError("住所の検索に失敗しました");
    } finally {
      setPostalSearchLoading(false);
    }
  };

  // ── Login only (member) ───────────────────────────────────────────────────────

  const handleLoginOnly = async () => {
    setAuthError(null);
    if (!customerData.email.trim() || !validateEmail(customerData.email)) {
      setAuthError("有効なメールアドレスを入力してください");
      return;
    }
    if (!authPassword) { setAuthError("パスワードを入力してください"); return; }
    setLoginLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: customerData.email,
        password: authPassword,
      });
      if (signInError) {
        setAuthError("メールアドレスまたはパスワードが正しくありません。");
      }
      // On success, onAuthStateChange fires → session state updates → useEffect auto-fills customer data
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : "ログインに失敗しました");
    } finally {
      setLoginLoading(false);
    }
  };

  // ── To confirmation ──────────────────────────────────────────────────────────

  const handleToConfirmation = () => {
    setFormError(null);
    setAuthError(null);
    setError(null);

    if (!customerData.parent_name.trim()) { setFormError("保護者名を入力してください"); return; }
    if (!customerData.parent_name_kana.trim()) { setFormError("保護者名（フリガナ）を入力してください"); return; }
    if (!customerData.phone.trim()) { setFormError("電話番号を入力してください"); return; }
    if (!customerData.postal_code.trim()) { setFormError("郵便番号を入力してください"); return; }
    if (!customerData.prefecture.trim()) { setFormError("都道府県を入力してください"); return; }
    if (!customerData.city.trim()) { setFormError("市区町村を入力してください"); return; }
    if (!customerData.address_line.trim()) { setFormError("番地・建物名を入力してください"); return; }

    if (!session) {
      if (!customerData.email.trim() || !validateEmail(customerData.email)) {
        setAuthError("有効なメールアドレスを入力してください");
        return;
      }
      if (!authPassword) { setAuthError("パスワードを入力してください"); return; }
      if (authMode === "register") {
        if (authPassword.length < 6) { setAuthError("パスワードは6文字以上で入力してください"); return; }
        if (authPassword !== authPasswordConfirm) { setAuthError("パスワードが一致しません"); return; }
      }
    }

    setStep(3);
  };

  // ── Submit ────────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    setError(null);
    setAuthError(null);
    setFormError(null);

    if (!customerData.parent_name.trim()) { setFormError("保護者名を入力してください"); return; }
    if (!customerData.parent_name_kana.trim()) { setFormError("保護者名（フリガナ）を入力してください"); return; }
    if (!customerData.phone.trim()) { setFormError("電話番号を入力してください"); return; }
    if (!customerData.postal_code.trim()) { setFormError("郵便番号を入力してください"); return; }
    if (!customerData.prefecture.trim()) { setFormError("都道府県を入力してください"); return; }
    if (!customerData.city.trim()) { setFormError("市区町村を入力してください"); return; }
    if (!customerData.address_line.trim()) { setFormError("番地・建物名を入力してください"); return; }

    let currentSession = session;

    if (!currentSession) {
      if (!customerData.email.trim() || !validateEmail(customerData.email)) {
        setAuthError("有効なメールアドレスを入力してください");
        return;
      }
      if (!authPassword) { setAuthError("パスワードを入力してください"); return; }
      setSubmitLoading(true);
      try {
        if (authMode === "register") {
          if (authPassword.length < 6) { setAuthError("パスワードは6文字以上で入力してください"); setSubmitLoading(false); return; }
          if (authPassword !== authPasswordConfirm) { setAuthError("パスワードが一致しません"); setSubmitLoading(false); return; }
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: customerData.email,
            password: authPassword,
          });
          if (signUpError) {
            setAuthError(
              signUpError.message.includes("already registered") || signUpError.message.includes("User already registered")
                ? "このメールアドレスは既に登録されています。「会員の方」からログインしてください。"
                : signUpError.message
            );
            setSubmitLoading(false);
            return;
          }
          if (!signUpData.session) {
            setVerificationSent(true);
            setSubmitLoading(false);
            return;
          }
          currentSession = signUpData.session as SessionType;
        } else {
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: customerData.email,
            password: authPassword,
          });
          if (signInError) { setAuthError("メールアドレスまたはパスワードが正しくありません。"); setSubmitLoading(false); return; }
          currentSession = signInData.session as SessionType;
        }
      } catch (e) {
        setAuthError(e instanceof Error ? e.message : "認証に失敗しました");
        setSubmitLoading(false);
        return;
      }
    } else {
      setSubmitLoading(true);
    }

    try {
      const accessToken = currentSession?.access_token;
      if (!accessToken) { setError("認証エラーが発生しました。再度お試しください。"); setSubmitLoading(false); return; }
      const res = await reservationApi.createReservation(
        {
          reservation_date_time: selectedTime,
          menu_item_id: selectedMenuItemId,
          location_id: selectedLocationId,
          parent_name: customerData.parent_name,
          child_name: customerData.child_name,
          phone: customerData.phone,
          email: session?.user?.email ?? customerData.email,
        },
        accessToken
      );
      const payload = {
        reservation_id: res.reservation.reservation_id,
        reservation_number: res.reservation.reservation_number,
        reservation_date_time: res.reservation.reservation_date_time,
        customer_code: res.customer_code ?? res.reservation.customer_code ?? "",
        location_name: selectedLocationObj?.location_name ?? "",
        menu_name: selectedMenuObj?.name ?? "",
        parent_name: customerData.parent_name,
        child_name: customerData.child_name,
      };
      const data = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      navigate(`/public/reservation/complete?data=${encodeURIComponent(data)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "予約の登録に失敗しました");
      setSubmitLoading(false);
    }
  };

  // ── Guards ────────────────────────────────────────────────────────────────────

  const isStaffOrAdmin = role === "staff" || role === "admin";

  if (!profileLoading && isStaffOrAdmin) {
    return (
      <div className="container mx-auto px-6 pb-16 max-w-xl text-center" style={{ paddingTop: "clamp(100px, 14vw, 160px)" }}>
        <h1 className="font-en-serif text-2xl text-[#2C2C2C] mb-4">Web予約</h1>
        <p className="mb-6 text-[#2C2C2C]">スタッフ・管理者アカウントではご予約いただけません。</p>
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

  // ── Helpers ───────────────────────────────────────────────────────────────────

  const scrollToForm = () => {
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const resetBooking = () => {
    setSelectedLocationId("");
    setSelectedMenuItemId("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setMonthBookedSlots({});
    setFormError(null);
    setAuthError(null);
    setError(null);
    setStep(1);
    setEditingCustomerInfo(false);
    setVerificationSent(false);
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <>
      <Helmet>
        <title>Web予約｜立体手形の専門スタジオ amorétto</title>
        <meta name="description" content="amoréttoのWeb予約フォームです。店舗・メニュー・日時を選んでご予約ください。" />
      </Helmet>

      <div className="container mx-auto px-4 pb-16 max-w-2xl" style={{ paddingTop: "clamp(100px, 14vw, 160px)" }}>
        <h1 className="font-en-serif text-3xl md:text-4xl text-[#2C2C2C] tracking-wide mb-6">
          Web予約
        </h1>

        {/* Availability Overview */}
        <AvailabilityOverview
          locations={locations}
          availabilityByLocation={availabilityByLocation}
          settings={settings}
          onBook={(locId) => {
            setSelectedLocationId(locId);
            setSelectedMenuItemId("");
            setSelectedDate(undefined);
            setSelectedTime("");
            setMonthBookedSlots({});
            setStep(1);
            scrollToForm();
          }}
          onDateSelect={(locId, date) => {
            setSelectedLocationId(locId);
            setSelectedDate(date);
            setDisplayedMonth(new Date(date.getFullYear(), date.getMonth(), 1));
            setSelectedMenuItemId("");
            setSelectedTime("");
            setMonthBookedSlots({});
            setStep(1);
            scrollToForm();
          }}
        />

        {/* Booking form anchor */}
        <div ref={formRef}>
          {!selectedLocationId ? (
            <p className="text-sm text-[#AAAAAA] text-center py-6">
              上の空き状況から「予約する」を押してください
            </p>
          ) : (
            <div>
              {/* ── Sticky selection summary bar ── */}
              <div style={{
                position: "sticky",
                top: 60,
                zIndex: 30,
                background: "white",
                borderTop: "1px solid #E5E0D8",
                borderBottom: "1px solid #E5E0D8",
                marginLeft: -16,
                marginRight: -16,
                padding: "10px 16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, color: "#2C2C2C", fontSize: 14, flexShrink: 0 }}>
                      {selectedLocationObj?.location_name}
                    </span>
                    {selectedDate && (
                      <span style={{ fontSize: 12, color: "#C4A962", flexShrink: 0 }}>
                        {formatJapaneseDate(selectedDate)}
                      </span>
                    )}
                    {selectedMenuObj && (
                      <>
                        <span style={{ color: "#D5D0C8", fontSize: 12 }}>·</span>
                        <span style={{ fontSize: 12, color: "#666", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {selectedMenuObj.name}
                        </span>
                      </>
                    )}
                    {selectedTime && (
                      <>
                        <span style={{ color: "#D5D0C8", fontSize: 12 }}>·</span>
                        <span style={{ fontSize: 12, color: "#2C2C2C", fontWeight: 600, flexShrink: 0 }}>
                          {selectedTime.slice(11, 16)}
                        </span>
                      </>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => { resetBooking(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    style={{ fontSize: 11, color: "#9CA3AF", border: "1px solid #D1D5DB", borderRadius: 999, padding: "3px 10px", background: "white", cursor: "pointer", flexShrink: 0 }}
                  >
                    変更
                  </button>
                </div>
              </div>

              {/* ── Step indicator ── */}
              <StepIndicator step={step} />

              {/* ── STEP 1: Schedule selection ── */}
              {step === 1 && (
                <div className="space-y-8">
                  {/* ① Menu */}
                  {!selectedDate ? (
                    <p className="text-sm text-[#AAAAAA] text-center py-4">
                      上の空き状況カレンダーから日付を選んでください
                    </p>
                  ) : (
                    <section>
                      <SectionLabel n="①" label="メニューを選ぶ" />
                      {menuLoading ? (
                        <p className="text-sm text-[#888] py-4 text-center">読み込み中...</p>
                      ) : menuItems.length === 0 ? (
                        <p className="text-sm text-[#888] bg-[#FAFAF8] rounded-xl p-4 text-center">
                          この店舗のメニューが見つかりませんでした。
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {menuItems.map((m) => (
                            <button
                              key={m.menu_item_id}
                              type="button"
                              onClick={() => {
                                setSelectedMenuItemId(m.menu_item_id);
                                setSelectedTime("");
                                setFormError(null);
                              }}
                              className={cn(
                                "text-left p-4 rounded-xl border-2 transition-all",
                                selectedMenuItemId === m.menu_item_id
                                  ? "border-[#C4A962] bg-[#C4A962]/5 shadow-sm"
                                  : "border-[#E5E0D8] bg-white hover:border-[#C4A962]/50 hover:shadow-sm"
                              )}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-semibold text-[#2C2C2C]">{m.name}</span>
                                {selectedMenuItemId === m.menu_item_id && (
                                  <span className="text-[#C4A962] text-xs font-medium shrink-0 mt-0.5">✓</span>
                                )}
                              </div>
                              {m.duration_minutes != null && (
                                <div className="text-xs text-[#888] mt-1.5">約{m.duration_minutes}分</div>
                              )}
                              {m.description && (
                                <div className="text-xs text-[#999] mt-1 line-clamp-2">{m.description}</div>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </section>
                  )}

                  {/* ② Time */}
                  {selectedDate && selectedMenuItemId && (() => {
                    const availableSlots = allTimeSlotsForDate.filter(
                      (slot) => !bookedTimesForDate.has(slot.slice(0, 16))
                    );
                    const morningSlots = availableSlots.filter((s) => parseInt(s.slice(11, 13)) < 12);
                    const afternoonSlots = availableSlots.filter((s) => parseInt(s.slice(11, 13)) >= 12);

                    const SlotButton = ({ slot }: { slot: string }) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => { setSelectedTime(slot); setFormError(null); }}
                          className={cn(
                            "py-3 rounded-lg text-sm font-medium border-2 transition-all",
                            isSelected
                              ? "border-[#C4A962] bg-[#C4A962] text-white shadow-sm"
                              : "border-[#E5E0D8] bg-white text-[#2C2C2C] hover:border-[#C4A962] hover:text-[#C4A962]"
                          )}
                        >
                          {slot.slice(11, 16)}
                        </button>
                      );
                    };

                    return (
                      <section>
                        <SectionLabel n="②" label="時間を選ぶ" />
                        {availableSlots.length === 0 ? (
                          <p className="text-sm text-[#888] bg-[#FAFAF8] rounded-xl p-4 text-center">
                            この日は予約可能な時間帯がありません。別の日付をお選びください。
                          </p>
                        ) : (
                          <div className="space-y-4">
                            {morningSlots.length > 0 && (
                              <div>
                                <p className="text-xs text-[#AAAAAA] font-medium mb-2 ml-1">午前</p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                                  {morningSlots.map((slot) => <SlotButton key={slot} slot={slot} />)}
                                </div>
                              </div>
                            )}
                            {afternoonSlots.length > 0 && (
                              <div>
                                <p className="text-xs text-[#AAAAAA] font-medium mb-2 ml-1">午後</p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                                  {afternoonSlots.map((slot) => <SlotButton key={slot} slot={slot} />)}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </section>
                    );
                  })()}

                  {/* Next button */}
                  {selectedTime && (
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full bg-[#C4A962] hover:bg-[#B39952] text-white py-3 text-base"
                    >
                      次へ → お客様情報の入力
                    </Button>
                  )}
                </div>
              )}

              {/* ── STEP 2: Account + Customer form ── */}
              {step === 2 && (() => {
                const isDataComplete =
                  Boolean(customerData.parent_name.trim()) &&
                  Boolean(customerData.parent_name_kana.trim()) &&
                  Boolean(customerData.phone.trim()) &&
                  Boolean(customerData.postal_code.trim()) &&
                  Boolean(customerData.prefecture.trim()) &&
                  Boolean(customerData.city.trim()) &&
                  Boolean(customerData.address_line.trim());
                const showForm = !session || editingCustomerInfo || !isDataComplete;

                // Email verification pending screen
                if (verificationSent) {
                  return (
                    <section className="space-y-5 text-center">
                      <div style={{ fontSize: 48, marginBottom: 8 }}>📧</div>
                      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#2C2C2C" }}>確認メールを送信しました</h2>
                      <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>
                        <strong>{customerData.email}</strong> 宛に確認メールを送信しました。<br />
                        メール内のリンクをクリックしてアカウントを有効化してください。
                      </p>
                      <div style={{ background: "#FAFAF8", border: "1px solid #E5E0D8", borderRadius: 12, padding: 16, fontSize: 12, color: "#888", textAlign: "left" }}>
                        <p style={{ margin: 0, fontWeight: 600, marginBottom: 4 }}>有効化後の手順</p>
                        <p style={{ margin: 0 }}>① メール内のリンクをクリック</p>
                        <p style={{ margin: 0 }}>② 再度この予約ページを開く</p>
                        <p style={{ margin: 0 }}>③「会員の方」からログインして予約を完了</p>
                      </div>
                      <Button
                        type="button"
                        onClick={() => { setVerificationSent(false); setAuthMode("login"); setAuthPassword(""); setAuthPasswordConfirm(""); }}
                        className="w-full bg-[#C4A962] hover:bg-[#B39952] text-white py-3 text-base"
                      >
                        会員の方はこちらからログイン
                      </Button>
                      <button
                        type="button"
                        onClick={() => { setStep(1); setVerificationSent(false); setFormError(null); setAuthError(null); setError(null); }}
                        style={{ display: "block", width: "100%", padding: "8px", textAlign: "center", fontSize: 13, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer" }}
                      >
                        ← 戻る
                      </button>
                    </section>
                  );
                }

                return (
                  <section className="space-y-5">
                    {/* Booking summary */}
                    <div style={{ background: "#FAFAF8", border: "1px solid #E5E0D8", borderRadius: 12, padding: 16, fontSize: 13 }}>
                      <p style={{ color: "#AAAAAA", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                        ご予約内容
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <p style={{ color: "#2C2C2C", margin: 0 }}>
                          <span style={{ color: "#888" }}>店舗：</span>{selectedLocationObj?.location_name}
                        </p>
                        <p style={{ color: "#2C2C2C", margin: 0 }}>
                          <span style={{ color: "#888" }}>メニュー：</span>
                          {selectedMenuObj?.name}
                          {selectedMenuObj?.duration_minutes != null && `（約${selectedMenuObj.duration_minutes}分）`}
                        </p>
                        {selectedDate && (
                          <p style={{ color: "#2C2C2C", margin: 0 }}>
                            <span style={{ color: "#888" }}>日時：</span>
                            {formatJapaneseDateTime(selectedDate, selectedTime)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* ── Not logged in: auth tabs ── */}
                    {!session && !sessionLoading && (
                      <div className="space-y-4">
                        <h2 className="text-base font-semibold text-[#2C2C2C] pb-2 border-b border-[#E5E0D8]">
                          アカウント
                        </h2>

                        <div className="flex rounded-lg border border-[#E5E0D8] overflow-hidden">
                          <button
                            type="button"
                            onClick={() => { setAuthMode("register"); setAuthError(null); setAuthPasswordConfirm(""); }}
                            className={cn(
                              "flex-1 py-3 text-sm font-medium transition-colors",
                              authMode === "register" ? "bg-[#C4A962] text-white" : "bg-white text-[#666] hover:bg-[#FAFAF8]"
                            )}
                          >
                            はじめての方（新規登録）
                          </button>
                          <button
                            type="button"
                            onClick={() => { setAuthMode("login"); setAuthError(null); setAuthPasswordConfirm(""); }}
                            className={cn(
                              "flex-1 py-3 text-sm font-medium transition-colors",
                              authMode === "login" ? "bg-[#C4A962] text-white" : "bg-white text-[#666] hover:bg-[#FAFAF8]"
                            )}
                          >
                            会員の方（ログイン）
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                              メールアドレス <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="email"
                              value={customerData.email}
                              onChange={(e) => setCustomerData((p) => ({ ...p, email: e.target.value }))}
                              placeholder="customer@example.com"
                              className="bg-[#FAFAF8] border-[#D5D0C8] focus:border-[#C4A962]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                              パスワード
                              {authMode === "register" && (
                                <span className="text-[#999] text-xs font-normal ml-1">（6文字以上）</span>
                              )}
                              <span className="text-red-500"> *</span>
                            </label>
                            <input
                              type="password"
                              value={authPassword}
                              onChange={(e) => setAuthPassword(e.target.value)}
                              autoComplete={authMode === "register" ? "new-password" : "current-password"}
                              placeholder="••••••••"
                              className="w-full h-10 rounded-md border border-[#D5D0C8] bg-[#FAFAF8] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#C4A962]/30 focus:border-[#C4A962]"
                            />
                          </div>
                          {authMode === "register" && (
                            <div>
                              <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                                パスワード（確認） <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="password"
                                value={authPasswordConfirm}
                                onChange={(e) => setAuthPasswordConfirm(e.target.value)}
                                autoComplete="new-password"
                                placeholder="••••••••"
                                className="w-full h-10 rounded-md border border-[#D5D0C8] bg-[#FAFAF8] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#C4A962]/30 focus:border-[#C4A962]"
                              />
                            </div>
                          )}
                        </div>

                        {authError && (
                          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
                            {authError}
                          </p>
                        )}

                        {/* Login-only button for members */}
                        {authMode === "login" && (
                          <Button
                            type="button"
                            onClick={handleLoginOnly}
                            disabled={loginLoading}
                            className="w-full bg-[#C4A962] hover:bg-[#B39952] text-white py-3 text-base"
                          >
                            {loginLoading ? "ログイン中..." : "ログインする"}
                          </Button>
                        )}
                      </div>
                    )}

                    {/* ── Logged in ── */}
                    {session && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555", background: "#F5F3EF", border: "1px solid #E5E0D8", borderRadius: 8, padding: "10px 12px" }}>
                        <span style={{ color: "#C4A962", fontWeight: 700 }}>✓</span>
                        <span>ログイン中：{session.user?.email ?? session.user?.id}</span>
                      </div>
                    )}

                    {/* ── Customer info (new member form OR logged-in confirmation) ── */}
                    {(session || authMode === "register") && (
                      <div className="space-y-4">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E5E0D8", paddingBottom: 8 }}>
                          <h2 className="text-base font-semibold text-[#2C2C2C]">お客様情報</h2>
                          {session && isDataComplete && !editingCustomerInfo && (
                            <button
                              type="button"
                              onClick={() => setEditingCustomerInfo(true)}
                              style={{ fontSize: 11, color: "#9CA3AF", border: "1px solid #D1D5DB", borderRadius: 999, padding: "2px 10px", background: "white", cursor: "pointer" }}
                            >
                              変更
                            </button>
                          )}
                        </div>

                        {/* Confirmation card (logged in + data complete + not editing) */}
                        {session && isDataComplete && !editingCustomerInfo ? (
                          <div style={{ background: "#FAFAF8", border: "1px solid #E5E0D8", borderRadius: 10, padding: "12px 16px", fontSize: 13 }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                              <div style={{ display: "flex", gap: 8 }}>
                                <span style={{ color: "#888", minWidth: 80 }}>保護者名</span>
                                <span style={{ color: "#2C2C2C", fontWeight: 500 }}>
                                  {customerData.parent_name}
                                  {customerData.parent_name_kana && <span style={{ color: "#888", fontWeight: 400, marginLeft: 8 }}>{customerData.parent_name_kana}</span>}
                                </span>
                              </div>
                              {customerData.child_name && (
                                <div style={{ display: "flex", gap: 8 }}>
                                  <span style={{ color: "#888", minWidth: 80 }}>お子様名</span>
                                  <span style={{ color: "#2C2C2C", fontWeight: 500 }}>
                                    {customerData.child_name}
                                    {customerData.child_name_kana && <span style={{ color: "#888", fontWeight: 400, marginLeft: 8 }}>{customerData.child_name_kana}</span>}
                                  </span>
                                </div>
                              )}
                              <div style={{ display: "flex", gap: 8 }}>
                                <span style={{ color: "#888", minWidth: 80 }}>電話番号</span>
                                <span style={{ color: "#2C2C2C", fontWeight: 500 }}>{customerData.phone}</span>
                              </div>
                              <div style={{ display: "flex", gap: 8 }}>
                                <span style={{ color: "#888", minWidth: 80 }}>住所</span>
                                <span style={{ color: "#2C2C2C", fontWeight: 500 }}>
                                  〒{customerData.postal_code}　{customerData.prefecture}{customerData.city}{customerData.address_line}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Edit form */
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                                  保護者名 <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  value={customerData.parent_name}
                                  onChange={(e) => setCustomerData((p) => ({ ...p, parent_name: e.target.value }))}
                                  placeholder="山田 花子"
                                  className="bg-[#FAFAF8] border-[#D5D0C8] focus:border-[#C4A962]"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                                  お子様名
                                  <span className="text-[#999] text-xs font-normal ml-1">（任意）</span>
                                </label>
                                <Input
                                  value={customerData.child_name}
                                  onChange={(e) => setCustomerData((p) => ({ ...p, child_name: e.target.value }))}
                                  placeholder="山田 太郎"
                                  className="bg-[#FAFAF8] border-[#D5D0C8] focus:border-[#C4A962]"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                                  フリガナ（保護者） <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  value={customerData.parent_name_kana}
                                  onChange={(e) => setCustomerData((p) => ({ ...p, parent_name_kana: e.target.value }))}
                                  placeholder="ヤマダ ハナコ"
                                  className="bg-[#FAFAF8] border-[#D5D0C8] focus:border-[#C4A962]"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                                  フリガナ（お子様）
                                  <span className="text-[#999] text-xs font-normal ml-1">（任意）</span>
                                </label>
                                <Input
                                  value={customerData.child_name_kana}
                                  onChange={(e) => setCustomerData((p) => ({ ...p, child_name_kana: e.target.value }))}
                                  placeholder="ヤマダ タロウ"
                                  className="bg-[#FAFAF8] border-[#D5D0C8] focus:border-[#C4A962]"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                                電話番号 <span className="text-red-500">*</span>
                              </label>
                              <Input
                                type="tel"
                                value={customerData.phone}
                                onChange={(e) => setCustomerData((p) => ({ ...p, phone: e.target.value }))}
                                placeholder="090-1234-5678"
                                className="bg-[#FAFAF8] border-[#D5D0C8] focus:border-[#C4A962]"
                              />
                            </div>

                            {/* Address block */}
                            <div style={{ border: "1px solid #E5E0D8", borderRadius: 10, padding: "14px 14px 10px", background: "#FAFAF8" }}>
                              <p className="text-sm font-medium text-[#2C2C2C] mb-3">
                                住所 <span className="text-red-500">*</span>
                              </p>

                              {/* Postal code */}
                              <div className="mb-3">
                                <label className="block text-xs text-[#888] mb-1.5">郵便番号</label>
                                <div style={{ display: "flex", gap: 8 }}>
                                  <Input
                                    value={customerData.postal_code}
                                    onChange={(e) => {
                                      const v = e.target.value.replace(/[^\d]/g, "").slice(0, 7);
                                      const fmt = v.length > 3 ? `${v.slice(0, 3)}-${v.slice(3)}` : v;
                                      setCustomerData((p) => ({ ...p, postal_code: fmt }));
                                      setPostalError(null);
                                    }}
                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handlePostalSearch(); } }}
                                    placeholder="123-4567"
                                    maxLength={8}
                                    className="bg-white border-[#D5D0C8] focus:border-[#C4A962]"
                                    style={{ width: 130 }}
                                  />
                                  <button
                                    type="button"
                                    onClick={handlePostalSearch}
                                    disabled={postalSearchLoading}
                                    style={{
                                      padding: "0 14px",
                                      fontSize: 12,
                                      fontWeight: 600,
                                      color: "white",
                                      background: postalSearchLoading ? "#D5D0C8" : "#C4A962",
                                      border: "none",
                                      borderRadius: 6,
                                      cursor: postalSearchLoading ? "default" : "pointer",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {postalSearchLoading ? "検索中…" : "住所を検索"}
                                  </button>
                                </div>
                                {postalError && (
                                  <p style={{ fontSize: 11, color: "#EF4444", marginTop: 4 }}>{postalError}</p>
                                )}
                              </div>

                              {/* Prefecture */}
                              <div className="mb-3">
                                <label className="block text-xs text-[#888] mb-1.5">都道府県</label>
                                <Input
                                  value={customerData.prefecture}
                                  onChange={(e) => setCustomerData((p) => ({ ...p, prefecture: e.target.value }))}
                                  placeholder="愛知県"
                                  className="bg-white border-[#D5D0C8] focus:border-[#C4A962]"
                                />
                              </div>

                              {/* City */}
                              <div className="mb-3">
                                <label className="block text-xs text-[#888] mb-1.5">市区町村・町域</label>
                                <Input
                                  value={customerData.city}
                                  onChange={(e) => setCustomerData((p) => ({ ...p, city: e.target.value }))}
                                  placeholder="豊川市門前町"
                                  className="bg-white border-[#D5D0C8] focus:border-[#C4A962]"
                                />
                              </div>

                              {/* Address line */}
                              <div>
                                <label className="block text-xs text-[#888] mb-1.5">番地・建物名・部屋番号</label>
                                <Input
                                  value={customerData.address_line}
                                  onChange={(e) => setCustomerData((p) => ({ ...p, address_line: e.target.value }))}
                                  placeholder="1-5 〇〇マンション101号"
                                  className="bg-white border-[#D5D0C8] focus:border-[#C4A962]"
                                />
                              </div>
                            </div>
                            {session && editingCustomerInfo && (
                              <button
                                type="button"
                                onClick={() => setEditingCustomerInfo(false)}
                                style={{ fontSize: 12, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                              >
                                ← キャンセル
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {(formError || error) && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
                        {formError || error}
                      </p>
                    )}

                    {/* Submit button — shown for logged-in users or new registrations */}
                    {(session || authMode === "register") && (
                      <div style={{ marginTop: 24 }}>
                        <Button
                          type="button"
                          onClick={handleToConfirmation}
                          className="w-full bg-[#C4A962] hover:bg-[#B39952] text-white py-3 text-base"
                        >
                          {session ? "確認画面へ →" : "会員登録して確認へ →"}
                        </Button>
                      </div>
                    )}

                    {/* Back button */}
                    <button
                      type="button"
                      onClick={() => { setStep(1); setFormError(null); setAuthError(null); setError(null); }}
                      style={{ display: "block", width: "100%", padding: "10px", textAlign: "center", fontSize: 13, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer" }}
                    >
                      ← 戻る
                    </button>
                  </section>
                );
              })()}

              {/* ── STEP 3: Confirmation ── */}
              {step === 3 && (
                <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: "#2C2C2C", margin: 0 }}>ご予約内容の確認</h2>
                    <p style={{ fontSize: 12, color: "#AAAAAA", marginTop: 6, marginBottom: 0 }}>内容をご確認の上、予約を確定してください。</p>
                  </div>

                  {/* Booking summary */}
                  <div style={{ background: "#FAFAF8", border: "1px solid #E5E0D8", borderRadius: 14, padding: "20px 20px 16px", fontSize: 13 }}>
                    <p style={{ color: "#C4A962", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, margin: "0 0 14px" }}>
                      ご予約内容
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", gap: 12 }}>
                        <span style={{ color: "#AAAAAA", minWidth: 72, flexShrink: 0, fontSize: 12 }}>店舗</span>
                        <span style={{ color: "#2C2C2C", fontWeight: 600 }}>{selectedLocationObj?.location_name}</span>
                      </div>
                      <div style={{ display: "flex", gap: 12 }}>
                        <span style={{ color: "#AAAAAA", minWidth: 72, flexShrink: 0, fontSize: 12 }}>メニュー</span>
                        <span style={{ color: "#2C2C2C", fontWeight: 500 }}>
                          {selectedMenuObj?.name}
                          {selectedMenuObj?.duration_minutes != null && <span style={{ color: "#888", fontWeight: 400 }}>（約{selectedMenuObj.duration_minutes}分）</span>}
                        </span>
                      </div>
                      {selectedDate && (
                        <div style={{ display: "flex", gap: 12 }}>
                          <span style={{ color: "#AAAAAA", minWidth: 72, flexShrink: 0, fontSize: 12 }}>日時</span>
                          <span style={{ color: "#2C2C2C", fontWeight: 600 }}>{formatJapaneseDateTime(selectedDate, selectedTime)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Customer info */}
                  <div style={{ background: "#FAFAF8", border: "1px solid #E5E0D8", borderRadius: 14, padding: "20px 20px 16px", fontSize: 13 }}>
                    <p style={{ color: "#C4A962", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px" }}>
                      お客様情報
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ display: "flex", gap: 12 }}>
                        <span style={{ color: "#AAAAAA", minWidth: 72, flexShrink: 0, fontSize: 12 }}>保護者名</span>
                        <span style={{ color: "#2C2C2C", fontWeight: 500 }}>
                          {customerData.parent_name}
                          {customerData.parent_name_kana && <span style={{ color: "#888", fontWeight: 400, marginLeft: 8 }}>{customerData.parent_name_kana}</span>}
                        </span>
                      </div>
                      {customerData.child_name && (
                        <div style={{ display: "flex", gap: 12 }}>
                          <span style={{ color: "#AAAAAA", minWidth: 72, flexShrink: 0, fontSize: 12 }}>お子様名</span>
                          <span style={{ color: "#2C2C2C", fontWeight: 500 }}>
                            {customerData.child_name}
                            {customerData.child_name_kana && <span style={{ color: "#888", fontWeight: 400, marginLeft: 8 }}>{customerData.child_name_kana}</span>}
                          </span>
                        </div>
                      )}
                      <div style={{ borderTop: "1px solid #EEE9E0", paddingTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                        <div style={{ display: "flex", gap: 12 }}>
                          <span style={{ color: "#AAAAAA", minWidth: 72, flexShrink: 0, fontSize: 12 }}>電話番号</span>
                          <span style={{ color: "#2C2C2C", fontWeight: 500 }}>{customerData.phone}</span>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                          <span style={{ color: "#AAAAAA", minWidth: 72, flexShrink: 0, fontSize: 12 }}>メール</span>
                          <span style={{ color: "#2C2C2C", fontWeight: 500 }}>{session?.user?.email ?? customerData.email}</span>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                          <span style={{ color: "#AAAAAA", minWidth: 72, flexShrink: 0, fontSize: 12 }}>住所</span>
                          <span style={{ color: "#2C2C2C", fontWeight: 500 }}>
                            〒{customerData.postal_code}　{customerData.prefecture}{customerData.city}{customerData.address_line}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {(formError || error) && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
                      {formError || error}
                    </p>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 8 }}>
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitLoading}
                      className="w-full bg-[#C4A962] hover:bg-[#B39952] text-white py-3 text-base"
                    >
                      {submitLoading ? "処理中..." : "予約を確定する"}
                    </Button>
                    <p className="text-xs text-[#AAAAAA] text-center" style={{ margin: 0 }}>
                      ご予約確認メールをお送りします。
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => { setStep(2); setFormError(null); setAuthError(null); setError(null); }}
                    style={{ display: "block", width: "100%", padding: "12px", textAlign: "center", fontSize: 13, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer" }}
                  >
                    ← 戻って修正する
                  </button>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
