import React from 'react';
import { Box, Typography } from '@mui/material';
import { textSegmentStyle } from '../../../styles/contents/ContentStyles';
import type { Segment } from '../types';

interface Props {
  segment: Segment;
}

const TextSegment: React.FC<Props> = ({ segment }) => {
  return (
    <Box sx={{ mb: 2 }}>
      {segment.title && (
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1e293b' }}>
          {segment.title}
        </Typography>
      )}
      <Typography variant="body1" sx={textSegmentStyle}>
        {segment.value}
      </Typography>
    </Box>
  );
};

export default TextSegment;
