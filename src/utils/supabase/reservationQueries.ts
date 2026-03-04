import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "./client";
import type {
  ReservationSettings,
  BookedSlotsResponse,
  LocationAvailability,
  MyReservationItem,
} from "./reservationApi";

export type MyCustomer = {
  id: string;
  customer_code: string;
  phone: string;
  email: string | null;
  parent_name: string | null;
  parent_name_kana: string | null;
  child_name: string | null;
  child_name_kana: string | null;
  child_age_years: number | null;
  child_age_months: number | null;
  postal_code: string | null;
  address_text: string | null;
};

function getClient(): SupabaseClient {
  if (!supabase) throw new Error("Supabase client is not configured");
  return supabase;
}

/** DB の reservation_settings を既存 API 型にマッピング */
function mapReservationSettings(r: Record<string, unknown>): ReservationSettings {
  return {
    reservation_settings_id: (r.reservation_settings_id as string) ?? "default",
    allowed_days: (r.allowed_days as number[]) ?? [1, 2, 3, 4, 5, 6],
    business_hours_start: (r.business_hours_start as string) ?? "09:00",
    business_hours_end: (r.business_hours_end as string) ?? "18:00",
    advance_reservation_days:
      (r.advance_reservation_days as number) ?? (r.advance_booking_days as number) ?? 60,
    max_reservation_days: (r.max_reservation_days as number) ?? 60,
    max_reservations_per_day: (r.max_reservations_per_day as number) ?? 20,
    concurrent_reservations: (r.concurrent_reservations as number) ?? 1,
    closed_dates: (r.closed_dates as string[]) ?? [],
    custom_hours: (r.custom_hours as Record<string, unknown>) ?? {},
    slot_interval_minutes: (r.slot_interval_minutes as number) ?? 30,
    advance_booking_days: (r.advance_booking_days as number) ?? 60,
    updated_at: r.updated_at as string | undefined,
  };
}

/** 予約設定を DB から直接取得 */
export async function getReservationSettings(): Promise<ReservationSettings | null> {
  const client = getClient();
  const { data, error } = await client
    .from("reservation_settings")
    .select("*")
    .eq("reservation_settings_id", "default")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return mapReservationSettings(data as Record<string, unknown>);
}

/** 月または日の範囲で予約済み枠を取得（booked-slots 相当） */
function parseMonthRange(month: string): { start: string; end: string } {
  const [y, m] = month.split("-").map(Number);
  const start = `${month}-01T00:00:00Z`;
  const lastDay = new Date(y, m, 0).getDate();
  const end = `${month}-${String(lastDay).padStart(2, "0")}T23:59:59Z`;
  return { start, end };
}

/** 1ヶ月分の予約済み枠を取得（カレンダー用） */
export async function getBookedSlotsForMonth(
  month: string,
  locationId?: string
): Promise<BookedSlotsResponse> {
  const client = getClient();
  if (!/^\d{4}-\d{2}$/.test(month)) {
    return { slots: [], location_ids: [] };
  }
  const { start, end } = parseMonthRange(month);
  let q = client
    .from("reservations")
    .select("reservation_id, reservation_date_time, location_id, duration_minutes")
    .neq("status", "cancelled")
    .gte("reservation_date_time", start)
    .lte("reservation_date_time", end);
  if (locationId) q = q.eq("location_id", locationId);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as Array<Record<string, unknown>>;
  const slots = rows.map((r) => ({
    reservation_id: r.reservation_id,
    reservation_date_time: r.reservation_date_time,
    location_id: r.location_id,
    duration_minutes: r.duration_minutes ?? null,
  }));
  const location_ids = [...new Set(rows.map((r) => r.location_id as string))];
  return { slots, location_ids };
}

/** DB の location_availability を既存 API 型にマッピング（mon_open/mon_close 等 → business_hours） */
function mapLocationAvailability(
  r: Record<string, unknown>,
  locationId: string
): LocationAvailability {
  const monOpen =
    r.mon_open ?? r.tue_open ?? r.wed_open ?? r.thu_open ?? r.fri_open ?? r.sat_open ?? r.sun_open;
  const monClose =
    r.mon_close ??
    r.tue_close ??
    r.wed_close ??
    r.thu_close ??
    r.fri_close ??
    r.sat_close ??
    r.sun_close;
  return {
    location_id: (r.location_id as string) ?? locationId,
    regular_closed_days: (r.regular_closed_days as number[]) ?? [],
    business_hours_start:
      (r.business_hours_start as string) ??
      (monOpen != null ? String(monOpen).slice(0, 5) : "09:00"),
    business_hours_end:
      (r.business_hours_end as string) ??
      (monClose != null ? String(monClose).slice(0, 5) : "18:00"),
    custom_hours: (r.custom_hours as Record<string, unknown>) ?? {},
    closed_dates: (r.closed_dates as string[]) ?? [],
    special_dates: (r.special_dates as Record<string, unknown>) ?? {},
    max_reservations_per_day: (r.max_reservations_per_day as number) ?? undefined,
    updated_at: r.updated_at as string | undefined,
  };
}

/** 店舗一覧を DB から取得（静的カタログが空のときのフォールバック用）。API型 Location[] を返す */
export async function getLocationsFromDb(): Promise<
  Array<{ location_id: string; location_name: string; address_text?: string; phone?: string; active_flag: boolean }>
> {
  const client = getClient();
  const { data, error } = await client
    .from("locations")
    .select("location_id, name, address, phone, active_flag")
    .eq("active_flag", true)
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as Array<Record<string, unknown>>;
  return rows.map((r) => ({
    location_id: (r.location_id as string) ?? "",
    location_name: (r.name as string) ?? "",
    address_text: r.address as string | undefined,
    phone: r.phone as string | undefined,
    active_flag: (r.active_flag as boolean) ?? true,
  }));
}

/** 1店舗を ID で DB から取得（静的カタログが空のときのフォールバック用） */
export async function getLocationByIdFromDb(id: string): Promise<{
  id: string; name: string; name_kana: string | null; postal_code: string | null;
  address_text: string | null; phone: string | null; email: string | null;
  description: string | null; active_flag: boolean; sort_order: number | null;
} | null> {
  const client = getClient();
  const { data, error } = await client
    .from("locations")
    .select("location_id, name, address, phone, active_flag")
    .eq("location_id", id)
    .eq("active_flag", true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  const r = data as Record<string, unknown>;
  return {
    id: (r.location_id as string) ?? id,
    name: (r.name as string) ?? "",
    name_kana: null,
    postal_code: null,
    address_text: (r.address as string | null) ?? null,
    phone: (r.phone as string | null) ?? null,
    email: null,
    description: null,
    active_flag: (r.active_flag as boolean) ?? true,
    sort_order: null,
  };
}

/** 店舗別営業設定を DB から直接取得 */
export async function getLocationAvailability(
  locationId: string
): Promise<LocationAvailability | null> {
  const client = getClient();
  const { data, error } = await client
    .from("location_availability")
    .select("*")
    .eq("location_id", locationId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return mapLocationAvailability(data as Record<string, unknown>, locationId);
}

/** 店舗に紐づくメニュー一覧を DB から直接取得（静的カタログが空のときのフォールバック用） */
export async function getMenuItemsByLocationFromDb(locationId: string): Promise<Array<{
  menu_item_id: string;
  name: string;
  description?: string;
  base_price?: number;
  duration_minutes?: number | null;
  is_active: boolean;
}>> {
  const client = getClient();
  const { data: lmData, error: lmError } = await client
    .from("location_menus")
    .select("menu_item_id")
    .eq("location_id", locationId)
    .eq("enabled", true);
  if (lmError) throw new Error(lmError.message);
  if (!lmData?.length) return [];
  const menuIds = (lmData as Array<Record<string, unknown>>).map((r) => r.menu_item_id as string);
  const { data, error } = await client
    .from("menu_items")
    .select("menu_item_id, name, description, base_price, duration_minutes, is_active")
    .in("menu_item_id", menuIds)
    .eq("is_active", true);
  if (error) throw new Error(error.message);
  return (data ?? []).map((r: Record<string, unknown>) => ({
    menu_item_id: r.menu_item_id as string,
    name: r.name as string,
    description: (r.description as string) ?? undefined,
    base_price: (r.base_price as number) ?? undefined,
    duration_minutes: (r.duration_minutes as number | null) ?? null,
    is_active: (r.is_active as boolean) ?? true,
  }));
}

/** 認証ユーザーの顧客レコードを取得（RLS で自分のみ可） */
export async function getMyCustomer(): Promise<MyCustomer | null> {
  const client = getClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) return null;
  const { data, error } = await client
    .from("customers")
    .select("id, customer_code, phone, email, parent_name, parent_name_kana, child_name, child_name_kana, child_age_years, child_age_months, postal_code, address_text")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as MyCustomer | null;
}

/** 認証ユーザーの予約一覧を取得（RLS で自分の予約のみ可） */
export async function getMyReservations(): Promise<MyReservationItem[]> {
  const client = getClient();
  const { data: rows, error } = await client
    .from("reservations")
    .select(
      "reservation_id, reservation_number, reservation_date_time, status, duration_minutes, location_id, menu_item_id, created_at"
    )
    .order("reservation_date_time", { ascending: false });
  if (error) throw new Error(error.message);
  const list = (rows ?? []) as Array<Record<string, unknown> & { reservation_id: string; location_id: string; menu_item_id: string }>;
  if (list.length === 0) return [];
  const locationIds = [...new Set(list.map((r) => r.location_id))];
  const menuIds = [...new Set(list.map((r) => r.menu_item_id))];
  const { data: locRows } = await client.from("locations").select("location_id, name").in("location_id", locationIds);
  const { data: menuRows } = await client.from("menu_items").select("id, name").in("id", menuIds);
  const locMap = new Map(
    (locRows ?? []).map((r: Record<string, unknown>) => [r.location_id as string, r.name as string])
  );
  const menuMap = new Map(
    (menuRows ?? []).map((r: Record<string, unknown>) => [r.id as string, r.name as string])
  );
  return list.map((r) => ({
    reservation_id: r.reservation_id,
    reservation_number: r.reservation_number,
    reservation_date_time: r.reservation_date_time,
    status: r.status,
    duration_minutes: r.duration_minutes ?? null,
    location_id: r.location_id,
    location_name: locMap.get(r.location_id) ?? null,
    menu_item_id: r.menu_item_id,
    menu_name: menuMap.get(r.menu_item_id) ?? null,
    notes_customer: null,
    created_at: r.created_at ?? null,
  }));
}
