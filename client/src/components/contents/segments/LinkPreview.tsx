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
          flexShrink: 0,
          minWidth: 'fit-content'
        }}>
          <LinkIcon sx={{ color: '#3b82f6' }} />
        </Box>
        <Box sx={{
          flex: 1,
          minWidth: 0
        }}>
          <Typography variant="subtitle1" sx={{
            fontWeight: 600,
            color: '#0f172a',
            overflowWrap: 'break-word',
            wordBreak: 'break-word'
          }}>
            {segment.title || 'External Link'}
          </Typography>
          <Typography variant="body2" sx={{
            color: '#64748b',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            fontSize: '0.875rem'
          }}>
            {segment.value}
          </Typography>
        </Box>
        <LaunchIcon sx={{
          color: '#94a3b8',
          flexShrink: 0,
          minWidth: 'fit-content'
        }} />
      </Box>
    </Box>
  );
};

export default LinkPreview;
