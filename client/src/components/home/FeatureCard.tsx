import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import { featureCardStyle } from '../../styles/home/HomeStyles';

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<Props> = ({ icon, title, description }) => {
  return (
    <Card sx={featureCardStyle} elevation={0}>
      <Box sx={{ 
        color: '#3b82f6', 
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 56,
        height: 56,
        borderRadius: 3,
        backgroundColor: '#eff6ff'
      }}>
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
        {description}
      </Typography>
    </Card>
  );
};

export default FeatureCard;
