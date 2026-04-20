import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CoursesPage } from './components/courses';
import { ContentPage } from './components/contents';
import { HomePage } from './components/home';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
          <Route path="/courses/:courseId/contents/:contentId" element={<ProtectedRoute><ContentPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
