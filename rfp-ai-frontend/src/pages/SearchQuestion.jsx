import { useState } from "react";
import Navbar from "../components/Navbar";
import RFPSelector from "../components/RFPSelector";
import { FiSearch } from "react-icons/fi";
import "../App.css";

function SearchQuestion() {

  const [question, setQuestion] = useState("");
  const [rfpId, setRfpId] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Example RFP list (replace later with backend API)
  const rfpList = [
    { id: 1, name: "Banking Core System RFP" },
    { id: 2, name: "Digital Transformation RFP" },
    { id: 3, name: "Cloud Migration RFP" }
  ];

  const handleSearch = () => {

    if (!rfpId) {
      alert("Please select an RFP");
      return;
    }

    if (!question) {
      alert("Please enter a question");
      return;
    }

    setLoading(true);

    // Temporary response (will come from backend later)
    setTimeout(() => {

      setAnswer(
        "This is a sample response from the selected RFP document. The actual answer will be retrieved from the RFP content using the AI search system."
      );

      setLoading(false);

    }, 1200);
  };

  return (
    <div>

      <Navbar />

      <div className="hero-parent">

        <div className="hero-glow"></div>

        <div className="search-card">

          <h2 className="search-title">
            Search Question
          </h2>

          <p className="search-subtitle">
            Ask a question from the selected RFP document
          </p>

          <input
            type="text"
            placeholder="Enter your question..."
            className="question-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter") handleSearch();
            }}
          />

          <div className="search-row">

            <RFPSelector
              rfpId={rfpId}
              setRfpId={setRfpId}
              rfpList={rfpList}
            />

            <button
              className="search-button"
              onClick={handleSearch}
            >
              <FiSearch /> Search
            </button>

          </div>

          <div className="answer-box">

            <div className="answer-title">
              ANSWER
            </div>

            {loading ? (

              <p>🤖 Searching the RFP document...</p>

            ) : answer ? (

              <>
                <div className="question-label">
                  Your Question
                </div>

                <div className="question-text">
                  {question}
                </div>

                <div className="answer-label">
                  AI Answer
                </div>

                <p>{answer}</p>
              </>

            ) : (

              <p className="answer-hint">
                Start by typing your question and selecting an RFP document.
              </p>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default SearchQuestion;