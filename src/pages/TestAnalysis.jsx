import { useNavigate } from 'react-router-dom'

export default function TestAnalysis() {
  const navigate = useNavigate()

  return (
    <div className="max-w-md mx-auto px-container_margin pt-stack_md space-y-stack_lg">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)} className="active:opacity-70 transition-opacity p-2 hover:bg-purple-50 rounded-full">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="font-semibold text-lg tracking-tight text-primary">Test Natijalari</h1>
      </div>

      {/* Score & Chart Section */}
      <section className="bg-white p-stack_lg rounded-xl shadow-[0_8px_30px_rgb(75,0,130,0.04)] border border-purple-50 flex flex-col items-center">
        <div className="relative flex items-center justify-center mb-stack_md">
          <svg className="w-40 h-40">
            <circle className="text-purple-50" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
            <circle className="text-primary progress-ring__circle" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="79.2" strokeLinecap="round" strokeWidth="12"></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-primary">82%</span>
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">82/100 BALL</span>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-primary">Ajoyib natija!</h2>
          <p className="text-sm text-on-surface-variant mt-1">Siz yuridik qabul uchun yuqori ko'rsatkich qayd etdingiz.</p>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-gutter">
        <div className="bg-white p-stack_md rounded-xl shadow-sm border border-purple-50">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 tracking-wider">Sarflangan vaqt</p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">timer</span>
            <span className="font-bold text-primary">24m 15s</span>
          </div>
        </div>
        <div className="bg-white p-stack_md rounded-xl shadow-sm border border-green-50">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 tracking-wider">To'g'ri javob</p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-success text-sm">check_circle</span>
            <span className="font-bold text-success">25ta</span>
          </div>
        </div>
        <div className="bg-white p-stack_md rounded-xl shadow-sm border border-red-50">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 tracking-wider">Xato javob</p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-sm">cancel</span>
            <span className="font-bold text-error">4ta</span>
          </div>
        </div>
        <div className="bg-white p-stack_md rounded-xl shadow-sm border border-slate-50">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 tracking-wider">Qoldirilgan</p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400 text-sm">fast_forward</span>
            <span className="font-bold text-slate-600">1ta</span>
          </div>
        </div>
      </div>

      {/* Subject Breakdown */}
      <section className="space-y-stack_md">
        <h3 className="font-bold text-primary px-1">Qonunlar yuzasidan testlar tahlili</h3>
        <div className="space-y-gutter">
          <div className="bg-white p-stack_md rounded-xl border border-purple-50 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-primary">Advokatura</span>
              <span className="text-xs font-bold text-primary">90%</span>
            </div>
            <div className="w-full bg-purple-50 h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
          <div className="bg-white p-stack_md rounded-xl border border-purple-50 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-primary">Davlat Bayrog'i</span>
              <span className="text-xs font-bold text-secondary">75%</span>
            </div>
            <div className="w-full bg-purple-50 h-2.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="bg-white p-stack_md rounded-xl border border-purple-50 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-primary">Konstitutsiya</span>
              <span className="text-xs font-bold text-primary">80%</span>
            </div>
            <div className="w-full bg-purple-50 h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full opacity-70" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Question Analysis */}
      <section className="space-y-stack_md">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-primary">Savollar tahlili</h3>
          <span className="text-xs font-medium text-on-surface-variant">30 ta savol</span>
        </div>
        <div className="space-y-stack_md">
          {/* Question Card: Correct */}
          <div className="bg-white rounded-xl overflow-hidden border border-purple-50 shadow-sm">
            <div className="p-stack_md border-b border-purple-50 bg-green-50/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-success mt-1">check_circle</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-success uppercase tracking-wider">1-SAVOL • TO'G'RI</span>
                </div>
                <p className="text-sm text-primary font-semibold leading-snug">O'zbekiston Respublikasining Konstitutsiyasi qachon qabul qilingan?</p>
              </div>
            </div>
            <div className="p-stack_md bg-white">
              <details className="group">
                <summary className="list-none flex items-center justify-between cursor-pointer text-primary font-bold text-xs uppercase tracking-wide">
                  <span>Batafsil izoh</span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-sm">expand_more</span>
                </summary>
                <div className="pt-stack_md text-sm text-on-surface-variant leading-relaxed">
                  O'zbekiston Respublikasi Konstitutsiyasi 1992-yil 8-dekabrda XII chaqiriq O'zbekiston Respublikasi Oliy Kengashining o'n birinchi sessiyasida qabul qilingan.
                </div>
              </details>
            </div>
          </div>

          {/* Question Card: Incorrect */}
          <div className="bg-white rounded-xl overflow-hidden border border-purple-50 shadow-sm">
            <div className="p-stack_md border-b border-purple-50 bg-red-50/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-error mt-1">cancel</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-error uppercase tracking-wider">2-SAVOL • NOTO'G'RI</span>
                </div>
                <p className="text-sm text-primary font-semibold leading-snug">Ma'muriy javobgarlik to'g'risidagi kodeksning asosiy maqsadi nima?</p>
              </div>
            </div>
            <div className="p-stack_md space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-red-100 bg-red-50/30">
                <span className="material-symbols-outlined text-error text-sm">close</span>
                <div>
                  <p className="text-[9px] font-bold text-error uppercase tracking-widest">Sizning javobingiz</p>
                  <p className="text-sm text-on-surface">Faqat jazolash choralari</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-green-100 bg-green-50/30">
                <span className="material-symbols-outlined text-success text-sm">done</span>
                <div>
                  <p className="text-[9px] font-bold text-success uppercase tracking-widest">To'g'ri javob</p>
                  <p className="text-sm text-on-surface">Huquqbuzarliklar profilaktikasi va qonun ustuvorligini ta'minlash</p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs text-on-surface-variant italic leading-relaxed">
                  <strong className="text-primary not-italic">Izoh:</strong> Kodeks nafaqat jazo, balki fuqarolarning huquqlari va qonuniy manfaatlarini himoya qilishni maqsad qiladi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="grid grid-cols-2 gap-gutter pt-stack_md pb-4">
        <button className="bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-200 active:scale-95 transition-all text-sm">
          Qayta topshirish
        </button>
        <button className="border-2 border-primary text-primary py-4 rounded-xl font-bold active:scale-95 transition-all text-sm bg-white">
          Xatolarni ko'rish
        </button>
      </section>
    </div>
  )
}
