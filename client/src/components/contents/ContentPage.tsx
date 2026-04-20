import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Alert, Snackbar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { pageContainerStyle, contentMaxWidthStyle } from '../../styles/contents/ContentStyles';
import ChapterHeader from './ChapterHeader';
import SegmentRenderer from './SegmentRenderer';
import QuizSection from './QuizSection';
import EnhanceButton from './EnhanceButton';
import { fetchCourseContent, logout } from '../../adapters';
import { useAuth } from '../../context/AuthContext';
import type { Chapter } from './types';

const ContentPage: React.FC = () => {
  const { courseId, contentId } = useParams<{ courseId: string; contentId: string }>();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/');
    } catch (err: any) {
      setLogoutError(err.message || 'Failed to logout. Please try again.');
    }
  };

  useEffect(() => {
    const loadContent = async () => {
      if (!courseId || !contentId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCourseContent({ courseId, contentId });
        if (data) {
          const deserialized = JSON.parse(data.text) as Chapter;
          setChapter({
            ...deserialized,
            totalContents: Number(data.total_contents),
            enhanced: data.enhanced || false
          });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load course content.');
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [courseId, contentId]);

  const handleNextChapter = () => {
    const currentId = parseInt(contentId || '0');
    const nextId = isNaN(currentId) ? 1 : currentId + 1;
    navigate(`/courses/${courseId}/contents/${nextId}`);
    window.scrollTo(0, 0);
  };

  const handlePreviousChapter = () => {
    const currentId = parseInt(contentId || '0');
    const prevId = isNaN(currentId) ? 0 : currentId - 1;
    if (prevId >= 0) {
      navigate(`/courses/${courseId}/contents/${prevId}`);
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8fafc' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !chapter) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Alert severity="error" sx={{ maxWidth: 600, width: '100%', borderRadius: 2 }}>
          {error || 'Course content not found.'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={pageContainerStyle}>
      <Box sx={contentMaxWidthStyle}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/courses')}
            sx={{
              color: '#64748b',
              textTransform: 'none',
              fontWeight: 600,
              px: 0,
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#0f172a',
              }
            }}
          >
            Back to Courses
          </Button>
          <Button
            onClick={handleLogout}
            sx={{
              color: '#64748b',
              textTransform: 'none',
              fontWeight: 600,
              px: 0,
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#ef4444',
              }
            }}
          >
            Logout
          </Button>
        </Box>
        <ChapterHeader 
          title={chapter.title} 
          description={chapter.description} 
        />
        
        <SegmentRenderer segments={chapter.segments} />

        <Box sx={{ mt: 8, pt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {parseInt(contentId || '0') > 0 ? (
            <Button 
              variant="outlined" 
              startIcon={<ArrowBackIcon />}
              onClick={handlePreviousChapter}
              sx={{ 
                px: 4, 
                py: 1.5, 
                borderRadius: 8,
                borderColor: '#3b82f6',
                color: '#3b82f6',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#eff6ff',
                  borderColor: '#2563eb',
                }
              }}
            >
              Previous Chapter
            </Button>
          ) : <Box />}

          {parseInt(contentId || '0') < (chapter.totalContents || 0) - 1 ? (
            <Button 
              variant="outlined" 
              endIcon={<ArrowForwardIcon />}
              onClick={handleNextChapter}
              sx={{ 
                px: 4, 
                py: 1.5, 
                borderRadius: 8,
                borderColor: '#3b82f6',
                color: '#3b82f6',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#eff6ff',
                  borderColor: '#2563eb',
                }
              }}
            >
              Next Chapter
            </Button>
          ) : <Box />}
        </Box>
        
        {chapter.quiz && chapter.quiz.length > 0 && (
          <QuizSection questions={chapter.quiz} />
        )}
      </Box>
      {!chapter.enhanced && <EnhanceButton courseId={courseId} contentId={contentId} setChapter={setChapter} />}
      <Snackbar open={!!logoutError} autoHideDuration={6000} onClose={() => setLogoutError(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setLogoutError(null)} sx={{ borderRadius: 2 }}>
          {logoutError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContentPage;
