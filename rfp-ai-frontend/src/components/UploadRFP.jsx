import React, { useCallback, useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  LinearProgress,
  Snackbar,
  Alert
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDropzone } from "react-dropzone";

const UploadRFP = ({ onFileSelect }) => {

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {

    if (rejectedFiles.length > 0) {
      alert("Only .xlsx files are supported");
      return;
    }

    setFiles(prev => [...prev, ...acceptedFiles]);

  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
    }
  });

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setFiles([]);
  };

  const handleUpload = () => {

    if (files.length === 0) return;

    setLoading(true);
    setProgress(0);
    setUploadSuccess(false);

    const interval = setInterval(() => {

      setProgress(prev => {

        const newProgress = prev + 10;

        if (newProgress >= 100) {

          clearInterval(interval);

          setLoading(false);
          setUploadSuccess(true);
          setSuccessMessage("File uploaded successfully");

          // send file to parent AFTER upload finished
          if (onFileSelect) {
            onFileSelect(files[0]);
          }

          setFiles([]);

          return 100;
        }

        return newProgress;

      });

    }, 200);

  };

  return (

    <Box
      sx={{
        width: 420,
        padding: "28px 32px",
        borderRadius: 3,
        background:
          "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(147,112,219,0.08) 100%)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(99,102,241,0.1)",
        maxHeight: "80vh",
        overflow: "auto",

        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-track": {
          background: "rgba(99,102,241,0.05)"
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(99,102,241,0.3)"
        }
      }}
    >

      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Upload Excel File
      </Typography>

      <Typography variant="body2" sx={{ color: "gray", mb: 3 }}>
        Only .xlsx files supported
      </Typography>

      {/* DROP AREA */}

      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #cbd5e1",
          borderRadius: 2,
          padding: 3,
          textAlign: "center",
          backgroundColor: "#fafafa"
        }}
      >

        <input {...getInputProps()} />

        <CloudUploadIcon sx={{ fontSize: 40, color: "#64748b" }} />

        <Typography sx={{ mt: 1 }}>
          Choose a file or drag & drop it here
        </Typography>

        <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
          only .xlsx supported
        </Typography>

        <Button
          variant="outlined"
          onClick={open}
          sx={{ textTransform: "none", borderRadius: "8px" }}
        >
          Browse File
        </Button>

      </Box>

      {/* PROGRESS BAR */}

      {loading && (
        <Box sx={{ mt: 2 }}>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 8, borderRadius: 4 }}
          />

          <Typography
            variant="body2"
            sx={{ mt: 1, textAlign: "center" }}
          >
            Uploading... {Math.round(progress)}%
          </Typography>

        </Box>
      )}

      {/* FILE LIST */}

      {files.length > 0 && (

        <Box sx={{ mt: 2 }}>

          <Typography
            variant="body2"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Selected Files ({files.length})
          </Typography>

          <List>

            {files.map((file, index) => (

              <ListItem
                key={index}
                secondaryAction={
                  <IconButton onClick={() => removeFile(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >

                <ListItemText
                  primary={file.name}
                  secondary={`${(file.size / 1024).toFixed(2)} KB`}
                />

              </ListItem>

            ))}

          </List>

        </Box>

      )}

      {/* BUTTONS */}

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>

        <Button
          variant="contained"
          startIcon={
            loading
              ? <CircularProgress size={20} sx={{ color: "white" }} />
              : <FileUploadIcon />
          }
          onClick={handleUpload}
          disabled={files.length === 0 || loading}
          fullWidth
          sx={{
            backgroundColor: "#6366F1",
            borderRadius: "8px",
            textTransform: "none"
          }}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleClear}
          sx={{ borderRadius: "8px", textTransform: "none" }}
        >
          Clear
        </Button>

      </Box>

      {/* SUCCESS MESSAGE */}

      <Snackbar
        open={uploadSuccess}
        autoHideDuration={4000}
        onClose={() => setUploadSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setUploadSuccess(false)}
          severity="success"
        >
          {successMessage}
        </Alert>
      </Snackbar>

    </Box>

  );

};

export default UploadRFP;