import React from 'react';
import { Box, Typography, TextField, Button, Link, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { formContainerStyle, formTextFieldStyle, submitButtonStyle } from '../../styles/login/LoginStyles';
import { googleOAuthUrl } from '../../helpers';

interface Props {
  onToggleRegister: () => void;
}

const LoginForm: React.FC<Props> = ({ onToggleRegister }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
        Welcome back
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Please enter your details to sign in.
      </Typography>

      <Box component="form" sx={formContainerStyle} onSubmit={(e) => e.preventDefault()}>
        <TextField
          fullWidth
          label="Email address"
          variant="outlined"
          type="email"
          sx={formTextFieldStyle}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          sx={formTextFieldStyle}
        />
        <Button 
          fullWidth 
          variant="contained" 
          type="submit"
          sx={submitButtonStyle}
        >
          Login
        </Button>
      </Box>

      <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ color: '#64748b', px: 2 }}>OR</Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={() => window.location.href = googleOAuthUrl()}
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontWeight: 'bold',
          fontSize: '1rem',
          textTransform: 'none',
          color: '#334155',
          borderColor: '#e2e8f0',
          '&:hover': {
            backgroundColor: '#f8fafc',
            borderColor: '#cbd5e1',
          }
        }}
      >
        Login with Google
      </Button>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          New here?{' '}
          <Link 
            component="button" 
            variant="body2" 
            onClick={onToggleRegister}
            sx={{ fontWeight: 600, color: '#3b82f6', textDecoration: 'none' }}
          >
            Create an account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
