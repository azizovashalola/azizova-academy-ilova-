-- ==============================================================================
-- OXIRGI NATIJA: ILOVANI KO'RISH UCHUN TAYYOR MA'LUMOTLAR
-- Ushbu kodni Supabase SQL Editor'da ishga tushiring.
-- ==============================================================================

-- 1. Avval eski test ma'lumotlarini tozalaymiz (faqat courses, tests, news)
DELETE FROM public.news;
DELETE FROM public.test_attempts;
DELETE FROM public.tests;
DELETE FROM public.user_video_progress;
DELETE FROM public.today_tasks;
DELETE FROM public.video_lessons;
DELETE FROM public.monthly_courses;

-- 2. Kurslarni qoshamiz
INSERT INTO public.monthly_courses (id, title_uz, description_uz, price_uzs, duration_days, is_active)
VALUES 
(1, '1-Oy: Huquq asoslari', 'Davlat va huquq nazariyasi, Konstitutsiya asoslari', 450000, 30, true),
(2, '2-Oy: Fuqarolik huquqi', 'Shaxsiy va mulkiy munosabatlar, shartnomalar', 450000, 30, true)
ON CONFLICT (id) DO NOTHING;

-- 3. Video darslarni qoshamiz (cover_image bilan)
INSERT INTO public.video_lessons (id, course_id, title_uz, description_uz, video_url, duration_sec, is_premium, order_num)
VALUES 
(1, 1, 'Davlat va huquq nazariyasiga kirish', 'Davlatning kelib chiqishi va huquq tushunchasi', 'https://example.com/vid1', 2400, false, 1),
(2, 1, 'O''zbekiston Respublikasi Konstitutsiyasi', 'Asosiy qonunimizning yaratilishi va printsiplari', 'https://example.com/vid2', 3600, true, 2),
(3, 1, 'Davlat ramzlari (Bayroq, Gerb, Madhiya)', 'O''zbekiston davlat ramzlarining huquqiy maqomi', 'https://example.com/vid3', 1800, true, 3)
ON CONFLICT (id) DO UPDATE SET cover_image = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200';

-- 4. Testlarni qoshamiz
INSERT INTO public.tests (id, course_id, title, description, duration_minutes, is_active)
VALUES 
(1, 1, 'Haftalik Blok Test (BMBA)', 'Gumanitar fanlar va Huquq asoslaridan aralash test', 180, true),
(2, 1, 'Mavzulashtirilgan: Konstitutsiya', 'Faqat Konstitutsiya moddalari yuzasidan tezkor test', 45, true)
ON CONFLICT (id) DO NOTHING;

-- 5. Yangiliklarni qoshamiz
INSERT INTO public.news (id, title, content, image_url, is_active)
VALUES 
(1, 'TDYU Qabul Kvotalari 2026', 'Joriy yilda Toshkent Davlat Yuridik Universitetiga qabul kvotalari 15% ga oshirildi. Kirish ballari ham o''zgarishi kutilmoqda.', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600', true),
(2, 'Konstitutsiyaga kiritilgan yangi o''zgartirishlar', 'Oliy Majlis tomonidan qabul qilingan yangi tuzatishlar bo''yicha maxsus sharh e''lon qilindi.', 'https://images.unsplash.com/photo-1505664173615-04f1e9443c72?auto=format&fit=crop&q=80&w=600', true),
(3, 'Test tizimidagi yangiliklar', 'BMBA tomonidan yuridik yo''nalish uchun majburiy fanlar bloki tasdiqlandi.', NULL, true)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- DIQQAT: O'QUVCHI UCHUN STATISTIKA QO'SHISH
-- Quyidagi kod sizning accountingizga statistika qo'shadi.
-- Buning uchun bazadagi foydalanuvchilar orasidan birinchisini (o'zingizni) oladi.
-- ==============================================================================
DO $$
DECLARE
    first_user_id uuid;
BEGIN
    -- Birinchi foydalanuvchini topamiz
    SELECT id INTO first_user_id FROM public.users LIMIT 1;
    
    IF first_user_id IS NOT NULL THEN
        -- Obuna qo'shamiz (Days left ishlashi uchun)
        INSERT INTO public.user_subscriptions (user_id, course_id, start_date, end_date, is_active)
        VALUES (first_user_id, 1, now() - interval '10 days', now() + interval '20 days', true);
        
        -- Dars progressini qo'shamiz (Progress ishlashi uchun)
        INSERT INTO public.user_video_progress (user_id, video_id, status)
        VALUES 
        (first_user_id, 1, 'completed'),
        (first_user_id, 2, 'completed');
        
        -- Test natijasini qo'shamiz (Probability ishlashi uchun)
        INSERT INTO public.test_attempts (user_id, test_id, score, is_passed, status)
        VALUES (first_user_id, 1, 88, true, 'finished');
        
        -- Bugungi vazifalarni qo'shamiz (Learning ekranida chiqishi uchun)
        INSERT INTO public.today_tasks (user_id, task_type, task_title, is_completed)
        VALUES 
        (first_user_id, 'video', '1-mavzu videosini takrorlash', false),
        (first_user_id, 'test', 'Konstitutsiya yuzasidan 10 ta test ishlash', false),
        (first_user_id, 'reading', 'Qonun moddalarini yod olish', true);
    END IF;
END $$;
