import type { SxProps, Theme } from '@mui/material';

export const pageContainerStyle: SxProps<Theme> = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  pt: { xs: 6, md: 10 },
  pb: 12,
  px: { xs: 2, sm: 4, md: 8 },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const headerContainerStyle: SxProps<Theme> = {
  mb: 6,
  textAlign: 'center',
  width: '100%',
};

export const promptContainerStyle: SxProps<Theme> = {
  width: '100%',
  maxWidth: '650px',
  mb: 8,
};

export const promptTextFieldStyle: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.08)',
    },
    '&.Mui-focused': {
      boxShadow: '0 8px 30px -5px rgba(0, 0, 0, 0.12)',
    },
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3b82f6',
      borderWidth: '1px',
    },
  },
};

export const coursesGridStyle: SxProps<Theme> = {
  width: '100%',
  maxWidth: '1200px',
};

export const cardStyle: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 4,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.03)',
  backgroundColor: '#ffffff',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
    borderColor: 'rgba(226, 232, 240, 1)',
  }
};

export const cardContentStyle: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  p: 3,
};
