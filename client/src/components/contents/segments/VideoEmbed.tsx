import React from 'react';
import { Box, Typography } from '@mui/material';
import { videoContainerStyle } from '../../../styles/contents/ContentStyles';
import type { Segment } from '../types';

interface Props {
  segment: Segment;
}

const VideoEmbed: React.FC<Props> = ({ segment }) => {

  const toYouTubeEmbedUrl = (url: string): string =>{
    const u = new URL(url);
    const videoId = u.searchParams.get("v");

    if (!videoId) {
      throw new Error(`No video ID found in URL: ${url}`);
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }

  return (
    <Box sx={{ mb: 4 }}>
      {segment.title && (
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
          {segment.title}
        </Typography>
      )}
      <Box sx={videoContainerStyle}>
        <iframe
          src={toYouTubeEmbedUrl(segment.value)}
          title={segment.title || "Video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>
    </Box>
  );
};

export default VideoEmbed;
