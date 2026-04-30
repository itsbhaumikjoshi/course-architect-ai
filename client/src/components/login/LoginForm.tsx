import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Divider, Alert, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { formContainerStyle, formTextFieldStyle, submitButtonStyle } from '../../styles/login/LoginStyles';
import { googleOAuthUrl } from '../../helpers';
import { login, fetchUserData } from '../../adapters';
import { useAuth } from '../../context/AuthContext';

interface Props {
  onToggleRegister: () => void;
}

const TEST_EMAIL = import.meta.env.VITE_TEST_EMAIL;
const TEST_PASSWORD = import.meta.env.VITE_TEST_PASSWORD;

const LoginForm: React.FC<Props> = ({ onToggleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const performLogin = async (loginEmail: string, loginPass: string) => {
    setError(null);
    setLoading(true);
    try {
      await login({ email: loginEmail, password: loginPass });
      const data = await fetchUserData();
      if (data) {
        setUser(data);
        navigate('/courses');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    performLogin(email, password);
  };

  const handleDevLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setEmail(TEST_EMAIL);
    setPassword(TEST_PASSWORD);
    performLogin(TEST_EMAIL, TEST_PASSWORD);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
        Welcome back
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Please enter your details to sign in.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" sx={formContainerStyle} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email address"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={formTextFieldStyle}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={formTextFieldStyle}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={loading}
          sx={submitButtonStyle}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
        <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'center' }}>
          <Button
            size="small"
            onClick={handleDevLogin}
            disabled={loading}
            sx={{
              textTransform: 'none',
              color: '#64748b',
              fontWeight: 500,
              fontSize: '0.85rem',
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#3b82f6'
              }
            }}
          >
            Log in with the demo test account.
          </Button>
        </Box>
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
            sx={{ fontWeight: 600, mt: -0.5, color: 'primary.main', textDecoration: 'none' }}
          >
            Create an account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
