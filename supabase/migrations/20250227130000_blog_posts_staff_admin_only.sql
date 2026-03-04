-- ブログの投稿・更新を staff / admin のみに制限
DROP POLICY IF EXISTS "Authenticated insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated update blog posts" ON public.blog_posts;

CREATE POLICY "Staff and admin can insert blog posts"
  ON public.blog_posts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Staff and admin can update blog posts"
  ON public.blog_posts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
    )
  );
