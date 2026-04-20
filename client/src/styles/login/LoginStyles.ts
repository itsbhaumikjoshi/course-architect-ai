import type { SxProps, Theme } from '@mui/material';

export const formContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
  mt: 3,
};

export const formTextFieldStyle: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '& fieldset': {
      borderColor: '#e2e8f0',
    },
    '&:hover fieldset': {
      borderColor: '#cbd5e1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3b82f6',
    },
  },
};

export const submitButtonStyle: SxProps<Theme> = {
  py: 1.5,
  borderRadius: 2,
  fontWeight: 'bold',
  fontSize: '1rem',
  textTransform: 'none',
  boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
  '&:hover': {
    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.23)',
  },
};
