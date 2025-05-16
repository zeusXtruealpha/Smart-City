import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./Home.css";



const Home = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();



  const services = [

    { name: "Real-Time Traffic Monitoring", path: "/traffic" },

    { name: "Waste Collection Management", path: "/waste" },

    { name: "City Events Management", path: "/events" },

    { name: "Public Transport Management", path: "/transport" },

    { name: "Citizen Feedback", path: "/feedback" },

    { name: "Analytics", path: "/analytics" },

  ];



  const handleSearch = (e) => {

    e.preventDefault();

    const matchedService = services.find(

      (service) => service.name.toLowerCase() === searchQuery.toLowerCase()

    );



    if (matchedService) {

      document.body.classList.add("fade-out"); // Add smooth fade-out effect

      setTimeout(() => {

        navigate(matchedService.path);

        document.body.classList.remove("fade-out"); // Remove effect after navigation

      }, 700);

    } else {

      alert("Service not found. Try: Traffic, Waste, Events, Transport, Feedback, or Analytics.");

    }

  };



  const handleInputChange = (e) => {

    const query = e.target.value.toLowerCase();

    setSearchQuery(e.target.value);



    if (query) {

      const filtered = services

        .filter((service) => service.name.toLowerCase().includes(query))

        .map((service) => service.name);

      setSuggestions(filtered);

    } else {

      setSuggestions([]);

    }

  };



  return (

    <div className="home-container">

      {/* Search Bar */}

      <div className="search-container">

        <form onSubmit={handleSearch} className="search-form">

          <input

            type="text"

            placeholder="🔍 Search for a service..."

            value={searchQuery}

            onChange={handleInputChange}

            className="search-input"

          />

          <button type="submit" className="search-button">Search</button>

        </form>

        {suggestions.length > 0 && (

          <ul className="search-suggestions">

            {suggestions.map((suggestion, index) => (

              <li key={index} onClick={() => setSearchQuery(suggestion)}>

                {suggestion}

              </li>

            ))}

          </ul>

        )}

      </div>



      {/* Background Video */}

      <div className="video-container">

        <video autoPlay loop muted>

          <source src="/videos/smart_city_video.mp4" type="video/mp4" />

          Your browser does not support the video tag.

        </video>

      </div>



      {/* Sliding Features Section */}

      <div className="sliding-banner">

        <div className="slides">

          <div className="slide" style={{ backgroundImage: "url('/images/traffic.jpg')" }}>

            🚦 Real-Time Traffic Monitoring

          </div>

          <div className="slide" style={{ backgroundImage: "url('/images/waste.jpg')" }}>

            🗑 Waste Collection Management

          </div>

          <div className="slide" style={{ backgroundImage: "url('/images/events.jpg')" }}>

            🎭 City Events Management

          </div>

          <div className="slide" style={{ backgroundImage: "url('/images/transport.jpg')" }}>

            🚌 Public Transport Management

          </div>

          <div className="slide" style={{ backgroundImage: "url('/images/feedback.jpg')" }}>

            📢 Citizen Feedback & Engagement

          </div>

        </div>

      </div>

    </div>

  );

};



export default Home;