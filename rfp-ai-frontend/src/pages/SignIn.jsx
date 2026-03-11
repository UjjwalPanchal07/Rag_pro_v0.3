import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../App.css";

const SignIn = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    return email.endsWith("@profinch.com");
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid @profinch.com email address.");
      valid = false;
    } else setEmailError("");

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters and contain letters and numbers."
      );
      valid = false;
    } else setPasswordError("");

    if (valid) console.log("Login success");
  };

  return (

    <div>

      <Navbar />

      <div className="hero-parent">

        <div className="hero-glow"></div>

        <Card className="auth-card">

          <CardContent>

            <Typography
              variant="h4"
              align="center"
              fontWeight={700}
              mb={1}
              className="auth-title"
            >
              Welcome Back
            </Typography>

            <Typography align="center" color="text.secondary" mb={2}>
              Sign in to access PRISM
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>

              <TextField
                label="Email ID"
                fullWidth
                margin="dense"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="dense"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.4,
                  fontWeight: 600,
                  background: "linear-gradient(90deg,#7c3aed,#6366f1)"
                }}
              >
                Sign In
              </Button>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2
                }}
              >

                <Link href="#" underline="hover">
                  Forgot Password?
                </Link>

                <Button
                  variant="text"
                  onClick={() => navigate("/signup")}
                  sx={{
                    textTransform: "none",
                    color: "#7c3aed"
                  }}
                >
                  Sign Up
                </Button>

              </Box>

            </Box>

          </CardContent>

        </Card>

      </div>

    </div>

  );
};

export default SignIn;