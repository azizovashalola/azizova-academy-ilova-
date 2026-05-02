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
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
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
      </Routes>
    </AuthProvider>
  )
}

export default App
