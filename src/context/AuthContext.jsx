import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Jasur M.',
    avatar: 'J',
    daysLeft: 124,
    progress: 45,
    probability: 75,
    isLoggedIn: true
  })

  const login = (userData) => setUser({ ...userData, isLoggedIn: true })
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
