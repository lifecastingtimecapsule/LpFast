import { useState, useEffect, useCallback } from "react";
import * as reservationQueries from "@/utils/supabase/reservationQueries";
import type { LocationAvailability, ReservationSettings, BookedSlot } from "@/utils/supabase/reservationApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DayStatus = "◎" | "△" | "×" | "past" | "closed";

interface LocationInfo {
  location_id: string;
  location_name: string;
}

interface Props {
  locations: LocationInfo[];
  availabilityByLocation: Record<string, LocationAvailability | null>;
  settings: ReservationSettings | null;
  onBook: (locationId: string) => void;
  onDateSelect?: (locationId: string, date: Date) => void;
}

const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

function localDateStr(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function toMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getStatus(
  date: Date,
  availability: LocationAvailability | null,
  settings: ReservationSettings | null,
  slots: BookedSlot[]
): DayStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return "past";

  const dow = date.getDay();
  const ds = localDateStr(date);

  if (availability?.regular_closed_days?.includes(dow)) return "closed";
  if ((availability?.closed_dates ?? []).includes(ds)) return "closed";

  const count = slots.filter((s) => {
    const dt = new Date(s.reservation_date_time as string);
    return localDateStr(dt) === ds;
  }).length;

  const maxPerDay =
    availability?.max_reservations_per_day ??
    settings?.max_reservations_per_day ??
    20;

  if (count >= maxPerDay) return "×";
  if (count >= maxPerDay * 0.6) return "△";
  return "◎";
}

function StatusBadge({ status }: { status: DayStatus }) {
  if (status === "past") return <span style={{ color: "#D1D5DB", fontSize: 14, fontWeight: 500 }}>―</span>;
  if (status === "closed") return <span style={{ color: "#D1D5DB", fontSize: 13, fontWeight: 500 }}>休</span>;
  if (status === "◎") return <span style={{ color: "#059669", fontSize: 15, fontWeight: 700 }}>◎</span>;
  if (status === "△") return <span style={{ color: "#F97316", fontSize: 15, fontWeight: 700 }}>△</span>;
  return <span style={{ color: "#EF4444", fontSize: 15, fontWeight: 700 }}>×</span>;
}

export function AvailabilityOverview({ locations, availabilityByLocation, settings, onBook, onDateSelect }: Props) {
  const [expandedLocId, setExpandedLocId] = useState<string | null>(null);
  const [expandedMonth, setExpandedMonth] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [slotsCache, setSlotsCache] = useState<Record<string, BookedSlot[]>>({});

  const fetchSlots = useCallback(
    (locId: string, month: Date) => {
      const mk = toMonthKey(month);
      const key = `${locId}_${mk}`;
      if (slotsCache[key] !== undefined) return;
      reservationQueries
        .getBookedSlotsForMonth(mk, locId)
        .then((res) => setSlotsCache((prev) => ({ ...prev, [key]: res.slots ?? [] })))
        .catch(() => setSlotsCache((prev) => ({ ...prev, [key]: [] })));
    },
    [slotsCache]
  );

  useEffect(() => {
    if (!locations.length) return;
    const today = new Date();
    today.setDate(1);
    locations.forEach((loc) => fetchSlots(loc.location_id, today));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  useEffect(() => {
    if (!expandedLocId) return;
    fetchSlots(expandedLocId, expandedMonth);
    const next = new Date(expandedMonth);
    next.setMonth(next.getMonth() + 1);
    fetchSlots(expandedLocId, next);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedLocId, expandedMonth]);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  function buildMonthGrid(date: Date): (Date | null)[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }

  if (!locations.length) return null;

  const grid7: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
  };

  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 17, fontWeight: 600, color: "#2C2C2C", marginBottom: 4 }}>空き状況</h2>
      <p style={{ fontSize: 11, color: "#AAAAAA", marginBottom: 20 }}>
        ◎余裕あり　△残りわずか　×満席・休業
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {locations.map((loc) => {
          const avail = availabilityByLocation[loc.location_id] ?? null;
          const isExpanded = expandedLocId === loc.location_id;

          const getSlots = (month: Date): BookedSlot[] =>
            slotsCache[`${loc.location_id}_${toMonthKey(month)}`] ?? [];

          const allWeekSlots = [
            ...getSlots(new Date()),
          ];

          return (
            <div
              key={loc.location_id}
              style={{ border: "1px solid #E5E0D8", borderRadius: 12, overflow: "hidden" }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#FAFAF8" }}>
                <span style={{ fontWeight: 600, color: "#2C2C2C" }}>{loc.location_name}</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    onClick={() => {
                      if (isExpanded) {
                        setExpandedLocId(null);
                      } else {
                        setExpandedLocId(loc.location_id);
                        const m = new Date();
                        m.setDate(1);
                        m.setHours(0, 0, 0, 0);
                        setExpandedMonth(m);
                      }
                    }}
                    style={{
                      fontSize: 11,
                      color: "#9CA3AF",
                      border: "1px solid #D1D5DB",
                      borderRadius: 999,
                      padding: "3px 12px",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    {isExpanded ? "閉じる" : "1ヶ月を見る"}
                  </button>
                  <button
                    onClick={() => onBook(loc.location_id)}
                    style={{
                      fontSize: 11,
                      color: "white",
                      background: "#C4A962",
                      border: "none",
                      borderRadius: 999,
                      padding: "4px 14px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    予約する →
                  </button>
                </div>
              </div>

              {/* Weekly strip */}
              <div style={{ ...grid7, borderTop: "1px solid #E5E0D8" }}>
                {weekDays.map((day, i) => {
                  const status = getStatus(day, avail, settings, allWeekSlots);
                  const isToday = i === 0;
                  const dow = day.getDay();
                  const dowColor = dow === 0 ? "#F87171" : "#9CA3AF";
                  const isClickable = onDateSelect && status !== "past" && status !== "closed" && status !== "×";
                  return (
                    <div
                      key={i}
                      onClick={isClickable ? () => onDateSelect!(loc.location_id, day) : undefined}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "8px 0",
                        gap: 2,
                        borderRight: i < 6 ? "1px solid #E5E0D8" : undefined,
                        background: isToday ? "#FFFBF0" : undefined,
                        cursor: isClickable ? "pointer" : undefined,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={isClickable ? (e) => {
                        (e.currentTarget as HTMLDivElement).style.background = "#F0EDE6";
                      } : undefined}
                      onMouseLeave={isClickable ? (e) => {
                        (e.currentTarget as HTMLDivElement).style.background = isToday ? "#FFFBF0" : "";
                      } : undefined}
                    >
                      <span style={{ fontSize: 10, fontWeight: 500, color: dowColor }}>{DAY_LABELS[dow]}</span>
                      <span style={{ fontSize: 11, fontWeight: 500, color: isToday ? "#C4A962" : "#2C2C2C" }}>
                        {day.getDate()}
                      </span>
                      <StatusBadge status={status} />
                    </div>
                  );
                })}
              </div>

              {/* Monthly calendar (expanded) */}
              {isExpanded && (
                <div style={{ borderTop: "1px solid #E5E0D8", padding: 16 }}>
                  {/* Month navigation */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <button
                      onClick={() => {
                        const prev = new Date(expandedMonth);
                        prev.setMonth(prev.getMonth() - 1);
                        setExpandedMonth(prev);
                      }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4 }}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#2C2C2C" }}>
                      {expandedMonth.getFullYear()}年{expandedMonth.getMonth() + 1}月
                    </span>
                    <button
                      onClick={() => {
                        const next = new Date(expandedMonth);
                        next.setMonth(next.getMonth() + 1);
                        setExpandedMonth(next);
                      }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4 }}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div style={grid7}>
                    {DAY_LABELS.map((d, i) => (
                      <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 500, paddingBottom: 6, color: i === 0 ? "#F87171" : "#9CA3AF" }}>
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Calendar cells */}
                  <div style={{ ...grid7, gap: "4px 0" }}>
                    {buildMonthGrid(expandedMonth).map((day, i) => {
                      if (!day) return <div key={`e${i}`} />;
                      const monthSlots = getSlots(day);
                      const status = getStatus(day, avail, settings, monthSlots);
                      const isToday = localDateStr(day) === localDateStr(new Date());
                      const isClickable = onDateSelect && status !== "past" && status !== "closed" && status !== "×";
                      return (
                        <div
                          key={i}
                          onClick={isClickable ? () => onDateSelect!(loc.location_id, day) : undefined}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "4px 0",
                            borderRadius: 8,
                            background: isToday ? "#FFFBF0" : undefined,
                            cursor: isClickable ? "pointer" : undefined,
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={isClickable ? (e) => {
                            (e.currentTarget as HTMLDivElement).style.background = "#F0EDE6";
                          } : undefined}
                          onMouseLeave={isClickable ? (e) => {
                            (e.currentTarget as HTMLDivElement).style.background = isToday ? "#FFFBF0" : "";
                          } : undefined}
                        >
                          <span style={{ fontSize: 10, color: status === "past" ? "#D1D5DB" : "#6B7280" }}>
                            {day.getDate()}
                          </span>
                          <StatusBadge status={status} />
                        </div>
                      );
                    })}
                  </div>

                  {onDateSelect && (
                    <p style={{ fontSize: 10, color: "#AAAAAA", textAlign: "center", marginTop: 10 }}>
                      ◎△の日付をタップして予約へ
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
