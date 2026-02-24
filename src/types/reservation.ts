/**
 * 公開予約API用の型定義（Supabase Edge Function 契約に合わせる）
 */

/** 会場（店舗） */
export interface Location {
  location_id: string;
  location_name?: string;
  name?: string;
  address_text?: string;
  phone?: string;
  active_flag?: boolean;
}

/** メニュー項目 */
export interface MenuItem {
  menu_item_id: string;
  name: string;
  base_price?: number;
  additional_unit_price?: number;
  duration_minutes?: number;
  is_active?: boolean;
}

/** 予約設定（枠・制限など） */
export interface ReservationSettings {
  [key: string]: unknown;
}

/** 予約申し込みリクエスト（日時・店舗・メニュー） */
export interface ReservationRequest {
  reservation_date: string;
  reservation_time: string;
  location_id: string;
  menu_item_id: string;
  duration_minutes?: number;
}

/** 顧客情報（申し込みに含める） */
export interface CustomerRequest {
  parent_name: string;
  parent_name_kana?: string;
  child_name?: string;
  child_name_kana?: string;
  children?: unknown;
  phone: string;
  email?: string;
  address_text?: string;
  notes_internal?: string;
}

/** POST /public/reservations のボディ */
export interface CreateReservationBody extends ReservationRequest, CustomerRequest {}

/** 予約レスポンス（API が返す予約情報） */
export interface Reservation {
  reservation_id?: string;
  customer_id?: string;
  reservation_date: string;
  reservation_time: string;
  location_id: string;
  status?: 'confirmed' | 'tentative' | 'cancelled' | 'completed';
  menu_item_id: string;
  duration_minutes?: number;
  [key: string]: unknown;
}
