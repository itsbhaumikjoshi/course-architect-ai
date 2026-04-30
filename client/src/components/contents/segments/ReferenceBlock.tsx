import React from 'react';
import { Box, Typography } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { referenceBlockStyle } from '../../../styles/contents/ContentStyles';
import type { Segment } from '../types';

interface Props {
  segment: Segment;
}

const ReferenceBlock: React.FC<Props> = ({ segment }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={referenceBlockStyle}>
        <Box sx={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'flex-start',
          pt: 0.5,
          minWidth: 'fit-content'
        }}>
          <LightbulbOutlinedIcon sx={{ color: '#3b82f6', mt: 0.5 }} />
        </Box>
        <Box sx={{
          minWidth: 0,
          flex: 1
        }}>
          {segment.title && (
            <Typography variant="subtitle1" sx={{
              fontWeight: 700,
              mb: 0.5,
              color: '#1e3a8a',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}>
              {segment.title}
            </Typography>
          )}
          <Typography variant="body1" sx={{
            color: '#1e40af',
            lineHeight: 1.6,
            overflowWrap: 'break-word',
            wordBreak: 'break-word'
          }}>
            {segment.value}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ReferenceBlock;
