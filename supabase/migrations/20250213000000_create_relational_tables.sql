-- Public reservation: locations, menu_items, location_menus, reservation_settings,
-- location_availability, customers, reservations

-- Customer code sequence for A-xxxx format
CREATE SEQUENCE IF NOT EXISTS customer_code_seq START 1;

-- locations: 店舗
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  active_flag BOOLEAN NOT NULL DEFAULT true,
  name TEXT NOT NULL,
  name_kana TEXT,
  postal_code TEXT,
  address_text TEXT,
  phone TEXT,
  email TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- menu_items: メニュー
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  name TEXT NOT NULL,
  name_kana TEXT,
  description TEXT,
  price_cents INT,
  duration_minutes INT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- location_menus: 店舗×メニュー
CREATE TABLE IF NOT EXISTS location_menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(location_id, menu_item_id)
);

CREATE INDEX IF NOT EXISTS idx_location_menus_location ON location_menus(location_id);
CREATE INDEX IF NOT EXISTS idx_location_menus_menu ON location_menus(menu_item_id);

-- reservation_settings: 予約全体設定（1レコード default）
CREATE TABLE IF NOT EXISTS reservation_settings (
  reservation_settings_id TEXT PRIMARY KEY DEFAULT 'default',
  slot_interval_minutes INT NOT NULL DEFAULT 30,
  advance_booking_days INT NOT NULL DEFAULT 60,
  same_day_cutoff_minutes INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure columns exist when table was created by an earlier run with different schema
ALTER TABLE reservation_settings ADD COLUMN IF NOT EXISTS slot_interval_minutes INT NOT NULL DEFAULT 30;
ALTER TABLE reservation_settings ADD COLUMN IF NOT EXISTS advance_booking_days INT NOT NULL DEFAULT 60;
ALTER TABLE reservation_settings ADD COLUMN IF NOT EXISTS same_day_cutoff_minutes INT DEFAULT 0;

INSERT INTO reservation_settings (reservation_settings_id, slot_interval_minutes, advance_booking_days)
VALUES ('default', 30, 60)
ON CONFLICT (reservation_settings_id) DO NOTHING;

-- location_availability: 店舗別営業（曜日別 start/end time as TIME or text）
-- Simple schema: mon_open, mon_close, ... sun_open, sun_close; closed_dates as JSONB array of dates
CREATE TABLE IF NOT EXISTS location_availability (
  location_id UUID PRIMARY KEY REFERENCES locations(id) ON DELETE CASCADE,
  mon_open TIME,
  mon_close TIME,
  tue_open TIME,
  tue_close TIME,
  wed_open TIME,
  wed_close TIME,
  thu_open TIME,
  thu_close TIME,
  fri_open TIME,
  fri_close TIME,
  sat_open TIME,
  sat_close TIME,
  sun_open TIME,
  sun_close TIME,
  closed_dates JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- customers: 予約者（電話番号で検索→あれば更新、なければ新規）
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_code TEXT UNIQUE,
  phone TEXT NOT NULL,
  email TEXT,
  parent_name TEXT,
  parent_name_kana TEXT,
  child_name TEXT,
  child_name_kana TEXT,
  child_age_years INT,
  child_age_months INT,
  postal_code TEXT,
  address_text TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);

-- Generate A-xxxx customer_code
CREATE OR REPLACE FUNCTION generate_customer_code()
RETURNS TEXT AS $$
  SELECT 'A-' || LPAD(nextval('customer_code_seq')::TEXT, 4, '0');
$$ LANGUAGE SQL;

-- Auto-set customer_code on insert if null
CREATE OR REPLACE FUNCTION set_customer_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.customer_code IS NULL OR NEW.customer_code = '' THEN
    NEW.customer_code := generate_customer_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_customer_code ON customers;
CREATE TRIGGER trigger_set_customer_code
  BEFORE INSERT ON customers
  FOR EACH ROW EXECUTE PROCEDURE set_customer_code();

-- reservations: 予約
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_date_time TIMESTAMPTZ NOT NULL,
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE RESTRICT,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed', 'no_show')),
  notes_customer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reservations_datetime ON reservations(reservation_date_time);
CREATE INDEX IF NOT EXISTS idx_reservations_location ON reservations(location_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);

-- RLS: allow service role / anon for Edge Function access (optional: enable RLS and policy per table)
-- For public read/write from Edge Function using service role key, RLS can be disabled or permissive.
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Allow anon and authenticated to read public data (Edge Function may use service_role; if using anon, need read policy)
CREATE POLICY "Public read locations" ON locations FOR SELECT USING (active_flag = true);
CREATE POLICY "Public read menu_items" ON menu_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public read location_menus" ON location_menus FOR SELECT USING (true);
CREATE POLICY "Public read reservation_settings" ON reservation_settings FOR SELECT USING (true);
CREATE POLICY "Public read location_availability" ON location_availability FOR SELECT USING (true);

-- reservations: anon can read non-cancelled for booked-slots; insert via Edge Function (service role)
CREATE POLICY "Public read reservations for slots" ON reservations FOR SELECT USING (status != 'cancelled');

-- customers: Edge Function will use service role for upsert; or add policy for anon insert/update if needed
CREATE POLICY "Public read customers" ON customers FOR SELECT USING (true);

-- Allow insert/update only via service role (no anon policy for write). Edge Function uses service_role key for INSERT/UPDATE.
-- If your Edge Function runs with anon key, add policies like:
-- CREATE POLICY "Public insert reservations" ON reservations FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Public insert customers" ON customers FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Public update customers" ON customers FOR UPDATE USING (true);
