import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { cardStyle, cardContentStyle } from '../../styles/courses/CoursesStyles';
import type { Course } from './CoursesPage';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const formattedDate = new Date(course.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Card sx={cardStyle} elevation={0}>
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
            <Chip 
              label="Course" 
              size="small" 
              sx={{ 
                backgroundColor: '#eff6ff', 
                color: '#3b82f6',
                fontWeight: 600,
                fontSize: '0.75rem',
                alignSelf: { xs: 'flex-start', sm: 'flex-start' }
              }} 
            />
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
    </Card>
  );
};

export default CourseCard;
