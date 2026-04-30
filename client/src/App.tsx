import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme';
import { CoursesPage } from './components/courses';
import { ContentPage } from './components/contents';
import { HomePage } from './components/home';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
              <Route path="/courses/:courseId/contents/:contentId" element={<ProtectedRoute><ContentPage /></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider >
  )
}

export default App
