/**
 * Supabase から locations / menu_items / location_menus を取得し、
 * src/data/reservationCatalog.ts を上書きする。
 * 実行: node scripts/exportReservationCatalog.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function loadEnv() {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) {
    console.warn(".env not found at", envPath);
    return {};
  }
  const text = fs.readFileSync(envPath, "utf-8");
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) {
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
        val = val.slice(1, -1).replace(/\\n/g, "\n");
      out[m[1]] = val;
    }
  }
  return out;
}

async function fetchSupabase(projectId, anonKey, table, query) {
  const url = `https://${projectId}.supabase.co/rest/v1/${table}?${query}`;
  const res = await fetch(url, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`${table}: ${res.status} ${await res.text()}`);
  return res.json();
}

function escapeForTs(s) {
  if (s === null || s === undefined) return "null";
  return JSON.stringify(s);
}

const env = loadEnv();
const projectId = env.VITE_SUPABASE_PROJECT_ID;
const anonKey = env.VITE_SUPABASE_ANON_KEY;
if (!projectId || !anonKey) {
  console.error("Missing VITE_SUPABASE_PROJECT_ID or VITE_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

try {
  const locationsQuery =
    "select=id,name,name_kana,postal_code,address_text,phone,email,description,active_flag,sort_order&active_flag=eq.true&order=sort_order.asc.nullslast";
  const menuItemsQuery =
    "select=id,name,description,price_cents,duration_minutes,is_active,sort_order&is_active=eq.true&order=sort_order.asc.nullslast";
  const locationMenusQuery = "select=location_id,menu_item_id,enabled&enabled=eq.true";

  const [locations, menuItems, locationMenus] = await Promise.all([
    fetchSupabase(projectId, anonKey, "locations", locationsQuery),
    fetchSupabase(projectId, anonKey, "menu_items", menuItemsQuery),
    fetchSupabase(projectId, anonKey, "location_menus", locationMenusQuery),
  ]);

  const locStr = locations
    .map(
      (l) =>
        `  { id: ${escapeForTs(l.id)}, name: ${escapeForTs(l.name)}, name_kana: ${escapeForTs(l.name_kana)}, postal_code: ${escapeForTs(l.postal_code)}, address_text: ${escapeForTs(l.address_text)}, phone: ${escapeForTs(l.phone)}, email: ${escapeForTs(l.email)}, description: ${escapeForTs(l.description)}, active_flag: ${l.active_flag === true}, sort_order: ${l.sort_order != null ? l.sort_order : "null"} }`
    )
    .join(",\n");
  const menuStr = menuItems
    .map(
      (m) =>
        `  { id: ${escapeForTs(m.id)}, name: ${escapeForTs(m.name)}, description: ${escapeForTs(m.description)}, price_cents: ${m.price_cents != null ? m.price_cents : "null"}, duration_minutes: ${m.duration_minutes != null ? m.duration_minutes : "null"}, is_active: ${m.is_active === true}, sort_order: ${m.sort_order != null ? m.sort_order : "null"} }`
    )
    .join(",\n");
  const lmStr = locationMenus
    .map(
      (lm) =>
        `  { location_id: ${escapeForTs(lm.location_id)}, menu_item_id: ${escapeForTs(lm.menu_item_id)}, enabled: ${lm.enabled === true} }`
    )
    .join(",\n");

  const outPath = path.join(root, "src/data/reservationCatalog.ts");
  const content = `/**
 * 静的カタログ: 店舗・メニュー・紐付け。
 * ランタイムで Supabase から取得せず、このファイルを参照する。
 * 更新時は node scripts/exportReservationCatalog.mjs を実行して再生成すること。
 * Generated at ${new Date().toISOString()}
 */

export interface StaticLocationRow {
  id: string;
  name: string;
  name_kana: string | null;
  postal_code: string | null;
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
export const locations: StaticLocationRow[] = [
${locStr}
];

/** 有効なメニュー一覧（is_active=true、sort_order 昇順） */
export const menuItems: StaticMenuItemRow[] = [
${menuStr}
];

/** 店舗×メニュー（enabled=true のみ） */
export const locationMenus: StaticLocationMenuRow[] = [
${lmStr}
];

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
`;

  fs.writeFileSync(outPath, content, "utf-8");
  console.log("Wrote", outPath, "| locations:", locations.length, "menuItems:", menuItems.length, "locationMenus:", locationMenus.length);
} catch (e) {
  console.error(e);
  process.exit(1);
}
