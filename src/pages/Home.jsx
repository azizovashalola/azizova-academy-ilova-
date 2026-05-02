import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="pt-8 px-6 max-w-container-max mx-auto space-y-lg">
      {/* Hero Section */}
      <section className="space-y-1">
        <h1 className="font-h1 text-3xl md:text-5xl text-primary dark:text-blue-400 leading-tight">
          Siz bilan Yuridik Oliygohlarni zabt etamiz
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-300 italic">
          Salom, {user?.name.split(' ')[0]}! Tayyorgarlikni davom ettiramizmi?
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
            <span className="font-label-caps text-on-surface-variant block mb-2">IMTIHONGA QOLDI</span>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-secondary-fixed-dim tracking-tighter">{user?.daysLeft}</span>
              <span className="text-xl font-h3 text-primary uppercase tracking-widest">kun</span>
            </div>
          </div>
          <div className="mt-8 space-y-2">
            <div className="flex justify-between items-end">
              <span className="font-label-caps text-primary text-[10px]">TAYYORGARLIK {user?.progress}%</span>
              <span className="font-label-caps text-secondary text-[10px]">MAQSAD: 100%</span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full gold-gradient rounded-full relative" style={{ width: `${user?.progress}%` }}>
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
              <circle className="text-secondary-fixed" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * user?.probability) / 100} strokeWidth="8"></circle>
            </svg>
            <span className="absolute text-3xl font-black text-secondary-fixed">{user?.probability}%</span>
          </div>
          <p className="text-[11px] font-label-caps leading-relaxed px-4">Barcha mavzular o'zlashtirilish darajasi asosida hisoblandi</p>
        </div>
      </div>

      {/* Law Analysis Bento */}
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
                <span>90%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full">
                <div className="h-full bg-secondary-fixed rounded-full w-[90%]"></div>
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
                <span>75%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full">
                <div className="h-full bg-secondary-fixed rounded-full w-[75%]"></div>
              </div>
            </div>
          </div>
          {/* Law Item 3 */}
          <div className="bg-white p-md rounded-xl shadow-[0px_4px_20px_rgba(75,0,130,0.05)] border border-transparent hover:border-secondary-fixed transition-all">
            <div className="mb-4">
              <span className="material-symbols-outlined text-4xl text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
            </div>
            <h3 className="font-h3 text-[18px] text-primary mb-4 leading-snug h-12 overflow-hidden">Davlat Gerbi to'g'risida</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-outline">
                <span>PROGRES</span>
                <span>80%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full">
                <div className="h-full bg-secondary-fixed rounded-full w-[80%]"></div>
              </div>
            </div>
          </div>
          {/* Law Item 4 */}
          <div className="bg-white p-md rounded-xl shadow-[0px_4px_20px_rgba(75,0,130,0.05)] border border-transparent hover:border-secondary-fixed transition-all">
            <div className="mb-4">
              <span className="material-symbols-outlined text-4xl text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>music_note</span>
            </div>
            <h3 className="font-h3 text-[18px] text-primary mb-4 leading-snug h-12 overflow-hidden">Davlat Madhiyasi to'g'risida</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-outline">
                <span>PROGRES</span>
                <span>65%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full">
                <div className="h-full bg-secondary-fixed rounded-full w-[65%]"></div>
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
            <div className="min-w-[300px] md:min-w-[450px] bg-white rounded-xl overflow-hidden shadow-sm flex snap-start group/card border border-outline-variant/20">
              <div className="w-1/3 overflow-hidden">
                <img alt="News cover" className="h-full w-full object-cover group-hover/card:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600" />
              </div>
              <div className="w-2/3 p-lg flex flex-col justify-between">
                <div>
                  <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-1 rounded font-bold">DOLZARB</span>
                  <h4 className="font-h3 text-xl text-primary mt-2">TDYU Test Tizimidagi O'zgarishlar</h4>
                  <p className="text-sm text-outline mt-2 line-clamp-2">Yangi o'quv yili uchun qabul kvotalari va test savollaridagi yangiliklar bilan tanishing...</p>
                </div>
                <Link to="/news" className="mt-4 flex items-center gap-2 text-secondary-fixed-dim font-button tracking-widest hover:gap-3 transition-all">
                  BATAFFSIL <span className="material-symbols-outlined text-sm">trending_flat</span>
                </Link>
              </div>
            </div>
            <div className="min-w-[300px] md:min-w-[450px] bg-white rounded-xl overflow-hidden shadow-sm flex snap-start group/card border border-outline-variant/20">
              <div className="w-1/3 overflow-hidden">
                <img alt="News cover" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1505664173615-04f1e9443c72?auto=format&fit=crop&q=80&w=600" />
              </div>
              <div className="w-2/3 p-lg flex flex-col justify-between">
                <div>
                  <span className="bg-surface-container-highest text-on-surface-variant text-[10px] px-2 py-1 rounded font-bold">HUQUQIY</span>
                  <h4 className="font-h3 text-xl text-primary mt-2">Yangi Konstitutsiyaviy Islohotlar</h4>
                  <p className="text-sm text-outline mt-2 line-clamp-2">Talabalar uchun yangi tahrirdagi konstitutsiyaning sharhlangan to'plami nashr etildi.</p>
                </div>
                <Link to="/news" className="mt-4 flex items-center gap-2 text-secondary-fixed-dim font-button tracking-widest hover:gap-3 transition-all">
                  BATAFFSIL <span className="material-symbols-outlined text-sm">trending_flat</span>
                </Link>
              </div>
            </div>
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
