import { functionsBaseUrl, supabaseAnonKey } from "./info";

const headers: HeadersInit = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${supabaseAnonKey}`,
};

async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const pathWithSlash = path.startsWith("/") ? path : `/${path}`;
  const urlStr = params && Object.keys(params).length > 0
    ? `${functionsBaseUrl}${pathWithSlash}?${new URLSearchParams(params).toString()}`
    : `${functionsBaseUrl}${pathWithSlash}`;
  const res = await fetch(urlStr, { headers });
  let body: unknown;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  if (!res.ok) {
    throw new Error((body as { error?: string })?.error || res.statusText);
  }
  // Supabase 等が { data: T } でラップして返す場合にアンラップ
  if (body && typeof body === "object" && !Array.isArray(body) && "data" in body && Array.isArray((body as { data: unknown }).data)) {
    return (body as { data: T }).data;
  }
  return body as T;
}

async function post<T>(path: string, body: unknown, options?: { accessToken?: string }): Promise<T> {
  const authHeaders: HeadersInit = options?.accessToken
    ? { ...headers, Authorization: `Bearer ${options.accessToken}` }
    : headers;
  const res = await fetch(`${functionsBaseUrl}${path}`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || res.statusText);
  }
  return data as T;
}

export interface Location {
  location_id: string;
  location_name: string;
  address_text?: string;
  phone?: string;
  active_flag: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface MenuItem {
  menu_item_id: string;
  name: string;
  description?: string;
  base_price?: number;
  additional_unit_price?: number;
  duration_minutes?: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ReservationSettings {
  reservation_settings_id: string;
  allowed_days?: number[];
  business_hours_start?: string;
  business_hours_end?: string;
  advance_reservation_days?: number;
  max_reservation_days?: number;
  max_reservations_per_day?: number;
  concurrent_reservations?: number;
  closed_dates?: string[];
  custom_hours?: Record<string, unknown>;
  slot_interval_minutes?: number;
  advance_booking_days?: number;
  updated_at?: string;
}

export interface BookedSlot {
  reservation_id: string;
  reservation_date_time: string;
  location_id: string;
  duration_minutes?: number;
}

export interface BookedSlotsResponse {
  slots: BookedSlot[];
  location_ids: string[];
}

export interface LocationAvailability {
  location_id: string;
  regular_closed_days?: number[];
  business_hours_start?: string;
  business_hours_end?: string;
  custom_hours?: Record<string, unknown>;
  closed_dates?: string[];
  special_dates?: Record<string, unknown>;
  max_reservations_per_day?: number;
  updated_at?: string;
}

export interface CreateReservationBody {
  reservation_date_time: string;
  menu_item_id: string;
  location_id: string;
  parent_name: string;
  parent_name_kana?: string;
  child_name: string;
  child_name_kana?: string;
  child_age_years?: number;
  child_age_months?: number;
  phone: string;
  email: string;
  notes_customer?: string;
  postal_code?: string;
  address_text?: string;
}

export interface CreateReservationResponse {
  reservation: {
    reservation_id: string;
    reservation_number: string;
    reservation_date_time: string;
    duration_minutes?: number;
    menu_item_id: string;
    location_id: string;
    status: string;
    customer_code?: string;
  };
  customer_id: string;
  customer_code: string;
}

export interface MyReservationItem {
  reservation_id: string;
  reservation_number: string;
  reservation_date_time: string;
  status: string;
  duration_minutes: number | null;
  location_id: string;
  location_name: string | null;
  menu_item_id: string;
  menu_name: string | null;
  notes_customer: string | null;
  created_at: string | null;
}

export const reservationApi = {
  health: () => get<{ status: string }>("/public/health"),
  createReservation: (body: CreateReservationBody, accessToken?: string) =>
    post<CreateReservationResponse>("/public/reservations", body, { accessToken }),
};
