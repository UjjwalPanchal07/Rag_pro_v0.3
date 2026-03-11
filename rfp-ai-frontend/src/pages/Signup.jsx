import React, { useState } from "react";
import Navbar from "../components/Navbar";
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

const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
              mb={2}
              className="auth-title"
            >
              Create Account
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>

              <TextField
                label="Username"
                name="username"
                fullWidth
                margin="dense"
                size="small"
                value={formData.username}
                onChange={handleChange}
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="dense"
                size="small"
                value={formData.password}
                onChange={handleChange}
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

              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                margin="dense"
                size="small"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <TextField
                label="E-mail Address"
                name="email"
                fullWidth
                margin="dense"
                size="small"
                value={formData.email}
                onChange={handleChange}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.3,
                  fontWeight: 600,
                  background: "linear-gradient(90deg,#7c3aed,#6366f1)"
                }}
              >
                Sign Up
              </Button>

              <Typography align="center" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link href="/signin" underline="hover">
                  Sign In
                </Link>
              </Typography>

            </Box>

          </CardContent>

        </Card>

      </div>

    </div>

  );
};

export default SignUp;