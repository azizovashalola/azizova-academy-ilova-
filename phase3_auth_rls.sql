-- ==============================================================================
-- 3-QATLAM: AVTORIZATSIYA VA ROW LEVEL SECURITY (RLS) SOZLAMALARI
-- ==============================================================================

-- 1. Avtomatik profil yaratish triggeri
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, name, phone, role, is_active)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'name', 'Foydalanuvchi'), 
    new.phone, 
    'talaba',
    true
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Agar avval yasalgan bo'lsa o'chiramiz
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ==============================================================================
-- 2. BARCHA JADVALLAR UCHUN ROW LEVEL SECURITY (RLS) QOIDALARI
-- ==============================================================================

-- Barcha jadvallarda RLS yoqish
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_video_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pdf_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laws ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.today_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.motivational_quotes ENABLE ROW LEVEL SECURITY;

-- yordamchi funksiya: userni rolini tekshirish
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$;

-- ------------------------------------------------------------------------------
-- QOIDALAR (POLICIES)
-- ------------------------------------------------------------------------------

-- 1. USERS
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id OR public.get_user_role() IN ('admin', 'yordamchi'));
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- 2. SCHEDULES
CREATE POLICY "Users can view own schedules" ON public.schedules FOR SELECT USING (auth.uid() = user_id OR public.get_user_role() = 'admin');
CREATE POLICY "Users can manage own schedules" ON public.schedules FOR ALL USING (auth.uid() = user_id);

-- 3. MONTHLY_COURSES (Hamma talabalar kurslarni ko'ra oladi)
CREATE POLICY "Anyone can view active courses" ON public.monthly_courses FOR SELECT USING (is_active = true OR public.get_user_role() = 'admin');

-- 4. USER_SUBSCRIPTIONS
CREATE POLICY "Users view own subscriptions" ON public.user_subscriptions FOR SELECT USING (auth.uid() = user_id OR public.get_user_role() = 'admin');

-- 5. VIDEO_LESSONS (Obunasi bo'lgan yoki hamma ko'radi, qulfni frontend hal qiladi)
CREATE POLICY "Anyone can view video metadata" ON public.video_lessons FOR SELECT USING (true);

-- 6. USER_VIDEO_PROGRESS
CREATE POLICY "Users view and manage own video progress" ON public.user_video_progress FOR ALL USING (auth.uid() = user_id);

-- 7-11. AUDIO, PDF, LAWS, TESTS, TEST_QUESTIONS (Hamma ko'ra oladi)
CREATE POLICY "Anyone can view learning materials" ON public.audio_lessons FOR SELECT USING (true);
CREATE POLICY "Anyone can view learning materials" ON public.pdf_guides FOR SELECT USING (true);
CREATE POLICY "Anyone can view learning materials" ON public.laws FOR SELECT USING (true);
CREATE POLICY "Anyone can view active tests" ON public.tests FOR SELECT USING (is_active = true OR public.get_user_role() = 'admin');
CREATE POLICY "Anyone can view test questions" ON public.test_questions FOR SELECT USING (true);

-- 12. TEST_ATTEMPTS
CREATE POLICY "Users manage own test attempts" ON public.test_attempts FOR ALL USING (auth.uid() = user_id);

-- 13. TEST_ANSWERS
CREATE POLICY "Users view own answers, admin sees all" ON public.test_answers FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.test_attempts ta WHERE ta.id = attempt_id AND ta.user_id = auth.uid()) OR public.get_user_role() = 'admin'
);
CREATE POLICY "Users insert own answers" ON public.test_answers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.test_attempts ta WHERE ta.id = attempt_id AND ta.user_id = auth.uid())
);

-- 14. USER_QUESTIONS (QA)
CREATE POLICY "Anyone can view active questions" ON public.user_questions FOR SELECT USING (status != 'o''chirilgan' OR public.get_user_role() = 'admin');
CREATE POLICY "Users can ask questions" ON public.user_questions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can edit own questions" ON public.user_questions FOR UPDATE USING (auth.uid() = user_id);

-- 15. TEACHER_ANSWERS
CREATE POLICY "Anyone can view teacher answers" ON public.teacher_answers FOR SELECT USING (true);
CREATE POLICY "Teachers and Admins can answer" ON public.teacher_answers FOR ALL USING (public.get_user_role() IN ('admin', 'yordamchi'));

-- 16. COMMENTS
CREATE POLICY "Anyone can view comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Users can add comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 17. LIKES
CREATE POLICY "Anyone can view likes" ON public.likes FOR SELECT USING (true);
CREATE POLICY "Users can manage own likes" ON public.likes FOR ALL USING (auth.uid() = user_id);

-- 18-19. NEWS & NEWS_READS
CREATE POLICY "Anyone can view active news" ON public.news FOR SELECT USING (is_active = true OR public.get_user_role() = 'admin');
CREATE POLICY "Users manage own reads" ON public.news_reads FOR ALL USING (auth.uid() = user_id);

-- 20. TODAY_TASKS
CREATE POLICY "Users manage own tasks" ON public.today_tasks FOR ALL USING (auth.uid() = user_id);

-- 21-22. BADGES & USER_BADGES
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Users view own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id OR public.get_user_role() = 'admin');

-- 23. PAYMENTS
CREATE POLICY "Users view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id OR public.get_user_role() = 'admin');
CREATE POLICY "Users insert own payments" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 24. NOTIFICATIONS
CREATE POLICY "Users manage own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- 25. DOWNLOADS
CREATE POLICY "Users manage own downloads" ON public.downloads FOR ALL USING (auth.uid() = user_id);

-- 26. MOTIVATIONAL QUOTES
CREATE POLICY "Anyone can view active quotes" ON public.motivational_quotes FOR SELECT USING (is_active = true OR public.get_user_role() = 'admin');

-- ==============================================================================
-- ADMIN HUQUQLARI (ADMIN CAN DO ANYTHING)
-- ==============================================================================
CREATE POLICY "Admin All Access" ON public.users FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.schedules FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.monthly_courses FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.user_subscriptions FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.video_lessons FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.user_video_progress FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.audio_lessons FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.pdf_guides FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.laws FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.tests FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.test_questions FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.test_attempts FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.test_answers FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.user_questions FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.teacher_answers FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.comments FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.likes FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.news FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.news_reads FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.today_tasks FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.badges FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.user_badges FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.payments FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.notifications FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.downloads FOR ALL USING (public.get_user_role() = 'admin');
CREATE POLICY "Admin All Access" ON public.motivational_quotes FOR ALL USING (public.get_user_role() = 'admin');
