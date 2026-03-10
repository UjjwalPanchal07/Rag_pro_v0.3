// import React, { useCallback, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   CircularProgress
// } from "@mui/material";

// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import { useDropzone } from "react-dropzone";

// const UploadRFP = () => {

//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {

//     if (rejectedFiles.length > 0) {
//       alert("Only .xlsx files are supported");
//       return;
//     }

//     setFiles(prev => [...prev, ...acceptedFiles]);

//   }, []);

//   const { getRootProps, getInputProps, open } = useDropzone({
//     onDrop,
//     noClick: true,
//     accept: {
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
//     }
//   });

//   const removeFile = (index) => {
//     setFiles(files.filter((_, i) => i !== index));
//   };

//   const handleClear = () => {
//     setFiles([]);
//   };

//   const handleUpload = () => {

//     if (files.length === 0) return;

//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       alert("Files uploaded successfully");
//       setFiles([]);
//     }, 2000);
//   };

//   return (

//     <Box
//       sx={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column"
//       }}
//     >

//       {/* HEADER */}

//       <Typography variant="h6" sx={{ fontWeight: 600 }}>
//         Upload Files
//       </Typography>

//       <Typography
//         variant="body2"
//         sx={{ color: "gray", mb: 2 }}
//       >
//         Only .xlsx files supported
//       </Typography>


//       {/* DROP AREA */}

//       <Box
//         {...getRootProps()}
//         sx={{
//           border: "2px dashed #cbd5e1",
//           borderRadius: 2,
//           padding: 3,
//           textAlign: "center",
//           backgroundColor: "#fafafa"
//         }}
//       >

//         <input {...getInputProps()} />

//         <CloudUploadIcon sx={{ fontSize: 40, color: "#64748b" }} />

//         <Typography sx={{ mt: 1 }}>
//           Choose a file or drag & drop it here
//         </Typography>

//         <Typography
//           variant="body2"
//           sx={{ color: "gray", mb: 1 }}
//         >
//           only .xlsx supported
//         </Typography>

//         <Button
//           variant="outlined"
//           onClick={open}
//           sx={{
//             textTransform: "none",
//             borderRadius: "8px"
//           }}
//         >
//           Browse File
//         </Button>

//       </Box>


//       {/* FILE LIST */}

//       {files.length > 0 && (

//         <Box
//           sx={{
//             flex: 1,
//             overflowY: "auto",
//             mt: 2
//           }}
//         >

//           <Typography
//             variant="body2"
//             sx={{ fontWeight: 600, mb: 1 }}
//           >
//             Selected Files ({files.length})
//           </Typography>

//           <List>

//             {files.map((file, index) => (

//               <ListItem
//                 key={index}
//                 secondaryAction={
//                   <IconButton
//                     onClick={() => removeFile(index)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 }
//               >

//                 <ListItemText
//                   primary={file.name}
//                   secondary={`${(file.size / 1024).toFixed(2)} KB`}
//                 />

//               </ListItem>

//             ))}

//           </List>

//         </Box>

//       )}


//       {/* BUTTONS */}

//       <Box
//         sx={{
//           display: "flex",
//           gap: 2,
//           mt: 2
//         }}
//       >

//         <Button
//           variant="contained"
//           startIcon={
//             loading
//               ? <CircularProgress size={20} sx={{ color: "white" }} />
//               : <FileUploadIcon />
//           }
//           onClick={handleUpload}
//           disabled={files.length === 0 || loading}
//           fullWidth
//           sx={{
//             backgroundColor: "#6366F1",
//             borderRadius: "8px",
//             textTransform: "none"
//           }}
//         >
//           {loading ? "Uploading..." : "Upload"}
//         </Button>

//         <Button
//           variant="outlined"
//           fullWidth
//           onClick={handleClear}
//           sx={{
//             borderRadius: "8px",
//             textTransform: "none"
//           }}
//         >
//           Clear
//         </Button>

//       </Box>

//     </Box>
//   );
// };

// export default UploadRFP;



import React, { useCallback, useState } from "react";
import { Box, Typography, Button, Paper, CircularProgress, List, ListItem, ListItemText, IconButton, LinearProgress, Snackbar, Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";

const UploadRFP = () => {

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
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
    }
  });

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setFiles([]);
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    setLoading(true);
    setProgress(0);
    setUploadSuccess(false);

    const totalFiles = files.length;
    const increment = 100 / (totalFiles * 10); // Divide progress among files

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + increment;
        if (newProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          setFiles([]);
          setUploadSuccess(true);
          setSuccessMessage("Files uploaded successfully");
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  return (
    <Paper
  elevation={0}
  sx={{
    width: 420,
    padding: "28px 32px",
    borderRadius: 3,
    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(147, 112, 219, 0.08) 100%)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(99, 102, 241, 0.1)",
    maxHeight: "80vh",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "8px"
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(99, 102, 241, 0.05)",
      borderRadius: "10px"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(99, 102, 241, 0.3)",
      borderRadius: "10px",
      "&:hover": {
        background: "rgba(99, 102, 241, 0.5)"
      }
    }
  }}
>

      {/* Header */}

      <Typography
        variant="h5"
        sx={{ fontWeight: 600 }}
      >
        Upload Files
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "gray", mb: 3 }}
      >
        Select and upload the files of your choice
      </Typography>

      {/* Drop Area */}

      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #cbd5e1",
          borderRadius: 2,
          padding: 3,
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "#fafafa"
        }}
      >

        <input {...getInputProps()} />

        <CloudUploadIcon sx={{ fontSize: 40, color: "#64748b" }} />

        <Typography sx={{ mt: 2 }}>
          Choose a file or drag & drop it here
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "gray", mb: 2 }}
        >
          only .xlsx supported
        </Typography>

        <Button
          variant="outlined"
          onClick={open}
          sx={{
            borderRadius: "8px",
            padding: "10px 28px",
            fontWeight: 600,
            fontSize: "14px",
            textTransform: "none",
            borderColor: "#6366F1",
            color: "#6366F1",
            "&:hover": {
              borderColor: "#4F46E5",
              backgroundColor: "rgba(99, 102, 241, 0.08)"
            }
          }}
        >
          Browse File
        </Button>

      </Box>

      {/* Upload Progress */}
      {loading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
          <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
            Uploading... {Math.round(progress)}%
          </Typography>
        </Box>
      )}

      {/* Selected Files */}

      {files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
            Selected Files ({files.length})
          </Typography>
          <List sx={{ maxHeight: 200, overflow: "auto", backgroundColor: "rgba(255,255,255,0.5)", borderRadius: 2 }}>
            {files.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFile(index)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
                sx={{ paddingY: 1 }}
              >
                <ListItemText
                  primary={file.name}
                  primaryTypographyProps={{ variant: "body2" }}
                  secondary={`${(file.size / 1024).toFixed(2)} KB`}
                  secondaryTypographyProps={{ variant: "caption" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Buttons */}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 3
        }}
      >

        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : <FileUploadIcon />}
          onClick={handleUpload}
          disabled={files.length === 0 || loading}
          sx={{
            backgroundColor: "#6366F1",
            color: "white",
            borderRadius: "8px",
            padding: "10px 28px",
            fontWeight: 600,
            fontSize: "16px",
            textTransform: "none",
            boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
            "&:hover": { 
              backgroundColor: "#4F46E5",
              boxShadow: "0 6px 20px rgba(99, 102, 241, 0.6)"
            },
            "&:disabled": {
              backgroundColor: "#A5A6F6",
              color: "white"
            }
          }}
          fullWidth
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleClear}
          sx={{
            borderRadius: "8px",
            padding: "10px 28px",
            fontWeight: 600,
            fontSize: "14px",
            textTransform: "none",
            borderColor: "#6366F1",
            color: "#6366F1",
            "&:hover": {
              borderColor: "#4F46E5",
              backgroundColor: "rgba(99, 102, 241, 0.08)"
            }
          }}
        >
          Clear
        </Button>

      </Box>

      <Snackbar
        open={uploadSuccess}
        autoHideDuration={4000}
        onClose={() => setUploadSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setUploadSuccess(false)} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>

    </Paper>
  );
};

export default UploadRFP;