import React, { useState } from "react";
import { auth, signInWithEmailAndPassword, sendEmailVerification } from "./firebase";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const isEmail = usernameOrEmail.includes("@");
      let email = usernameOrEmail;

      if (!isEmail) {
        // Fetch email from Firestore using username
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", usernameOrEmail));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("Username or email not found.");
          setLoading(false);
          return;
        }

        email = querySnapshot.docs[0].data().email;
      }

      // Authenticate the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if email is verified
      if (!user.emailVerified) {
        setError("Email not verified. Please check your inbox for OTP.");
        await sendEmailVerification(user);
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Forgot Password? <a href="/forgot-password">Reset here</a>
      </p>

      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;