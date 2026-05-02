import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Layout() {
  const location = useLocation()
  const isQAorCoursesOrProfile = ['/qa', '/courses', '/teacher-profile', '/news'].includes(location.pathname)

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="bg-background text-on-background dark:bg-slate-900 dark:text-white font-body-md min-h-screen flex flex-col transition-colors duration-300">
      {/* Top App Bar */}
      <header className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-6 h-16 shadow-sm border-b transition-colors duration-300 ${isQAorCoursesOrProfile ? 'bg-[#F8F9FA] dark:bg-slate-800 border-slate-200 dark:border-slate-700' : 'bg-[#FAF9FD] dark:bg-slate-900 border-[#D1CED9] dark:border-slate-800 shadow-[0px_4px_20px_rgba(75,0,130,0.05)]'}`}>
        <div className="flex items-center gap-2 md:gap-3">
          <span className={`material-symbols-outlined text-2xl ${isQAorCoursesOrProfile ? 'text-[#1F3864]' : 'text-[#4B0082]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {isQAorCoursesOrProfile ? 'gavel' : 'balance'}
          </span>
          <div className="flex flex-col">
            <span className={`font-serif font-bold tracking-widest leading-tight ${isQAorCoursesOrProfile ? 'text-[#1F3864] text-xl uppercase' : 'text-[#4B0082] text-lg font-black'}`}>
              {isQAorCoursesOrProfile ? 'Yuridik Qabul' : 'AZIZOVA ACADEMY'}
            </span>
            {!isQAorCoursesOrProfile && (
              <span className="text-[10px] font-label-caps tracking-widest text-secondary-fixed-dim">EXCELLENCE IN LAW</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className={`material-symbols-outlined ${isQAorCoursesOrProfile ? 'text-[#1F3864] dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
            <span className={`material-symbols-outlined ${isQAorCoursesOrProfile ? 'text-[#1F3864] dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>notifications</span>
            {isQAorCoursesOrProfile && <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>}
          </button>
          {!isQAorCoursesOrProfile && (
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary text-[12px] font-bold">
              J
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full pt-16 pb-24">
        <Outlet />
      </main>

      {/* Bottom Nav Bar */}
      <nav className={`fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 h-16 md:h-20 shadow-[0px_-4px_20px_rgba(75,0,130,0.05)] border-t pb-safe transition-colors duration-300 ${isQAorCoursesOrProfile ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700' : 'bg-white dark:bg-slate-900 border-[#D1CED9] dark:border-slate-800'}`}>
        <NavItem to="/" icon="home" label="Bosh sahifa" activeColor={isQAorCoursesOrProfile ? 'text-[#1F3864] dark:text-blue-400' : 'text-[#4B0082] dark:text-purple-400 border-secondary-fixed'} />
        <NavItem to="/courses" icon="school" label="Kurslar" activeColor={isQAorCoursesOrProfile ? 'text-[#1F3864] dark:text-blue-400' : 'text-[#4B0082] dark:text-purple-400'} />
        <NavItem to="/tests" icon="quiz" label="Testlar" activeColor={isQAorCoursesOrProfile ? 'text-[#1F3864] dark:text-blue-400' : 'text-[#4B0082] dark:text-purple-400'} />
        <NavItem to="/qa" icon="forum" label="Savol-javob" activeColor={isQAorCoursesOrProfile ? 'text-[#1F3864] dark:text-blue-400' : 'text-[#4B0082] dark:text-purple-400'} />
        <NavItem to="/teacher-profile" icon="account_circle" label="Profil" activeColor={isQAorCoursesOrProfile ? 'text-[#1F3864] dark:text-blue-400' : 'text-[#4B0082] dark:text-purple-400'} />
      </nav>
    </div>
  )
}

function NavItem({ to, icon, label, activeColor }) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `flex flex-col items-center justify-center pt-2 transition-all group scale-95 active:scale-90 duration-150 ${isActive ? activeColor + ' border-t-2' : 'text-slate-400 hover:text-[#4B0082]'}`}
    >
      {({ isActive }) => (
        <>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
            {icon}
          </span>
          <span className="font-serif text-[10px] font-semibold uppercase tracking-tighter mt-1">{label}</span>
        </>
      )}
    </NavLink>
  )
}
