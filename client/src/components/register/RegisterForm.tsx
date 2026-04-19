import React from 'react';
import { Box, Typography, TextField, Button, Link, Grid, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { formContainerStyle, formTextFieldStyle, submitButtonStyle } from '../../styles/register/RegisterStyles';
import { googleOAuthUrl } from '../../helpers';

interface Props {
  onToggleLogin: () => void;
}

const RegisterForm: React.FC<Props> = ({ onToggleLogin }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
        Create an account
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Start your AI-powered learning journey today.
      </Typography>

      <Box component="form" sx={formContainerStyle} onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              sx={formTextFieldStyle}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              sx={formTextFieldStyle}
            />
          </Grid>
        </Grid>
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
          Register
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
