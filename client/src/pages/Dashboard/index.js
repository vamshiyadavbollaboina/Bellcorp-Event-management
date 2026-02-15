import React, { useEffect, useState } from "react"
import axios from "axios"
import Cookie from "js-cookie"
import { Link } from "react-router-dom"
import { MdOutlineEventAvailable, MdHistory, MdLocationOn } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";
import "./index.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = Cookie.get("jwt_token");
      try {
        const res = await axios.get(`${API_BASE_URL}/api/registrations/my/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch registered events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const today = new Date();
  const upcoming = events.filter((e) => new Date(e.event.date) >= today);
  const past = events.filter((e) => new Date(e.event.date) < today);

  if (loading) {
    return (
      <div className="loader-container">
        <TailSpin height="80" width="80" color="#0984e3" ariaLabel="loading" />
        <p>Fetching your events...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>My Dashboard</h2>
        <p>Manage your event registrations and history.</p>
      </header>

      <section className="dashboard-section">
        <h3 className="section-title">
          <MdOutlineEventAvailable className="icon-blue" /> Upcoming Events
        </h3>
        {upcoming.length > 0 ? (
          <div className="event-list">
            {upcoming.map((e) => (
              <div key={e._id} className="event-item">
                <div className="event-info">
                  <Link to={`/event/${e.event._id}`} className="event-name">
                    {e.event.name}
                  </Link>
                  <span className="event-location-text">
                    <MdLocationOn /> {e.event.location}
                  </span>
                </div>
                <span className="event-date-badge">
                  {new Date(e.event.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data">No upcoming events found.</div>
        )}
      </section>

      <section className="dashboard-section">
        <h3 className="section-title">
          <MdHistory className="icon-gray" /> Past Events
        </h3>
        {past.length > 0 ? (
          <div className="event-list">
            {past.map((e) => (
              <div key={e._id} className="event-item past">
                <div className="event-info">
                  <span className="event-name">{e.event.name}</span>
                  <span className="event-location-text">
                    <MdLocationOn /> {e.event.location}
                  </span>
                </div>
                <span className="event-date-badge">
                  {new Date(e.event.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data">No history available.</div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;