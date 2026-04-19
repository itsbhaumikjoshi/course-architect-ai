import React from 'react';
import { Box, Typography } from '@mui/material';
import { codeBlockStyle } from '../../../styles/contents/ContentStyles';
import type { Segment } from '../types';

interface Props {
  segment: Segment;
}

const CodeBlock: React.FC<Props> = ({ segment }) => {
  return (
    <Box sx={{ mb: 4 }}>
      {segment.title && (
        <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
          {segment.title}
        </Typography>
      )}
      <Box sx={codeBlockStyle}>
        <pre style={{ margin: 0 }}>
          <code>{segment.value}</code>
        </pre>
      </Box>
    </Box>
  );
};

export default CodeBlock;
