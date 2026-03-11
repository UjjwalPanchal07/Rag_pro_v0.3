import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadModal from "../components/UploadModal";
import RFPSelector from "../components/RFPSelector";
import "../App.css";

function BatchQueryProcessing() {

  const [rfpId, setRfpId] = useState("");
  const [file, setFile] = useState(null);
  const [openUpload, setOpenUpload] = useState(false);

  const [resultsReady, setResultsReady] = useState(false);
  const [resultsBlob, setResultsBlob] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setOpenUpload(false);
  };

  const handleProcess = async () => {

    if (!rfpId) {
      alert("Please select RFP");
      return;
    }

    if (!file) {
      alert("Please upload Excel file");
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();
      formData.append("file", file);
      formData.append("rfp_id", rfpId);

      const response = await fetch(
        "http://127.0.0.1:8000/batch_query",
        {
          method:"POST",
          body:formData
        }
      );

      if (!response.ok) {
        throw new Error("Processing failed");
      }

      const blob = await response.blob();

      setResultsBlob(blob);
      setResultsReady(true);

    } catch(error) {

      console.error(error);
      alert("Batch processing failed");

    }

    setLoading(false);

  };

  const handleDownload = () => {

    if (!resultsBlob) return;

    const url = window.URL.createObjectURL(resultsBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "rfp_answers.xlsx";

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

  };

  return (

    <div>

      <Navbar/>

      <div className="hero-parent">

        <div className="hero-glow"></div>

        <div className="hero-child batch-card">

          <h2 className="search-title">
            Fill RFP (Batch Processing)
          </h2>

          <p className="search-subtitle">
            Upload Excel questions and generate answers automatically.
          </p>

          <RFPSelector
            rfpId={rfpId}
            setRfpId={setRfpId}
          />

          <button
            className="search-button"
            onClick={()=>setOpenUpload(true)}
          >
            Upload Excel File
          </button>

          {file && (
            <p className="uploaded-file">
              Uploaded: {file.name}
            </p>
          )}

          <button
            className="search-button"
            onClick={handleProcess}
            disabled={loading}
          >
            {loading ? "Processing ⏳" : "Process Questions"}
          </button>

          {resultsReady && (

            <>
            
            <p className="success-msg">
              ✔ Answers generated successfully
            </p>

            <button
              className="download-button"
              onClick={handleDownload}
            >
              Download Results
            </button>

            </>

          )}

        </div>

      </div>

      <UploadModal
        open={openUpload}
        handleClose={()=>setOpenUpload(false)}
        onFileSelect={handleFileSelect}
      />

    </div>

  );

}

export default BatchQueryProcessing;