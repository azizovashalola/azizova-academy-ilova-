import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function TestAnalysis() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLastAttempt() {
      if (!user) return
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('test_attempts')
          .select('*, tests(title)')
          .eq('user_id', user.id)
          .eq('status', 'finished')
          .order('created_at', { ascending: false })
          .limit(1)
          .single()
        
        if (data) setAttempt(data)
      } catch (err) {
        console.error("Test tahlilini yuklashda xatolik:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchLastAttempt()
  }, [user])

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p>Tahlil yuklanmoqda...</p>
      </div>
    )
  }

  if (!attempt) {
    return (
      <div className="max-w-md mx-auto px-4 py-10 text-center">
        <button onClick={() => navigate(-1)} className="mb-6 p-2 bg-purple-50 rounded-full">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <span className="material-symbols-outlined text-6xl text-outline mb-4">analytics</span>
        <h2 className="text-xl font-bold text-primary mb-2">Tahlil topilmadi</h2>
        <p className="text-on-surface-variant">Siz hali hech qanday testni to'liq yakunlamagansiz.</p>
      </div>
    )
  }

  const score = attempt.score || 0
  const isExcellent = score >= 80

  return (
    <div className="max-w-md mx-auto px-container_margin pt-stack_md space-y-stack_lg pb-24">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="active:opacity-70 transition-opacity p-2 hover:bg-purple-50 rounded-full">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="font-semibold text-lg tracking-tight text-primary">Test Natijalari</h1>
      </div>

      <div className="text-center mb-2">
        <p className="text-xs font-bold text-outline uppercase tracking-widest">{attempt.tests?.title}</p>
      </div>

      {/* Score & Chart Section */}
      <section className="bg-white p-stack_lg rounded-xl shadow-[0_8px_30px_rgb(75,0,130,0.04)] border border-purple-50 flex flex-col items-center">
        <div className="relative flex items-center justify-center mb-stack_md">
          <svg className="w-40 h-40">
            <circle className="text-purple-50" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
            <circle className={`${isExcellent ? 'text-green-500' : 'text-primary'} progress-ring__circle`} cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset={440 - (440 * score) / 100} strokeLinecap="round" strokeWidth="12" style={{ transition: 'stroke-dashoffset 1s ease-out' }}></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${isExcellent ? 'text-green-500' : 'text-primary'}`}>{score}%</span>
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">{score}/100 BALL</span>
          </div>
        </div>
        <div className="text-center">
          <h2 className={`text-xl font-bold ${isExcellent ? 'text-green-500' : 'text-primary'}`}>
            {isExcellent ? 'Ajoyib natija!' : 'Yaxshi, lekin yanada harakat qiling.'}
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">Siz {score >= 90 ? "A'lochi nishonini qo'lga kiritdingiz!" : "Qonunchilikni yana takrorlashni maslahat beramiz."}</p>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-gutter">
        <div className="bg-white p-stack_md rounded-xl shadow-sm border border-purple-50">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 tracking-wider">Sarflangan vaqt</p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">timer</span>
            <span className="font-bold text-primary">Noma'lum</span>
          </div>
        </div>
        <div className="bg-white p-stack_md rounded-xl shadow-sm border border-green-50">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 tracking-wider">To'g'ri javob</p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-success text-sm">check_circle</span>
            <span className="font-bold text-success">--</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <section className="grid grid-cols-2 gap-gutter pt-stack_md pb-4">
        <button onClick={() => navigate('/tests')} className="bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-200 active:scale-95 transition-all text-sm">
          Boshqa testlar
        </button>
        <button className="border-2 border-primary text-primary py-4 rounded-xl font-bold active:scale-95 transition-all text-sm bg-white opacity-50 cursor-not-allowed">
          Xatolarni ko'rish
        </button>
      </section>
    </div>
  )
}
