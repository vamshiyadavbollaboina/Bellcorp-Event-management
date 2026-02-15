import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MdSearch, MdFilterList, MdSearchOff } from "react-icons/md"
import { TailSpin } from "react-loader-spinner"
import EventCard from '../../components/EventCard'
import './index.css'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const Home = () => {
    const [events, setEvents] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/api/events`, {
                    params: { search, category }
                });
                setEvents(response.data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }, 400);
        return () => clearTimeout(timer);
    }, [search, category]);

    return (
        <div className="home-wrapper">
            <header className="hero-section">
                <div className="hero-text">
                    <h1>Explore <span>Events</span></h1>
                    <p>Discover experiences, tech talks, and local gatherings.</p>
                </div>

                <div className="search-bar-container">
                    <div className="search-box">
                        <MdSearch className="icon-main" />
                        <input 
                            type="text" 
                            placeholder="Find events..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} 
                        />
                    </div>
                    <div className="category-box">
                        <MdFilterList className="icon-main" />
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">All Categories</option>
                            <option value="Tech">Tech</option>
                            <option value="Music">Music</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Networking">Networking</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                            <option value="Sports">Sports</option>
                            <option value="Food">Food</option>
                            <option value="Art">Art</option>
                        </select>
                    </div>
                </div>
            </header>
            
            {loading ? (
                <div className="center-loader">
                    <TailSpin height="50" width="50" color="#6c5ce7" />
                    <p>Searching for events...</p>
                </div>
            ) : (
                <div className="events-main-grid">
                    {events.length > 0 ? (
                        events.map(event => (
                            <div key={event._id} className="event-simple-card">
                                <EventCard event={event} />
                            </div>
                        ))
                    ) : (
                        <div className="no-results-container">
                            <div className="no-results-content">
                                <div className="icon-circle">
                                    <MdSearchOff size={50} />
                                </div>
                                <h2>No events found</h2>
                                <p>
                                    We couldn't find any events matching "<strong>{search || category || 'your search'}</strong>". 
                                    Try adjusting your filters or search terms.
                                </p>
                                <button 
                                    className="clear-search-btn" 
                                    onClick={() => {
                                        setSearch('');
                                        setCategory('');
                                    }}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;