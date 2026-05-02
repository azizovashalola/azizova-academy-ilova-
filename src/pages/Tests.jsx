import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { testsData } from '../data/testsData'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function Tests() {
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuth()
  
  const [activeTest, setActiveTest] = useState(null)
  const [pastAttempts, setPastAttempts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestsData() {
      if (!user) return
      setLoading(true)
      try {
        // 1. Aktiv testni tortamiz (Eng so'nggi yaratilgan aktiv mock test)
        const { data: tests, error: testErr } = await supabase
          .from('tests')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
        
        if (tests && tests.length > 0) {
          setActiveTest(tests[0])
        }

        // 2. Foydalanuvchining avvalgi test urinishlarini tortamiz
        const { data: attempts, error: attErr } = await supabase
          .from('test_attempts')
          .select('*, tests(title)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5)
        
        if (attempts) {
          setPastAttempts(attempts)
        }
      } catch (err) {
        console.error("Testlarni yuklashda xatolik:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTestsData()
  }, [user])

  const formatTime = (isoString) => {
    const d = new Date(isoString);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
  }

  return (
    <div className="px-6 max-w-lg mx-auto pb-24">
      {/* Section Header */}
      <section className="mb-8">
        <h1 className="font-display text-4xl font-semibold text-primary mb-2">Testlar</h1>
        <p className="text-sm text-on-surface-variant italic">Bilimingizni sinab ko'ring va natijalarni yaxshilang.</p>
      </section>

      {/* Category Grid */}
      <section className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-[0_4px_20px_rgba(75,0,130,0.05)] border border-outline-variant/30 hover:border-primary-container transition-all flex flex-col items-start gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined">category</span>
          </div>
          <span className="font-display font-medium text-[15px] leading-tight text-primary">Mavzulashtirilgan testlar</span>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-[0_4px_20px_rgba(75,0,130,0.05)] border border-outline-variant/30 hover:border-primary-container transition-all flex flex-col items-start gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined">layers</span>
          </div>
          <span className="font-display font-medium text-[15px] leading-tight text-primary">Blok testlar (Mock exam)</span>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Live Mock Exam Card */}
          <section className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <h2 className="font-display text-2xl font-semibold text-primary">Mock Imtihon</h2>
              <span className="text-[10px] font-bold tracking-widest text-secondary uppercase">Jonli</span>
            </div>
            
            {activeTest ? (
              <div className="relative overflow-hidden rounded-xl p-6 text-white shadow-xl bg-primary-container">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-secondary-container/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-secondary-fixed-dim uppercase mb-1">Maxsus test</p>
                      <h3 className="font-display text-xl font-medium">{activeTest.title}</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-lg px-2.5 py-1 flex items-center gap-1 border border-white/10">
                      <span className="material-symbols-outlined text-[18px]">timer</span>
                      <span className="text-[12px] font-bold">{activeTest.duration_minutes || 180} min</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">quiz</span>
                      <span className="text-sm font-medium">90 Savol</span>
                    </div>
                  </div>
                  <button onClick={() => setShowModal(true)} className="w-full py-3.5 rounded-xl font-bold text-sm text-primary uppercase tracking-widest gold-gradient hover:opacity-90 transition-opacity shadow-lg">
                    Testni boshlash
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-dashed border-outline-variant/50 text-center">
                <span className="material-symbols-outlined text-outline text-4xl mb-2">hourglass_empty</span>
                <p className="text-on-surface-variant text-sm">Hozircha faol mock imtihonlar yo'q</p>
              </div>
            )}
          </section>

          {/* Past Tests */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-2xl font-semibold text-primary">O'tgan testlar</h2>
              <button className="text-secondary-fixed-dim font-bold text-[11px] tracking-widest uppercase">Hammasi</button>
            </div>
            
            {pastAttempts.length > 0 ? (
              <div className="space-y-3">
                {pastAttempts.map(attempt => (
                  <Link key={attempt.id} to="/test-analysis" className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center ${attempt.score >= 80 ? 'text-green-500' : 'text-primary'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {attempt.score >= 80 ? 'task_alt' : 'assignment'}
                        </span>
                      </div>
                      <div>
                        <p className="font-display font-medium text-sm text-primary dark:text-blue-400">{attempt.tests?.title || 'Umumiy test'}</p>
                        <p className="text-[10px] text-outline font-medium">{formatTime(attempt.created_at)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${attempt.score >= 80 ? 'text-green-500' : 'text-primary'}`}>{attempt.score}%</p>
                      <p className={`text-[9px] font-bold ${attempt.score >= 80 ? 'text-green-500' : 'text-primary'} uppercase tracking-widest`}>
                        {attempt.status === 'finished' ? 'Yakunlangan' : 'Chala'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 bg-surface-container-lowest rounded-xl">
                <p className="text-sm text-outline">Hali test topshirmagansiz</p>
              </div>
            )}
          </section>
        </>
      )}

      {/* Confirmation Modal */}
      {showModal && activeTest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="font-display text-xl text-primary dark:text-blue-400 font-bold mb-2">Testni boshlash</h3>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 mb-6">Siz haqiqatan ham <b>{activeTest.title}</b> ni boshlamoqchimisiz? Boshlangandan so'ng vaqtni to'xtatib bo'lmaydi.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-outline dark:text-slate-400 bg-surface-container hover:bg-surface-container-highest dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-colors">
                Bekor qilish
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-white bg-primary hover:bg-primary-fixed-dim rounded-xl transition-colors">
                Boshlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
