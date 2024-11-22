import { Box, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/RTKqueries/authQueries";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [register, { isLoading, error, isSuccess }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const profilePicture = "/client/src/assets/image.png";

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
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("fullName", fullName);

    try {
      const response = await register(formData).unwrap();

      if (response) {
        setEmail("");
        setPassword("");
        setUsername("");
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };
  return (
    <Box sx={{ maxWidth: 300, mx: "auto", mt: 8, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 4, fontFamily: "cursive" }}>
        ICHGRAM
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          label="Email"
          sx={{ mb: 2 }}
        />
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          label="Username"
          sx={{ mb: 2 }}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          type="password"
          label="Password"
          sx={{ mb: 2 }}
        />
        <TextField
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          label="Name LastName"
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
        >
          Sign up
        </Button>
        <Typography sx={{ color: "red" }}>
          {error ? errorMessage : ""}
        </Typography>
      </form>
      <Typography variant="body2" sx={{ mt: 4 }}>
        Already have an account?{" "}
        <Link style={{ color: "blue" }} to={"/login"}>
          Log in
        </Link>
      </Typography>
    </Box>
  );
};
export default Register;
