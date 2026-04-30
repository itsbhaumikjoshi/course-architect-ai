import type { SxProps, Theme } from '@mui/material';

export const pageContainerStyle: SxProps<Theme> = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  pt: { xs: 4, md: 8 },
  pb: 12,
  px: { xs: 2, sm: 4, md: 8 },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const contentMaxWidthStyle: SxProps<Theme> = {
  width: '100%',
  maxWidth: '800px',
};

export const headerContainerStyle: SxProps<Theme> = {
  mb: 6,
  mt: 2,
  width: '100%',
};

export const segmentContainerStyle: SxProps<Theme> = {
  mb: 4,
  width: '100%',
};

export const textSegmentStyle: SxProps<Theme> = {
  color: '#334155',
  lineHeight: 1.8,
  fontSize: '1.1rem',
  mb: 2,
};

export const codeBlockStyle: SxProps<Theme> = {
  backgroundColor: '#0f172a',
  color: '#e2e8f0',
  p: 3,
  borderRadius: 1,
  overflowX: 'auto',
  fontFamily: 'monospace',
  fontSize: '0.9rem',
  lineHeight: 1.5,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

export const linkPreviewStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  p: 2,
  borderRadius: 1,
  border: '1px solid #e2e8f0',
  backgroundColor: '#ffffff',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'all 0.2s ease',
  minWidth: 0,
  gap: 2,
  '&:hover': {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
    borderColor: '#cbd5e1',
    transform: 'translateY(-2px)',
  },
};

export const videoContainerStyle: SxProps<Theme> = {
  position: 'relative',
  paddingBottom: '56.25%',
  height: 0,
  overflow: 'hidden',
  borderRadius: 2,
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  backgroundColor: '#000',
  '& iframe': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0,
  },
};

export const referenceBlockStyle: SxProps<Theme> = {
  display: 'flex',
  p: 3,
  borderRadius: 0,
  backgroundColor: '#eff6ff',
  borderLeft: '4px solid #3b82f6',
  color: '#1e3a8a',
  gap: 2,
  minWidth: 0,
  flexWrap: 'wrap',
};

export const quizSectionStyle: SxProps<Theme> = {
  mt: 8,
  pt: 6,
  borderTop: '1px solid #e2e8f0',
};

export const quizQuestionCardStyle = (isSelected: boolean, isCorrect: boolean | null): SxProps<Theme> => {
  let borderColor = '#e2e8f0';
  let backgroundColor = '#ffffff';

  if (isCorrect === true) {
    borderColor = '#22c55e';
    backgroundColor = '#f0fdf4';
  } else if (isCorrect === false && isSelected) {
    borderColor = '#ef4444';
    backgroundColor = '#fef2f2';
  } else if (isSelected) {
    borderColor = '#3b82f6';
    backgroundColor = '#eff6ff';
  }

  return {
    p: 2,
    mb: 2,
    borderRadius: 1,
    border: `2px solid ${borderColor}`,
    backgroundColor,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: isCorrect === null ? '#cbd5e1' : borderColor,
    },
  };
};

export const fabStyle: SxProps<Theme> = {
  position: 'fixed',
  bottom: { xs: 24, md: 40 },
  right: { xs: 24, md: 40 },
  backgroundColor: '#3b82f6',
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'none',
  px: 3,
  py: 1.5,
  borderRadius: 8,
  boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 8px 10px -6px rgba(59, 130, 246, 0.3)',
  '&:hover': {
    backgroundColor: '#2563eb',
    boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.2)',
  },
};
