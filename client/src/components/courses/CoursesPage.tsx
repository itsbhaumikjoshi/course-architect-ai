import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, CircularProgress, Button, Alert, Snackbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import CoursesHeader from './CoursesHeader';
import PromptInput from './PromptInput';
import CourseCard from './CourseCard';
import { pageContainerStyle, coursesGridStyle } from '../../styles/courses/CoursesStyles';
import { fetchCourses, logout } from '../../adapters';
import { useAuth } from '../../context/AuthContext';

export interface Course {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  userId: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCourses() as Course[];
        if (data) {
          data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
          setCourses(data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load learning paths. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/');
    } catch (err: any) {
      setLogoutError(err.message || 'Failed to logout. Please try again.');
    }
  };

  return (
    <Box sx={pageContainerStyle}>
      <Box sx={{ ...coursesGridStyle, mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
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
          Back to Home
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

      <CoursesHeader userName={
        user ? `${user.firstName} ${user?.firstName === "Google" ? user?.lastName : (user?.lastName !== "User" && user?.lastName)}` : "User"}
        email={user?.email || ''}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <PromptInput setCourses={setCourses} />

      <Box sx={coursesGridStyle}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#1e293b',
              fontSize: '1.25rem'
            }}
          >
            Your Learning Paths
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : courses.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8, backgroundColor: '#f8fafc', borderRadius: 3, border: '1px dashed #cbd5e1' }}>
            <Typography variant="h6" sx={{ color: '#475569', mb: 1, fontWeight: 600 }}>
              No learning paths yet
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              Use the prompt above to generate your first AI-powered course!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {courses.map((course) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
                <CourseCard course={course} setCourses={setCourses} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Snackbar open={!!logoutError} autoHideDuration={6000} onClose={() => setLogoutError(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setLogoutError(null)} sx={{ borderRadius: 2 }}>
          {logoutError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CoursesPage;
