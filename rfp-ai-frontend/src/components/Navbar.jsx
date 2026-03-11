import { Link } from "react-router-dom";
import { FiHome, FiUpload, FiLogIn, FiUserPlus } from "react-icons/fi";
import "../App.css";

function Navbar({ openUploadModal }) {
  return (
    <nav className="navbar">

      <div className="navbar-left">
        <img
          src="/profinch-logo.png"
          alt="Profinch Logo"
          className="logo-image"
        />
      </div>

      <div className="navbar-right">

        <Link to="/">
          <FiHome />
          Home
        </Link>

        <button
          className="nav-link-btn"
          onClick={openUploadModal}
        >
          <FiUpload />
          Upload RFP
        </button>

        <Link to="/login">
          <FiLogIn />
          Login
        </Link>

        <Link to="/signup" className="signup-btn">
          <FiUserPlus />
          Sign Up
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;