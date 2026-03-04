// Public reservation API: no auth required; use Authorization: Bearer ANON_KEY from client.
// Edge Function uses SUPABASE_SERVICE_ROLE_KEY for DB writes (bypass RLS).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function errorResponse(message: string, status = 400) {
  return jsonResponse({ error: message }, status);
}

// Path after function name. Request URL may be .../functions/v1/make-server-fe84bde0/public/health
function getPathname(url: string): string {
  const path = new URL(url).pathname;
  const suffix = "/make-server-fe84bde0";
  const prefix = "/functions/v1" + suffix;
  if (path.startsWith(prefix)) return path.slice(prefix.length) || "/";
  if (path.startsWith(suffix)) return path.slice(suffix.length) || "/";
  return path || "/";
}

interface ReservationBody {
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

function generateReservationNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function validateReservationBody(body: unknown): { ok: true; data: ReservationBody } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Body must be a JSON object" };
  const b = body as Record<string, unknown>;
  const required: (keyof ReservationBody)[] = [
    "reservation_date_time", "menu_item_id", "location_id",
    "parent_name", "child_name", "phone", "email",
  ];
  for (const k of required) {
    if (b[k] == null || b[k] === "") return { ok: false, error: `Missing or empty: ${k}` };
  }
  const dateTime = String(b.reservation_date_time);
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(dateTime)) return { ok: false, error: "reservation_date_time must be ISO datetime (e.g. 2025-02-25T10:00)" };
  const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRe.test(String(b.menu_item_id))) return { ok: false, error: "menu_item_id must be a UUID" };
  if (!uuidRe.test(String(b.location_id))) return { ok: false, error: "location_id must be a UUID" };
  const email = String(b.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Invalid email" };
  const data: ReservationBody = {
    reservation_date_time: dateTime,
    menu_item_id: String(b.menu_item_id),
    location_id: String(b.location_id),
    parent_name: String(b.parent_name).trim(),
    child_name: String(b.child_name).trim(),
    phone: String(b.phone).trim(),
    email: email.trim(),
  };
  if (b.parent_name_kana != null) data.parent_name_kana = String(b.parent_name_kana);
  if (b.child_name_kana != null) data.child_name_kana = String(b.child_name_kana);
  if (b.child_age_years != null) data.child_age_years = Number(b.child_age_years);
  if (b.child_age_months != null) data.child_age_months = Number(b.child_age_months);
  if (b.notes_customer != null) data.notes_customer = String(b.notes_customer);
  if (b.postal_code != null) data.postal_code = String(b.postal_code);
  if (b.address_text != null) data.address_text = String(b.address_text);
  return { ok: true, data };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const pathname = getPathname(req.url);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey || anonKey);
  const authClient = createClient(supabaseUrl, anonKey);

  async function getUserFromRequest(): Promise<{ id: string } | null> {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;
    const token = authHeader.slice(7);
    const { data: { user }, error } = await authClient.auth.getUser(token);
    if (error || !user) return null;
    return { id: user.id };
  }

  try {
    // GET /public/health
    if (req.method === "GET" && (pathname === "/public/health" || pathname === "/health")) {
      return jsonResponse({ status: "ok", ts: new Date().toISOString() });
    }

    // POST /public/reservations — JWT required; customer identified by auth_user_id
    if (req.method === "POST" && pathname === "/public/reservations") {
      const user = await getUserFromRequest();
      if (!user) return jsonResponse({ error: "Unauthorized" }, 401);

      const raw = await req.json().catch(() => null);
      const validated = validateReservationBody(raw);
      if (!validated.ok) return errorResponse(validated.error, 400);
      const { data: body } = validated;

      const { data: menuRow } = await supabase
        .from("menu_items")
        .select("duration_minutes")
        .eq("id", body.menu_item_id)
        .single();
      const durationMinutes = (menuRow as Record<string, unknown>)?.duration_minutes ?? 60;

      const { data: existing } = await supabase
        .from("customers")
        .select("id, customer_code")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      let customerId: string;
      let customerCode: string;
      if (existing) {
        customerId = existing.id;
        customerCode = (existing as Record<string, unknown>).customer_code as string ?? "";
        const { error: updateErr } = await supabase
          .from("customers")
          .update({
            phone: body.phone,
            email: body.email,
            parent_name: body.parent_name,
            parent_name_kana: body.parent_name_kana ?? null,
            child_name: body.child_name,
            child_name_kana: body.child_name_kana ?? null,
            child_age_years: body.child_age_years ?? null,
            child_age_months: body.child_age_months ?? null,
            postal_code: body.postal_code ?? null,
            address_text: body.address_text ?? null,
            notes: body.notes_customer ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
        if (updateErr) return jsonResponse({ error: updateErr.message }, 500);
      } else {
        const { data: inserted, error: insertErr } = await supabase
          .from("customers")
          .insert({
            auth_user_id: user.id,
            phone: body.phone,
            email: body.email,
            parent_name: body.parent_name,
            parent_name_kana: body.parent_name_kana ?? null,
            child_name: body.child_name,
            child_name_kana: body.child_name_kana ?? null,
            child_age_years: body.child_age_years ?? null,
            child_age_months: body.child_age_months ?? null,
            postal_code: body.postal_code ?? null,
            address_text: body.address_text ?? null,
            notes: body.notes_customer ?? null,
          })
          .select("id, customer_code")
          .single();
        if (insertErr) return jsonResponse({ error: insertErr.message }, 500);
        customerId = inserted!.id;
        customerCode = (inserted as Record<string, unknown>).customer_code as string ?? "";
      }

      let reservationNumber = generateReservationNumber();
      for (let retry = 0; retry < 10; retry++) {
        const { data: conflict } = await supabase.from("reservations").select("id").eq("reservation_number", reservationNumber).limit(1).single();
        if (!conflict) break;
        reservationNumber = generateReservationNumber();
      }

      const { data: reservation, error: resErr } = await supabase
        .from("reservations")
        .insert({
          reservation_date_time: body.reservation_date_time,
          menu_item_id: body.menu_item_id,
          location_id: body.location_id,
          customer_id: customerId,
          status: "confirmed",
          notes_customer: body.notes_customer ?? null,
          reservation_number: reservationNumber,
          duration_minutes: durationMinutes,
        })
        .select("id, reservation_date_time, menu_item_id, location_id, status, reservation_number, duration_minutes")
        .single();

      if (resErr) return jsonResponse({ error: resErr.message }, 500);
      const res = reservation as Record<string, unknown>;
      const reservationOut = {
        reservation_id: res.id,
        reservation_number: res.reservation_number ?? reservationNumber,
        reservation_date_time: res.reservation_date_time,
        duration_minutes: res.duration_minutes ?? durationMinutes,
        location_id: res.location_id,
        menu_item_id: res.menu_item_id,
        status: res.status,
        customer_code: customerCode,
      };
      return jsonResponse({ reservation: reservationOut, customer_id: customerId, customer_code: customerCode }, 201);
    }

    return jsonResponse({ error: "Not found" }, 404);
  } catch (e) {
    return jsonResponse({ error: String(e) }, 500);
  }
});
