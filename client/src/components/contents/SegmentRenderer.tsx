import React from 'react';
import { Box } from '@mui/material';
import type { Segment } from './types';
import {
  CodeBlock,
  LinkPreview,
  ReferenceBlock,
  TextSegment,
  VideoEmbed,
} from "./segments";
import { segmentContainerStyle } from '../../styles/contents/ContentStyles';

interface Props {
  segments: Segment[];
}

const SegmentRenderer: React.FC<Props> = ({ segments }) => {
  return (
    <Box sx={segmentContainerStyle}>
      {segments.map((segment, index) => {
        switch (segment.type) {
          case 'text':
            return <TextSegment key={index} segment={segment} />;
          case 'code':
            return <CodeBlock key={index} segment={segment} />;
          case 'url':
            return <LinkPreview key={index} segment={segment} />;
          case 'video_url':
            return <VideoEmbed key={index} segment={segment} />;
          case 'reference':
            return <ReferenceBlock key={index} segment={segment} />;
          default:
            return null;
        }
      })}
    </Box>
  );
};

export default SegmentRenderer;
