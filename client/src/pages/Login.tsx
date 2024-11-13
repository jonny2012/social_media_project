import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useGetLoginUserMutation } from "./../redux/RTKqueries/authQueries" // Import the login mutation hook
import { setToken } from '../redux/slices/authSlice'; // Import the action to set token in Redux

const Login = () => {
  const dispatch = useDispatch();
  const [login, { data, isLoading, error }] = useGetLoginUserMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      console.log(result)
      dispatch(setToken(result.token as unknown as string)); // Save token in Redux and localStorage
      localStorage.setItem("userId", result.user.id as string)
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  console.log(email,password)

  return (
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 4, fontFamily: 'cursive' }}>
        ICHGRAM
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Username, or email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            Login failed. Please check your credentials.
          </Typography>
        )}
      </form>
      <Link href="#" variant="body2" sx={{ display: 'block', mt: 2 }}>
        Forgot password?
      </Link>
      <Typography variant="body2" sx={{ mt: 4 }}>
        Don’t have an account?{' '}
        <Link href="#">
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};
export default Login