import React, { useState } from "react";
import { auth, sendPasswordResetEmail } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css"; // Importing CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendResetEmail = async () => {
    if (!email) {
      setMessage("⚠️ Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset email sent! Check your inbox.");
      setLoading(false);
    } catch (error) {
      setMessage("❌ Error: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Reset Password</h2>
        <p>Enter your registered Email ID</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={handleSendResetEmail} disabled={loading} className="send-btn">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && <p className="info-message">{message}</p>}

        <p className="resend-text">
          Didn't receive it? <span onClick={handleSendResetEmail} className="resend-link">Resend</span>
        </p>

        <p className="back-text">
          Back to <a href="/login" className="back-link">Login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;