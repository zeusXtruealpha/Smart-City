import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { db } from "./firebase"; // Firebase configuration file
import { collection, addDoc, getDocs } from "firebase/firestore";
import "./App.css";

function Events() {
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "cultural",
    date: "",
    location: "",
    description: "",
  });

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);
    };
    fetchEvents();
  }, []);

  // Filter events for selected month
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const eventsThisMonth = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() + 1 === currentMonth &&
      eventDate.getFullYear() === currentYear
    );
  });

  // Apply category filter
  const filteredEvents =
    filter === "all"
      ? eventsThisMonth
      : eventsThisMonth.filter((event) => event.type === filter);

  // Get events for selected date
  const eventsOnSelectedDate = selectedDate
  ? filteredEvents.filter(
      (event) => event.date === selectedDate.toLocaleDateString("en-CA")
    )
  : [];


  // Highlight dates with events
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toLocaleDateString("en-CA"); // Ensures correct YYYY-MM-DD format in local time
      return events.some(event => event.date === dateString) ? "has-events" : "";
    }
  };
  

  // Add event to Firestore
  const addEvent = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location || !newEvent.description) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await addDoc(collection(db, "events"), {
        ...newEvent,
        date: newEvent.date // Ensure it's stored as a simple string (YYYY-MM-DD)
      });
      
      setEvents([...events, newEvent]); // Update state
      setNewEvent({
        // Reset form fields
        title: "",
        type: "cultural",
        date: "",
        location: "",
        description: "",
      });
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  return (
    <div className="city-events">
      <h2 className="center-heading">City Events Management</h2>
      <p className="page-description">Manage and explore city events dynamically.</p>

      {/* Filters */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("cultural")}>Cultural</button>
        <button onClick={() => setFilter("sports")}>Sports</button>
        <button onClick={() => setFilter("community")}>Community</button>
        <button onClick={() => setFilter("others")}>Others</button>
      </div>

      {/* Calendar and Events */}
      <div className="calendar-events-container">
        <div className="calendar-container">
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={setSelectedDate}
            tileClassName={tileClassName}
          />
        </div>
        <div className="monthly-events">
          <h3>Monthly Events</h3>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <h4>{event.title}</h4>
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Description:</strong> {event.description}
                </p>
              </div>
            ))
          ) : (
            <p>No events this month.</p>
          )}
        </div>
      </div>

      {/* Event Details for Selected Date */}
      {selectedDate && (
        <div className="event-details-full">
          <h3>Events on {selectedDate.toDateString()}</h3>
          {eventsOnSelectedDate.length > 0 ? (
            eventsOnSelectedDate.map((event) => (
              <div key={event.id} className="event-card">
                <h4>{event.title}</h4>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Description:</strong> {event.description}
                </p>
              </div>
            ))
          ) : (
            <p>No events on this day.</p>
          )}
          <button onClick={() => setSelectedDate(null)}>Close</button>
        </div>
      )}

      {/* Add Event Form */}
      <div className="add-event-form">
        <h3>Add New Event</h3>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          />
          <select
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
          >
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="community">Community</option>
            <option value="others">Others</option>
          </select>
          <textarea
            className="full-width"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          ></textarea>
          <button onClick={addEvent}>Add Event</button>
        </div>
      </div>
    </div>
  );
}

export default Events;