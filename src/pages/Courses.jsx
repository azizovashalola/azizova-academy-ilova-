import { Link } from 'react-router-dom'
import { coursesData } from '../data/coursesData'

export default function Courses() {
  return (
    <div className="px-container_margin max-w-5xl mx-auto">
      {/* Search Section */}
      <section className="mb-stack_lg">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-outline">search</span>
          <input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all font-body-md" placeholder="Darslarni izlang..." type="text" />
        </div>
      </section>

      {/* Subjects Grid (Horizontal Scroll) */}
      <section className="mb-stack_lg">
        <h2 className="font-title-sm text-title-sm mb-stack_md text-primary">Fanlar modullari</h2>
        <div className="flex gap-stack_md overflow-x-auto hide-scrollbar pb-2">
          {coursesData.modules.map(module => (
            <div key={module.id} className="flex-shrink-0 w-64 bg-surface-container-lowest dark:bg-slate-800 p-stack_md rounded-xl shadow-[0_4px_12px_rgba(31,56,100,0.05)] border border-outline-variant/30">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-stack_md bg-opacity-20 ${module.colorClass}`}>
                <span className={`material-symbols-outlined ${module.textClass}`}>{module.icon}</span>
              </div>
              <h3 className="font-title-sm text-body-md mb-stack_sm text-on-surface dark:text-white">{module.title}</h3>
              <p className="text-on-surface-variant text-label-caps mb-3">{module.totalLessons} dars • {module.completedPercentage}% tugatildi</p>
              <div className="w-full bg-surface-container-highest dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className={`${module.progressClass} h-full rounded-full`} style={{ width: `${module.completedPercentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Lessons Bento Grid */}
      <section className="mb-stack_lg">
        <div className="flex justify-between items-end mb-stack_md">
          <h2 className="font-title-sm text-title-sm text-primary">Video darslar</h2>
          <button className="text-primary-container font-label-caps hover:underline">Hammasi</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack_md">
          {coursesData.videos.map(video => (
            <Link key={video.id} to="/learning" className={video.featured ? "md:row-span-2 group relative overflow-hidden rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm cursor-pointer" : "flex gap-stack_md p-stack_sm bg-surface-container-lowest rounded-xl border border-outline-variant/30 group cursor-pointer hover:border-primary/50 transition-colors"}>
              {video.featured ? (
                <>
                  <div className="aspect-video relative overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={video.image} alt={video.title} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded">{video.duration}</div>
                  </div>
                  <div className="p-stack_md">
                    <span className="text-secondary font-label-caps bg-secondary-container/30 px-2 py-0.5 rounded-full mb-2 inline-block">{video.subject}</span>
                    <h3 className="font-title-sm text-body-md text-primary dark:text-blue-400 line-clamp-2">{video.title}</h3>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-32 h-20 relative flex-shrink-0 rounded-lg overflow-hidden">
                    <img className="w-full h-full object-cover" src={video.image} alt={video.title} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-title-sm text-body-sm text-primary dark:text-blue-400 line-clamp-1">{video.title}</h4>
                    <p className="text-on-surface-variant text-[12px]">{video.subject} • {video.duration}</p>
                  </div>
                </>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Downloadable Guides */}
      <section className="mb-section_gap">
        <h2 className="font-title-sm text-title-sm mb-stack_md text-primary">O'quv qo'llanmalar (PDF)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-stack_md">
          {coursesData.guides.map(guide => (
            <div key={guide.id} className="p-stack_md bg-surface-container-low dark:bg-slate-800 rounded-xl border border-dashed border-outline-variant flex flex-col items-center text-center hover:bg-surface-container transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center mb-stack_sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-error">picture_as_pdf</span>
              </div>
              <span className="font-title-sm text-[13px] text-on-surface dark:text-slate-200 mb-1">{guide.title}</span>
              <span className="text-on-surface-variant text-[10px]">{guide.size} • {guide.format}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
