import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  
  const [dashboardData, setDashboardData] = useState({
    daysLeft: 0,
    progress: 0,
    probability: 0,
    news: []
  })

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) return
      setLoading(true)
      try {
        // 1. Obunani tekshirish (Days Left)
        let daysLeft = 0
        const { data: subData } = await supabase
          .from('user_subscriptions')
          .select('end_date')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .order('end_date', { ascending: false })
          .limit(1)
          .single()

        if (subData) {
          const end = new Date(subData.end_date)
          const today = new Date()
          daysLeft = Math.max(0, Math.floor((end - today) / (1000 * 60 * 60 * 24)))
        }

        // 2. Progressni hisoblash (Ko'rilgan videolar / Jami videolar)
        let progress = 0
        const { count: totalVideos } = await supabase
          .from('video_lessons')
          .select('*', { count: 'exact', head: true })
        
        const { count: completedVideos } = await supabase
          .from('user_video_progress')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('status', 'completed')

        if (totalVideos > 0 && completedVideos) {
          progress = Math.round((completedVideos / totalVideos) * 100)
        }

        // 3. Ehtimollik (O'rtacha test bali asosida)
        let probability = 0
        const { data: testAttempts } = await supabase
          .from('test_attempts')
          .select('score')
          .eq('user_id', user.id)
          .eq('status', 'finished')

        if (testAttempts && testAttempts.length > 0) {
          const totalScore = testAttempts.reduce((sum, t) => sum + (t.score || 0), 0)
          const avgScore = totalScore / testAttempts.length
          // Agar o'rtacha ball 80 bo'lsa, kirish ehtimoli taxminan 90% (formulani sozlash mumkin)
          probability = Math.min(99, Math.round(avgScore * 1.1)) 
        } else {
          probability = 15 // Test yechmagan bo'lsa boshlang'ich ehtimol
        }

        // 4. Yangiliklar
        const { data: newsData } = await supabase
          .from('news')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(2)

        setDashboardData({
          daysLeft,
          progress,
          probability,
          news: newsData || []
        })

      } catch (error) {
        console.error("Dashboard yuklashda xato:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user])

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p>Bosh sahifa yuklanmoqda...</p>
      </div>
    )
  }

  return (
    <div className="pt-8 px-6 max-w-container-max mx-auto space-y-lg pb-24">
      {/* Hero Section */}
      <section className="space-y-1">
        <h1 className="font-h1 text-3xl md:text-5xl text-primary dark:text-blue-400 leading-tight">
          Siz bilan Yuridik Oliygohlarni zabt etamiz
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-300 italic">
          Salom, {user?.name?.split(' ')[0]}! Tayyorgarlikni davom ettiramizmi?
        </p>
      </section>

      {/* Top Grid: Countdown & Probability */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {/* Countdown Card */}
        <Link to="/learning" className="md:col-span-2 bg-white rounded-xl p-lg shadow-[0px_4px_20px_rgba(75,0,130,0.05)] border border-[#D1CED9]/30 flex flex-col justify-between relative overflow-hidden group hover:border-secondary-fixed transition-colors">
          <div className="absolute -right-4 -top-4 opacity-5">
            <span className="material-symbols-outlined text-[120px]">calendar_today</span>
          </div>
          <div className="relative z-10">
            <span className="font-label-caps text-on-surface-variant block mb-2">OBUNA TUGASHIGA QOLDI</span>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-secondary-fixed-dim tracking-tighter">{dashboardData.daysLeft}</span>
              <span className="text-xl font-h3 text-primary uppercase tracking-widest">kun</span>
            </div>
          </div>
          <div className="mt-8 space-y-2">
            <div className="flex justify-between items-end">
              <span className="font-label-caps text-primary text-[10px]">TAYYORGARLIK {dashboardData.progress}%</span>
              <span className="font-label-caps text-secondary text-[10px]">MAQSAD: 100%</span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full gold-gradient rounded-full relative transition-all duration-1000" style={{ width: `${dashboardData.progress}%` }}>
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </Link>

        {/* Probability Card */}
        <div className="bg-primary rounded-xl p-lg shadow-[0px_4px_20px_rgba(75,0,130,0.05)] text-white flex flex-col items-center justify-center text-center space-y-4">
          <span className="font-label-caps text-on-primary-container opacity-80">EHTIMOLIY NATIJA</span>
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle className="text-primary-container" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
              <circle className="text-secondary-fixed" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * dashboardData.probability) / 100} strokeWidth="8" style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}></circle>
            </svg>
            <span className="absolute text-3xl font-black text-secondary-fixed">{dashboardData.probability}%</span>
          </div>
          <p className="text-[11px] font-label-caps leading-relaxed px-4">Yechilgan testlar o'rtacha bali asosida hisoblandi</p>
        </div>
      </div>

      {/* Law Analysis Bento (Static Visual placeholders for future expansion) */}
      <section className="space-y-lg">
        <div className="flex justify-between items-center">
          <h2 className="font-h2 text-h2 text-primary">Qonunlar tahlili</h2>
          <Link to="/test-analysis" className="font-label-caps text-secondary-fixed-dim hover:underline flex items-center gap-1">
            BARCHASI <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
          {/* Law Item 1 */}
          <div className="bg-white p-md rounded-xl shadow-[0px_4px_20px_rgba(75,0,130,0.05)] border border-transparent hover:border-secondary-fixed transition-all group">
            <div className="mb-4">
              <span className="material-symbols-outlined text-4xl text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
            </div>
            <h3 className="font-h3 text-[18px] text-primary mb-4 leading-snug h-12 overflow-hidden">Advokatura to'g'risida</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-outline">
                <span>PROGRES</span>
                <span>{Math.min(100, dashboardData.progress + 15)}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full">
                <div className="h-full bg-secondary-fixed rounded-full transition-all" style={{ width: `${Math.min(100, dashboardData.progress + 15)}%` }}></div>
              </div>
            </div>
          </div>
          {/* Law Item 2 */}
          <div className="bg-white p-md rounded-xl shadow-[0px_4px_20px_rgba(75,0,130,0.05)] border border-transparent hover:border-secondary-fixed transition-all">
            <div className="mb-4">
              <span className="material-symbols-outlined text-4xl text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
            </div>
            <h3 className="font-h3 text-[18px] text-primary mb-4 leading-snug h-12 overflow-hidden">Davlat Bayrog'i to'g'risida</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-outline">
                <span>PROGRES</span>
                <span>{dashboardData.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full">
                <div className="h-full bg-secondary-fixed rounded-full transition-all" style={{ width: `${dashboardData.progress}%` }}></div>
              </div>
            </div>
          </div>
          {/* Law Item 3 */}
          <div className="bg-white p-md rounded-xl shadow-[0px_4px_20px_rgba(75,0,130,0.05)] border border-transparent hover:border-secondary-fixed transition-all">
            <div className="mb-4">
              <span className="material-symbols-outlined text-4xl text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
            </div>
            <h3 className="font-h3 text-[18px] text-primary mb-4 leading-snug h-12 overflow-hidden">Konstitutsiya asoslari</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-outline">
                <span>PROGRES</span>
                <span>{Math.max(0, dashboardData.progress - 10)}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full">
                <div className="h-full bg-secondary-fixed rounded-full transition-all" style={{ width: `${Math.max(0, dashboardData.progress - 10)}%` }}></div>
              </div>
            </div>
          </div>
          {/* Law Item 4 */}
          <div className="bg-white p-md rounded-xl shadow-[0px_4px_20px_rgba(75,0,130,0.05)] border border-transparent hover:border-secondary-fixed transition-all">
            <div className="mb-4">
              <span className="material-symbols-outlined text-4xl text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
            </div>
            <h3 className="font-h3 text-[18px] text-primary mb-4 leading-snug h-12 overflow-hidden">Jinoyat kodeksi</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-outline">
                <span>PROGRES</span>
                <span>0%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full">
                <div className="h-full bg-secondary-fixed rounded-full w-[0%]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="space-y-lg">
        <div className="flex items-baseline gap-4">
          <h2 className="font-h2 text-h2 text-primary">YANGILIKLAR</h2>
          <span className="text-outline font-body-md text-sm">So'ngi yangiliklar</span>
        </div>
        <div className="relative overflow-hidden group">
          <div className="flex overflow-x-auto gap-lg pb-4 scrollbar-hide snap-x hide-scrollbar">
            {dashboardData.news.length > 0 ? dashboardData.news.map((item, idx) => (
              <div key={item.id} className="min-w-[300px] md:min-w-[450px] bg-white rounded-xl overflow-hidden shadow-sm flex snap-start group/card border border-outline-variant/20">
                <div className="w-1/3 overflow-hidden bg-slate-100 flex items-center justify-center">
                  {item.image_url ? (
                    <img alt="News cover" className="h-full w-full object-cover group-hover/card:scale-110 transition-transform duration-500" src={item.image_url} />
                  ) : (
                    <span className="material-symbols-outlined text-4xl text-outline">article</span>
                  )}
                </div>
                <div className="w-2/3 p-lg flex flex-col justify-between">
                  <div>
                    <span className={`${idx === 0 ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-highest text-on-surface-variant'} text-[10px] px-2 py-1 rounded font-bold`}>
                      {idx === 0 ? 'DOLZARB' : 'HUQUQIY'}
                    </span>
                    <h4 className="font-h3 text-xl text-primary mt-2">{item.title}</h4>
                    <p className="text-sm text-outline mt-2 line-clamp-2">{item.content}</p>
                  </div>
                  <Link to="/news" className="mt-4 flex items-center gap-2 text-secondary-fixed-dim font-button tracking-widest hover:gap-3 transition-all">
                    BATAFFSIL <span className="material-symbols-outlined text-sm">trending_flat</span>
                  </Link>
                </div>
              </div>
            )) : (
               <div className="bg-surface-container-lowest p-6 rounded-xl border border-dashed border-outline-variant w-full text-center">
                 <p className="text-on-surface-variant">Yangiliklar yo'q</p>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="space-y-lg pb-8">
        <h2 className="font-h2 text-h2 text-primary">Tezkor havolalar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <Link to="/test-analysis" className="flex items-center gap-4 bg-[#FAF9FD] p-lg rounded-xl border border-secondary-fixed/20 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-3xl text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>book_2</span>
            </div>
            <div>
              <span className="font-h3 text-xl text-primary block">Mening natijalarim</span>
              <span className="text-xs text-outline font-label-caps">TESTLAR VA TOPSHIRIQLAR</span>
            </div>
          </Link>
          <Link to="/courses" className="flex items-center gap-4 bg-[#FAF9FD] p-lg rounded-xl border border-secondary-fixed/20 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-3xl text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
            </div>
            <div>
              <span className="font-h3 text-xl text-primary block">Qonunlar to'plami</span>
              <span className="text-xs text-outline font-label-caps">TO'LIQ BAZA</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
