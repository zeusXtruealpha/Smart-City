import React, { useState } from "react";
import { auth, signOut } from "./firebase";
import { useNavigate } from "react-router-dom";
import"./ProfileDropdown.css"
import "./App.css";

const ProfileDropdown = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowPopup(true); // Show logout popup
      setTimeout(() => {
        setShowPopup(false); // Hide popup after 5 seconds, but stay on the home page
      }, 5000);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <div className="navbar-profile" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
        <div className="profile-circle">{user ? user.email[0].toUpperCase() : "A"}</div>
        {showDropdown && (
          <div className="profile-dropdown">
            {user ? (
              <>
                <p>Welcome, {user.displayName || user.email.split("@")[0]}</p>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Logout Popup */}
      {showPopup && (
        <>
          <div className="popup-overlay"></div>
          <div className="popup-content">
            <p>✅ Logged out successfully!</p>
            <p>Do you want to login again?</p>
            <button onClick={() => navigate("/login")}>Login Again</button>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileDropdown;