-- Align with reservation API spec: add reservation_number, duration_minutes, and spec columns

-- reservations: 予約番号（5文字英数字）と所要時間
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS reservation_number TEXT UNIQUE;
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS duration_minutes INT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_reservations_reservation_number ON reservations(reservation_number) WHERE reservation_number IS NOT NULL;

-- reservation_settings: 仕様の項目
ALTER TABLE reservation_settings ADD COLUMN IF NOT EXISTS allowed_days INTEGER[] DEFAULT ARRAY[1,2,3,4,5,6];
ALTER TABLE reservation_settings ADD COLUMN IF NOT EXISTS business_hours_start TEXT DEFAULT '09:00';
ALTER TABLE reservation_settings ADD COLUMN IF NOT EXISTS business_hours_end TEXT DEFAULT '18:00';
ALTER TABLE reservation_settings ADD COLUMN IF NOT EXISTS advance_reservation_days INT DEFAULT 60;
ALTER TABLE reservation_settings ADD COLUMN IF NOT EXISTS max_reservation_days INT DEFAULT 60;
ALTER TABLE reservation_settings ADD COLUMN IF NOT EXISTS max_reservations_per_day INT DEFAULT 20;
ALTER TABLE reservation_settings ADD COLUMN IF NOT EXISTS concurrent_reservations INT DEFAULT 1;
ALTER TABLE reservation_settings ADD COLUMN IF NOT EXISTS closed_dates DATE[] DEFAULT '{}';
ALTER TABLE reservation_settings ADD COLUMN IF NOT EXISTS custom_hours JSONB DEFAULT '{}';

UPDATE reservation_settings SET advance_reservation_days = advance_booking_days WHERE reservation_settings_id = 'default' AND advance_reservation_days IS NULL AND advance_booking_days IS NOT NULL;

-- location_availability: 仕様の項目
ALTER TABLE location_availability ADD COLUMN IF NOT EXISTS regular_closed_days INTEGER[] DEFAULT '{}';
ALTER TABLE location_availability ADD COLUMN IF NOT EXISTS business_hours_start TEXT;
ALTER TABLE location_availability ADD COLUMN IF NOT EXISTS business_hours_end TEXT;
ALTER TABLE location_availability ADD COLUMN IF NOT EXISTS custom_hours JSONB DEFAULT '{}';
ALTER TABLE location_availability ADD COLUMN IF NOT EXISTS closed_dates DATE[] DEFAULT '{}';
ALTER TABLE location_availability ADD COLUMN IF NOT EXISTS special_dates JSONB DEFAULT '{}';
ALTER TABLE location_availability ADD COLUMN IF NOT EXISTS max_reservations_per_day INT;

-- customers: 社内用顧客番号（公開予約では更新しない）
ALTER TABLE customers ADD COLUMN IF NOT EXISTS external_customer_number TEXT;
