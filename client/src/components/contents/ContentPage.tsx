import React from 'react';
import { Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { pageContainerStyle, contentMaxWidthStyle } from '../../styles/contents/ContentStyles';
import ChapterHeader from './ChapterHeader';
import SegmentRenderer from './SegmentRenderer';
import QuizSection from './QuizSection';
import EnhanceButton from './EnhanceButton';
import type { Chapter } from "./types.ts";

const ContentPage: React.FC = () => {
  const { courseId, contentId } = useParams<{ courseId: string; contentId: string }>();
  const navigate = useNavigate();

  const chapter: Chapter = {};

  const handleNextChapter = () => {
    const currentId = parseInt(contentId || '0');
    const nextId = isNaN(currentId) ? 1 : currentId + 1;
    navigate(`/courses/${courseId}/contents/${nextId}`);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={pageContainerStyle}>
      <Box sx={contentMaxWidthStyle}>
        <ChapterHeader 
          title={chapter.title} 
          description={chapter.description} 
        />
        
        <SegmentRenderer segments={chapter.segments} />

        <Box sx={{ mt: 8, pt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            endIcon={<ArrowForwardIcon />}
            onClick={handleNextChapter}
            sx={{ 
              px: 4, 
              py: 1.5, 
              borderRadius: 8,
              borderColor: '#3b82f6',
              color: '#3b82f6',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#eff6ff',
                borderColor: '#2563eb',
              }
            }}
          >
            Next Chapter
          </Button>
        </Box>
        
        {chapter.quiz && chapter.quiz.length > 0 && (
          <QuizSection questions={chapter.quiz} />
        )}
      </Box>
      <EnhanceButton />
    </Box>
  );
};

export default ContentPage;
