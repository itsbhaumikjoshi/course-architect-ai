import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton, CircularProgress, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { promptContainerStyle, promptTextFieldStyle } from '../../styles/courses/CoursesStyles';
import { createCourses } from '../../adapters';
import type { Course } from './CoursesPage';

interface Props {
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const PromptInput: React.FC<Props> = ({ setCourses }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const course = await createCourses(prompt);
      if (course) {
        setCourses((prev) => [course, ...prev]);
        setPrompt('');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      ...promptContainerStyle,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        alignItems: 'center'
      }}>
      <TextField
        fullWidth
        placeholder="E.g., I want to learn about advanced React patterns..."
        variant="outlined"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCreate();
        }}
        sx={{ ...promptTextFieldStyle, flexGrow: 1 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AutoAwesomeIcon sx={{ color: '#3b82f6', ml: 1 }} />
              </InputAdornment>
            ), endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleCreate}
                  disabled={loading || !prompt.trim()}
                  sx={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    mr: 0.5,
                    p: 1.2,
                    '&:hover': {
                      backgroundColor: '#2563eb',
                    },
                    '&.Mui-disabled': {
                      backgroundColor: '#93c5fd',
                      color: 'white'
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              py: 0.5,
              pr: 0.5,
              fontSize: '1.1rem',
              color: '#334155'
            }
          }
        }}
      />
      </Box>
    </Box>
  );
};

export default PromptInput;
