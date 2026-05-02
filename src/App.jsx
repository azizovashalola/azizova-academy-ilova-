import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Learning from './pages/Learning'
import TestAnalysis from './pages/TestAnalysis'
import Tests from './pages/Tests'
import QA from './pages/QA'
import Courses from './pages/Courses'
import TeacherProfile from './pages/TeacherProfile'
import News from './pages/News'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }
  
  return user ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="learning" element={<Learning />} />
            <Route path="tests" element={<Tests />} />
            <Route path="test-analysis" element={<TestAnalysis />} />
            <Route path="qa" element={<QA />} />
            <Route path="courses" element={<Courses />} />
            <Route path="teacher-profile" element={<TeacherProfile />} />
            <Route path="news" element={<News />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
