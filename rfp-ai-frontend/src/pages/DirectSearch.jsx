import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem
} from "@mui/material";

import API, { fetchRFPs } from "../services/api";
import Loader from "../components/Loader";

function DirectSearch() {

  const [rfpList, setRfpList] = useState([]);
  const [rfpId, setRfpId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRFPs().then(setRfpList);
  }, []);

  const search = async () => {

    setLoading(true);

    const formData = new FormData();
    formData.append("rfp_id", rfpId);
    formData.append("question", question);

    const res = await API.post("/search/single", formData);

    setAnswer(res.data.answer);

    setLoading(false);

  };

  return (

    <Container maxWidth="sm" sx={{ mt: 5 }}>

      <Card>

        <CardContent>

          <Typography variant="h5">Direct Search</Typography>

          <Select
            fullWidth
            value={rfpId}
            onChange={(e) => setRfpId(e.target.value)}
            displayEmpty
            sx={{ mt: 2 }}
          >

            <MenuItem value="">Select RFP</MenuItem>

            {rfpList.map((rfp) => (
              <MenuItem key={rfp} value={rfp}>
                {rfp}
              </MenuItem>
            ))}

          </Select>

          <TextField
            fullWidth
            label="Question"
            sx={{ mt: 2 }}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={search}
          >
            Search
          </Button>

          {loading && <Loader />}

          {answer && (
            <Typography sx={{ mt: 3 }}>
              <strong>Answer:</strong> {answer}
            </Typography>
          )}

        </CardContent>

      </Card>

    </Container>

  );

}

export default DirectSearch;