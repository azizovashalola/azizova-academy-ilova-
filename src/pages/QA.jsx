import { useState } from 'react'

const allQuestions = [
  {
    id: 1,
    name: 'Azizbek R.',
    time: '15 daqiqa avval',
    category: 'Fuqarolik',
    text: 'Meros huquqi bo\'yicha vasiyatnoma bo\'lmagan taqdirda, mol-mulk birinchi navbatda kimlar o\'rtasida taqsimlanadi?',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    type: 'video',
    likes: 124,
    views: '2.1k',
    comments: 12
  },
  {
    id: 2,
    name: 'Madina S.',
    time: '1 soat avval',
    category: 'Ma\'muriy',
    text: 'Ma\'muriy jarimalar ustidan shikoyat qilish muddati va tartibi haqida ma\'lumot bersangiz.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    type: 'audio',
    likes: 89,
    views: '1.5k',
    comments: 8
  },
  {
    id: 3,
    name: 'Jasur M.',
    time: '3 soat avval',
    category: 'Jinoyat',
    text: 'Firibgarlik va o\'g\'irlik o\'rtasidagi huquqiy farqlarni batafsil tushuntirib bera olasizmi?',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150',
    type: 'text',
    likes: 45,
    views: '900',
    comments: 4
  }
]

export default function QA() {
  const [activeTab, setActiveTab] = useState('Barchasi')
  const tabs = ['Barchasi', 'Fuqarolik', 'Jinoyat', 'Konstitutsiyaviy', 'Ma\'muriy']

  const filteredQuestions = activeTab === 'Barchasi' 
    ? allQuestions 
    : allQuestions.filter(q => q.category === activeTab)

  return (
    <div className="px-4 max-w-4xl mx-auto space-y-6">
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
              {tab} {tab !== 'Barchasi' && 'huquqi'}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-title-sm text-title-sm text-on-background">Top savollar</h3>
          <span className="font-label-caps text-label-caps text-primary cursor-pointer hover:underline">Hammasini ko'rish</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuestions.length > 0 ? filteredQuestions.map(q => (
            <div key={q.id} className="bg-surface-container-lowest dark:bg-slate-800 p-5 rounded-xl shadow-[0_4px_12px_rgba(31,56,100,0.05)] border border-outline-variant dark:border-slate-700 hover:border-primary transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                    <img alt="Foydalanuvchi" className="w-full h-full object-cover" src={q.avatar} />
                  </div>
                  <div>
                    <p className="font-title-sm text-sm text-on-surface dark:text-white">{q.name}</p>
                    <p className="font-body-sm text-xs text-outline">{q.time}</p>
                  </div>
                </div>
                <span className="bg-secondary-container dark:bg-secondary-fixed-dim text-on-secondary-container dark:text-slate-900 px-2 py-1 rounded text-[10px] font-bold uppercase">{q.category}</span>
              </div>
              <p className="font-body-md text-on-surface dark:text-slate-300 mb-4 line-clamp-3">{q.text}</p>
              
              {q.type === 'video' && (
                <div className="relative rounded-lg overflow-hidden mb-4 aspect-video bg-slate-900 flex items-center justify-center">
                  <img alt="Video javob" className="absolute inset-0 w-full h-full object-cover opacity-60" src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600" />
                  <div className="z-10 flex flex-col items-center">
                    <span className="material-symbols-outlined text-white text-5xl cursor-pointer hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                    <span className="text-white font-label-caps text-xs mt-2 bg-black/40 px-2 py-1 rounded">Ustoz javobi: 2:45</span>
                  </div>
                </div>
              )}

              {q.type === 'audio' && (
                <div className="bg-surface-container dark:bg-slate-700 p-4 rounded-lg flex items-center gap-4 mb-4 border-l-4 border-secondary">
                  <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
                  <div className="flex-1">
                    <div className="h-1 bg-outline-variant dark:bg-slate-600 rounded-full w-full relative">
                      <div className="absolute inset-y-0 left-0 w-1/3 bg-secondary rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-outline dark:text-slate-400">0:45</span>
                      <span className="text-[10px] text-outline dark:text-slate-400">1:30</span>
                    </div>
                  </div>
                </div>
              )}

              {q.type === 'text' && (
                 <div className="bg-primary-container/10 p-4 rounded-lg mb-4 border-l-4 border-primary">
                    <p className="text-sm font-medium text-primary dark:text-blue-400 line-clamp-2">"Assalomu alaykum! Firibgarlik asosan ishonchni suiiste'mol qilish orqali bo'ladi, o'g'irlik esa yashirincha mol-mulkni talon-toroj qilishdir..."</p>
                 </div>
              )}

              <div className="flex items-center gap-6 text-outline">
                <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">thumb_up</span>
                  <span className="text-xs font-medium">{q.likes}</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">visibility</span>
                  <span className="text-xs font-medium">{q.views}</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">chat_bubble</span>
                  <span className="text-xs font-medium">{q.comments}</span>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-2 py-12 text-center text-outline">
              <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
              <p>Ushbu bo'limda hozircha savollar yo'q</p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4 mb-24">
        <h3 className="font-title-sm text-title-sm text-on-background">Yangi savollar</h3>
        <div className="space-y-3">
          <div className="bg-white border border-slate-100 p-4 rounded-lg flex gap-4 items-center cursor-pointer hover:border-primary/50">
            <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary">article</span>
            </div>
            <div className="flex-1">
              <h4 className="font-body-md font-semibold text-on-surface leading-tight">Mehnat shartnomasini bekor qilish...</h4>
              <p className="text-xs text-outline">Javob kutilmoqda • 5 daqiqa avval</p>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-lg flex gap-4 items-center cursor-pointer hover:border-primary/50">
            <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-secondary">account_balance</span>
            </div>
            <div className="flex-1">
              <h4 className="font-body-md font-semibold text-on-surface leading-tight">Yuridik shaxsni ro'yxatdan o'tkazish...</h4>
              <p className="text-xs text-outline">Javob kutilmoqda • 22 daqiqa avval</p>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </div>
        </div>
      </section>

      {/* Floating Action Button & Input */}
      <div className="fixed bottom-20 right-6 z-40 hidden md:block">
        <button className="bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>add_comment</span>
        </button>
      </div>

      <div className="fixed bottom-20 left-0 w-full px-4 z-40 md:hidden pb-safe">
        <div className="glass-card p-3 rounded-full flex items-center shadow-lg border border-primary/10 bg-white/90">
          <input className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-body-sm px-4 py-2 outline-none" placeholder="Ustozga savol yo'llash..." type="text" />
          <button className="bg-primary text-on-primary p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">send</span>
          </button>
        </div>
      </div>
    </div>
  )
}
