import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './index.css';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const history = useHistory();

    const onLogout = () => {
        logoutUser();
        history.replace('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">Bellcorp Events</Link>
            <div className="nav-links">
                <Link to="/">Explore</Link>
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={onLogout} className="logout-btn">Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};
export default Navbar;