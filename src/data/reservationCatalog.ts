/**
 * 静的カタログ: 店舗・メニュー・紐付け。
 * ランタイムで Supabase から取得せず、このファイルを参照する。
 * 更新時は scripts/exportReservationCatalog.mjs を実行して再生成すること。
 *
 * Supabase locations テーブルとの対応:
 * - name … 店舗名（表示用「店舗」）
 * - address_text … 住所（表示用「住所」）
 * - phone, postal_code, description 等はそのまま
 */

export interface StaticLocationRow {
  id: string;
  /** 店舗名（Supabase: locations.name） */
  name: string;
  name_kana: string | null;
  postal_code: string | null;
  /** 住所（Supabase: locations.address_text） */
  address_text: string | null;
  phone: string | null;
  email: string | null;
  description: string | null;
  active_flag: boolean;
  sort_order: number | null;
}

export interface StaticMenuItemRow {
  id: string;
  name: string;
  description: string | null;
  price_cents: number | null;
  duration_minutes: number | null;
  is_active: boolean;
  sort_order: number | null;
}

export interface StaticLocationMenuRow {
  location_id: string;
  menu_item_id: string;
  enabled: boolean;
}

/** 有効な店舗一覧（active_flag=true、sort_order 昇順） */
export const locations: StaticLocationRow[] = [];

/** 有効なメニュー一覧（is_active=true、sort_order 昇順） */
export const menuItems: StaticMenuItemRow[] = [];

/** 店舗×メニュー（enabled=true のみ） */
export const locationMenus: StaticLocationMenuRow[] = [];

/** 予約フォーム・API互換の店舗リスト（location_id, location_name 等） */
export function getActiveLocations(): Array<{
  location_id: string;
  location_name: string;
  address_text?: string;
  phone?: string;
  active_flag: boolean;
}> {
  return locations
    .filter((l) => l.active_flag)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((l) => ({
      location_id: l.id,
      location_name: l.name,
      address_text: l.address_text ?? undefined,
      phone: l.phone ?? undefined,
      active_flag: l.active_flag,
    }));
}

/** 指定店舗で有効なメニュー一覧（予約フォーム・API互換） */
export function getActiveMenuItemsByLocation(locationId: string): Array<{
  menu_item_id: string;
  name: string;
  description?: string;
  base_price?: number;
  duration_minutes?: number | null;
  is_active: boolean;
}> {
  const menuIds = new Set(
    locationMenus
      .filter((lm) => lm.location_id === locationId && lm.enabled)
      .map((lm) => lm.menu_item_id)
  );
  return menuItems
    .filter((m) => m.is_active && menuIds.has(m.id))
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((m) => ({
      menu_item_id: m.id,
      name: m.name,
      description: m.description ?? undefined,
      base_price: m.price_cents ?? undefined,
      duration_minutes: m.duration_minutes ?? null,
      is_active: m.is_active,
    }));
}

/** 店舗IDで1件取得（店舗詳細ページ用） */
export function getLocationById(id: string): StaticLocationRow | undefined {
  return locations.find((l) => l.id === id && l.active_flag);
}
