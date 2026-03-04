-- 記事トップ用画像URLカラム追加（写真は本文中ではなく記事一番上に表示）
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image_url TEXT;

-- ストレージ: Supabase Dashboard → Storage → New bucket で
-- バケット名 "blog-images", Public をオンにし、
-- Policies で 認証ユーザーが INSERT/UPDATE/DELETE、全員が SELECT になるように設定してください。
