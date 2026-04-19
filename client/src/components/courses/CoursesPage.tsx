import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CoursesHeader from './CoursesHeader';
import PromptInput from './PromptInput';
import CourseCard from './CourseCard';
import { pageContainerStyle, coursesGridStyle } from '../../styles/courses/CoursesStyles';

export interface Course {
  id: string;
  title: string;
  description: string;
  created_at: string;
  userId: string;
}

const CoursesPage: React.FC = () => {
  const courses: Course[] = [];
  return (
    <Box sx={pageContainerStyle}>
      <CoursesHeader userName="" />

      <PromptInput />

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

        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CoursesPage;
