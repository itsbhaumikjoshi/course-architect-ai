import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import PersonIcon from '@mui/icons-material/Person';
import FeatureCard from './FeatureCard';
import { sectionContainerStyle } from '../../styles/home/HomeStyles';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <AutoFixHighIcon fontSize="large" />,
      title: "AI-Generated Courses",
      description: "Provide a single prompt and watch as a comprehensive course is tailored specifically to your request within seconds."
    },
    {
      icon: <AccountTreeIcon fontSize="large" />,
      title: "Structured Learning",
      description: "Courses are broken down into digestible chapters, segments, and quizzes to ensure you properly absorb the material."
    },
    {
      icon: <ZoomInIcon fontSize="large" />,
      title: "Deep Dive Enhancements",
      description: "Found a topic you want to master? Enhance one chapter per course to unlock deep explanations, videos, and code examples."
    },
    {
      icon: <PersonIcon fontSize="large" />,
      title: "Personalized For You",
      description: "Keep track of up to 5 focused courses at a time. Quality over quantity ensures you finish what you start."
    }
  ];

  return (
    <Box sx={sectionContainerStyle}>
      <Typography 
        variant="h3" 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 800, 
          color: '#0f172a', 
          mb: 6,
          fontSize: { xs: '2rem', md: '2.5rem' }
        }}
      >
        Why Course Architect?
      </Typography>
      
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <FeatureCard 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesSection;
