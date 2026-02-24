/**
 * 公開予約APIクライアント（認証不要・anon key で Supabase Edge Function を呼ぶ）
 */

import type {
  Location,
  MenuItem,
  ReservationSettings,
  CreateReservationBody,
} from '../types/reservation';

const FUNCTION_NAME = 'make-server-fe84bde0';

function getBaseUrl(): string {
  const url = import.meta.env.VITE_SUPABASE_URL;
  if (url) {
    return `${url.replace(/\/$/, '')}/functions/v1/${FUNCTION_NAME}`;
  }
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  if (!projectId) {
    throw new Error('VITE_SUPABASE_PROJECT_ID または VITE_SUPABASE_URL を設定してください');
  }
  return `https://${projectId}.supabase.co/functions/v1/${FUNCTION_NAME}`;
}

function getHeaders(): HeadersInit {
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!anonKey) {
    throw new Error('VITE_SUPABASE_ANON_KEY を設定してください');
  }
  return {
    'Authorization': `Bearer ${anonKey}`,
    'Content-Type': 'application/json',
  };
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = path.startsWith('http') ? path : `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers as HeadersInit),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    let message = `API エラー (${res.status})`;
    try {
      const json = JSON.parse(text);
      if (json.message) message = json.message;
      else if (json.error) message = json.error;
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }

  const contentType = res.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return res.json() as Promise<T>;
  }
  return res.text() as Promise<T>;
}

/** 会場（店舗）一覧 */
export async function fetchLocations(): Promise<Location[]> {
  const data = await request<Location[] | { data?: Location[]; locations?: Location[] }>('/public/locations');
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object' && 'locations' in data && Array.isArray((data as { locations: Location[] }).locations)) {
    return (data as { locations: Location[] }).locations;
  }
  if (data && typeof data === 'object' && 'data' in data && Array.isArray((data as { data: Location[] }).data)) {
    return (data as { data: Location[] }).data;
  }
  return [];
}

/** メニュー一覧（店舗指定可） */
export async function fetchMenuItems(locationId?: string): Promise<MenuItem[]> {
  const path = locationId
    ? `/public/menu-items?location_id=${encodeURIComponent(locationId)}`
    : '/public/menu-items';
  const data = await request<MenuItem[] | { data?: MenuItem[]; menu_items?: MenuItem[]; menuItems?: MenuItem[] }>(path);
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object' && 'menu_items' in data && Array.isArray((data as { menu_items: MenuItem[] }).menu_items)) {
    return (data as { menu_items: MenuItem[] }).menu_items;
  }
  if (data && typeof data === 'object' && 'menuItems' in data && Array.isArray((data as { menuItems: MenuItem[] }).menuItems)) {
    return (data as { menuItems: MenuItem[] }).menuItems;
  }
  if (data && typeof data === 'object' && 'data' in data && Array.isArray((data as { data: MenuItem[] }).data)) {
    return (data as { data: MenuItem[] }).data;
  }
  return [];
}

/** 予約設定 */
export async function fetchReservationSettings(): Promise<ReservationSettings> {
  const data = await request<ReservationSettings | { data?: ReservationSettings; settings?: ReservationSettings }>('/public/reservation-settings');
  if (data && typeof data === 'object' && 'settings' in data && (data as { settings?: ReservationSettings }).settings !== undefined) {
    return (data as { settings: ReservationSettings }).settings;
  }
  if (data && typeof data === 'object' && !Array.isArray(data) && !('data' in data) && !('settings' in data)) {
    return data as ReservationSettings;
  }
  if (data && typeof data === 'object' && 'data' in data) {
    return (data as { data: ReservationSettings }).data ?? {};
  }
  return {};
}

/** 予約申し込み */
export async function createReservation(body: CreateReservationBody): Promise<unknown> {
  return request('/public/reservations', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
