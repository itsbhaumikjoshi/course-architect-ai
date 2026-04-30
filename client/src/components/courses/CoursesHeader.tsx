import React from 'react';
import { Box, Typography } from '@mui/material';
import { headerContainerStyle } from '../../styles/courses/CoursesStyles';

interface CoursesHeaderProps {
  userName: string;
  email: string;
}

const TEST_EMAIL = import.meta.env.VITE_TEST_EMAIL;

const CoursesHeader: React.FC<CoursesHeaderProps> = ({ userName = '', email = '' }) => {
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
        Welcome, {userName}
      </Typography>
      {email === TEST_EMAIL && (
        <Typography
          variant="body2"
          sx={{
            color: '#1d4ed8',
            fontWeight: 500,
            mb: 2,
            backgroundColor: '#eff6ff',
            py: 0.75,
            px: 2,
            borderRadius: 2,
            display: 'inline-block',
            border: '1px solid #bfdbfe'
          }}
        >
          You are now logged in with the demo test account.
        </Typography>
      )}
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
