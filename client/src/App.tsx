import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CoursesPage } from './components/courses';
import { ContentPage } from './components/contents';
import { HomePage } from './components/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId/contents/:contentId" element={<ContentPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
