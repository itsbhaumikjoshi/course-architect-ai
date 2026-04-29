import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { heroSectionStyle } from '../../styles/home/HomeStyles';

interface Props {
  onGetStarted: () => void;
}

const HeroSection: React.FC<Props> = ({ onGetStarted }) => {
  return (
    <Box sx={heroSectionStyle}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 900, 
            color: '#0f172a', 
            mb: 2,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            letterSpacing: '-0.02em',
          }}
        >
          Course Architect <Box component="span" sx={{ color: '#3b82f6' }}>AI</Box>
        </Typography>
        
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            color: '#475569', 
            mb: 3, 
            fontWeight: 500,
            fontSize: { xs: '1.2rem', sm: '1.5rem' }
          }}
        >
          AI-generated learning paths, just for fun (and usefulness).
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#64748b', 
            mb: 6, 
            fontSize: { xs: '1rem', sm: '1.1rem' },
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          Drop in a topic, and this tool will spin up a simple course outline with chapters, quizzes, and optional deep dives.
        </Typography>
        
        <Button 
          variant="contained" 
          size="large"
          endIcon={<AutoAwesomeIcon />}
          onClick={onGetStarted}
          sx={{ 
            px: 6, 
            py: 2, 
            borderRadius: 8,
            backgroundColor: '#3b82f6',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            textTransform: 'none',
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 8px 10px -6px rgba(59, 130, 246, 0.2)',
            '&:hover': {
              backgroundColor: '#2563eb',
              transform: 'translateY(-2px)',
              boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.5), 0 10px 10px -5px rgba(59, 130, 246, 0.3)',
            },
            transition: 'all 0.3s ease'
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
