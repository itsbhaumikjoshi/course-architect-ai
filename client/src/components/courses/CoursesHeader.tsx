import React from 'react';
import { Box, Typography } from '@mui/material';
import { headerContainerStyle } from '../../styles/courses/CoursesStyles';

interface CoursesHeaderProps {
  userName: string;
}

const CoursesHeader: React.FC<CoursesHeaderProps> = ({ userName = '' }) => {
  return (
    <Box sx={headerContainerStyle}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 800,
          color: '#1e293b',
          mb: 1,
          letterSpacing: '-0.02em',
          fontSize: { xs: '2rem', md: '3rem' }
        }}
      >
        Welcome back, {userName}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 400,
          color: '#64748b',
          maxWidth: '600px',
          mx: 'auto',
          fontSize: { xs: '1rem', md: '1.25rem' }
        }}
      >
        What would you like to learn today?
      </Typography>
    </Box>
  );
};

export default CoursesHeader;
