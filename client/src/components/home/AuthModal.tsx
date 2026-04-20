import React, { useState } from 'react';
import { Modal, Box, IconButton, Fade, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { modalBoxStyle, modalCloseButtonStyle } from '../../styles/home/AuthModalStyles';
import { LoginForm } from '../login';
import { RegisterForm } from '../register';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [view, setView] = useState<'login' | 'register'>('login');

  const toggleView = () => {
    setView((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  React.useEffect(() => {
    if (!open) {
      setTimeout(() => setView('login'), 300);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: { backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)' }
        },
      }}
    >
      <Fade in={open}>
        <Box sx={modalBoxStyle}>
          <IconButton onClick={onClose} sx={modalCloseButtonStyle}>
            <CloseIcon />
          </IconButton>

          {view === 'login' ? (
            <LoginForm onToggleRegister={toggleView} />
          ) : (
            <RegisterForm onToggleLogin={toggleView} />
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default AuthModal;
