import React, { useState } from 'react';
import { Fab, CircularProgress, Snackbar, Alert } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { fabStyle } from '../../styles/contents/ContentStyles';
import { enhanceCourseContent } from '../../adapters';
import type { Chapter } from './types';

interface Props {
  courseId?: string;
  contentId?: string;
  setChapter: (chapter: any) => void;
}

const EnhanceButton: React.FC<Props> = ({ courseId, contentId, setChapter }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnhance = async () => {
    if (!courseId || !contentId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await enhanceCourseContent({ courseId, contentId });
      if (data) {
        const deserialized = JSON.parse(data.text) as Chapter;
        setChapter({
          ...deserialized,
          totalContents: Number(data.total_contents),
          enhanced: data.enhanced || false
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to enhance content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Fab 
        variant="extended" 
        sx={fabStyle}
        onClick={handleEnhance}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} /> : <AutoAwesomeIcon sx={{ mr: 1 }} />}
        {loading ? 'Enhancing...' : 'Enhance Chapter'}
      </Fab>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setError(null)} sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EnhanceButton;
