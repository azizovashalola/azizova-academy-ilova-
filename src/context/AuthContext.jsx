import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Joriy sessiyani tekshirish
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session)
    })

    // Auth holati o'zgarishini eshitish (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSession = async (session) => {
    if (!session) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      // Profileni bazadan o'qish
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()
      
      if (profile) {
        setUser({ ...session.user, ...profile, daysLeft: 124, progress: 45, probability: 75 })
      } else {
        setUser({ ...session.user, name: 'Talaba', daysLeft: 124, progress: 45, probability: 75 })
      }
    } catch (e) {
      setUser({ ...session.user, name: 'Talaba', daysLeft: 124, progress: 45, probability: 75 })
    } finally {
      setLoading(false)
    }
  }

  // Dummy login funksiyasi (Custom auth to'liq ishlaguncha)
  const login = (userData) => {
    // Agar Supabase emas, lokal mock ishlatsak:
    if (userData?.id === 'mock-id') {
      setUser({
        id: 'mock-id',
        name: userData.name || 'Talaba',
        phone: userData.phone,
        daysLeft: 124,
        progress: 45,
        probability: 75,
      })
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
