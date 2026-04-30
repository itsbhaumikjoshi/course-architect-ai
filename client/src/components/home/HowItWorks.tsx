import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SchoolIcon from '@mui/icons-material/School';
import { sectionContainerStyle, stepContainerStyle, stepIconContainerStyle } from '../../styles/home/HomeStyles';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <CreateIcon sx={{ fontSize: 40 }} />,
      title: "1. Enter a Prompt",
      description: "Type what you want to learn (e.g., “Advanced React” or “Intro to ML”)."
    },
    {
      icon: <PrecisionManufacturingIcon sx={{ fontSize: 40 }} />,
      title: "2. AI Generates",
      description: "It creates a basic course structure with chapters and quizzes."
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: "3. Learn & Enhance",
      description: "Go through it at your own pace and optionally expand deeper into topics."
    }
  ];

  return (
    <Box sx={{ ...sectionContainerStyle, backgroundColor: '#f8fafc' }}>
      <Typography 
        variant="h3" 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 800, 
          color: '#0f172a', 
          mb: 8,
          fontSize: { xs: '2rem', md: '2.5rem' }
        }}
      >
        How It Works
      </Typography>

      <Grid container spacing={4} sx={{ position: 'relative' }}>
        <Box 
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            top: 40,
            left: '16.66%',
            right: '16.66%',
            height: 2,
            backgroundColor: '#e2e8f0',
            zIndex: 0
          }}
        />

        {steps.map((step, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Box sx={stepContainerStyle}>
              <Box sx={stepIconContainerStyle}>
                {step.icon}
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>
                {step.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                {step.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;
