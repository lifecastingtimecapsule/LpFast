-- サンプル店舗・メニュー（予約フォームで表示するための初期データ）
-- 既にデータがある場合はスキップする

-- 店舗: 豊川店
INSERT INTO locations (id, active_flag, name, name_kana, postal_code, address_text, phone, sort_order)
VALUES (
  'a1000000-0000-0000-0000-000000000001'::uuid,
  true,
  '豊川店',
  'とよかわてん',
  '442-0066',
  '愛知県豊川市金屋町',
  '053-356-9494',
  1
)
ON CONFLICT (id) DO NOTHING;

-- 店舗: 浜松店
INSERT INTO locations (id, active_flag, name, name_kana, postal_code, address_text, phone, sort_order)
VALUES (
  'a1000000-0000-0000-0000-000000000002'::uuid,
  true,
  '浜松店',
  'はままつてん',
  '433-8122',
  '静岡県浜松市中央区上島6丁目2-30',
  '053-415-8775',
  2
)
ON CONFLICT (id) DO NOTHING;

-- メニュー
INSERT INTO menu_items (id, is_active, name, name_kana, description, price_cents, duration_minutes, sort_order)
VALUES
  (
    'b1000000-0000-0000-0000-000000000001'::uuid,
    true,
    '立体手形・足形コース',
    'りったいてがたあしがたこーす',
    '赤ちゃんの手形・足形を立体でお取りします。',
    55000,
    90,
    1
  ),
  (
    'b1000000-0000-0000-0000-000000000002'::uuid,
    true,
    '立体手形のみ',
    'りったいてがたのみ',
    '手形のみのプランです。',
    33000,
    60,
    2
  )
ON CONFLICT (id) DO NOTHING;

-- 店舗×メニュー（両店舗で両メニュー提供）
INSERT INTO location_menus (location_id, menu_item_id, enabled)
VALUES
  ('a1000000-0000-0000-0000-000000000001'::uuid, 'b1000000-0000-0000-0000-000000000001'::uuid, true),
  ('a1000000-0000-0000-0000-000000000001'::uuid, 'b1000000-0000-0000-0000-000000000002'::uuid, true),
  ('a1000000-0000-0000-0000-000000000002'::uuid, 'b1000000-0000-0000-0000-000000000001'::uuid, true),
  ('a1000000-0000-0000-0000-000000000002'::uuid, 'b1000000-0000-0000-0000-000000000002'::uuid, true)
ON CONFLICT (location_id, menu_item_id) DO NOTHING;

-- 営業時間（豊川店・浜松店: 10:00-18:00 の例）
INSERT INTO location_availability (location_id, mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close)
VALUES
  ('a1000000-0000-0000-0000-000000000001'::uuid, '10:00'::time, '18:00'::time, '10:00'::time, '18:00'::time, '10:00'::time, '18:00'::time, '10:00'::time, '18:00'::time, '10:00'::time, '18:00'::time, '10:00'::time, '18:00'::time, '10:00'::time, '18:00'::time),
  ('a1000000-0000-0000-0000-000000000002'::uuid, '10:00'::time, '18:00'::time, '10:00'::time, '18:00'::time, '10:00'::time, '18:00'::time, '10:00'::time, '18:00'::time, '10:00'::time, '18:00'::time, '10:00'::time, '18:00'::time, '10:00'::time, '18:00'::time)
ON CONFLICT (location_id) DO UPDATE SET
  mon_open = EXCLUDED.mon_open, mon_close = EXCLUDED.mon_close,
  tue_open = EXCLUDED.tue_open, tue_close = EXCLUDED.tue_close,
  wed_open = EXCLUDED.wed_open, wed_close = EXCLUDED.wed_close,
  thu_open = EXCLUDED.thu_open, thu_close = EXCLUDED.thu_close,
  fri_open = EXCLUDED.fri_open, fri_close = EXCLUDED.fri_close,
  sat_open = EXCLUDED.sat_open, sat_close = EXCLUDED.sat_close,
  sun_open = EXCLUDED.sun_open, sun_close = EXCLUDED.sun_close;
