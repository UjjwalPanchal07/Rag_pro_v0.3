import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (

    <Container sx={{ textAlign: "center", mt: 10 }}>

      <Typography variant="h4">
        Welcome to RFP AI Retrieval System
      </Typography>

      <Button
        variant="contained"
        sx={{ m: 2 }}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>

      <Button
        variant="outlined"
        sx={{ m: 2 }}
        onClick={() => navigate("/signup")}
      >
        Signup
      </Button>

    </Container>

  );

}

export default Home;