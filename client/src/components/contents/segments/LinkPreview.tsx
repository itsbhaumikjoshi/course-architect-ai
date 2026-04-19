import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import LaunchIcon from '@mui/icons-material/Launch';
import { linkPreviewStyle } from '../../../styles/contents/ContentStyles';
import type { Segment } from '../types';

interface Props {
  segment: Segment;
}

const LinkPreview: React.FC<Props> = ({ segment }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box 
        component="a" 
        href={segment.value} 
        target="_blank" 
        rel="noopener noreferrer"
        sx={linkPreviewStyle}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#eff6ff', 
          borderRadius: 2, 
          p: 1.5, 
          mr: 2 
        }}>
          <LinkIcon sx={{ color: '#3b82f6' }} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#0f172a' }}>
            {segment.title || 'External Link'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', display: 'flex', alignItems: 'center' }}>
            {segment.value}
          </Typography>
        </Box>
        <LaunchIcon sx={{ color: '#94a3b8', ml: 2 }} />
      </Box>
    </Box>
  );
};

export default LinkPreview;
