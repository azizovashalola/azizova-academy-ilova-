import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function Learning() {
  const { user } = useAuth()
  
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [recommendedVideo, setRecommendedVideo] = useState(null)
  const [progress, setProgress] = useState({ currentDays: 0, totalDays: 180, percentage: 0 })

  useEffect(() => {
    async function fetchLearningData() {
      if (!user) return
      setLoading(true)
      try {
        // 1. Bugungi vazifalarni yuklash
        const { data: todayTasks } = await supabase
          .from('today_tasks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5)
        
        if (todayTasks) setTasks(todayTasks)

        // 2. Tavsiya etilgan videoni yuklash
        const { data: videoData } = await supabase
          .from('video_lessons')
          .select('*')
          .eq('is_premium', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (videoData) setRecommendedVideo(videoData)

        // 3. Obuna asosida progress hisoblash
        const { data: subData } = await supabase
          .from('user_subscriptions')
          .select('start_date, end_date')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .order('end_date', { ascending: false })
          .limit(1)
          .single()

        if (subData) {
          const start = new Date(subData.start_date)
          const end = new Date(subData.end_date)
          const today = new Date()
          
          const totalDays = Math.max(1, Math.floor((end - start) / (1000 * 60 * 60 * 24)))
          const passedDays = Math.max(0, Math.floor((today - start) / (1000 * 60 * 60 * 24)))
          const percentage = Math.min(100, Math.max(0, (passedDays / totalDays) * 100))
          
          setProgress({ currentDays: passedDays, totalDays, percentage })
        }

      } catch (err) {
        console.error("Learning ma'lumotlarini yuklashda xato:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchLearningData()
  }, [user])

  const toggleTask = async (taskId, currentStatus) => {
    // Optimistik UI yangilash
    setTasks(tasks.map(t => t.id === taskId ? { ...t, is_completed: !currentStatus } : t))
    
    // Bazani yangilash
    await supabase
      .from('today_tasks')
      .update({ is_completed: !currentStatus })
      .eq('id', taskId)
  }

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p>O'quv jarayoni yuklanmoqda...</p>
      </div>
    )
  }

  return (
    <div className="px-6 max-w-7xl mx-auto w-full pb-24">
      <div className="mb-xxl">
        <h2 className="font-h2 text-h2 text-primary mb-sm">O'quv jarayoni</h2>
        <p className="font-body-md text-on-surface-variant">Xush kelibsiz, {user?.name?.split(' ')[0]}! Bugungi muvaffaqiyat sari qadamlaringizni kuzatib boring.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
        {/* Left Column: Progress and Recommendations */}
        <div className="lg:col-span-8 space-y-lg">
          {/* 1. Kurs davomiyligi Section */}
          <section className="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_20px_rgba(75,0,130,0.05)] border border-outline-variant">
            <div className="flex justify-between items-end mb-md">
              <div>
                <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-xs">KURS DAVOMIYLIGI</span>
                <h3 className="font-h3 text-h3 text-primary">O'quv rejasi rivoji</h3>
              </div>
              <div className="text-right">
                <span className="font-serif italic font-semibold text-lg text-primary-container">
                  {progress.currentDays} / {progress.totalDays} kun
                </span>
              </div>
            </div>
            <div className="relative w-full h-4 bg-surface-container rounded-full overflow-hidden mb-md">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary to-secondary-container rounded-full transition-all duration-1000" style={{ width: `${progress.percentage}%` }}>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px]"></div>
              </div>
            </div>
            <div className="flex items-start gap-md bg-purple-50 p-md rounded-lg">
              <span className="material-symbols-outlined text-primary-container">auto_awesome</span>
              <p className="font-body-md italic text-primary">"Intizom — bu xohlagan narsangiz va eng ko'p xohlagan narsangiz o'rtasidagi tanlovdir. Siz ajoyib ketyapsiz!"</p>
            </div>
          </section>

          {/* 2. Bugungi tavsiya etilgan dars Section */}
          {recommendedVideo && (
            <section className="group relative bg-primary-container rounded-xl overflow-hidden shadow-xl text-on-primary">
              <div className="absolute inset-0 opacity-20 overflow-hidden">
                <img className="w-full h-full object-cover" src={recommendedVideo.cover_image || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200"} alt="Background" />
              </div>
              <div className="relative p-lg md:p-xl z-10 flex flex-col md:flex-row md:items-center gap-lg">
                <div className="flex-grow">
                  <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container font-label-caps text-[10px] rounded-full mb-md">TAVSIYA ETILADI</span>
                  <h3 className="font-h1 text-h3 md:text-h2 mb-sm">{recommendedVideo.title_uz}</h3>
                  <p className="text-on-primary-container font-body-md mb-lg max-w-md line-clamp-2">{recommendedVideo.description_uz || "Qonun ustuvorligi asoslarini mukammal o'rganish bo'yicha maxsus dars."}</p>
                  <div className="flex items-center gap-md font-label-caps opacity-90">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {Math.floor(recommendedVideo.duration_sec / 60)} DAQIQA</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">menu_book</span> MAJBURIY MATN</span>
                  </div>
                </div>
                <button className="bg-secondary-container hover:scale-105 active:scale-95 transition-all text-on-secondary-container w-16 h-16 rounded-full flex items-center justify-center shadow-lg self-center md:self-auto">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </button>
              </div>
            </section>
          )}

          {/* 3. Haftalik dars jadvali Section (Static Placeholder) */}
          <section>
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-h3 text-h3 text-primary">Haftalik dars jadvali</h3>
              <button className="text-primary-container font-button text-button flex items-center gap-1">To'liq taqvim <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
            </div>
            <div className="flex gap-md overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[140px] p-md bg-white border-2 border-primary-container rounded-xl flex flex-col items-center text-center">
                <span className="font-label-caps text-primary opacity-60">BUGUN</span>
                <span className="font-h3 text-h3 text-primary my-1">12</span>
                <span className="font-body-md font-medium text-primary">Konstitutsiya</span>
              </div>
              <div className="min-w-[140px] p-md bg-surface-container-low border border-outline-variant rounded-xl flex flex-col items-center text-center opacity-80">
                <span className="font-label-caps text-on-surface-variant">ERTAGA</span>
                <span className="font-h3 text-h3 text-on-surface my-1">13</span>
                <span className="font-body-md text-on-surface-variant">Fuqarolik huquqi</span>
              </div>
              <div className="min-w-[140px] p-md bg-surface-container-low border border-outline-variant rounded-xl flex flex-col items-center text-center opacity-80">
                <span className="font-label-caps text-on-surface-variant">CHORSHANBA</span>
                <span className="font-h3 text-h3 text-on-surface my-1">14</span>
                <span className="font-body-md text-on-surface-variant">Jinoyat huquqi</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Goals and Quick Access */}
        <aside className="lg:col-span-4 space-y-lg">
          {/* 4. Bugungi maqsad Section */}
          <section className="bg-white p-lg rounded-xl shadow-[0px_4px_20px_rgba(75,0,130,0.05)] border border-outline-variant">
            <div className="flex items-center gap-2 mb-lg">
              <span className="material-symbols-outlined text-secondary">task_alt</span>
              <h3 className="font-h3 text-h3 text-primary text-xl">Bugungi maqsadlar</h3>
            </div>
            
            {tasks.length > 0 ? (
              <ul className="space-y-md">
                {tasks.map(task => (
                  <li 
                    key={task.id} 
                    onClick={() => toggleTask(task.id, task.is_completed)}
                    className={`flex items-center gap-md p-md rounded-lg transition-colors group cursor-pointer border ${
                      task.is_completed ? 'bg-surface-container-low border-outline-variant' : 'border-transparent hover:bg-surface-container-low hover:border-outline-variant'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                      task.is_completed ? 'bg-primary-container' : 'border-2 border-outline group-hover:border-primary-container'
                    }`}>
                      <span className={`material-symbols-outlined text-lg ${task.is_completed ? 'text-white' : 'text-primary-container hidden group-hover:block'}`}>check</span>
                    </div>
                    <span className={`font-body-md ${task.is_completed ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>
                      {task.task_title}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-outline italic">Bugun uchun vazifalar yo'q. Dam oling!</p>
            )}
          </section>

          {/* 5. Quick Access Links */}
          <section className="space-y-md">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">TEZKOR HAVOLALAR</h3>
            <Link to="/courses" className="flex items-center justify-between p-md bg-white border border-outline-variant rounded-xl hover:shadow-md hover:border-primary transition-all group">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <div>
                  <h4 className="font-body-md font-semibold text-primary">O'quv qo'llanmalar</h4>
                  <p className="text-[12px] text-on-surface-variant">PDF va Elektron kitoblar</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline">chevron_right</span>
            </Link>
            <Link to="/courses" className="flex items-center justify-between p-md bg-white border border-outline-variant rounded-xl hover:shadow-md hover:border-primary transition-all group">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">video_library</span>
                </div>
                <div>
                  <h4 className="font-body-md font-semibold text-primary">Video darslar</h4>
                  <p className="text-[12px] text-on-surface-variant">Arxiv va Jonli efirlar</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline">chevron_right</span>
            </Link>
          </section>

          {/* Creative Achievement Card */}
          <section className="p-lg bg-gradient-to-br from-[#735c00] to-[#ffe088] rounded-xl text-on-secondary-fixed shadow-lg relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <span className="material-symbols-outlined text-[100px]">military_tech</span>
            </div>
            <div className="relative z-10">
              <h4 className="font-h3 text-lg mb-xs">Hafta yutug'i</h4>
              <p className="font-body-md text-sm opacity-90 mb-md">Siz ketma-ket darslarni o'z vaqtida yakunlayapsiz!</p>
              <div className="flex items-center gap-2 font-button text-xs uppercase tracking-widest cursor-pointer hover:underline">
                <span className="material-symbols-outlined text-sm">stars</span>
                MUKOFOTNI KO'RISH
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
