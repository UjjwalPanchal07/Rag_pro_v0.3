import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UploadModal from "../components/UploadModal";
import { FiSearch, FiFileText } from "react-icons/fi";
import "../App.css";

function Home() {

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const openUploadModal = () => {
    setOpenModal(true);
  };

  const closeUploadModal = () => {
    setOpenModal(false);
  };

  return (

    <div>

      <Navbar openUploadModal={openUploadModal} />

      <div className="hero-parent">

        <div className="hero-glow"></div>

        <div className="hero-child">

          <div className="hero-left">

            <h1 className="prism-title">
              <span className="gradient-text prism-container">
                PRISM
                <img src="/logo1.png" alt="logo" className="prism-rotate"/>
              </span>
            </h1>

            <h2 className="hero-heading">

              <span className="word w2">Boost</span>
              <span className="word w3">Your</span>
              <span className="word gradient-text w4">RFP Response</span>

              <br/>

              <span className="word w5">Simplify</span>
              <span className="word w6">Your</span>
              <span className="word w7">Work</span>
              <span className="word w8">With</span>

              <br/>

              <span className="word w9">PRISM</span>

            </h2>

            <p className="hero-description">
              Profinch RFP Response Intelligence & Solution Manager.
            </p>

            <div className="hero-buttons">

              <button
                className="btn-primary"
                onClick={() => navigate("/search")}
              >
                <FiSearch /> Search Question
              </button>

              <button
                className="btn-outline"
                onClick={() => navigate("/batch")}
              >
                <FiFileText /> Fill RFP
              </button>

            </div>

          </div>

        </div>

      </div>

      <UploadModal
        open={openModal}
        handleClose={closeUploadModal}
      />

    </div>

  );

}

export default Home;