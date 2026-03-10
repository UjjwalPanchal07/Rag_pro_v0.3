import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = () => {

    const user = { email, password };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup successful");

    navigate("/login");

  };

  return (

    <Container maxWidth="sm" sx={{ mt: 5 }}>

      <Typography variant="h5">Signup</Typography>

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" fullWidth onClick={signup}>
        Signup
      </Button>

    </Container>

  );

}

export default Signup;