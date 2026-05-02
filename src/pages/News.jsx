import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(10)
        
        if (data) setNews(data)
      } catch (err) {
        console.error("Yangiliklarni yuklashda xatolik:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p>Yangiliklar yuklanmoqda...</p>
      </div>
    )
  }

  const featuredNews = news.length > 0 ? news[0] : null
  const otherNews = news.length > 1 ? news.slice(1) : []

  const formatDate = (isoString) => {
    if (!isoString) return ''
    const d = new Date(isoString)
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 pb-24">
      {/* Hero Section & Filters */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex-1">
            <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase">Qonunchilik yangiliklari</span>
            <h2 className="font-display-lg text-display-lg text-primary">Huquqiy sohadagi so'nggi o'zgarishlar</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">O'zbekiston Respublikasi qonunchiligidagi eng muhim o'zgarishlarni talaba va abituriyentlar uchun sodda tilda tushuntiramiz.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary focus:border-primary outline-none font-body-sm transition-all" placeholder="Qidiruv..." type="text" />
            </div>
            <button className="flex items-center justify-center gap-2 px-5 py-2 border border-primary text-primary font-title-sm text-title-sm rounded-xl hover:bg-primary-fixed transition-colors">
              <span className="material-symbols-outlined">calendar_today</span>
              Sana bo'yicha
            </button>
          </div>
        </div>
      </section>

      {news.length === 0 ? (
        <div className="text-center py-12 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant">
          <span className="material-symbols-outlined text-4xl text-outline mb-2">article</span>
          <p className="text-on-surface-variant">Hozircha yangiliklar yo'q</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8">
          {/* Featured Update Card */}
          {featuredNews && (
            <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm relative overflow-hidden group">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-secondary-container dark:bg-secondary-fixed text-on-secondary-container dark:text-slate-900 font-label-caps text-[10px] px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>grade</span>
                      DOLZARB
                    </span>
                    <span className="text-outline font-body-sm text-body-sm">{formatDate(featuredNews.created_at)}</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary dark:text-blue-400 mb-4 group-hover:text-primary-container transition-colors">{featuredNews.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 line-clamp-3 mb-6">{featuredNews.content}</p>
                  
                  {featuredNews.image_url && (
                    <div className="rounded-lg overflow-hidden mb-6 aspect-video">
                      <img src={featuredNews.image_url} alt="News" className="w-full h-full object-cover" />
                    </div>
                  )}
                  
                  <button className="text-primary font-title-sm flex items-center gap-2 hover:underline">
                    To'liq o'qish <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Secondary Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {otherNews.map(item => (
              <div key={item.id} className="bg-surface-container-lowest dark:bg-slate-800 rounded-xl p-5 border border-outline-variant dark:border-slate-700 shadow-sm hover:border-primary-container transition-colors cursor-pointer">
                <span className="text-xs text-outline mb-2 block">{formatDate(item.created_at)}</span>
                <h4 className="font-title-sm text-primary dark:text-blue-400 mb-2">{item.title}</h4>
                <p className="text-sm text-on-surface-variant dark:text-slate-300 line-clamp-2">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
