import React from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { promptContainerStyle, promptTextFieldStyle } from '../../styles/courses/CoursesStyles';

const PromptInput: React.FC = () => {
  return (
    <Box sx={{
      ...promptContainerStyle,
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: 2,
      alignItems: 'center'
    }}>
      <TextField
        fullWidth
        placeholder="E.g., I want to learn about advanced React patterns..."
        variant="outlined"
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
                  sx={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    mr: 0.5,
                    p: 1.2,
                    '&:hover': {
                      backgroundColor: '#2563eb',
                    }
                  }}
                >
                  <SearchIcon />
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
  );
};

export default PromptInput;
