import React, { useState, useEffect } from "react";
import { auth, createUserWithEmailAndPassword, sendEmailVerification } from "./firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [popup, setPopup] = useState(false); // Popup state
  const [waitingForVerification, setWaitingForVerification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerification = setInterval(async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload(); 
        if (auth.currentUser.emailVerified) {
          navigate("/");
          clearInterval(checkVerification);
        }
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(checkVerification);
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check if username is unique
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setError("Username already exists. Please choose a different username.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username,
        email,
      });

      // Send Email Verification
      await sendEmailVerification(user);
      setPopup(true); // Show verification popup
      setWaitingForVerification(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister} className="auth-form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit" disabled={waitingForVerification}>
          {waitingForVerification ? "Waiting for Verification..." : "Register"}
        </button>
      </form>

      {popup && (
        <div className="popup">
          <p>✅ A verification email has been sent. Please check your inbox.</p>
          <p>Once verified, you'll be redirected to the home page automatically.</p>
        </div>
      )}

      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Register;