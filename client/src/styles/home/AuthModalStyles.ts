import type { SxProps, Theme } from '@mui/material';

export const modalBoxStyle: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 480,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: { xs: 3, sm: 5 },
  outline: 'none',
};

export const modalCloseButtonStyle: SxProps<Theme> = {
  position: 'absolute',
  right: 16,
  top: 16,
  color: '#94a3b8',
};
