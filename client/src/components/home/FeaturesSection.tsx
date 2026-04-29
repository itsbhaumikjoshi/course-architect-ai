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
      description: "Give it a prompt, get a rough course structure in seconds."
    },
    {
      icon: <AccountTreeIcon fontSize="large" />,
      title: "Structured Learning",
      description: "Content is split into small chapters and quizzes to keep things manageable."
    },
    {
      icon: <ZoomInIcon fontSize="large" />,
      title: "Deep Dive Enhancements",
      description: "Want more detail on something? You can expand one chapter per course for extra explanations and examples."
    },
    {
      icon: <PersonIcon fontSize="large" />,
      title: "Keep It Focused",
      description: "You can have up to 5 active courses—just enough to stay productive without overloading."
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
        Why Course Architect (Side Project Edition)?
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
