import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';
import './index.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    if (Cookie.get('jwt_token') !== undefined) return <Redirect to="/" />;

    const onRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password });
            alert("Registration successful! Please login.");
            history.push('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-bg">
            <form className="auth-card" onSubmit={onRegister}>
                <h2>Create Account</h2>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Sign Up</button>
                <p>Already have an account? <span onClick={() => history.push('/login')}>Login</span></p>
            </form>
        </div>
    );
};

export default Register;