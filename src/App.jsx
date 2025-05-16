import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import TrafficMap from "./TrafficMap";
import TrafficAnalysis from "./TrafficAnalysis";
import Events from "./Events";
import Feedback from "./Feedback";
import Analytics from "./Analytics";
import Footer from "./Footer";
import Home from "./Home";
import WasteCollectionBooking from "./WasteCollectionBooking";
import PublicTransportManagement from "./PublicTransportManagement";
import Login from "./Login";
import Register from "./Register";
import ProfileDropdown from "./ProfileDropdown";
import ViewRoute from "./ViewRoute";
import ForgotPassword from "./ForgotPassword";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/traffic">TrafficMap</Link>
            <Link to="/traffic-analysis">Traffic Analysis</Link>
            <Link to="/waste">WasteCollectionBooking</Link>
            <Link to="/events">Events</Link>
            <Link to="/transport">PublicTransportManagement</Link>
            <Link to="/feedback">Feedback</Link>
            <ProfileDropdown user={user} />
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/traffic" element={<TrafficMap />} />
            <Route path="/traffic-analysis" element={<TrafficAnalysis />} />
            <Route path="/waste" element={<WasteCollectionBooking />} />
            <Route path="/events" element={<Events />} />
            <Route path="/transport" element={<PublicTransportManagement />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/view-route" element={<ViewRoute />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;