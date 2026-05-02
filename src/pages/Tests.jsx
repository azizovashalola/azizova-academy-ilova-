import { Link } from 'react-router-dom'
import { useState } from 'react'
import { testsData } from '../data/testsData'

export default function Tests() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="px-6 max-w-lg mx-auto">
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

      {/* Live Mock Exam Card */}
      <section className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <h2 className="font-display text-2xl font-semibold text-primary">Mock Imtihon</h2>
          <span className="text-[10px] font-bold tracking-widest text-secondary uppercase">Jonli</span>
        </div>
        <div className="relative overflow-hidden rounded-xl p-6 text-white shadow-xl bg-primary-container">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-secondary-container/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-secondary-fixed-dim uppercase mb-1">Haftalik umumiy test</p>
                <h3 className="font-display text-xl font-medium">BMBA standarti asosida</h3>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-2.5 py-1 flex items-center gap-1 border border-white/10">
                <span className="material-symbols-outlined text-[18px]">timer</span>
                <span className="text-[12px] font-bold">180 min</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">quiz</span>
                <span className="text-sm font-medium">90 Savol</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">group</span>
                <span className="text-sm font-medium">1.2k Ishtirokchi</span>
              </div>
            </div>
            <button onClick={() => setShowModal(true)} className="w-full py-3.5 rounded-xl font-bold text-sm text-primary uppercase tracking-widest gold-gradient hover:opacity-90 transition-opacity shadow-lg">
              Testni boshlash
            </button>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="font-display text-xl text-primary dark:text-blue-400 font-bold mb-2">Testni boshlash</h3>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 mb-6">Siz haqiqatan ham 180 daqiqalik mock imtihonini boshlamoqchimisiz? Boshlangandan so'ng vaqtni to'xtatib bo'lmaydi.</p>
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

      {/* Analytics */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-semibold text-primary mb-4">Analitika</h2>
        <div className="bg-white border border-outline-variant/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <span className="material-symbols-outlined text-error">trending_down</span>
            <span className="text-sm font-semibold text-on-surface">Yaxshilash kerak bo'lgan yo'nalishlar</span>
          </div>
          <div className="space-y-5">
            {testsData.analytics.map(item => (
              <div key={item.id}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-medium text-primary dark:text-blue-300">{item.topic}</span>
                  <span className="text-xs font-bold text-error">{item.score}%</span>
                </div>
                <div className="w-full bg-surface-container dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-error h-full" style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/test-analysis" className="mt-6 w-full py-2.5 text-primary-container font-bold text-[11px] tracking-widest border border-primary-container/20 rounded-lg hover:bg-primary-container/5 uppercase transition-colors block text-center">
            To'liq hisobotni ko'rish
          </Link>
        </div>
      </section>

      {/* Past Tests */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-2xl font-semibold text-primary">O'tgan testlar</h2>
          <button className="text-secondary-fixed-dim font-bold text-[11px] tracking-widest uppercase">Hammasi</button>
        </div>
        <div className="space-y-3">
          {testsData.pastTests.map(test => (
            <Link key={test.id} to="/test-analysis" className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${test.bgClass} flex items-center justify-center ${test.statusColor}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{test.icon}</span>
                </div>
                <div>
                  <p className="font-display font-medium text-sm text-primary dark:text-blue-400">{test.title}</p>
                  <p className="text-[10px] text-outline font-medium">{test.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-[10px] font-bold ${test.statusColor} uppercase tracking-widest`}>{test.status}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
