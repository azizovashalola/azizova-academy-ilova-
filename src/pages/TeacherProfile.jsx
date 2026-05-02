export default function TeacherProfile() {
  return (
    <>
      {/* Hero Section / Teacher Header */}
      <section className="relative bg-primary-container text-white px-container_margin pt-stack_lg pb-12 overflow-hidden -mt-16 pt-24">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-stack_lg">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-secondary-container shadow-xl overflow-hidden bg-surface-container">
            <img alt="Dr. Alisher Qodirov" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="font-display-lg text-display-lg text-white mb-stack_sm">Dr. Alisher Qodirov</h1>
            <p className="font-title-sm text-on-primary-container mb-stack_md">Yuridik fanlari nomzodi, 10 yillik tajriba</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-stack_sm">
              <span className="bg-secondary-container text-on-secondary-container font-label-caps text-label-caps px-3 py-1 rounded-full uppercase">TDYU Eksperti</span>
              <span className="bg-surface-container-low text-primary font-label-caps text-label-caps px-3 py-1 rounded-full uppercase">Advokat</span>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <button className="w-full bg-secondary hover:bg-secondary-fixed-dim text-on-secondary-fixed font-title-sm px-8 py-4 rounded-xl shadow-lg transition-all active:scale-95">
              Obuna bo'lish
            </button>
          </div>
        </div>
      </section>

      {/* Success Stats - Bento Grid Pattern */}
      <section className="px-container_margin -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack_md">
          <div className="bg-white p-stack_md rounded-xl shadow-md border border-outline-variant/20 flex flex-col items-center text-center">
            <span className="font-display-lg text-primary">2000+</span>
            <span className="font-label-caps text-outline text-label-caps">Talaba TDYUga kirdi</span>
          </div>
          <div className="bg-white p-stack_md rounded-xl shadow-md border border-outline-variant/20 flex flex-col items-center text-center">
            <span className="font-display-lg text-secondary">92%</span>
            <span className="font-label-caps text-outline text-label-caps">Muvaffaqiyat</span>
          </div>
          <div className="bg-white p-stack_md rounded-xl shadow-md border border-outline-variant/20 flex flex-col items-center text-center">
            <span className="font-display-lg text-primary">150+</span>
            <span className="font-label-caps text-outline text-label-caps">Video darslar</span>
          </div>
          <div className="bg-white p-stack_md rounded-xl shadow-md border border-outline-variant/20 flex flex-col items-center text-center">
            <span className="font-display-lg text-secondary">4.9/5</span>
            <span className="font-label-caps text-outline text-label-caps">Reyting</span>
          </div>
        </div>
      </section>

      {/* Content Library Tabs */}
      <section className="mt-section_gap px-container_margin">
        <div className="flex items-center justify-between mb-stack_md">
          <h2 className="font-headline-md text-headline-md text-primary">Kutubxona</h2>
          <div className="flex gap-stack_sm bg-surface-container p-1 rounded-full">
            <button className="px-4 py-1.5 rounded-full bg-white shadow-sm font-label-caps text-label-caps text-primary">Barchasi</button>
            <button className="px-4 py-1.5 rounded-full font-label-caps text-label-caps text-outline hover:text-primary transition-colors">Video</button>
            <button className="px-4 py-1.5 rounded-full font-label-caps text-label-caps text-outline hover:text-primary transition-colors">Audio</button>
          </div>
        </div>

        {/* Content Grid (Asymmetric) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack_md">
          {/* Large Video Card */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-xl bg-surface-container aspect-video shadow-sm cursor-pointer">
            <img alt="Legal course" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-stack_lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Bepul</span>
                <span className="text-white/80 font-label-caps text-label-caps">45 daqiqa</span>
              </div>
              <h3 className="font-title-sm text-white text-title-sm mb-2">Konstitutsiyaviy huquq: Asosiy tushunchalar</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-stack_sm">
                  <span className="material-symbols-outlined text-white text-sm">visibility</span>
                  <span className="text-white/80 text-xs">12.4k ko'rilgan</span>
                </div>
                <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </button>
              </div>
            </div>
          </div>

          {/* Vertical Cards Column */}
          <div className="flex flex-col gap-stack_md">
            <div className="bg-white p-stack_md rounded-xl border border-outline-variant/20 shadow-sm flex items-start gap-stack_md hover:border-primary/30 transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">audio_file</span>
              </div>
              <div>
                <h4 className="font-title-sm text-body-md text-primary line-clamp-1">Jinoyat kodeksi: O'zgarishlar 2024</h4>
                <p className="text-xs text-outline mb-2">Audio dars • 12 min</p>
                <button className="text-secondary font-label-caps text-label-caps flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">download</span> Yuklab olish
                </button>
              </div>
            </div>
            <div className="bg-white p-stack_md rounded-xl border border-outline-variant/20 shadow-sm flex items-start gap-stack_md hover:border-primary/30 transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">quiz</span>
              </div>
              <div>
                <h4 className="font-title-sm text-body-md text-primary line-clamp-1">Mantiqiy testlar to'plami</h4>
                <p className="text-xs text-outline mb-2">Test • 30 savol</p>
                <button className="text-secondary font-label-caps text-label-caps flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span> Boshlash
                </button>
              </div>
            </div>
            <div className="bg-white p-stack_md rounded-xl border border-outline-variant/20 shadow-sm flex items-start gap-stack_md hover:border-primary/30 transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">video_library</span>
              </div>
              <div>
                <h4 className="font-title-sm text-body-md text-primary line-clamp-1">Intervyu sirlari: TDYU imtihoni</h4>
                <p className="text-xs text-outline mb-2">Video • 18 min</p>
                <button className="text-secondary font-label-caps text-label-caps flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">play_circle</span> Ko'rish
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="mt-section_gap px-container_margin pb-8">
        <h2 className="font-headline-md text-headline-md text-primary mb-stack_md">Talabalar fikri</h2>
        <div className="flex overflow-x-auto gap-stack_md pb-4 hide-scrollbar">
          {/* Testimonial 1 */}
          <div className="min-w-[300px] bg-white p-stack_lg rounded-2xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-stack_sm mb-stack_md">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold">SM</div>
              <div>
                <p className="font-title-sm text-body-sm text-primary">Sardor Mirzayev</p>
                <p className="text-[10px] text-outline">TDYU 1-kurs talabasi</p>
              </div>
              <div className="ml-auto flex">
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <p className="text-body-sm text-on-surface-variant italic">"Dr. Alisher Qodirovning darslari juda tushunarli. Ayniqsa qiyin huquqiy mavzularni hayotiy misollar bilan tushuntirishi menga juda yordam berdi."</p>
          </div>
          {/* Testimonial 2 */}
          <div className="min-w-[300px] bg-white p-stack_lg rounded-2xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-stack_sm mb-stack_md">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold">NA</div>
              <div>
                <p className="font-title-sm text-body-sm text-primary">Nigora Akromova</p>
                <p className="text-[10px] text-outline">Grant sohibasi</p>
              </div>
              <div className="ml-auto flex">
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <p className="text-body-sm text-on-surface-variant italic">"Faqat darslar emas, balki psixologik tayyorgarlik bo'yicha bergan maslahatlari imtihon kuni juda asqotdi. Rahmat!"</p>
          </div>
        </div>
      </section>
    </>
  )
}
