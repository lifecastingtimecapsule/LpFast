-- RLS: 認証ユーザーが自分の顧客レコード・自分の予約のみ読めるようにする（クライアント直アクセス用）

-- customers: 全件読めるポリシーを削除し、認証ユーザーは自分の顧客のみ読めるようにする
DROP POLICY IF EXISTS "Public read customers" ON public.customers;
CREATE POLICY "Users read own customer"
  ON public.customers FOR SELECT
  USING (auth.uid() = auth_user_id);

-- reservations: 認証ユーザーが自分の予約を読めるポリシーを追加（anon の「非キャンセル枠」用は既存のまま）
CREATE POLICY "Users read own reservations"
  ON public.reservations FOR SELECT
  USING (
    customer_id IN (
      SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
    )
  );
