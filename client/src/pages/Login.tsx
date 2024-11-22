import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetLoginUserMutation } from "./../redux/RTKqueries/authQueries"; // Import the login mutation hook
import { setToken } from "../redux/slices/authSlice"; // Import the action to set token in Redux
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface LoginResponse {
  status: number;
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
  message?: string;
}
type ErrorType = FetchBaseQueryError | SerializedError;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [login, { data, isLoading, error }] = useGetLoginUserMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        // Handle FetchBaseQueryError
        setErrorMessage((error as any).data?.message || "An error occurred");
      } else {
        // Handle SerializedError
        setErrorMessage("A network error occurred");
      }
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result: any = await login({ email, password }).unwrap();
      if (result && result.status === 200) {
        const { token, user } = result;

        if (token && user) {
          dispatch(setToken({ token: result.token, user: result.user }));
          localStorage.setItem("userId", result.user.id as string);
          navigate("/", { replace: true });
        }
      }
    } catch (err) {
      console.debug("Login failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 300, mx: "auto", mt: 8, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 4, fontFamily: "cursive" }}>
        ICHGRAM
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
          }}
          error={!!error && errorMessage?.includes("email")}
          helperText={
            errorMessage && errorMessage.includes("email") ? errorMessage : ""
          }
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 2,
          }}
          error={!!error && errorMessage?.includes("password")}
          helperText={
            errorMessage && errorMessage.includes("password")
              ? errorMessage
              : ""
          }
        />
        {errorMessage && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            Login failed
          </Typography>
        )}
      </form>
      <Typography variant="body2" sx={{ display: "block", mt: 2 }}>
        Forgot password?
      </Typography>
      <Typography variant="body2" sx={{ mt: 4 }}>
        Don’t have an account?{" "}
        <Link style={{ color: "blue" }} to={"/register"}>
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};
export default Login;
