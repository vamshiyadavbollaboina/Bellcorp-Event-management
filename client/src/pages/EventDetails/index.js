import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import Cookie from "js-cookie"
import { MdLocationOn, MdCalendarToday, MdPeople, MdArrowBack, MdVerified } from "react-icons/md"
import { TailSpin } from "react-loader-spinner"
import "./index.css"

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
function EventDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const token = Cookie.get("jwt_token");
      try {
        const res = await axios.get(`${API_BASE_URL}/api/events/${id}`);
        setEvent(res.data);

        if (token) {
          const regRes = await axios.get(`${API_BASE_URL}/api/registrations/my/events`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const already = regRes.data.some(reg => reg.event._id === id);
          setIsRegistered(already);
        }
      } catch (err) {
        console.error("Failed to load event", err);
      } finally {
        setFetching(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleAction = async (type) => {
    const token = Cookie.get("jwt_token");
    if (!token) return alert("Please login to perform this action");

    setLoading(true);
    try {
      if (type === 'register') {
        await axios.post(`${API_BASE_URL}/api/registrations/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsRegistered(true);
        alert("Successfully registered!");
      } else {
        if (window.confirm("Are you sure you want to cancel your spot?")) {
          await axios.delete(`${API_BASE_URL}/api/registrations/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setIsRegistered(false);
          alert("Registration cancelled.");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Action failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="loader-full">
      <TailSpin height="60" width="60" color="#6c5ce7" />
      <p>Fetching event details...</p>
    </div>
  );

  if (!event) return <div className="error-msg">Event not found or has been removed.</div>

  return (
    <div className="details-wrapper">
      <button className="back-nav" onClick={() => history.goBack()}>
        <MdArrowBack /> Back to Discovery
      </button>

      <div className="details-glass-card">
        <div className="details-hero">
          <span className="event-tag">{event.category}</span>
          <h1>{event.name}</h1>
          {isRegistered && <div className="status-badge"><MdVerified /> You're going!</div>}
        </div>

        <div className="details-stats">
          <div className="stat-item">
            <MdCalendarToday className="stat-icon" />
            <div>
                <label>Date & Time</label>
                <p>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="stat-item">
            <MdLocationOn className="stat-icon" />
            <div>
                <label>Location</label>
                <p>{event.location}</p>
            </div>
          </div>
          <div className="stat-item">
            <MdPeople className="stat-icon" />
            <div>
                <label>Availability</label>
                <p>{event.capacity} total seats</p>
            </div>
          </div>
        </div>

        <div className="details-content">
          <h3>Description</h3>
          <p>{event.description}</p>
        </div>

        <div className="details-footer">
          {isRegistered ? (
            <button className="btn-action cancel" onClick={() => handleAction('cancel')} disabled={loading}>
              {loading ? "Updating..." : "Cancel Registration"}
            </button>
          ) : (
            <button className="btn-action register" onClick={() => handleAction('register')} disabled={loading || event.capacity <= 0}>
              {loading ? "Updating..." : event.capacity <= 0 ? "Event Sold Out" : "Secure My Spot"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;