import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Snackbar, Alert } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { pageContainerStyle, footerStyle } from '../../styles/home/HomeStyles';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorks from './HowItWorks';
import AuthModal from './AuthModal';

const HomePage: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleOpenAuth = () => setIsAuthOpen(true);
  const handleCloseAuth = () => setIsAuthOpen(false);

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setErrorMsg(error);
      
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('error');
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleCloseError = () => {
    setErrorMsg(null);
  };

  return (
    <Box sx={pageContainerStyle}>
      <HeroSection onGetStarted={handleOpenAuth} />
      
      <FeaturesSection />
      
      <HowItWorks />

      <Box sx={footerStyle}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            © {new Date().getFullYear()} Course Architect AI. Built for the future of learning.
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mt: 1 }}>
            Focus on quality over quantity. Limit of 5 active courses per account.
          </Typography>
        </Container>
      </Box>

      <AuthModal open={isAuthOpen} onClose={handleCloseAuth} />

      <Snackbar 
        open={!!errorMsg} 
        autoHideDuration={10000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleCloseError} sx={{ borderRadius: 2, width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
