import type { SxProps, Theme } from '@mui/material';

export const modalBoxStyle: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100% - 32px)',
  maxWidth: 480,
  maxHeight: 'calc(100vh - 32px)',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: { xs: 3, sm: 5 },
  outline: 'none',
  
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
};

export const modalCloseButtonStyle: SxProps<Theme> = {
  position: 'absolute',
  right: 16,
  top: 16,
  color: '#94a3b8',
};
