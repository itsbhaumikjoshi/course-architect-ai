import React from 'react';
import { Box, Typography } from '@mui/material';
import { headerContainerStyle } from '../../styles/contents/ContentStyles';

interface Props {
  title: string;
  description: string;
}

const ChapterHeader: React.FC<Props> = ({ title, description }) => {
  return (
    <Box sx={headerContainerStyle}>
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ 
          fontWeight: 800, 
          color: '#0f172a', 
          mb: 2, 
          letterSpacing: '-0.02em',
          fontSize: { xs: '2.5rem', md: '3.5rem' }
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 400, 
          color: '#64748b', 
          lineHeight: 1.6,
          fontSize: { xs: '1.1rem', md: '1.25rem' }
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ChapterHeader;
