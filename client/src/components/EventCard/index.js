import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'
import axios from 'axios'
import { MdLocationOn, MdPeople, MdInfoOutline } from 'react-icons/md'
import './index.css'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const EventCard = ({ event }) => {
    const [loading, setLoading] = useState(false);
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const onRegister = async (e) => {
        e.preventDefault() 
        
        const token = Cookie.get('jwt_token')
        if (!token) return alert("Please login first")
        
        setLoading(true)
        try {
            await axios.post(`${API_BASE_URL}/api/registrations/${event._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Registered successfully!")
        } catch (err) {
            alert(err.response?.data?.message || "Error")
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="event-card">
            <div className="card-content">
                <div className="card-header">
                    <h3>{event.name}</h3>
                    <span className="category-pill">{event.category}</span>
                </div>
                
                <div className="info-row">
                    <MdLocationOn className="icon" />
                    <span>{event.location}</span>
                </div>
                <div className="info-row">
                    <MdPeople className="icon" />
                    <span>{event.capacity} seats left</span>
                </div>
            </div>
            <div className="card-actions">
                <Link to={`/event/${event._id}`} className="btn-details">
                    <MdInfoOutline /> Details
                </Link>
                <button 
                    className="btn-register-quick" 
                    onClick={onRegister} 
                    disabled={loading}
                >
                    {loading ? "..." : "Register"}
                </button>
            </div>
        </div>
    );
};

export default EventCard;