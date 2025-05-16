import React from "react";
import "./App.css"; // Ensure your CSS is applied

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We are dedicated to making our city smarter and more efficient through innovative technology.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/traffic">Traffic Monitoring</a></li>
            <li><a href="/waste">Waste Management</a></li>
            <li><a href="/events">City Events</a></li>
            <li><a href="/transport">Public Transport</a></li>
            <li><a href="/feedback">Feedback</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: contact@smartcity.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com">Facebook</a>
            <a href="https://twitter.com">Twitter</a>
            <a href="https://linkedin.com">LinkedIn</a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Subscribe to Our Newsletter</h4>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Smart City. All rights reserved.</p>
        <a href="#top" className="back-to-top">Back to Top</a>
      </div>
    </footer>
  );
};

export default Footer;