import React from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';

const Register = () => (
  <Box sx={{ maxWidth: 300, mx: 'auto', mt: 8, textAlign: 'center' }}>
    <Typography variant="h4" sx={{ mb: 4, fontFamily: 'cursive' }}>
      ICHGRAM
    </Typography>
    <TextField fullWidth label="Email" sx={{ mb: 2 }} />
    <TextField fullWidth label="Username" sx={{ mb: 2 }} />
    <TextField fullWidth type="password" label="Password" sx={{ mb: 2 }} />
    <Button fullWidth variant="contained" color="primary" sx={{ mb: 2 }}>
      Sign up
    </Button>
    <Typography variant="body2" sx={{ mt: 4 }}>
      Already have an account?{' '}
      <Link href="#" >
        Log in
      </Link>
    </Typography>
  </Box>
);

export default Register;