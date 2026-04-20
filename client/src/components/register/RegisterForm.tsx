import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Grid, Divider, Alert, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { formContainerStyle, formTextFieldStyle, submitButtonStyle } from '../../styles/register/RegisterStyles';
import { googleOAuthUrl } from '../../helpers';
import { register, fetchUserData } from '../../adapters';
import { useAuth } from '../../context/AuthContext';

interface Props {
  onToggleLogin: () => void;
}

const RegisterForm: React.FC<Props> = ({ onToggleLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ email, password, firstName, lastName });
      const data = await fetchUserData();
      if(data) {
        setUser(data);
        navigate('/courses');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
        Create an account
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Start your AI-powered learning journey today.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" sx={formContainerStyle} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={formTextFieldStyle}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={formTextFieldStyle}
            />
          </Grid>
        </Grid>
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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
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
        Register with Google
      </Button>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Already have an account?{' '}
          <Link 
            component="button" 
            variant="body2" 
            onClick={onToggleLogin}
            sx={{ fontWeight: 600, color: '#10b981', textDecoration: 'none' }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
