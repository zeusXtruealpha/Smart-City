import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./Analytics.css";

const Analytics = () => {
  const [averages, setAverages] = useState({});
  const [search, setSearch] = useState("");
  const categories = ["traffic", "events", "analytics", "waste", "transport"];

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Listen for real-time updates from Firestore
    const unsubscribe = onSnapshot(collection(db, "analytics"), (snapshot) => {
      if (!snapshot.empty) {
        const latestData = snapshot.docs[snapshot.docs.length - 1].data();
        setAverages(latestData);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Filter graphs based on search input
  const filteredCategories = search
    ? categories.filter((cat) => cat.includes(search.toLowerCase()))
    : categories;

  return (
    <div className="analytics-container">
      <h2>📊 Feedback Analytics</h2>

      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="🔍 Search Category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Bar Charts */}
      {filteredCategories.map((cat) => (
        <div key={cat} className="chart-section animate">
          <h3>{cat.toUpperCase()}</h3>
          <Bar
            data={{
              labels: ["Category Average"],
              datasets: [
                {
                  label: `${cat} Score`,
                  data: [averages[cat] || 0],
                  backgroundColor: "rgba(54, 162, 235, 0.7)",
                  borderRadius: 10, // Round bars
                },
              ],
            }}
            options={{
              animation: {
                duration: 1000, // Smooth animation
                easing: "easeInOutQuad",
              },
              scales: {
                y: { beginAtZero: true, max: 5 },
              },
            }}
          />
        </div>
      ))}

      {/* Pie Chart Showing Category Performance */}
      <div className="pie-chart-container animate">
        <h3>📍 City Performance Overview</h3>
        <Pie
          data={{
            labels: categories,
            datasets: [
              {
                label: "Performance (%)",
                data: categories.map((cat) => averages[cat] || 0),
                backgroundColor: [
                  "#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff",
                ],
              },
            ],
          }}
          options={{
            animation: {
              duration: 1200,
              easing: "easeInOutQuad",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Analytics;