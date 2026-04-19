import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { pageContainerStyle, footerStyle } from '../../styles/home/HomeStyles';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorks from './HowItWorks';
import AuthModal from './AuthModal';

const HomePage: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleOpenAuth = () => setIsAuthOpen(true);
  const handleCloseAuth = () => setIsAuthOpen(false);

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
    </Box>
  );
};

export default HomePage;
