import type { SxProps, Theme } from '@mui/material';

export const pageContainerStyle: SxProps<Theme> = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
};

export const heroSectionStyle: SxProps<Theme> = {
  pt: { xs: 12, md: 20 },
  pb: { xs: 8, md: 16 },
  px: { xs: 2, sm: 4, md: 8 },
  textAlign: 'center',
  background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
};

export const sectionContainerStyle: SxProps<Theme> = {
  py: { xs: 8, md: 12 },
  px: { xs: 2, sm: 4, md: 8 },
  maxWidth: '1200px',
  mx: 'auto',
  width: '100%',
};

export const featureCardStyle: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 4,
  p: 4,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
  backgroundColor: '#ffffff',
  '&:hover': {
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderColor: '#cbd5e1',
  }
};

export const stepContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  px: 2,
};

export const stepIconContainerStyle: SxProps<Theme> = {
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: '#eff6ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 3,
  boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.2)',
  color: '#3b82f6',
};

export const footerStyle: SxProps<Theme> = {
  py: 4,
  textAlign: 'center',
  borderTop: '1px solid #e2e8f0',
  backgroundColor: '#ffffff',
  mt: 'auto',
};
