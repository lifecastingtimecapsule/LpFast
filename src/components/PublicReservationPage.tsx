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
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/components/ui/utils";
import { AvailabilityOverview } from "@/components/AvailabilityOverview";

type SessionType = { user: { id: string; email?: string }; access_token: string } | null;

type CustomerData = {
  parent_name: string;
  child_name: string;
  phone: string;
  email: string;
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
    <h2 className="text-base font-semibold text-[#2C2C2C] mb-3 flex items-center gap-2">
      <span className="w-6 h-6 rounded-full bg-[#C4A962] text-white text-xs flex items-center justify-center font-bold shrink-0">
        {n}
      </span>
      {label}
    </h2>
  );
}

export function PublicReservationPage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  // Auth
  const [session, setSession] = useState<SessionType>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const { loading: profileLoading, role } = useProfile(session);

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

  // Customer form (required fields only)
  const [customerData, setCustomerData] = useState<CustomerData>({
    parent_name: "",
    child_name: "",
    phone: "",
    email: "",
  });

  // Auth
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [authPassword, setAuthPassword] = useState("");
  const [authPasswordConfirm, setAuthPasswordConfirm] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Global
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // ── Effects ─────────────────────────────────────────────────────────────────

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

  // Prefill customer data if logged in
  useEffect(() => {
    if (!session?.access_token || profileLoading) return;
    if (role !== undefined && role !== null && role !== "customer") return;
    let cancelled = false;
    reservationQueries
      .getMyCustomer()
      .then((customer) => {
        if (cancelled || !customer) return;
        setCustomerData((prev) => ({
          ...prev,
          phone: customer.phone ?? prev.phone,
          email: customer.email ?? prev.email,
          parent_name: customer.parent_name ?? prev.parent_name,
          child_name: customer.child_name ?? prev.child_name,
        }));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [session?.access_token, profileLoading, role]);

  // Load initial data (locations + settings)
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
      .then((res) => {
        if (!cancelled) setSettings(res ?? null);
      })
      .catch((e) => {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "読み込みに失敗しました");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Load availability for all locations
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
    return () => {
      cancelled = true;
    };
  }, [locations]);

  // Load menu items when location selected
  useEffect(() => {
    if (!selectedLocationId) {
      setMenuItems([]);
      return;
    }
    const staticMenus = getActiveMenuItemsByLocation(selectedLocationId);
    if (staticMenus.length > 0) {
      setMenuItems(staticMenus);
      return;
    }
    setMenuLoading(true);
    reservationQueries
      .getMenuItemsByLocationFromDb(selectedLocationId)
      .then((items) => setMenuItems(items as MenuItem[]))
      .catch(() => setMenuItems([]))
      .finally(() => setMenuLoading(false));
  }, [selectedLocationId]);

  // Load booked slots for displayed month + location
  useEffect(() => {
    if (!selectedLocationId) return;
    const y = displayedMonth.getFullYear();
    const mo = displayedMonth.getMonth() + 1;
    const monthKey = `${y}-${String(mo).padStart(2, "0")}`;
    let cancelled = false;
    reservationQueries
      .getBookedSlotsForMonth(monthKey, selectedLocationId)
      .then((res) => {
        if (!cancelled)
          setMonthBookedSlots((prev) => ({ ...prev, [monthKey]: res.slots ?? [] }));
      })
      .catch(() => {
        if (!cancelled) setMonthBookedSlots((prev) => ({ ...prev, [monthKey]: [] }));
      });
    return () => {
      cancelled = true;
    };
  }, [displayedMonth, selectedLocationId]);

  // ── Computed ─────────────────────────────────────────────────────────────────

  const currentAvailability = availabilityByLocation[selectedLocationId] ?? null;

  const bookedCountsByDay = useMemo<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    Object.values(monthBookedSlots)
      .flat()
      .forEach((slot) => {
        const dateStr = String(slot.reservation_date_time).slice(0, 10);
        counts[dateStr] = (counts[dateStr] ?? 0) + 1;
      });
    return counts;
  }, [monthBookedSlots]);

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

  const bookedDateModifiers = useMemo<Date[]>(() => {
    return Object.entries(bookedCountsByDay)
      .filter(([, count]) => count > 0)
      .map(([dateStr]) => {
        const [y, mo, d] = dateStr.split("-").map(Number);
        return new Date(y, mo - 1, d);
      });
  }, [bookedCountsByDay]);

  const selectedLocationObj = locations.find((l) => l.location_id === selectedLocationId);
  const selectedMenuObj = menuItems.find((m) => m.menu_item_id === selectedMenuItemId);

  // ── Calendar disabled logic ───────────────────────────────────────────────────

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    const advance =
      settings?.advance_reservation_days ?? settings?.advance_booking_days ?? 60;
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + advance);
    if (date > maxDate) return true;

    const dayOfWeek = date.getDay();
    const avail = currentAvailability;
    if (avail) {
      if (avail.regular_closed_days?.includes(dayOfWeek)) return true;
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      if ((avail.closed_dates ?? []).includes(dateStr)) return true;
    } else if (settings?.allowed_days) {
      if (!settings.allowed_days.includes(dayOfWeek)) return true;
    }

    const avail2 = currentAvailability as Record<string, unknown> | null;
    const maxPerDay =
      (avail2?.max_reservations_per_day as number | undefined) ??
      settings?.max_reservations_per_day;
    if (maxPerDay) {
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      if ((bookedCountsByDay[dateStr] ?? 0) >= maxPerDay) return true;
    }
    return false;
  };

  // ── Submit ────────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    setError(null);
    setAuthError(null);
    setFormError(null);

    // Validate customer fields
    if (!customerData.parent_name.trim()) {
      setFormError("保護者名を入力してください");
      return;
    }
    if (!customerData.child_name.trim()) {
      setFormError("お子様名を入力してください");
      return;
    }
    if (!customerData.phone.trim()) {
      setFormError("電話番号を入力してください");
      return;
    }

    let currentSession = session;

    if (!currentSession) {
      if (!customerData.email.trim() || !validateEmail(customerData.email)) {
        setAuthError("有効なメールアドレスを入力してください");
        return;
      }
      if (!authPassword) {
        setAuthError("パスワードを入力してください");
        return;
      }
      setSubmitLoading(true);
      try {
        if (authMode === "register") {
          if (authPassword.length < 6) {
            setAuthError("パスワードは6文字以上で入力してください");
            setSubmitLoading(false);
            return;
          }
          if (authPassword !== authPasswordConfirm) {
            setAuthError("パスワードが一致しません");
            setSubmitLoading(false);
            return;
          }
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: customerData.email,
            password: authPassword,
          });
          if (signUpError) {
            setAuthError(
              signUpError.message.includes("already registered") ||
                signUpError.message.includes("User already registered")
                ? "このメールアドレスは既に登録されています。「会員の方」からログインしてください。"
                : signUpError.message
            );
            setSubmitLoading(false);
            return;
          }
          if (!signUpData.session) {
            setAuthError(
              "確認メールをお送りしました。メール内のリンクをクリックし、ログインしてから予約をお試しください。"
            );
            setSubmitLoading(false);
            return;
          }
          currentSession = signUpData.session as SessionType;
        } else {
          const { data: signInData, error: signInError } =
            await supabase.auth.signInWithPassword({
              email: customerData.email,
              password: authPassword,
            });
          if (signInError) {
            setAuthError("メールアドレスまたはパスワードが正しくありません。");
            setSubmitLoading(false);
            return;
          }
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
      if (!accessToken) {
        setError("認証エラーが発生しました。再度お試しください。");
        setSubmitLoading(false);
        return;
      }
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
        <p className="mb-6 text-[#2C2C2C]">
          スタッフ・管理者アカウントではご予約いただけません。
        </p>
        <Button type="button" variant="outline" onClick={() => navigate("/")}>
          トップへ
        </Button>
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
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <>
      <Helmet>
        <title>Web予約｜立体手形の専門スタジオ amorétto</title>
        <meta
          name="description"
          content="amoréttoのWeb予約フォームです。店舗・メニュー・日時を選んでご予約ください。"
        />
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
            scrollToForm();
          }}
          onDateSelect={(locId, date) => {
            setSelectedLocationId(locId);
            setSelectedDate(date);
            setDisplayedMonth(new Date(date.getFullYear(), date.getMonth(), 1));
            setSelectedMenuItemId("");
            setSelectedTime("");
            setMonthBookedSlots({});
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
            <div className="space-y-8">

              {/* Selected store bar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                background: "#FFFBF0",
                border: "1px solid #E5D99A",
                borderRadius: 12,
              }}>
                <div>
                  <span style={{ fontSize: 11, color: "#C4A962", fontWeight: 600 }}>予約店舗</span>
                  <p style={{ margin: 0, fontWeight: 700, color: "#2C2C2C" }}>
                    {selectedLocationObj?.location_name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => { resetBooking(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{ fontSize: 11, color: "#9CA3AF", background: "none", border: "1px solid #D1D5DB", borderRadius: 999, padding: "3px 12px", cursor: "pointer" }}
                >
                  変更
                </button>
              </div>

              {/* ① Date selection */}
              <section>
                <SectionLabel n="①" label="日付を選ぶ" />
                <div className="rounded-xl border border-[#E5E0D8] bg-white shadow-sm p-4 md:p-5">
                  <Calendar
                    mode="single"
                    month={displayedMonth}
                    onMonthChange={(m) => {
                      setDisplayedMonth(m);
                      setSelectedDate(undefined);
                      setSelectedMenuItemId("");
                      setSelectedTime("");
                    }}
                    selected={selectedDate}
                    onSelect={(d) => {
                      setSelectedDate(d);
                      setSelectedMenuItemId("");
                      setSelectedTime("");
                      setFormError(null);
                    }}
                    disabled={isDateDisabled}
                    modifiers={{ booked: bookedDateModifiers }}
                    modifiersClassNames={{ booked: "day-has-bookings" }}
                    className="mx-auto"
                  />
                  <p className="text-xs text-[#BBBBBB] text-center mt-3">
                    グレーの日付は予約不可（休業日・満席）です
                  </p>
                </div>
              </section>

              {/* ② Menu selection (shown when date selected) */}
              {selectedDate && (
                <section>
                  <SectionLabel n="②" label="メニューを選ぶ" />
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

              {/* ③ Time slot selection (shown when date + menu selected) */}
              {selectedDate && selectedMenuItemId && (
                <section>
                  <SectionLabel n="③" label={`時間を選ぶ（${formatJapaneseDate(selectedDate)}）`} />
                  {allTimeSlotsForDate.length === 0 ? (
                    <p className="text-sm text-[#888] bg-[#FAFAF8] rounded-xl p-4 text-center">
                      この日は予約可能な時間帯がありません。別の日付をお選びください。
                    </p>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {allTimeSlotsForDate.map((slot) => {
                          const isBooked = bookedTimesForDate.has(slot.slice(0, 16));
                          const isSelected = selectedTime === slot;
                          const label = slot.slice(11, 16);
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isBooked}
                              onClick={() => {
                                setSelectedTime(slot);
                                setFormError(null);
                              }}
                              className={cn(
                                "py-3 px-2 rounded-lg text-sm font-medium border-2 transition-all",
                                isBooked
                                  ? "border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed"
                                  : isSelected
                                  ? "border-[#C4A962] bg-[#C4A962] text-white shadow-sm"
                                  : "border-[#E5E0D8] bg-white text-[#2C2C2C] hover:border-[#C4A962] hover:text-[#C4A962]"
                              )}
                            >
                              {label}
                              {isBooked && <div className="text-xs mt-0.5 text-gray-300">満席</div>}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-5 mt-4 text-xs text-[#999]">
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block w-4 h-4 rounded border-2 border-[#E5E0D8] bg-white" />
                          空き
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block w-4 h-4 rounded bg-[#C4A962]" />
                          選択中
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block w-4 h-4 rounded bg-gray-100 border-2 border-gray-200" />
                          満席
                        </span>
                      </div>
                    </>
                  )}
                </section>
              )}

              {/* ④ Account + customer info (shown when time selected) */}
              {selectedTime && (
                <section className="space-y-5">
                  {/* Mini summary */}
                  <div className="bg-[#FAFAF8] border border-[#E5E0D8] rounded-xl p-4 text-sm space-y-1">
                    <p className="text-[#AAAAAA] text-xs font-semibold uppercase tracking-wide mb-2">ご予約内容</p>
                    <p className="text-[#2C2C2C]">
                      <span className="text-[#888]">店舗：</span>{selectedLocationObj?.location_name}
                    </p>
                    <p className="text-[#2C2C2C]">
                      <span className="text-[#888]">メニュー：</span>
                      {selectedMenuObj?.name}
                      {selectedMenuObj?.duration_minutes != null && `（約${selectedMenuObj.duration_minutes}分）`}
                    </p>
                    {selectedDate && (
                      <p className="text-[#2C2C2C]">
                        <span className="text-[#888]">日時：</span>
                        {formatJapaneseDateTime(selectedDate, selectedTime)}
                      </p>
                    )}
                  </div>

                  {/* Auth section (not logged in) */}
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
                            authMode === "register"
                              ? "bg-[#C4A962] text-white"
                              : "bg-white text-[#666] hover:bg-[#FAFAF8]"
                          )}
                        >
                          はじめての方（新規登録）
                        </button>
                        <button
                          type="button"
                          onClick={() => { setAuthMode("login"); setAuthError(null); setAuthPasswordConfirm(""); }}
                          className={cn(
                            "flex-1 py-3 text-sm font-medium transition-colors",
                            authMode === "login"
                              ? "bg-[#C4A962] text-white"
                              : "bg-white text-[#666] hover:bg-[#FAFAF8]"
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
                    </div>
                  )}

                  {/* Logged in indicator */}
                  {session && (
                    <div className="flex items-center gap-2 text-sm text-[#555] bg-[#F5F3EF] border border-[#E5E0D8] rounded-lg p-3">
                      <span className="text-[#C4A962] font-bold">✓</span>
                      <span>ログイン中：{session.user?.email ?? session.user?.id}</span>
                    </div>
                  )}

                  {/* Customer info */}
                  <div className="space-y-4">
                    <h2 className="text-base font-semibold text-[#2C2C2C] pb-2 border-b border-[#E5E0D8]">
                      お客様情報
                    </h2>
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
                          お子様名 <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={customerData.child_name}
                          onChange={(e) => setCustomerData((p) => ({ ...p, child_name: e.target.value }))}
                          placeholder="山田 太郎"
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
                  </div>

                  {(formError || error) && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
                      {formError || error}
                    </p>
                  )}

                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitLoading}
                    className="w-full bg-[#C4A962] hover:bg-[#B39952] text-white py-3 text-base"
                  >
                    {submitLoading
                      ? "処理中..."
                      : session
                      ? "予約を確定する"
                      : authMode === "register"
                      ? "会員登録して予約する"
                      : "ログインして予約する"}
                  </Button>

                  <p className="text-xs text-[#AAAAAA] text-center">
                    ご予約確認メールをお送りします。
                  </p>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
