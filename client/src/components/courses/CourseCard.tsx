import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, Snackbar, Alert } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { cardStyle, cardContentStyle } from '../../styles/courses/CoursesStyles';
import type { Course } from './CoursesPage';
import { useNavigate } from 'react-router-dom';
import { deleteCourse, updateCourseTitle } from '../../adapters';

interface CourseCardProps {
  course: Course;
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, setCourses }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(course.title);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleMenuClose();
    setNewTitle(course.title);
    setUpdateDialogOpen(true);
  };

  const handleUpdateSubmit = async () => {
    if (!newTitle.trim() || newTitle === course.title) {
      setUpdateDialogOpen(false);
      return;
    }
    setLoadingUpdate(true);
    setError(null);
    try {
      const updatedCourse = await updateCourseTitle({ courseId: course.id, title: newTitle });
      if (updatedCourse) {
        setCourses((prev) => prev.map((c) => (c.id === course.id ? updatedCourse : c)));
        setUpdateDialogOpen(false);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update course title.');
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleMenuClose();
    setLoadingDelete(true);
    setError(null);
    try {
      await deleteCourse({ courseId: course.id });
      setCourses((prev) => prev.filter((c) => c.id !== course.id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete course.');
      setLoadingDelete(false);
    }
  };

  const formattedDate = new Date(course.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  const handleClick = () => {
    navigate(`/courses/${course.id}/contents/0`);
  }

  return (
    <Card sx={cardStyle} elevation={0} onClick={handleClick}>
      <CardContent sx={cardContentStyle}>
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexDirection: 'row',
              gap: { xs: 1.5, sm: 2 },
              mb: 1.5
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.3,
                flex: 1,
                wordBreak: 'break-word'
              }}
            >
              {course.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label="Course"
                size="small"
                sx={{
                  backgroundColor: '#eff6ff',
                  color: '#3b82f6',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  alignSelf: { xs: 'flex-start', sm: 'center' }
                }}
              />
              <IconButton
                size="small"
                onClick={handleMenuClick}
                sx={{
                  color: '#64748b',
                  mt: -0.5,
                  mr: -1
                }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onClick={(e) => e.stopPropagation()}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                elevation={2}
                sx={{
                  '& .MuiPaper-root': {
                    borderRadius: 2,
                    minWidth: 140,
                    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <MenuItem onClick={handleUpdateClick} sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155' }}>
                  Update Title
                </MenuItem>
                <MenuItem onClick={handleDelete} disabled={loadingDelete} sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#ef4444' }}>
                  {loadingDelete ? <CircularProgress size={16} sx={{ mr: 1, color: '#ef4444' }} /> : null}
                  {loadingDelete ? 'Deleting...' : 'Delete'}
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              color: '#64748b',
              lineHeight: 1.6,
            }}
          >
            {course.description}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 'auto',
            pt: 2,
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            color: '#94a3b8'
          }}
        >
          <CalendarTodayIcon sx={{ fontSize: '1rem', mr: 0.75 }} />
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {formattedDate}
          </Typography>
        </Box>
      </CardContent>

      <Dialog
        open={updateDialogOpen}
        onClose={() => !loadingUpdate && setUpdateDialogOpen(false)}
        onClick={(e) => e.stopPropagation()}
        fullWidth
        maxWidth="md"
        slotProps={{ paper: { sx: { borderRadius: 3, p: { xs: 1, sm: 2 } } } }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#0f172a' }}>Update Course Title</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Course Title"
            multiline
            minRows={3}
            maxRows={8}
            fullWidth
            variant="outlined"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            disabled={loadingUpdate}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setUpdateDialogOpen(false)} disabled={loadingUpdate} sx={{ color: '#64748b', textTransform: 'none' }}>
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} variant="contained" disabled={loadingUpdate || !newTitle.trim()} sx={{ textTransform: 'none', backgroundColor: '#3b82f6', borderRadius: 2 }}>
            {loadingUpdate ? <CircularProgress size={20} color="inherit" /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClick={(e) => e.stopPropagation()}>
        <Alert severity="error" onClose={() => setError(null)} sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CourseCard;
