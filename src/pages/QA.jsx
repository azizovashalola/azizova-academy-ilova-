import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function QA() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('Barchasi')
  const tabs = ['Barchasi', 'Mening savollarim']
  
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newQuestionText, setNewQuestionText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchQuestions = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('user_questions')
        .select(`
          *,
          users ( name, avatar ),
          teacher_answers ( * )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setQuestions(data || [])
    } catch (err) {
      setError("Savollarni yuklashda xatolik yuz berdi: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newQuestionText.trim() || !user) return

    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('user_questions')
        .insert([
          { 
            user_id: user.id, 
            text_content: newQuestionText,
            status: 'javob_kutilmoqda'
          }
        ])

      if (error) throw error
      
      setNewQuestionText('')
      await fetchQuestions() // Ro'yxatni yangilash
    } catch (err) {
      alert("Savol yuborishda xatolik: " + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredQuestions = activeTab === 'Barchasi' 
    ? questions 
    : questions.filter(q => q.user_id === user?.id)

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="px-4 max-w-4xl mx-auto space-y-6 pb-32">
      <section className="flex flex-col gap-4">
        <h2 className="font-headline-md text-headline-md text-primary">Savol-javob</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-label-caps text-label-caps whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'bg-primary text-on-primary' 
                  : 'bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-xl border-l-4 border-red-500">
          <p className="text-red-700 dark:text-red-400">{error}</p>
          <button onClick={fetchQuestions} className="mt-2 text-sm text-red-600 underline">Qayta urinib ko'rish</button>
        </div>
      )}

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-primary">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p>Ma'lumotlar yuklanmoqda...</p>
        </div>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-title-sm text-title-sm text-on-background">{activeTab}</h3>
            <span className="font-label-caps text-label-caps text-primary cursor-pointer hover:underline">Hammasini ko'rish</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuestions.length > 0 ? filteredQuestions.map(q => (
              <div key={q.id} className="bg-surface-container-lowest dark:bg-slate-800 p-5 rounded-xl shadow-[0_4px_12px_rgba(31,56,100,0.05)] border border-outline-variant dark:border-slate-700 hover:border-primary transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                      {q.users?.avatar ? (
                        <img alt="Foydalanuvchi" className="w-full h-full object-cover" src={q.users.avatar} />
                      ) : (
                        q.users?.name?.charAt(0) || 'U'
                      )}
                    </div>
                    <div>
                      <p className="font-title-sm text-sm text-on-surface dark:text-white">{q.users?.name || 'Foydalanuvchi'}</p>
                      <p className="font-body-sm text-xs text-outline">{formatTime(q.created_at)}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    q.status === 'javob_berilgan' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {q.status === 'javob_berilgan' ? 'Javob berilgan' : 'Kutilmoqda'}
                  </span>
                </div>
                <p className="font-body-md text-on-surface dark:text-slate-300 mb-4">{q.text_content}</p>
                
                {/* O'qituvchi javobi bo'lsa ko'rsatamiz */}
                {q.teacher_answers && q.teacher_answers.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-outline-variant dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold">Sh</div>
                      <span className="text-xs font-bold text-secondary">{q.teacher_answers[0].display_name}</span>
                    </div>
                    
                    {q.teacher_answers[0].answer_type === 'text' && (
                       <div className="bg-primary-container/10 p-3 rounded-lg border-l-4 border-primary">
                          <p className="text-sm font-medium text-primary dark:text-blue-400">{q.teacher_answers[0].text_content}</p>
                       </div>
                    )}
                    
                    {q.teacher_answers[0].answer_type === 'video' && (
                      <div className="relative rounded-lg overflow-hidden mb-4 aspect-video bg-slate-900 flex items-center justify-center">
                        <img alt="Video javob" className="absolute inset-0 w-full h-full object-cover opacity-60" src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600" />
                        <div className="z-10 flex flex-col items-center">
                          <span className="material-symbols-outlined text-white text-5xl cursor-pointer hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                          <span className="text-white font-label-caps text-xs mt-2 bg-black/40 px-2 py-1 rounded">Ustoz javobi</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-6 text-outline mt-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">thumb_up</span>
                    <span className="text-xs font-medium">{q.likes_count}</span>
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">visibility</span>
                    <span className="text-xs font-medium">{q.views_count}</span>
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">chat_bubble</span>
                    <span className="text-xs font-medium">{q.teacher_answers?.length || 0}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-2 py-12 text-center text-outline bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">inbox</span>
                <p>Ushbu bo'limda hozircha savollar yo'q</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Floating Input (Mobile & Desktop) */}
      <div className="fixed bottom-20 left-0 w-full px-4 z-40 md:static md:mt-8 md:px-0">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="glass-card md:bg-white md:dark:bg-slate-800 p-3 rounded-full flex items-center shadow-lg border border-primary/20 bg-white/90">
            <input 
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-body-sm px-4 py-2 outline-none dark:text-white" 
              placeholder="Ustozga savol yo'llash..." 
              type="text" 
              disabled={isSubmitting || !user}
            />
            <button 
              type="submit"
              disabled={isSubmitting || !user || !newQuestionText.trim()}
              className="bg-primary text-on-primary p-2 md:px-6 md:py-2 md:rounded-full rounded-full flex items-center justify-center disabled:opacity-50 transition-all hover:bg-primary/90"
            >
              <span className="material-symbols-outlined text-xl md:hidden">send</span>
              <span className="hidden md:block font-bold">Yuborish</span>
            </button>
          </div>
          {!user && (
            <p className="text-xs text-center text-red-500 mt-2 bg-white/80 rounded inline-block px-2">Savol berish uchun tizimga kiring</p>
          )}
        </form>
      </div>
    </div>
  )
}
